import { BASE_URL } from "$env/static/private";
import type { Article } from "$lib/types/Article";
import type { RequestEvent } from "./$types";

export async function load(e: RequestEvent): Promise<{
    articles: (Article & { articleCategory: string } & { article_identifier: number })[],
    count: number
}> {
    const response = await fetch(BASE_URL + '/api/article/all' + e.url.search)
    const { articles, count } = await response.json();

    return { articles, count }
}