"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <footer
            style={{
                borderTop: "1px solid var(--border)",
                background: "var(--bg-main)",
                paddingTop: "80px",
                paddingBottom: "40px",
                paddingLeft: "62px",
                paddingRight: "62px",
            }}
        >
            <div style={{ maxWidth: "100%", margin: "0 auto" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "64px",
                        marginBottom: "64px",
                    }}
                >
                    {/* Brand - À gauche */}
                    <div style={{ maxWidth: "320px", flexShrink: 0 }}>
                        <Link href="/" style={{
                            color: "var(--white)",
                            fontWeight: 500,
                            fontSize: "24px",
                            letterSpacing: "-0.04em",
                            fontFamily: "var(--font-inter)",
                            textDecoration: "none",
                            marginBottom: "20px",
                            display: "inline-block"
                        }}>
                            agréa.
                        </Link>
                        <p style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--text-secondary)" }}>
                            {t("footer.brand_desc")}
                        </p>
                    </div>

                    {/* Liens - Alignés à droite */}
                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "80px",
                        flexGrow: 1,
                        justifyContent: "flex-end"
                    }}>
                        {/* Secteurs */}
                        <div>
                            <p className="label" style={{ marginBottom: "20px", color: "var(--white)", fontWeight: 500 }}>{t("footer.secteurs")}</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                {[
                                    { href: "/btp", label: t("sectors.btp.name") },
                                    { href: "/marches-publics", label: t("sectors.marches-publics.name") },
                                    { href: "/creation-entreprise", label: t("sectors.creation-entreprise.name") },
                                    { href: "/import-export", label: t("sectors.import-export.name") },
                                    { href: "/sante", label: t("sectors.sante.name") },
                                    { href: "/mines", label: t("sectors.mines.name") },
                                ].map((link) => (
                                    <Link key={link.href} href={link.href} style={{ fontSize: "14px", color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Plateforme */}
                        <div>
                            <p className="label" style={{ marginBottom: "20px", color: "var(--white)", fontWeight: 500 }}>{t("footer.plateforme")}</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                {[
                                    { href: "/evaluation", label: t("footer.diag") },
                                    { href: "/guides", label: t("footer.guides") },
                                    { href: "/veille", label: t("footer.veille") },
                                    { href: "/appels-offres", label: t("footer.appels") },
                                    { href: "/demarrer", label: t("footer.demarrer") },
                                ].map((link) => (
                                    <Link key={link.href} href={link.href} style={{ fontSize: "14px", color: "var(--text-secondary)" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div>
                            <p className="label" style={{ marginBottom: "20px", color: "var(--white)", fontWeight: 500 }}>{t("footer.contact")}</p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                                <Link href="/contact" style={{ fontSize: "14px", color: "var(--text-secondary)" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>{t("footer.rappel")}</Link>
                                <Link href="/a-propos" style={{ fontSize: "14px", color: "var(--text-secondary)" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>{t("footer.apropos")}</Link>
                                <a
                                    href="https://wa.me/243XXXXXXXXX"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontSize: "14px", color: "var(--green-900)", fontWeight: 500 }}
                                >
                                    {t("footer.whatsapp")}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div
                    style={{
                        borderTop: "1px solid var(--border)",
                        paddingTop: "24px",
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        © {new Date().getFullYear()} Agréa Africa. {t("footer.rights")}
                    </p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        Kinshasa, République Démocratique du Congo — <a href="https://agrea.africa" style={{ color: "var(--text-muted)" }}>agrea.africa</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
