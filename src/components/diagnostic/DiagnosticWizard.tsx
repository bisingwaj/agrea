"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, Check, AlertCircle } from "lucide-react";

interface DiagnosticWizardProps {
    sector: any;
    procedures: any[];
}

export default function DiagnosticWizard({ sector, procedures }: DiagnosticWizardProps) {
    const [currentStep, setCurrentStep] = useState(1);

    // Formulaire data
    const [formData, setFormData] = useState({
        companyType: "",
        city: "",
        selectedProcedures: [] as string[],
        objectives: [] as string[]
    });

    const totalSteps = 4; // 1: Identification, 2: Situation actuelle (vs Excel), 3: Objectifs, 4: Scoring/Loading -> Redirect

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(c => c + 1);
        } else {
            // Finir le diag -> redirection vers mon-rapport
            // window.location.href = "/mon-rapport"; // Simulation
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

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            overflow: "hidden", // Zéro scroll garanti sur le master container
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-main)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999 // Pour masquer le header et footer globaux sur cette vue
        }}>
            {/* Header du Wizard */}
            <div style={{
                height: "72px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 32px",
                flexShrink: 0
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <Link href={`/${sector.id}`} style={{ color: "var(--text-muted)", cursor: "pointer", display: "flex", alignItems: "center" }}>
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <span style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px" }}>Diagnostic de conformité</span>
                        <div style={{ fontSize: "15px", fontWeight: 500, color: "var(--white)" }}>Secteur {sector.name}</div>
                    </div>
                </div>

                {/* Barre de progression modulaire */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {[1, 2, 3, 4].map(step => (
                        <div key={step} style={{
                            width: "48px",
                            height: "4px",
                            borderRadius: "2px",
                            background: step <= currentStep ? "var(--green-900)" : "var(--bg-card)",
                            border: step > currentStep ? "1px solid var(--border)" : "none",
                            transition: "all 0.3s ease"
                        }} />
                    ))}
                </div>
                <div style={{ width: "100px" }}>{/* Spacer pour équilibrer le header */}</div>
            </div>

            {/* Contenu principal de l'étape (défilement interne autorisé uniquement ici) */}
            <div style={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "48px 24px"
            }}>
                <div style={{ maxWidth: "600px", width: "100%", margin: "0 auto", paddingBottom: "100px" }}>

                    {/* ETAPE 1 : Identification */}
                    {currentStep === 1 && (
                        <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
                            <h2 style={{ fontSize: "32px", fontWeight: 600, color: "var(--white)", marginBottom: "16px" }}>Identification de l'entreprise</h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "48px" }}>
                                Aidez-nous à personnaliser vos obligations réglementaires.
                            </p>

                            <div style={{ marginBottom: "32px" }}>
                                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-muted)", marginBottom: "12px" }}>Forme juridique de l'entreprise</label>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                                    {["SARL / SARLU", "Société Anonyme (SA)", "Établissement (Personne Physique)", "Succursale (Entreprise Étrangère)"].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setFormData({ ...formData, companyType: type })}
                                            style={{
                                                padding: "16px",
                                                borderRadius: "12px",
                                                border: formData.companyType === type ? "1px solid var(--green-900)" : "1px solid var(--border)",
                                                background: formData.companyType === type ? "rgba(16, 185, 129, 0.05)" : "var(--bg-card)",
                                                color: formData.companyType === type ? "var(--green-900)" : "var(--white)",
                                                textAlign: "left",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label style={{ display: "block", fontSize: "14px", fontWeight: 500, color: "var(--text-muted)", marginBottom: "12px" }}>Dans quelle province opérez-vous principalement ?</label>
                                <select
                                    value={formData.city}
                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                    style={{
                                        width: "100%",
                                        padding: "16px",
                                        borderRadius: "12px",
                                        border: "1px solid var(--border)",
                                        background: "var(--bg-card)",
                                        color: "var(--white)",
                                        fontSize: "16px",
                                        outline: "none"
                                    }}
                                >
                                    <option value="" disabled>Sélectionnez une province</option>
                                    {[
                                        "Bas-Uele", "Équateur", "Haut-Katanga", "Haut-Lomami", "Haut-Uele", "Ituri",
                                        "Kasaï", "Kasaï-Central", "Kasaï-Oriental", "Kinshasa", "Kongo-Central", "Kwango",
                                        "Kwilu", "Lomami", "Lualaba", "Mai-Ndombe", "Maniema", "Mongala", "Nord-Kivu",
                                        "Nord-Ubangi", "Sankuru", "Sud-Kivu", "Sud-Ubangi", "Tanganyika", "Tshopo", "Tshuapa"
                                    ].map(prov => (
                                        <option key={prov} value={prov}>{prov}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* ETAPE 2 : Situation - Checklist intelligente */}
                    {currentStep === 2 && (() => {
                        const isProvincial = (proc: any) => {
                            const org = (proc["ORGANISME COMPÉTENT"] || "").toLowerCase();
                            return org.includes("provincial") || org.includes("province") || org.includes("gouvernorat") || org.includes("mairie") || org.includes("commune") || org.includes("ville") || org.includes("direction g\u00e9n\u00e9rale des imp\u00f4ts");
                        };

                        const proceduresToDisplay = procedures.slice(0, 10);
                        const nationalProcedures = proceduresToDisplay.filter(p => !isProvincial(p));
                        const provincialProcedures = proceduresToDisplay.filter(p => isProvincial(p));

                        const renderProcedure = (proc: any, key: string) => {
                            const procName = proc["PROCÉDURE / DOCUMENT"];
                            const isSelected = formData.selectedProcedures.includes(procName);
                            return (
                                <div
                                    key={key}
                                    onClick={() => toggleProcedure(procName)}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "16px 20px",
                                        background: isSelected ? "rgba(16, 185, 129, 0.05)" : "var(--bg-card)",
                                        border: isSelected ? "1px solid var(--green-900)" : "1px solid var(--border)",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                        transition: "all 0.2s"
                                    }}
                                >
                                    <div style={{
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "6px",
                                        border: isSelected ? "none" : "1px solid var(--text-muted)",
                                        background: isSelected ? "var(--green-900)" : "transparent",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginRight: "20px",
                                        flexShrink: 0
                                    }}>
                                        {isSelected && <Check size={18} color="white" strokeWidth={3} />}
                                    </div>
                                    <div>
                                        <p style={{ margin: 0, fontSize: "15px", fontWeight: 500, color: isSelected ? "var(--white)" : "var(--text-secondary)" }}>
                                            {procName}
                                        </p>
                                        {proc["ORGANISME COMPÉTENT"] && (
                                            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "var(--text-muted)" }}>
                                                Délivré par : {proc["ORGANISME COMPÉTENT"]}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        };

                        return (
                            <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--green-900)", marginBottom: "16px" }}>
                                    <AlertCircle size={20} />
                                    <span style={{ fontSize: "14px", fontWeight: 500 }}>Basé sur l'analyse de {proceduresToDisplay.length} procédures</span>
                                </div>
                                <h2 style={{ fontSize: "32px", fontWeight: 600, color: "var(--white)", marginBottom: "16px" }}>Sélectionnez vos documents actuels</h2>
                                <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "48px" }}>
                                    Parmi cette sélection de documents obligatoires dans votre secteur, lesquels avez-vous <strong>déjà obtenus et qui sont encore valides</strong> ?
                                </p>

                                <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                                    {nationalProcedures.length > 0 && (
                                        <div>
                                            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>Niveau National</h3>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                                {nationalProcedures.slice(0, 6).map((proc, idx) => renderProcedure(proc, `nat-${idx}`))}
                                            </div>
                                        </div>
                                    )}

                                    {provincialProcedures.length > 0 && (
                                        <div>
                                            <h3 style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "1px solid var(--border)", paddingBottom: "8px" }}>Niveau Provincial / Local</h3>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                                                {provincialProcedures.slice(0, 4).map((proc, idx) => renderProcedure(proc, `prov-${idx}`))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })()}

                    {/* ETAPE 3 : Objectifs */}
                    {currentStep === 3 && (
                        <div style={{ animation: "fadeIn 0.3s ease-in-out" }}>
                            <h2 style={{ fontSize: "32px", fontWeight: 600, color: "var(--white)", marginBottom: "16px" }}>Vos objectifs à court terme</h2>
                            <p style={{ color: "var(--text-secondary)", fontSize: "16px", marginBottom: "48px" }}>
                                Quelle est la raison principale de ce diagnostic de conformité ? (Plusieurs choix possibles)
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {(sector.objectives || []).map((obj: string) => {
                                    const isSelected = formData.objectives.includes(obj);
                                    return (
                                        <div
                                            key={obj}
                                            onClick={() => toggleObjective(obj)}
                                            style={{
                                                padding: "16px 20px",
                                                borderRadius: "12px",
                                                border: isSelected ? "1px solid var(--green-900)" : "1px solid var(--border)",
                                                background: isSelected ? "rgba(16, 185, 129, 0.05)" : "var(--bg-card)",
                                                color: isSelected ? "var(--green-900)" : "var(--white)",
                                                cursor: "pointer",
                                                fontSize: "15px",
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    borderRadius: "50%",
                                                    border: isSelected ? "none" : "1px solid var(--text-muted)",
                                                    background: isSelected ? "var(--green-900)" : "transparent",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    marginRight: "16px",
                                                    flexShrink: 0
                                                }}>
                                                    {isSelected && <Check size={12} color="white" strokeWidth={3} />}
                                                </div>
                                                {obj}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ETAPE 4 : Calcul (Simulation du loader premium) */}
                    {currentStep === 4 && (
                        <LoadingAnimation sectorName={sector.name} />
                    )}

                </div>
            </div>

            {/* Footer fixe avec boutons de navigation (sauf étape 4) */}
            {currentStep < 4 && (
                <div style={{
                    height: "96px",
                    borderTop: "1px solid var(--border)",
                    background: "var(--bg-main)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 32px",
                    flexShrink: 0
                }}>
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "14px 24px",
                            borderRadius: "8px",
                            background: "transparent",
                            color: currentStep === 1 ? "var(--text-muted)" : "var(--white)",
                            border: "none",
                            cursor: currentStep === 1 ? "not-allowed" : "pointer",
                            fontSize: "15px",
                            fontWeight: 500
                        }}
                    >
                        <ChevronLeft size={18} /> Précédent
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={(currentStep === 1 && !formData.companyType) || (currentStep === 1 && !formData.city)}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "14px 32px",
                            borderRadius: "8px",
                            background: ((currentStep === 1 && !formData.companyType) || (currentStep === 1 && !formData.city)) ? "var(--border)" : "var(--white)",
                            color: ((currentStep === 1 && !formData.companyType) || (currentStep === 1 && !formData.city)) ? "var(--text-muted)" : "#000",
                            border: "none",
                            cursor: ((currentStep === 1 && !formData.companyType) || (currentStep === 1 && !formData.city)) ? "not-allowed" : "pointer",
                            fontSize: "15px",
                            fontWeight: 500,
                            transition: "all 0.2s"
                        }}
                    >
                        {currentStep === 3 ? "Générer mon rapport" : "Suivant"} <ArrowRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}

// Composant interne pour l'animation premium de génération
const LoadingAnimation = ({ sectorName }: { sectorName: string }) => {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState("Analyse de vos données...");

    useEffect(() => {
        const t1 = setTimeout(() => { setProgress(35); setText(`Croisement réglementaire (${sectorName})...`); }, 1500);
        const t2 = setTimeout(() => { setProgress(75); setText("Évaluation des délais et coûts..."); }, 3000);
        const t3 = setTimeout(() => { setProgress(100); setText("Diagnostic finalisé !"); }, 4500);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [sectorName]);

    return (
        <div style={{ animation: "fadeIn 0.5s ease-in-out", textAlign: "center", paddingTop: "40px", maxWidth: "480px", margin: "0 auto" }}>
            <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto 40px auto" }}>
                <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--bg-card)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--green-900)" strokeWidth="8"
                        strokeDasharray="283" strokeDashoffset={283 - (283 * progress) / 100}
                        style={{ transition: "stroke-dashoffset 0.5s ease" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: 700, color: "var(--white)" }}>
                    {progress}%
                </div>
            </div>

            <h3 style={{ fontSize: "20px", fontWeight: 500, color: "var(--white)", marginBottom: "16px", minHeight: "24px" }}>
                {text}
            </h3>

            <div style={{ width: "100%", height: "4px", background: "var(--bg-card)", borderRadius: "2px", overflow: "hidden" }}>
                <div style={{ width: `${progress}%`, height: "100%", background: "var(--green-900)", transition: "width 0.5s ease" }} />
            </div>

            {progress === 100 && (
                <div style={{ marginTop: "48px", animation: "slideUp 0.3s ease-out" }}>
                    <Link
                        href="/mon-rapport"
                        className="diagnostic-btn"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "16px 32px",
                            fontSize: "16px",
                            fontWeight: 600,
                            borderRadius: "8px",
                            background: "var(--white)",
                            color: "#000",
                            textDecoration: "none",
                            boxShadow: "0 0 30px rgba(16,185,129,0.3)"
                        }}
                    >
                        Accéder à mon Rapport Interactif <ArrowRight size={18} />
                    </Link>
                </div>
            )}
            <style>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};
