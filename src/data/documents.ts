export interface RequiredDocument {
    id: string;
    objectiveId: string;
    name: string;
    description: string;
    isRequired: boolean;
    source?: string;
    tip?: string;
}

export const requiredDocuments: RequiredDocument[] = [
    // BTP - Permis de construire
    { id: "pc-01", objectiveId: "permis-construire", name: "data_documents.pc-01.name", description: "data_documents.pc-01.description", isRequired: true, source: "data_documents.pc-01.source", tip: "data_documents.pc-01.tip" },
    { id: "pc-02", objectiveId: "permis-construire", name: "data_documents.pc-02.name", description: "data_documents.pc-02.description", isRequired: true, source: "data_documents.pc-02.source" },
    { id: "pc-03", objectiveId: "permis-construire", name: "data_documents.pc-03.name", description: "data_documents.pc-03.description", isRequired: true, tip: "data_documents.pc-03.tip" },
    { id: "pc-04", objectiveId: "permis-construire", name: "data_documents.pc-04.name", description: "data_documents.pc-04.description", isRequired: true, source: "data_documents.pc-04.source" },
    { id: "pc-05", objectiveId: "permis-construire", name: "data_documents.pc-05.name", description: "data_documents.pc-05.description", isRequired: true },
    { id: "pc-06", objectiveId: "permis-construire", name: "data_documents.pc-06.name", description: "data_documents.pc-06.description", isRequired: true },
    { id: "pc-07", objectiveId: "permis-construire", name: "data_documents.pc-07.name", description: "data_documents.pc-07.description", isRequired: true },
    { id: "pc-08", objectiveId: "permis-construire", name: "data_documents.pc-08.name", description: "data_documents.pc-08.description", isRequired: false, tip: "data_documents.pc-08.tip" },

    // BTP - Agrément BTP
    { id: "abtp-01", objectiveId: "agrement-btp", name: "data_documents.abtp-01.name", description: "data_documents.abtp-01.description", isRequired: true, source: "data_documents.abtp-01.source" },
    { id: "abtp-02", objectiveId: "agrement-btp", name: "data_documents.abtp-02.name", description: "data_documents.abtp-02.description", isRequired: true },
    { id: "abtp-03", objectiveId: "agrement-btp", name: "data_documents.abtp-03.name", description: "data_documents.abtp-03.description", isRequired: true },
    { id: "abtp-04", objectiveId: "agrement-btp", name: "data_documents.abtp-04.name", description: "data_documents.abtp-04.description", isRequired: true, source: "data_documents.abtp-04.source" },
    { id: "abtp-05", objectiveId: "agrement-btp", name: "data_documents.abtp-05.name", description: "data_documents.abtp-05.description", isRequired: true, source: "data_documents.abtp-05.source" },
    { id: "abtp-06", objectiveId: "agrement-btp", name: "data_documents.abtp-06.name", description: "data_documents.abtp-06.description", isRequired: true, tip: "data_documents.abtp-06.tip" },
    { id: "abtp-07", objectiveId: "agrement-btp", name: "data_documents.abtp-07.name", description: "data_documents.abtp-07.description", isRequired: false },
    { id: "abtp-08", objectiveId: "agrement-btp", name: "data_documents.abtp-08.name", description: "data_documents.abtp-08.description", isRequired: true },

    // BTP - EIE
    { id: "eie-01", objectiveId: "eie", name: "data_documents.eie-01.name", description: "data_documents.eie-01.description", isRequired: true, source: "data_documents.eie-01.source" },
    { id: "eie-02", objectiveId: "eie", name: "data_documents.eie-02.name", description: "data_documents.eie-02.description", isRequired: true },
    { id: "eie-03", objectiveId: "eie", name: "data_documents.eie-03.name", description: "data_documents.eie-03.description", isRequired: true },
    { id: "eie-04", objectiveId: "eie", name: "data_documents.eie-04.name", description: "data_documents.eie-04.description", isRequired: true, tip: "data_documents.eie-04.tip" },
    { id: "eie-05", objectiveId: "eie", name: "data_documents.eie-05.name", description: "data_documents.eie-05.description", isRequired: true },

    // Marchés Publics - Dossier de soumission
    { id: "mp-01", objectiveId: "dossier-soumission", name: "data_documents.mp-01.name", description: "data_documents.mp-01.description", isRequired: true },
    { id: "mp-02", objectiveId: "dossier-soumission", name: "data_documents.mp-02.name", description: "data_documents.mp-02.description", isRequired: true, source: "data_documents.mp-02.source" },
    { id: "mp-03", objectiveId: "dossier-soumission", name: "data_documents.mp-03.name", description: "data_documents.mp-03.description", isRequired: true, source: "data_documents.mp-03.source" },
    { id: "mp-04", objectiveId: "dossier-soumission", name: "data_documents.mp-04.name", description: "data_documents.mp-04.description", isRequired: true, source: "data_documents.mp-04.source" },
    { id: "mp-05", objectiveId: "dossier-soumission", name: "data_documents.mp-05.name", description: "data_documents.mp-05.description", isRequired: true, source: "data_documents.mp-05.source" },
    { id: "mp-06", objectiveId: "dossier-soumission", name: "data_documents.mp-06.name", description: "data_documents.mp-06.description", isRequired: true, tip: "data_documents.mp-06.tip" },
    { id: "mp-07", objectiveId: "dossier-soumission", name: "data_documents.mp-07.name", description: "data_documents.mp-07.description", isRequired: true },
    { id: "mp-08", objectiveId: "dossier-soumission", name: "data_documents.mp-08.name", description: "data_documents.mp-08.description", isRequired: true, tip: "data_documents.mp-08.tip" },
    { id: "mp-09", objectiveId: "dossier-soumission", name: "data_documents.mp-09.name", description: "data_documents.mp-09.description", isRequired: false },
    { id: "mp-10", objectiveId: "dossier-soumission", name: "data_documents.mp-10.name", description: "data_documents.mp-10.description", isRequired: true },

    // Création d'entreprise - RCCM
    { id: "rccm-01", objectiveId: "immatriculation-rccm", name: "data_documents.rccm-01.name", description: "data_documents.rccm-01.description", isRequired: true },
    { id: "rccm-02", objectiveId: "immatriculation-rccm", name: "data_documents.rccm-02.name", description: "data_documents.rccm-02.description", isRequired: true, source: "data_documents.rccm-02.source" },
    { id: "rccm-03", objectiveId: "immatriculation-rccm", name: "data_documents.rccm-03.name", description: "data_documents.rccm-03.description", isRequired: true },
    { id: "rccm-04", objectiveId: "immatriculation-rccm", name: "data_documents.rccm-04.name", description: "data_documents.rccm-04.description", isRequired: true },
    { id: "rccm-05", objectiveId: "immatriculation-rccm", name: "data_documents.rccm-05.name", description: "data_documents.rccm-05.description", isRequired: true },

    // Santé - Pharmacie
    { id: "ph-01", objectiveId: "pharmacie-autorisation", name: "data_documents.ph-01.name", description: "data_documents.ph-01.description", isRequired: true, source: "data_documents.ph-01.source" },
    { id: "ph-02", objectiveId: "pharmacie-autorisation", name: "data_documents.ph-02.name", description: "data_documents.ph-02.description", isRequired: true },
    { id: "ph-03", objectiveId: "pharmacie-autorisation", name: "data_documents.ph-03.name", description: "data_documents.ph-03.description", isRequired: true },
    { id: "ph-04", objectiveId: "pharmacie-autorisation", name: "data_documents.ph-04.name", description: "data_documents.ph-04.description", isRequired: true },
    { id: "ph-05", objectiveId: "pharmacie-autorisation", name: "data_documents.ph-05.name", description: "data_documents.ph-05.description", isRequired: true, tip: "data_documents.ph-05.tip" },
    { id: "ph-06", objectiveId: "pharmacie-autorisation", name: "data_documents.ph-06.name", description: "data_documents.ph-06.description", isRequired: true },
    { id: "ph-07", objectiveId: "pharmacie-autorisation", name: "data_documents.ph-07.name", description: "data_documents.ph-07.description", isRequired: true },
    { id: "ph-08", objectiveId: "pharmacie-autorisation", name: "data_documents.ph-08.name", description: "data_documents.ph-08.description", isRequired: true, tip: "data_documents.ph-08.tip" },
];

export function getDocumentsByObjective(objectiveId: string): RequiredDocument[] {
    return requiredDocuments.filter((d) => d.objectiveId === objectiveId);
}
