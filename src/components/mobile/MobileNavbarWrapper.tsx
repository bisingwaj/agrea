"use client";

import { useState } from "react";
import MobileNavbar from "@/components/mobile/MobileNavbar";
import MobileBurgerMenu from "@/components/mobile/MobileBurgerMenu";

/**
 * MobileNavbarWrapper: renders the mobile top navbar + burger menu only.
 * Bottom bar has been removed — all navigation is in the burger menu.
 */
export default function MobileNavbarWrapper() {
    const [burgerOpen, setBurgerOpen] = useState(false);

    return (
        <>
            <MobileNavbar
                burgerOpen={burgerOpen}
                onToggleBurger={() => setBurgerOpen((v) => !v)}
            />
            <MobileBurgerMenu
                isOpen={burgerOpen}
                onClose={() => setBurgerOpen(false)}
            />
        </>
    );
}
