import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    const { t } = useTranslation();
    return (
        <div>
            {/* Progress bar */}
            <div
                style={{
                    height: "3px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "100px",
                    marginBottom: "20px",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        background: "var(--green-900)",
                        borderRadius: "100px",
                        width: `${((currentStep + 1) / steps.length) * 100}% `,
                        transition: "width 0.3s ease",
                    }}
                />
            </div>

            {/* Steps */}
            <div style={{ display: "flex", gap: "4px", overflowX: "auto", paddingBottom: "4px" }}>
                {steps.map((step, idx) => {
                    const done = idx < currentStep;
                    const active = idx === currentStep;
                    return (
                        <div
                            key={step}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                padding: "6px 12px",
                                borderRadius: "100px",
                                background: active ? "rgba(16, 185, 129, 0.1)" : done ? "transparent" : "transparent",
                                border: `1px solid ${active ? "rgba(16, 185, 129, 0.3)" : done ? "var(--border)" : "transparent"} `,
                                flexShrink: 0,
                            }}
                        >
                            {done ? (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                    <circle cx="7" cy="7" r="6.5" stroke="var(--green-900)" />
                                    <path d="M4 7l2 2 4-4" stroke="var(--green-900)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <div
                                    style={{
                                        width: "14px",
                                        height: "14px",
                                        borderRadius: "50%",
                                        border: `1.5px solid ${active ? "var(--green-900)" : "var(--border)"} `,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {active && (
                                        <div
                                            style={{
                                                width: "6px",
                                                height: "6px",
                                                borderRadius: "50%",
                                                background: "var(--green-900)",
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                            <span
                                style={{
                                    fontSize: "12px",
                                    fontWeight: active ? 500 : 400,
                                    color: active ? "var(--green-900)" : done ? "var(--text-muted)" : "rgba(255,255,255,0.3)",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
