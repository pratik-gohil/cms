import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { createArticle } from "$lib/controllers/Article";

export async function POST(event: RequestEvent) {
    const formData = (await event.request.formData())

    const article = await createArticle(formData)

    throw redirect(303, '/article/' + article.article_identifier[0].id)
}