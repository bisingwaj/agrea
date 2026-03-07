"use client";

import { useState, useEffect } from "react";

/**
 * Hook that returns true if the viewport is desktop (>900px).
 * Returns `undefined` during SSR to avoid hydration mismatches.
 */
export function useIsDesktop(): boolean | undefined {
    const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth > 900);
        check();

        const observer = new ResizeObserver(check);
        observer.observe(document.body);

        return () => observer.disconnect();
    }, []);

    return isDesktop;
}
