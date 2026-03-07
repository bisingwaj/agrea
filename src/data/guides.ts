export interface GuideData {
    id: string;
    slug: string;
    titleKey: string;
    sectorKey: string;
    pages: number;
    date: string;
    stats: {
        delai: string;
        cout: string;
        complexite: string;
    };
    chart: {
        admin: number;
        tech: number;
        fin: number;
    };
    contentKeys: {
        description: string;
        forWho: string;
        whatYouGet: string[];
    };
    structures: string[];
}

export const GUIDES_DATA: GuideData[] = [
    {
        id: "1",
        slug: "marches-publics-rdc",
        titleKey: "guides.g1_title",
        sectorKey: "sectors.marches-publics.name",
        pages: 24,
        date: "Jan 2025",
        stats: { delai: "30 - 60 jrs", cout: "Variable", complexite: "Élevée" },
        chart: { admin: 50, tech: 30, fin: 20 },
        contentKeys: {
            description: "Un guide exhaustif détaillant l'ensemble des procédures, seuils et critères d'éligibilité pour remporter des appels d'offres publics en République Démocratique du Congo en 2025.",
            forWho: "Entreprises locales et internationales souhaitant soumissionner aux marchés publics congolais (Fournitures, Services, Travaux).",
            whatYouGet: [
                "Décryptage de la Loi relative aux Marchés Publics",
                "Processus d'obtention de l'attestation fiscale et sociale",
                "Checklist complète du dossier d'appel d'offres (DAO)",
                "Stratégies de structuration des garanties bancaires"
            ]
        },
        structures: [
            "Autorité de Régulation des Marchés Publics (ARMP)",
            "Direction Générale de Contrôle des Marchés Publics (DGCMP)",
            "Ministère du Budget",
            "Direction Générale des Impôts (DGI)",
            "Caisse Nationale de Sécurité Sociale (CNSS)"
        ]
    },
    {
        id: "2",
        slug: "agrement-btp-construction",
        titleKey: "guides.g2_title",
        sectorKey: "sectors.btp.name",
        pages: 36,
        date: "Fév 2025",
        stats: { delai: "45 - 90 jrs", cout: "500$ - 2000$", complexite: "Élevée" },
        chart: { admin: 30, tech: 60, fin: 10 },
        contentKeys: {
            description: "Votre feuille de route pour obtenir l'agrément d'entrepreneur BTP et naviguer dans les permis de construire et normes environnementales.",
            forWho: "Entreprises de construction, cabinets d'architecture, et bureaux d'études techniques actifs ou s'installant en RDC.",
            whatYouGet: [
                "Catégorisation des entreprises BTP (A à E)",
                "Dossier technique exigé par les ITP",
                "Normes d'impact environnemental (ACE)",
                "Étapes d'approbation des plans d'architecture"
            ]
        },
        structures: [
            "Ministère des Infrastructures et Travaux Publics (ITP)",
            "Secrétariat Général aux ITP",
            "Agence Congolaise de l'Environnement (ACE)",
            "Ordre National des Architectes / Ingénieurs Civils"
        ]
    },
    {
        id: "3",
        slug: "structuration-juridique-creation",
        titleKey: "guides.g3_title",
        sectorKey: "sectors.creation-entreprise.name",
        pages: 18,
        date: "Jan 2025",
        stats: { delai: "3 - 7 jrs", cout: "120$ (min)", complexite: "Basse" },
        chart: { admin: 80, tech: 0, fin: 20 },
        contentKeys: {
            description: "Toutes les étapes pour immatriculer une société (SARL, SA, SAS) au Guichet Unique avec les implications fiscales de départ.",
            forWho: "Investisseurs locaux, fondateurs de startups et groupes étrangers ouvrant une filiale en RDC.",
            whatYouGet: [
                "Comparatif des formes juridiques (OHADA)",
                "Processus d'immatriculation au Guichet Unique (GUCE)",
                "Obtention de l'Identification Nationale et RCCM",
                "Ouverture d'un compte bancaire de société"
            ]
        },
        structures: [
            "Guichet Unique de Création d'Entreprise (GUCE)",
            "Ministère de l'Économie Nationale",
            "Greffe du Tribunal de Commerce",
            "Notariat congolais"
        ]
    },
    {
        id: "4",
        slug: "licences-import-export-douanes",
        titleKey: "guides.g4_title",
        sectorKey: "sectors.import-export.name",
        pages: 22,
        date: "Mars 2025",
        stats: { delai: "15 - 30 jrs", cout: "Sur cotation", complexite: "Moyenne" },
        chart: { admin: 40, tech: 20, fin: 40 },
        contentKeys: {
            description: "Maîtrisez les procédures de dédouanement (SEGUCE), l'obtention du numéro import/export et la conformité BIVAC/OCC.",
            forWho: "Commerçants, distributeurs, commissionnaires en douane et logisticiens traitant à l'international.",
            whatYouGet: [
                "Obtention du Numéro Import-Export",
                "Plateforme Sydonia World et SEGUCE",
                "Procédures d'inspection avant embarquement",
                "Tarif douanier et exonérations éventuelles"
            ]
        },
        structures: [
            "Direction Générale des Douanes et Accises (DGDA)",
            "Office Congolais de Contrôle (OCC)",
            "Société d'Exploitation du Guichet Unique pour le Commerce Extérieur (SEGUCE)",
            "Ministère du Commerce Extérieur"
        ]
    },
    {
        id: "5",
        slug: "compliance-sante-pharmacie",
        titleKey: "guides.g5_title",
        sectorKey: "sectors.sante.name",
        pages: 40,
        date: "Nov 2024",
        stats: { delai: "60 - 120 jrs", cout: "Élevé", complexite: "Très Élevée" },
        chart: { admin: 30, tech: 60, fin: 10 },
        contentKeys: {
            description: "Guide strict de mise en conformité pour l'ouverture d'établissements de santé, l'homologation de médicaments et l'importation pharmaceutique.",
            forWho: "Laboratoires pharmaceutiques, fondateurs d'hôpitaux/cliniques, répartiteurs et pharmaciens.",
            whatYouGet: [
                "Autorisation d'ouverture d'officine/clinique",
                "Autorisation de Mise sur le Marché (AMM) des médicaments",
                "Conformité avec l'Ordre National des Médecins/Pharmaciens",
                "Réglementation sur les dispositifs médicaux"
            ]
        },
        structures: [
            "Ministère de la Santé Publique",
            "Direction de la Pharmacie et du Médicament (DPM)",
            "Ordre National des Médecins / Pharmaciens",
            "Inspection Générale de la Santé"
        ]
    }
];
