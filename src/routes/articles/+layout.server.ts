import prisma from "$lib/prisma"
import type { ArticleWithCategory } from "$lib/types/Article"

export async function load(): Promise<{ articles: ArticleWithCategory[] }> {
    const articles = await prisma.article.findMany({
        include: {
            articleCategory: true
        }
    })

    return { articles }
}