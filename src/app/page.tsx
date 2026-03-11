"use client";

import { useIsDesktop } from "@/hooks/useIsDesktop";
import MobileHomePage from "@/components/mobile/MobileHomePage";

// Desktop static page content (imported inline for simplicity)
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { industrySectors, creationSector } from "@/data/sectors";
import { Building2, Mountain, Leaf, Truck, Zap, Monitor, Stethoscope, ShoppingCart, Landmark, Factory, Utensils, GraduationCap, ChevronRight, Briefcase } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerReveal } from "@/components/animations/StaggerReveal";

const iconMap: Record<string, React.ElementType> = {
  Building2, Mountain, Leaf, Truck, Zap, Monitor, Stethoscope, ShoppingCart, Landmark, Factory, Utensils, GraduationCap,
};

function DesktopHomePage() {
  const { t } = useTranslation();

  const stats = [
    { value: t("home.stats_1_val"), label: t("home.stats_1_lbl") },
    { value: t("home.stats_2_val"), label: t("home.stats_2_lbl") },
    { value: t("home.stats_3_val"), label: t("home.stats_3_lbl") },
    { value: t("home.stats_4_val"), label: t("home.stats_4_lbl") },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://agrea.africa/#website",
                "url": "https://agrea.africa",
                "name": "Agréa Africa",
                "description": t("home.hero_desc"),
                "publisher": { "@id": "https://agrea.africa/#organization" }
              },
              {
                "@type": "ProfessionalService",
                "@id": "https://agrea.africa/#organization",
                "name": "Agréa Africa",
                "url": "https://agrea.africa",
                "description": "Plateforme de facilitation administrative et réglementaire en République Démocratique du Congo.",
                "areaServed": "Democratic Republic of the Congo"
              }
            ]
          })
        }}
      />

      {/* Hero */}
      <section className="section" style={{ paddingBottom: "80px", paddingTop: "80px", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ maxWidth: "840px" }}>
            <FadeUp delay={0.1}>
              <span className="badge" style={{ marginBottom: "24px", display: "inline-flex", border: "1px solid rgba(255, 255, 255, 0.1)", background: "rgba(255, 255, 255, 0.03)", color: "var(--text-secondary)", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "12px", padding: "6px 14px" }}>
                {t("home.hero_badge")}
              </span>
            </FadeUp>
            <h1 className="hero-title" style={{ marginBottom: "24px", fontSize: "clamp(40px, 8vw, 64px)", lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: 500 }}>
              <TextReveal delay={0.2}>{t("home.hero_title1")}</TextReveal><br />
              <TextReveal delay={0.3}><span style={{ color: "var(--text-secondary)" }}>{t("home.hero_title2")}</span></TextReveal>
            </h1>
            <FadeUp delay={0.5}>
              <p style={{ fontSize: "20px", maxWidth: "680px", marginBottom: "48px", lineHeight: "1.6", color: "var(--text-secondary)", margin: "0 auto 48px auto", fontWeight: 400 }}>
                {t("home.hero_desc")}
              </p>
            </FadeUp>
            <FadeUp delay={0.6}>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="/evaluation" className="btn-primary" style={{ padding: "14px 28px", fontSize: "15px", fontWeight: 500 }}>
                  {t("home.hero_btn1")}
                </Link>
                <Link href="/contact" className="btn-secondary" style={{ padding: "14px 28px", fontSize: "15px", fontWeight: 500, background: "transparent", border: "1px solid rgba(255,255,255,0.15)" }}>
                  {t("home.hero_btn2")}
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Stats Bar */}
        <StaggerReveal staggerDelay={0.15}>
          <div style={{ marginTop: "60px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.3)", padding: "40px 0" }}>
            <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "40px" }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "36px", fontWeight: 600, color: "var(--white)", letterSpacing: "-0.02em", marginBottom: "8px" }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: "15px", color: "var(--text-secondary)", fontWeight: 500 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </StaggerReveal>
      </section>

      {/* Comment ça marche */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <FadeUp delay={0.1}>
            <div style={{ textAlign: "center", marginBottom: "80px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.1em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "16px", display: "inline-block" }}>
                {t("home.how_badge")}
              </span>
              <h2 style={{ fontSize: "40px", fontWeight: 500, letterSpacing: "-0.02em" }}>{t("home.how_title")}</h2>
            </div>
          </FadeUp>
          <StaggerReveal staggerDelay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "48px" }}>
              {[
                { step: "01", title: t("home.how_1_title"), desc: t("home.how_1_desc") },
                { step: "02", title: t("home.how_2_title"), desc: t("home.how_2_desc") },
                { step: "03", title: t("home.how_3_title"), desc: t("home.how_3_desc") },
              ].map((item) => (
                <div key={item.step} style={{ display: "flex", flexDirection: "column", padding: "32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px" }}>
                  <span style={{ fontSize: "40px", fontWeight: 300, color: "var(--green-900)", opacity: 0.5, marginBottom: "20px", lineHeight: "1" }}>{item.step}</span>
                  <h3 style={{ marginBottom: "16px", color: "var(--white)", fontSize: "22px", fontWeight: 500 }}>{item.title}</h3>
                  <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.6" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* Secteurs */}
      <section id="secteurs" className="section" style={{ padding: "120px 0" }}>
        <div className="container">
          <FadeUp delay={0.1}>
            <div style={{ maxWidth: "600px", marginBottom: "60px" }}>
              <p className="label" style={{ marginBottom: "16px", color: "var(--text-muted)" }}>{t("home.sectors_label")}</p>
              <h2 style={{ fontSize: "clamp(32px, 6vw, 48px)", fontWeight: 500, letterSpacing: "-0.02em", marginBottom: "16px" }}>{t("home.sectors_title")}</h2>
              <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: "1.7" }}>{t("home.sectors_desc")}</p>
            </div>
          </FadeUp>
          <StaggerReveal staggerDelay={0.08}>
            <div style={{ marginBottom: "40px" }}>
              <Link href={`/${creationSector.id}`} className="card glow-card" style={{ display: "flex", padding: "40px", textDecoration: "none", cursor: "pointer", background: "linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(0,0,0,0) 100%)", border: "1px solid rgba(16, 185, 129, 0.2)", position: "relative", overflow: "hidden", alignItems: "center" }}>
                <div style={{ display: "flex", width: "100%", gap: "32px", alignItems: "center" }}>
                   <div style={{ width: "80px", height: "80px", borderRadius: "20px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                     <Briefcase size={40} color="var(--green-900)" strokeWidth={1.5} />
                   </div>
                   <div style={{ flexGrow: 1 }}>
                     <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                       <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--green-900)", fontWeight: 600 }}>Nouveau Projet</span>
                     </div>
                     <h3 style={{ marginBottom: "12px", fontSize: "28px", color: "var(--white)", fontWeight: 500 }}>{t(`sectors.${creationSector.id}.name` as any)}</h3>
                     <p style={{ fontSize: "16px", lineHeight: "1.6", color: "var(--text-secondary)", maxWidth: "80%" }}>{t(`sectors.${creationSector.id}.desc` as any)}</p>
                   </div>
                   <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--green-900)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", flexShrink: 0 }}>
                     <ChevronRight size={24} color="var(--white)" />
                   </div>
                </div>
              </Link>
            </div>
            
            <div style={{ marginBottom: "32px" }}>
               <h3 style={{ fontSize: "24px", fontWeight: 500, color: "var(--white)" }}>Ou choisissez votre secteur d'activité</h3>
            </div>
          </StaggerReveal>

          <StaggerReveal staggerDelay={0.08}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {industrySectors.map((sector) => {
                const Icon = iconMap[sector.icon] || Building2;
                return (
                  <Link key={sector.id} href={`/${sector.id}`} className="card glow-card" style={{ display: "flex", padding: "40px", textDecoration: "none", cursor: "pointer", height: "100%", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
                      <div style={{ width: "56px", height: "56px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={28} color="var(--green-900)" strokeWidth={1.5} />
                      </div>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--gray-100)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease" }}>
                        <ChevronRight size={18} color="var(--text-secondary)" />
                      </div>
                    </div>
                    <h3 style={{ marginBottom: "16px", fontSize: "20px", color: "var(--white)", fontWeight: 500 }}>{t(`sectors.${sector.id}.name` as any)}</h3>
                    <p style={{ fontSize: "15px", lineHeight: "1.7", color: "var(--text-secondary)", flexGrow: 1 }}>{t(`sectors.${sector.id}.desc` as any)}</p>
                    <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--green-900)" }} />
                      <span style={{ fontSize: "13px", color: "var(--green-900)", fontWeight: 500 }}>{sector.objectivesCount} {t("home.sectors_procedures")}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </StaggerReveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--bg-card)", padding: "100px 0", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <FadeUp delay={0.1}>
            <h2 style={{ color: "var(--white)", marginBottom: "20px", fontSize: "32px", fontWeight: 500, letterSpacing: "-0.02em" }}>{t("home.cta_title")}</h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p style={{ color: "var(--text-secondary)", fontSize: "18px", marginBottom: "40px", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.6" }}>{t("home.cta_desc")}</p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: "15px", padding: "14px 28px" }}>{t("home.cta_btn")}</Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  const isDesktop = useIsDesktop();

  // Skeleton / loading state to avoid layout flash
  if (isDesktop === undefined) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-main)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "2px solid var(--border)", borderTopColor: "var(--green-900)", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return isDesktop ? <DesktopHomePage /> : <MobileHomePage />;
}
