"use client";

import Link from "next/link";
import { ArrowRight, Lightbulb } from "lucide-react";

interface BlogCTAProps {
    title?: string;
    text: string;
    buttonText?: string;
    href?: string;
}

export default function BlogCTA({
    title = "Besoin d'aide sur ce sujet ?",
    text,
    buttonText = "Faire le diagnostic gratuit",
    href = "/evaluation"
}: BlogCTAProps) {
    return (
        <aside style={{
            margin: "48px 0",
            padding: "32px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Décoration subtile */}
            <div style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "150px",
                height: "150px",
                background: "radial-gradient(circle at top right, rgba(16, 185, 129, 0.1), transparent 70%)",
                pointerEvents: "none"
            }} />

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--green-900)"
                }}>
                    <Lightbulb size={20} />
                </div>
                <h4 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--white)", margin: 0 }}>
                    {title}
                </h4>
            </div>

            <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                {text}
            </p>

            <div>
                <Link
                    href={href}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "12px 24px",
                        background: "var(--green-900)",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "15px",
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "all 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = "var(--green-800)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(16, 185, 129, 0.2)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = "var(--green-900)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                >
                    {buttonText} <ArrowRight size={16} />
                </Link>
            </div>
        </aside>
    );
}
