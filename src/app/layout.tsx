import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MobileNavbarWrapper from "@/components/mobile/MobileNavbarWrapper";
import { LanguageProvider } from "@/lib/i18n";
import { getTranslationContext } from "@/lib/tServer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://agrea.africa";

export async function generateMetadata(): Promise<Metadata> {
  const { t: tServer } = await getTranslationContext();
  
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: tServer("meta.title_template") || "%s | Agréa Africa",
      default: tServer("meta.title_default") || "Agréa Africa — Conformité Administrative en RDC",
    },
    description: tServer("meta.description") || 
      "Agréa accompagne les entreprises de la RDC dans leurs démarches administratives, réglementaires et de conformité. Diagnostic en ligne, guides sectoriels, obtention d'agréments, permis et autorisations à Kinshasa.",
    keywords: tServer("meta.keywords") || [
      "agrément RDC",
      "conformité Congo",
      "administratif Kinshasa",
      "marchés publics RDC",
      "BTP Congo",
      "créer SARL Kinshasa",
      "permis minier RDC",
      "RCCM Congo",
      "licence import export RDC",
      "facilitation administrative RDC",
      "agréa africa",
    ].join(", "),
    authors: [{ name: "Agréa Africa", url: BASE_URL }],
    creator: "Agréa Africa",
    publisher: "Agréa Africa",
    robots: { index: true, follow: true },
    alternates: { canonical: BASE_URL },
    openGraph: {
      title: tServer("meta.og_title") || "Agréa Africa — Facilitation administrative et réglementaire en RDC",
      description: tServer("meta.og_desc") ||
        "Plateforme de facilitation administrative en RDC. Diagnostic de conformité, guides sectoriels, constitution de dossiers, suivi jusqu'à l'obtention.",
      url: BASE_URL,
      siteName: "Agréa Africa",
      locale: "fr_CD", // You might want to map this dynamically based on language later
      type: "website",
      images: [
        {
          url: `${BASE_URL}/og-default.png`,
          width: 1200,
          height: 630,
          alt: "Agréa Africa — Conformité Administrative en RDC",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tServer("meta.tw_title") || "Agréa Africa — Conformité Administrative en RDC",
      description: tServer("meta.tw_desc") ||
        "Diagnostic de conformité, guides sectoriels et accompagnement administratif pour les entreprises en RDC.",
      images: [`${BASE_URL}/og-default.png`],
      site: "@agreaafrica",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { t: tServer, lang } = await getTranslationContext();

  return (
    <html lang={lang.toLowerCase()} className={inter.variable}>
      <body>
        <LanguageProvider>
          {/*
           * DESKTOP NAVBAR — hidden on mobile via CSS
           * (The mobile navbar is rendered inline inside each page via MobileNavbarWrapper)
           */}
          <div className="desktop-only">
            <Navbar />
          </div>

          {/*
           * MOBILE NAVBAR + BURGER — hidden on desktop via CSS
           * Rendered here so it sticks to the top persistently across page navigations.
           */}
          <div className="mobile-only">
            <MobileNavbarWrapper />
          </div>

          {/* Page content */}
          <main className="main-content">{children}</main>

          {/* Desktop Footer — hidden on mobile via CSS */}
          <div className="desktop-only">
            <Footer />
            <WhatsAppButton />
          </div>

          {/* JSON-LD Organization + SoftwareApplication */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Agréa Africa",
                  "url": BASE_URL,
                  "logo": `${BASE_URL}/apple-touch-icon.png`,
                  "description": tServer("jsonld.org_desc") ||
                    "Agréa accompagne les entreprises de la RDC dans leurs démarches administratives, réglementaires et de conformité.",
                  "areaServed": {
                    "@type": "Country",
                    "name": tServer("jsonld.country_name") || "République Démocratique du Congo",
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kinshasa",
                    "addressCountry": "CD",
                  },
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "contactType": "customer service",
                      "availableLanguage": ["French", "English", "Chinese"],
                    },
                  ],
                },
                {
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  "name": "Agréa — Outil de Diagnostic de Conformité",
                  "url": `${BASE_URL}/evaluation`,
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                  },
                  "description": tServer("jsonld.software_desc") ||
                    "Outil de diagnostic de conformité administrative pour les entreprises opérant en République Démocratique du Congo.",
                },
              ]),
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}

