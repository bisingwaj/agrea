"use client";

import { useEffect, useState } from "react";
import ReportPage from "@/components/report/ReportPage";
import MobileReportPage from "@/components/mobile/MobileReportPage";

/**
 * Détection client-side : rend MobileReportPage sur mobile, ReportPage sur desktop.
 * Note: Le composant client est nécessaire ici car useEffect est requis pour détecter
 * la largeur d'écran après hydratation.
 */
export default function MonRapportClientSwitch() {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Pendant la phase SSR/hydratation, on ne rend rien pour éviter le flash
    if (isMobile === null) return null;

    return isMobile ? <MobileReportPage /> : <ReportPage />;
}
