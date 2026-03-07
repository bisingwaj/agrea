"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Objective } from "@/data/objectives";

interface Props {
    objectives: Objective[];
    sectorId: string;
}

export default function ObjectiveList({ objectives, sectorId }: Props) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {objectives.map((obj) => (
                <Link
                    key={obj.id}
                    href={`/${sectorId}/${obj.id}`}
                    className="objective-link"
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "20px 24px",
                        border: "1px solid var(--border)",
                        borderRadius: "10px",
                        background: "var(--bg-card)",
                        textDecoration: "none",
                        transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                    }}
                >
                    <div>
                        <p style={{ fontWeight: 500, color: "var(--white)", fontSize: "15px", marginBottom: "4px" }}>
                            {obj.label}
                        </p>
                        <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                            {obj.daysMin} à {obj.daysMax} jours ·{" "}
                            {obj.costMin === 0 ? "Frais officiels uniquement" : `${obj.costMin.toLocaleString()} – ${obj.costMax.toLocaleString()} USD`}
                        </p>
                    </div>
                    <ChevronRight size={18} color="var(--text-muted)" style={{ flexShrink: 0, marginLeft: "16px" }} />
                </Link>
            ))}
            <style>{`
        .objective-link:hover {
          border-color: var(--green-900) !important;
          box-shadow: 0 0 0 1px var(--green-900) !important;
        }
      `}</style>
        </div>
    );
}
