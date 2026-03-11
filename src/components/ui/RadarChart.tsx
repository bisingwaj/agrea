"use client";

import { useEffect, useRef, useState } from "react";

export interface RadarAxis {
    label: string;
    value: number; // 0 - 100
    color?: string;
}

interface Props {
    axes: RadarAxis[];
    size?: number;
    animated?: boolean;
}

/**
 * RadarChart — Graphique radar SVG pur (sans librairie externe).
 * Affiche jusqu'à 6 axes dimensionnels tracés sous formes de polygone rempli.
 * Animation fluide au chargement via un état de progression.
 */
export function RadarChart({ axes, size = 220, animated = true }: Props) {
    const [progress, setProgress] = useState(animated ? 0 : 1);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (animated && !hasAnimated.current) {
            hasAnimated.current = true;
            let start: number;
            const duration = 1400;
            const easeCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const animate = (timestamp: number) => {
                if (!start) start = timestamp;
                const elapsed = timestamp - start;
                const p = Math.min(elapsed / duration, 1);
                setProgress(easeCubic(p));
                if (p < 1) requestAnimationFrame(animate);
            };
            setTimeout(() => requestAnimationFrame(animate), 150);
        }
    }, [animated]);

    const cx = size / 2;
    const cy = size / 2;
    const maxRadius = size * 0.38;
    const n = axes.length;
    const levels = 4; // grille de fond

    // Calcule la position x,y d'un point sur le radar
    const getPoint = (index: number, value: number, total: number, r: number) => {
        const angle = (2 * Math.PI * index) / total - Math.PI / 2;
        const dist = (value / 100) * r * progress;
        return {
            x: cx + dist * Math.cos(angle),
            y: cy + dist * Math.sin(angle),
        };
    };

    // Points du polygone principal (données réelles)
    const dataPoints = axes.map((axis, i) => getPoint(i, axis.value, n, maxRadius));
    const polygonPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

    // Points des grilles de fond (niveaux 1…levels)
    const gridPolygons = Array.from({ length: levels }, (_, lvl) => {
        const r = ((lvl + 1) / levels) * maxRadius;
        return Array.from({ length: n }, (__, i) => {
            const angle = (2 * Math.PI * i) / n - Math.PI / 2;
            return `${i === 0 ? "M" : "L"}${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
        }).join(" ") + " Z";
    });

    // Couleur du polygone selon le score moyen
    const avg = axes.reduce((s, a) => s + a.value, 0) / n;
    const fillColor = avg >= 75 ? "rgba(13,92,58,0.55)" : avg >= 45 ? "rgba(217,119,6,0.45)" : "rgba(220,38,38,0.4)";
    const strokeColor = avg >= 75 ? "#10B981" : avg >= 45 ? "#F59E0B" : "#EF4444";

    return (
        <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            style={{ overflow: "visible" }}
            aria-label="Graphique radar de conformité"
        >
            {/* Grilles de fond */}
            {gridPolygons.map((d, i) => (
                <path
                    key={i}
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={1}
                />
            ))}

            {/* Lignes des axes */}
            {axes.map((_, i) => {
                const angle = (2 * Math.PI * i) / n - Math.PI / 2;
                return (
                    <line
                        key={i}
                        x1={cx}
                        y1={cy}
                        x2={(cx + maxRadius * Math.cos(angle)).toFixed(1)}
                        y2={(cy + maxRadius * Math.sin(angle)).toFixed(1)}
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth={1}
                    />
                );
            })}

            {/* Polygone de données avec remplissage */}
            <path
                d={polygonPath}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={2}
                strokeLinejoin="round"
            />

            {/* Points de données */}
            {dataPoints.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={4} fill={strokeColor} />
            ))}

            {/* Labels des axes */}
            {axes.map((axis, i) => {
                const angle = (2 * Math.PI * i) / n - Math.PI / 2;
                const labelR = maxRadius + 22;
                const lx = cx + labelR * Math.cos(angle);
                const ly = cy + labelR * Math.sin(angle);
                return (
                    <g key={i}>
                        <text
                            x={lx}
                            y={ly - 4}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={10}
                            fontWeight={600}
                            fill="rgba(255,255,255,0.7)"
                            fontFamily="var(--font-inter, sans-serif)"
                        >
                            {axis.label}
                        </text>
                        <text
                            x={lx}
                            y={ly + 9}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={11}
                            fontWeight={700}
                            fill={strokeColor}
                            fontFamily="var(--font-inter, sans-serif)"
                        >
                            {Math.round(axis.value * progress)}%
                        </text>
                    </g>
                );
            })}
        </svg>
    );
}

export default RadarChart;
