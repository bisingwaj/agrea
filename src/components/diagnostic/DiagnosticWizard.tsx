"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, Check, AlertCircle } from "lucide-react";

import { useTranslation } from "@/lib/i18n";
import { FadeUp } from "@/components/animations/FadeUp";

interface DiagnosticWizardProps {
    sector: any;
    procedures: any[];
}

export default function DiagnosticWizard({ sector, procedures }: DiagnosticWizardProps) {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Formulaire data
    const [formData, setFormData] = useState({
        companyName: "",
        companyType: "",
        city: "",
        selectedProcedures: [] as string[],
        objectives: [] as string[]
    });

    const isCreation = sector.id === "creation-entreprise";
    const totalSteps = isCreation ? 3 : 4;

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    }, [currentStep]);

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(c => c + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(c => c - 1);
        }
    };

    const toggleProcedure = (procName: string) => {
        setFormData(prev => ({
            ...prev,
            selectedProcedures: prev.selectedProcedures.includes(procName)
                ? prev.selectedProcedures.filter(p => p !== procName)
                : [...prev.selectedProcedures, procName]
        }));
    };

    const toggleObjective = (obj: string) => {
        setFormData(prev => ({
            ...prev,
            objectives: prev.objectives.includes(obj)
                ? prev.objectives.filter(o => o !== obj)
                : [...prev.objectives, obj]
        }));
    };

    const isStep1Valid = formData.companyName && formData.companyType && formData.city;

    return (
        <div style={{
            height: "100dvh",
            width: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-main)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999
        }}>
            {/* Header du Wizard */}
            <div style={{
                height: "72px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 clamp(16px, 4vw, 32px)",
                flexShrink: 0,
                background: "rgba(2, 2, 2, 0.8)",
                backdropFilter: "blur(10px)",
                paddingTop: "env(safe-area-inset-top)"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <Link href={`/${sector.id}`} style={{ color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <ArrowLeft size={18} />
                    </Link>
                    <div style={{ overflow: "hidden" }}>
                        <span style={{ fontSize: "10px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", display: "block" }}>
                            {t("mobile.diagnostic.step") || "Diagnostic"}
                        </span>
                        <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--white)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {t(sector.name)}
                        </div>
                    </div>
                </div>

                {/* Barre de progression modulaire */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {[1, 2, 3, 4].map(step => (
                        <div key={step} style={{
                            width: "clamp(24px, 8vw, 40px)",
                            height: "3px",
                            borderRadius: "2px",
                            background: step <= currentStep ? "var(--green-900)" : "var(--bg-card)",
                            border: step > currentStep ? "1px solid var(--border)" : "none",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                        }} />
                    ))}
                </div>
            </div>

            {/* Contenu principal */}
            <div
                ref={scrollContainerRef}
                style={{
                    flex: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "clamp(24px, 6vh, 48px) 24px",
                    WebkitOverflowScrolling: "touch"
                }}
            >
                <div style={{ maxWidth: "600px", width: "100%", margin: "0 auto", paddingBottom: "120px" }}>

                    {/* ETAPE 1 : Identification */}
                    {currentStep === 1 && (
                        <FadeUp>
                            <h2 style={{ fontSize: "max(24px, 5vw)", fontWeight: 600, color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                                {t("evaluation.steps.s1")}
                            </h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "32px", lineHeight: "1.5" }}>
                                {t("evaluation.step1.sector_placeholder") || "Aidez-nous à personnaliser vos obligations réglementaires."}
                            </p>

                            <div style={{ marginBottom: "20px" }}>
                                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-muted)", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                    {t("evaluation.step5.name_label") || "Nom de votre entreprise"}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t("evaluation.step5.name_placeholder") || "Ex: Ma Société SAS"}
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    style={{
                                        width: "100%",
                                        padding: "14px 16px",
                                        borderRadius: "10px",
                                        border: "1px solid var(--border)",
                                        background: "var(--bg-card)",
                                        color: "var(--white)",
                                        fontSize: "15px",
                                        outline: "none",
                                        transition: "border-color 0.2s"
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = "var(--green-900)"}
                                    onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                                />
                            </div>

                            <div style={{ marginBottom: "24px" }}>
                                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-muted)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                    {t("evaluation.step1.company_type_label")}
                                </label>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                                    {[
                                        { val: "SARL / SARLU", label: t("evaluation.step1.ct_sarl") || "SARL / SARLU" },
                                        { val: "Société Anonyme (SA)", label: t("evaluation.step1.ct_sa") || "SA" },
                                        { val: "Établissement (Personne Physique)", label: t("evaluation.step1.ct_eurl") || "Établissement" },
                                        { val: "Succursale (Entreprise Étrangère)", label: t("evaluation.step1.other") || "Autre" }
                                    ].map(type => (
                                        <button
                                            key={type.val}
                                            onClick={() => setFormData({ ...formData, companyType: type.val })}
                                            style={{
                                                padding: "14px",
                                                borderRadius: "10px",
                                                border: formData.companyType === type.val ? "1px solid var(--green-900)" : "1px solid var(--border)",
                                                background: formData.companyType === type.val ? "rgba(16, 185, 129, 0.08)" : "var(--bg-card)",
                                                color: formData.companyType === type.val ? "var(--green-900)" : "var(--text-secondary)",
                                                textAlign: "left",
                                                cursor: "pointer",
                                                fontSize: "13px",
                                                fontWeight: formData.companyType === type.val ? 600 : 400,
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-muted)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                    {t("evaluation.step1.city_label")}
                                </label>
                                <div style={{ position: "relative" }}>
                                    <select
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        style={{
                                            width: "100%",
                                            padding: "14px 16px",
                                            borderRadius: "10px",
                                            border: "1px solid var(--border)",
                                            background: "var(--bg-card)",
                                            color: "var(--white)",
                                            fontSize: "15px",
                                            outline: "none",
                                            appearance: "none",
                                            WebkitAppearance: "none"
                                        }}
                                    >
                                        <option value="" disabled>{t("evaluation.step1.city_placeholder") || "Sélectionnez votre province"}</option>
                                        {[
                                            "Bas-Uele", "Équateur", "Haut-Katanga", "Haut-Lomami", "Haut-Uele", "Ituri",
                                            "Kasaï", "Kasaï-Central", "Kasaï-Oriental", "Kinshasa", "Kongo-Central", "Kwango",
                                            "Kwilu", "Lomami", "Lualaba", "Mai-Ndombe", "Maniema", "Mongala", "Nord-Kivu",
                                            "Nord-Ubangi", "Sankuru", "Sud-Kivu", "Sud-Ubangi", "Tanganyika", "Tshopo", "Tshuapa"
                                        ].map(prov => (
                                            <option key={prov} value={prov}>{prov}</option>
                                        ))}
                                    </select>
                                    <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)" }}>
                                        <ArrowRight size={14} style={{ transform: "rotate(90deg)" }} />
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    )}

                    {/* ETAPE 2 : Situation (Seulement pour les secteurs, pas pour la création) */}
                    {!isCreation && currentStep === 2 && (
                        <FadeUp>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--green-900)", marginBottom: "12px" }}>
                                <AlertCircle size={18} />
                                <span style={{ fontSize: "13px", fontWeight: 500 }}>
                                    {t("mobile.diagnostic.mandatory_fields") || "Vérification réglementaire en cours"}
                                </span>
                            </div>
                            <h2 style={{ fontSize: "max(24px, 5vw)", fontWeight: 600, color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                                {t("evaluation.steps.s2")}
                            </h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "32px", lineHeight: "1.5" }}>
                                {t("evaluation.step2.desc") || "Cochez les documents que vous possédez déjà."}
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {procedures.slice(0, 8).map((proc, idx) => {
                                    const procName = proc["PROCÉDURE / DOCUMENT"];
                                    const isSelected = formData.selectedProcedures.includes(procName);
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => toggleProcedure(procName)}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                padding: "14px 16px",
                                                background: isSelected ? "rgba(16, 185, 129, 0.05)" : "rgba(255,255,255,0.02)",
                                                border: isSelected ? "1px solid var(--green-900)" : "1px solid var(--border)",
                                                borderRadius: "10px",
                                                cursor: "pointer",
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            <div style={{
                                                width: "22px",
                                                height: "22px",
                                                borderRadius: "6px",
                                                border: isSelected ? "none" : "1.5px solid var(--text-muted)",
                                                background: isSelected ? "var(--green-900)" : "transparent",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: "14px",
                                                flexShrink: 0
                                            }}>
                                                {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ margin: 0, fontSize: "14px", fontWeight: isSelected ? 600 : 400, color: isSelected ? "var(--white)" : "var(--text-secondary)" }}>
                                                    {procName}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </FadeUp>
                    )}

                    {/* ETAPE 3 : Objectifs */}
                    {((!isCreation && currentStep === 3) || (isCreation && currentStep === 2)) && (
                        <FadeUp>
                            <h2 style={{ fontSize: "max(24px, 5vw)", fontWeight: 600, color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                                {t("evaluation.steps.s3")}
                            </h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "32px", lineHeight: "1.5" }}>
                                {t("evaluation.step3.desc")}
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                {(sector.objectives || []).map((objKey: string, idx: number) => {
                                    const label = t(objKey);
                                    const isSelected = formData.objectives.includes(label);
                                    return (
                                        <div
                                            key={idx}
                                            onClick={() => toggleObjective(label)}
                                            style={{
                                                padding: "16px",
                                                borderRadius: "10px",
                                                border: isSelected ? "1px solid var(--green-900)" : "1px solid var(--border)",
                                                background: isSelected ? "rgba(16, 185, 129, 0.05)" : "rgba(255,255,255,0.02)",
                                                color: isSelected ? "var(--green-900)" : "var(--white)",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                lineHeight: "1.4",
                                                transition: "all 0.2s",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "12px"
                                            }}
                                        >
                                            <div style={{
                                                width: "18px",
                                                height: "18px",
                                                borderRadius: "50%",
                                                border: isSelected ? "none" : "1.5px solid var(--text-muted)",
                                                background: isSelected ? "var(--green-900)" : "transparent",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0
                                            }}>
                                                {isSelected && <Check size={12} color="white" strokeWidth={3} />}
                                            </div>
                                            <span style={{ fontWeight: isSelected ? 600 : 400 }}>{label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </FadeUp>
                    )}

                    {/* ETAPE Calcul (Dernière étape) */}
                    {currentStep === totalSteps && (
                        <LoadingAnimation sectorName={t(sector.name)} />
                    )}

                </div>
            </div>

            {/* Footer fixe */}
            {currentStep < totalSteps && (
                <div style={{
                    height: "max(84px, 12vh)",
                    borderTop: "1px solid var(--border)",
                    background: "rgba(2, 2, 2, 0.95)",
                    backdropFilter: "blur(10px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 24px",
                    flexShrink: 0,
                    paddingBottom: "max(12px, env(safe-area-inset-bottom))"
                }}>
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "12px 18px",
                            borderRadius: "10px",
                            background: "transparent",
                            color: currentStep === 1 ? "rgba(255,255,255,0.15)" : "var(--white)",
                            border: currentStep === 1 ? "none" : "1px solid var(--border)",
                            cursor: currentStep === 1 ? "not-allowed" : "pointer",
                            fontSize: "14px",
                            fontWeight: 500,
                            transition: "all 0.2s"
                        }}
                    >
                        <ChevronLeft size={16} /> {t("evaluation.prev")}
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentStep === 1 && !isStep1Valid}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "14px 28px",
                            borderRadius: "10px",
                            background: (currentStep === 1 && !isStep1Valid) ? "rgba(255,255,255,0.05)" : "var(--white)",
                            color: (currentStep === 1 && !isStep1Valid) ? "rgba(255,255,255,0.2)" : "#000",
                            border: "none",
                            cursor: (currentStep === 1 && !isStep1Valid) ? "not-allowed" : "pointer",
                            fontSize: "15px",
                            fontWeight: 600,
                            transition: "all 0.2s",
                            boxShadow: (currentStep === 1 && !isStep1Valid) ? "none" : "0 4px 12px rgba(255,255,255,0.1)"
                        }}
                    >
                        {currentStep === totalSteps - 1 ? t("evaluation.submit") || "Finaliser" : t("evaluation.next") || "Continuer"} <ArrowRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}

// Composant interne pour l'animation premium de génération
const LoadingAnimation = ({ sectorName }: { sectorName: string }) => {
    const { t } = useTranslation();
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState(t("evaluation.generating") || "Analyse de vos données...");

    useEffect(() => {
        const t1 = setTimeout(() => { setProgress(35); setText(`${t("mobile.diagnostic.mandatory_fields") || "Analyse réglementaire"} (${sectorName})...`); }, 1500);
        const t2 = setTimeout(() => { setProgress(75); setText(t("pdf.generating") || "Calcul des scores..."); }, 3000);
        const t3 = setTimeout(() => { setProgress(100); setText(t("mobile.diagnostic.almost_done") || "Diagnostic finalisé !"); }, 4500);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [sectorName, t]);

    return (
        <FadeUp>
            <div style={{ textAlign: "center", paddingTop: "20px", maxWidth: "480px", margin: "0 auto" }}>
                <div style={{ position: "relative", width: "140px", height: "140px", margin: "0 auto 32px auto" }}>
                    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                        <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                        <circle cx="50" cy="50" r="46" fill="none" stroke="var(--green-900)" strokeWidth="4"
                            strokeDasharray="289" strokeDashoffset={289 - (289 * progress) / 100}
                            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)" }} />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 700, color: "var(--white)", fontVariantNumeric: "tabular-nums" }}>
                        {progress}%
                    </div>
                </div>

                <h3 style={{ fontSize: "18px", fontWeight: 500, color: "var(--white)", marginBottom: "32px", minHeight: "24px", lineHeight: "1.5" }}>
                    {text}
                </h3>

                {progress === 100 && (
                    <div style={{ animation: "slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                        <Link
                            href="/mon-rapport"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "18px 32px",
                                fontSize: "16px",
                                fontWeight: 600,
                                borderRadius: "12px",
                                background: "var(--white)",
                                color: "#000",
                                textDecoration: "none",
                                boxShadow: "0 10px 30px rgba(16,185,129,0.3)",
                                transition: "transform 0.2s"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                        >
                            {t("mobile.menu.start_diagnostic") || "Accéder à mon Rapport"} <ArrowRight size={18} />
                        </Link>
                    </div>
                )}
                <style>{`
                    @keyframes slideUp {
                        from { opacity: 0; transform: translateY(30px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </FadeUp>
    );
};
