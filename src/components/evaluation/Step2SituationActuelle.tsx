import { DiagnosticData } from "@/lib/scoring";
import { CheckSquare, Square } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface Props {
    form: DiagnosticData;
    updateForm: (patch: Partial<DiagnosticData>) => void;
}

const BASE_DOCS = [
    { id: "hasRccm", labelKey: "evaluation.step2.rccm_label", descKey: "evaluation.step2.rccm_desc" },
    { id: "hasNif", labelKey: "evaluation.step2.nif_label", descKey: "evaluation.step2.nif_desc" },
    { id: "hasCnss", labelKey: "evaluation.step2.cnss_label", descKey: "evaluation.step2.cnss_desc" },
    { id: "hasInss", labelKey: "evaluation.step2.inss_label", descKey: "evaluation.step2.inss_desc" },
    { id: "hasFiscalAttestation", labelKey: "evaluation.step2.fiscal_label", descKey: "evaluation.step2.fiscal_desc" },
] as const;

type BoolField = "hasRccm" | "hasNif" | "hasCnss" | "hasInss" | "hasFiscalAttestation";

export default function Step2SituationActuelle({ form, updateForm }: Props) {
    const { t } = useTranslation();

    const toggle = (field: BoolField) => {
        updateForm({ [field]: !form[field] });
    };

    return (
        <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
            <p style={{ fontSize: "14px", marginBottom: "20px", color: "var(--text-secondary)" }}
                dangerouslySetInnerHTML={{ __html: t("evaluation.step2.desc") }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {BASE_DOCS.map((doc) => {
                    const checked = form[doc.id as BoolField];
                    return (
                        <button
                            key={doc.id}
                            type="button"
                            onClick={() => toggle(doc.id as BoolField)}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "14px",
                                padding: "16px 18px",
                                border: `1px solid ${checked ? "rgba(16, 185, 129, 0.4)" : "var(--border)"}`,
                                borderRadius: "10px",
                                background: checked ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.02)",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                textAlign: "left",
                                transition: "all 0.15s ease",
                                width: "100%",
                            }}
                            onMouseOver={(e) => {
                                if (!checked) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                            }}
                            onMouseOut={(e) => {
                                if (!checked) e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                            }}
                        >
                            <div style={{ flexShrink: 0, marginTop: "2px" }}>
                                {checked ? (
                                    <CheckSquare size={18} color="var(--green-900)" strokeWidth={1.5} />
                                ) : (
                                    <Square size={18} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
                                )}
                            </div>
                            <div>
                                <p style={{ fontWeight: 500, color: checked ? "var(--green-900)" : "var(--white)", fontSize: "14px", marginBottom: "2px", lineHeight: "1.3" }}>
                                    {t(doc.labelKey)}
                                </p>
                                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.3" }}>{t(doc.descKey)}</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "16px" }}>
                {t("evaluation.step2.warning")}
            </p>
        </div>
    );
}
