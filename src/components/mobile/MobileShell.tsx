"use client";

import { useState } from "react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import MobileNavbar from "@/components/mobile/MobileNavbar";
import MobileBurgerMenu from "@/components/mobile/MobileBurgerMenu";
import MobileBottomBar from "@/components/mobile/MobileBottomBar";

/**
 * MobileShell: conditionally wraps children in a mobile-specific layout.
 * On desktop, it renders nothing (children are displayed via the normal desktop layout).
 * On mobile, it provides: MobileNavbar + BurgerMenu overlay + MobileBottomBar.
 */
export default function MobileShell({ children }: { children: React.ReactNode }) {
    const [burgerOpen, setBurgerOpen] = useState(false);
    const isDesktop = useIsDesktop();

    // During SSR / hydration, render nothing to avoid layout flash
    if (isDesktop === undefined) return null;

    // On desktop: render only children (normal desktop layout handles everything)
    if (isDesktop) return <>{children}</>;

    // On mobile: full mobile layout
    return (
        <>
            {/* Sticky top navbar */}
            <MobileNavbar
                burgerOpen={burgerOpen}
                onToggleBurger={() => setBurgerOpen((v) => !v)}
            />

            {/* Sliding burger overlay */}
            <MobileBurgerMenu
                isOpen={burgerOpen}
                onClose={() => setBurgerOpen(false)}
            />

            {/* Page content */}
            {children}

            {/* Fixed bottom navigation */}
            <MobileBottomBar />
        </>
    );
}
