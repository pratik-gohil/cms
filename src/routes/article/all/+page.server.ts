import { BASE_URL } from "$env/static/private";
import type { ArticleIdentifierWithCategory } from "$lib/types/common"
import type { RequestEvent } from "./$types";

export async function load(e: RequestEvent): Promise<{
    articles: [number, ArticleIdentifierWithCategory[]]
}> {
    const response = await fetch(BASE_URL + '/api/article/all' + e.url.search)
    const { articles } = await response.json();

    return { articles }
}