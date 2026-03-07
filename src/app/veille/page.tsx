"use client";

import Link from "next/link";
import { Bell, ArrowRight, Check } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function VeillePage() {
    const { t } = useTranslation();

    const PLANS = [
        {
            id: "starter",
            name: t("veille.plans.starter.name"),
            price: t("veille.plans.starter.price"),
            period: t("veille.month"),
            sectors: t("veille.plans.starter.sectors"),
            frequency: t("veille.plans.starter.frequency"),
            features: [
                "1 secteur couvert",
                "Bulletin hebdomadaire par email",
                "Accès base de données réglementaire",
                "Alertes urgentes par WhatsApp",
            ],
            cta: t("veille.cta_idle") + " — 25 USD" + t("veille.month"),
            highlight: false,
        },
        {
            id: "pro",
            name: t("veille.plans.pro.name"),
            price: t("veille.plans.pro.price"),
            period: t("veille.month"),
            sectors: t("veille.plans.pro.sectors"),
            frequency: t("veille.plans.pro.frequency"),
            features: [
                "3 secteurs couverts",
                "Bulletin hebdomadaire personnalisé",
                "Analyse d'impact pour votre activité",
                "Alertes urgentes par WhatsApp",
                "1 consultation mensuelle (30 min)",
            ],
            cta: t("veille.cta_idle") + " — 50 USD" + t("veille.month"),
            highlight: true,
        },
        {
            id: "business",
            name: t("veille.plans.business.name"),
            price: t("veille.plans.business.price"),
            period: t("veille.month"),
            sectors: t("veille.plans.business.sectors"),
            frequency: t("veille.plans.business.frequency"),
            features: [
                "Tous les secteurs couverts",
                "Bulletin bi-hebdomadaire",
                "Analyse d'impact approfondie",
                "Alertes en temps quasi-réel",
                "2 consultations mensuelles",
                "Accès aux appels d'offres",
            ],
            cta: t("veille.cta_idle") + " — 100 USD" + t("veille.month"),
            highlight: false,
        },
        {
            id: "enterprise",
            name: t("veille.plans.enterprise.name"),
            price: t("veille.plans.enterprise.price"),
            period: "",
            sectors: t("veille.plans.enterprise.sectors"),
            frequency: t("veille.plans.enterprise.frequency"),
            features: [
                "Couverture sur mesure",
                "Veille en temps réel",
                "Conseiller dédié",
                "Rapports d'analyse hebdomadaires",
                "Formations réglementaires internes",
                "API données disponible",
            ],
            cta: t("veille.cta_contact"),
            highlight: false,
        },
    ];

    return (
        <>
            <section className="section" style={{ paddingBottom: "64px" }}>
                <div className="container">
                    <div style={{ maxWidth: "600px", marginBottom: "64px" }}>
                        <span className="badge" style={{ marginBottom: "20px", display: "inline-flex", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>{t("veille.badge")}</span>
                        <h1 style={{ marginBottom: "16px", color: "var(--white)" }}>
                            {t("veille.title")}
                        </h1>
                        <p style={{ fontSize: "17px", color: "var(--text-secondary)" }}>
                            {t("veille.desc")}
                        </p>
                    </div>

                    {/* Plans */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                            gap: "16px",
                            alignItems: "start",
                        }}
                    >
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={plan.highlight ? "glow-card" : ""}
                                style={{
                                    padding: "28px 24px",
                                    border: `1px solid ${plan.highlight ? "rgba(16, 185, 129, 0.3)" : "var(--border)"}`,
                                    borderRadius: "12px",
                                    background: plan.highlight ? "rgba(16, 185, 129, 0.05)" : "var(--bg-card)",
                                    position: "relative",
                                    boxShadow: plan.highlight ? "0 0 30px rgba(16, 185, 129, 0.05)" : "none",
                                    transition: "transform 0.2s ease",
                                }}
                            >
                                {plan.highlight && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "-12px",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            padding: "4px 16px",
                                            background: "var(--green-900)",
                                            color: "var(--bg-main)",
                                            borderRadius: "100px",
                                            fontSize: "11px",
                                            fontWeight: 700,
                                            letterSpacing: "0.06em",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {t("veille.popular")}
                                    </div>
                                )}

                                <div style={{ marginBottom: "20px" }}>
                                    <p style={{ fontSize: "13px", fontWeight: 500, marginBottom: "8px", color: plan.highlight ? "var(--green-900)" : "var(--text-muted)" }}>
                                        {plan.name}
                                    </p>
                                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                                        {plan.period ? (
                                            <>
                                                <span style={{ fontSize: "32px", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.02em" }}>
                                                    {plan.price} USD
                                                </span>
                                                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                                                    {plan.period}
                                                </span>
                                            </>
                                        ) : (
                                            <span style={{ fontSize: "26px", fontWeight: 700, color: "var(--white)" }}>
                                                {plan.price}
                                            </span>
                                        )}
                                    </div>
                                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>
                                        {plan.sectors} · {plan.frequency}
                                    </p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                                    {plan.features.map((feature, i) => (
                                        <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                            <Check size={14} color={plan.highlight ? "var(--green-900)" : "var(--text-muted)"} style={{ flexShrink: 0, marginTop: "2px" }} />
                                            <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href="/contact"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "8px",
                                        padding: "12px 20px",
                                        borderRadius: "8px",
                                        background: plan.highlight ? "var(--green-900)" : "rgba(255,255,255,0.05)",
                                        color: plan.highlight ? "var(--bg-main)" : "var(--white)",
                                        fontWeight: 600,
                                        fontSize: "13px",
                                        textDecoration: "none",
                                        border: plan.highlight ? "none" : "1px solid var(--border)",
                                        transition: "all 0.2s ease"
                                    }}
                                >
                                    {plan.cta} <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section style={{ background: "var(--bg-card)", padding: "64px 0", borderTop: "1px solid var(--border)" }}>
                <div className="container">
                    <p className="label" style={{ marginBottom: "20px", color: "var(--green-900)" }}>{t("veille.how_badge")}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "32px" }}>
                        {[
                            { step: "01", title: t("veille.how_1_title"), desc: t("veille.how_1_desc") },
                            { step: "02", title: t("veille.how_2_title"), desc: t("veille.how_2_desc") },
                            { step: "03", title: t("veille.how_3_title"), desc: t("veille.how_3_desc") },
                        ].map((item) => (
                            <div key={item.step}>
                                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "12px" }}>
                                    {item.step}
                                </p>
                                <h3 style={{ marginBottom: "10px", color: "var(--white)" }}>{item.title}</h3>
                                <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
