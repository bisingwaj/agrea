"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft, BookOpen, Calendar, CheckCircle2, Building2,
    Download, Lock, X, ShieldCheck, ArrowRight, Zap
} from "lucide-react";
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
        <div className="min-h-screen bg-[var(--bg-main)] selection:bg-[var(--green-900)] selection:text-white">

            {/* ═══════════════════════ HERO ═══════════════════════ */}
            <div className="border-b border-[var(--border)] bg-[var(--bg-main)] pt-[120px] pb-24">
                <div className="max-w-[800px] mx-auto px-6">

                    {/* Breadcrumb */}
                    <FadeUp delay={0}>
                        <Link
                            href="/guides"
                            className="inline-flex items-center gap-2 text-[var(--text-muted)] text-[14px] font-medium mb-12 transition-colors hover:text-[var(--white)] group"
                        >
                            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                            {t("guides.title")}
                        </Link>
                    </FadeUp>

                    <FadeUp delay={0.1}>
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[12px] font-bold text-[var(--green-100)] tracking-wide uppercase">
                                <Zap size={12} strokeWidth={2.5} />
                                {t(guide.sectorKey as any) || guide.sectorKey}
                            </span>
                            <span className="flex items-center gap-1.5 text-[13px] text-[var(--text-muted)]">
                                <BookOpen size={14} /> {guide.pages} {t("guides.metadata_pages")}
                            </span>
                            <span className="flex items-center gap-1.5 text-[13px] text-[var(--text-muted)]">
                                <Calendar size={14} /> {t("guides.metadata_updated")} {guide.date}
                            </span>
                        </div>

                        <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold text-[var(--white)] tracking-tight leading-[1.1] mb-8">
                            {t(guide.titleKey as any) || guide.titleKey}
                        </h1>
                        <p className="text-[18px] md:text-[22px] text-[var(--text-secondary)] leading-relaxed max-w-[700px]">
                            {guide.contentKeys.description}
                        </p>
                    </FadeUp>
                </div>
            </div>

            {/* ═══════════════════════ BODY ═══════════════════════ */}
            <div className="py-24 max-w-[800px] mx-auto px-6">
                
                {/* For Who */}
                <FadeUp delay={0.2}>
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <ShieldCheck size={20} className="text-emerald-400" />
                            </div>
                            <h2 className="text-[22px] font-semibold text-[var(--white)]">
                                {t("guides.detail.for_who_title")}
                            </h2>
                        </div>
                        <p className="text-[18px] text-[var(--text-secondary)] leading-relaxed pl-[52px]">
                            {guide.contentKeys.forWho}
                        </p>
                    </div>
                </FadeUp>

                {/* What You Get */}
                <FadeUp delay={0.25}>
                    <div className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center">
                                <CheckCircle2 size={20} className="text-[var(--green-900)]" />
                            </div>
                            <h3 className="text-[22px] font-semibold text-[var(--white)]">
                                {t("guides.detail.what_you_get_title")}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-6 pl-[52px]">
                            {guide.contentKeys.whatYouGet.map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/20">
                                        <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={3} />
                                    </div>
                                    <span className="text-[18px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeUp>

                {/* Structures */}
                <FadeUp delay={0.3}>
                    <div className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center">
                                <Building2 size={20} className="text-[var(--text-secondary)]" />
                            </div>
                            <h3 className="text-[22px] font-semibold text-[var(--white)]">
                                {t("guides.detail.structures_title")}
                            </h3>
                        </div>
                        <div className="flex flex-col gap-4 pl-[52px]">
                            {guide.structures.map((structure, idx) => (
                                <div
                                    key={idx}
                                    className="px-6 py-5 rounded-xl text-[16px] text-[var(--white)] font-medium"
                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}
                                >
                                    {structure}
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeUp>

                {/* Main Action Block - Clean & Minimalist */}
                <FadeUp delay={0.4}>
                    <div className="flex flex-col items-center justify-center text-center p-12 py-16 rounded-[32px]" style={{ background: "rgba(16,185,129,0.03)", border: "1px solid rgba(16,185,129,0.15)" }}>
                        <div className="w-16 h-16 rounded-2xl bg-[var(--green-900)] flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/20">
                            <Lock size={28} className="text-[var(--bg-main)]" />
                        </div>
                        <h2 className="text-[28px] md:text-[36px] font-bold text-[var(--white)] mb-4 tracking-tight">
                            Accéder au guide complet
                        </h2>
                        <p className="text-[18px] text-[var(--text-secondary)] max-w-[500px] mb-10 leading-relaxed">
                            Ce contenu est protégé. Téléchargez gratuitement la liste intégrale des prérequis, délais officiels et formulaires pour ce secteur.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="agrea-button-primary px-10 py-5 text-[18px] font-semibold flex items-center gap-3 shadow-2xl"
                        >
                            <Lock size={18} /> {t("guides.detail.get_access_btn")} <ArrowRight size={20} />
                        </button>
                    </div>
                </FadeUp>
            </div>

            {/* ═══════════════════════ MODAL ═══════════════════════ */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}
                    onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
                >
                    <div
                        className="w-full max-w-[480px] rounded-[24px] relative overflow-hidden"
                        style={{ background: "var(--bg-main)", border: "1px solid var(--border)", boxShadow: "0 32px 64px -12px rgba(0,0,0,0.8)" }}
                    >
                        <button
                            onClick={() => { setIsModalOpen(false); setSubmitSuccess(false); }}
                            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-all z-10"
                        >
                            <X size={16} />
                        </button>

                        {submitSuccess ? (
                            <div className="px-8 py-12 text-center">
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} className="text-emerald-400" />
                                </div>
                                <h2 className="text-[26px] font-bold text-[var(--white)] mb-4">Demande envoyée !</h2>
                                <p className="text-[16px] text-[var(--text-secondary)] leading-relaxed mb-8">
                                    {t("guides.detail.modal_success")}
                                </p>
                                <button
                                    onClick={() => { setIsModalOpen(false); setSubmitSuccess(false); }}
                                    className="px-8 py-4 rounded-xl font-semibold bg-white/5 text-[var(--white)] text-[16px] hover:bg-white/10 transition-colors cursor-pointer border border-white/5"
                                >
                                    Fermer la fenêtre
                                </button>
                            </div>
                        ) : (
                            <div className="p-8">
                                <div className="mb-8">
                                    <h2 className="text-[26px] font-bold text-[var(--white)] mb-2 tracking-tight">
                                        {t("guides.detail.modal_title")}
                                    </h2>
                                    <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                                        {t("guides.detail.modal_desc")}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-[12px] font-bold text-[var(--text-muted)] mb-2 uppercase tracking-wider">{t("guides.detail.modal_name_label")}</label>
                                            <input
                                                type="text" required placeholder="John Doe" value={formData.nom}
                                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                                className="w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-[var(--white)] text-[15px] outline-none focus:border-[var(--green-900)] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-bold text-[var(--text-muted)] mb-2 uppercase tracking-wider">{t("guides.detail.modal_company_label")}</label>
                                            <input
                                                type="text" required placeholder="Agréa Corp" value={formData.societe}
                                                onChange={(e) => setFormData({ ...formData, societe: e.target.value })}
                                                className="w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-[var(--white)] text-[15px] outline-none focus:border-[var(--green-900)] transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[12px] font-bold text-[var(--text-muted)] mb-2 uppercase tracking-wider">{t("guides.detail.modal_email_label")}</label>
                                        <input
                                            type="email" required placeholder={t("guides.detail.modal_email_placeholder")} value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3.5 bg-black/20 border border-white/10 rounded-xl text-[var(--white)] text-[15px] outline-none focus:border-[var(--green-900)] transition-colors"
                                        />
                                    </div>

                                    <div className="z-50 relative">
                                        <label className="block text-[12px] font-bold text-[var(--text-muted)] mb-2 uppercase tracking-wider">{t("guides.detail.modal_phone_label")}</label>
                                        <PhoneInput
                                            value={formData.telephone}
                                            onChange={(val) => setFormData({ ...formData, telephone: val })}
                                            required
                                        />
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit" disabled={isSubmitting}
                                            className="agrea-button-primary w-full py-4 rounded-xl font-semibold text-[16px] flex items-center justify-center gap-3 transition-opacity cursor-pointer border-none shadow-lg shadow-emerald-900/20"
                                            style={{ opacity: isSubmitting ? 0.7 : 1 }}
                                        >
                                            {isSubmitting
                                                ? <><div className="w-5 h-5 border-2 border-[var(--bg-main)]/30 border-t-[var(--bg-main)] rounded-full animate-spin" /> {t("guides.detail.modal_submit_loading")}</>
                                                : <><Download size={18} /> {t("guides.detail.modal_submit_idle")}</>
                                            }
                                        </button>
                                    </div>
                                    <p className="text-[12px] text-center text-[var(--text-muted)] mt-4">
                                        {t("guides.detail.modal_privacy")}
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
