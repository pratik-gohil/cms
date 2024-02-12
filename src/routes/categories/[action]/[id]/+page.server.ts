// import prisma from '$lib/prisma';
// import { slugify } from '$lib/utils';
// import { fail, redirect } from '@sveltejs/kit';

import { BASE_URL } from '$env/static/private';
// import type { ArticleCategory, ArticleWithCategory } from '$lib/types/Article';
// import type { LoadEvent } from '@sveltejs/kit';
// import type { SuperValidated } from 'sveltekit-superforms';

// import { actionResult, superValidate } from 'sveltekit-superforms/client';
// import { Prisma } from '@prisma/client';
// import type { RequestEvent } from './$types';
// import { writeFileSync } from 'fs';
// import { categoryFormSchema } from '$lib/validations/validationSchema';
// import type { Category } from '$lib/types/Category';

export async function load({ params }) {
	console.log(params);
	// const categoryResponse = await fetch(BASE_URL + '/api/category/' + params.id);
	// const category = await categoryResponse.json();

	let form;
	if (params.action !== 'add') {
		const categoryResponse = await fetch(BASE_URL + '/api/category/' + params.id);
		let category = await categoryResponse.json();
		console.log(category);
		// formSchemaWithDefaults = getFormSchemaWithDefaults(article);
	}

	// form = await superValidate(categoryFormSchema);

	// return { id: params.id, action: params.action, categories, article, form };
}

// const retriveArticleData = (formData: FormData) => {
// 	let data: Prisma.articleCreateInput & {
// 		articleImage?: File;
// 		articleCategoryId?: string;
// 		__superform_id?: string;
// 		publish?: boolean;
// 	} = {
// 		articleContents: '',
// 		articleTitle: '',
// 		articleImageSrc: '',
// 		articleHrefURL: '',
// 		articleImageAlt: '',
// 		articleImageTitle: '',
// 		articleShortDescription: '',
// 		articleIsActive: false
// 	};

// 	formData.forEach((value, key) => {
// 		// @ts-ignore
// 		data[key] = key === 'publish' ? JSON.parse(value) : value;
// 	});

// 	data = {
// 		...data,
// 		articleHrefURL: slugify(data.articleTitle),
// 		articleImageSrc: data.articleImage?.name || ''
// 	};

// 	return data;
// };

// const handleActionError = async (formData: FormData) => {
// 	const form = await superValidate(formData, categoryFormSchema);
// 	if (!form.valid) {
// 		return actionResult('failure', { form });
// 	}

// 	return form;
// };

// export const actions = {
// 	create: async (event: RequestEvent) => {
// 		let success = false;
// 		let article;

// 		try {
// 			const formData = await event.request.formData();
// 			await handleActionError(formData);

// 			const {
// 				articleTitle,
// 				articleImageSrc,
// 				articleImageAlt,
// 				articleImageTitle,
// 				articleShortDescription,
// 				articleIsActive,
// 				articleHrefURL,
// 				articleCategoryId,
// 				articleContents
// 			} = retriveArticleData(formData);

// 			article = await prisma.article.create({
// 				data: {
// 					articleContents,
// 					articleTitle,
// 					articleImageSrc,
// 					articleHrefURL,
// 					articleImageAlt,
// 					articleImageTitle,
// 					articleShortDescription,
// 					articleIsActive,
// 					articleCategory: {
// 						connect: {
// 							id: articleCategoryId
// 						}
// 					}
// 				}
// 			});

// 			actionResult('redirect', '/article/' + article.id, 303);
// 			success = true;
// 		} catch (err) {
// 			success = false;
// 			console.log(err);
// 		}

// 		if (success) {
// 			throw redirect(303, '/article/' + article.id);
// 		} else {
// 			return fail(400);
// 		}
// 	},
// 	update: async (event: RequestEvent) => {
// 		try {
// 			const formData = await event.request.formData();
// 			const form = await handleActionError(formData);

// 			const {
// 				articleTitle,
// 				articleImageSrc,
// 				articleImage,
// 				articleImageAlt,
// 				articleImageTitle,
// 				articleShortDescription,
// 				articleHrefURL,
// 				articleCategoryId,
// 				publish,
// 				articleContents
// 			} = retriveArticleData(formData);

// 			if (articleImage && articleImage.size > 0) {
// 				writeFileSync(
// 					`static/articles/${articleImage.name}`,
// 					Buffer.from(await articleImage.arrayBuffer())
// 				);
// 			}

// 			await prisma.article.update({
// 				where: {
// 					id: event.params.id
// 				},
// 				data: {
// 					articleContents,
// 					articleTitle,
// 					articleHrefURL,
// 					...(articleImage &&
// 						articleImage.size > 0 && {
// 							articleImageSrc,
// 							articleImageAlt,
// 							articleImageTitle
// 						}),
// 					articleShortDescription,
// 					articleIsActive: publish,
// 					articleCategory: {
// 						connect: {
// 							id: articleCategoryId
// 						}
// 					}
// 				}
// 			});

// 			actionResult('success', { form });
// 		} catch (err) {
// 			console.log(err);
// 		}
// 	},
// 	delete: async (event: RequestEvent) => {
// 		let success = false;
// 		try {
// 			await prisma.article.delete({
// 				where: {
// 					id: event.params.id
// 				}
// 			});

// 			actionResult('redirect', '/article/all', 303);
// 			success = true;
// 		} catch (err) {
// 			success = false;
// 			console.log(err);
// 		}

// 		if (success) {
// 			throw redirect(303, '/article/all');
// 		} else {
// 			return fail(400);
// 		}
// 	}
// };
