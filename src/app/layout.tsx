import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MobileNavbarWrapper from "@/components/mobile/MobileNavbarWrapper";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Agréa — Vos projets méritent d'être en règle",
  description:
    "Agréa accompagne les entreprises de la République Démocratique du Congo dans leurs démarches administratives, réglementaires et de conformité. Obtenez vos agréments, permis et autorisations avec un suivi professionnel.",
  keywords:
    "agrément RDC, conformité, administratif Congo, marchés publics, BTP Kinshasa, facilitation administrative",
  openGraph: {
    title: "Agréa Africa — Facilitation administrative et réglementaire",
    description:
      "Plateforme de facilitation administrative en RDC. Diagnostic de conformité, constitution de dossiers, suivi jusqu'à l'obtention.",
    url: "https://agrea.africa",
    siteName: "Agréa Africa",
    locale: "fr_CD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
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

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Agréa Africa",
                "url": "https://agrea.africa",
                "logo": "https://agrea.africa/apple-touch-icon.png",
                "description": "Agréa accompagne les entreprises de la RDC dans leurs démarches administratives, réglementaires et de conformité.",
                "areaServed": {
                  "@type": "Country",
                  "name": "Congo-Kinshasa"
                },
                "contactPoint": [
                  {
                    "@type": "ContactPoint",
                    "telephone": "+243 85 000 0000",
                    "contactType": "customer assistance"
                  }
                ]
              }),
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
