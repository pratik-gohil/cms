import prisma from "$lib/prisma";
import { retriveArticleData } from "$lib/utils/article";
import { writeFileSync } from "fs";

export const createArticle = async (formData: FormData) => {
    const { articleTitle,
        articleImage,
        articleImageSrc,
        articleImageAlt,
        articleImageTitle,
        articleShortDescription,
        isPublished, articleHrefURL, articleCategoryId, articleContents, redirectionURL, pageTitle, pageDescription } = retriveArticleData(formData);

    if (articleImage && articleImage.size > 0) {
        writeFileSync(`static/articles/${articleImage.name}`, Buffer.from(await articleImage.arrayBuffer()));
    }

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
            redirectionURL,
            pageTitle, pageDescription,
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

    return article
}