"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, CheckCircle2, Building2, Download, Lock, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { GUIDES_DATA } from "@/data/guides";
import PhoneInput from "@/components/PhoneInput";

export default function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const { t } = useTranslation();

    // États du formulaire
    const [formData, setFormData] = useState({
        nom: "",
        societe: "",
        email: "",
        telephone: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const guide = GUIDES_DATA.find(g => g.slug === slug);
    if (!guide) return notFound();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulation d'envoi API
        setTimeout(() => {
            setIsSubmitting(false);
            setIsModalOpen(false);
            alert("Votre demande a bien été enregistrée. Le guide vous sera envoyé par email d'ici quelques minutes.");
        }, 1500);
    };

    return (
        <div style={{ minHeight: "100vh", background: "var(--bg-main)", paddingTop: "120px", paddingBottom: "100px" }}>
            <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>

                {/* Fil d'ariane & Retour */}
                <Link href="/guides" style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "40px",
                    transition: "color 0.2s"
                }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--text-muted)"}
                >
                    <ArrowLeft size={16} /> {t("guides.title")}
                </Link>

                {/* Hero Section du Guide */}
                <div style={{ marginBottom: "64px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
                        <span style={{
                            padding: "6px 12px",
                            background: "rgba(16, 185, 129, 0.1)",
                            border: "1px solid rgba(16, 185, 129, 0.2)",
                            borderRadius: "100px",
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "var(--green-900)"
                        }}>
                            {t(guide.sectorKey as any) || guide.sectorKey}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "var(--text-muted)" }}>
                            <BookOpen size={16} /> {guide.pages} {t("guides.metadata_pages")}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", color: "var(--text-muted)" }}>
                            <Calendar size={16} /> {t("guides.metadata_updated")} : {guide.date}
                        </div>
                    </div>

                    <h1 style={{ fontSize: "44px", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.03em", lineHeight: "1.1", marginBottom: "24px" }}>
                        {t(guide.titleKey as any) || guide.titleKey}
                    </h1>
                    <p style={{ fontSize: "20px", color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "800px" }}>
                        {guide.contentKeys.description}
                    </p>
                </div>

                {/* CTA Flottant Primaire */}
                <div style={{
                    padding: "32px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "24px",
                    marginBottom: "64px",
                    position: "relative",
                    overflow: "hidden"
                }}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                    <div style={{ zIndex: 1 }}>
                        <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--white)", marginBottom: "8px" }}>
                            Pour qui est ce guide ?
                        </h2>
                        <p style={{ color: "var(--text-muted)", fontSize: "15px", maxWidth: "450px", lineHeight: "1.5" }}>
                            {guide.contentKeys.forWho}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="agrea-button-primary"
                        style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 32px", zIndex: 1 }}
                    >
                        <Lock size={18} /> Obtenir l'accès au Guide complet
                    </button>
                </div>

                {/* Contenu Détaillé en Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: "80px" }}>

                    {/* Ce que vous obtiendrez */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                                <CheckCircle2 size={20} color="var(--white)" />
                            </div>
                            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--white)" }}>Ce que vous y trouverez</h3>
                        </div>
                        <ul className="space-y-4">
                            {guide.contentKeys.whatYouGet.map((item, idx) => (
                                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                                    <div style={{ marginTop: "4px" }}><CheckCircle2 size={16} color="var(--green-900)" /></div>
                                    <span style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6" }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Structures Étatiques impliquées */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                                <Building2 size={20} color="var(--white)" />
                            </div>
                            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--white)" }}>Structures concernées</h3>
                        </div>
                        <ul className="space-y-4">
                            {guide.structures.map((structure, idx) => (
                                <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "12px", borderLeft: "2px solid var(--border)", paddingLeft: "16px" }}>
                                    <span style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: "1.6" }}>{structure}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

            {/* Modal de Capture (Lead Generation) */}
            {isModalOpen && (
                <div style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px",
                    background: "rgba(0,0,0,0.8)",
                    backdropFilter: "blur(8px)"
                }}>
                    <div style={{
                        background: "var(--bg-main)",
                        border: "1px solid var(--border)",
                        borderRadius: "24px",
                        width: "100%",
                        maxWidth: "500px",
                        position: "relative",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                    }}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20" />

                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{ position: "absolute", top: "20px", right: "20px", color: "var(--text-muted)", background: "transparent", border: "none", cursor: "pointer", padding: "8px" }}
                            className="hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div style={{ padding: "40px" }}>
                            <h2 style={{ fontSize: "24px", fontWeight: 700, color: "var(--white)", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                                Accéder au Guide
                            </h2>
                            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "32px", lineHeight: "1.5" }}>
                                Laissez-nous vos coordonnées professionnelles. Nos experts vous enverront le document complet par e-mail immédiatement.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--white)", marginBottom: "8px" }}>Nom complet</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: John Doe"
                                        value={formData.nom}
                                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                        style={{ width: "100%", padding: "14px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--white)", fontSize: "14px", outline: "none" }}
                                        className="focus:border-emerald-500/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--white)", marginBottom: "8px" }}>Société</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Ex: Agréa Corp"
                                        value={formData.societe}
                                        onChange={(e) => setFormData({ ...formData, societe: e.target.value })}
                                        style={{ width: "100%", padding: "14px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--white)", fontSize: "14px", outline: "none" }}
                                        className="focus:border-emerald-500/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--white)", marginBottom: "8px" }}>E-mail professionnel</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@entreprise.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{ width: "100%", padding: "14px 16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "10px", color: "var(--white)", fontSize: "14px", outline: "none" }}
                                        className="focus:border-emerald-500/50 transition-colors"
                                    />
                                </div>
                                <div style={{ zIndex: 60 }}>
                                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--white)", marginBottom: "8px" }}>Téléphone</label>
                                    <PhoneInput
                                        value={formData.telephone}
                                        onChange={(val) => setFormData({ ...formData, telephone: val })}
                                        required
                                    />
                                </div>

                                <div style={{ paddingTop: "16px" }}>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{ width: "100%", padding: "16px", background: "var(--green-900)", color: "#000", fontWeight: 600, fontSize: "15px", borderRadius: "100px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.8 : 1, border: "none" }}
                                    >
                                        {isSubmitting ? "Envoi en cours..." : (
                                            <><Download size={18} /> Télécharger le PDF Sécurisé</>
                                        )}
                                    </button>
                                </div>
                                <p style={{ fontSize: "12px", textAlign: "center", color: "var(--text-muted)", marginTop: "16px" }}>
                                    Vos données sont traitées en toute confidentialité.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
