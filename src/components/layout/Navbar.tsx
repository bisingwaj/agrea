"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { Globe } from "lucide-react";

export default function Navbar() {
    const [langOpen, setLangOpen] = useState(false);
    const { lang, setLang, t } = useTranslation();

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 50,
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(20px)",
                borderBottom: "1px solid var(--border)",
            }}
        >
            <nav style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                height: "72px",
                padding: "0 62px"
            }} className="nav-container">
                {/* Logo Typographique "agréa." */}
                <Link href="/" style={{
                    color: "var(--white)",
                    fontWeight: 500,
                    fontSize: "24px",
                    letterSpacing: "-0.04em",
                    fontFamily: "var(--font-inter)",
                    textDecoration: "none"
                }}>
                    agréa.
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
                    {/* Desktop links */}
                    <div
                        style={{ display: "flex", alignItems: "center", gap: "40px" }}
                        className="desktop-nav"
                    >
                        <Link href="/guides" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 400, transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                            {t("nav.guides")}
                        </Link>
                        <Link href="/veille" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 400, transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                            {t("nav.veille")}
                        </Link>
                        <Link href="/analyses" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 400, transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                            {t("nav.analyses")}
                        </Link>
                        <Link href="/a-propos" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 400, transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                            {t("nav.about")}
                        </Link>
                        <Link href="/contact" style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: 400, transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                            {t("nav.contact")}
                        </Link>
                        <Link href="/evaluation" style={{
                            background: "var(--white)",
                            color: "#000",
                            padding: "10px 20px",
                            fontSize: "14px",
                            fontWeight: 500,
                            borderRadius: "6px",
                            letterSpacing: "-0.01em",
                            transition: "opacity 0.2s",
                            textDecoration: "none"
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = "var(--green-900)";
                                e.currentTarget.style.color = "var(--white)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = "var(--white)";
                                e.currentTarget.style.color = "#000";
                            }}
                        >
                            {t("nav.diagnostic")}
                        </Link>
                    </div>

                    {/* Language Selector (Visible on mobile too) */}
                    <div style={{ position: "relative" }}>
                        <button
                            onClick={() => setLangOpen(!langOpen)}
                            style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: "6px", padding: "8px 12px", display: "flex", alignItems: "center", gap: "8px", color: "var(--text-secondary)", cursor: "pointer", fontSize: "14px", fontWeight: 500, transition: "color 0.2s" }}
                            onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"}
                            onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                        >
                            <Globe size={16} /> {lang}
                        </button>
                        {langOpen && (
                            <div style={{ position: "absolute", top: "100%", right: 0, marginTop: "8px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px", display: "flex", flexDirection: "column", gap: "4px", minWidth: "120px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", zIndex: 100 }}>
                                <button onClick={() => { setLang("FR"); setLangOpen(false); }} style={{ background: lang === "FR" ? "rgba(16, 185, 129, 0.1)" : "transparent", color: lang === "FR" ? "var(--green-900)" : "var(--text-secondary)", border: "none", textAlign: "left", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "14px", fontWeight: lang === "FR" ? 600 : 400 }}>Français</button>
                                <button onClick={() => { setLang("EN"); setLangOpen(false); }} style={{ background: lang === "EN" ? "rgba(16, 185, 129, 0.1)" : "transparent", color: lang === "EN" ? "var(--green-900)" : "var(--text-secondary)", border: "none", textAlign: "left", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "14px", fontWeight: lang === "EN" ? 600 : 400 }}>English</button>
                                <button onClick={() => { setLang("ZH"); setLangOpen(false); }} style={{ background: lang === "ZH" ? "rgba(16, 185, 129, 0.1)" : "transparent", color: lang === "ZH" ? "var(--green-900)" : "var(--text-secondary)", border: "none", textAlign: "left", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "14px", fontWeight: lang === "ZH" ? 600 : 400 }}>中文</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .nav-container { padding: 0 24px !important; }
        }
      `}</style>
        </header>
    );
}
