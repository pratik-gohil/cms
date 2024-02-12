import prisma from '$lib/prisma';
import { slugify } from '$lib/utils';
import { fail, redirect } from '@sveltejs/kit';

import { BASE_URL } from '$env/static/private';
import type { ArticleCategory, ArticleWithCategory } from '$lib/types/Article';
import type { LoadEvent } from '@sveltejs/kit';
import type { SuperValidated } from 'sveltekit-superforms';
import { getFormSchemaWithDefaults, type FormSchema, formSchema } from './schema';
import { actionResult, superValidate } from 'sveltekit-superforms/client';
import { Prisma } from '@prisma/client';
import type { RequestEvent } from './$types';
import { writeFileSync } from 'fs';

export async function load({
	params
}: LoadEvent): Promise<{
	id: String | undefined;
	categories: ArticleCategory[];
	article?: ArticleWithCategory;
	form: SuperValidated<FormSchema>;
}> {
	const categoryResponse = await fetch(BASE_URL + '/api/categories');
	const { categories } = await categoryResponse.json();

	let article;
	let form;
	let formSchemaWithDefaults;
	if (params.id !== 'new') {
		const articleResponse = await fetch(BASE_URL + '/api/article/' + params.id);
		article = (await articleResponse.json()).article;

		formSchemaWithDefaults = getFormSchemaWithDefaults(article);
	}

	form = await superValidate(formSchemaWithDefaults || formSchema);

	return { id: params.id, categories, article, form };
}

const retriveArticleData = (formData: FormData) => {
	let data: Prisma.articleCreateInput & {
		articleImage?: File;
		articleCategoryId?: string;
		__superform_id?: string;
		publish?: boolean;
	} = {
		articleContents: '',
		articleTitle: '',
		articleImageSrc: '',
		articleHrefURL: '',
		articleImageAlt: '',
		articleImageTitle: '',
		articleShortDescription: '',
		articleIsActive: false
	};

	formData.forEach((value, key) => {
		// @ts-ignore
		data[key] = key === 'publish' ? JSON.parse(value) : value;
	});

	data = {
		...data,
		articleHrefURL: slugify(data.articleTitle),
		articleImageSrc: data.articleImage?.name || ''
	};

	return data;
};

const handleActionError = async (formData: FormData) => {
	const form = await superValidate(formData, formSchema);
	if (!form.valid) {
		return actionResult('failure', { form });
	}

	return form;
};

export const actions = {
	create: async (event: RequestEvent) => {
		let success = false;
		let article;

		try {
			const formData = await event.request.formData();
			await handleActionError(formData);

			const {
				articleTitle,
				articleImageSrc,
				articleImageAlt,
				articleImageTitle,
				articleShortDescription,
				articleIsActive,
				articleHrefURL,
				articleCategoryId,
				articleContents
			} = retriveArticleData(formData);

			article = await prisma.article.create({
				data: {
					articleContents,
					articleTitle,
					articleImageSrc,
					articleHrefURL,
					articleImageAlt,
					articleImageTitle,
					articleShortDescription,
					articleIsActive,
					articleCategory: {
						connect: {
							id: articleCategoryId
						}
					}
				}
			});

			actionResult('redirect', '/article/' + article.id, 303);
			success = true;
		} catch (err) {
			success = false;
			console.log(err);
		}

		if (success) {
			throw redirect(303, '/article/' + article.id);
		} else {
			return fail(400);
		}
	},
	update: async (event: RequestEvent) => {
		try {
			const formData = await event.request.formData();
			const form = await handleActionError(formData);

			const {
				articleTitle,
				articleImageSrc,
				articleImage,
				articleImageAlt,
				articleImageTitle,
				articleShortDescription,
				articleHrefURL,
				articleCategoryId,
				publish,
				articleContents
			} = retriveArticleData(formData);

			if (articleImage && articleImage.size > 0) {
				writeFileSync(
					`static/articles/${articleImage.name}`,
					Buffer.from(await articleImage.arrayBuffer())
				);
			}

			await prisma.article.update({
				where: {
					id: event.params.id
				},
				data: {
					articleContents,
					articleTitle,
					articleHrefURL,
					...(articleImage &&
						articleImage.size > 0 && {
							articleImageSrc,
							articleImageAlt,
							articleImageTitle
						}),
					articleShortDescription,
					articleIsActive: publish,
					articleCategory: {
						connect: {
							id: articleCategoryId
						}
					}
				}
			});

			actionResult('success', { form });
		} catch (err) {
			console.log(err);
		}
	},
	delete: async (event: RequestEvent) => {
		let success = false;
		try {
			await prisma.article.delete({
				where: {
					id: event.params.id
				}
			});

			actionResult('redirect', '/article/all', 303);
			success = true;
		} catch (err) {
			success = false;
			console.log(err);
		}

		if (success) {
			throw redirect(303, '/article/all');
		} else {
			return fail(400);
		}
	}
};
