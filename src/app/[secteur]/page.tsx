import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getSectorById, sectors } from "@/data/sectors";
import proceduresData from "@/data/procedures.json";
import { getTranslationContext } from "@/lib/tServer";

export function generateStaticParams() {
    return sectors.map((s) => ({ secteur: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ secteur: string }> }) {
    const { secteur } = await params;
    const sector = getSectorById(secteur);
    if (!sector) return {};

    const { t: tServer } = await getTranslationContext();

    const sectorName = tServer(sector.name);
    const sectorDesc = tServer(sector.description);
    const url = `https://agrea.africa/${secteur}`;
    const title = `${sectorName} — Démarches administratives en RDC`;

    return {
        title,
        description: sectorDesc,
        keywords: `${sectorName}, agrément ${sectorName} RDC, conformité ${sectorName} Congo, démarches ${sectorName} Kinshasa`,
        alternates: { canonical: url },
        openGraph: {
            title,
            description: sectorDesc,
            url,
            siteName: "Agréa Africa",
            locale: "fr_CD",
            type: "website",
            images: [{ url: "https://agrea.africa/og-default.png", width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: sectorDesc,
        },
    };
}

export default async function SectorPage({ params }: { params: Promise<{ secteur: string }> }) {
    const { secteur } = await params;
    const sector = getSectorById(secteur);

    if (!sector) notFound();

    const { t: tServer } = await getTranslationContext();
    const sectorName = tServer(sector.name);
    const sectorDesc = tServer(sector.description);
    const procedures = (proceduresData as any)[sector.sheetName] || [];

    return (
        <main style={{ background: "var(--bg-main)", minHeight: "100vh", position: "relative" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": `${tServer("sector.procedures_title") || "Procédures et obligations réglementaires"} : ${sectorName}`,
                        "description": sectorDesc,
                        "itemListElement": procedures.slice(0, 10).map((proc: any, index: number) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "item": {
                                "@type": "Thing",
                                "name": proc["PROCÉDURE / DOCUMENT"],
                                "description": `Type: ${proc["TYPE"]} | ${tServer("sector.official_delay") || "Délai officiel"}: ${proc["DÉLAI LÉGAL"] || tServer("sector.not_specified") || "Non spécifié"}`
                            }
                        }))
                    })
                }}
            />

            {/* HERO SECTION with Elegant Gradient Overlay */}
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "600px",
                background: "radial-gradient(circle at 70% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(16, 185, 129, 0.05) 0%, transparent 40%)",
                pointerEvents: "none",
                zIndex: 0
            }} />

            {/* BREADCRUMB & BACK */}
            <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "40px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
                    <Link
                        href="/#secteurs"
                        style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", fontSize: "14px", transition: "color 0.2s ease", textDecoration: "none" }}
                    >
                        <div style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.02)" }}>
                            <ArrowLeft size={14} />
                        </div>
                        {tServer("sector.back_to_sectors") || "Retour aux secteurs"}
                    </Link>

                    <nav style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "12px" }}>
                        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>{tServer("nav.home") || "Accueil"}</Link>
                        <ChevronRight size={12} />
                        <span style={{ color: "var(--white)", fontWeight: 500 }}>{sectorName}</span>
                    </nav>
                </div>

                {/* MAIN CONTENT TITLE */}
                <div style={{ maxWidth: "800px", marginBottom: "64px" }}>
                    <div style={{
                        display: "inline-block",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--green-900)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: "16px",
                        background: "rgba(16, 185, 129, 0.1)",
                        padding: "4px 12px",
                        borderRadius: "100px"
                    }}>
                        {tServer("sector.guide_label") || "Guide Sectoriel"}
                    </div>
                    <h1 style={{
                        fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                        fontWeight: 600,
                        color: "var(--white)",
                        letterSpacing: "-0.04em",
                        lineHeight: 1.05,
                        marginBottom: "24px"
                    }}>
                        {sectorName}
                    </h1>
                    <p style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        maxWidth: "680px"
                    }}>
                        {sectorDesc}
                    </p>
                </div>

                {/* PREMIUM CTA COMPLIANCE CARD */}
                <div style={{
                    position: "relative",
                    background: "var(--bg-card)",
                    borderRadius: "24px",
                    border: "1px solid var(--border)",
                    boxShadow: "0 24px 48px -12px rgba(0, 0, 0, 0.5)",
                    padding: "clamp(32px, 6vw, 64px)",
                    marginBottom: "80px",
                    overflow: "hidden",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "64px",
                    alignItems: "center"
                }}>
                    {/* Background decoration */}
                    <div style={{ position: "absolute", bottom: "-30%", right: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(16, 185, 129, 0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                            <div style={{
                                width: "64px", height: "64px",
                                background: "linear-gradient(135deg, var(--green-900), #059669)",
                                borderRadius: "20px",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 10px 20px -5px rgba(16, 185, 129, 0.3)"
                            }}>
                                <CheckCircle2 color="white" size={32} />
                            </div>
                            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 600, color: "var(--white)", margin: 0, letterSpacing: "-0.02em" }}>
                                {tServer("sector.cta_card_title") || "Obtenez votre diagnostic de conformité gratuit"}
                            </h2>
                        </div>
                        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "32px" }}>
                            {tServer("sector.cta_card_desc") || `Évitez les amendes et les retards opérationnels. En moins de 3 minutes, générez la liste exhaustive et certifiée des documents requis pour vos activités en`} <strong>{sectorName}</strong>.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            {[
                                { key: "sector.feature_1", label: "Liste des prérequis" },
                                { key: "sector.feature_2", label: "Délais officiels" },
                                { key: "sector.feature_3", label: "Coûts estimatifs" },
                                { key: "sector.feature_4", label: "Rapport PDF offert" }
                            ].map((item, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14px", color: "var(--text-muted)" }}>
                                    <div style={{ width: "6px", height: "6px", background: "var(--green-900)", borderRadius: "50%" }} />
                                    {tServer(item.key) || item.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                        <div style={{
                            padding: "32px",
                            background: "rgba(255,255,255,0.02)",
                            borderRadius: "20px",
                            border: "1px dashed rgba(255,255,255,0.1)",
                            textAlign: "center"
                        }}>
                             <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px", fontStyle: "italic" }}>
                                "{tServer("sector.social_proof") || "Plus de 500 entreprises utilisent Agréa pour leur conformité mensuellement."}"
                            </p>
                            <Link
                                href={`/${sector.id}/diagnostic`}
                                className="diagnostic-btn-premium"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "12px",
                                    background: "var(--white)",
                                    color: "#000",
                                    padding: "20px 40px",
                                    borderRadius: "14px",
                                    fontWeight: 700,
                                    fontSize: "17px",
                                    textDecoration: "none",
                                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                                    boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)"
                                }}
                            >
                                {tServer("sector.start_btn") || "Démarrer mon Diagnostic"} <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* PROCEDURES GRID */}
                <div style={{ marginBottom: "120px" }}>
                    <div style={{ marginBottom: "48px" }}>
                        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 600, color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.03em" }}>
                            {tServer("sector.procedures_title_full") || "Documents & Démarches Obligations"}
                        </h2>
                        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>
                            {procedures.length} {tServer("sector.procedures_count") || "procédures officiellement recensées pour opérer légalement."}
                        </p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "32px" }}>
                        {procedures.slice(0, 12).map((proc: any, i: number) => (
                            <div key={i} className="procedure-card-premium" style={{
                                padding: "40px 32px",
                                background: "rgba(255,255,255,0.01)",
                                borderRadius: "20px",
                                border: "1px solid rgba(255,255,255,0.04)",
                                display: "flex",
                                flexDirection: "column",
                                gap: "24px",
                                transition: "all 0.3s ease",
                                height: "100%"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px" }}>
                                    <h3 style={{ fontSize: "17px", fontWeight: 600, color: "var(--white)", margin: 0, lineHeight: "1.5" }}>
                                        {proc["PROCÉDURE / DOCUMENT"]}
                                    </h3>
                                    <span style={{
                                        fontSize: "11px",
                                        padding: "4px 10px",
                                        background: "rgba(16, 185, 129, 0.08)",
                                        color: "var(--green-900)",
                                        borderRadius: "6px",
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em"
                                    }}>
                                        {proc["TYPE"]}
                                    </span>
                                </div>
                                
                                <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div>
                                        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{tServer("sector.label_delay") || "Délai légal"}</div>
                                        <div style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500 }}>{proc["DÉLAI LÉGAL"] || tServer("sector.not_provided") || "N/A"}</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{tServer("sector.label_agency") || "Organisme"}</div>
                                        <div style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis" }}>{proc["ORGANISME COMPÉTENT"] || "-"}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {procedures.length > 12 && (
                        <div style={{
                            marginTop: "48px",
                            textAlign: "center",
                            padding: "48px",
                            background: "rgba(16, 185, 129, 0.02)",
                            borderRadius: "24px",
                            border: "1px solid rgba(16, 185, 129, 0.1)"
                        }}>
                            <p style={{ color: "var(--white)", fontSize: "16px", marginBottom: "32px", fontWeight: 500 }}>
                                + {procedures.length - 12} {tServer("sector.more_procedures") || "autres obligations réglementaires identifiées."}
                            </p>
                            <Link
                                href={`/${sector.id}/diagnostic`}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "14px 28px",
                                    background: "rgba(255,255,255,0.05)",
                                    color: "var(--white)",
                                    borderRadius: "100px",
                                    fontSize: "15px",
                                    fontWeight: 600,
                                    textDecoration: "none",
                                    transition: "background 0.2s"
                                }}
                            >
                                {tServer("sector.view_all_btn") || "Voir tout le diagnostic"} <ChevronRight size={16} />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .diagnostic-btn-premium:hover {
                    background: var(--green-900) !important;
                    color: var(--white) !important;
                    transform: translateY(-4px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.3) !important;
                }
                .procedure-card-premium:hover {
                    background: rgba(255,255,255,0.03) !important;
                    border-color: rgba(16, 185, 129, 0.2) !important;
                    transform: translateY(-8px);
                }
            `}</style>
        </main>
    );
}
