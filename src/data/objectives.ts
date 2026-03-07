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
        name: "data_objectives.permis-construire.name",
        label: "data_objectives.permis-construire.label",
        description: "data_objectives.permis-construire.description",
        daysMin: 45,
        daysMax: 180,
        costMin: 200,
        costMax: 800,
    },
    {
        id: "agrement-btp",
        sectorId: "btp",
        name: "data_objectives.agrement-btp.name",
        label: "data_objectives.agrement-btp.label",
        description: "data_objectives.agrement-btp.description",
        daysMin: 30,
        daysMax: 90,
        costMin: 300,
        costMax: 600,
    },
    {
        id: "eie",
        sectorId: "btp",
        name: "data_objectives.eie.name",
        label: "data_objectives.eie.label",
        description: "data_objectives.eie.description",
        daysMin: 60,
        daysMax: 120,
        costMin: 2000,
        costMax: 10000,
    },
    {
        id: "certificat-conformite-btp",
        sectorId: "btp",
        name: "data_objectives.certificat-conformite-btp.name",
        label: "data_objectives.certificat-conformite-btp.label",
        description: "data_objectives.certificat-conformite-btp.description",
        daysMin: 15,
        daysMax: 45,
        costMin: 150,
        costMax: 400,
    },
    // Marchés Publics
    {
        id: "dossier-soumission",
        sectorId: "marches-publics",
        name: "data_objectives.dossier-soumission.name",
        label: "data_objectives.dossier-soumission.label",
        description: "data_objectives.dossier-soumission.description",
        daysMin: 7,
        daysMax: 21,
        costMin: 100,
        costMax: 400,
    },
    {
        id: "attestation-fiscale",
        sectorId: "marches-publics",
        name: "data_objectives.attestation-fiscale.name",
        label: "data_objectives.attestation-fiscale.label",
        description: "data_objectives.attestation-fiscale.description",
        daysMin: 5,
        daysMax: 21,
        costMin: 0,
        costMax: 50,
    },
    {
        id: "attestation-cnss",
        sectorId: "marches-publics",
        name: "data_objectives.attestation-cnss.name",
        label: "data_objectives.attestation-cnss.label",
        description: "data_objectives.attestation-cnss.description",
        daysMin: 5,
        daysMax: 14,
        costMin: 0,
        costMax: 30,
    },
    // Création d'entreprise
    {
        id: "immatriculation-rccm",
        sectorId: "creation-entreprise",
        name: "data_objectives.immatriculation-rccm.name",
        label: "data_objectives.immatriculation-rccm.label",
        description: "data_objectives.immatriculation-rccm.description",
        daysMin: 3,
        daysMax: 14,
        costMin: 100,
        costMax: 300,
    },
    {
        id: "numero-nif",
        sectorId: "creation-entreprise",
        name: "data_objectives.numero-nif.name",
        label: "data_objectives.numero-nif.label",
        description: "data_objectives.numero-nif.description",
        daysMin: 7,
        daysMax: 21,
        costMin: 0,
        costMax: 100,
    },
    {
        id: "numero-inss",
        sectorId: "creation-entreprise",
        name: "data_objectives.numero-inss.name",
        label: "data_objectives.numero-inss.label",
        description: "data_objectives.numero-inss.description",
        daysMin: 7,
        daysMax: 21,
        costMin: 0,
        costMax: 50,
    },
    // Import Export
    {
        id: "licence-importation",
        sectorId: "import-export",
        name: "data_objectives.licence-importation.name",
        label: "data_objectives.licence-importation.label",
        description: "data_objectives.licence-importation.description",
        daysMin: 14,
        daysMax: 45,
        costMin: 200,
        costMax: 600,
    },
    {
        id: "certificat-conformite-import",
        sectorId: "import-export",
        name: "data_objectives.certificat-conformite-import.name",
        label: "data_objectives.certificat-conformite-import.label",
        description: "data_objectives.certificat-conformite-import.description",
        daysMin: 7,
        daysMax: 30,
        costMin: 150,
        costMax: 500,
    },
    {
        id: "regime-douanier",
        sectorId: "import-export",
        name: "data_objectives.regime-douanier.name",
        label: "data_objectives.regime-douanier.label",
        description: "data_objectives.regime-douanier.description",
        daysMin: 3,
        daysMax: 14,
        costMin: 100,
        costMax: 400,
    },
    // Santé
    {
        id: "pharmacie-autorisation",
        sectorId: "sante",
        name: "data_objectives.pharmacie-autorisation.name",
        label: "data_objectives.pharmacie-autorisation.label",
        description: "data_objectives.pharmacie-autorisation.description",
        daysMin: 180,
        daysMax: 365,
        costMin: 500,
        costMax: 2000,
    },
    {
        id: "clinique-agrement",
        sectorId: "sante",
        name: "data_objectives.clinique-agrement.name",
        label: "data_objectives.clinique-agrement.label",
        description: "data_objectives.clinique-agrement.description",
        daysMin: 90,
        daysMax: 270,
        costMin: 1000,
        costMax: 5000,
    },
    {
        id: "ecole-homologation",
        sectorId: "sante",
        name: "data_objectives.ecole-homologation.name",
        label: "data_objectives.ecole-homologation.label",
        description: "data_objectives.ecole-homologation.description",
        daysMin: 60,
        daysMax: 180,
        costMin: 300,
        costMax: 1500,
    },
    // Mines
    {
        id: "permis-recherche-miniere",
        sectorId: "mines",
        name: "data_objectives.permis-recherche-miniere.name",
        label: "data_objectives.permis-recherche-miniere.label",
        description: "data_objectives.permis-recherche-miniere.description",
        daysMin: 90,
        daysMax: 360,
        costMin: 2000,
        costMax: 15000,
    },
    {
        id: "droits-exploitation",
        sectorId: "mines",
        name: "data_objectives.droits-exploitation.name",
        label: "data_objectives.droits-exploitation.label",
        description: "data_objectives.droits-exploitation.description",
        daysMin: 180,
        daysMax: 720,
        costMin: 5000,
        costMax: 50000,
    },
    {
        id: "conformite-code-minier",
        sectorId: "mines",
        name: "data_objectives.conformite-code-minier.name",
        label: "data_objectives.conformite-code-minier.label",
        description: "data_objectives.conformite-code-minier.description",
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
