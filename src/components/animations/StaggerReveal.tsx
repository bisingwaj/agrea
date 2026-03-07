"use client";

import React, { Children } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface StaggerRevealProps {
    children: React.ReactNode;
    staggerDelay?: number;
    className?: string;
    style?: React.CSSProperties;
    once?: boolean;
}

export const StaggerReveal = ({
    children,
    staggerDelay = 0.1,
    className = "",
    style,
    once = true,
}: StaggerRevealProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once, margin: "-10%" });

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 1, 0.5, 1], // ease out cubic
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
            style={style}
        >
            {Children.map(children, (child) => (
                <motion.div variants={itemVariants}>{child}</motion.div>
            ))}
        </motion.div>
    );
};
