import prisma from "$lib/prisma";

export async function GET() {
    const articles = await prisma.article_identifier.findMany({
        include: {
            article: {
                include: {
                    articleCategory: true,
                }
            }
        }
    })

    return new Response(JSON.stringify({ success: true, articles }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}