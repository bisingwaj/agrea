import { DiagnosticData } from "@/lib/scoring";
import { User, Mail } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import PhoneInput from "@/components/PhoneInput";

interface Props {
    form: DiagnosticData;
    updateForm: (patch: Partial<DiagnosticData>) => void;
}

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px 11px 42px",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    color: "var(--white)",
    background: "var(--bg-main)",
    transition: "border-color 0.15s ease",
};

const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--white)",
    marginBottom: "8px",
};

export default function Step5Confirmation({ form, updateForm }: Props) {
    const { t } = useTranslation();

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", animation: "fadeIn 0.3s ease-in-out" }}>
            <div
                style={{
                    padding: "16px 20px",
                    background: "rgba(16, 185, 129, 0.05)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    borderRadius: "10px",
                }}
            >
                <p style={{ fontSize: "13px", color: "var(--green-900)", fontWeight: 600, marginBottom: "8px" }}>
                    {t("evaluation.step5.ready")}
                </p>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.5" }}
                    dangerouslySetInnerHTML={{ __html: t("evaluation.step5.desc") }} />
            </div>

            {/* Nom / Prénom */}
            <div>
                <label htmlFor="contactName" style={labelStyle}>
                    {t("evaluation.step5.name_label")} <span style={{ color: "var(--green-900)" }}>*</span>
                </label>
                <div style={{ position: "relative" }}>
                    <User size={16} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                    <input
                        id="contactName"
                        type="text"
                        value={form.contactName}
                        onChange={(e) => updateForm({ contactName: e.target.value })}
                        placeholder={t("evaluation.step5.name_placeholder")}
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "var(--green-900)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                    />
                </div>
            </div>

            {/* WhatsApp */}
            <div>
                <label htmlFor="contactPhone" style={labelStyle}>
                    {t("evaluation.step5.phone_label")} <span style={{ color: "var(--green-900)" }}>*</span>
                </label>
                <PhoneInput
                    value={form.contactPhone}
                    onChange={(val) => updateForm({ contactPhone: val })}
                    placeholder={t("evaluation.step5.phone_placeholder")}
                    required
                />
            </div>

            {/* Email (optionnel) */}
            <div>
                <label htmlFor="contactEmail" style={labelStyle}>
                    {t("evaluation.step5.email_label")} <span style={{ fontSize: "12px", fontWeight: 400, color: "var(--text-muted)" }}>{t("evaluation.step5.email_opt")}</span>
                </label>
                <div style={{ position: "relative" }}>
                    <Mail size={16} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
                    <input
                        id="contactEmail"
                        type="email"
                        value={form.contactEmail ?? ""}
                        onChange={(e) => updateForm({ contactEmail: e.target.value })}
                        placeholder={t("evaluation.step5.email_placeholder")}
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "var(--green-900)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                    />
                </div>
            </div>

            <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                {t("evaluation.step5.privacy")}
            </p>
        </div>
    );
}
