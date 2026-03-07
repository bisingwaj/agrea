import type { Metadata } from "next";
import DiagnosticForm from "@/components/evaluation/DiagnosticForm";

export const metadata: Metadata = {
    title: "Diagnostic de conformité — Agréa Africa",
    description: "Évaluez votre situation administrative en 5 minutes. Recevez un rapport personnalisé avec votre score de conformité et un plan d'action prioritaire.",
};

export default function EvaluationPage() {
    return (
        <main style={{ height: "calc(100vh - 72px)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <DiagnosticForm />
        </main>
    );
}
