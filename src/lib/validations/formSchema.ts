import { z } from 'zod';

const categoryObject = {
	name: z.string().min(2).max(250),
	slug: z.string().min(2).max(250),
	status: z.number().max(2)
};

export const categoryFormSchema = z.object(categoryObject);

export const getFormSchemaWithDefaults = (category: any) => {
	const schemaObjWithDefaults =
		// @ts-ignore
		Object.keys(categoryObject).reduce(
			(a, i) => ({ ...a, [i]: categoryObject[i].default(category?.[i]) }),
			{}
		);
	return z.object(schemaObjWithDefaults);
};
export type CategoryForm = typeof categoryFormSchema;
