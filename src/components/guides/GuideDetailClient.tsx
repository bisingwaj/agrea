"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft, BookOpen, Calendar, CheckCircle2, Building2,
    Download, Lock, X, ArrowRight, Zap, PlayCircle, Fingerprint
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { GuideData } from "@/data/guides";
import PhoneInput from "@/components/PhoneInput";
import { FadeUp } from "@/components/animations/FadeUp";
import Image from "next/image";

interface Props {
    guide: GuideData;
}

export default function GuideDetailClient({ guide }: Props) {
    const { t } = useTranslation();

    const [formData, setFormData] = useState({ nom: "", societe: "", email: "", telephone: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-[100dvh] bg-[var(--bg-main)] selection:bg-[var(--green-900)] selection:text-white pb-24 md:pb-32">
            
            {/* ═══════════════════════ HEADER COMPACT ═══════════════════════ */}
            <header className="sticky top-[56px] md:top-[72px] z-30 bg-[var(--bg-main)]/80 backdrop-blur-xl border-b border-[var(--border)]">
                <div className="max-w-[1000px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
                    <Link
                        href="/guides"
                        className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-white text-[14px] font-medium transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span className="hidden sm:inline">{t("guides.title") || "Retour aux guides"}</span>
                        <span className="sm:hidden">Retour</span>
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="hidden md:inline-flex agrea-button-primary px-5 py-2.5 text-[14px] items-center gap-2"
                    >
                        <Lock size={14} /> Télécharger
                    </button>
                </div>
            </header>

            {/* ═══════════════════════ HERO ═══════════════════════ */}
            <section className="relative pt-12 md:pt-24 pb-12 md:pb-20 border-b border-[var(--border)] overflow-hidden">
                {/* Glow Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-900/10 blur-[100px] rounded-full pointer-events-none" />
                
                <div className="max-w-[1000px] mx-auto px-5 md:px-8 relative z-10">
                    <FadeUp>
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-6 md:mb-8">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[12px] font-bold text-[var(--green-100)] tracking-wide uppercase">
                                <Zap size={12} strokeWidth={2.5} />
                                {t(guide.sectorKey as any) || guide.sectorKey}
                            </span>
                            <div className="flex items-center gap-4 text-[13px] text-[var(--text-muted)] font-medium bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
                                <span className="flex items-center gap-1.5"><BookOpen size={14} /> {guide.pages} {t("guides.metadata_pages") || "Pages"}</span>
                                <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                <span className="flex items-center gap-1.5"><Calendar size={14} /> {guide.date}</span>
                            </div>
                        </div>

                        <h1 className="text-[clamp(32px,5vw,56px)] font-bold text-[var(--white)] tracking-tight leading-[1.15] mb-6 max-w-[800px]">
                            {t(guide.titleKey as any) || guide.titleKey}
                        </h1>
                        <p className="text-[clamp(17px,2.5vw,20px)] text-[var(--text-secondary)] leading-relaxed max-w-[700px]">
                            {guide.contentKeys.description}
                        </p>
                    </FadeUp>
                </div>
            </section>

            {/* ═══════════════════════ CONTENT (BENTO LAYOUT) ═══════════════════════ */}
            <section className="max-w-[1000px] mx-auto px-5 md:px-8 pt-12 md:pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
                    
                    {/* Left Column (Main Info) */}
                    <div className="lg:col-span-7 space-y-12">
                        
                        {/* A qui s'adresse ? */}
                        <FadeUp delay={0.1}>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 items-center justify-center">
                                    <Fingerprint size={24} className="text-[var(--text-secondary)]" />
                                </div>
                                <div>
                                    <h2 className="text-[20px] md:text-[24px] font-semibold text-[var(--white)] mb-4 flex items-center gap-3">
                                        <span className="md:hidden w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Fingerprint size={16} className="text-[var(--text-secondary)]" />
                                        </span>
                                        {t("guides.detail.for_who_title") || "Pour qui ?"}
                                    </h2>
                                    <p className="text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-[1.7]">
                                        {guide.contentKeys.forWho}
                                    </p>
                                </div>
                            </div>
                        </FadeUp>

                        {/* Ce que vous obtiendrez */}
                        <FadeUp delay={0.2}>
                            <div className="p-6 md:p-8 rounded-[24px] bg-emerald-900/5 border border-emerald-900/20">
                                <h3 className="text-[20px] font-semibold text-[var(--white)] mb-6 flex items-center gap-3">
                                    <CheckCircle2 size={24} className="text-emerald-500" />
                                    {t("guides.detail.what_you_get_title") || "Ce qui est inclus"}
                                </h3>
                                <ul className="space-y-5">
                                    {guide.contentKeys.whatYouGet.map((item, idx) => (
                                        <li key={idx} className="flex gap-4">
                                            <div className="mt-1 flex-shrink-0">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                                            </div>
                                            <span className="text-[16px] md:text-[17px] text-[var(--text-secondary)] leading-relaxed">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeUp>
                    </div>

                    {/* Right Column (Sidebar Box) */}
                    <div className="lg:col-span-5 relative">
                        <FadeUp delay={0.3}>
                            <div className="sticky top-[100px] md:top-[120px] p-6 md:p-8 rounded-[32px] bg-white/[0.02] border border-white/10 flex flex-col">
                                <h3 className="text-[18px] font-semibold text-[var(--white)] mb-6 flex items-center gap-3">
                                    <Building2 size={20} className="text-[var(--text-secondary)]" />
                                    {t("guides.detail.structures_title") || "Institutions impliquées"}
                                </h3>
                                
                                <div className="space-y-3 mb-10">
                                    {guide.structures.map((structure, idx) => (
                                        <div
                                            key={idx}
                                            className="px-4 py-3 rounded-xl text-[14px] md:text-[15px] font-medium text-[var(--text-secondary)] bg-black/20 border border-white/5"
                                        >
                                            {structure}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-8 border-t border-white/5">
                                    {/* Action Desktop (Hidden on small mobile) */}
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="agrea-button-primary w-full py-4 text-[16px] flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/10 mb-4"
                                    >
                                        <Lock size={18} /> {t("guides.detail.get_access_btn") || "Déverrouiller le guide"}
                                    </button>
                                    <p className="text-[13px] text-[var(--text-muted)] text-center leading-relaxed">
                                        Accès instantané par mail. Document officiel validé par nos experts juridiques Agréa.
                                    </p>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ MOBILE STICKY CTA ═══════════════════════ */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-5 bg-[var(--bg-main)]/90 backdrop-blur-xl border-t border-white/10">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="agrea-button-primary w-full py-4 text-[16px] flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
                >
                    <Lock size={18} /> Télécharger
                </button>
            </div>

            {/* ═══════════════════════ MODAL ═══════════════════════ */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4 animate-in fade-in duration-200"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)" }}
                    onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
                >
                    <div
                        className="w-full md:max-w-[480px] rounded-t-[32px] md:rounded-[24px] relative overflow-hidden animate-in slide-in-from-bottom-8 md:slide-in-from-bottom-4 duration-300"
                        style={{ background: "var(--bg-main)", borderTop: "1px solid var(--border)", boxShadow: "0 -20px 60px -12px rgba(0,0,0,0.5)" }}
                    >
                        {/* Drag Handle (Mobile only) */}
                        <div className="md:hidden w-12 h-1.5 bg-white/10 rounded-full mx-auto mt-4 mb-2" />

                        <button
                            onClick={() => { setIsModalOpen(false); setSubmitSuccess(false); }}
                            className="absolute top-4 md:top-6 right-4 md:right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-all z-10"
                        >
                            <X size={16} />
                        </button>

                        {submitSuccess ? (
                            <div className="px-6 py-12 md:px-8 md:py-16 text-center">
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} className="text-emerald-400" />
                                </div>
                                <h2 className="text-[24px] md:text-[28px] font-bold text-[var(--white)] mb-4">Parfait !</h2>
                                <p className="text-[16px] text-[var(--text-secondary)] leading-relaxed mb-8">
                                    {t("guides.detail.modal_success") || "Le guide vous a été envoyé par email. Vérifiez vos spams si besoin."}
                                </p>
                                <button
                                    onClick={() => { setIsModalOpen(false); setSubmitSuccess(false); }}
                                    className="px-8 py-4 rounded-xl font-semibold bg-white/5 text-[var(--white)] text-[16px] hover:bg-white/10 transition-colors w-full border border-white/5"
                                >
                                    Fermer
                                </button>
                            </div>
                        ) : (
                            <div className="px-6 pb-8 pt-4 md:p-8 max-h-[85vh] overflow-y-auto hidden-scrollbar">
                                <div className="mb-8">
                                    <h2 className="text-[24px] md:text-[28px] font-bold text-[var(--white)] mb-3 tracking-tight">
                                        {t("guides.detail.modal_title") || "Recevoir par email"}
                                    </h2>
                                    <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                                        {t("guides.detail.modal_desc") || "Saisissez vos informations professionnelles. Le dossier complet, mis à jour par nos experts, vous sera envoyé instantanément."}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                                        <div>
                                            <label className="block text-[11px] md:text-[12px] font-bold text-[var(--text-muted)] mb-2 uppercase tracking-wider">{t("guides.detail.modal_name_label") || "Nom complet"}</label>
                                            <input
                                                type="text" required placeholder="John Doe" value={formData.nom}
                                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                                className="w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-[var(--white)] text-[15px] outline-none focus:border-[var(--green-900)] placeholder:text-white/20 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[11px] md:text-[12px] font-bold text-[var(--text-muted)] mb-2 uppercase tracking-wider">{t("guides.detail.modal_company_label") || "Entreprise"}</label>
                                            <input
                                                type="text" required placeholder="Agréa Corp" value={formData.societe}
                                                onChange={(e) => setFormData({ ...formData, societe: e.target.value })}
                                                className="w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-[var(--white)] text-[15px] outline-none focus:border-[var(--green-900)] placeholder:text-white/20 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] md:text-[12px] font-bold text-[var(--text-muted)] mb-2 uppercase tracking-wider">{t("guides.detail.modal_email_label") || "Email pro"}</label>
                                        <input
                                            type="email" required placeholder={t("guides.detail.modal_email_placeholder") || "john@entreprise.cd"} value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-[var(--white)] text-[15px] outline-none focus:border-[var(--green-900)] placeholder:text-white/20 transition-colors"
                                        />
                                    </div>

                                    <div className="z-50 relative pb-2">
                                        <label className="block text-[11px] md:text-[12px] font-bold text-[var(--text-muted)] mb-2 uppercase tracking-wider">{t("guides.detail.modal_phone_label") || "Téléphone (WhatsApp)"}</label>
                                        <PhoneInput
                                            value={formData.telephone}
                                            onChange={(val) => setFormData({ ...formData, telephone: val })}
                                            required
                                        />
                                    </div>

                                    <div className="pt-2 md:pt-4">
                                        <button
                                            type="submit" disabled={isSubmitting}
                                            className="agrea-button-primary w-full py-4 rounded-xl font-semibold text-[16px] flex items-center justify-center gap-3 transition-opacity cursor-pointer border-none shadow-lg shadow-emerald-900/20"
                                            style={{ opacity: isSubmitting ? 0.7 : 1 }}
                                        >
                                            {isSubmitting
                                                ? <><div className="w-5 h-5 border-2 border-[var(--bg-main)]/30 border-t-[var(--bg-main)] rounded-full animate-spin" /> {t("guides.detail.modal_submit_loading") || "Envoi en cours..."}</>
                                                : <><Download size={18} /> {t("guides.detail.modal_submit_idle") || "Télécharger"}</>
                                            }
                                        </button>
                                    </div>
                                    <p className="text-[11px] md:text-[12px] text-center text-[var(--text-muted)] mt-4 leading-relaxed">
                                        {t("guides.detail.modal_privacy") || "Vos informations sont sécurisées. Aucun spam, jamais."}
                                    </p>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

