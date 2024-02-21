import prisma from "$lib/prisma";
import type { RequestEvent } from "./$types";

export async function GET(event: RequestEvent) {
    const search = (event.url.searchParams.get("search"))
    const page = Number(event.url.searchParams.get("page")) || 1
    const limit = Number(event.url.searchParams.get("limit")) || 15

    const articlesCountTransaction = await prisma.$transaction([
        prisma.article_identifier.count({
            where: {
                article: {
                    articleTitle: {
                        ...(search && {
                            contains: search,
                            mode: 'insensitive',
                        })
                    }
                }
            },
        }),
        prisma.article_identifier.findMany({
            take: limit,
            skip: limit * (page - 1),
            where: {
                article: {
                    articleTitle: {
                        ...(search && {
                            contains: search,
                            mode: 'insensitive',
                        })
                    }
                }
            },
            select: {
                id: true,
                article: {
                    include: {
                        articleCategory: true,
                    }
                }
            }
        }),
    ])

    const [count, articles] = articlesCountTransaction;

    return new Response(JSON.stringify({ success: true, articles, count }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}