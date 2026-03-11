import { SectorDecisionTree, DiagnosticRule } from "@/types/rules";

export const MINES_RULES: SectorDecisionTree = {
    sectorId: "mines",
    rules: [
        {
            id: "min_exploit_art",
            name: "Carte d'Exploitant Artisanal",
            type: "Autorisation",
            authority: "Division Provinciale des Mines",
            description: "Autorisation d'exploitation minière à petite échelle.",
            severity: "BLOQUANT",
            officialCost: "Variable selon province",
            legalDeadline: "30 jours",
            realDeadline: "60 jours",
            conditions: [
                {
                    field: "objectives",
                    operator: "IN",
                    value: ["data_objectives.droits-exploitation.label"]
                },
                {
                    field: "employeeCount",
                    operator: "IN",
                    value: ["1-5", "6-20"] // Supposition: petite taille = artisanal
                }
            ]
        },
        {
            id: "min_permis_recherche",
            name: "Permis de Recherche Minière",
            type: "Permis",
            authority: "Cadastre Minier (CAMI)",
            description: "Droit exclusif d'effectuer des travaux de recherche.",
            severity: "BLOQUANT",
            officialCost: "Frais de dépôt + Droits superficiaires annuels",
            legalDeadline: "45 jours",
            realDeadline: "3 à 6 mois",
            conditions: [
                {
                    field: "objectives",
                    operator: "IN",
                    value: ["data_objectives.permis-recherche-miniere.label"]
                }
            ]
        },
        {
            id: "min_eies",
            name: "Étude d'Impact Environnemental et Social (EIES)",
            type: "Étude",
            authority: "Ministère de l'Environnement (ACE)",
            description: "Plan d'atténuation et réhabilitation environnementale obligatoire.",
            severity: "BLOQUANT",
            officialCost: "Selon étude locale",
            legalDeadline: "90 jours",
            realDeadline: "4 à 8 mois",
            conditions: [
                {
                    field: "employeeCount",
                    operator: "IN",
                    value: ["51-200", "200+"] // Industrielle
                },
                {
                    field: "objectives",
                    operator: "IN",
                    value: ["data_objectives.droits-exploitation.label", "data_objectives.conformite-code-minier.label"]
                }
            ]
        }
    ]
};

export const SANTE_RULES: SectorDecisionTree = {
    sectorId: "sante",
    rules: [
        {
            id: "sant_agrem_pharma",
            name: "Autorisation d'Ouverture de Pharmacie / Agrément du Pharmacien Titulaire",
            type: "Autorisation",
            authority: "Ministère de la Santé Publique",
            description: "Diplôme homologué, inspection des locaux et équipements.",
            severity: "BLOQUANT",
            officialCost: "500 à 1 500 USD",
            legalDeadline: "60 jours",
            realDeadline: "6 à 12 mois",
            conditions: [
                {
                    field: "objectives",
                    operator: "IN",
                    value: ["data_objectives.pharmacie-autorisation.label"]
                }
            ]
        },
        {
            id: "sant_agrem_clinique",
            name: "Agrément d'Établissement de Soins",
            type: "Agrément",
            authority: "Ministère de la Santé Publique",
            description: "Infrastructures aux normes, Médecin directeur technique, Assurance RC.",
            severity: "BLOQUANT",
            officialCost: "800 à 2 500 USD",
            legalDeadline: "90 jours",
            realDeadline: "6 à 18 mois",
            conditions: [
                {
                    field: "objectives",
                    operator: "IN",
                    value: ["data_objectives.clinique-agrement.label"]
                }
            ]
        },
        {
            id: "sant_cnpp",
            name: "Autorisation d'Utilisation des Radiations Ionisantes",
            type: "Autorisation",
            authority: "CNPP",
            description: "Obligatoire pour les équipements d'imagerie médicale (Radiographie, Scanner).",
            severity: "BLOQUANT",
            officialCost: "Variable",
            legalDeadline: "60 jours",
            realDeadline: "3 à 6 mois",
            conditions: [
                {
                    field: "objectives",
                    operator: "IN",
                    value: ["data_objectives.clinique-agrement.label"] // Par prudence, souvent rattaché aux cliniques
                }
            ]
        }
    ]
};

export const TRANSPORT_RULES: SectorDecisionTree = {
    sectorId: "transport",
    rules: [
        {
            id: "transp_routier_leger",
            name: "Agrément de transport routier — véhicule léger (< 3,5 t)",
            type: "Agrément",
            authority: "Ministère des Transports",
            description: "Société immatriculée, véhicules en règle, conducteurs avec permis valides.",
            severity: "BLOQUANT",
            officialCost: "100 à 300 USD",
            legalDeadline: "30 jours",
            realDeadline: "45 à 90 jours",
            conditions: [
                {
                    field: "objectives",
                    operator: "IN",
                    value: ["data_sectors.transport.name", "evaluation.step1.city_label"] 
                    // Note: These mappings correspond to the current OBJECTIVES_BY_SECTOR in MobileDiagnosticForm
                }
            ]
        },
        {
            id: "transp_routier_lourd",
            name: "Agrément de transport routier — véhicule lourd (> 3,5 t)",
            type: "Agrément",
            authority: "Ministère des Transports",
            description: "Assurance spécifique poids lourds, limite de charge respectée.",
            severity: "BLOQUANT",
            officialCost: "200 à 500 USD",
            legalDeadline: "30 jours",
            realDeadline: "60 à 120 jours",
            conditions: [
                {
                    field: "objectives",
                    operator: "IN",
                    value: ["data_sectors.transport.name"]
                }
            ]
        }
    ]
};

export const ALL_SECTOR_TREES: SectorDecisionTree[] = [MINES_RULES, SANTE_RULES, TRANSPORT_RULES];

// Fallback logic for basic requirements
export const BASIC_COMPLIANCE_RULES: DiagnosticRule[] = [
    {
        id: "base_rccm",
        name: "Immatriculation au RCCM",
        type: "Obligation légale",
        authority: "État",
        description: "Document de base obligatoire pour toute activité.",
        officialCost: "Variable",
        legalDeadline: "N/A",
        realDeadline: "N/A",
        severity: "BLOQUANT",
        conditions: [{ field: "hasRccm", operator: "EQUALS" as const, value: false }]
    },
    {
        id: "base_nif",
        name: "Identification Fiscale (Numéro Impôt)",
        type: "Obligation légale",
        authority: "État",
        description: "Document de base obligatoire.",
        officialCost: "Variable",
        legalDeadline: "N/A",
        realDeadline: "N/A",
        severity: "BLOQUANT",
        conditions: [{ field: "hasNif", operator: "EQUALS" as const, value: false }]
    },
    {
        id: "base_cnss",
        name: "Inscription CNSS",
        type: "Obligation légale",
        authority: "État",
        description: "Document de base obligatoire.",
        officialCost: "Variable",
        legalDeadline: "N/A",
        realDeadline: "N/A",
        severity: "MAJEUR",
        conditions: [{ field: "hasCnss", operator: "EQUALS" as const, value: false }]
    }
];
