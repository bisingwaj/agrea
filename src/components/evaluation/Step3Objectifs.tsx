import { DiagnosticData } from "@/lib/scoring";
import { useTranslation } from "@/lib/i18n";

interface Props {
    form: DiagnosticData;
    updateForm: (patch: Partial<DiagnosticData>) => void;
}

const OBJECTIVES_BY_SECTOR: Record<string, { id: string; label: string }[]> = {
    btp: [
        { id: "permis-construire", label: "Obtenir un permis de construire" },
        { id: "agrement-btp", label: "Obtenir / renouveler mon agrément BTP" },
        { id: "eie", label: "Réaliser une étude d'impact environnemental" },
        { id: "marche-public-btp", label: "Soumissionner à un marché public de travaux" },
    ],
    "marches-publics": [
        { id: "dossier-soumission", label: "Constituer un dossier de soumission" },
        { id: "agrement-fournisseur", label: "Être référencé comme fournisseur de l'État" },
        { id: "prequalification", label: "Obtenir une pré-qualification sectorielle" },
    ],
    "creation-entreprise": [
        { id: "immatriculation-rccm", label: "Immatriculer ma société au RCCM" },
        { id: "ouverture-compte", label: "Ouvrir un compte bancaire professionnel" },
        { id: "mise-conformite", label: "Mettre à jour mes documents légaux" },
    ],
    "import-export": [
        { id: "licence-importation", label: "Obtenir une licence d'importation" },
        { id: "certificat-origine", label: "Obtenir un certificat d'origine CEPGL/COMESA" },
        { id: "agrement-exportateur", label: "Être agréé exportateur" },
    ],
    sante: [
        { id: "pharmacie-autorisation", label: "Ouvrir une pharmacie / officine" },
        { id: "clinique-agrement", label: "Obtenir l'agrément pour une clinique / cabinet" },
        { id: "importation-medicaments", label: "Importer des médicaments (DPM)" },
    ],
    mines: [
        { id: "permis-exploitation", label: "Obtenir un permis d'exploitation minière" },
        { id: "permis-recherche", label: "Obtenir un permis de recherche minière" },
        { id: "conformite-environnementale", label: "Mettre en conformité environnementale" },
    ],
};

export default function Step3Objectifs({ form, updateForm }: Props) {
    const { t } = useTranslation();

    const DEFAULT_OBJECTIVES = [
        { id: "audit-conformite", label: t("evaluation.step3.def1") },
        { id: "mise-conformite-generale", label: t("evaluation.step3.def2") },
        { id: "extension-activite", label: t("evaluation.step3.def3") },
    ];

    const objectives = OBJECTIVES_BY_SECTOR[form.sector] ?? DEFAULT_OBJECTIVES;

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
                {objectives.map((obj) => {
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
