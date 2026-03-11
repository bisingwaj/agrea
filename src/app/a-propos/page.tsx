import React from "react";
import Link from "next/link";
import { getTranslationContext } from "@/lib/tServer";
import { FadeUp } from "@/components/animations/FadeUp";
import { TextReveal } from "@/components/animations/TextReveal";
import { StaggerReveal } from "@/components/animations/StaggerReveal";
import { Parallax } from "@/components/animations/Parallax";

export async function generateMetadata() {
    const { t: tServer } = await getTranslationContext();
    return {
        title: "À propos d'Agréa Africa",
        description: tServer("about.hero_desc"),
    };
}

export default async function AboutPage() {
    const { t: tServer } = await getTranslationContext();

    const STATS = [
        { value: tServer("about.impact_1_val"), label: tServer("about.impact_1_lbl") },
        { value: tServer("about.impact_2_val"), label: tServer("about.impact_2_lbl") },
        { value: tServer("about.impact_3_val"), label: tServer("about.impact_3_lbl") },
        { value: tServer("about.impact_4_val"), label: tServer("about.impact_4_lbl") },
    ];

    const VALUES = [
        { title: tServer("about.v1_title"), desc: tServer("about.v1_desc") },
        { title: tServer("about.v2_title"), desc: tServer("about.v2_desc") },
        { title: tServer("about.v3_title"), desc: tServer("about.v3_desc") },
        { title: tServer("about.v4_title"), desc: tServer("about.v4_desc") },
        { title: tServer("about.v5_title"), desc: tServer("about.v5_desc") },
        { title: tServer("about.v6_title"), desc: tServer("about.v6_desc") },
    ];

    const METHOD = [
        { title: tServer("about.method_step1_title"), desc: tServer("about.method_step1_desc") },
        { title: tServer("about.method_step2_title"), desc: tServer("about.method_step2_desc") },
        { title: tServer("about.method_step3_title"), desc: tServer("about.method_step3_desc") },
        { title: tServer("about.method_step4_title"), desc: tServer("about.method_step4_desc") },
    ];

    const EXPERTS = [
        tServer("about.exp_1"), tServer("about.exp_2"), tServer("about.exp_3"), tServer("about.exp_4")
    ];

    const INSTITUTIONS = [
        "ANAPI", "DGI", "CNSS", "ARPTC", "DGDA", "DGRAD",
        "Min. des Mines", "Min. du BTP", "Min. de la Santé", "BCC", "Min. Environnement", "Min. Économie"
    ];

    return (
        <section style={{ paddingBottom: "100px" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "AboutPage",
                        "name": "À propos d'Agréa Africa",
                        "description": tServer("about.hero_desc"),
                        "publisher": {
                            "@id": "https://agrea.africa/#organization"
                        }
                    })
                }}
            />
            {/* Header / Hero */}
            <div className="inner-hero" style={{ paddingTop: "140px", paddingBottom: "80px", position: "relative", overflow: "hidden" }}>
                <Parallax offset={150} className="absolute inset-0 z-0 pointer-events-none">
                    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "800px", height: "400px", background: "radial-gradient(ellipse, rgba(16, 185, 129, 0.08) 0%, transparent 60%)", filter: "blur(60px)" }}></div>
                </Parallax>

                <div className="container" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ maxWidth: "900px" }}>
                        <FadeUp delay={0.1}>
                            <span className="badge" style={{ marginBottom: "32px", display: "inline-flex" }}>
                                {tServer("about.badge")}
                            </span>
                        </FadeUp>
                        <h1 style={{ marginBottom: "32px", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: "1.1", fontWeight: 600, letterSpacing: "-0.03em" }}>
                            <TextReveal delay={0.2}>{tServer("about.h1_1")}</TextReveal><br />
                            <TextReveal delay={0.3}><span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>{tServer("about.h1_2")}</span></TextReveal>
                        </h1>
                        <FadeUp delay={0.5}>
                            <p style={{ fontSize: "22px", lineHeight: "1.6", color: "var(--text-secondary)", margin: "0 auto", maxWidth: "700px" }}>
                                {tServer("about.hero_desc")}
                            </p>
                        </FadeUp>
                    </div>
                </div>
            </div>

            {/* Impact Stats */}
            <div style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.015)", padding: "80px 0" }}>
                <div className="container">
                    <FadeUp delay={0.1}>
                        <div style={{ textAlign: "center", marginBottom: "60px" }}>
                            <span className="label" style={{ display: "block", marginBottom: "16px" }}>{tServer("about.impact_title")}</span>
                        </div>
                    </FadeUp>
                    <StaggerReveal staggerDelay={0.15}>
                        <div className="mobile-grid-2col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", textAlign: "center" }}>
                            {STATS.map((s, i) => (
                                <div key={i}>
                                    <p className="mobile-h1" style={{ fontSize: "56px", fontWeight: 600, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.03em" }}>{s.value}</p>
                                    <p style={{ fontSize: "14px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </StaggerReveal>
                </div>
            </div>

            <div className="container" style={{ paddingTop: "80px" }}>

                {/* Values (Principles) */}
                <div style={{ marginBottom: "80px" }}>
                    <FadeUp delay={0.1}>
                        <div style={{ textAlign: "center", marginBottom: "80px" }}>
                            <span className="label" style={{ display: "block", marginBottom: "16px" }}>{tServer("about.values_badge")}</span>
                            <h2 style={{ fontSize: "40px", fontWeight: 500, letterSpacing: "-0.02em" }}>{tServer("about.values_title")}</h2>
                        </div>
                    </FadeUp>

                    <StaggerReveal staggerDelay={0.1}>
                        <div className="mobile-grid-1col" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
                            {VALUES.map((v, i) => (
                                <div key={i} style={{ padding: "28px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "16px", transition: "all 0.3s ease" }} className="glow-card">
                                    <span style={{ display: "inline-block", padding: "6px 14px", background: "rgba(16, 185, 129, 0.1)", color: "var(--green-900)", borderRadius: "100px", fontSize: "13px", fontWeight: 600, marginBottom: "24px" }}>0{i + 1}</span>
                                    <h3 style={{ marginBottom: "16px", fontSize: "20px", color: "var(--white)" }}>{v.title}</h3>
                                    <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)" }}>{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </StaggerReveal>
                </div>

                {/* Experts Section */}
                <div style={{ marginBottom: "160px", padding: "80px", background: "rgba(16, 185, 129, 0.02)", border: "1px solid rgba(16, 185, 129, 0.1)", borderRadius: "24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }} className="experts-grid">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media (max-width: 1024px) { .experts-grid { grid-template-columns: 1fr !important; padding: 40px !important; } }
                    `}} />
                    <FadeUp delay={0.1}>
                        <div>
                            <span className="label" style={{ display: "block", marginBottom: "16px" }}>{tServer("about.experts_badge")}</span>
                            <h2 style={{ fontSize: "36px", fontWeight: 500, marginBottom: "24px", color: "var(--white)" }}>{tServer("about.experts_title")}</h2>
                            <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "40px" }}>{tServer("about.experts_desc")}</p>
                        </div>
                    </FadeUp>
                    <StaggerReveal staggerDelay={0.15}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            {EXPERTS.map((exp, i) => (
                                <div key={i} style={{ padding: "24px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "var(--gray-border)", marginBottom: "16px" }}></div>
                                    <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--white)" }}>{exp}</p>
                                    <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>Certifié par l'Administration</p>
                                </div>
                            ))}
                        </div>
                    </StaggerReveal>
                </div>

                {/* Approach / Methodology */}
                <div style={{ marginBottom: "80px" }}>
                    <FadeUp delay={0.1}>
                        <div style={{ textAlign: "center", marginBottom: "80px" }}>
                            <span className="label" style={{ display: "block", marginBottom: "16px" }}>{tServer("about.method_badge")}</span>
                            <h2 style={{ fontSize: "40px", fontWeight: 500 }}>{tServer("about.method_title")}</h2>
                        </div>
                    </FadeUp>

                    <StaggerReveal staggerDelay={0.15}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }} className="method-grid">
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @media (max-width: 1024px) { .method-grid { grid-template-columns: repeat(2, 1fr) !important; } }
                                @media (max-width: 640px) { .method-grid { grid-template-columns: 1fr !important; } }
                            `}} />
                            {METHOD.map((m, i) => (
                                <div key={i} style={{ padding: "40px 32px", borderTop: "2px solid var(--border)", position: "relative" }}>
                                    <div style={{ position: "absolute", top: "-2px", left: "0", width: "40px", height: "2px", background: "var(--green-900)" }}></div>
                                    <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--green-900)", marginBottom: "24px", display: "block", textTransform: "uppercase" }}>{tServer("about.method_phase")} 0{i + 1}</span>
                                    <h3 style={{ marginBottom: "16px", fontSize: "22px", color: "var(--white)" }}>{m.title}</h3>
                                    <p style={{ fontSize: "15px", lineHeight: "1.6", color: "var(--text-secondary)" }}>{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </StaggerReveal>
                </div>

                {/* Institutions Logos Grid */}
                <div style={{ marginBottom: "80px", textAlign: "center" }}>
                    <FadeUp>
                        <div style={{ maxWidth: "700px", margin: "0 auto 60px auto" }}>
                            <span className="label" style={{ display: "block", marginBottom: "16px" }}>{tServer("about.institutions_badge")}</span>
                            <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>{tServer("about.institutions_title")}</h2>
                            <p style={{ color: "var(--text-secondary)" }}>{tServer("about.institutions_desc")}</p>
                        </div>
                    </FadeUp>

                    <StaggerReveal staggerDelay={0.05}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "24px" }} className="logos-grid">
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @media (max-width: 1024px) { .logos-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 16px !important; } }
                                @media (max-width: 640px) { .logos-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; } }
                            `}} />
                            {INSTITUTIONS.slice(0, 12).map((inst) => (
                                <div key={inst} style={{ height: "100px", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", padding: "16px", transition: "all 0.3s ease" }} className="glow-card">
                                    {/* Logo placeholder (icon) */}
                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.05)", marginBottom: "12px" }}></div>
                                    <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 500, letterSpacing: "0.02em", textAlign: "center" }}>
                                        {inst}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </StaggerReveal>
                </div>

                {/* Contact Footer */}
                <FadeUp delay={0.2}>
                    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "clamp(32px, 5vw, 60px)", background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "24px", textAlign: "center", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)" }} className="glow-card">
                        <span className="label" style={{ color: "var(--text-muted)", marginBottom: "24px", display: "inline-block", padding: "6px 16px", background: "rgba(255,255,255,0.05)", borderRadius: "100px", fontSize: "12px", letterSpacing: "0.05em", textTransform: "uppercase" }}>{tServer("about.contact_badge")}</span>
                        <p style={{ fontSize: "32px", fontWeight: 600, color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.03em" }}>{tServer("about.contact_title")}</p>
                        <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginBottom: "40px" }}>{tServer("about.tagline")}</p>
                        {/* Wrapper removed to fix SSR hydration context mismatch on pure <a> tag interactivity */}
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <Link href="/contact" style={{ display: "inline-flex", background: "var(--white)", color: "#000", padding: "18px 40px", borderRadius: "100px", fontSize: "16px", fontWeight: 500, textDecoration: "none", transition: "transform 0.2s ease" }} className="hover:scale-105">
                                {tServer("about.contact_btn")}
                            </Link>
                        </div>
                    </div>
                </FadeUp>
            </div>
        </section>
    );
}
