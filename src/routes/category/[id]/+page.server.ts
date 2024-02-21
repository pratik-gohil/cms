import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { ArticleCategory } from '$lib/types/Category';

import type { LoadEvent } from '@sveltejs/kit';
import type { SuperValidated } from 'sveltekit-superforms';
import { getFormSchemaWithDefaults, type FormSchema, formSchema } from './schema';
import { actionResult, superValidate } from 'sveltekit-superforms/client';
import type { RequestEvent } from './$types';


export async function load({ params }: LoadEvent): Promise<{
	id: String | undefined;
	category: ArticleCategory;
	form: SuperValidated<FormSchema>;
}> {
	let category;
	let form;
	let formSchemaWithDefaults;
	if (params.id !== 'new') {
		// const categoryResponse = await fetch(BASE_URL + "/api/article/" + params.id)
		const categoryResponse = await prisma.category.findUnique({
			where: {
				id: params.id
			}
		});
		category = categoryResponse
		formSchemaWithDefaults = getFormSchemaWithDefaults(categoryResponse);
	}
	form = await superValidate(category,formSchema);
	return { id: params.id, category, form };
}

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
		let category;
		try {
			const formData = await event.request.formData();
			await handleActionError(formData);
			category = await prisma.category.create({
				data: {
					name: formData.get('name')
				}
			});
			actionResult('redirect', '/category/all');
			success = true;
		} catch (err) {
			success = false;
			console.log(err);
		}

		if (success) {
			throw redirect(303, '/category/all');
		} else {
			return fail(400);
		}
	},
	update: async (event: RequestEvent) => {
		let success = false;
		let category;
		try {
			const formData = await event.request.formData();
			await handleActionError(formData);
			
			
			category = await prisma.category.update({
				where: {
					id: event.params.id
				},
				data: {
					name: formData.get('name')
				}
			});
			actionResult('redirect', '/category/all');
			success = true;
		} catch (err) {
			success = false;
			console.log(err);
		}

		if (success) {
			throw redirect(303, '/category/all');
		} else {
			return fail(400);
		}
	},
	delete: async (event: RequestEvent) => {
		let success = false;
		try {
			await prisma.category.delete({
				where: {
					id: event.params.id
				}
			});
			actionResult('redirect', '/category/all', 303);
			success = true;
		} catch (err) {
			success = false;
			console.log(err);
		}
		if (success) {
			throw redirect(303, '/category/all');
		} else {
			return fail(400);
		}
	}
};
