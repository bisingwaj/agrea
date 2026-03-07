// Scoring logic for compliance diagnostic

export interface DiagnosticData {
    // Step 1 — Identification
    sector: string;
    companyType: "sarl" | "sa" | "surl" | "eurl" | "cooperative" | "ngo" | "other";
    city: string;
    employeeCount: "1-5" | "6-20" | "21-50" | "51-200" | "200+";

    // Step 2 — Current situation
    hasRccm: boolean;
    hasNif: boolean;
    hasCnss: boolean;
    hasInss: boolean;
    hasFiscalAttestation: boolean;
    existingAccreditations: string[];

    // Step 3 — Objectives (6 months)
    objectives: string[];

    // Step 4 — Documents already obtained
    documentsObtained: string[];

    // Step 5 — Confirmation
    contactName: string;
    contactPhone: string;
    contactEmail?: string;
}

export interface ComplianceGap {
    id: string;
    title: string;
    severity: "critical" | "important" | "optional";
    description: string;
    estimatedDays: number;
    estimatedCostUsd: number;
    action: string;
}

export interface ScoringResult {
    score: number; // 0–100
    level: "non-conforme" | "partiel" | "conforme" | "excellent";
    gaps: ComplianceGap[];
    strengths: string[];
    priorityActions: string[];
    estimatedTotalDays: number;
    estimatedTotalCostUsd: number;
}

// Base compliance checks every company must have
const BASE_CHECKS: ComplianceGap[] = [
    {
        id: "rccm",
        title: "Registre de Commerce (RCCM)",
        severity: "critical",
        description: "Le RCCM est obligatoire pour toute activité commerciale en RDC.",
        estimatedDays: 7,
        estimatedCostUsd: 150,
        action: "Immatriculer votre société au Tribunal de Commerce",
    },
    {
        id: "nif",
        title: "Numéro d'Identification Fiscale (NIF)",
        severity: "critical",
        description: "Le NIF est requis pour toutes les obligations fiscales et commerciales.",
        estimatedDays: 5,
        estimatedCostUsd: 0,
        action: "Obtenir votre NIF auprès de la DGI",
    },
    {
        id: "cnss",
        title: "Affiliation CNSS",
        severity: "important",
        description: "Obligation légale pour les entreprises ayant des salariés.",
        estimatedDays: 10,
        estimatedCostUsd: 0,
        action: "S'affilier à la Caisse Nationale de Sécurité Sociale",
    },
    {
        id: "inss",
        title: "Affiliation INSS",
        severity: "important",
        description: "Couverture assurance maladie obligatoire pour les employés.",
        estimatedDays: 10,
        estimatedCostUsd: 0,
        action: "S'affilier à l'Institut National de Sécurité Sociale",
    },
    {
        id: "fiscal_attestation",
        title: "Attestation de situation fiscale",
        severity: "critical",
        description: "Requise pour tout marché public, appel d'offre ou renouvellement d'agrément.",
        estimatedDays: 3,
        estimatedCostUsd: 0,
        action: "Obtenir annuellement votre attestation auprès de la DGI",
    },
];

// Sector-specific gaps
const SECTOR_GAPS: Record<string, ComplianceGap[]> = {
    btp: [
        {
            id: "agrement-btp",
            title: "Agrément BTP (Ministère des ITP)",
            severity: "critical",
            description: "Obligatoire pour soumissionner à des marchés de travaux publics.",
            estimatedDays: 60,
            estimatedCostUsd: 800,
            action: "Déposer votre dossier d'agrément au Ministère des Infrastructures",
        },
    ],
    "marches-publics": [
        {
            id: "caution-soumission",
            title: "Garantie bancaire de soumission",
            severity: "important",
            description: "2 à 3% du montant estimé, requise pour chaque appel d'offres.",
            estimatedDays: 5,
            estimatedCostUsd: 0,
            action: "Négocier une ligne de caution avec votre banque",
        },
    ],
    "creation-entreprise": [
        {
            id: "statuts-notaries",
            title: "Statuts notariés",
            severity: "critical",
            description: "Acte constitutif certifié par un notaire agréé, requis pour le RCCM.",
            estimatedDays: 5,
            estimatedCostUsd: 200,
            action: "Consulter un notaire agréé pour la rédaction des statuts",
        },
    ],
    "import-export": [
        {
            id: "licence-importation",
            title: "Licence d'importation",
            severity: "critical",
            description: "Délivrée par le Ministère du Commerce pour toute importation commerciale.",
            estimatedDays: 30,
            estimatedCostUsd: 400,
            action: "Constituer votre dossier au Ministère du Commerce",
        },
    ],
    sante: [
        {
            id: "autorisation-minsante",
            title: "Autorisation d'exercice MINSANTE",
            severity: "critical",
            description: "Tout établissement de santé doit être autorisé par le Ministère de la Santé.",
            estimatedDays: 90,
            estimatedCostUsd: 600,
            action: "Déposer votre demande avec plans et liste du matériel",
        },
    ],
    mines: [
        {
            id: "permis-exploitation-miniere",
            title: "Permis d'exploitation minière",
            severity: "critical",
            description: "Délivré par le Cadastre Minier (CAMI) selon le Code Minier 2018.",
            estimatedDays: 120,
            estimatedCostUsd: 5000,
            action: "Déposer votre demande au CAMI avec étude géologique",
        },
    ],
};

function getLevel(score: number): ScoringResult["level"] {
    if (score >= 85) return "excellent";
    if (score >= 65) return "conforme";
    if (score >= 35) return "partiel";
    return "non-conforme";
}

export function calculateScore(data: DiagnosticData): ScoringResult {
    const activeGaps: ComplianceGap[] = [];
    const strengths: string[] = [];
    let maxPoints = 0;
    let earnedPoints = 0;

    // Check base documents
    const baseMap: Record<string, boolean> = {
        rccm: data.hasRccm,
        nif: data.hasNif,
        cnss: data.hasCnss,
        inss: data.hasInss,
        fiscal_attestation: data.hasFiscalAttestation,
    };

    const pointWeights: Record<string, number> = {
        rccm: 25,
        nif: 20,
        cnss: 10,
        inss: 10,
        fiscal_attestation: 15,
    };

    for (const check of BASE_CHECKS) {
        const weight = pointWeights[check.id] ?? 10;
        maxPoints += weight;
        if (baseMap[check.id]) {
            earnedPoints += weight;
            strengths.push(check.title);
        } else {
            activeGaps.push(check);
        }
    }

    // Sector-specific checks
    const sectorGaps = SECTOR_GAPS[data.sector] ?? [];
    for (const gap of sectorGaps) {
        maxPoints += 20;
        const alreadyHas =
            data.existingAccreditations.includes(gap.id) || data.documentsObtained.includes(gap.id);
        if (alreadyHas) {
            earnedPoints += 20;
            strengths.push(gap.title);
        } else {
            activeGaps.push(gap);
        }
    }

    const score = maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 100) : 0;

    // Prioritize gaps by severity
    const sorted = [...activeGaps].sort((a, b) => {
        const order = { critical: 0, important: 1, optional: 2 };
        return order[a.severity] - order[b.severity];
    });

    const priorityActions = sorted.slice(0, 3).map((g) => g.action);
    const totalDays = sorted.reduce((acc, g) => Math.max(acc, g.estimatedDays), 0);
    const totalCost = sorted.reduce((acc, g) => acc + g.estimatedCostUsd, 0);

    return {
        score,
        level: getLevel(score),
        gaps: sorted,
        strengths,
        priorityActions,
        estimatedTotalDays: totalDays,
        estimatedTotalCostUsd: totalCost,
    };
}
