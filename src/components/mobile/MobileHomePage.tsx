"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { sectors } from "@/data/sectors";
import {
    Building2, Mountain, Leaf, Truck, Zap, Monitor,
    Stethoscope, ShoppingCart, Landmark, Factory, Utensils,
    GraduationCap, ChevronRight, ArrowRight
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    Building2, Mountain, Leaf, Truck, Zap, Monitor,
    Stethoscope, ShoppingCart, Landmark, Factory, Utensils, GraduationCap,
};

/* ─── Constants ────────────────────────────────────────────────────────────── */
const PX = "28px"; // Horizontal padding used throughout

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
function MobileHero() {
    const { t } = useTranslation();
    return (
        <section style={{
            padding: `60px ${PX} 56px`,
            background: "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(16, 185, 129, 0.1) 0%, transparent 65%)",
        }}>
            {/* Micro badge */}
            <span style={{
                display: "inline-block",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--green-900)",
                marginBottom: "24px",
                opacity: 0.9,
            }}>
                {t("home.hero_badge")}
            </span>

            {/* Main title */}
            <h1 style={{
                fontSize: "40px",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: "1.1",
                color: "var(--white)",
                marginBottom: "8px",
            }}>
                {t("home.hero_title1")}
            </h1>
            <p style={{
                fontSize: "38px",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "28px",
            }}>
                {t("home.hero_title2")}
            </p>

            {/* Description — max 2 lines on mobile */}
            <p style={{
                fontSize: "16px",
                color: "rgba(255,255,255,0.5)",
                lineHeight: "1.6",
                marginBottom: "40px",
                maxWidth: "320px",
                fontWeight: 400,
            }}>
                {t("home.hero_desc_mobile") || "Maîtrisez vos démarches administratives et fiscales en RDC."}
            </p>

            {/* Primary CTA */}
            <Link
                href="/evaluation"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "18px 24px",
                    background: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    borderRadius: "14px",
                    textDecoration: "none",
                    minHeight: "60px",
                    transition: "all 0.2s ease",
                    WebkitTapHighlightColor: "transparent",
                }}
                onTouchStart={(e) => {
                    e.currentTarget.style.background = "rgba(16,185,129,0.2)";
                    e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)";
                }}
                onTouchEnd={(e) => {
                    e.currentTarget.style.background = "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(16,185,129,0.05) 100%)";
                    e.currentTarget.style.borderColor = "rgba(16,185,129,0.3)";
                }}
            >
                <div>
                    <p style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "var(--white)",
                        letterSpacing: "-0.01em",
                        marginBottom: "2px",
                    }}>
                        {t("mobile.menu.start_diagnostic") || "Démarrer mon diagnostic"}
                    </p>
                    <p style={{
                        fontSize: "12px",
                        color: "var(--green-900)",
                        fontWeight: 500,
                    }}>
                        Gratuit · 2 minutes
                    </p>
                </div>
                <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}>
                    <ArrowRight size={16} color="var(--green-900)" />
                </div>
            </Link>
        </section>
    );
}

