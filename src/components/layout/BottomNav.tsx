"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";
import { Home, ClipboardCheck, BookOpen, Mail } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useTranslation();

    const navItems = [
        { href: "/", icon: Home, label: t("nav.home") || "Accueil" },
        { href: "/evaluation", icon: ClipboardCheck, label: t("nav.diagnostic") || "Diagnostic" },
        { href: "/guides", icon: BookOpen, label: t("nav.guides") || "Guides" },
        { href: "/contact", icon: Mail, label: t("nav.contact") || "Contact" },
    ];

    return (
        <nav
            className="mobile-bottom-nav"
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(10, 10, 10, 0.95)",
                backdropFilter: "blur(20px)",
                borderTop: "1px solid var(--border)",
                display: "none", // Hidden by default, shown via CSS on mobile
                justifyContent: "space-around",
                alignItems: "center",
                padding: "8px 8px 16px 8px", // Bottom padding for iOS home indicator
                zIndex: 100,
            }}
        >
            <style>{`
                @media (max-width: 900px) {
                    .mobile-bottom-nav {
                        display: flex !important;
                    }
                }
            `}</style>
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "4px",
                            textDecoration: "none",
                            color: isActive ? "var(--green-900)" : "var(--text-muted)",
                            minWidth: "64px",
                            padding: "8px",
                            WebkitTapHighlightColor: "transparent"
                        }}
                    >
                        <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        <span style={{ fontSize: "11px", fontWeight: isActive ? 600 : 500, letterSpacing: "0.02em", marginTop: "4px" }}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
