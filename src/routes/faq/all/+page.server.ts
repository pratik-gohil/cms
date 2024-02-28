import { BASE_URL } from '$env/static/private';
import type { ArticleCategory } from '$lib/types/Category';

export async function load() {
	const response = await fetch(BASE_URL + '/api/faqs');
	const {faqs}  = await response.json();
	return { faqs };
}