/* ─── Stats Strip ────────────────────────────────────────────────────────────── */
function MobileStats() {
    const { t } = useTranslation();
    const stats = [
        { value: t("home.stats_1_val"), label: t("home.stats_1_lbl") },
        { value: t("home.stats_2_val"), label: t("home.stats_2_lbl") },
        { value: t("home.stats_3_val"), label: t("home.stats_3_lbl") },
        { value: t("home.stats_4_val"), label: t("home.stats_4_lbl") },
    ];
    return (
        <section style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(16,185,129,0.02)",
        }}>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
            }}>
                {stats.map((s, i) => (
                    <div
                        key={i}
                        style={{
                            padding: "24px 16px",
                            textAlign: "center",
                            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                            scrollSnapAlign: "start",
                            minWidth: "80px",
                        }}
                    >
                        <p style={{
                            fontSize: "22px",
                            fontWeight: 700,
                            color: "var(--white)",
                            letterSpacing: "-0.03em",
                            marginBottom: "4px",
                            lineHeight: "1",
                        }}>{s.value}</p>
                        <p style={{
                            fontSize: "10px",
                            color: "rgba(255,255,255,0.4)",
                            fontWeight: 500,
                            lineHeight: "1.3",
                        }}>{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ─── How It Works — Timeline ───────────────────────────────────────────────── */
function MobileHowItWorks() {
    const { t } = useTranslation();
    const steps = [
        { num: "1", title: t("home.how_1_title"), desc: t("home.how_1_desc") },
        { num: "2", title: t("home.how_2_title"), desc: t("home.how_2_desc") },
        { num: "3", title: t("home.how_3_title"), desc: t("home.how_3_desc") },
    ];
    return (
        <section style={{ padding: `64px ${PX}` }}>
            {/* Section header */}
            <p style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.25)",
                marginBottom: "8px",
            }}>
                {t("home.how_badge")}
            </p>
            <h2 style={{
                fontSize: "28px",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                color: "var(--white)",
                marginBottom: "40px",
                lineHeight: "1.2",
            }}>
                {t("home.how_title")}
            </h2>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
                {/* Vertical line */}
                <div style={{
                    position: "absolute",
                    left: "15px",
                    top: "14px",
                    bottom: "14px",
                    width: "1px",
                    background: "linear-gradient(to bottom, rgba(16,185,129,0.4), rgba(16,185,129,0.1), transparent)",
                }} />

                {steps.map((step, i) => (
                    <div
                        key={step.num}
                        style={{
                            display: "flex",
                            gap: "24px",
                            marginBottom: i < steps.length - 1 ? "36px" : "0",
                            position: "relative",
                        }}
                    >
                        {/* Dot */}
                        <div style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: "rgba(16,185,129,0.12)",
                            border: "1px solid rgba(16,185,129,0.3)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            position: "relative",
                            zIndex: 1,
                        }}>
                            <span style={{
                                fontSize: "11px",
                                fontWeight: 700,
                                color: "var(--green-900)",
                            }}>{step.num}</span>
                        </div>

                        {/* Content */}
                        <div style={{ paddingTop: "4px" }}>
                            <h3 style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                color: "var(--white)",
                                marginBottom: "8px",
                                letterSpacing: "-0.01em",
                            }}>
                                {step.title}
                            </h3>
                            <p style={{
                                fontSize: "14px",
                                color: "rgba(255,255,255,0.45)",
                                lineHeight: "1.6",
                                fontWeight: 400,
                            }}>
                                {step.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* ─── Sectors — Pill List ───────────────────────────────────────────────────── */
function MobileSectorList() {
    const { t } = useTranslation();

    return (
        <section style={{ padding: `0 0 64px` }}>
            {/* Header */}
            <div style={{ padding: `0 ${PX} 24px` }}>
                <p style={{
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                    marginBottom: "8px",
                }}>
                    {t("home.sectors_label")}
                </p>
                <h2 style={{
                    fontSize: "28px",
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                    color: "var(--white)",
                    lineHeight: "1.2",
                }}>
                    {t("home.sectors_title")}
                </h2>
            </div>

            {/* Pill list — no padding, full-width rows */}
            <div>
                {sectors.map((sector, i) => {
                    const Icon = iconMap[sector.icon] || Building2;
                    return (
                        <Link
                            key={sector.id}
                            href={`/${sector.id}`}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: `14px ${PX}`,
                                textDecoration: "none",
                                borderBottom: "1px solid rgba(255,255,255,0.04)",
                                background: "transparent",
                                transition: "background 0.15s",
                                WebkitTapHighlightColor: "transparent",
                                minHeight: "64px",
                            }}
                            onTouchStart={(e) => {
                                e.currentTarget.style.background = "rgba(16,185,129,0.04)";
                            }}
                            onTouchEnd={(e) => {
                                setTimeout(() => { e.currentTarget.style.background = "transparent"; }, 150);
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "8px",
                                background: "rgba(16,185,129,0.06)",
                                border: "1px solid rgba(16,185,129,0.12)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <Icon size={17} color="var(--green-900)" strokeWidth={1.5} />
                            </div>

                            {/* Name */}
                            <p style={{
                                fontSize: "15px",
                                fontWeight: 500,
                                color: "rgba(255,255,255,0.85)",
                                flexGrow: 1,
                                letterSpacing: "-0.01em",
                            }}>
                                {t(`sectors.${sector.id}.name` as any)}
                            </p>

                            {/* Count badge */}
                            <span style={{
                                fontSize: "11px",
                                color: "var(--green-900)",
                                fontWeight: 600,
                                background: "rgba(16,185,129,0.08)",
                                padding: "3px 8px",
                                borderRadius: "100px",
                                flexShrink: 0,
                            }}>
                                {sector.objectivesCount}
                            </span>

                            <ChevronRight size={14} color="rgba(255,255,255,0.2)" style={{ flexShrink: 0 }} />
                        </Link>
                    );
                })}
            </div>

            {/* "Start diagnostic" link */}
            <div style={{ padding: `20px ${PX} 0` }}>
                <Link
                    href="/evaluation"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "var(--green-900)",
                        textDecoration: "none",
                    }}
                >
                    <ArrowRight size={14} />
                    {t("mobile.menu.start_diagnostic") || "Lancer mon diagnostic"}
                </Link>
            </div>
        </section>
    );
}

/* ─── CTA Final ─────────────────────────────────────────────────────────────── */
function MobileCTA() {
    const { t } = useTranslation();
    return (
        <section style={{
            margin: `0 ${PX} 64px`,
            padding: "40px 28px",
            background: "linear-gradient(135deg, #0D1F17 0%, #060F0B 100%)",
            border: "1px solid rgba(16,185,129,0.15)",
            borderRadius: "20px",
        }}>
            <p style={{
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--green-900)",
                marginBottom: "16px",
                opacity: 0.8,
            }}>
                Prêt ?
            </p>
            <h2 style={{
                fontSize: "26px",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "var(--white)",
                marginBottom: "12px",
                lineHeight: "1.2",
            }}>
                {t("report.cta_title") || "Prêt à être en règle ?"}
            </h2>
            <p style={{
                fontSize: "14px",
                color: "rgba(255,255,255,0.45)",
                lineHeight: "1.6",
                marginBottom: "28px",
                fontWeight: 400,
            }}>
                {t("report.cta_desc") || "Obtenez votre plan de conformité personnalisé en 2 minutes."}
            </p>

            <Link
                href="/contact"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "15px 20px",
                    background: "rgba(255,255,255,0.95)",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "14px",
                    borderRadius: "12px",
                    textDecoration: "none",
                    minHeight: "52px",
                    letterSpacing: "-0.01em",
                }}
            >
                <span>{t("report.cta_btn") || "Être rappelé gratuitement"}</span>
                <ArrowRight size={16} />
            </Link>
        </section>
    );
}

