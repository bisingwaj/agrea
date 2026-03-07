export interface Objective {
    id: string;
    sectorId: string;
    name: string;
    label: string;
    description: string;
    daysMin: number;
    daysMax: number;
    costMin: number;
    costMax: number;
}

export const objectives: Objective[] = [
    // BTP
    {
        id: "permis-construire",
        sectorId: "btp",
        name: "Permis de construire",
        label: "Permis de construire",
        description: "Autorisation administrative obligatoire avant tout début de travaux de construction.",
        daysMin: 45,
        daysMax: 180,
        costMin: 200,
        costMax: 800,
    },
    {
        id: "agrement-btp",
        sectorId: "btp",
        name: "Agrément BTP",
        label: "Agrément d'entrepreneur BTP",
        description: "Certification obligatoire pour répondre aux marchés publics de construction.",
        daysMin: 30,
        daysMax: 90,
        costMin: 300,
        costMax: 600,
    },
    {
        id: "eie",
        sectorId: "btp",
        name: "Étude d'Impact Environnemental",
        label: "Étude d'Impact Environnemental (EIE)",
        description: "Obligatoire pour tout projet dépassant 50 000 USD d'investissement.",
        daysMin: 60,
        daysMax: 120,
        costMin: 2000,
        costMax: 10000,
    },
    {
        id: "certificat-conformite-btp",
        sectorId: "btp",
        name: "Certificat de conformité technique",
        label: "Certificat de conformité technique",
        description: "Exigé pour les matériaux importés utilisés dans la construction.",
        daysMin: 15,
        daysMax: 45,
        costMin: 150,
        costMax: 400,
    },
    // Marchés Publics
    {
        id: "dossier-soumission",
        sectorId: "marches-publics",
        name: "Dossier de soumission",
        label: "Constitution d'un dossier de soumission",
        description: "Ensemble des 15 à 25 pièces requises pour répondre à un appel d'offres public.",
        daysMin: 7,
        daysMax: 21,
        costMin: 100,
        costMax: 400,
    },
    {
        id: "attestation-fiscale",
        sectorId: "marches-publics",
        name: "Attestation fiscale DGI",
        label: "Attestation de situation fiscale (DGI)",
        description: "Attestation prouvant que l'entreprise est en règle avec la Direction Générale des Impôts.",
        daysMin: 5,
        daysMax: 21,
        costMin: 0,
        costMax: 50,
    },
    {
        id: "attestation-cnss",
        sectorId: "marches-publics",
        name: "Attestation CNSS",
        label: "Attestation de bonne standing CNSS",
        description: "Attestation de paiement des cotisations sociales à la Caisse Nationale de Sécurité Sociale.",
        daysMin: 5,
        daysMax: 14,
        costMin: 0,
        costMax: 30,
    },
    // Création d'entreprise
    {
        id: "immatriculation-rccm",
        sectorId: "creation-entreprise",
        name: "Immatriculation RCCM",
        label: "Immatriculation au Registre de Commerce (RCCM)",
        description: "Enregistrement obligatoire de l'entreprise au registre du commerce.",
        daysMin: 3,
        daysMax: 14,
        costMin: 100,
        costMax: 300,
    },
    {
        id: "numero-nif",
        sectorId: "creation-entreprise",
        name: "Numéro d'Identification Fiscale",
        label: "Numéro d'Identification Fiscale (NIF)",
        description: "Identifiant fiscal unique attribué par la Direction Générale des Impôts.",
        daysMin: 7,
        daysMax: 21,
        costMin: 0,
        costMax: 100,
    },
    {
        id: "numero-inss",
        sectorId: "creation-entreprise",
        name: "Affiliation INSS",
        label: "Affiliation à l'INSS (employeur)",
        description: "Enregistrement de l'entreprise en tant qu'employeur auprès de la sécurité sociale.",
        daysMin: 7,
        daysMax: 21,
        costMin: 0,
        costMax: 50,
    },
    // Import Export
    {
        id: "licence-importation",
        sectorId: "import-export",
        name: "Licence d'importation",
        label: "Licence d'importation",
        description: "Autorisation délivrée par le Ministère du Commerce pour importer des marchandises.",
        daysMin: 14,
        daysMax: 45,
        costMin: 200,
        costMax: 600,
    },
    {
        id: "certificat-conformite-import",
        sectorId: "import-export",
        name: "Certificat de conformité",
        label: "Certificat de conformité à l'importation",
        description: "Certification que les produits importés respectent les standards techniques congolais.",
        daysMin: 7,
        daysMax: 30,
        costMin: 150,
        costMax: 500,
    },
    {
        id: "regime-douanier",
        sectorId: "import-export",
        name: "Régime douanier",
        label: "Régime douanier et dédouanement",
        description: "Procédure de dédouanement auprès de la Direction Générale des Douanes et Accises (DGDA).",
        daysMin: 3,
        daysMax: 14,
        costMin: 100,
        costMax: 400,
    },
    // Santé
    {
        id: "pharmacie-autorisation",
        sectorId: "sante",
        name: "Pharmacie — Autorisation d'ouverture",
        label: "Autorisation d'ouverture de pharmacie",
        description: "Autorisation délivrée par le Ministère de la Santé pour l'exploitation d'une pharmacie.",
        daysMin: 180,
        daysMax: 365,
        costMin: 500,
        costMax: 2000,
    },
    {
        id: "clinique-agrement",
        sectorId: "sante",
        name: "Clinique — Agrément",
        label: "Agrément d'établissement de soins",
        description: "Dossier de plus de 30 pièces pour l'agrément d'une clinique privée.",
        daysMin: 90,
        daysMax: 270,
        costMin: 1000,
        costMax: 5000,
    },
    {
        id: "ecole-homologation",
        sectorId: "sante",
        name: "École — Homologation",
        label: "Homologation d'établissement scolaire privé",
        description: "Conformité aux standards 2024 du Ministère de l'EPST pour les établissements scolaires.",
        daysMin: 60,
        daysMax: 180,
        costMin: 300,
        costMax: 1500,
    },
    // Mines
    {
        id: "permis-recherche-miniere",
        sectorId: "mines",
        name: "Permis de recherche minière",
        label: "Permis de recherche minière (CAMI)",
        description: "Autorisation d'exploration délivrée par le Cadastre Minier.",
        daysMin: 90,
        daysMax: 360,
        costMin: 2000,
        costMax: 15000,
    },
    {
        id: "droits-exploitation",
        sectorId: "mines",
        name: "Droits d'exploitation",
        label: "Droits d'exploitation minière",
        description: "Négociation et obtention des droits d'exploitation auprès du Ministère des Mines.",
        daysMin: 180,
        daysMax: 720,
        costMin: 5000,
        costMax: 50000,
    },
    {
        id: "conformite-code-minier",
        sectorId: "mines",
        name: "Conformité Code Minier 2018",
        label: "Audit de conformité au Code Minier révisé 2018",
        description: "Mise en conformité avec les nouvelles dispositions du Code Minier congolais révisé en 2018.",
        daysMin: 30,
        daysMax: 90,
        costMin: 2000,
        costMax: 10000,
    },
];

export function getObjectivesBySector(sectorId: string): Objective[] {
    return objectives.filter((o) => o.sectorId === sectorId);
}

export function getObjectiveById(id: string): Objective | undefined {
    return objectives.find((o) => o.id === id);
}
