"use client";

import { useState, useRef, useEffect } from "react";

// Dictionnaire des acronymes et abréviations courants en RDC
const ACRONYMS: Record<string, string> = {
    RCCM: "Registre du Commerce et du Crédit Mobilier — registre officiel d'immatriculation des sociétés en RDC.",
    NIF: "Numéro d'Identification Fiscale — identifiant unique attribué par la Direction Générale des Impôts (DGI).",
    INSS: "Institut National de Sécurité Sociale — organisme qui gère les cotisations sociales des travailleurs.",
    CNSS: "Caisse Nationale de Sécurité Sociale — nom alternatif utilisé pour l'organisme de protection sociale.",
    DGI: "Direction Générale des Impôts — administration fiscale principale de la RDC.",
    DGRAD: "Direction Générale des Recettes Administratives, domaniales, judiciaires et de participations.",
    DGDA: "Direction Générale des Douanes et Accises — régit les importations/exportations.",
    ARMP: "Autorité de Régulation des Marchés Publics — régulateur indépendant des marchés publics.",
    DGCMP: "Direction Générale du Contrôle des Marchés Publics — superviseur des procédures d'attribution.",
    GUCE: "Guichet Unique de Création d'Entreprise — point unique d'immatriculation des sociétés à Kinshasa.",
    ITP: "Infrastructures et Travaux Publics — ministère de tutelle du secteur BTP.",
    OCC: "Office Congolais de Contrôle — organisme chargé de l'inspection et de la certification de marchandises.",
    BCC: "Banque Centrale du Congo — autorité de régulation monétaire et bancaire.",
    ARCA: "Autorité de Régulation et de Contrôle des Assurances — régulateur du secteur assurance.",
    ARPTC: "Autorité de Régulation de la Poste et des Télécommunications du Congo.",
    ACE: "Agence Congolaise de l'Environnement — délivre les études d'impact environnemental.",
    AMM: "Autorisation de Mise sur le Marché — autorisation obligatoire pour commercialiser un médicament.",
    SEGUCE: "Société d'Exploitation du Guichet Unique pour le Commerce Extérieur.",
    SARL: "Société à Responsabilité Limitée — forme juridique la plus commune pour les PME.",
    SA: "Société Anonyme — forme juridique pour les grandes entreprises avec capital social ouvert.",
    OHADA: "Organisation pour l'Harmonisation en Afrique du Droit des Affaires — cadre juridique régional commun.",
    TVA: "Taxe sur la Valeur Ajoutée — impôt indirect sur la consommation (taux standard : 16% en RDC).",
    CNP: "Comité National de Production — organisme gouvernemental de supervision économique.",
    DAO: "Dossier d'Appel d'Offres — ensemble des documents qu'un soumissionnaire doit fournir.",
};

interface Props {
    text: string;
    className?: string;
    placement?: "top" | "bottom";
}

/**
 * AcronymTooltip — Détecte automatiquement les acronymes connus dans un texte et affiche
 * une info-bulle premium au survol (ou au clic sur mobile).
 */
export function AcronymTooltip({ text, className, placement = "top" }: Props) {
    // Découpe le texte en tokens (mots et non-mots) et enrichit les acronymes reconnus
    const tokens = text.split(/(\b[A-Z]{2,6}\b)/g);

    return (
        <span className={className}>
            {tokens.map((token, i) => {
                const definition = ACRONYMS[token];
                if (!definition) return <span key={i}>{token}</span>;
                return <AcronymWord key={i} word={token} definition={definition} placement={placement} />;
            })}
        </span>
    );
}

function AcronymWord({ word, definition, placement = "top" }: { word: string; definition: string; placement?: "top" | "bottom" }) {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const show = () => {
        clearTimeout(timerRef.current);
        setVisible(true);
    };

    const hide = () => {
        timerRef.current = setTimeout(() => setVisible(false), 120);
    };

    // Fermer si clic en dehors
    useEffect(() => {
        if (!visible) return;
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setVisible(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [visible]);

    return (
        <span
            ref={ref}
            style={{ position: "relative", display: "inline-block" }}
            onMouseEnter={show}
            onMouseLeave={hide}
            onClick={() => setVisible((v) => !v)}
        >
            {/* Le mot acronyme avec soulignement pointillé */}
            <span
                style={{
                    cursor: "help",
                    borderBottom: "1.5px dashed rgba(16,185,129,0.6)",
                    color: "var(--green-900)",
                    fontWeight: 600,
                    transition: "border-color 0.2s",
                }}
            >
                {word}
            </span>

            {/* Tooltip */}
            {visible && (
                <span
                    role="tooltip"
                    style={{
                        position: "absolute",
                        ...(placement === "top"
                            ? { bottom: "calc(100% + 8px)" }
                            : { top: "calc(100% + 8px)" }
                        ),
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1000,
                        background: "var(--bg-main)",
                        border: "1px solid rgba(16,185,129,0.25)",
                        borderRadius: "10px",
                        padding: "10px 14px",
                        width: "220px",
                        maxWidth: "80vw",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                        pointerEvents: "none",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    {/* Triangle pointer */}
                    <span
                        style={{
                            position: "absolute",
                            ...(placement === "top"
                                ? { top: "100%", borderTop: "6px solid rgba(16,185,129,0.25)", borderBottom: "none" }
                                : { bottom: "100%", borderBottom: "6px solid rgba(16,185,129,0.25)", borderTop: "none" }
                            ),
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 0, height: 0,
                            borderLeft: "6px solid transparent",
                            borderRight: "6px solid transparent",
                        }}
                    />
                    <span
                        style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "var(--green-900)",
                            display: "block",
                            marginBottom: "4px",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                        }}
                    >
                        {word}
                    </span>
                    <span
                        style={{
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                            lineHeight: "1.5",
                            display: "block",
                        }}
                    >
                        {definition}
                    </span>
                </span>
            )}
        </span>
    );
}

export default AcronymTooltip;
