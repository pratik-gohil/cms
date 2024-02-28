import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

import { BASE_URL } from '$env/static/private';
import type { ArticleCategory } from '$lib/types/Category';
import type { ArticleIdentifierWithCategory } from '$lib/types/common';
import type { LoadEvent } from '@sveltejs/kit';
import type { SuperValidated } from 'sveltekit-superforms';
import { getFormSchemaWithDefaults, type FormSchema, formSchema } from './schema';
import { actionResult, superValidate } from 'sveltekit-superforms/client';
import type { RequestEvent } from './$types';
import { writeFileSync } from 'fs';
import { retriveArticleData } from '$lib/utils/article';
import { createArticle } from '$lib/controllers/Article';

export async function load({ params }) {
	let faq;
	let form;
	let formSchemaWithDefaults;

	// if (params.id !== 'new') {
	const get_faq = await fetch(BASE_URL + "/api/faqs/" + (params.id))
	const res = await get_faq.json()
	return { id: params.id, faq: res.faq };
}

const handleActionError = async (formData: FormData) => {
	const form = await superValidate(formData, formSchema);
	if (!form.valid) {
		return actionResult('failure', { form });
	}
	return form;
};
