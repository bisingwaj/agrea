"use client";

import type { Metadata } from "next";
import DiagnosticForm from "@/components/evaluation/DiagnosticForm";
import MobileDiagnosticForm from "@/components/mobile/MobileDiagnosticForm";
import { useIsDesktop } from "@/hooks/useIsDesktop";

/**
 * EvaluationPage — uses a completely different layout on mobile vs desktop.
 * Desktop: original DiagnosticForm unchanged.
 * Mobile: MobileDiagnosticForm — full-screen, no scroll, 6 compact screens.
 */
export default function EvaluationPage() {
    const isDesktop = useIsDesktop();

    // ── DESKTOP ────────────────────────────────────────────────────────────
    if (isDesktop) {
        return (
            <main style={{ height: "calc(100vh - 72px)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DiagnosticForm />
            </main>
        );
    }

    // ── MOBILE ─────────────────────────────────────────────────────────────
    // Full-screen with MobileNavbar height (56px) deducted
    return (
        <main style={{
            height: "calc(100dvh - 56px)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-main)",
        }}>
            <MobileDiagnosticForm />
        </main>
    );
}
