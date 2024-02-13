import prisma from "$lib/prisma";
import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { retriveArticleData } from "$lib/utils/article";

export async function POST(event: RequestEvent) {
    const formData = (await event.request.formData())

    const { articleTitle,
        articleImageSrc,
        articleImageAlt,
        articleImageTitle,
        articleShortDescription,
        isPublished, articleHrefURL, articleCategoryId, articleContents } = retriveArticleData(formData);

    const article = await prisma.article.create({
        data: {
            articleContents,
            articleTitle,
            articleImageSrc,
            articleHrefURL,
            articleImageAlt,
            articleImageTitle,
            articleShortDescription,
            isPublished,
            articleCategory: {
                connect: {
                    id: articleCategoryId
                }
            },
            article_identifier: {
                create: {}
            },
        },
        include: {
            article_identifier: true
        }
    })

    throw redirect(303, '/article/' + article.article_identifier[0].id)
}