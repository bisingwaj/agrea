"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { ArticleMetadata } from "@/types/article";

interface ArticleCardProps {
    slug: string;
    metadata: ArticleMetadata;
}

export default function ArticleCard({ slug, metadata }: ArticleCardProps) {
    return (
        <Link
            href={`/analyses/${slug}`}
            style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                textDecoration: "none",
                height: "100%",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                cursor: "pointer",
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "var(--green-900)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)";
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)";
            }}
        >
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "var(--bg-main)" }}>
                {/* Fallback pattern if no image */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 2px 2px, var(--white) 1px, transparent 0)", backgroundSize: "24px 24px" }} />

                {metadata.image && (
                    <Image
                        src={metadata.image}
                        alt={metadata.title}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                )}
            </div>

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <span style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "var(--green-900)",
                        background: "rgba(16, 185, 129, 0.1)",
                        padding: "4px 10px",
                        borderRadius: "100px",
                        letterSpacing: "0.02em",
                        textTransform: "uppercase"
                    }}>
                        {metadata.category}
                    </span>
                    <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                        {metadata.date}
                    </span>
                </div>

                <h3 style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--white)",
                    marginBottom: "12px",
                    lineHeight: 1.4,
                    letterSpacing: "-0.01em"
                }}>
                    {metadata.title}
                </h3>

                <p style={{
                    fontSize: "15px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "24px",
                    flexGrow: 1
                }}>
                    {metadata.description}
                </p>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "16px",
                    borderTop: "1px solid var(--border)",
                    marginTop: "auto"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--green-900)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "10px", fontWeight: "bold" }}>
                            {metadata.author.charAt(0)}
                        </div>
                        <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 500 }}>
                            {metadata.author}
                        </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "13px" }}>
                        <Clock size={14} />
                        {metadata.readTime}
                    </div>
                </div>
            </div>
        </Link>
    );
}