/* ─── Compact Footer ─────────────────────────────────────────────────────────── */
function MobileFooter() {
    const { t } = useTranslation();
    return (
        <footer style={{
            padding: `40px ${PX} 48px`,
            borderTop: "1px solid rgba(255,255,255,0.05)",
        }}>
            <p style={{
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "var(--white)",
                marginBottom: "16px",
            }}>
                agréa.
            </p>
            <p style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.3)",
                lineHeight: "1.6",
                marginBottom: "28px",
                maxWidth: "260px",
            }}>
                {t("footer.brand_desc")}
            </p>

            <div style={{ display: "flex", gap: "24px", marginBottom: "28px", flexWrap: "wrap" }}>
                {[
                    { href: "/evaluation", text: t("mobile.nav.diagnostic") || "Diagnostic" },
                    { href: "/guides", text: t("mobile.nav.guides") || "Guides" },
                    { href: "/contact", text: t("nav.contact") || "Contact" },
                    { href: "/analyses", text: t("mobile.nav.analyses") || "Analyses" },
                ].map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        style={{
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.35)",
                            textDecoration: "none",
                        }}
                    >
                        {link.text}
                    </Link>
                ))}
            </div>

            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>
                © {new Date().getFullYear()} Agréa Africa · Kinshasa, RDC
            </p>
        </footer>
    );
}

/* ─── Main Orchestrator ──────────────────────────────────────────────────────── */
export default function MobileHomePage() {
    return (
        <main>
            <MobileHero />
            <MobileStats />
            <MobileHowItWorks />
            <MobileSectorList />
            <MobileCTA />
            <MobileFooter />
        </main>
    );
}
