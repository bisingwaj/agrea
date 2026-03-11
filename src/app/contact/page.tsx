import React from "react";
import { getTranslationContext } from "@/lib/tServer";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata() {
    const { t: tServer } = await getTranslationContext();
    return {
        title: "Contacter Agréa Africa",
        description: tServer("contact_page.desc"),
    };
}

export default async function ContactPage() {
    const { t: tServer } = await getTranslationContext();

    return (
        <section className="section" style={{ paddingBottom: "80px" }}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "name": "Contacter Agréa Africa",
                        "description": tServer("contact_page.desc"),
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
                <span className="badge" style={{ marginBottom: "24px", display: "inline-flex", background: "rgba(255,255,255,0.05)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>{tServer("contact_page.badge")}</span>
                <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "16px", color: "var(--white)" }}>
                    {tServer("contact_page.title")}
                </h1>
                <p style={{ marginBottom: "48px", color: "var(--text-secondary)", fontSize: "17px" }}>
                    {tServer("contact_page.desc")}
                </p>

                <ContactForm />
            </div>
        </section>
    );
}

