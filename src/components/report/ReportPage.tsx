"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { ScoringResult, DiagnosticData, ComplianceGap } from "@/lib/scoring";
import { useTranslation } from "@/lib/i18n";
import { FadeUp } from "@/components/animations/FadeUp";
import PdfDownloadButton from "@/components/result/PdfDownloadButton";
import { RadarChart, RadarAxis } from "@/components/ui/RadarChart";
import { AcronymTooltip } from "@/components/ui/AcronymTooltip";

interface StoredData {
    form: DiagnosticData;
    result: ScoringResult;
}

/** Calcule les 4 axes du radar depuis les résultats de conformité */
function buildRadarAxes(result: ScoringResult, sector: string): RadarAxis[] {
    const gaps = result.gaps;
    const criticalGaps = gaps.filter(g => g.severity === "critical").length;
    const importantGaps = gaps.filter(g => g.severity === "important").length;
    const totalGaps = gaps.length;

    // Admin : gap ids liés à RCCM, NIF, INSS, CNSS
    const adminIds = ["rccm", "nif", "inss", "cnss", "attestation", "journal"];
    const adminGaps = gaps.filter(g => adminIds.some(k => g.id.includes(k))).length;
    const administrative = Math.max(0, Math.min(100, 100 - adminGaps * 25 - criticalGaps * 3));

    // Fiscal : gap ids liés à TVA, impôt, DGI
    const fiscalIds = ["tva", "dgi", "fiscal", "impot", "patente", "taxe"];
    const fiscalGaps = gaps.filter(g => fiscalIds.some(k => g.id.includes(k))).length;
    const fiscal = Math.max(0, Math.min(100, 100 - fiscalGaps * 30 - criticalGaps * 2));

    // Sectoriel : calé sur le score global
    const sectoriel = Math.min(100, Math.max(0, result.score - criticalGaps * 8 + importantGaps * 2));

    // Juridique : force + atouts
    const juridique = Math.min(100, Math.round(result.score * 0.9 + result.strengths.length * 4));

    return [
        { label: "Admin.", value: Math.round(administrative) },
        { label: "Fiscal", value: Math.round(fiscal) },
        { label: "Sectoriel", value: Math.round(sectoriel) },
        { label: "Juridique", value: Math.round(juridique) },
    ];
}

