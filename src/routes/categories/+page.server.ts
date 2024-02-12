import { BASE_URL } from '$env/static/private';
import type { ArticleCategory } from '$lib/types/Article';

export async function load(): Promise<{ categories: ArticleCategory[] }> {
	const response = await fetch(BASE_URL + '/api/categories');
	const { categories } = await response.json();
	return { categories };
}
