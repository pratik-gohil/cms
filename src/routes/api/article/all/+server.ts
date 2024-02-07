import prisma from "$lib/prisma";

export async function GET() {
    const articles = await prisma.article.findMany({
        select: {
            id: true,
            articleTitle: true,
            articleShortDescription: true,
            articlePublishDate: true,
            articleImageSrc: true,
            articleCategory: true,
            articleIsActive: true,
        }
    })

    return new Response(JSON.stringify({ success: true, articles }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}