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

export function getSortedArticlesData(lang: string = 'FR'): Article[] {
    ensureDirectoryExists();
    const targetLang = lang.toLowerCase();

    // Get file names under /src/content/articles
    const fileNames = fs.readdirSync(articlesDirectory);
    
    // Filter files for the specific language
    const filteredFiles = fileNames.filter(fileName => 
        fileName.endsWith(`.${targetLang}.mdx`) || 
        fileName.endsWith(`.${targetLang}.md`)
    );

    const allArticlesData = filteredFiles.map((fileName) => {
        // Remove language suffix and extension to get clear slug
        const slug = fileName.replace(new RegExp(`\\.${targetLang}\\.mdx?$`), '');

        // Read markdown file as string
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        return {
            slug,
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

    // We return unique base slugs regardless of language
    const baseNames = new Set(
        fileNames
            .filter(fileName => fileName.includes('.'))
            .map(fileName => fileName.split('.')[0])
    );

    return Array.from(baseNames).map(slug => ({
        params: { slug }
    }));
}

export function getArticleData(slug: string, lang: string = 'FR'): Article | null {
    ensureDirectoryExists();
    const targetLang = lang.toLowerCase();
    
    const extensions = ['mdx', 'md'];
    let fileContents = null;
    let finalPath = '';

    for (const ext of extensions) {
        const fullPath = path.join(articlesDirectory, `${slug}.${targetLang}.${ext}`);
        if (fs.existsSync(fullPath)) {
            fileContents = fs.readFileSync(fullPath, 'utf8');
            finalPath = fullPath;
            break;
        }
    }

    // Fallback to FR if current lang not found
    if (!fileContents && targetLang !== 'fr') {
        for (const ext of extensions) {
            const fallbackPath = path.join(articlesDirectory, `${slug}.fr.${ext}`);
            if (fs.existsSync(fallbackPath)) {
                fileContents = fs.readFileSync(fallbackPath, 'utf8');
                finalPath = fallbackPath;
                break;
            }
        }
    }

    if (!fileContents) return null;

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
        slug,
        metadata: matterResult.data as ArticleMetadata,
        content: matterResult.content,
    };
}
