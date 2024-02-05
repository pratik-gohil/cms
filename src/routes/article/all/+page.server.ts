import { BASE_URL } from "$env/static/private";
import type { ArticleWithCategory } from "$lib/types/Article"

export async function load(): Promise<{ articles: ArticleWithCategory[] }> {
    const response = await fetch(BASE_URL + '/api/article/all')
    const { articles } = await response.json();

    return { articles }
}