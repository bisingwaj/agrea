import type { Metadata } from "next";
import ReportPage from "@/components/report/ReportPage";

export const metadata: Metadata = {
    title: "Mon rapport de conformité — Agréa Africa",
    description: "Votre rapport personnalisé de conformité administrative en RDC. Score, lacunes détectées et plan d'action prioritaire.",
};

export default function MonRapportPage() {
    return <ReportPage />;
}
