import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArticleData, getAllArticleSlugs } from '@/lib/articles';
import { getTranslationContext } from '@/lib/tServer';
import ArticleHeader from '@/components/blog/ArticleHeader';
import Prose from '@/components/blog/Prose';
import BlogCTA from '@/components/blog/BlogCTA';

// Custom components passed to MDX
const components = {
    BlogCTA,
};

export async function generateStaticParams() {
    return getAllArticleSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const { lang } = await getTranslationContext();
    const postData = getArticleData(resolvedParams.slug, lang);

    if (!postData) {
        return {
            title: 'Article introuvable | Agréa',
        };
    }

    return {
        title: `${postData.metadata.title} | Agréa Analyses`,
        description: postData.metadata.description,
        openGraph: {
            title: postData.metadata.title,
            description: postData.metadata.description,
            type: 'article',
            publishedTime: postData.metadata.date,
            authors: [postData.metadata.author],
            tags: postData.metadata.tags,
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const { lang } = await getTranslationContext();
    const postData = getArticleData(resolvedParams.slug, lang);

    if (!postData) {
        notFound();
    }

    // GEO: JSON-LD structured data for the article
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": postData.metadata.title,
        "description": postData.metadata.description,
        "image": postData.metadata.image ? [postData.metadata.image] : [],
        "datePublished": new Date(postData.metadata.date).toISOString(),
        "dateModified": new Date(postData.metadata.date).toISOString(),
        "author": [{
            "@type": "Person",
            "name": postData.metadata.author,
            "jobTitle": postData.metadata.authorRole
        }],
        "publisher": {
            "@type": "Organization",
            "name": "Agréa",
            "logo": {
                "@type": "ImageObject",
                "url": "https://agrea.africa/logo.png" // Update with real logo URL later
            }
        }
    };

    return (
        <main style={{ background: "var(--bg-main)", minHeight: "100vh", paddingBottom: "120px" }}>
            {/* Inject JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article>
                <ArticleHeader metadata={postData.metadata} />

                <div className="container" style={{ maxWidth: "800px" }}>
                    <Prose>
                        <MDXRemote source={postData.content} components={components} />
                    </Prose>
                </div>
            </article>
        </main>
    );
}
