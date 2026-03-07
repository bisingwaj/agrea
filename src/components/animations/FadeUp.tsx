"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

interface FadeUpProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
    className?: string;
    once?: boolean;
}

export const FadeUp = ({
    children,
    delay = 0,
    duration = 0.5,
    y = 40,
    className = "",
    once = true,
}: FadeUpProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once, margin: "-10%" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
            transition={{
                duration,
                delay,
                ease: [0.25, 1, 0.5, 1], // Smooth ease-out
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
