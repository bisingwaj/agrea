import { notFound } from "next/navigation";
import { getSectorById, sectors } from "@/data/sectors";
import proceduresData from "@/data/procedures.json";
import DiagnosticWizard from "@/components/diagnostic/DiagnosticWizard";

import { getTranslationContext } from "@/lib/tServer";

export function generateStaticParams() {
    return sectors.map((s) => ({ secteur: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ secteur: string }> }) {
    const { secteur } = await params;
    const sector = getSectorById(secteur);
    if (!sector) return {};
    const tServer = await getTranslationContext();
    return {
        title: `Diagnostic de conformité ${tServer(sector.name)} | Agréa`,
        description: "Évaluez vos obligations réglementaires instantanément.",
    };
}

export default async function DiagnosticPage({ params }: { params: Promise<{ secteur: string }> }) {
    const { secteur } = await params;
    const sector = getSectorById(secteur);

    if (!sector) notFound();

    const procedures = (proceduresData as any)[sector.sheetName] || [];

    // On passe les données au composant Client qui va gérer l'état du Wizard (zéro scroll)
    return (
        <DiagnosticWizard sector={sector} procedures={procedures} />
    );
}
