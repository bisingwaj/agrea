export interface ArticleMetadata {
    title: string;
    description: string;
    date: string;
    author: string;
    authorRole: string;
    category: string;
    image: string;
    tags: string[];
    readTime: string;
}

export interface Article {
    slug: string;
    metadata: ArticleMetadata;
    content: string; // The raw markdown content
}
