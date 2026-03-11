import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, CheckCircle, Circle, Download, ArrowRight, Clock, DollarSign, Info, CheckCircle2 } from "lucide-react";
import { getSectorById, sectors } from "@/data/sectors";
import { getObjectiveById, objectives } from "@/data/objectives";
import { getDocumentsByObjective } from "@/data/documents";
import PdfDownloadButton from "@/components/result/PdfDownloadButton";
import { getTranslationContext } from "@/lib/tServer";

export function generateStaticParams() {
    const params: { secteur: string; objectif: string }[] = [];
    sectors.forEach((s) => {
        objectives.filter((o) => o.sectorId === s.id).forEach((o) => {
            params.push({ secteur: s.id, objectif: o.id });
        });
    });
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ secteur: string; objectif: string }> }) {
    const { secteur, objectif } = await params;
    const obj = getObjectiveById(objectif);
    if (!obj) return {};

    const { t: tServer } = await getTranslationContext();

    const title = `${tServer(obj.label)} — Documents requis en RDC`;
    const description = `Téléchargez la liste complète des documents requis pour votre ${tServer(obj.label)} en République Démocratique du Congo. Délai : ${obj.daysMin} à ${obj.daysMax} jours.`;
    const url = `https://agrea.africa/${secteur}/${objectif}`;

    return {
        title,
        description,
        keywords: `${tServer(obj.label)} RDC, documents ${tServer(obj.label)} Congo, obtenir ${tServer(obj.label)} Kinshasa`,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            siteName: "Agréa Africa",
            locale: "fr_CD",
            type: "article",
            images: [{ url: "https://agrea.africa/og-default.png", width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default async function ResultPage({ params }: { params: Promise<{ secteur: string; objectif: string }> }) {
    const { secteur, objectif } = await params;
    const sector = getSectorById(secteur);
    const obj = getObjectiveById(objectif);

    if (!sector || !obj) notFound();

    const { t: tServer } = await getTranslationContext();

    const sectorName = tServer(sector.name);
    const objLabel = tServer(obj.label);
    const objDesc = tServer(obj.description);
    const docs = getDocumentsByObjective(objectif);
    const required = docs.filter((d) => d.isRequired);
    const optional = docs.filter((d) => !d.isRequired);

    return (
        <main style={{ background: "var(--bg-main)", minHeight: "100vh", position: "relative" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": `${tServer("result.required_title") || "Documents obligatoires"} : ${objLabel}`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": required.map((d, i) => `${i + 1}. ${tServer(d.name)}`).join(" | ")
                                }
                            }
                        ].filter(Boolean)
                    })
                }}
            />

            {/* HERO BACKGROUND */}
            <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "500px",
                background: "radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.03) 0%, transparent 30%)",
                pointerEvents: "none",
                zIndex: 0
            }} />

            <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "40px" }}>
                {/* BACK & BREADCRUMB */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "48px" }}>
                    <Link
                        href={`/${secteur}`}
                        style={{ display: "inline-flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", fontSize: "14px", transition: "color 0.2s ease", textDecoration: "none" }}
                    >
                        <div style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.02)" }}>
                            <ArrowLeft size={14} />
                        </div>
                        {tServer("sector.back_to_guide") || "Retour au guide"}
                    </Link>

                    <nav style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--text-muted)", fontSize: "12px" }}>
                        <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>{tServer("nav.home") || "Accueil"}</Link>
                        <ChevronRight size={12} />
                        <Link href={`/${secteur}`} style={{ color: "inherit", textDecoration: "none" }}>{sectorName}</Link>
                        <ChevronRight size={12} />
                        <span style={{ color: "var(--white)", fontWeight: 500 }}>{objLabel}</span>
                    </nav>
                </div>

                <div className="result-grid-layout">
                    
                    {/* LEFT COLUMN: HEADER & STATS */}
                    <div>
                        <div style={{ marginBottom: "48px" }}>
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
                                {tServer("result.hero_label") || "Guide de Conformité"}
                            </div>
                            <h1 style={{
                                fontSize: "clamp(2rem, 5vw, 3rem)",
                                fontWeight: 600,
                                color: "var(--white)",
                                letterSpacing: "-0.03em",
                                lineHeight: 1.1,
                                marginBottom: "24px"
                            }}>
                                {tServer("result.hero_title_prefix")}{objLabel}{tServer("result.hero_title_suffix")}
                            </h1>
                            <p style={{
                                fontSize: "1.15rem",
                                color: "var(--text-secondary)",
                                lineHeight: 1.6,
                                maxWidth: "600px"
                            }}>
                                {objDesc} {tServer("result.hero_desc_suffix")}
                            </p>
                        </div>

                        {/* KPI CARDS */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "48px" }}>
                            <div className="kpi-card-premium">
                                <div className="kpi-icon-box"><Clock size={20} /></div>
                                <div>
                                    <div className="kpi-label">{tServer("result.label_delay") || "Délai estimé"}</div>
                                    <div className="kpi-value">{obj.daysMin} – {obj.daysMax} {tServer("common.days") || "jours"}</div>
                                </div>
                            </div>
                            <div className="kpi-card-premium">
                                <div className="kpi-icon-box"><DollarSign size={20} /></div>
                                <div>
                                    <div className="kpi-label">{tServer("result.label_cost") || "Coût officiel"}</div>
                                    <div className="kpi-value">
                                        {obj.costMin === 0 ? (tServer("result.cost_official") || "Frais officiels") : `${obj.costMin.toLocaleString()} – ${obj.costMax.toLocaleString()} USD`}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "64px" }}>
                            <PdfDownloadButton objective={obj} sector={sector} documents={docs} />
                            <Link href="/contact" className="btn-accompagnement-premium">
                                {tServer("result.btn_support") || "Être accompagné"} <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* DOCUMENTS SECTION */}
                    <div style={{ maxWidth: "800px" }}>
                         <div style={{ marginBottom: "40px", borderBottom: "1px solid var(--border)", paddingBottom: "24px" }}>
                            <h2 style={{ fontSize: "24px", fontWeight: 600, color: "var(--white)", display: "flex", alignItems: "center", gap: "12px" }}>
                                {tServer("result.required_title") || "Pièces obligatoires à fournir"}
                                <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--text-muted)", background: "rgba(255,255,255,0.05)", padding: "2px 10px", borderRadius: "100px" }}>
                                    {required.length}
                                </span>
                            </h2>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            {required.map((doc, idx) => (
                                <div key={doc.id} className="document-item-premium">
                                    <div style={{ display: "flex", gap: "20px" }}>
                                        <div className="document-check-box">
                                            <CheckCircle2 size={18} color="var(--white)" />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--white)", marginBottom: "8px" }}>
                                                {idx + 1}. {tServer(doc.name)}
                                            </h3>
                                            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: (doc.source || doc.tip) ? "16px" : 0 }}>
                                                {tServer(doc.description)}
                                            </p>
                                            
                                            {doc.source && (
                                                <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px", marginBottom: doc.tip ? "12px" : 0 }}>
                                                    <Info size={12} /> {tServer("result.label_source") || "Source"} : <span style={{ fontWeight: 500, color: "var(--text-secondary)" }}>{tServer(doc.source)}</span>
                                                </div>
                                            )}

                                            {doc.tip && (
                                                <div className="document-tip-box">
                                                    <p style={{ fontSize: "13px", color: "var(--green-900)", lineHeight: 1.5 }}>
                                                        <strong>Tip:</strong> {tServer(doc.tip)}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* OPTIONAL DOCUMENTS */}
                        {optional.length > 0 && (
                            <div style={{ marginTop: "64px" }}>
                                <div style={{ marginBottom: "32px" }}>
                                    <h2 style={{ fontSize: "20px", fontWeight: 500, color: "var(--text-secondary)" }}>
                                        {tServer("result.optional_title") || "Documents complémentaires"}
                                    </h2>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                    {optional.map((doc) => (
                                        <div key={doc.id} className="document-item-premium optional">
                                            <div style={{ display: "flex", gap: "16px" }}>
                                                <Circle size={16} color="var(--text-muted)" style={{ marginTop: "4px" }} />
                                                <div>
                                                    <h4 style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "4px" }}>
                                                        {tServer(doc.name)}
                                                    </h4>
                                                    <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>{tServer(doc.description)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FINAL CTA BOX */}
                        <div className="final-support-card">
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--white)", marginBottom: "12px" }}>
                                    {tServer("result.cta_support_title") || "Confiez-nous ce dossier"}
                                </h3>
                                <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: "400px" }}>
                                    {tServer("result.cta_support_desc") || "Agréa constitue et dépose votre dossier complet. Suivi transparent jusqu'à l'obtention."}
                                </p>
                            </div>
                            <Link href="/contact" className="btn-primary" style={{ borderRadius: "12px", padding: "16px 32px" }}>
                                {tServer("result.cta_support_btn") || "Démarrer mon accompagnement"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .kpi-card-premium {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    padding: 24px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    transition: all 0.3s ease;
                }
                .kpi-card-premium:hover {
                    border-color: rgba(16, 185, 129, 0.3);
                    transform: translateY(-4px);
                    background: rgba(16, 185, 129, 0.02);
                }
                .kpi-icon-box {
                    width: 48px; height: 48px;
                    background: rgba(16, 185, 129, 0.1);
                    border-radius: 12px;
                    display: flex; alignItems: center; justifyContent: center;
                    color: var(--green-900);
                }
                .kpi-label { fontSize: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
                .kpi-value { fontSize: 18px; fontWeight: 600; color: var(--white); }

                .btn-accompagnement-premium {
                    display: inline-flex; alignItems: center; gap: 10px;
                    padding: 16px 32px;
                    border: 1px solid var(--border);
                    color: var(--white);
                    border-radius: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }
                .btn-accompagnement-premium:hover {
                    background: rgba(255,255,255,0.05);
                    border-color: var(--white);
                }

                .document-item-premium {
                    padding: 32px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid var(--border);
                    border-radius: 20px;
                    transition: all 0.3s ease;
                }
                .document-item-premium:hover {
                    border-color: rgba(16, 185, 129, 0.2);
                    background: rgba(16, 185, 129, 0.01);
                }
                .document-check-box {
                    width: 32px; height: 32px;
                    background: var(--green-900);
                    border-radius: 10px;
                    display: flex; alignItems: center; justifyContent: center;
                    flex-shrink: 0;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
                }
                .document-tip-box {
                    padding: 12px 16px;
                    background: rgba(16, 185, 129, 0.05);
                    border-left: 3px solid var(--green-900);
                    border-radius: 4px 12px 12px 4px;
                }

                .final-support-card {
                    margin-top: 80px;
                    padding: 48px;
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.02) 100%);
                    border: 1px solid rgba(16, 185, 129, 0.2);
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 32px;
                }

                .result-grid-layout {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 64px;
                    align-items: start;
                }

                @media (min-width: 1024px) {
                    .result-grid-layout {
                        grid-template-columns: 1.2fr 0.8fr;
                    }
                }

                @media (max-width: 768px) {
                    .final-support-card { padding: 32px; text-align: center; }
                    .final-support-card .btn-primary { width: 100%; }
                }
            `}</style>
        </main>
    );
}
