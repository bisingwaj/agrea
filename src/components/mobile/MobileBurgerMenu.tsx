"use client";

import Link from "next/link";
import { X, ChevronRight, ClipboardCheck, Globe } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useEffect } from "react";

interface MobileBurgerMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function MobileBurgerMenu({ isOpen, onClose }: MobileBurgerMenuProps) {
    const { t, lang, setLang } = useTranslation();

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const navLinks = [
        { href: "/", label: "Accueil" },
        { href: "/guides", label: t("nav.guides") || "Guides Sectoriels" },
        { href: "/veille", label: t("nav.veille") || "Veille Réglementaire" },
        { href: "/analyses", label: t("nav.analyses") || "Analyses" },
        { href: "/a-propos", label: t("nav.about") || "À propos" },
        { href: "/contact", label: t("nav.contact") || "Être rappelé" },
    ];

    const quickSectors = [
        { href: "/btp", label: "BTP & Construction" },
        { href: "/marches-publics", label: "Marchés Publics" },
        { href: "/creation-entreprise", label: "Création d'Entreprise" },
    ];

    return (
        <>
            {/* Backdrop with blur */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0, 0, 0, 0.6)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    zIndex: 250,
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                    transition: "opacity 0.3s ease",
                }}
                aria-hidden="true"
            />

            {/* Slide-in panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Menu de navigation"
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: "min(320px, 90vw)",
                    background: "#080808",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    zIndex: 300,
                    transform: isOpen ? "translateX(0)" : "translateX(105%)",
                    transition: "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 24px",
                    height: "56px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    flexShrink: 0,
                }}>
                    <span style={{
                        color: "var(--white)",
                        fontWeight: 600,
                        fontSize: "18px",
                        letterSpacing: "-0.04em",
                    }}>
                        agréa.
                    </span>
                    <button
                        onClick={onClose}
                        aria-label="Fermer le menu"
                        style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "none",
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            color: "var(--text-secondary)",
                            transition: "background 0.2s",
                        }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Scrollable content */}
                <div style={{ flexGrow: 1, overflowY: "auto", padding: "8px 12px" }}>

                    {/* Main nav links */}
                    <nav aria-label="Navigation principale">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "0 16px",
                                    height: "56px",
                                    borderRadius: "10px",
                                    fontSize: "15px",
                                    fontWeight: 500,
                                    color: "var(--text-secondary)",
                                    textDecoration: "none",
                                    transition: "background 0.15s, color 0.15s",
                                    WebkitTapHighlightColor: "transparent",
                                }}
                                onTouchStart={(e) => {
                                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                                    e.currentTarget.style.color = "var(--white)";
                                }}
                                onTouchEnd={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = "var(--text-secondary)";
                                }}
                            >
                                <span>{link.label}</span>
                                <ChevronRight size={15} color="rgba(255,255,255,0.2)" />
                            </Link>
                        ))}
                    </nav>

                    {/* Separator */}
                    <div style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.05)",
                        margin: "12px 4px",
                    }} />

                    {/* Quick Sectors */}
                    <div style={{ padding: "4px 16px 8px" }}>
                        <p style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.25)",
                            marginBottom: "8px",
                        }}>
                            Secteurs populaires
                        </p>
                        {quickSectors.map((s) => (
                            <Link
                                key={s.href}
                                href={s.href}
                                onClick={onClose}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    padding: "10px 0",
                                    fontSize: "13px",
                                    color: "var(--text-muted)",
                                    textDecoration: "none",
                                    WebkitTapHighlightColor: "transparent",
                                }}
                            >
                                <span style={{
                                    width: "5px",
                                    height: "5px",
                                    borderRadius: "50%",
                                    background: "var(--green-900)",
                                    flexShrink: 0,
                                }} />
                                {s.label}
                            </Link>
                        ))}
                    </div>

                    {/* Separator */}
                    <div style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.05)",
                        margin: "12px 4px",
                    }} />

                    {/* Language selector */}
                    <div style={{ padding: "4px 16px 8px" }}>
                        <p style={{
                            fontSize: "10px",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "rgba(255,255,255,0.25)",
                            marginBottom: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}>
                            <Globe size={12} />
                            Langue
                        </p>
                        <div style={{ display: "flex", gap: "8px" }}>
                            {(["FR", "EN", "ZH"] as const).map((l) => (
                                <button
                                    key={l}
                                    onClick={() => setLang(l)}
                                    style={{
                                        padding: "6px 14px",
                                        borderRadius: "6px",
                                        border: `1px solid ${lang === l ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.08)"}`,
                                        background: lang === l ? "rgba(16,185,129,0.1)" : "transparent",
                                        color: lang === l ? "var(--green-900)" : "var(--text-muted)",
                                        fontSize: "12px",
                                        fontWeight: lang === l ? 600 : 400,
                                        cursor: "pointer",
                                    }}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Diagnostic */}
                <div style={{
                    padding: "16px 20px 32px 20px",
                    borderTop: "1px solid rgba(255,255,255,0.05)",
                    flexShrink: 0,
                }}>
                    <Link
                        href="/evaluation"
                        onClick={onClose}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "10px",
                            width: "100%",
                            padding: "15px 20px",
                            background: "linear-gradient(135deg, #10B981, #0D9E6E)",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "14px",
                            borderRadius: "12px",
                            textDecoration: "none",
                            letterSpacing: "-0.01em",
                            minHeight: "52px",
                            boxShadow: "0 0 32px rgba(16, 185, 129, 0.2)",
                        }}
                    >
                        <ClipboardCheck size={17} />
                        Démarrer mon diagnostic
                    </Link>
                </div>
            </div>
        </>
    );
}
