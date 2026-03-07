"use client";

import DiagnosticForm from "@/components/evaluation/DiagnosticForm";
import MobileDiagnosticForm from "@/components/mobile/MobileDiagnosticForm";
import { useIsDesktop } from "@/hooks/useIsDesktop";

/**
 * EvaluationPage — uses a completely different layout on mobile vs desktop.
 * Desktop: original DiagnosticForm unchanged.
 * Mobile: MobileDiagnosticForm — full-screen, no scroll, 6 compact screens.
 *
 * NOTE: useIsDesktop returns `undefined` during SSR. We default to mobile
 * layout (safer for most users) until the client determines viewport size.
 */
export default function EvaluationPage() {
    const isDesktop = useIsDesktop();

    // ── DESKTOP ────────────────────────────────────────────────────────────
    if (isDesktop === true) {
        return (
            <main style={{ height: "calc(100vh - 72px)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DiagnosticForm />
            </main>
        );
    }

    // ── MOBILE / SSR fallback ──────────────────────────────────────────────
    return (
        <main style={{
            height: "100dvh",
            maxHeight: "100dvh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-main)",
            paddingTop: "56px", // MobileNavbar height
        }}>
            <MobileDiagnosticForm />
        </main>
    );
}