export default function ReportPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const [data, setData] = useState<StoredData | null>(null);

    const LEVEL_CONFIG: Record<
        ScoringResult["level"],
        { label: string; color: string; bg: string; border: string; icon: React.ElementType }
    > = {
        "non-conforme": {
            label: t("report.levels.non-conforme"),
            color: "#DC2626",
            bg: "#FEF2F2",
            border: "#FECACA",
            icon: XCircle,
        },
        partiel: {
            label: t("report.levels.partiel"),
            color: "#D97706",
            bg: "#FFFBEB",
            border: "#FDE68A",
            icon: AlertTriangle,
        },
        conforme: {
            label: t("report.levels.conforme"),
            color: "#0D5C3A",
            bg: "#F0FDF4",
            border: "#DCFCE7",
            icon: CheckCircle,
        },
        excellent: {
            label: t("report.levels.excellent"),
            color: "#0D5C3A",
            bg: "#F0FDF4",
            border: "#DCFCE7",
            icon: CheckCircle,
        },
    };

    const SEVERITY_COLORS: Record<string, string> = {
        critical: "#DC2626",
        important: "#D97706",
        optional: "#6B7280",
    };

    useEffect(() => {
        const raw = sessionStorage.getItem("agrea_diagnostic");
        if (!raw) {
            router.replace("/evaluation");
            return;
        }
        setData(JSON.parse(raw));
    }, [router]);

    if (!data) {
        return (
            <div className="container" style={{ paddingTop: "80px", textAlign: "center" }}>
                <p style={{ color: "var(--text-muted)" }}>{t("report.loading")}</p>
            </div>
        );
    }

    const { form, result } = data;
    const levelCfg = LEVEL_CONFIG[result.level];
    const LevelIcon = levelCfg.icon;

    return (
        <div className="container" style={{ maxWidth: "800px", paddingTop: "48px", paddingBottom: "80px" }}>
            {/* Back link */}
            <Link
                href="/evaluation"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "13px", marginBottom: "32px" }}
            >
                <ArrowLeft size={14} /> {t("report.redo")}
            </Link>

            {/* Header */}
            <div style={{ marginBottom: "40px" }}>
                <span className="badge" style={{ marginBottom: "16px", display: "inline-flex" }}>
                    {t("report.badge")}
                </span>
                <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", marginBottom: "12px" }}>
                    {t("report.hello")} {form.contactName.split(" ")[0]},
                </h1>
                <p>{t("report.subtitle")}</p>
            </div>

            {/* Score card */}
            <div
                style={{
                    padding: "36px",
                    border: `1px solid ${levelCfg.border}`,
                    borderRadius: "16px",
                    background: levelCfg.bg,
                    display: "flex",
                    gap: "40px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "32px",
                }}
            >
                {/* ------ Radar Chart ------ */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                <RadarChart axes={buildRadarAxes(result, form.sector)} size={220} animated />
                <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "36px", fontWeight: 800, color: "var(--gray-950)", lineHeight: 1, letterSpacing: "-0.04em", marginBottom: "2px" }}>
                        {result.score}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 500 }}>/ 100</p>
                </div>
            </div>

                <div style={{ flex: 1, minWidth: "200px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <LevelIcon size={20} color={levelCfg.color} strokeWidth={1.5} />
                        <span style={{ fontSize: "15px", fontWeight: 600, color: levelCfg.color }}>
                            {levelCfg.label}
                        </span>
                    </div>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px" }}>
                        {result.score >= 85
                            ? t("report.feedback.excellent")
                            : result.score >= 65
                                ? t("report.feedback.conforme")
                                : result.score >= 35
                                    ? t("report.feedback.partiel")
                                    : t("report.feedback.non")}
                    </p>

                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "24px" }}>
                        <div>
                            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>{t("report.strengths")}</p>
                            <p style={{ fontWeight: 600, color: "var(--gray-950)", fontSize: "18px" }}>{result.strengths.length}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>{t("report.gaps")}</p>
                            <p style={{ fontWeight: 600, color: "var(--gray-950)", fontSize: "18px" }}>{result.gaps.length}</p>
                        </div>
                        {result.estimatedTotalCostUsd > 0 && (
                            <div>
                                <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>{t("report.cost")}</p>
                                <p style={{ fontWeight: 600, color: "var(--gray-950)", fontSize: "18px" }}>
                                    ~{result.estimatedTotalCostUsd.toLocaleString()} USD
                                </p>
                            </div>
                        )}
                    </div>
                    <PdfDownloadButton result={result} data={form} />
                </div>
            </div>

            {/* Strengths */}
            {result.strengths.length > 0 && (
                <div style={{ marginBottom: "32px" }}>
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>{t("report.strengths")}</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {result.strengths.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "12px",
                                    padding: "12px 16px",
                                    border: "1px solid var(--green-100)",
                                    borderRadius: "8px",
                                    background: "var(--green-50)",
                                }}
                            >
                                <CheckCircle size={16} color="var(--green-900)" strokeWidth={1.5} />
                                <p style={{ fontSize: "14px", color: "var(--gray-950)", fontWeight: 400 }}>{s}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Gaps */}
            {result.gaps.length > 0 && (
                <div style={{ marginBottom: "40px" }}>
                    <FadeUp delay={0.4}>
                        <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>{t("report.action_plan")}</h2>
                    </FadeUp>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {result.gaps.map((gap, i) => (
                            <FadeUp key={gap.id} delay={0.5 + i * 0.1}>
                                <div
                                    style={{
                                        padding: "24px",
                                        border: "1px solid var(--border)",
                                        borderRadius: "16px",
                                        background: "white",
                                        borderLeft: `4px solid ${SEVERITY_COLORS[gap.severity]}`,
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                                        transition: "transform 0.2s ease",
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "20px", flexWrap: "wrap" }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                                                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", padding: "3px 10px", borderRadius: "100px", background: SEVERITY_COLORS[gap.severity] + "15", color: SEVERITY_COLORS[gap.severity], textTransform: "uppercase" }}>
                                                    {t(`report.levels.${gap.severity}` as any)}
                                                </span>
                                                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", padding: "3px 10px", borderRadius: "100px", background: "rgba(0,0,0,0.05)", color: "var(--text-muted)", textTransform: "uppercase" }}>
                                                    {t(`report.impact_levels.${gap.impact}` as any)} {t("report.impact")}
                                                </span>
                                                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", padding: "3px 10px", borderRadius: "100px", background: "rgba(0,0,0,0.05)", color: "var(--text-muted)", textTransform: "uppercase" }}>
                                                    {t("report.difficulty")} : {t(`report.difficulty_levels.${gap.difficulty}` as any)}
                                                </span>
                                            </div>
                                            <p style={{ fontWeight: 700, color: "var(--gray-950)", fontSize: "17px", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                                                <AcronymTooltip text={gap.title} />
                                            </p>
                                            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "16px", lineHeight: "1.5" }}>
                                                <AcronymTooltip text={gap.description} />
                                            </p>
                                            <div style={{ padding: "12px 16px", background: "var(--green-50)", borderRadius: "8px", border: "1px solid var(--green-100)" }}>
                                                <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--green-900)" }}>
                                                    <span style={{ opacity: 0.7, marginRight: "4px" }}>→</span>{gap.action}
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: "right", flexShrink: 0, paddingLeft: "16px", borderLeft: "1px solid var(--border)" }}>
                                            <p style={{ fontSize: "10px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase" }}>{t("report.delay")}</p>
                                            <p style={{ fontWeight: 700, fontSize: "15px", color: "var(--gray-950)" }}>{gap.estimatedDays} {t("report.days")}</p>
                                            {gap.estimatedCostUsd > 0 && (
                                                <>
                                                    <p style={{ fontSize: "10px", fontWeight: 600, color: "var(--text-muted)", marginTop: "12px", marginBottom: "4px", textTransform: "uppercase" }}>{t("report.cost")}</p>
                                                    <p style={{ fontWeight: 800, fontSize: "16px", color: "var(--green-900)" }}>{gap.estimatedCostUsd.toLocaleString()} <span style={{ fontSize: '11px' }}>USD</span></p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            )}

            {/* CTA */}
            <div
                style={{
                    padding: "32px",
                    background: "var(--gray-950)",
                    borderRadius: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "24px",
                }}
            >
                <div>
                    <p style={{ color: "white", fontWeight: 600, fontSize: "18px", marginBottom: "8px" }}>
                        {t("report.cta_title")}
                    </p>
                    <p style={{ color: "var(--gray-400)", fontSize: "14px" }}>
                        {t("report.cta_desc")}
                    </p>
                </div>
                <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                    <PdfDownloadButton result={result} data={form} />
                    <Link
                        href="/contact"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px 24px",
                            background: "white",
                            color: "var(--gray-950)",
                            borderRadius: "8px",
                            fontWeight: 500,
                            fontSize: "14px",
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {t("report.cta_btn")} <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
