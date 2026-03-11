import type { Metadata } from "next";
import MonRapportClientSwitch from "@/components/report/MonRapportClientSwitch";
import { getTranslationContext } from "@/lib/tServer";

export async function generateMetadata(): Promise<Metadata> {
    const { t: tServer } = await getTranslationContext();
    return {
        title: tServer("report.meta_title") || "Mon rapport de conformité — Agréa Africa",
        description: tServer("report.meta_desc") || "Votre rapport personnalisé de conformité administrative en RDC. Score, lacunes détectées et plan d'action prioritaire.",
    };
}

export default function MonRapportPage() {
    return <MonRapportClientSwitch />;
}
