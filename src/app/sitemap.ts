import type { MetadataRoute } from "next";
import { sectors } from "@/data/sectors";
import { objectives } from "@/data/objectives";
import { GUIDES_DATA } from "@/data/guides";

const BASE_URL = "https://agrea.africa";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/evaluation`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
        { url: `${BASE_URL}/analyses`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/veille`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ];

    // Dynamic sector pages
    const sectorPages: MetadataRoute.Sitemap = sectors.map((s) => ({
        url: `${BASE_URL}/${s.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
    }));

    // Dynamic objective pages
    const objectivePages: MetadataRoute.Sitemap = objectives.map((o) => ({
        url: `${BASE_URL}/${o.sectorId}/${o.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
    }));

    // Dynamic sector diagnostic pages
    const diagnosticPages: MetadataRoute.Sitemap = sectors.map((s) => ({
        url: `${BASE_URL}/${s.id}/diagnostic`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    // Dynamic guide pages
    const guidePages: MetadataRoute.Sitemap = GUIDES_DATA.map((g) => ({
        url: `${BASE_URL}/guides/${g.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [
        ...staticPages,
        ...sectorPages,
        ...objectivePages,
        ...diagnosticPages,
        ...guidePages,
    ];
}
