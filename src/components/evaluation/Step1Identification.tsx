import { DiagnosticData } from "@/lib/scoring";
import { sectors } from "@/data/sectors";
import { useTranslation } from "@/lib/i18n";

interface Props {
    form: DiagnosticData;
    updateForm: (patch: Partial<DiagnosticData>) => void;
}



const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
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

export default function Step1Identification({ form, updateForm }: Props) {
    const { t } = useTranslation();

    const COMPANY_TYPES = [
        { value: "sarl", label: t("evaluation.step1.ct_sarl") },
        { value: "sa", label: t("evaluation.step1.ct_sa") },
        { value: "eurl", label: t("evaluation.step1.ct_eurl") },
        { value: "cooperative", label: t("evaluation.step1.ct_coop") },
        { value: "ngo", label: t("evaluation.step1.ct_ngo") },
        { value: "other", label: t("evaluation.step1.other") },
    ];

    const EMPLOYEE_COUNTS = [
        { value: "1-5", label: t("evaluation.step1.ec_1_5") },
        { value: "6-20", label: t("evaluation.step1.ec_6_20") },
        { value: "21-50", label: t("evaluation.step1.ec_21_50") },
        { value: "51-200", label: t("evaluation.step1.ec_51_200") },
        { value: "200+", label: t("evaluation.step1.ec_200") },
    ];

    // Les 26 provinces de la RDC
    const PROVINCES = [
        "Kinshasa",
        "Kongo-Central",
        "Kwango",
        "Kwilu",
        "Mai-Ndombe",
        "Kasaï",
        "Kasaï-Central",
        "Kasaï-Oriental",
        "Lomami",
        "Sankuru",
        "Maniema",
        "Sud-Kivu",
        "Nord-Kivu",
        "Ituri",
        "Haut-Uele",
        "Tshopo",
        "Bas-Uele",
        "Équateur",
        "Tshuapa",
        "Mongala",
        "Nord-Ubangi",
        "Sud-Ubangi",
        "Lualaba",
        "Haut-Katanga",
        "Haut-Lomami",
        "Tanganyika",
        t("evaluation.step1.other"),
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Sector */}
            <div>
                <label htmlFor="sector" style={labelStyle}>{t("evaluation.step1.sector_label")} <span style={{ color: "var(--green-900)" }}>*</span></label>
                <select
                    id="sector"
                    value={form.sector}
                    onChange={(e) => updateForm({ sector: e.target.value })}
                    style={inputStyle}
                >
                    <option value="">{t("evaluation.step1.sector_placeholder")}</option>
                    {sectors.map((s) => (
                        <option key={s.id} value={s.id}>{t(s.name)}</option>
                    ))}
                </select>
            </div>

            {/* Company type */}
            <div>
                <label style={labelStyle}>{t("evaluation.step1.company_type_label")}</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {COMPANY_TYPES.map((ct) => (
                        <button
                            key={ct.value}
                            type="button"
                            onClick={() => updateForm({ companyType: ct.value as DiagnosticData["companyType"] })}
                            style={{
                                padding: "8px 14px",
                                border: `1px solid ${form.companyType === ct.value ? "rgba(16, 185, 129, 0.4)" : "var(--border)"}`,
                                borderRadius: "8px",
                                background: form.companyType === ct.value ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.02)",
                                color: form.companyType === ct.value ? "var(--green-900)" : "var(--text-secondary)",
                                fontWeight: form.companyType === ct.value ? 500 : 400,
                                fontSize: "13px",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all 0.15s ease",
                            }}
                            onMouseOver={(e) => {
                                if (form.companyType !== ct.value) {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (form.companyType !== ct.value) {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                                }
                            }}
                        >
                            {ct.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* City */}
            <div>
                <label htmlFor="city" style={labelStyle}>{t("evaluation.step1.city_label")} <span style={{ color: "var(--green-900)" }}>*</span></label>
                <select
                    id="city"
                    value={form.city}
                    onChange={(e) => updateForm({ city: e.target.value })}
                    style={inputStyle}
                >
                    <option value="">{t("evaluation.step1.city_placeholder")}</option>
                    {PROVINCES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* Employee count */}
            <div>
                <label style={labelStyle}>{t("evaluation.step1.size_label")}</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {EMPLOYEE_COUNTS.map((ec) => (
                        <button
                            key={ec.value}
                            type="button"
                            onClick={() => updateForm({ employeeCount: ec.value as DiagnosticData["employeeCount"] })}
                            style={{
                                padding: "8px 14px",
                                border: `1px solid ${form.employeeCount === ec.value ? "rgba(16, 185, 129, 0.4)" : "var(--border)"}`,
                                borderRadius: "8px",
                                background: form.employeeCount === ec.value ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.02)",
                                color: form.employeeCount === ec.value ? "var(--green-900)" : "var(--text-secondary)",
                                fontWeight: form.employeeCount === ec.value ? 500 : 400,
                                fontSize: "13px",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                transition: "all 0.15s ease",
                            }}
                            onMouseOver={(e) => {
                                if (form.employeeCount !== ec.value) {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (form.employeeCount !== ec.value) {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                                }
                            }}
                        >
                            {ec.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
