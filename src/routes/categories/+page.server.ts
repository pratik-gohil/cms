import { BASE_URL } from '$env/static/private';
import type { ArticleCategory } from '$lib/types/Article';
import type { Category } from '$lib/types/Category';

export async function load(): Promise<{ categories: Category[] }> {
	const response = await fetch(BASE_URL + '/api/categories');
	const { categories } = await response.json();
	return { categories };
}
