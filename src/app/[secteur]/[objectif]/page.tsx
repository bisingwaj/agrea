import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, CheckCircle, Circle, Download, ArrowRight, Clock, DollarSign, Info } from "lucide-react";
import { getSectorById, sectors } from "@/data/sectors";
import { getObjectiveById, objectives } from "@/data/objectives";
import { getDocumentsByObjective } from "@/data/documents";
import PdfDownloadButton from "@/components/result/PdfDownloadButton";
import { tServer } from "@/lib/tServer";

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
    const { objectif } = await params;
    const obj = getObjectiveById(objectif);
    if (!obj) return {};
    return {
        title: `${tServer(obj.label)} — Liste des documents requis en RDC | Agréa`,
        description: `Téléchargez la liste complète des documents requis pour votre ${tServer(obj.label)} en République Démocratique du Congo. Délai : ${obj.daysMin} à ${obj.daysMax} jours.`,
    };
}

export default async function ResultPage({ params }: { params: Promise<{ secteur: string; objectif: string }> }) {
    const { secteur, objectif } = await params;
    const sector = getSectorById(secteur);
    const obj = getObjectiveById(objectif);

    if (!sector || !obj) notFound();

    const docs = getDocumentsByObjective(objectif);
    const required = docs.filter((d) => d.isRequired);
    const optional = docs.filter((d) => !d.isRequired);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": `Quels sont les documents obligatoires pour obtenir : ${tServer(obj.label)} en RDC ?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": required.map((d, i) => `${i + 1}. ${tServer(d.name)}`).join(" | ")
                                }
                            },
                            optional.length > 0 ? {
                                "@type": "Question",
                                "name": `Quels sont les documents recommandés ou optionnels pour : ${tServer(obj.label)} en RDC ?`,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": optional.map((d, i) => `${i + 1}. ${tServer(d.name)}`).join(" | ")
                                }
                            } : null
                        ].filter(Boolean)
                    })
                }}
            />
            {/* Breadcrumb */}
            <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-card)" }}>
                <div className="container" style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <Link href="/" style={{ color: "var(--text-muted)", fontSize: "13px" }}>Accueil</Link>
                    <ChevronRight size={14} color="var(--text-muted)" />
                    <Link href={`/${secteur}`} style={{ color: "var(--text-muted)", fontSize: "13px" }}>{tServer(sector.name)}</Link>
                    <ChevronRight size={14} color="var(--text-muted)" />
                    <span style={{ color: "var(--white)", fontSize: "13px", fontWeight: 500 }}>{tServer(obj.label)}</span>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <Link
                        href={`/${secteur}`}
                        style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "13px", marginBottom: "32px", transition: "color 0.2s ease" }}
                    >
                        <ArrowLeft size={14} /> Retour aux démarches
                    </Link>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px" }}>
                        {/* Header + stats */}
                        <div style={{ maxWidth: "640px" }}>
                            <p className="label" style={{ marginBottom: "12px", color: "var(--green-900)" }}>Guide de Conformité</p>
                            <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", marginBottom: "16px", color: "var(--white)", lineHeight: 1.2 }}>
                                Comment obtenir : {tServer(obj.label)} en RDC ?
                            </h1>
                            <p style={{ marginBottom: "32px", color: "var(--text-secondary)", fontSize: "18px", lineHeight: 1.6 }}>
                                {tServer(obj.description)} Découvrez la liste exacte, certifiée et à jour des documents requis pour valider cette démarche légale.
                            </p>

                            {/* Info cards */}
                            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        padding: "14px 18px",
                                        border: "1px solid var(--border)",
                                        borderRadius: "10px",
                                        flex: "1",
                                        minWidth: "160px",
                                        background: "var(--bg-card)",
                                    }}
                                >
                                    <Clock size={18} color="var(--green-900)" strokeWidth={1.5} />
                                    <div>
                                        <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Délai estimé</p>
                                        <p style={{ fontWeight: 600, fontSize: "14px", color: "var(--white)" }}>
                                            {obj.daysMin} – {obj.daysMax} jours
                                        </p>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        padding: "14px 18px",
                                        border: "1px solid var(--border)",
                                        borderRadius: "10px",
                                        flex: "1",
                                        minWidth: "160px",
                                        background: "var(--bg-card)",
                                    }}
                                >
                                    <DollarSign size={18} color="var(--green-900)" strokeWidth={1.5} />
                                    <div>
                                        <p style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Coût officiel</p>
                                        <p style={{ fontWeight: 600, fontSize: "14px", color: "var(--white)" }}>
                                            {obj.costMin === 0 ? "Frais officiels" : `${obj.costMin.toLocaleString()} – ${obj.costMax.toLocaleString()} USD`}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                <PdfDownloadButton objective={obj} sector={sector} documents={docs} />
                                <Link href="/contact" className="btn-secondary">
                                    Être accompagné <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* Documents list */}
                        <div style={{ maxWidth: "720px" }}>
                            {/* Obligatoires */}
                            <div style={{ marginBottom: "40px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                                    <h2 style={{ fontWeight: 600, color: "var(--white)", fontSize: "20px", margin: 0 }}>
                                        Pièces obligatoires à fournir
                                    </h2>
                                    <span
                                        style={{
                                            padding: "2px 10px",
                                            background: "rgba(255, 255, 255, 0.05)",
                                            borderRadius: "100px",
                                            fontSize: "12px",
                                            color: "var(--text-secondary)",
                                            fontWeight: 500,
                                            border: "1px solid var(--border)",
                                        }}
                                    >
                                        {required.length}
                                    </span>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    {required.map((doc, idx) => (
                                        <div
                                            key={doc.id}
                                            style={{
                                                padding: "18px 20px",
                                                border: "1px solid var(--border)",
                                                borderRadius: "10px",
                                                background: "var(--bg-card)",
                                            }}
                                        >
                                            <div style={{ display: "flex", gap: "14px" }}>
                                                <div style={{ flexShrink: 0, marginTop: "2px" }}>
                                                    <CheckCircle size={18} color="var(--green-900)" strokeWidth={1.5} />
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: 500, color: "var(--white)", fontSize: "14px", marginBottom: "4px" }}>
                                                        {idx + 1}. {tServer(doc.name)}
                                                    </p>
                                                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: doc.tip || doc.source ? "8px" : 0 }}>
                                                        {tServer(doc.description)}
                                                    </p>
                                                    {doc.source && (
                                                        <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                                                            Source : <span style={{ fontWeight: 500 }}>{tServer(doc.source)}</span>
                                                        </p>
                                                    )}
                                                    {doc.tip && (
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                gap: "8px",
                                                                marginTop: "12px",
                                                                padding: "10px 12px",
                                                                background: "rgba(16, 185, 129, 0.05)",
                                                                borderRadius: "6px",
                                                                border: "1px solid rgba(16, 185, 129, 0.1)",
                                                            }}
                                                        >
                                                            <Info size={14} color="var(--green-900)" style={{ flexShrink: 0, marginTop: "1px" }} />
                                                            <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>{tServer(doc.tip)}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Optionnels */}
                            {optional.length > 0 && (
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                                        <h2 style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: "20px", margin: 0 }}>
                                            Documents complémentaires (Recommandés)
                                        </h2>
                                        <span
                                            style={{
                                                padding: "2px 10px",
                                                background: "rgba(255, 255, 255, 0.02)",
                                                borderRadius: "100px",
                                                fontSize: "12px",
                                                color: "var(--text-muted)",
                                                fontWeight: 500,
                                                border: "1px solid var(--border)",
                                            }}
                                        >
                                            {optional.length}
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        {optional.map((doc, idx) => (
                                            <div
                                                key={doc.id}
                                                style={{
                                                    padding: "18px 20px",
                                                    border: "1px solid rgba(255, 255, 255, 0.04)",
                                                    borderRadius: "10px",
                                                    background: "rgba(255, 255, 255, 0.02)",
                                                }}
                                            >
                                                <div style={{ display: "flex", gap: "14px" }}>
                                                    <div style={{ flexShrink: 0, marginTop: "2px" }}>
                                                        <Circle size={18} color="var(--text-muted)" strokeWidth={1.5} />
                                                    </div>
                                                    <div>
                                                        <p style={{ fontWeight: 500, color: "var(--text-secondary)", fontSize: "14px", marginBottom: "4px" }}>
                                                            {tServer(doc.name)}
                                                        </p>
                                                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                                                            {tServer(doc.description)}
                                                        </p>
                                                        {doc.tip && (
                                                            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>{tServer(doc.tip)}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA accompagnement */}
                            <div
                                className="glow-card"
                                style={{
                                    marginTop: "48px",
                                    padding: "32px",
                                    background: "rgba(16, 185, 129, 0.05)",
                                    border: "1px solid rgba(16, 185, 129, 0.2)",
                                    borderRadius: "12px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    gap: "20px",
                                }}
                            >
                                <div>
                                    <p style={{ color: "var(--white)", fontWeight: 600, fontSize: "17px", marginBottom: "8px" }}>
                                        Confiez-nous ce dossier
                                    </p>
                                    <p style={{ color: "var(--green-900)", fontSize: "14px", maxWidth: "300px" }}>
                                        Agréa constitue et dépose votre dossier complet. Suivi transparent jusqu&apos;à l&apos;obtention.
                                    </p>
                                </div>
                                <Link
                                    href="/contact"
                                    className="btn-primary"
                                    style={{ flexShrink: 0 }}
                                >
                                    Démarrer mon accompagnement <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
