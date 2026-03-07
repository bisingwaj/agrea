import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article, ArticleMetadata } from '@/types/article';

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

// Assure that the directory exists
export function ensureDirectoryExists() {
    if (!fs.existsSync(articlesDirectory)) {
        fs.mkdirSync(articlesDirectory, { recursive: true });
    }
}

export function getSortedArticlesData(): Article[] {
    ensureDirectoryExists();

    // Get file names under /src/content/articles
    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .map((fileName) => {
            // Remove ".mdx" from file name to get id
            const id = fileName.replace(/\.mdx?$/, '');

            // Read markdown file as string
            const fullPath = path.join(articlesDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // Use gray-matter to parse the post metadata section
            const matterResult = matter(fileContents);

            // Combine the data with the id
            return {
                slug: id,
                metadata: matterResult.data as ArticleMetadata,
                content: matterResult.content,
            };
        });

    // Sort articles by date
    return allArticlesData.sort((a, b) => {
        if (a.metadata.date < b.metadata.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllArticleSlugs() {
    ensureDirectoryExists();
    const fileNames = fs.readdirSync(articlesDirectory);

    return fileNames
        .filter(fileName => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
        .map((fileName) => {
            return {
                params: {
                    slug: fileName.replace(/\.mdx?$/, ''),
                },
            };
        });
}

export function getArticleData(slug: string): Article | null {
    ensureDirectoryExists();
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`);
    const fallbackPath = path.join(articlesDirectory, `${slug}.md`);

    let fileContents;
    try {
        fileContents = fs.readFileSync(fullPath, 'utf8');
    } catch (e) {
        try {
            fileContents = fs.readFileSync(fallbackPath, 'utf8');
        } catch (err) {
            return null;
        }
    }

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
        slug,
        metadata: matterResult.data as ArticleMetadata,
        content: matterResult.content,
    };
}
