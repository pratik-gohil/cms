import prisma from "$lib/prisma";
import { slugify } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

export async function POST(event) {
    const formData = (await event.request.formData())

    var data = {};
    formData.forEach((value, key) => data[key] = value);

    // console.log(data)

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

    console.log(article)

    throw redirect(303, '/article/' + article.id)

    // return new Response(JSON.stringify({ success: true, article }), {
    //     status: 200,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
}