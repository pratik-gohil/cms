// @ts-nocheck
import prisma from "$lib/prisma";
import { slugify } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

import { BASE_URL } from "$env/static/private";
import type { ArticleCategory, ArticleWithCategory } from "$lib/types/Article"
import type { LoadEvent } from "@sveltejs/kit";

export async function load({ params }: LoadEvent): Promise<{ id: String | undefined, categories: ArticleCategory[], article: ArticleWithCategory }> {
    const categoryResponse = await fetch(BASE_URL + '/api/categories')
    const { categories } = await categoryResponse.json();

    const articleResponse = await fetch(BASE_URL + "/api/article/" + params.id)
    const { article } = await articleResponse.json();

    return { id: params.id, categories, article }
}

export const actions = {
    create: async (event) => {
        console.log(event)
        const formData = await event.request.formData()

        let data = {};
        formData.forEach((value, key) => data[key] = value);

        data = {
            ...data,
            articleIsActive: data.articleIsActive === "true" || false,
            articleHrefURL: slugify(data.articleTitle),
            articleCategory: {
                connect: {
                    id: data.articleCategoryId
                }
            }
        }

        delete data.articleCategoryId

        const article = await prisma.article.create({
            data,
        })

        console.log(article)

        throw redirect(303, '/article/' + article.id)
    },
    update: async (event) => {
        const formData = await event.request.formData()

        let data = {};
        formData.forEach((value, key) => data[key] = value);

        data = {
            ...data,
            articleIsActive: data.articleIsActive === "true" || false,
            articleHrefURL: slugify(data.articleTitle),
            articleCategory: {
                connectOrCreate: {
                    where: {

                        id: data.articleCategoryId
                    },
                    create: {

                        name: "Amy"
                    }
                }
            }
        }

        delete data.articleCategoryId

        await prisma.article.update({
            where: {
                id: event.params.id
            },
            data,
        })

        return { success: true };
    },
};