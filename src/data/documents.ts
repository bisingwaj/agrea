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
    { id: "pc-01", objectiveId: "permis-construire", name: "Formulaire de demande de permis de construire", description: "Formulaire officiel disponible auprès de la commune ou de l'Hôtel de Ville.", isRequired: true, source: "Hôtel de Ville / Commune", tip: "Remplir en 3 exemplaires, signature et cachet du propriétaire." },
    { id: "pc-02", objectiveId: "permis-construire", name: "Plan de situation du terrain (cadastre)", description: "Plan localisant précisément la parcelle dans le tissu urbain.", isRequired: true, source: "Service du Cadastre - Division Urbaine" },
    { id: "pc-03", objectiveId: "permis-construire", name: "Titre de propriété ou contrat de bail", description: "Preuve juridique du droit d'occuper la parcelle.", isRequired: true, tip: "Si bail : durée minimum 25 ans pour obtenir le permis." },
    { id: "pc-04", objectiveId: "permis-construire", name: "Plans architecturaux visés par un architecte agréé", description: "Plans de masse, de façades et de coupe établis et signés par un architecte membre de l'Ordre.", isRequired: true, source: "Ordre des Architectes du Congo" },
    { id: "pc-05", objectiveId: "permis-construire", name: "Note de calcul de structure", description: "Calculs justifiant la résistance de la structure, établis par un ingénieur civil.", isRequired: true },
    { id: "pc-06", objectiveId: "permis-construire", name: "Copie de la carte d'identité du demandeur", description: "Carte nationale d'identité ou passeport du maître d'ouvrage.", isRequired: true },
    { id: "pc-07", objectiveId: "permis-construire", name: "Preuve de paiement des taxes communales", description: "Reçu de paiement des droits d'enregistrement de la demande.", isRequired: true },
    { id: "pc-08", objectiveId: "permis-construire", name: "Enquête de commodo et incommodo (si nécessaire)", description: "Consultation du voisinage requise pour les constructions de grande envergure.", isRequired: false, tip: "Exigée uniquement pour les bâtiments de plus de R+4." },

    // BTP - Agrément BTP
    { id: "abtp-01", objectiveId: "agrement-btp", name: "Formulaire de demande d'agrément BTP", description: "Formulaire officiel du Ministère des Infrastructures et Travaux Publics.", isRequired: true, source: "Ministère des ITP" },
    { id: "abtp-02", objectiveId: "agrement-btp", name: "Statuts de la société certifiés conformes", description: "Actes constitutifs de la société certifiés par le notaire.", isRequired: true },
    { id: "abtp-03", objectiveId: "agrement-btp", name: "Extrait du Registre de Commerce (RCCM)", description: "Extrait récent (moins de 3 mois) prouvant l'existence légale de l'entreprise.", isRequired: true },
    { id: "abtp-04", objectiveId: "agrement-btp", name: "Attestation fiscale DGI en cours de validité", description: "Attestation de situation fiscale délivrée par la Direction Générale des Impôts.", isRequired: true, source: "DGI" },
    { id: "abtp-05", objectiveId: "agrement-btp", name: "Attestation CNSS à jour", description: "Attestation de paiement des cotisations sociales.", isRequired: true, source: "CNSS" },
    { id: "abtp-06", objectiveId: "agrement-btp", name: "Liste du personnel technique qualifié", description: "CV et diplômes des ingénieurs et techniciens employés par l'entreprise.", isRequired: true, tip: "Minimum 1 ingénieur civil pour la catégorie la plus basse." },
    { id: "abtp-07", objectiveId: "agrement-btp", name: "Preuves de réalisation de travaux antérieurs", description: "Attestations de bonne exécution d'au moins 3 chantiers antérieurs.", isRequired: false },
    { id: "abtp-08", objectiveId: "agrement-btp", name: "Bilan certifié du dernier exercice", description: "Bilan comptable certifié par un expert-comptable agréé.", isRequired: true },

    // BTP - EIE
    { id: "eie-01", objectiveId: "eie", name: "Formulaire de demande d'évaluation environnementale", description: "Formulaire officiel du Ministère de l'Environnement et Développement Durable.", isRequired: true, source: "Ministère MEDD" },
    { id: "eie-02", objectiveId: "eie", name: "Description détaillée du projet", description: "Mémoire descriptif complet du projet : nature, localisation, superficie, durée.", isRequired: true },
    { id: "eie-03", objectiveId: "eie", name: "Plan de gestion environnementale et sociale", description: "Document décrivant les mesures d'atténuation des impacts identifiés.", isRequired: true },
    { id: "eie-04", objectiveId: "eie", name: "Rapport d'étude d'impact environnemental", description: "Rapport élaboré par un expert en environnement certifié.", isRequired: true, tip: "Doit être réalisé par un expert figurant sur la liste agréée du MEDD." },
    { id: "eie-05", objectiveId: "eie", name: "Résultat des consultations publiques", description: "Procès-verbaux des réunions de consultation des populations riveraines.", isRequired: true },

    // Marchés Publics - Dossier de soumission
    { id: "mp-01", objectiveId: "dossier-soumission", name: "Formulaire de soumission rempli et signé", description: "Formulaire fourni dans le Dossier d'Appel d'Offres (DAO).", isRequired: true },
    { id: "mp-02", objectiveId: "dossier-soumission", name: "Extrait RCCM récent (moins de 3 mois)", description: "Preuve de l'existence légale et de l'objet social de l'entreprise.", isRequired: true, source: "Tribunal de Commerce" },
    { id: "mp-03", objectiveId: "dossier-soumission", name: "Attestation de situation fiscale DGI", description: "Preuve de régularité fiscale, validité 3 mois.", isRequired: true, source: "Direction Générale des Impôts" },
    { id: "mp-04", objectiveId: "dossier-soumission", name: "Attestation CNSS à jour", description: "Preuve de régularité sociale, validité 3 mois.", isRequired: true, source: "CNSS" },
    { id: "mp-05", objectiveId: "dossier-soumission", name: "Attestation INSS employeur", description: "Preuve d'affiliation de l'entreprise à l'INSS.", isRequired: true, source: "INSS" },
    { id: "mp-06", objectiveId: "dossier-soumission", name: "Caution de soumission (garantie bancaire)", description: "Garantie bancaire représentant 2 à 3% du montant estimé du marché.", isRequired: true, tip: "Délai d'émission : 3 à 7 jours ouvrés selon la banque." },
    { id: "mp-07", objectiveId: "dossier-soumission", name: "Offre technique détaillée", description: "Méthodologie d'exécution, planning, moyens humains et matériels.", isRequired: true },
    { id: "mp-08", objectiveId: "dossier-soumission", name: "Offre financière (sous pli séparé)", description: "Devis détaillé et bordereau de prix unitaires.", isRequired: true, tip: "Déposer dans une enveloppe séparée et scellée." },
    { id: "mp-09", objectiveId: "dossier-soumission", name: "Attestation de bonne exécution de marchés antérieurs", description: "Au moins 3 attestations pour des marchés similaires.", isRequired: false },
    { id: "mp-10", objectiveId: "dossier-soumission", name: "Bilans des 3 derniers exercices certifiés", description: "Situations financières certifiées par un expert-comptable agréé.", isRequired: true },

    // Création d'entreprise - RCCM
    { id: "rccm-01", objectiveId: "immatriculation-rccm", name: "Statuts de la société notariés", description: "Acte constitutif rédigé et certifié par un notaire agréé.", isRequired: true },
    { id: "rccm-02", objectiveId: "immatriculation-rccm", name: "Formulaire de déclaration d'immatriculation", description: "Formulaire disponible au Greffe du Tribunal de Commerce.", isRequired: true, source: "Tribunal de Commerce" },
    { id: "rccm-03", objectiveId: "immatriculation-rccm", name: "Copies des pièces d'identité des associés", description: "Carte d'identité ou passeport de chaque associé et dirigeant.", isRequired: true },
    { id: "rccm-04", objectiveId: "immatriculation-rccm", name: "Justificatif du siège social", description: "Contrat de bail ou titre de propriété du local commercial.", isRequired: true },
    { id: "rccm-05", objectiveId: "immatriculation-rccm", name: "Preuve de libération du capital social", description: "Attestation bancaire ou certificat du notaire attestant le dépôt des apports.", isRequired: true },

    // Santé - Pharmacie
    { id: "ph-01", objectiveId: "pharmacie-autorisation", name: "Diplôme de pharmacien certifié", description: "Diplôme reconnu par le Conseil de l'Ordre des Pharmaciens du Congo.", isRequired: true, source: "Ordre des Pharmaciens / MINSANTE" },
    { id: "ph-02", objectiveId: "pharmacie-autorisation", name: "Attestation de nationalité ou titre de séjour", description: "Pour les pharmaciens étrangers : autorisation d'exercice délivrée par le Ministère de la Santé.", isRequired: true },
    { id: "ph-03", objectiveId: "pharmacie-autorisation", name: "Plan des locaux visé par l'ingénieur sanitaire", description: "Plans architecturaux de l'officine respectant les normes spatiales du MINSANTE.", isRequired: true },
    { id: "ph-04", objectiveId: "pharmacie-autorisation", name: "Liste du matériel pharmaceutique disponible", description: "Inventaire complet des équipements et mobiliers de l'officine.", isRequired: true },
    { id: "ph-05", objectiveId: "pharmacie-autorisation", name: "Contrat de bail du local (5 ans minimum)", description: "Bail commercial d'une durée minimale de 5 ans.", isRequired: true, tip: "La durée du bail est vérifiée lors de l'inspection." },
    { id: "ph-06", objectiveId: "pharmacie-autorisation", name: "RCCM de la pharmacie", description: "Immatriculation commerciale de l'officine pharmaceutique.", isRequired: true },
    { id: "ph-07", objectiveId: "pharmacie-autorisation", name: "NIF de la pharmacie", description: "Numéro d'Identification Fiscale de l'établissement.", isRequired: true },
    { id: "ph-08", objectiveId: "pharmacie-autorisation", name: "Rapport d'inspection préalable", description: "Rapport établi par l'inspecteur pharmaceutique provincial suite à la visite des locaux.", isRequired: true, tip: "Prévoir 2 à 3 mois entre la demande d'inspection et la visite effective." },
];

export function getDocumentsByObjective(objectiveId: string): RequiredDocument[] {
    return requiredDocuments.filter((d) => d.objectiveId === objectiveId);
}
