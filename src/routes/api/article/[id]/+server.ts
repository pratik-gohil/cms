import prisma from "$lib/prisma";
import type { ServerLoadEvent } from "@sveltejs/kit";

export async function GET({ params }: ServerLoadEvent) {
    const article = await prisma.article_identifier.findUnique({
        where: {
            id: Number(params.id),
        },
        select: {
            id: true,
            article: {
                include: {
                    articleCategory: true
                }
            }
        }
    })

    return new Response(JSON.stringify({ success: true, ...article }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}