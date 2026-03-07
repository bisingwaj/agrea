"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";
import { Home, ClipboardCheck, BookOpen, Newspaper, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function MobileBottomBar() {
    const { t } = useTranslation();
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: Home, label: t("mobile.nav.home") || "Accueil" },
        { href: "/evaluation", icon: ClipboardCheck, label: t("mobile.nav.diagnostic") || "Diagnostic" },
        { href: "/guides", icon: BookOpen, label: t("mobile.nav.guides") || "Guides" },
        { href: "/analyses", icon: Newspaper, label: t("mobile.nav.analyses") || "Analyses" },
        { href: "/a-propos", icon: User, label: t("mobile.nav.about") || "À propos" },
    ];

    return (
        <nav
            aria-label="Navigation principale"
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                background: "rgba(5, 5, 5, 0.96)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "8px 4px 20px 4px", /* 20px bottom for iOS safe area */
                zIndex: 150,
            }}
        >
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
                            gap: "3px",
                            textDecoration: "none",
                            color: isActive ? "var(--green-900)" : "var(--text-muted)",
                            minWidth: "56px",
                            minHeight: "48px",
                            justifyContent: "center",
                            padding: "4px 8px",
                            borderRadius: "8px",
                            transition: "color 0.2s",
                            WebkitTapHighlightColor: "transparent",
                        }}
                    >
                        <item.icon
                            size={22}
                            strokeWidth={isActive ? 2.5 : 1.8}
                        />
                        <span style={{
                            fontSize: "10px",
                            fontWeight: isActive ? 600 : 500,
                            letterSpacing: "0.01em",
                        }}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
