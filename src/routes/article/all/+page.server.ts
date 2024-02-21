import { BASE_URL } from "$env/static/private";
import type { ArticleIdentifierWithCategory } from "$lib/types/common"
import type { RequestEvent } from "./$types";

export async function load(e: RequestEvent): Promise<{
    articles: ArticleIdentifierWithCategory[],
    count: number
}> {
    const response = await fetch(BASE_URL + '/api/article/all' + e.url.search)
    const { articles, count } = await response.json();

    return { articles, count }
}