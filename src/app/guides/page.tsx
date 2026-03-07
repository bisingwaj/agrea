"use client";

import Link from "next/link";
import { BookOpen, Calendar, ArrowRight, Layers } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { GUIDES_DATA } from "@/data/guides";

export default function GuidesCatalogPage() {
    const { t } = useTranslation();

    return (
        <div style={{ minHeight: "100vh", paddingTop: "120px", paddingBottom: "100px", background: "var(--bg-main)" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

                {/* Header Section */}
                <div style={{ textAlign: "center", marginBottom: "80px", maxWidth: "800px", margin: "0 auto 80px" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "64px", height: "64px", borderRadius: "50%", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", marginBottom: "24px" }}>
                        <Layers size={28} color="var(--white)" />
                    </div>
                    <h1 style={{ fontSize: "48px", fontWeight: 700, color: "var(--white)", letterSpacing: "-0.03em", marginBottom: "24px", lineHeight: "1.1" }}>
                        {t("guides.title")}
                    </h1>
                    <p style={{ fontSize: "18px", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                        {t("guides.hook_desc")}
                    </p>
                </div>

                {/* Grid of Guides */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "24px" }}>
                    {GUIDES_DATA.map((guide) => (
                        <Link
                            key={guide.id}
                            href={`/guides/${guide.slug}`}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                background: "var(--bg-card)",
                                border: "1px solid var(--border)",
                                borderRadius: "24px",
                                padding: "40px 32px",
                                textDecoration: "none",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                position: "relative",
                                overflow: "hidden"
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = "var(--green-900)";
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = "0 20px 40px -20px rgba(0,0,0,0.5)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = "var(--border)";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                        >
                            {/* Lueur subtile en hover */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

                            <div style={{ marginBottom: "24px" }}>
                                <span style={{
                                    display: "inline-block",
                                    padding: "6px 12px",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid var(--border)",
                                    borderRadius: "100px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    color: "var(--text-secondary)",
                                    marginBottom: "16px"
                                }}>
                                    {t(guide.sectorKey as any) || guide.sectorKey}
                                </span>
                                <h2 style={{ fontSize: "22px", fontWeight: 600, color: "var(--white)", lineHeight: "1.3", letterSpacing: "-0.01em" }}>
                                    {t(guide.titleKey as any) || guide.titleKey}
                                </h2>
                            </div>

                            <p style={{ fontSize: "15px", color: "var(--text-muted)", lineHeight: "1.6", marginBottom: "32px", flex: 1 }}>
                                {guide.contentKeys.description}
                            </p>

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "24px", borderTop: "1px solid var(--border)", marginTop: "auto" }}>
                                <div style={{ display: "flex", gap: "16px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--text-muted)" }}>
                                        <BookOpen size={14} /> {guide.pages} {t("guides.metadata_pages")}
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--text-muted)" }}>
                                        <Calendar size={14} /> {guide.date}
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "50%", background: "var(--white)", color: "#000" }}>
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
}
