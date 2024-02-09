import prisma from "$lib/prisma";
import { slugify } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

import { BASE_URL } from "$env/static/private";
import type { ArticleCategory, ArticleWithCategory } from "$lib/types/Article"
import type { LoadEvent } from "@sveltejs/kit";
import type { SuperValidated } from "sveltekit-superforms";
import { getFormSchemaWithDefaults, type FormSchema, formSchema } from "./schema";
import { actionResult, superValidate } from "sveltekit-superforms/client";
import { Prisma } from "@prisma/client";
import type { RequestEvent } from "./$types";
import { writeFileSync } from "fs";

export async function load({ params }: LoadEvent): Promise<{ id: String | undefined, categories: ArticleCategory[], article: ArticleWithCategory, form: SuperValidated<FormSchema> }> {
    const categoryResponse = await fetch(BASE_URL + '/api/categories')
    const { categories } = await categoryResponse.json();

    const articleResponse = await fetch(BASE_URL + "/api/article/" + params.id)
    const { article } = await articleResponse.json();

    let form;
    const formSchema = getFormSchemaWithDefaults(article)
    form = await superValidate(formSchema)

    return { id: params.id, categories, article, form }
}

const retriveArticleData = (formData: FormData) => {
    let data: Prisma.articleCreateInput & { articleImage?: File, articleCategoryId?: string, __superform_id?: string, publish?: boolean } = {
        articleContents: "",
        articleTitle: "",
        articleImageSrc: "",
        articleHrefURL: "",
        articleImageAlt: "",
        articleImageTitle: "",
        articleShortDescription: "",
        articleIsActive: false
    };

    formData.forEach((value, key) => {
        // @ts-ignore
        data[key] = key === "publish" ? JSON.parse(value) : value
    });

    data = {
        ...data,
        articleHrefURL: slugify(data.articleTitle),
        articleImageSrc: data.articleImage?.name || ""
    }

    return data
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
        const formData = await event.request.formData()
        await handleActionError(formData)

        const { articleTitle,
            articleImageSrc,
            articleImageAlt,
            articleImageTitle,
            articleShortDescription,
            articleIsActive, articleHrefURL, articleCategoryId, articleContents } = retriveArticleData(formData);

        const article = await prisma.article.create({
            data: {
                articleContents,
                articleTitle,
                articleImageSrc,
                articleHrefURL,
                articleImageAlt,
                articleImageTitle,
                articleShortDescription,
                articleIsActive,
                articleCategory: {
                    connect: {
                        id: articleCategoryId
                    }
                }

            },
        })

        actionResult('redirect', '/article/' + article.id, 303);

        throw redirect(303, '/article/' + article.id)
    },
    update: async (event: RequestEvent) => {
        const formData = await event.request.formData()
        const form = await handleActionError(formData);

        const { articleTitle,
            articleImageSrc,
            articleImage,
            articleImageAlt,
            articleImageTitle,
            articleShortDescription,
            articleHrefURL, articleCategoryId, publish, articleContents } = retriveArticleData(formData);

        if (articleImage && articleImage.size > 0) {
            writeFileSync(`static/articles/${articleImage.name}`, Buffer.from(await articleImage.arrayBuffer()));
        }

        await prisma.article.update({
            where: {
                id: event.params.id
            },
            data: {
                articleContents,
                articleTitle,
                articleHrefURL,
                ...(articleImage && articleImage.size > 0 && {
                    articleImageSrc,
                    articleImageAlt,
                    articleImageTitle
                }),
                articleShortDescription,
                articleIsActive: publish,
                articleCategory: {
                    connect: {
                        id: articleCategoryId
                    }
                },
            },
        })

        actionResult('success', { form });
    },
};