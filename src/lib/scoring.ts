// Scoring logic for compliance diagnostic

export interface DiagnosticData {
    companyName: string;
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
    impact: "high" | "medium" | "low";
    difficulty: "easy" | "medium" | "hard";
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
        impact: "high",
        difficulty: "medium",
        description: "Le RCCM est obligatoire pour toute activité commerciale en RDC.",
        estimatedDays: 7,
        estimatedCostUsd: 150,
        action: "Immatriculer votre société au Tribunal de Commerce",
    },
    {
        id: "nif",
        title: "Numéro d'Identification Fiscale (NIF)",
        severity: "critical",
        impact: "high",
        difficulty: "easy",
        description: "Le NIF est requis pour toutes les obligations fiscales et commerciales.",
        estimatedDays: 5,
        estimatedCostUsd: 0,
        action: "Obtenir votre NIF auprès de la DGI",
    },
    {
        id: "cnss",
        title: "Affiliation CNSS",
        severity: "important",
        impact: "medium",
        difficulty: "medium",
        description: "Obligation légale pour les entreprises ayant des salariés.",
        estimatedDays: 10,
        estimatedCostUsd: 0,
        action: "S'affilier à la Caisse Nationale de Sécurité Sociale",
    },
    {
        id: "inss",
        title: "Affiliation INSS",
        severity: "important",
        impact: "medium",
        difficulty: "medium",
        description: "Couverture assurance maladie obligatoire pour les employés.",
        estimatedDays: 10,
        estimatedCostUsd: 0,
        action: "S'affilier à l'Institut National de Sécurité Sociale",
    },
    {
        id: "fiscal_attestation",
        title: "Attestation de situation fiscale",
        severity: "critical",
        impact: "high",
        difficulty: "easy",
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
            impact: "high",
            difficulty: "hard",
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
            impact: "medium",
            difficulty: "medium",
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
            impact: "high",
            difficulty: "medium",
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
            impact: "high",
            difficulty: "medium",
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
            impact: "high",
            difficulty: "hard",
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
            impact: "high",
            difficulty: "hard",
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
import { calculateComplianceScore, DiagnosticInput, RuleEvaluationResult } from "./diagnosticEngine";

export function calculateScore(data: DiagnosticData): ScoringResult {
    // 1. Convert Data to Engine Input
    const input: DiagnosticInput = {
        sector: data.sector,
        companyType: data.companyType,
        employeeCount: data.employeeCount,
        objectives: data.objectives,
        hasRccm: data.hasRccm,
        hasNif: data.hasNif,
        hasCnss: data.hasCnss,
        hasInss: data.hasInss,
        hasFiscalAttestation: data.hasFiscalAttestation,
        ownedDocuments: [...data.existingAccreditations, ...data.documentsObtained]
    };

    // 2. Calculate using the intelligent Engine Rules
    const report = calculateComplianceScore(input);

    // 3. Map Engine result to UI DTO (ScoringResult)
    const score = report.totalScore;
    const strengths = report.matchedRules.filter(r => r.passed).map(r => r.rule.name);

    function mapRuleToGap(res: RuleEvaluationResult, severity: ComplianceGap["severity"]): ComplianceGap {
        const rule = res.rule;
        
        // Parse numbers from strings like "5 à 10 jours" or "100 à 300 USD"
        const daysMatch = rule.realDeadline?.match(/\d+/g);
        const estimatedDays = daysMatch ? parseInt(daysMatch[daysMatch.length - 1], 10) : 30; // Take max day bound or default
        
        const costMatch = rule.officialCost?.match(/\d+/g);
        const estimatedCostUsd = costMatch ? parseInt(costMatch[0], 10) : 250; // Take min cost bound or default

        return {
            id: rule.id,
            title: rule.name,
            severity,
            impact: severity === "critical" ? "high" : severity === "important" ? "medium" : "low",
            difficulty: "medium", // static fallback for now
            description: rule.description || "Obligation réglementaire.",
            estimatedDays,
            estimatedCostUsd,
            action: `Obtenir auprès de : ${rule.authority}`
        };
    }

    const gaps: ComplianceGap[] = [
        ...report.missingCritical.map(r => mapRuleToGap(r, "critical")),
        ...report.missingMajor.map(r => mapRuleToGap(r, "important")),
        ...report.missingMinor.map(r => mapRuleToGap(r, "optional"))
    ];

    const priorityActions = gaps.slice(0, 3).map((g) => g.action);
    const totalDays = gaps.reduce((acc, g) => Math.max(acc, g.estimatedDays), 0);
    const totalCost = gaps.reduce((acc, g) => acc + g.estimatedCostUsd, 0);

    return {
        score,
        level: getLevel(score),
        gaps,
        strengths,
        priorityActions,
        estimatedTotalDays: totalDays,
        estimatedTotalCostUsd: totalCost,
    };
}
