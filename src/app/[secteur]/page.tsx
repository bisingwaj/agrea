import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { getSectorById, sectors } from "@/data/sectors";
import proceduresData from "@/data/procedures.json";

export function generateStaticParams() {
    return sectors.map((s) => ({ secteur: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ secteur: string }> }) {
    const { secteur } = await params;
    const sector = getSectorById(secteur);
    if (!sector) return {};
    return {
        title: `${sector.name} — Démarches administratives en RDC | Agréa`,
        description: sector.description,
    };
}

export default async function SectorPage({ params }: { params: Promise<{ secteur: string }> }) {
    const { secteur } = await params;
    const sector = getSectorById(secteur);

    if (!sector) notFound();

    const procedures = (proceduresData as any)[sector.sheetName] || [];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": `Procédures et obligations réglementaires : ${sector.name} en RDC`,
                        "description": sector.description,
                        "itemListElement": procedures.slice(0, 10).map((proc: any, index: number) => ({
                            "@type": "ListItem",
                            "position": index + 1,
                            "item": {
                                "@type": "Thing",
                                "name": proc["PROCÉDURE / DOCUMENT"],
                                "description": `Type: ${proc["TYPE"]} | Délai officiel: ${proc["DÉLAI LÉGAL"] || "Non spécifié"} | Organisme: ${proc["ORGANISME COMPÉTENT"] || "Non spécifié"}`
                            }
                        }))
                    })
                }}
            />

            {/* Breadcrumb */}
            <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-card)" }}>
                <div style={{ padding: "16px clamp(20px, 5vw, 62px)", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", maxWidth: "100%", margin: "0 auto" }}>
                    <Link href="/" style={{ color: "var(--text-muted)", fontSize: "13px", textDecoration: "none" }}>Accueil</Link>
                    <ChevronRight size={14} color="var(--text-muted)" />
                    <span style={{ color: "var(--white)", fontSize: "13px", fontWeight: 500 }}>{sector.name}</span>
                </div>
            </div>

            <section className="section" style={{ padding: "80px 0" }}>
                <div style={{ padding: "0 clamp(20px, 5vw, 62px)", maxWidth: "100%", margin: "0 auto" }}>
                    {/* Header */}
                    <Link
                        href="/#secteurs"
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "14px", marginBottom: "40px", transition: "color 0.2s ease", textDecoration: "none" }}
                    >
                        <ArrowLeft size={16} /> Retour aux secteurs
                    </Link>

                    <div style={{ maxWidth: "800px", marginBottom: "48px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                            <h1 style={{ fontSize: "clamp(1.75rem, 7vw, 3rem)", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--white)", margin: 0 }}>{sector.name}</h1>
                        </div>
                        <p style={{ fontSize: "20px", color: "var(--text-secondary)", lineHeight: "1.6" }}>{sector.description}</p>
                    </div>

                    {/* Right column (now Top Block CTA) */}
                    <div style={{ background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border)", padding: "clamp(24px, 4vw, 40px)", marginBottom: "48px", display: "flex", alignItems: "center", gap: "48px", flexWrap: "wrap" }}>
                        <div style={{ flex: "1 1 400px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                                <div style={{ width: "48px", height: "48px", background: "var(--green-900)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <CheckCircle2 color="white" size={24} />
                                </div>
                                <h3 style={{ fontSize: "28px", fontWeight: 600, color: "var(--white)", margin: 0 }}>
                                    Générez votre rapport d'obligations personnalisé
                                </h3>
                            </div>
                            <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                                Évitez les sanctions et les retards. Obtenez immédiatement la liste certifiée des prérequis administratifs pour opérer légalement dans le secteur <strong>{sector.name}</strong>.
                            </p>
                        </div>

                        <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", gap: "24px" }}>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                {[
                                    "Identification exacte",
                                    "Délais et coûts",
                                    "Plan prioritaire",
                                    "100% gratuit"
                                ].map((item, i) => (
                                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "var(--text-secondary)" }}>
                                        <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                            <span style={{ width: "6px", height: "6px", background: "var(--green-900)", borderRadius: "50%" }} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/${sector.id}/diagnostic`}
                                className="diagnostic-btn"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "8px",
                                    background: "var(--white)",
                                    color: "#000",
                                    padding: "16px 32px",
                                    borderRadius: "8px",
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    textDecoration: "none",
                                    transition: "all 0.2s"
                                }}
                            >
                                Démarrer mon diagnostic <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                        {/* Left column (now Grid list) */}
                        <div>
                            <h2 style={{ fontSize: "24px", fontWeight: 500, marginBottom: "32px", color: "var(--white)" }}>
                                Liste officielle des documents et démarches ({procedures.length} obligations)
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "24px" }}>
                                {procedures.slice(0, 10).map((proc: any, i: number) => (
                                    <div key={i} className="procedure-card" style={{
                                        padding: "24px",
                                        background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)",
                                        backgroundColor: "rgba(255,255,255,0.01)",
                                        borderRadius: "16px",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                        borderTop: "1px solid rgba(255,255,255,0.1)",
                                        display: "flex",
                                        flexDirection: "column",
                                        transition: "transform 0.2s ease, background 0.2s ease"
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", gap: "12px" }}>
                                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--white)", margin: 0, lineHeight: "1.4" }}>{proc["PROCÉDURE / DOCUMENT"]}</h3>
                                            <span style={{ fontSize: "12px", padding: "4px 8px", background: "rgba(16,185,129,0.1)", color: "var(--green-900)", borderRadius: "100px", fontWeight: 600, whiteSpace: "nowrap" }}>
                                                {proc["TYPE"]}
                                            </span>
                                        </div>
                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginTop: "auto", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                            <div style={{ minWidth: "120px" }}>
                                                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>Délai officiel</p>
                                                <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500 }}>{proc["DÉLAI LÉGAL"] || "-"}</p>
                                            </div>
                                            <div style={{ flex: 1, minWidth: "180px" }}>
                                                <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "4px" }}>Organisme de rattachement</p>
                                                <p style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500, wordBreak: "break-word" }}>{proc["ORGANISME COMPÉTENT"] || "-"}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {procedures.length > 10 && (
                                <div style={{ marginTop: "32px", textAlign: "center", padding: "32px", background: "rgba(255,255,255,0.02)", borderRadius: "16px", border: "1px dashed rgba(255,255,255,0.1)" }}>
                                    <p style={{ color: "var(--text-muted)", fontSize: "15px", margin: 0 }}>
                                        + {procedures.length - 10} autres procédures et documents obligatoires identifiés dans ce secteur.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            <style>{`
                .diagnostic-btn:hover {
                    background: var(--green-900) !important;
                    color: var(--white) !important;
                    box-shadow: 0 12px 24px rgba(16,185,129,0.3) !important;
                    transform: translateY(-2px);
                }
                .procedure-card:hover {
                    transform: translateY(-2px);
                    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%) !important;
                    border-color: rgba(255,255,255,0.1) !important;
                }
            `}</style>
        </>
    );
}
