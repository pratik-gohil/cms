import prisma from "$lib/prisma";
import { slugify } from "$lib/utils";
import { fail, redirect } from "@sveltejs/kit";

import { BASE_URL } from "$env/static/private";
import type { ArticleCategory, ArticleWithCategory } from "$lib/types/Article"
import type { LoadEvent } from "@sveltejs/kit";
import type { SuperValidated } from "sveltekit-superforms";
import { getFormSchemaWithDefaults, type FormSchema, formSchema } from "./schema";
import { actionResult, superValidate } from "sveltekit-superforms/client";
import { Prisma } from "@prisma/client";
import type { RequestEvent } from "./$types";

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
    let data: Prisma.articleCreateInput & { articleCategoryId?: string, __superform_id?: string, publish?: boolean } = {
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
        articleHrefURL: slugify(data.articleTitle)
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
            articleIsActive, articleHrefURL, articleCategoryId } = retriveArticleData(formData);

        const article = await prisma.article.create({
            data: {
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
            articleImageAlt,
            articleImageTitle,
            articleShortDescription,
            articleHrefURL, articleCategoryId, publish } = retriveArticleData(formData);

        await prisma.article.update({
            where: {
                id: event.params.id
            },
            data: {
                articleTitle,
                articleImageSrc,
                articleHrefURL,
                articleImageAlt,
                articleImageTitle,
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