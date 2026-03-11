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

export const creationSector: Sector = {
    id: "creation-entreprise",
    name: "data_sectors.creation-entreprise.name",
    description: "data_sectors.creation-entreprise.description",
    icon: "Briefcase",
    color: "#0D5C3A",
    sheetName: "01 — CREATION ENTREPRISE",
    objectivesCount: 7,
    objectives: [
        "data_sectors.creation-entreprise.objectives_list.0",
        "data_sectors.creation-entreprise.objectives_list.1",
        "data_sectors.creation-entreprise.objectives_list.2",
        "data_sectors.creation-entreprise.objectives_list.3",
        "data_sectors.creation-entreprise.objectives_list.4"
    ]
};

export const industrySectors: Sector[] = [
    {
        id: "btp",
        name: "data_sectors.btp.name",
        description: "data_sectors.btp.description",
        icon: "Building2",
        color: "#0D5C3A",
        sheetName: "02 — BTP CONSTRUCTION",
        objectivesCount: 14,
        objectives: [
            "data_sectors.btp.objectives_list.0",
            "data_sectors.btp.objectives_list.1",
            "data_sectors.btp.objectives_list.2",
            "data_sectors.btp.objectives_list.3",
            "data_sectors.btp.objectives_list.4"
        ]
    },
    {
        id: "marches-publics",
        name: "data_sectors.marches-publics.name",
        description: "data_sectors.marches-publics.description",
        icon: "FileText",
        color: "#0D5C3A",
        sheetName: "03 — MARCHES PUBLICS",
        objectivesCount: 12,
        objectives: [
            "data_sectors.marches-publics.objectives_list.0",
            "data_sectors.marches-publics.objectives_list.1",
            "data_sectors.marches-publics.objectives_list.2",
            "data_sectors.marches-publics.objectives_list.3",
            "data_sectors.marches-publics.objectives_list.4"
        ]
    },
    {
        id: "import-export",
        name: "data_sectors.import-export.name",
        description: "data_sectors.import-export.description",
        icon: "Globe",
        color: "#0D5C3A",
        sheetName: "04 — IMPORT EXPORT",
        objectivesCount: 10,
        objectives: [
            "data_sectors.import-export.objectives_list.0",
            "data_sectors.import-export.objectives_list.1",
            "data_sectors.import-export.objectives_list.2",
            "data_sectors.import-export.objectives_list.3",
            "data_sectors.import-export.objectives_list.4"
        ]
    },
    {
        id: "sante",
        name: "data_sectors.sante.name",
        description: "data_sectors.sante.description",
        icon: "Stethoscope",
        color: "#0D5C3A",
        sheetName: "05 — SANTE PHARMACIE",
        objectivesCount: 11,
        objectives: [
            "data_sectors.sante.objectives_list.0",
            "data_sectors.sante.objectives_list.1",
            "data_sectors.sante.objectives_list.2",
            "data_sectors.sante.objectives_list.3",
            "data_sectors.sante.objectives_list.4"
        ]
    },
    {
        id: "transport",
        name: "data_sectors.transport.name",
        description: "data_sectors.transport.description",
        icon: "Truck",
        color: "#0D5C3A",
        sheetName: "06 — TRANSPORT LOGISTIQUE",
        objectivesCount: 9,
        objectives: [
            "data_sectors.transport.objectives_list.0",
            "data_sectors.transport.objectives_list.1",
            "data_sectors.transport.objectives_list.2",
            "data_sectors.transport.objectives_list.3",
            "data_sectors.transport.objectives_list.4"
        ]
    },
    {
        id: "mines",
        name: "data_sectors.mines.name",
        description: "data_sectors.mines.description",
        icon: "Mountain",
        color: "#0D5C3A",
        sheetName: "07 — MINES CARRIERES",
        objectivesCount: 10,
        objectives: [
            "data_sectors.mines.objectives_list.0",
            "data_sectors.mines.objectives_list.1",
            "data_sectors.mines.objectives_list.2",
            "data_sectors.mines.objectives_list.3",
            "data_sectors.mines.objectives_list.4"
        ]
    },
    {
        id: "telecoms",
        name: "data_sectors.telecoms.name",
        description: "data_sectors.telecoms.description",
        icon: "Monitor",
        color: "#0D5C3A",
        sheetName: "08 — TELECOMS MEDIA",
        objectivesCount: 9,
        objectives: [
            "data_sectors.telecoms.objectives_list.0",
            "data_sectors.telecoms.objectives_list.1",
            "data_sectors.telecoms.objectives_list.2",
            "data_sectors.telecoms.objectives_list.3",
            "data_sectors.telecoms.objectives_list.4"
        ]
    },
    {
        id: "education",
        name: "data_sectors.education.name",
        description: "data_sectors.education.description",
        icon: "GraduationCap",
        color: "#0D5C3A",
        sheetName: "09 — EDUCATION FORMATION",
        objectivesCount: 8,
        objectives: [
            "data_sectors.education.objectives_list.0",
            "data_sectors.education.objectives_list.1",
            "data_sectors.education.objectives_list.2",
            "data_sectors.education.objectives_list.3",
            "data_sectors.education.objectives_list.4"
        ]
    },
    {
        id: "agriculture",
        name: "data_sectors.agriculture.name",
        description: "data_sectors.agriculture.description",
        icon: "Leaf",
        color: "#0D5C3A",
        sheetName: "10 — AGRICULTURE ELEVAGE",
        objectivesCount: 8,
        objectives: [
            "data_sectors.agriculture.objectives_list.0",
            "data_sectors.agriculture.objectives_list.1",
            "data_sectors.agriculture.objectives_list.2",
            "data_sectors.agriculture.objectives_list.3",
            "data_sectors.agriculture.objectives_list.4"
        ]
    },
    {
        id: "securite",
        name: "data_sectors.securite.name",
        description: "data_sectors.securite.description",
        icon: "ShieldAlert",
        color: "#0D5C3A",
        sheetName: "11 — SECURITE PRIVEE",
        objectivesCount: 7,
        objectives: [
            "data_sectors.securite.objectives_list.0",
            "data_sectors.securite.objectives_list.1",
            "data_sectors.securite.objectives_list.2",
            "data_sectors.securite.objectives_list.3",
            "data_sectors.securite.objectives_list.4"
        ]
    },
    {
        id: "finance",
        name: "data_sectors.finance.name",
        description: "data_sectors.finance.description",
        icon: "Landmark",
        color: "#0D5C3A",
        sheetName: "12 — FINANCES ASSURANCES",
        objectivesCount: 8,
        objectives: [
            "data_sectors.finance.objectives_list.0",
            "data_sectors.finance.objectives_list.1",
            "data_sectors.finance.objectives_list.2",
            "data_sectors.finance.objectives_list.3",
            "data_sectors.finance.objectives_list.4"
        ]
    },
];

export const sectors: Sector[] = [
    ...industrySectors.filter(s => s.id !== "marches-publics" && s.id !== "creation-entreprise")
];

export function getSectorById(id: string): Sector | undefined {
    return sectors.find((s) => s.id === id);
}
