import prisma from "$lib/prisma";
import { slugify } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

export async function POST(event) {
    const formData = (await event.request.formData())

    var data = {};
    formData.forEach((value, key) => data[key] = value);

    data = {
        ...data,
        articleIsActive: data.articleIsActive === "true" || false,
        articlePublishDate: data.articleIsActive ? new Date() : "",
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

    throw redirect(303, '/article/' + article.id)
}