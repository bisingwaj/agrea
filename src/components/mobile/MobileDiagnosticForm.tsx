"use client";

/**
 * MobileDiagnosticForm — version mobile-only du diagnostic, full-screen sans scroll.
 * Découpe les étapes en sous-vues compactes pour ne jamais déborder l'écran.
 * Le bundle desktop n'est PAS impacté : ce composant n'est chargé qu'en mobile.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle, X } from "lucide-react";
import { sectors } from "@/data/sectors";
import { DiagnosticData, calculateScore } from "@/lib/scoring";
import { useTranslation } from "@/lib/i18n";
import PhoneInput from "@/components/PhoneInput";
import { FadeUp } from "@/components/animations/FadeUp";

// ─── TYPES ───────────────────────────────────────────────────────────────────

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

// ─── SUB-DATA ─────────────────────────────────────────────────────────────────

const COMPANY_TYPES = [
    { value: "sarl", label: "SARL" },
    { value: "sa", label: "S.A." },
    { value: "eurl", label: "EURL" },
    { value: "cooperative", label: "Coopérative" },
    { value: "ngo", label: "ONG / ASBL" },
    { value: "other", label: "Autre" },
];

const EMPLOYEE_COUNTS = [
    { value: "1-5", label: "1–5" },
    { value: "6-20", label: "6–20" },
    { value: "21-50", label: "21–50" },
    { value: "51-200", label: "51–200" },
    { value: "200+", label: "200+" },
];

const CITIES = [
    "Kinshasa", "Lubumbashi", "Mbuji-Mayi", "Kisangani", "Kananga",
    "Bukavu", "Tshikapa", "Kolwezi", "Likasi", "Matadi",
    "Butembo", "Goma", "Mbandaka", "Kikwit", "Autre",
];

const BASE_DOCS = [
    { id: "hasRccm", label: "RCCM", desc: "Registre Commerce" },
    { id: "hasNif", label: "NIF", desc: "Numéro fiscal" },
    { id: "hasCnss", label: "CNSS", desc: "Sécurité sociale" },
    { id: "hasInss", label: "INSS", desc: "Assurance sociale" },
    { id: "hasFiscalAttestation", label: "Attestation fiscale", desc: "Quitus fiscal à jour" },
] as const;

type BoolField = "hasRccm" | "hasNif" | "hasCnss" | "hasInss" | "hasFiscalAttestation";

const OBJECTIVES_BY_SECTOR: Record<string, { id: string; label: string }[]> = {
    btp: [
        { id: "permis-construire", label: "data_objectives.permis-construire.label" },
        { id: "agrement-btp", label: "data_objectives.agrement-btp.label" },
        { id: "eie", label: "data_objectives.eie.label" },
        { id: "marche-public-btp", label: "data_objectives.dossier-soumission.label" },
    ],
    "marches-publics": [
        { id: "dossier-soumission", label: "data_objectives.dossier-soumission.label" },
        { id: "attestation-fiscale", label: "data_objectives.attestation-fiscale.label" },
        { id: "attestation-cnss", label: "data_objectives.attestation-cnss.label" },
    ],
    "creation-entreprise": [
        { id: "immatriculation-rccm", label: "data_objectives.immatriculation-rccm.label" },
        { id: "numero-nif", label: "data_objectives.numero-nif.label" },
        { id: "numero-inss", label: "data_objectives.numero-inss.label" },
    ],
    "import-export": [
        { id: "licence-importation", label: "data_objectives.licence-importation.label" },
        { id: "certificat-conformite-import", label: "data_objectives.certificat-conformite-import.label" },
        { id: "regime-douanier", label: "data_objectives.regime-douanier.label" },
    ],
    sante: [
        { id: "pharmacie-autorisation", label: "data_objectives.pharmacie-autorisation.label" },
        { id: "clinique-agrement", label: "data_objectives.clinique-agrement.label" },
    ],
    mines: [
        { id: "permis-recherche-miniere", label: "data_objectives.permis-recherche-miniere.label" },
        { id: "droits-exploitation", label: "data_objectives.droits-exploitation.label" },
        { id: "conformite-code-minier", label: "data_objectives.conformite-code-minier.label" },
    ],
    transport: [
        { id: "immatriculation-flotte", label: "data_sectors.transport.name" },
        { id: "permis-professionnel", label: "evaluation.step1.city_label" },
    ],
    telecoms: [
        { id: "agrement-arptc", label: "data_sectors.telecoms.name" },
        { id: "frequence-radio", label: "data_sectors.telecoms.desc" },
    ],
    education: [
        { id: "agrement-epst", label: "data_sectors.education.name" },
        { id: "ouverture-ecole", label: "data_sectors.education.desc" },
    ],
    agriculture: [
        { id: "concession-agricole", label: "data_sectors.agriculture.name" },
        { id: "certificat-phytosanitaire", label: "data_sectors.agriculture.desc" },
    ],
    securite: [
        { id: "agrement-gardiennage", label: "data_sectors.securite.name" },
        { id: "port-armes", label: "data_sectors.securite.desc" },
    ],
    finance: [
        { id: "agrement-bcc", label: "data_sectors.finance.name" },
        { id: "agrement-arca", label: "data_sectors.finance.desc" },
    ],
};

const DEFAULT_OBJECTIVES = [
    { id: "audit-conformite", label: "Audit de conformité" },
    { id: "mise-conformite-generale", label: "Mise en conformité" },
    { id: "extension-activite", label: "Extension d'activité" },
];

const SECTOR_DOCUMENTS: Record<string, { id: string; label: string }[]> = {
    btp: [
        { id: "agrement-btp", label: "Agrément BTP" },
        { id: "plan-architecte", label: "Plans architecte agréé" },
        { id: "garantie-bancaire", label: "Garantie bancaire" },
        { id: "attestation-execution", label: "Bonne exécution" },
    ],
    "marches-publics": [
        { id: "rccm-recent", label: "RCCM récent" },
        { id: "bilans-certifies", label: "Bilans certifiés (3 ans)" },
        { id: "caution-soumission", label: "Caution bancaire" },
        { id: "offre-technique", label: "Offre technique" },
    ],
};

const DEFAULT_DOCUMENTS = [
    { id: "statuts", label: "Statuts notariés" },
    { id: "bail-locaux", label: "Bail du siège social" },
    { id: "assurance", label: "Assurance professionnelle" },
    { id: "reglement-interieur", label: "Règlement intérieur" },
];

// ─── STYLES  ──────────────────────────────────────────────────────────────────

const selectSt: React.CSSProperties = {
    width: "100%",
    padding: "13px 14px",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
    color: "var(--white)",
    background: "var(--bg-card)",
    appearance: "none",
    WebkitAppearance: "none",
};

const inputSt: React.CSSProperties = {
    width: "100%",
    padding: "13px 14px",
    border: "1px solid var(--border)",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    fontFamily: "inherit",
    color: "var(--white)",
    background: "var(--bg-card)",
};

const labelSt: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "var(--text-secondary)",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
};

// ─── CHIP BUTTON ──────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                padding: "11px 14px",
                border: `1px solid ${active ? "rgba(16,185,129,0.5)" : "var(--border)"}`,
                borderRadius: "10px",
                background: active ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.03)",
                color: active ? "var(--green-900)" : "var(--text-secondary)",
                fontWeight: active ? 600 : 400,
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "center",
                transition: "all 0.15s ease",
                minHeight: "44px",
            }}
        >
            {label}
        </button>
    );
}

// ─── TOGGLE ROW ───────────────────────────────────────────────────────────────
function ToggleRow({ label, desc, checked, onClick }: { label: string; desc: string; checked: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                border: `1px solid ${checked ? "rgba(16,185,129,0.4)" : "var(--border)"}`,
                borderRadius: "10px",
                background: checked ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.02)",
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                transition: "all 0.15s ease",
                width: "100%",
                minHeight: "52px",
            }}
        >
            <div style={{
                width: "20px", height: "20px", borderRadius: "50%",
                border: `2px solid ${checked ? "var(--green-900)" : "var(--border)"}`,
                background: checked ? "var(--green-900)" : "transparent",
                flexShrink: 0, transition: "all 0.15s ease",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                {checked && (
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7l2.5 3 6-7" stroke="var(--bg-main)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
            <div style={{ flex: 1 }}>
                <p style={{ fontWeight: checked ? 600 : 400, color: checked ? "var(--white)" : "var(--text-secondary)", fontSize: "14px", margin: 0 }}>
                    {label}
                </p>
                {desc && <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, marginTop: "2px" }}>{desc}</p>}
            </div>
        </button>
    );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: { step: number; total: number }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <div style={{ flex: 1, height: "3px", background: "rgba(255,255,255,0.1)", borderRadius: "100px", overflow: "hidden" }}>
                <div style={{
                    height: "100%", background: "var(--green-900)", borderRadius: "100px",
                    width: `${((step) / total) * 100}%`, transition: "width 0.4s ease",
                }} />
            </div>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", flexShrink: 0, fontWeight: 500 }}>
                {step}/{total}
            </span>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MobileDiagnosticForm() {
    const router = useRouter();
    const { t } = useTranslation();

    // Total screens including sub-steps
    // Screen 0: Sector + City
    // Screen 1: Company type + Employee count
    // Screen 2: Situation actuelle (base docs)
    // Screen 3: Objectives
    // Screen 4: Documents
    // Screen 5: Contact info
    const TOTAL_SCREENS = 6;

    const [screen, setScreen] = useState(0);
    const [form, setForm] = useState<DiagnosticData>(EMPTY_FORM);
    const [submitting, setSubmitting] = useState(false);

    const isCreation = form.sector === "creation-entreprise";

    const update = (patch: Partial<DiagnosticData>) =>
        setForm((prev) => ({ ...prev, ...patch }));

    const canNext = (): boolean => {
        if (screen === 0) return !!form.sector && !!form.city;
        if (screen === 5) return !!form.contactName && !!form.contactPhone;
        return true;
    };

    const handleNext = () => {
        if (screen === 1 && isCreation) {
            setScreen(3); // Skip Situation (2)
        } else if (screen === 3 && isCreation) {
            setScreen(5); // Skip Sector docs (4)
        } else if (screen < TOTAL_SCREENS - 1) {
            setScreen((s) => s + 1);
        }
    };

    const handleBack = () => {
        if (screen === 5 && isCreation) {
            setScreen(3);
        } else if (screen === 3 && isCreation) {
            setScreen(1);
        } else if (screen > 0) {
            setScreen((s) => s - 1);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const result = calculateScore(form);
            sessionStorage.setItem("agrea_diagnostic", JSON.stringify({ form, result }));
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
            }).catch(() => { });
            router.push("/mon-rapport");
        } catch {
            setSubmitting(false);
        }
    };

    const objectives = OBJECTIVES_BY_SECTOR[form.sector] ?? DEFAULT_OBJECTIVES;
    const documents = SECTOR_DOCUMENTS[form.sector] ?? DEFAULT_DOCUMENTS;

    // ── SCREEN DEFINITIONS ──
    const SCREEN_TITLES = [
        t("mobile.diagnostic.screen_sectors") || "Votre entreprise",
        t("mobile.diagnostic.screen_size") || "Structure & taille",
        t("mobile.diagnostic.screen_situation") || "Situation actuelle",
        t("mobile.diagnostic.screen_objectives") || "Vos objectifs",
        t("mobile.diagnostic.screen_documents") || "Vos documents",
        t("mobile.diagnostic.screen_contact") || "Contact",
    ];

    // ── LAYOUT ────────────────────────────────────────────────────────────────
    
    // Calculate dynamic progress values
    const totalVisibleScreens = isCreation ? 4 : TOTAL_SCREENS;
    let currentStepNum = screen + 1;
    if (isCreation) {
        if (screen === 0) currentStepNum = 1;
        else if (screen === 1) currentStepNum = 2;
        else if (screen === 3) currentStepNum = 3;
        else if (screen === 5) currentStepNum = 4;
    }

    return (
        <div style={{
            width: "100%",
            height: "100dvh", // Use dynamic viewport height for mobile
            display: "flex",
            flexDirection: "column",
            padding: "0",
            overflow: "hidden",
            position: "fixed", // Ensure it stays locked
            top: 0,
            left: 0,
            zIndex: 100,
            background: "var(--bg-main)"
        }}>
            {/* TOP BAR */}
            <div style={{
                padding: "16px 24px 0",
                flexShrink: 0,
            }}>
                {/* Progress */}
                <ProgressBar step={currentStepNum} total={totalVisibleScreens} />

                {/* Title row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px", marginBottom: "4px" }}>
                    <div>
                        <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--green-900)", fontWeight: 600, margin: 0 }}>
                            {t("mobile.diagnostic.step") || "Étape"} {currentStepNum} / {totalVisibleScreens}
                        </p>
                        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.02em", margin: "4px 0 0" }}>
                            {SCREEN_TITLES[screen]}
                        </h2>
                    </div>
                </div>
            </div>

            {/* CONTENT — flex-grow, overflow hidden (no scroll) */}
            <div style={{
                flex: 1,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                overflow: "hidden",
                minHeight: 0,
            }}>

                {/* ── SCREEN 0: Secteur + Ville ── */}
                {screen === 0 && (
                    <FadeUp>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div>
                                <label style={labelSt}>{t("evaluation.step1.sector_label") || "Votre secteur"} <span style={{ color: "var(--green-900)" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <select value={form.sector} onChange={(e) => update({ sector: e.target.value })} style={selectSt}>
                                        <option value="">{t("mobile.diagnostic.choose_sector") || "Choisissez un secteur…"}</option>
                                        {sectors.map((s) => <option key={s.id} value={s.id}>{t(s.name)}</option>)}
                                    </select>
                                    <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)", fontSize: "12px" }}>▼</div>
                                </div>
                            </div>
                            <div>
                                <label style={labelSt}>{t("evaluation.step1.city_label") || "Ville de domiciliation"} <span style={{ color: "var(--green-900)" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <select value={form.city} onChange={(e) => update({ city: e.target.value })} style={selectSt}>
                                        <option value="">{t("mobile.diagnostic.choose_city") || "Choisissez une ville…"}</option>
                                        {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)", fontSize: "12px" }}>▼</div>
                                </div>
                            </div>
                            {(!form.sector || !form.city) && (
                                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
                                    {t("mobile.diagnostic.mandatory_fields") || "Ces deux champs sont obligatoires pour personnaliser votre diagnostic."}
                                </p>
                            )}
                        </div>
                    </FadeUp>
                )}

                {/* ── SCREEN 1: Type + Taille ── */}
                {screen === 1 && (
                    <FadeUp>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div>
                                <label style={labelSt}>{t("mobile.diagnostic.type_structure") || "Type de structure"}</label>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                                    {COMPANY_TYPES.map((ct) => (
                                        <Chip key={ct.value} label={ct.label} active={form.companyType === ct.value} onClick={() => update({ companyType: ct.value as DiagnosticData["companyType"] })} />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label style={labelSt}>{t("mobile.diagnostic.employee_count") || "Nombre d'employés"}</label>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "6px" }}>
                                    {EMPLOYEE_COUNTS.map((ec) => (
                                        <Chip key={ec.value} label={ec.label} active={form.employeeCount === ec.value} onClick={() => update({ employeeCount: ec.value as DiagnosticData["employeeCount"] })} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeUp>
                )}

                {/* ── SCREEN 2: Situation actuelle ── */}
                {screen === 2 && (
                    <FadeUp>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
                                {t("mobile.diagnostic.check_docs_owned") || "Cochez les documents que vous possédez déjà."}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {BASE_DOCS.map((doc) => (
                                    <ToggleRow
                                        key={doc.id}
                                        label={doc.label}
                                        desc={doc.desc}
                                        checked={form[doc.id as BoolField]}
                                        onClick={() => update({ [doc.id]: !form[doc.id as BoolField] })}
                                    />
                                ))}
                            </div>
                        </div>
                    </FadeUp>
                )}

                {/* ── SCREEN 3: Objectifs ── */}
                {screen === 3 && (
                    <FadeUp>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
                                {t("mobile.diagnostic.select_objectives") || "Sélectionnez vos objectifs de conformité."}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {objectives.map((obj) => {
                                    const selected = form.objectives.includes(obj.id);
                                    return (
                                        <ToggleRow
                                            key={obj.id}
                                            label={obj.label}
                                            desc=""
                                            checked={selected}
                                            onClick={() => {
                                                const current = form.objectives;
                                                const updated = current.includes(obj.id)
                                                    ? current.filter((o) => o !== obj.id)
                                                    : [...current, obj.id];
                                                update({ objectives: updated });
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </FadeUp>
                )}

                {/* ── SCREEN 4: Documents ── */}
                {screen === 4 && (
                    <FadeUp>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0 }}>
                                {t("mobile.diagnostic.docs_already_obtained") || "Documents déjà obtenus pour votre secteur."}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {documents.map((doc) => {
                                    const checked = form.documentsObtained.includes(doc.id);
                                    return (
                                        <ToggleRow
                                            key={doc.id}
                                            label={doc.label}
                                            desc=""
                                            checked={checked}
                                            onClick={() => {
                                                const current = form.documentsObtained;
                                                const updated = current.includes(doc.id)
                                                    ? current.filter((d) => d !== doc.id)
                                                    : [...current, doc.id];
                                                update({ documentsObtained: updated });
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </FadeUp>
                )}

                {/* ── SCREEN 5: Contact ── */}
                {screen === 5 && (
                    <FadeUp>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div style={{
                                padding: "12px 16px",
                                background: "rgba(16,185,129,0.05)",
                                border: "1px solid rgba(16,185,129,0.2)",
                                borderRadius: "10px",
                            }}>
                                <p style={{ fontSize: "13px", color: "var(--green-900)", fontWeight: 600, margin: "0 0 4px" }}>
                                    {t("mobile.diagnostic.almost_done") || "Presque terminé !"}
                                </p>
                                <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, lineHeight: "1.5" }}>
                                    {t("mobile.diagnostic.receive_report") || "Recevez votre rapport personnalisé sur WhatsApp dans les 24h."}
                                </p>
                            </div>
                            <div>
                                <label style={labelSt}>Prénom / Nom <span style={{ color: "var(--green-900)" }}>*</span></label>
                                <input
                                    type="text"
                                    value={form.contactName}
                                    onChange={(e) => update({ contactName: e.target.value })}
                                    placeholder="Jean Mbeki"
                                    style={inputSt}
                                    onFocus={(e) => { e.target.style.borderColor = "var(--green-900)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                                />
                            </div>
                            <div>
                                <label style={labelSt}>Numéro WhatsApp <span style={{ color: "var(--green-900)" }}>*</span></label>
                                <PhoneInput
                                    value={form.contactPhone}
                                    onChange={(val) => update({ contactPhone: val })}
                                    placeholder="Votre numéro WhatsApp"
                                    required
                                />
                            </div>
                            <div>
                                <label style={labelSt}>Email <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 400 }}>(optionnel)</span></label>
                                <input
                                    type="email"
                                    value={form.contactEmail ?? ""}
                                    onChange={(e) => update({ contactEmail: e.target.value })}
                                    placeholder="votre@email.com"
                                    style={inputSt}
                                    onFocus={(e) => { e.target.style.borderColor = "var(--green-900)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = "var(--border)"; }}
                                />
                            </div>
                        </div>
                    </FadeUp>
                )}
            </div>

            {/* BOTTOM NAVIGATION — fixed at bottom */}
            <div style={{
                padding: "16px 24px max(16px, env(safe-area-inset-bottom)) 24px",
                borderTop: "1px solid var(--border)",
                background: "var(--bg-main)",
                flexShrink: 0,
                display: "flex",
                gap: "12px",
            }}>
                {screen > 0 && (
                    <button
                        onClick={handleBack}
                        style={{
                            display: "flex", alignItems: "center", justifyContent: "center",
                            gap: "6px", padding: "0 20px",
                            border: "1px solid var(--border)", borderRadius: "10px",
                            background: "transparent", color: "var(--text-secondary)",
                            fontSize: "14px", fontWeight: 500, cursor: "pointer",
                            minHeight: "52px", fontFamily: "inherit",
                            flexShrink: 0,
                        }}
                    >
                        <ArrowLeft size={16} /> {t("mobile.diagnostic.back") || "Retour"}
                    </button>
                )}

                {screen < TOTAL_SCREENS - 1 ? (
                    <button
                        onClick={handleNext}
                        disabled={!canNext()}
                        style={{
                            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                            gap: "8px", minHeight: "52px",
                            borderRadius: "10px", border: "none",
                            background: canNext() ? "var(--green-900)" : "rgba(255,255,255,0.05)",
                            color: canNext() ? "#000" : "var(--text-muted)",
                            fontSize: "15px", fontWeight: 700, cursor: canNext() ? "pointer" : "not-allowed",
                            fontFamily: "inherit", transition: "all 0.2s ease",
                        }}
                    >
                        {t("mobile.diagnostic.continue") || "Continuer"} <ArrowRight size={18} />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={!canNext() || submitting}
                        style={{
                            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                            gap: "8px", minHeight: "52px",
                            borderRadius: "10px", border: "none",
                            background: canNext() && !submitting ? "var(--green-900)" : "rgba(255,255,255,0.05)",
                            color: canNext() && !submitting ? "#000" : "var(--text-muted)",
                            fontSize: "15px", fontWeight: 700, cursor: "pointer",
                            fontFamily: "inherit",
                        }}
                    >
                        <CheckCircle size={18} />
                        {submitting ? (t("mobile.diagnostic.generating") || "Génération…") : (t("mobile.diagnostic.get_report") || "Obtenir mon rapport")}
                    </button>
                )}
            </div>
        </div>
    );
}
