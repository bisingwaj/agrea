"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, AlertTriangle, CheckCircle, XCircle, Download, ArrowLeft } from "lucide-react";
import { ScoringResult, DiagnosticData } from "@/lib/scoring";
import { useTranslation } from "@/lib/i18n";

interface StoredData {
    form: DiagnosticData;
    result: ScoringResult;
}

function ScoreGauge({ score }: { score: number }) {
    const radius = 72;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const color =
        score >= 85 ? "#0D5C3A" : score >= 65 ? "#16A34A" : score >= 35 ? "#D97706" : "#DC2626";

    return (
        <div style={{ position: "relative", width: "180px", height: "180px" }}>
            <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="90" cy="90" r={radius} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="12" />
                <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                />
            </svg>
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                }}
            >
                <p style={{ fontSize: "36px", fontWeight: 700, color: "var(--gray-950)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                    {score}
                </p>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>/ 100</p>
            </div>
        </div>
    );
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
                <ScoreGauge score={result.score} />

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

                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
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
                    <h2 style={{ fontSize: "1.25rem", marginBottom: "16px" }}>{t("report.action_plan")}</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        {result.gaps.map((gap, i) => (
                            <div
                                key={gap.id}
                                style={{
                                    padding: "20px 20px",
                                    border: "1px solid var(--border)",
                                    borderRadius: "12px",
                                    background: "white",
                                    borderLeft: `4px solid ${SEVERITY_COLORS[gap.severity]}`,
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                                            <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", padding: "2px 8px", borderRadius: "100px", background: SEVERITY_COLORS[gap.severity] + "18", color: SEVERITY_COLORS[gap.severity] }}>
                                                {gap.severity === 'critical' ? t('report.levels.non-conforme') : gap.severity === 'important' ? t('report.levels.partiel') : t('report.levels.conforme')}
                                            </span>
                                            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t("report.priority")} {i + 1}</span>
                                        </div>
                                        <p style={{ fontWeight: 600, color: "var(--gray-950)", fontSize: "15px", marginBottom: "6px" }}>{gap.title}</p>
                                        <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "10px" }}>{gap.description}</p>
                                        <p style={{ fontSize: "13px", fontWeight: 500, color: "var(--green-900)" }}>
                                            {t("report.action")} : {gap.action}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                                        <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px" }}>{t("report.delay")}</p>
                                        <p style={{ fontWeight: 600, fontSize: "14px", color: "var(--gray-950)" }}>{gap.estimatedDays} {t("report.days")}</p>
                                        {gap.estimatedCostUsd > 0 && (
                                            <>
                                                <p style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "6px", marginBottom: "2px" }}>{t("report.cost")}</p>
                                                <p style={{ fontWeight: 600, fontSize: "14px", color: "var(--gray-950)" }}>{gap.estimatedCostUsd.toLocaleString()} USD</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
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
                <div style={{ display: "flex", gap: "12px", flexDirection: "column", alignItems: "flex-start" }}>
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
