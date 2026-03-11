import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GUIDES_DATA } from "@/data/guides";
import GuideDetailClient from "@/components/guides/GuideDetailClient";

const BASE_URL = "https://agrea.africa";

// Génération statique de toutes les pages Guides
export function generateStaticParams() {
    return GUIDES_DATA.map((g) => ({ slug: g.slug }));
}

// Meta-tags dynamiques SEO-optimisés par Guide
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const guide = GUIDES_DATA.find((g) => g.slug === slug);
    if (!guide) return {};

    const title = `${guide.contentKeys.description.slice(0, 60)}… | Agréa Africa`;
    const description = guide.contentKeys.description;
    const url = `${BASE_URL}/guides/${slug}`;

    return {
        title,
        description,
        keywords: [
            slug.split("-").join(" "),
            "guide conformité RDC",
            "démarches administratives Congo",
            "agrément Kinshasa",
            "document entreprise RDC",
        ].join(", "),
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            siteName: "Agréa Africa",
            locale: "fr_CD",
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
        robots: { index: true, follow: true },
    };
}

// Server Component — rendu du JSON-LD et délégation au composant Client
export default async function GuideDetailPage(
    { params }: { params: Promise<{ slug: string }> }
) {
    const { slug } = await params;
    const guide = GUIDES_DATA.find((g) => g.slug === slug);
    if (!guide) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": guide!.contentKeys.description.slice(0, 70),
        "description": guide!.contentKeys.description,
        "step": guide!.contentKeys.whatYouGet.map((step, i) => ({
            "@type": "HowToStep",
            "position": i + 1,
            "name": step,
            "text": step,
        })),
        "tool": guide!.structures.map((s) => ({
            "@type": "HowToTool",
            "name": s,
        })),
        "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": guide!.stats.cout,
        },
        "totalTime": `PT${guide!.stats.delai}D`,
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <GuideDetailClient guide={guide!} />
        </>
    );
}
