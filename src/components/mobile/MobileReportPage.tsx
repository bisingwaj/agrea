"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowRight, AlertTriangle, CheckCircle, XCircle, ArrowLeft,
    ShieldCheck, TrendingUp, Clock, DollarSign
} from "lucide-react";
import { ScoringResult, DiagnosticData } from "@/lib/scoring";
import { useTranslation } from "@/lib/i18n";
import { FadeUp } from "@/components/animations/FadeUp";
import PdfDownloadButton from "@/components/result/PdfDownloadButton";
import { RadarChart, RadarAxis } from "@/components/ui/RadarChart";
import { AcronymTooltip } from "@/components/ui/AcronymTooltip";

interface StoredData {
    form: DiagnosticData;
    result: ScoringResult;
}

function buildRadarAxes(result: ScoringResult, sector: string): RadarAxis[] {
    const gaps = result.gaps;
    const criticalGaps = gaps.filter(g => g.severity === "critical").length;
    const importantGaps = gaps.filter(g => g.severity === "important").length;

    const adminIds = ["rccm", "nif", "inss", "cnss", "attestation", "journal"];
    const adminGaps = gaps.filter(g => adminIds.some(k => g.id.includes(k))).length;
    const administrative = Math.max(0, Math.min(100, 100 - adminGaps * 25 - criticalGaps * 3));

    const fiscalIds = ["tva", "dgi", "fiscal", "impot", "patente", "taxe"];
    const fiscalGaps = gaps.filter(g => fiscalIds.some(k => g.id.includes(k))).length;
    const fiscal = Math.max(0, Math.min(100, 100 - fiscalGaps * 30 - criticalGaps * 2));

    const sectoriel = Math.min(100, Math.max(0, result.score - criticalGaps * 8 + importantGaps * 2));
    const juridique = Math.min(100, Math.round(result.score * 0.9 + result.strengths.length * 4));

    return [
        { label: "Admin.", value: Math.round(administrative) },
        { label: "Fiscal", value: Math.round(fiscal) },
        { label: "Sectoriel", value: Math.round(sectoriel) },
        { label: "Juridique", value: Math.round(juridique) },
    ];
}

const SEVERITY_COLORS: Record<string, string> = {
    critical: "#DC2626",
    important: "#D97706",
    optional: "#6B7280",
};

