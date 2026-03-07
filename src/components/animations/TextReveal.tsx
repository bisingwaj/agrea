"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    once?: boolean;
}

export const TextReveal = ({
    children,
    delay = 0,
    className = "",
    once = true,
}: TextRevealProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once, margin: "-10%" });

    return (
        <span
            ref={ref}
            className={`inline-block overflow-hidden ${className}`}
            style={{ verticalAlign: "bottom" }}
        >
            <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{
                    duration: 0.6,
                    delay,
                    ease: [0.33, 1, 0.68, 1], // Ease customisé style "CSS easeOutCubic"
                }}
            >
                {children}
            </motion.span>
        </span>
    );
};
