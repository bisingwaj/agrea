"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft, BookOpen, Calendar, CheckCircle2, Building2,
    Download, Lock, X, Clock, DollarSign, BarChart3,
    ShieldCheck, FileText, ArrowRight, Zap
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { GuideData } from "@/data/guides";
import PhoneInput from "@/components/PhoneInput";
import { FadeUp } from "@/components/animations/FadeUp";

interface Props {
    guide: GuideData;
}

const COMPLEXITY_COLOR: Record<string, string> = {
    "Élevée": "#EF4444",
    "High": "#EF4444",
    "高": "#EF4444",
    "Moyenne": "#F59E0B",
    "Medium": "#F59E0B",
    "中": "#F59E0B",
    "Faible": "#10B981",
    "Low": "#10B981",
    "低": "#10B981",
};

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

    const complexityColor = COMPLEXITY_COLOR[guide.stats.complexite] || "#F59E0B";

    return (
        <div className="min-h-screen bg-[var(--bg-main)]">

            {/* ═══════════════════════ HERO ═══════════════════════ */}
            <div className="border-b border-[var(--border)] bg-[var(--bg-main)]">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-[110px] pb-14">

                    {/* Breadcrumb */}
                    <FadeUp delay={0}>
                        <Link
                            href="/guides"
                            className="inline-flex items-center gap-2 text-[var(--text-muted)] text-sm font-medium mb-8 transition-colors hover:text-[var(--white)] group"
                        >
                            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
                            {t("guides.title")}
                        </Link>
                    </FadeUp>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

                        {/* Left: Title + Meta */}
                        <div className="flex-1 max-w-[680px]">
                            <FadeUp delay={0.05}>
                                {/* Sector badge */}
                                <div className="flex items-center gap-2.5 mb-5 flex-wrap">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[12px] font-semibold text-[var(--green-900)] tracking-wide uppercase">
                                        <Zap size={11} />
                                        {t(guide.sectorKey as any) || guide.sectorKey}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)]">
                                        <BookOpen size={13} /> {guide.pages} {t("guides.metadata_pages")}
                                    </span>
                                    <span className="flex items-center gap-1.5 text-[12px] text-[var(--text-muted)]">
                                        <Calendar size={13} /> {t("guides.metadata_updated")} {guide.date}
                                    </span>
                                </div>

                                <h1 className="text-[28px] md:text-[38px] lg:text-[46px] font-bold text-[var(--white)] tracking-tight leading-[1.15] mb-5">
                                    {t(guide.titleKey as any) || guide.titleKey}
                                </h1>
                                <p className="text-[16px] md:text-[18px] text-[var(--text-secondary)] leading-relaxed">
                                    {guide.contentKeys.description}
                                </p>
                            </FadeUp>
                        </div>

                        {/* Right: Stats Card */}
                        <FadeUp delay={0.1}>
                            <div
                                className="w-full lg:w-[300px] flex-shrink-0 rounded-2xl overflow-hidden"
                                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                            >
                                <div className="px-5 py-4 border-b border-[var(--border)]">
                                    <p className="text-[11px] font-semibold tracking-widest uppercase text-[var(--text-muted)]">
                                        {t("guides.preview_stats")}
                                    </p>
                                </div>
                                <div className="p-5 flex flex-col gap-4">
                                    {/* Délai */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                <Clock size={14} className="text-blue-400" />
                                            </div>
                                            <span className="text-[13px] text-[var(--text-muted)]">{t("guides.label_delai")}</span>
                                        </div>
                                        <span className="text-[13px] font-semibold text-[var(--white)]">{guide.stats.delai}</span>
                                    </div>
                                    {/* Coût */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                <DollarSign size={14} className="text-emerald-400" />
                                            </div>
                                            <span className="text-[13px] text-[var(--text-muted)]">{t("guides.label_cout")}</span>
                                        </div>
                                        <span className="text-[13px] font-semibold text-[var(--white)]">{guide.stats.cout}</span>
                                    </div>
                                    {/* Complexité */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                                <BarChart3 size={14} className="text-amber-400" />
                                            </div>
                                            <span className="text-[13px] text-[var(--text-muted)]">{t("guides.label_complexite")}</span>
                                        </div>
                                        <span
                                            className="text-[12px] font-bold px-2.5 py-1 rounded-full"
                                            style={{
                                                color: complexityColor,
                                                background: `${complexityColor}18`,
                                                border: `1px solid ${complexityColor}30`
                                            }}
                                        >
                                            {guide.stats.complexite}
                                        </span>
                                    </div>

                                    {/* Répartition chart */}
                                    <div className="pt-3 border-t border-[var(--border)]">
                                        <p className="text-[11px] font-semibold tracking-widest uppercase text-[var(--text-muted)] mb-3">
                                            {t("guides.preview_chart")}
                                        </p>
                                        <div className="space-y-2.5">
                                            {[
                                                { label: "Admin.", value: guide.chart.admin, color: "#10B981" },
                                                { label: "Technique", value: guide.chart.tech, color: "#3B82F6" },
                                                { label: "Financier", value: guide.chart.fin, color: "#F59E0B" },
                                            ].map((item) => (
                                                <div key={item.label}>
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-[11px] text-[var(--text-muted)]">{item.label}</span>
                                                        <span className="text-[11px] font-semibold text-[var(--white)]">{item.value}%</span>
                                                    </div>
                                                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                                        <div
                                                            className="h-full rounded-full transition-all duration-700"
                                                            style={{ width: `${item.value}%`, background: item.color }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════ BODY ═══════════════════════ */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* ── Main Column ── */}
                    <div className="flex-1 min-w-0">

                        {/* For Who */}
                        <FadeUp delay={0.15}>
                            <div
                                className="rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden"
                                style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                            >
                                <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                            <ShieldCheck size={16} className="text-emerald-400" />
                                        </div>
                                        <h2 className="text-[15px] font-semibold text-[var(--white)]">
                                            {t("guides.detail.for_who_title")}
                                        </h2>
                                    </div>
                                    <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">
                                        {guide.contentKeys.forWho}
                                    </p>
                                </div>
                            </div>
                        </FadeUp>

                        {/* What You Get */}
                        <FadeUp delay={0.2}>
                            <div className="mb-8">
                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center">
                                        <CheckCircle2 size={18} className="text-[var(--green-900)]" />
                                    </div>
                                    <h3 className="text-[18px] font-semibold text-[var(--white)]">
                                        {t("guides.detail.what_you_get_title")}
                                    </h3>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {guide.contentKeys.whatYouGet.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3 p-4 rounded-xl transition-colors hover:bg-white/5"
                                            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
                                        >
                                            <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            </div>
                                            <span className="text-[14px] text-[var(--text-secondary)] leading-relaxed">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeUp>

                        {/* Structures */}
                        <FadeUp delay={0.25}>
                            <div className="mb-8">
                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="w-9 h-9 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center">
                                        <Building2 size={18} className="text-[var(--text-secondary)]" />
                                    </div>
                                    <h3 className="text-[18px] font-semibold text-[var(--white)]">
                                        {t("guides.detail.structures_title")}
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {guide.structures.map((structure, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                                            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-[var(--green-900)] flex-shrink-0" />
                                            <span className="text-[14px] text-[var(--text-secondary)]">{structure}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeUp>

                        {/* Preview Docs teaser */}
                        <FadeUp delay={0.3}>
                            <div
                                className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
                                style={{ background: "linear-gradient(135deg, rgba(13,92,58,0.12) 0%, rgba(16,185,129,0.05) 100%)", border: "1px solid rgba(16,185,129,0.2)" }}
                            >
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                                        <FileText size={20} className="text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-[17px] font-semibold text-[var(--white)] mb-1">{t("guides.preview_docs")}</h3>
                                        <p className="text-[13px] text-[var(--text-muted)]">{t("guides.detail.for_who_title")}</p>
                                    </div>
                                </div>
                                {/* Blurred teaser rows */}
                                <div className="space-y-2 mb-5 relative">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-10 rounded-lg bg-white/5 border border-white/5 flex items-center px-4 gap-3" style={{ filter: i > 0 ? "blur(3px)" : "none", opacity: i > 0 ? 0.4 : 1 }}>
                                            <div className="w-4 h-4 rounded bg-emerald-500/20" />
                                            <div className="h-2.5 bg-white/10 rounded flex-1" style={{ width: `${[70, 55, 45][i]}%` }} />
                                        </div>
                                    ))}
                                    {/* overlay lock */}
                                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.8) 0%, transparent 60%)" }}>
                                        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-[var(--text-muted)]">
                                                <Lock size={10} /> Contenu verrouillé
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* CTA inline — hidden on mobile (sticky bar is used instead) */}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="hidden sm:flex agrea-button-primary items-center gap-2 w-full justify-center"
                                >
                                    <Lock size={16} /> {t("guides.detail.get_access_btn")} <ArrowRight size={15} />
                                </button>
                            </div>
                        </FadeUp>
                    </div>

                    {/* ── Sidebar (Desktop sticky CTA) ── */}
                    <div className="hidden lg:block w-[300px] flex-shrink-0">
                        <div className="sticky top-[100px]">
                            <FadeUp delay={0.2}>
                                <div
                                    className="rounded-2xl overflow-hidden"
                                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                                >
                                    {/* Top accent */}
                                    <div className="h-1 w-full bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20" />
                                    <div className="p-6">
                                        <p className="text-[11px] font-semibold tracking-widest uppercase text-[var(--green-900)] mb-1">
                                            {t("guides.cta_download")}
                                        </p>
                                        <h3 className="text-[18px] font-bold text-[var(--white)] mb-3 leading-snug">
                                            {t(guide.titleKey as any) || guide.titleKey}
                                        </h3>
                                        <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-5">
                                            {guide.contentKeys.forWho}
                                        </p>

                                        <div className="flex items-center gap-3 mb-5 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)" }}>
                                            <BookOpen size={18} className="text-[var(--text-muted)]" />
                                            <span className="text-[13px] text-[var(--text-secondary)]">{guide.pages} pages · {guide.date}</span>
                                        </div>

                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="w-full py-4 px-5 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer border-none"
                                            style={{
                                                background: "var(--green-900)",
                                                color: "var(--bg-main)",
                                                boxShadow: "0 0 24px rgba(16,185,129,0.25)"
                                            }}
                                            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
                                            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                                        >
                                            <Lock size={16} /> {t("guides.detail.get_access_btn")}
                                        </button>

                                        <p className="text-[11px] text-center text-[var(--text-muted)] mt-3">
                                            {t("guides.detail.modal_privacy")}
                                        </p>
                                    </div>
                                </div>

                                {/* Related action */}
                                <div
                                    className="mt-4 p-5 rounded-2xl cursor-pointer transition-colors hover:border-emerald-500/30"
                                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <p className="text-[13px] font-semibold text-[var(--white)] mb-1.5">{t("guides.cta_contact")}</p>
                                    <p className="text-[12px] text-[var(--text-muted)] leading-relaxed">{t("home.cta_desc")}</p>
                                    <div className="flex items-center gap-1 mt-2 text-[var(--green-900)] text-[12px] font-semibold">
                                        <ArrowRight size={12} /> {t("home.cta_btn")}
                                    </div>
                                </div>
                            </FadeUp>
                        </div>
                    </div>

                </div>
            </div>

            {/* ═══════════════════════ MOBILE STICKY CTA ═══════════════════════ */}
            <div
                className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-6 pt-4"
                style={{ background: "linear-gradient(to top, rgba(8,8,8,0.98) 60%, transparent)" }}
            >
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-4 rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2.5 cursor-pointer border-none shadow-xl"
                    style={{
                        background: "var(--green-900)",
                        color: "var(--bg-main)",
                        boxShadow: "0 0 32px rgba(16,185,129,0.35)"
                    }}
                >
                    <Lock size={17} /> {t("guides.detail.get_access_btn")} <ArrowRight size={15} />
                </button>
            </div>

            {/* ═══════════════════════ MODAL ═══════════════════════ */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
                    onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}
                >
                    <div
                        className="w-full max-w-[480px] rounded-2xl relative overflow-hidden"
                        style={{ background: "var(--bg-main)", border: "1px solid var(--border)", boxShadow: "0 32px 64px -12px rgba(0,0,0,0.7)" }}
                    >
                        {/* Top accent bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20" />

                        <button
                            onClick={() => { setIsModalOpen(false); setSubmitSuccess(false); }}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-white/10 transition-all"
                        >
                            <X size={18} />
                        </button>

                        {submitSuccess ? (
                            /* ── Success state ── */
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                                    <CheckCircle2 size={32} className="text-emerald-400" />
                                </div>
                                <h2 className="text-[22px] font-bold text-[var(--white)] mb-3">Demande envoyée !</h2>
                                <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed mb-6">
                                    {t("guides.detail.modal_success")}
                                </p>
                                <button
                                    onClick={() => { setIsModalOpen(false); setSubmitSuccess(false); }}
                                    className="px-6 py-3 rounded-xl bg-white/10 text-[var(--white)] text-[14px] font-medium hover:bg-white/15 transition-colors border-none cursor-pointer"
                                >
                                    Fermer
                                </button>
                            </div>
                        ) : (
                            /* ── Form ── */
                            <div className="p-6 sm:p-8">
                                <div className="mb-6">
                                    <h2 className="text-[22px] sm:text-[26px] font-bold text-[var(--white)] mb-1.5 tracking-tight">
                                        {t("guides.detail.modal_title")}
                                    </h2>
                                    <p className="text-[13px] sm:text-[14px] text-[var(--text-secondary)] leading-relaxed">
                                        {t("guides.detail.modal_desc")}
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name + Company — side by side on sm+ */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[12px] font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">{t("guides.detail.modal_name_label")}</label>
                                            <input
                                                type="text" required placeholder="John Doe" value={formData.nom}
                                                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                                className="w-full px-3.5 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-[var(--white)] text-[13px] outline-none focus:border-emerald-500/50 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[12px] font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">{t("guides.detail.modal_company_label")}</label>
                                            <input
                                                type="text" required placeholder="Agréa Corp" value={formData.societe}
                                                onChange={(e) => setFormData({ ...formData, societe: e.target.value })}
                                                className="w-full px-3.5 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-[var(--white)] text-[13px] outline-none focus:border-emerald-500/50 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[12px] font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">{t("guides.detail.modal_email_label")}</label>
                                        <input
                                            type="email" required placeholder={t("guides.detail.modal_email_placeholder")} value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-3.5 py-3 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-[var(--white)] text-[13px] outline-none focus:border-emerald-500/50 transition-colors"
                                        />
                                    </div>

                                    <div className="z-50 relative">
                                        <label className="block text-[12px] font-semibold text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">{t("guides.detail.modal_phone_label")}</label>
                                        <PhoneInput
                                            value={formData.telephone}
                                            onChange={(val) => setFormData({ ...formData, telephone: val })}
                                            required
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit" disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-all border-none cursor-pointer"
                                            style={{
                                                background: isSubmitting ? "rgba(16,185,129,0.5)" : "var(--green-900)",
                                                color: "var(--bg-main)",
                                                opacity: isSubmitting ? 0.8 : 1
                                            }}
                                        >
                                            {isSubmitting
                                                ? <><div className="w-4 h-4 border-2 border-black/30 border-t-black/80 rounded-full animate-spin" /> {t("guides.detail.modal_submit_loading")}</>
                                                : <><Download size={16} /> {t("guides.detail.modal_submit_idle")}</>
                                            }
                                        </button>
                                    </div>
                                    <p className="text-[11px] text-center text-[var(--text-muted)]">
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
