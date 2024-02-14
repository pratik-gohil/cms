import prisma from "$lib/prisma";
import { fail, redirect } from "@sveltejs/kit";

import { BASE_URL } from "$env/static/private";
import type { ArticleCategory } from "$lib/types/Category"
import type { ArticleIdentifierWithCategory } from "$lib/types/common"
import type { LoadEvent } from "@sveltejs/kit";
import type { SuperValidated } from "sveltekit-superforms";
import { getFormSchemaWithDefaults, type FormSchema, formSchema } from "./schema";
import { actionResult, superValidate } from "sveltekit-superforms/client";
import type { RequestEvent } from "./$types";
import { writeFileSync } from "fs";
import { retriveArticleData } from "$lib/utils/article";

export async function load({ params }: LoadEvent): Promise<{ id: String | undefined, categories: ArticleCategory[], article?: ArticleIdentifierWithCategory, form: SuperValidated<FormSchema> }> {
    const categoryResponse = await fetch(BASE_URL + '/api/categories')
    const { categories } = await categoryResponse.json();

    let article
    let form;
    let formSchemaWithDefaults;
    if (params.id !== "new") {
        const articleResponse = await fetch(BASE_URL + "/api/article/" + params.id)
        article = (await articleResponse.json()).article;

        formSchemaWithDefaults = getFormSchemaWithDefaults(article.article)
    }

    form = await superValidate(formSchemaWithDefaults || formSchema)


    return { id: params.id, categories, article, form }
}


const handleActionError = async (formData: FormData) => {
    const form = await superValidate(formData, formSchema);
    if (!form.valid) {
        return actionResult('failure', { form });
    }

    return form
}

export const actions = {
    create: async (event: RequestEvent) => {
        let success = false;
        let article;

        try {
            const formData = await event.request.formData()
            await handleActionError(formData)

            const { articleTitle,
                articleImageSrc,
                articleImageAlt,
                articleImageTitle,
                articleShortDescription,
                isPublished, articleHrefURL, articleCategoryId, articleContents, redirectionURL, metaTags } = retriveArticleData(formData);

            article = await prisma.article.create({
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
                    metaTags,
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

            actionResult('redirect', '/article/' + article.article_identifier[0].id, 303);
            success = true;
        } catch (err) {
            success = false;
            console.log(err)
        }

        if (success) {
            throw redirect(303, '/article/' + article.article_identifier[0].id)
        } else {
            return fail(400);
        }
    },
    update: async (event: RequestEvent) => {
        try {
            const formData = await event.request.formData()
            const form = await handleActionError(formData);

            const { articleTitle,
                articleImageSrc,
                articleImage,
                articleImageAlt,
                articleImageTitle,
                articleShortDescription,
                articleHrefURL, articleCategoryId, publish, articleContents,
                redirectionURL,
                metaTags, } = retriveArticleData(formData);

            if (articleImage && articleImage.size > 0) {
                writeFileSync(`static/articles/${articleImage.name}`, Buffer.from(await articleImage.arrayBuffer()));
            }

            await prisma.article_identifier.update({
                where: {
                    id: Number(event.params.id)
                },
                data: {
                    article: {
                        update: {
                            articleContents,
                            articleTitle,
                            articleHrefURL,
                            ...(articleImage && articleImage.size > 0 && {
                                articleImageSrc,
                                articleImageAlt,
                                articleImageTitle
                            }),
                            articleShortDescription,
                            isPublished: publish,
                            redirectionURL,
                            metaTags,
                            articleCategory: {
                                connect: {
                                    id: articleCategoryId
                                }
                            },
                        }
                    }
                },
            })

            actionResult('success', { form });
        } catch (err) {
            console.log(err)
        }
    },
    delete: async (event: RequestEvent) => {
        let success = false;
        try {
            await prisma.article.delete({
                where: {
                    id: event.params.id
                }
            })

            actionResult('redirect', '/article/all', 303);
            success = true;
        } catch (err) {
            success = false;
            console.log(err)
        }

        if (success) {
            throw redirect(303, '/article/all')
        } else {
            return fail(400);
        }
    }
};