"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";

interface MobileNavbarProps {
    burgerOpen: boolean;
    onToggleBurger: () => void;
}

export default function MobileNavbar({ burgerOpen, onToggleBurger }: MobileNavbarProps) {
    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 200,
                background: "rgba(2, 2, 2, 0.9)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                height: "56px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 28px",
            }}
        >
            {/* Logo */}
            <Link
                href="/"
                onClick={() => burgerOpen && onToggleBurger()}
                style={{
                    color: "var(--white)",
                    fontWeight: 600,
                    fontSize: "20px",
                    letterSpacing: "-0.04em",
                    textDecoration: "none",
                }}
            >
                agréa.
            </Link>

            {/* Burger Button — 44px tactile target */}
            <button
                onClick={onToggleBurger}
                aria-label={burgerOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={burgerOpen}
                style={{
                    background: "transparent",
                    border: "none",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "var(--white)",
                    borderRadius: "8px",
                    WebkitTapHighlightColor: "transparent",
                }}
            >
                {burgerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </header>
    );
}
