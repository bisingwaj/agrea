"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import PhoneInput from "@/components/PhoneInput";

interface FormData {
    firstName: string;
    phone: string; // Changed from whatsapp
    timeSlot: string;
}

const TIME_SLOTS = [
    "08h00 – 10h00",
    "10h00 – 12h00",
    "12h00 – 14h00",
    "14h00 – 16h00",
    "16h00 – 18h00",
];

export default function ContactPage() {
    const { t } = useTranslation();
    const [form, setForm] = useState<FormData>({ firstName: "", phone: "", timeSlot: "" }); // Updated state initialization
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const validate = (): boolean => {
        const newErrors: Partial<FormData> = {};
        if (!form.firstName.trim()) newErrors.firstName = t("contact_page.fname_err");
        if (!form.phone.trim()) newErrors.phone = t("contact_page.wa_err1"); // Updated error key
        else if (!/^\+?[\d\s\-]{8,}$/.test(form.phone)) newErrors.phone = t("contact_page.wa_err2"); // Updated error key
        if (!form.timeSlot) newErrors.timeSlot = t("contact_page.time_err");
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            await new Promise((r) => setTimeout(r, 800)); // simulation
            setSubmitted(true);
        } catch {
            // handle error
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <section className="section">
                <div className="container" style={{ maxWidth: "480px" }}>
                    <div className="glow-card" style={{ textAlign: "center", padding: "48px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px" }}>
                        <div
                            style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                background: "rgba(16, 185, 129, 0.1)",
                                border: "1px solid rgba(16, 185, 129, 0.2)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 24px",
                            }}
                        >
                            <CheckCircle size={32} color="var(--green-900)" strokeWidth={1.5} />
                        </div>
                        <h2 style={{ marginBottom: "12px", color: "var(--white)" }}>{t("contact_page.success_title")}</h2>
                        <p style={{ marginBottom: "8px", color: "var(--text-secondary)" }}>
                            {t("contact_page.success_hello")} <strong style={{ color: "var(--white)" }}>{form.firstName}</strong>{t("contact_page.success_msg1")}
                        </p>
                        <p style={{ color: "var(--text-secondary)" }}>
                            {t("contact_page.success_msg2")}
                            <strong style={{ color: "var(--white)" }}>{form.phone}</strong>{t("contact_page.success_msg3")}{" "} {/* Updated to form.phone */}
                            <strong style={{ color: "var(--white)" }}>{form.timeSlot}</strong>.
                        </p>
                        <div
                            style={{
                                marginTop: "40px",
                                padding: "16px 20px",
                                background: "rgba(16, 185, 129, 0.05)",
                                border: "1px solid rgba(16, 185, 129, 0.2)",
                                borderRadius: "10px",
                                fontSize: "14px",
                                color: "var(--green-900)",
                            }}
                        >
                            {t("contact_page.success_guarantee")} <strong style={{ color: "var(--white)" }}>{t("contact_page.success_time")}</strong>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="section" style={{ paddingBottom: "80px" }}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ContactPage",
                            "name": "Contacter Agréa Africa",
                            "description": t("contact_page.desc"),
                            "mainEntity": {
                                "@type": "Organization",
                                "name": "Agréa Africa",
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "telephone": "+243 85 000 0000",
                                    "contactType": "customer assistance",
                                    "availableLanguage": ["French", "English", "Lingala"]
                                }
                            }
                        })
                    }}
                />
                <div className="container" style={{ maxWidth: "560px" }}>
                    <span className="badge" style={{ marginBottom: "24px", display: "inline-flex", background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>{t("contact_page.badge")}</span>
                    <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "16px", color: "var(--white)" }}>
                        {t("contact_page.title")}
                    </h1>
                    <p style={{ marginBottom: "48px", color: "var(--text-secondary)", fontSize: "17px" }}>
                        {t("contact_page.desc")}
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                            {/* Prénom */}
                            <div>
                                <label htmlFor="firstName" style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>
                                    {t("contact_page.fname_lbl")}
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    value={form.firstName}
                                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                    placeholder={t("contact_page.fname_ph")}
                                    style={{
                                        width: "100%",
                                        padding: "14px 16px",
                                        border: "1px solid " + (errors.firstName ? "#EF4444" : "var(--border)"),
                                        borderRadius: "8px",
                                        fontSize: "15px",
                                        outline: "none",
                                        fontFamily: "Inter, sans-serif",
                                        color: "var(--white)",
                                        background: "var(--bg-card)",
                                        transition: "border-color 0.15s ease, box-shadow 0.15s ease",
                                    }}
                                    onFocus={(e) => { e.target.style.borderColor = "var(--green-900)"; e.target.style.boxShadow = "0 0 0 1px var(--green-900)"; }}
                                    onBlur={(e) => { e.target.style.borderColor = errors.firstName ? "#EF4444" : "var(--border)"; e.target.style.boxShadow = "none"; }}
                                />
                                {errors.firstName && <p style={{ fontSize: "12px", color: "#EF4444", marginTop: "6px" }}>{errors.firstName}</p>}
                            </div>

                            {/* WhatsApp */}
                            <div>
                                <label htmlFor="whatsapp" style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "8px" }}>
                                    {t("contact_page.wa_lbl")}
                                </label>
                                <PhoneInput
                                    value={form.phone}
                                    onChange={(val) => setForm({ ...form, phone: val })}
                                    placeholder={t("contact_page.wa_ph")}
                                    required
                                />
                                {errors.phone && <p style={{ fontSize: "12px", color: "#EF4444", marginTop: "6px" }}>{errors.phone}</p>}
                            </div>

                            {/* Plage horaire */}
                            <div>
                                <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "var(--text-secondary)", marginBottom: "12px" }}>
                                    <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                        <Clock size={14} /> {t("contact_page.time_lbl")}
                                    </span>
                                </label>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                                    {TIME_SLOTS.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setForm({ ...form, timeSlot: slot })}
                                            style={{
                                                padding: "12px 14px",
                                                border: "1px solid " + (form.timeSlot === slot ? "var(--green-900)" : "var(--border)"),
                                                borderRadius: "8px",
                                                background: form.timeSlot === slot ? "rgba(16, 185, 129, 0.1)" : "var(--bg-card)",
                                                color: form.timeSlot === slot ? "var(--green-900)" : "var(--text-muted)",
                                                fontWeight: form.timeSlot === slot ? 500 : 400,
                                                fontSize: "13px",
                                                cursor: "pointer",
                                                transition: "all 0.15s ease",
                                                fontFamily: "Inter, sans-serif",
                                                textAlign: "center",
                                            }}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                                {errors.timeSlot && <p style={{ fontSize: "12px", color: "#EF4444", marginTop: "6px" }}>{errors.timeSlot}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary"
                                style={{ width: "100%", justifyContent: "center", padding: "16px 24px", fontSize: "15px", opacity: loading ? 0.7 : 1, marginTop: "16px" }}
                            >
                                {loading ? t("contact_page.btn_loading") : t("contact_page.btn_idle")}
                            </button>

                            <p style={{ fontSize: "13px", color: "var(--text-muted)", textAlign: "center" }}>
                                {t("contact_page.footer_note")}
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
}
