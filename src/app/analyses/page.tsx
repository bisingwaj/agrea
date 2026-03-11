import { Metadata } from "next";
import { getSortedArticlesData } from "@/lib/articles";
import ArticleCard from "@/components/blog/ArticleCard";
import { getTranslationContext } from "@/lib/tServer";

export async function generateMetadata(): Promise<Metadata> {
    const { t: tServer } = await getTranslationContext();
    return {
        title: tServer("blog.meta_title") || "Analyses & Publications | Agréa",
        description: tServer("blog.meta_desc") || "Insights, décryptages réglementaires et conseils pratiques pour la gestion et la conformité de votre entreprise en RDC.",
    };
}

export default async function AnalysesPage() {
    const { t: tServer, lang } = await getTranslationContext();
    const allArticles = getSortedArticlesData(lang);

    return (
        <main style={{ background: "var(--bg-main)", minHeight: "100vh" }}>
            {/* Header / Hero Section */}
            <section style={{
                padding: "clamp(60px, 10vw, 100px) 0 60px",
                borderBottom: "1px solid var(--border)",
                background: "linear-gradient(180deg, rgba(16, 185, 129, 0.03) 0%, rgba(10, 10, 10, 0) 100%)"
            }}>
                <div className="container">
                    <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
                        <span style={{
                            display: "inline-block",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "var(--green-900)",
                            background: "rgba(16, 185, 129, 0.1)",
                            padding: "6px 14px",
                            borderRadius: "100px",
                            letterSpacing: "0.02em",
                            textTransform: "uppercase",
                            marginBottom: "24px"
                        }}>
                            {tServer("blog.badge") || "Agréablog"}
                        </span>

                        <h1 style={{
                            fontSize: "clamp(1.75rem, 7vw, 4rem)",
                            fontWeight: 600,
                            color: "var(--white)",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            marginBottom: "24px"
                        }}>
                            {tServer("blog.title") || "Analyses & Publications"}
                        </h1>

                        <p style={{
                            fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                            color: "var(--text-secondary)",
                            lineHeight: 1.6
                        }}>
                            {tServer("blog.desc") || "Décrypter la complexité réglementaire congolaise pour transformer vos obligations en avantages stratégiques."}
                        </p>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="section" style={{ padding: "80px 0" }}>
                <div className="container">
                    {allArticles.length > 0 ? (
                        <div className="mobile-grid-1col" style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "24px"
                        }}>
                            {allArticles.map((article) => (
                                <ArticleCard
                                    key={article.slug}
                                    slug={article.slug}
                                    metadata={article.metadata}
                                />
                            ))}
                        </div>
                    ) : (
                        <div style={{
                            textAlign: "center",
                            padding: "64px 24px",
                            background: "var(--bg-card)",
                            borderRadius: "16px",
                            border: "1px solid var(--border)"
                        }}>
                            <h3 style={{ fontSize: "1.5rem", color: "var(--white)", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                                {tServer("blog.empty_title") || "De nouvelles publications arrivent très bientôt."}
                            </h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
                                {tServer("blog.empty_desc") || "Nos experts finalisent actuellement des analyses pointues sur la fiscalité et le droit social."}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}

