"use client";
import { DiagnosticData } from "@/lib/scoring";
import { useTranslation } from "@/lib/i18n";
import { creationSector, industrySectors } from "@/data/sectors";

interface Props {
    form: DiagnosticData;
    updateForm: (patch: Partial<DiagnosticData>) => void;
}

// All sector IDs with their number of objectives (matching data_sectors locale keys)
const SECTOR_OBJECTIVES_COUNT: Record<string, number> = {
    "creation-entreprise": 5,
    "btp": 5,
    "marches-publics": 5,
    "import-export": 5,
    "sante": 5,
    "transport": 5,
    "mines": 5,
    "telecoms": 5,
    "education": 5,
    "agriculture": 5,
    "securite": 5,
    "finance": 5,
};

export default function Step3Objectifs({ form, updateForm }: Props) {
    const { t } = useTranslation();

    // Build objectives from locale keys (always translated)
    const count = SECTOR_OBJECTIVES_COUNT[form.sector];
    const objectives: { id: string; label: string }[] = count
        ? Array.from({ length: count }, (_, i) => ({
              id: `${form.sector}-obj-${i}`,
              label: t(`data_sectors.${form.sector}.objectives_list.${i}` as any),
          }))
        : [
              { id: "audit-conformite", label: t("evaluation.step3.def1") },
              { id: "mise-conformite-generale", label: t("evaluation.step3.def2") },
              { id: "extension-activite", label: t("evaluation.step3.def3") },
          ];

    // Add "Autres" option
    const withOther = [
        ...objectives,
        { id: "autres", label: t("evaluation.step3.other") },
    ];

    const toggle = (id: string) => {
        const current = form.objectives;
        const updated = current.includes(id)
            ? current.filter((o) => o !== id)
            : [...current, id];
        updateForm({ objectives: updated });
    };

    return (
        <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
            <p style={{ fontSize: "14px", marginBottom: "20px", color: "var(--text-secondary)" }}>
                {t("evaluation.step3.desc")}
                <br />
                <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t("evaluation.step3.hint")}</span>
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {withOther.map((obj) => {
                    const selected = form.objectives.includes(obj.id);
                    return (
                        <button
                            key={obj.id}
                            type="button"
                            onClick={() => toggle(obj.id)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "16px 18px",
                                border: `1px solid ${selected ? "rgba(16, 185, 129, 0.4)" : "var(--border)"}`,
                                borderRadius: "10px",
                                background: selected ? "rgba(16, 185, 129, 0.1)" : "rgba(255,255,255,0.02)",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                textAlign: "left",
                                transition: "all 0.15s ease",
                                width: "100%",
                            }}
                            onMouseOver={(e) => {
                                if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                            }}
                            onMouseOut={(e) => {
                                if (!selected) e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                            }}
                        >
                            <span style={{ fontWeight: selected ? 500 : 400, color: selected ? "var(--green-900)" : "var(--white)", fontSize: "14px" }}>
                                {obj.label}
                            </span>
                            <div
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    border: `2px solid ${selected ? "var(--green-900)" : "var(--border)"}`,
                                    background: selected ? "var(--green-900)" : "transparent",
                                    flexShrink: 0,
                                    transition: "all 0.15s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                {selected && <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7l2.5 3 6-7" stroke="var(--bg-main)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
