import { BASE_URL } from '$env/static/private';
import { superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';
import { categoryFormSchema } from '../schema.js';
import { error } from '@sveltejs/kit';

// --
export async function load({ params }) {
	let form;
	let category;
	let categoryDefaults;

	if (params.action !== 'add') {
		const categoryResponse = await fetch(BASE_URL + '/api/category/' + params.id);
		category = await categoryResponse.json();
		// categoryDefaults = SchemaWithDefaults(category.category);
		if (!category.data) error(404, 'Not found');
	}
	form = await superValidate(category.data, categoryFormSchema);
	console.log(form);
	return { id: params.id, category, form };
}

export const actions = {
	// create: async (event: RequestEvent) => {
	// 	let success = false;
	// 	let article;
	// 	try {
	// 		const formData = await event.request.formData();
	// 		await handleActionError(formData);
	// 		const {
	// 			articleTitle,
	// 			articleImageSrc,
	// 			articleImageAlt,
	// 			articleImageTitle,
	// 			articleShortDescription,
	// 			articleIsActive,
	// 			articleHrefURL,
	// 			articleCategoryId,
	// 			articleContents
	// 		} = retriveArticleData(formData);
	// 		article = await prisma.article.create({
	// 			data: {
	// 				articleContents,
	// 				articleTitle,
	// 				articleImageSrc,
	// 				articleHrefURL,
	// 				articleImageAlt,
	// 				articleImageTitle,
	// 				articleShortDescription,
	// 				articleIsActive,
	// 				articleCategory: {
	// 					connect: {
	// 						id: articleCategoryId
	// 					}
	// 				}
	// 			}
	// 		});
	// 		actionResult('redirect', '/article/' + article.id, 303);
	// 		success = true;
	// 	} catch (err) {
	// 		success = false;
	// 		console.log(err);
	// 	}
	// 	if (success) {
	// 		throw redirect(303, '/article/' + article.id);
	// 	} else {
	// 		return fail(400);
	// 	}
	// },
	// update: async (event: RequestEvent) => {
	// 	try {
	// 		const formData = await event.request.formData();
	// 		const form = await handleActionError(formData);
	// 		const {
	// 			articleTitle,
	// 			articleImageSrc,
	// 			articleImage,
	// 			articleImageAlt,
	// 			articleImageTitle,
	// 			articleShortDescription,
	// 			articleHrefURL,
	// 			articleCategoryId,
	// 			publish,
	// 			articleContents
	// 		} = retriveArticleData(formData);
	// 		if (articleImage && articleImage.size > 0) {
	// 			writeFileSync(
	// 				`static/articles/${articleImage.name}`,
	// 				Buffer.from(await articleImage.arrayBuffer())
	// 			);
	// 		}
	// 		await prisma.article.update({
	// 			where: {
	// 				id: event.params.id
	// 			},
	// 			data: {
	// 				articleContents,
	// 				articleTitle,
	// 				articleHrefURL,
	// 				...(articleImage &&
	// 					articleImage.size > 0 && {
	// 						articleImageSrc,
	// 						articleImageAlt,
	// 						articleImageTitle
	// 					}),
	// 				articleShortDescription,
	// 				articleIsActive: publish,
	// 				articleCategory: {
	// 					connect: {
	// 						id: articleCategoryId
	// 					}
	// 				}
	// 			}
	// 		});
	// 		actionResult('success', { form });
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// },
	// delete: async (event: RequestEvent) => {
	// 	let success = false;
	// 	try {
	// 		await prisma.article.delete({
	// 			where: {
	// 				id: event.params.id
	// 			}
	// 		});
	// 		actionResult('redirect', '/article/all', 303);
	// 		success = true;
	// 	} catch (err) {
	// 		success = false;
	// 		console.log(err);
	// 	}
	// 	if (success) {
	// 		throw redirect(303, '/article/all');
	// 	} else {
	// 		return fail(400);
	// 	}
	// }
};
