import prisma from "$lib/prisma";
import { retriveArticleData } from "$lib/utils/article";

export const createArticle = async (formData: FormData) => {
    const { articleTitle,
        articleImageSrc,
        articleImageAlt,
        articleImageTitle,
        articleShortDescription,
        isPublished, articleHrefURL, articleCategoryId, articleContents, redirectionURL, pageTitle, pageDescription } = retriveArticleData(formData);

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