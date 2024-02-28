import prisma from "$lib/prisma";
import type { ArticleIdentifier } from "$lib/types/Article";
import type { ArticleWithCategory } from "$lib/types/common";
import type { RequestEvent } from "./$types";

export async function GET(event: RequestEvent) {
    const search = (event.url.searchParams.get("search"))
    const page = Number(event.url.searchParams.get("page")) || 1
    const limit = Number(event.url.searchParams.get("limit")) || 15

    const articlesCountTransaction = await prisma.$transaction([
        prisma.article.count({
            where: {
                articleTitle: {
                    ...(search && {
                        contains: search,
                        mode: 'insensitive',
                    })
                }
            },
        }),
        prisma.article.findMany({
            take: limit,
            skip: limit * (page - 1),
            where: {
                articleTitle: {
                    ...(search && {
                        contains: search,
                        mode: 'insensitive',
                    })
                }
            },
            include: {
                articleCategory: true,
                article_identifier: {
                    select: {
                        id: true,
                    },
                }
            }
        })
    ])

    let [count, articles] = articlesCountTransaction;

    articles = articles.map((article: (ArticleWithCategory & { article_identifier: ArticleIdentifier })) => ({
        ...article,
        articleCategory: article.articleCategory.name,
        article_identifier: article.article_identifier.id
    }))

    return new Response(JSON.stringify({ success: true, articles, count }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}