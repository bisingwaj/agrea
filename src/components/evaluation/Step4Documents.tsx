import { DiagnosticData } from "@/lib/scoring";
import { CheckSquare, Square } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface Props {
    form: DiagnosticData;
    updateForm: (patch: Partial<DiagnosticData>) => void;
}

const SECTOR_DOCUMENTS: Record<string, { id: string; label: string }[]> = {
    btp: [
        { id: "agrement-btp", label: "Agrément BTP (Ministère des ITP)" },
        { id: "plan-architecte", label: "Plans visés par un architecte agréé" },
        { id: "garantie-bancaire", label: "Garantie bancaire de soumission" },
        { id: "attestation-execution", label: "Attestations de bonne exécution" },
    ],
    "marches-publics": [
        { id: "rccm-recent", label: "Extrait RCCM récent (moins de 3 mois)" },
        { id: "bilans-certifies", label: "Bilans certifiés des 3 derniers exercices" },
        { id: "caution-soumission", label: "Capacité de caution bancaire confirmée" },
        { id: "offre-technique", label: "Modèles d'offre technique préparés" },
    ],
    "creation-entreprise": [
        { id: "statuts-notaries", label: "Statuts notariés signés" },
        { id: "capital-libere", label: "Preuve de libération du capital social" },
        { id: "bail-siege", label: "Bail du siège social (minimum 1 an)" },
        { id: "pv-constitution", label: "PV de l'assemblée constitutive" },
    ],
    "import-export": [
        { id: "licence-importation", label: "Licence d'importation en cours de validité" },
        { id: "certificat-origine", label: "Certificat d'origine des marchandises" },
        { id: "declaration-douane", label: "Déclarations douanières récentes" },
        { id: "credit-documentaire", label: "Ligne de crédit documentaire bancaire" },
    ],
    sante: [
        { id: "diplome-sante", label: "Diplôme certifié et reconnu (MINSANTE)" },
        { id: "autorisation-minsante", label: "Autorisation d'exercice MINSANTE" },
        { id: "plan-local-visite", label: "Plans des locaux visés par l'inspecteur" },
        { id: "liste-materiel", label: "Inventaire du matériel médical" },
    ],
    mines: [
        { id: "permis-minier", label: "Permis minier CAMI en cours de validité" },
        { id: "etude-geologique", label: "Étude géologique du site" },
        { id: "plan-gestion-env", label: "Plan de gestion environnementale et sociale" },
        { id: "attestation-cami", label: "Attestation de conformité CAMI" },
    ],
};

export default function Step4Documents({ form, updateForm }: Props) {
    const { t } = useTranslation();

    const DEFAULT_DOCUMENTS = [
        { id: "statuts", label: t("evaluation.step4.def1") },
        { id: "bail-locaux", label: t("evaluation.step4.def2") },
        { id: "assurance", label: t("evaluation.step4.def3") },
        { id: "reglement-interieur", label: t("evaluation.step4.def4") },
    ];

    const documents = SECTOR_DOCUMENTS[form.sector] ?? DEFAULT_DOCUMENTS;

    const toggle = (id: string) => {
        const current = form.documentsObtained;
        const updated = current.includes(id)
            ? current.filter((d) => d !== id)
            : [...current, id];
        updateForm({ documentsObtained: updated });
    };

    return (
        <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
            <p style={{ fontSize: "14px", marginBottom: "20px", color: "var(--text-secondary)" }}
                dangerouslySetInnerHTML={{ __html: t("evaluation.step4.desc") }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {documents.map((doc) => {
                    const checked = form.documentsObtained.includes(doc.id);
                    return (
                        <button
                            key={doc.id}
                            type="button"
                            onClick={() => toggle(doc.id)}
                            style={{
                                display: "flex",
                                alignItems: "center",
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
                            <div style={{ flexShrink: 0 }}>
                                {checked ? (
                                    <CheckSquare size={18} color="var(--green-900)" strokeWidth={1.5} />
                                ) : (
                                    <Square size={18} color="rgba(255,255,255,0.3)" strokeWidth={1.5} />
                                )}
                            </div>
                            <span style={{ fontWeight: checked ? 500 : 400, color: checked ? "var(--green-900)" : "var(--white)", fontSize: "14px" }}>
                                {doc.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div
                style={{
                    marginTop: "20px",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                }}
            >
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: "1.5" }}
                    dangerouslySetInnerHTML={{ __html: t("evaluation.step4.note") }} />
            </div>
        </div>
    );
}
