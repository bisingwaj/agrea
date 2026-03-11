"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { sectors } from "@/data/sectors";
import { DiagnosticData, calculateScore } from "@/lib/scoring";
import StepIndicator from "./StepIndicator";
import Step1Identification from "./Step1Identification";
import Step2SituationActuelle from "./Step2SituationActuelle";
import Step3Objectifs from "./Step3Objectifs";
import Step4Documents from "./Step4Documents";
import Step5Confirmation from "./Step5Confirmation";
import { useTranslation } from "@/lib/i18n";

const EMPTY_FORM: DiagnosticData = {
    companyName: "",
    sector: "",
    companyType: "sarl",
    city: "",
    employeeCount: "1-5",
    hasRccm: false,
    hasNif: false,
    hasCnss: false,
    hasInss: false,
    hasFiscalAttestation: false,
    existingAccreditations: [],
    objectives: [],
    documentsObtained: [],
    contactName: "",
    contactPhone: "",
    contactEmail: "",
};

export default function DiagnosticForm() {
    const router = useRouter();
    const { t } = useTranslation();

    const STEPS = [
        t("evaluation.steps.s1"),
        t("evaluation.steps.s2"),
        t("evaluation.steps.s3"),
        t("evaluation.steps.s4"),
        t("evaluation.steps.s5"),
    ];

    const [currentStep, setCurrentStep] = useState(0);
    const [form, setForm] = useState<DiagnosticData>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);

    const updateForm = (patch: Partial<DiagnosticData>) => {
        setForm((prev) => ({ ...prev, ...patch }));
    };

    const canProceed = (): boolean => {
        if (currentStep === 0) return !!form.sector && !!form.city;
        if (currentStep === 4) return !!form.contactName && !!form.contactPhone;
        return true;
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep((s) => s + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep((s) => s - 1);
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const result = calculateScore(form);
            // Store result in sessionStorage for the report page
            sessionStorage.setItem("agrea_diagnostic", JSON.stringify({ form, result }));
            // Also send a notification
            await fetch("/api/recall", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: form.contactName,
                    whatsapp: form.contactPhone,
                    timeSlot: "Diagnostic soumis",
                    source: "diagnostic",
                    sector: form.sector,
                }),
            }).catch(() => {/* non-blocking */ });

            router.push("/mon-rapport");
        } catch {
            setSubmitting(false);
        }
    };

    const stepProps = { form, updateForm };

    return (
        <div className="container" style={{ maxWidth: "680px", height: "100%", display: "flex", flexDirection: "column", padding: "20px 0" }}>
            {/* Header */}
            <div style={{ marginBottom: "20px", flexShrink: 0 }}>
                <span className="badge" style={{ marginBottom: "12px", display: "inline-flex", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                    {t("evaluation.badge")}
                </span>
                <h1 style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)", marginBottom: "8px", color: "var(--white)", letterSpacing: "-0.02em" }}>
                    {t("evaluation.title")}
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.5" }}>
                    {t("evaluation.desc")}
                </p>
            </div>

            {/* Step indicator */}
            <StepIndicator steps={STEPS} currentStep={currentStep} />

            {/* Step content */}
            <div
                className="glow-card"
                style={{
                    marginTop: "20px",
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: "36px",
                    border: "1px solid var(--border)",
                    borderRadius: "16px",
                    background: "var(--bg-card)",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div style={{ marginBottom: "24px", flexShrink: 0 }}>
                    <p className="label" style={{ marginBottom: "8px", color: "var(--green-900)" }}>
                        {t("evaluation.step")} {currentStep + 1} {t("evaluation.on")} {STEPS.length}
                    </p>
                    <h2 style={{ fontSize: "1.5rem", color: "var(--white)", letterSpacing: "-0.02em" }}>{STEPS[currentStep]}</h2>
                </div>

                {currentStep === 0 && <Step1Identification {...stepProps} />}
                {currentStep === 1 && <Step2SituationActuelle {...stepProps} />}
                {currentStep === 2 && <Step3Objectifs {...stepProps} />}
                {currentStep === 3 && <Step4Documents {...stepProps} />}
                {currentStep === 4 && <Step5Confirmation {...stepProps} />}
            </div>

            {/* Navigation */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                    gap: "12px",
                    flexShrink: 0,
                }}
            >
                <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="btn-secondary"
                    style={{ opacity: currentStep === 0 ? 0.3 : 1 }}
                >
                    <ArrowLeft size={16} /> {t("evaluation.prev")}
                </button>

                {currentStep < STEPS.length - 1 ? (
                    <button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="btn-primary"
                        style={{ opacity: canProceed() ? 1 : 0.4 }}
                    >
                        {t("evaluation.next")} <ArrowRight size={16} />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!canProceed() || submitting}
                        className="btn-primary"
                        style={{ opacity: canProceed() && !submitting ? 1 : 0.4 }}
                    >
                        <CheckCircle size={16} />
                        {submitting ? t("evaluation.generating") : t("evaluation.submit")}
                    </button>
                )}
            </div>

            <p style={{ fontSize: "12px", color: "var(--text-muted)", textAlign: "center", marginTop: "16px", flexShrink: 0 }}>
                {t("evaluation.footer")}
            </p>
        </div>
    );
}