export default function MobileReportPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const [data, setData] = useState<StoredData | null>(null);

    useEffect(() => {
        const raw = sessionStorage.getItem("agrea_diagnostic");
        if (!raw) { router.replace("/evaluation"); return; }
        setData(JSON.parse(raw));
    }, [router]);

    if (!data) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-[var(--text-muted)] text-sm">{t("report.loading")}</p>
            </div>
        );
    }

    const { form, result } = data;

    const levelColor = result.score >= 85 ? "#0D5C3A" : result.score >= 65 ? "#16A34A" : result.score >= 35 ? "#D97706" : "#DC2626";
    const levelLabel = result.score >= 85 ? t("report.levels.excellent") : result.score >= 65 ? t("report.levels.conforme") : result.score >= 35 ? t("report.levels.partiel") : t("report.levels.non-conforme");
    const LevelIcon = result.score >= 65 ? CheckCircle : result.score >= 35 ? AlertTriangle : XCircle;

    return (
        <div className="min-h-screen bg-[var(--bg-main)] pt-[80px] pb-[100px] px-4">

            {/* Back Link */}
            <Link href="/evaluation" className="inline-flex items-center gap-2 text-[var(--text-muted)] text-sm mb-6">
                <ArrowLeft size={14} /> {t("report.redo")}
            </Link>

            {/* Header */}
            <FadeUp delay={0}>
                <div className="mb-6">
                    <span className="badge mb-3 inline-flex text-xs">{t("report.badge")}</span>
                    <h1 className="text-2xl font-bold text-[var(--white)] tracking-tight mb-2 leading-tight">
                        {t("report.hello")} {form.contactName.split(" ")[0]},
                    </h1>
                    <p className="text-sm text-[var(--text-secondary)]">{t("report.subtitle")}</p>
                </div>
            </FadeUp>

            {/* Score Hero Card — Mobile centré */}
            <FadeUp delay={0.1}>
                <div
                    className="rounded-2xl p-5 mb-5 overflow-hidden"
                    style={{
                        background: "linear-gradient(135deg, rgba(13,92,58,0.12) 0%, rgba(16,185,129,0.06) 100%)",
                        border: "1px solid rgba(16,185,129,0.2)",
                    }}
                >
                    {/* Radar centré sur mobile */}
                    <div className="flex flex-col items-center gap-4 mb-5">
                        <div className="relative">
                            <RadarChart axes={buildRadarAxes(result, form.sector)} size={180} animated />
                        </div>

                        {/* Score numérique + label */}
                        <div className="text-center">
                            <p className="text-5xl font-extrabold text-[var(--white)] tracking-tight leading-none mb-1">
                                {result.score}
                            </p>
                            <p className="text-xs text-[var(--text-muted)] mb-3">/ 100</p>
                            <div
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                                style={{ background: `${levelColor}18`, color: levelColor, border: `1px solid ${levelColor}30` }}
                            >
                                <LevelIcon size={13} />
                                {levelLabel}
                            </div>
                        </div>
                    </div>

                    {/* Mini stat row */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col items-center bg-white/5 rounded-xl p-3">
                            <CheckCircle size={16} className="text-emerald-400 mb-1" />
                            <p className="text-xl font-bold text-[var(--white)]">{result.strengths.length}</p>
                            <p className="text-[10px] text-[var(--text-muted)] text-center leading-tight">{t("report.strengths")}</p>
                        </div>
                        <div className="flex flex-col items-center bg-white/5 rounded-xl p-3">
                            <TrendingUp size={16} className="text-amber-400 mb-1" />
                            <p className="text-xl font-bold text-[var(--white)]">{result.gaps.length}</p>
                            <p className="text-[10px] text-[var(--text-muted)] text-center leading-tight">{t("report.gaps")}</p>
                        </div>
                        {result.estimatedTotalCostUsd > 0 && (
                            <div className="flex flex-col items-center bg-white/5 rounded-xl p-3">
                                <DollarSign size={16} className="text-blue-400 mb-1" />
                                <p className="text-base font-bold text-[var(--white)]">~{result.estimatedTotalCostUsd.toLocaleString()}</p>
                                <p className="text-[10px] text-[var(--text-muted)] text-center leading-tight">USD</p>
                            </div>
                        )}
                    </div>
                </div>
            </FadeUp>

            {/* Download Button */}
            <FadeUp delay={0.15}>
                <div className="mb-6">
                    <PdfDownloadButton result={result} data={form} />
                </div>
            </FadeUp>

            {/* Strengths */}
            {result.strengths.length > 0 && (
                <FadeUp delay={0.2}>
                    <div className="mb-6">
                        <h2 className="text-base font-semibold text-[var(--white)] mb-3 flex items-center gap-2">
                            <ShieldCheck size={16} className="text-emerald-400" />
                            {t("report.strengths")}
                        </h2>
                        <div className="flex flex-col gap-2">
                            {result.strengths.map((s, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
                                >
                                    <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                                    <p className="text-sm text-[var(--text-secondary)]">{s}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeUp>
            )}

            {/* Action Plan */}
            {result.gaps.length > 0 && (
                <div className="mb-6">
                    <FadeUp delay={0.25}>
                        <h2 className="text-base font-semibold text-[var(--white)] mb-4 flex items-center gap-2">
                            <TrendingUp size={16} className="text-amber-400" />
                            {t("report.action_plan")}
                        </h2>
                    </FadeUp>

                    <div className="flex flex-col gap-3">
                        {result.gaps.map((gap, i) => (
                            <FadeUp key={gap.id} delay={0.3 + i * 0.07}>
                                <div
                                    className="rounded-2xl overflow-hidden"
                                    style={{
                                        background: "var(--bg-card)",
                                        border: "1px solid var(--border)",
                                        borderLeft: `4px solid ${SEVERITY_COLORS[gap.severity]}`,
                                    }}
                                >
                                    {/* Badge de sévérité */}
                                    <div className="px-4 pt-4 pb-2 flex items-center gap-2 flex-wrap">
                                        <span
                                            className="text-[9px] font-bold tracking-widest px-2 py-1 rounded-full"
                                            style={{
                                                background: `${SEVERITY_COLORS[gap.severity]}18`,
                                                color: SEVERITY_COLORS[gap.severity],
                                            }}
                                        >
                                            {t(`report.severity_labels.${gap.severity}`)}
                                        </span>
                                        {gap.estimatedDays > 0 && (
                                            <span className="text-[9px] text-[var(--text-muted)] flex items-center gap-1">
                                                <Clock size={10} />
                                                {gap.estimatedDays} {t("report.days_unit")}
                                            </span>
                                        )}
                                        {gap.estimatedCostUsd > 0 && (
                                            <span className="text-[9px] text-[var(--text-muted)] flex items-center gap-1">
                                                <DollarSign size={10} />
                                                {gap.estimatedCostUsd.toLocaleString()} USD
                                            </span>
                                        )}
                                    </div>

                                    {/* Title avec AcronymTooltip adapté mobile (tooltip vers le bas) */}
                                    <div className="px-4 pb-2">
                                        <p className="text-[15px] font-bold text-[var(--white)] leading-snug mb-1">
                                            <AcronymTooltip text={gap.title} placement="bottom" />
                                        </p>
                                        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
                                            <AcronymTooltip text={gap.description} placement="bottom" />
                                        </p>
                                    </div>

                                    {/* Action recommandée */}
                                    <div
                                        className="mx-4 mb-4 px-3 py-2.5 rounded-xl"
                                        style={{ background: "rgba(13,92,58,0.12)", border: "1px solid rgba(16,185,129,0.15)" }}
                                    >
                                        <p className="text-[12px] font-semibold text-emerald-400 leading-relaxed">
                                            → {gap.action}
                                        </p>
                                    </div>
                                </div>
                            </FadeUp>
                        ))}
                    </div>
                </div>
            )}

            {/* CTA Final */}
            <FadeUp delay={0.5}>
                <div
                    className="rounded-2xl p-5 flex flex-col gap-4"
                    style={{ background: "var(--gray-950)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                    <div>
                        <p className="text-[var(--white)] font-semibold text-base mb-1">{t("report.cta_title")}</p>
                        <p className="text-[var(--text-muted)] text-sm">{t("report.cta_desc")}</p>
                    </div>
                    <Link
                        href="/contact"
                        className="flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-white text-black font-semibold text-sm rounded-full"
                    >
                        {t("report.cta_btn")} <ArrowRight size={15} />
                    </Link>
                </div>
            </FadeUp>
        </div>
    );
}
