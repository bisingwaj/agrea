"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, Calendar, CheckCircle2, Building2, Download, Lock, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { GuideData } from "@/data/guides";
import PhoneInput from "@/components/PhoneInput";
import { FadeUp } from "@/components/animations/FadeUp";

interface Props {
    guide: GuideData;
}

export default function GuideDetailClient({ guide }: Props) {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({ nom: "", societe: "", email: "", telephone: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsModalOpen(false);
            alert(t("guides.detail.modal_success"));
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[var(--bg-main)] pt-[120px] pb-[100px]">
            <div className="max-w-[900px] mx-auto px-6">

                {/* Fil d'ariane & Retour */}
                <Link href="/guides" className="inline-flex items-center gap-2 text-[var(--text-muted)] text-sm font-medium mb-10 transition-colors hover:text-[var(--white)]">
                    <ArrowLeft size={16} /> {t("guides.title")}
                </Link>

                {/* Hero Section du Guide */}
                <FadeUp delay={0.1}>
                    <div className="mb-12 md:mb-16">
                        <div className="flex items-center gap-3 mb-6 flex-wrap">
                            <span className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[13px] font-medium text-[var(--green-900)]">
                                {t(guide.sectorKey as any) || guide.sectorKey}
                            </span>
                            <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
                                <BookOpen size={16} /> {guide.pages} {t("guides.metadata_pages")}
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)]">
                                <Calendar size={16} /> {t("guides.metadata_updated")} : {guide.date}
                            </div>
                        </div>

                        <h1 className="text-[28px] md:text-[36px] lg:text-[44px] font-bold text-[var(--white)] tracking-tight leading-tight mb-6">
                            {t(guide.titleKey as any) || guide.titleKey}
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-[800px]">
                            {guide.contentKeys.description}
                        </p>
                    </div>
                </FadeUp>

                {/* CTA Flottant Primaire */}
                <FadeUp delay={0.2}>
                    <div className="p-6 md:p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                        <div className="relative z-10">
                            <h2 className="text-[20px] font-semibold text-[var(--white)] mb-2">
                                {t("guides.detail.for_who_title")}
                            </h2>
                            <p className="text-[var(--text-muted)] text-[15px] max-w-[450px] leading-relaxed">
                                {guide.contentKeys.forWho}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="agrea-button-primary inline-flex items-center justify-center w-full md:w-auto gap-2.5 px-6 py-4 relative z-10"
                        >
                            <Lock size={18} /> {t("guides.detail.get_access_btn")}
                        </button>
                    </div>
                </FadeUp>

                {/* Contenu Détaillé en Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 mb-20">

                    {/* Ce que vous obtiendrez */}
                    <FadeUp delay={0.3}>
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-[var(--border)]">
                                    <CheckCircle2 size={20} className="text-[var(--white)]" />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--white)]">{t("guides.detail.what_you_get_title")}</h3>
                            </div>
                            <ul className="space-y-4">
                                {guide.contentKeys.whatYouGet.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1"><CheckCircle2 size={16} className="text-[var(--green-900)]" /></div>
                                        <span className="text-[15px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeUp>

                    {/* Structures Étatiques impliquées */}
                    <FadeUp delay={0.4}>
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-[var(--border)]">
                                    <Building2 size={20} className="text-[var(--white)]" />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--white)]">{t("guides.detail.structures_title")}</h3>
                            </div>
                            <ul className="space-y-4">
                                {guide.structures.map((structure, idx) => (
                                    <li key={idx} className="flex items-start gap-3 border-l-2 border-[var(--border)] pl-4">
                                        <span className="text-[15px] text-[var(--text-secondary)] leading-relaxed">{structure}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeUp>

                </div>
            </div>

            {/* Modal de Capture (Lead Generation) */}
            {isModalOpen && (
                <div style={{
                    position: "fixed", inset: 0, zIndex: 100,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "20px", background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)"
                }}>
                    <div style={{
                        background: "var(--bg-main)", border: "1px solid var(--border)",
                        borderRadius: "24px", width: "100%", maxWidth: "500px",
                        position: "relative", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                    }}>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20" />

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 p-2 text-[var(--text-muted)] hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-6 sm:p-8 relative">
                            <h2 className="text-[24px] sm:text-[28px] font-bold text-[var(--white)] mb-2 tracking-tight">
                                {t("guides.detail.modal_title")}
                            </h2>
                            <p className="text-[14px] sm:text-[15px] text-[var(--text-secondary)] mb-8 leading-relaxed max-w-[400px]">
                                {t("guides.detail.modal_desc")}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-[13px] font-semibold text-[var(--white)] mb-2">{t("guides.detail.modal_name_label")}</label>
                                    <input
                                        type="text" required placeholder="Ex: John Doe" value={formData.nom}
                                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                        className="w-full px-4 py-3.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-[var(--white)] text-[14px] outline-none focus:border-emerald-500/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-semibold text-[var(--white)] mb-2">{t("guides.detail.modal_company_label")}</label>
                                    <input
                                        type="text" required placeholder="Ex: Agréa Corp" value={formData.societe}
                                        onChange={(e) => setFormData({ ...formData, societe: e.target.value })}
                                        className="w-full px-4 py-3.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-[var(--white)] text-[14px] outline-none focus:border-emerald-500/50 transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-semibold text-[var(--white)] mb-2">{t("guides.detail.modal_email_label")}</label>
                                    <input
                                        type="email" required placeholder={t("guides.detail.modal_email_placeholder")} value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-[var(--white)] text-[14px] outline-none focus:border-emerald-500/50 transition-colors"
                                    />
                                </div>
                                <div className="z-50 relative">
                                    <label className="block text-[13px] font-semibold text-[var(--white)] mb-2">{t("guides.detail.modal_phone_label")}</label>
                                    <PhoneInput
                                        value={formData.telephone}
                                        onChange={(val) => setFormData({ ...formData, telephone: val })}
                                        required
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit" disabled={isSubmitting}
                                        className={`w-full p-4 bg-[var(--green-900)] text-black font-semibold text-[15px] rounded-full flex items-center justify-center gap-2.5 transition-opacity border-none ${isSubmitting ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:opacity-90'}`}
                                    >
                                        {isSubmitting ? t("guides.detail.modal_submit_loading") : (<><Download size={18} /> {t("guides.detail.modal_submit_idle")}</>)}
                                    </button>
                                </div>
                                <p className="text-[12px] text-center text-[var(--text-muted)] mt-4">
                                    {t("guides.detail.modal_privacy")}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
