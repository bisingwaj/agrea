export interface Sector {
    id: string;
    name: string;
    description: string;
    icon: string; // nom d'icône Lucide
    color: string;
    sheetName: string;
    objectivesCount: number;
    objectives: string[];
}

export const sectors: Sector[] = [
    {
        id: "creation-entreprise",
        name: "Création d'Entreprise",
        description: "Immatriculation au RCCM, identification nationale et enregistrements fiscaux initiaux.",
        icon: "Briefcase",
        color: "#0D5C3A",
        sheetName: "01 — CREATION ENTREPRISE",
        objectivesCount: 7,
        objectives: [
            "Lancer mon premier projet entrepreneurial",
            "Sécuriser ma forme juridique actuelle",
            "Mettre l'entreprise en conformité avant une levée de fonds",
            "Éviter les pénalités liées aux retards d'immatriculation",
            "Transformer mon établissement en société (SARL/SA)"
        ]
    },
    {
        id: "btp",
        name: "BTP & Construction",
        description: "Permis de construire, agréments techniques, études d'impact et conformités environnementales.",
        icon: "Building2",
        color: "#0D5C3A",
        sheetName: "02 — BTP CONSTRUCTION",
        objectivesCount: 14,
        objectives: [
            "Démarrer un nouveau chantier immobilier",
            "Répondre à un appel d'offres public / privé",
            "Sécuriser le permis de construire",
            "S'assurer de la conformité environnementale (EIES)",
            "Obtenir l'agrément de Catégorie supérieure"
        ]
    },
    {
        id: "marches-publics",
        name: "Marchés Publics",
        description: "Attestations fiscales, certificats ARMP, DGI, CNSS et qualification de soumissionnaire.",
        icon: "FileText",
        color: "#0D5C3A",
        sheetName: "03 — MARCHES PUBLICS",
        objectivesCount: 12,
        objectives: [
            "Renouveler mes attestations fiscales et sociales",
            "Obtenir le certificat de régularité ARMP",
            "Soumissionner de manière imminente (Urgence)",
            "Préparer mon dossier de qualification",
            "Se mettre en règle avec l'ARSP (Sous-traitance)"
        ]
    },
    {
        id: "import-export",
        name: "Import & Export",
        description: "Licences d'importation, certificats d'origine, numéros import-export et dédouanement.",
        icon: "Globe",
        color: "#0D5C3A",
        sheetName: "04 — IMPORT EXPORT",
        objectivesCount: 10,
        objectives: [
            "Dédouaner une marchandise bloquée",
            "Obtenir mon numéro d'import/export permanent",
            "Préparer l'exportation de produits locaux",
            "Demander une exonération douanière",
            "Mettre en place la licence/autorisation adéquate"
        ]
    },
    {
        id: "sante",
        name: "Santé & Pharmacie",
        description: "Ouverture de cliniques, licences d'officine, enregistrement de médicaments et autorisations d'exercice.",
        icon: "Stethoscope",
        color: "#0D5C3A",
        sheetName: "05 — SANTE PHARMACIE",
        objectivesCount: 11,
        objectives: [
            "Ouvrir une nouvelle pharmacie ou clinique",
            "Lancer un nouveau produit/équipement médical",
            "Obtenir mon autorisation d'exercice",
            "Réussir l'inspection du Ministère de la Santé",
            "Renouveler mes licences sanitaires actuelles"
        ]
    },
    {
        id: "transport",
        name: "Transport & Logistique",
        description: "Licences de transport routier, fluvial, immatriculation de flottes et permis de conduire professionnels.",
        icon: "Truck",
        color: "#0D5C3A",
        sheetName: "06 — TRANSPORT LOGISTIQUE",
        objectivesCount: 9,
        objectives: [
            "Immatriculer ma flotte de camions/véhicules",
            "Lancer une nouvelle ligne de transport interurbain",
            "Obtenir mon autorisation de transport fluvial/aérien",
            "Renouveler les permis/autorisations des chauffeurs",
            "Régulariser mes contrats d'assurance flotte"
        ]
    },
    {
        id: "mines",
        name: "Mines & Carrières",
        description: "Permis de recherches, cartes d'exploitant artisanal, conformité environnementale et sociale minérale.",
        icon: "Mountain",
        color: "#0D5C3A",
        sheetName: "07 — MINES CARRIERES",
        objectivesCount: 10,
        objectives: [
            "Lancer l'exploration d'un nouveau carré minier",
            "Convertir mon permis de recherches en exploitation",
            "Préparer l'audit environnemental et social",
            "Exporter des produits miniers marchands",
            "Renouveler mes autorisations auprès du CAMI"
        ]
    },
    {
        id: "telecoms",
        name: "Télécoms & Médias",
        description: "Agréments ARPTC, fréquences radio, licences de fournisseur d'accès et autorisation d'exploitation.",
        icon: "Monitor",
        color: "#0D5C3A",
        sheetName: "08 — TELECOMS MEDIA",
        objectivesCount: 9,
        objectives: [
            "Obtenir une licence fournisseur d'accès Internet",
            "Demander ou renouveler une fréquence de radiodiffusion",
            "Déployer de nouvelles infrastructures (antennes, fibre)",
            "Assurer ma conformité ARPTC pour mon matériel",
            "Lancer un média audiovisuel ou une chaîne TNT"
        ]
    },
    {
        id: "education",
        name: "Éducation & Formation",
        description: "Agréments EPSP, ouverture d'écoles privées, universités et centres de formation professionnelle.",
        icon: "GraduationCap",
        color: "#0D5C3A",
        sheetName: "09 — EDUCATION FORMATION",
        objectivesCount: 8,
        objectives: [
            "Ouvrir une nouvelle école primaire / secondaire",
            "Lancer un centre de formation professionnelle reconnu",
            "Obtenir l'agrément universitaire (Ministère ESU)",
            "Régulariser les dossiers de mon personnel enseignant",
            "Homologuer de nouveaux modules de cours académiques"
        ]
    },
    {
        id: "agriculture",
        name: "Agriculture & Élevage",
        description: "Concessions agricoles, certificats phytosanitaires et homologations d'intrants.",
        icon: "Leaf",
        color: "#0D5C3A",
        sheetName: "10 — AGRICULTURE ELEVAGE",
        objectivesCount: 8,
        objectives: [
            "Sécuriser ma concession foncière agricole",
            "Importer des semences, engrais ou intrants spécialisés",
            "Exporter ma production agricole (café, cacao, etc.)",
            "Demander mon certificat phytosanitaire national",
            "Solliciter un financement ou une subvention ciblée"
        ]
    },
    {
        id: "securite",
        name: "Sécurité Privée",
        description: "Agréments gardiennage, licences port d'armes, agrément matériel de communication et télésurveillance.",
        icon: "ShieldAlert",
        color: "#0D5C3A",
        sheetName: "11 — SECURITE PRIVEE",
        objectivesCount: 7,
        objectives: [
            "Créer une nouvelle agence de gardiennage",
            "Demander l'autorisation d'importation de matériel sécuritaire",
            "Obtenir l'autorisation de port d'armes réglementaire",
            "Renouveler l'agrément du Ministère de l'Intérieur",
            "Remporter un marché public de sécurisation d'infrastructures"
        ]
    },
    {
        id: "finance",
        name: "Finances & Assurances",
        description: "Agréments BCC, agréments ARCA, transfert d'argent, microfinance et courtage en assurance.",
        icon: "Landmark",
        color: "#0D5C3A",
        sheetName: "12 — FINANCES ASSURANCES",
        objectivesCount: 8,
        objectives: [
            "Demander l'agrément officiel de la Banque Centrale (BCC)",
            "Lancer une structure de microfinance ou Mobile Money",
            "Obtenir l'agrément régulateur courtier / assureur (ARCA)",
            "Valider la conformité de mes procédures Anti-Blanchiment",
            "Lever des fonds agréés auprès d'investisseurs institutionnels"
        ]
    },
];

export function getSectorById(id: string): Sector | undefined {
    return sectors.find((s) => s.id === id);
}
