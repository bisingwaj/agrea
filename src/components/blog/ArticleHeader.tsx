"use client";

import Image from "next/image";
import { Clock, Calendar, MoveLeft } from "lucide-react";
import Link from "next/link";
import { ArticleMetadata } from "@/types/article";

interface ArticleHeaderProps {
    metadata: ArticleMetadata;
}

export default function ArticleHeader({ metadata }: ArticleHeaderProps) {
    return (
        <header style={{ marginBottom: "64px" }}>
            {/* Back button */}
            <div className="container" style={{ maxWidth: "800px", paddingTop: "40px", paddingBottom: "32px" }}>
                <Link
                    href="/analyses"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        color: "var(--text-secondary)",
                        fontSize: "14px",
                        textDecoration: "none",
                        transition: "color 0.2s ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = "var(--white)"}
                    onMouseOut={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
                >
                    <MoveLeft size={16} /> Retour aux analyses
                </Link>
            </div>

            {/* Header Content */}
            <div className="container" style={{ maxWidth: "800px", textAlign: "center" }}>
                <span style={{
                    display: "inline-block",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--green-900)",
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "6px 14px",
                    borderRadius: "100px",
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    marginBottom: "24px"
                }}>
                    {metadata.category}
                </span>

                <h1 style={{
                    fontSize: "clamp(2rem, 5vw, 3.5rem)",
                    fontWeight: 600,
                    color: "var(--white)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    marginBottom: "24px",
                    fontFamily: "Inter, sans-serif" // Agréa's main font
                }}>
                    {metadata.title}
                </h1>

                <p style={{
                    fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "40px",
                    maxWidth: "680px",
                    marginInline: "auto"
                }}>
                    {metadata.description}
                </p>

                {/* Meta details */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "24px",
                    flexWrap: "wrap",
                    color: "var(--text-muted)",
                    fontSize: "14px"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "16px", fontWeight: "bold" }}>
                            {metadata.author.charAt(0)}
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontWeight: 500, color: "var(--white)" }}>{metadata.author}</div>
                            <div style={{ fontSize: "12px" }}>{metadata.authorRole}</div>
                        </div>
                    </div>

                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border)" }} />

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Calendar size={16} />
                        {metadata.date}
                    </div>

                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border)" }} />

                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Clock size={16} />
                        {metadata.readTime}
                    </div>
                </div>
            </div>

            {/* Featured Image */}
            {metadata.image && (
                <div className="container" style={{ maxWidth: "1000px", marginTop: "48px" }}>
                    <div style={{
                        position: "relative",
                        width: "100%",
                        aspectRatio: "21/9",
                        borderRadius: "24px",
                        overflow: "hidden",
                        border: "1px solid var(--border)",
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}>
                        <Image
                            src={metadata.image}
                            alt={metadata.title}
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    </div>
                </div>
            )}
        </header>
    );
}
