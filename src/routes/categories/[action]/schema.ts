import { z } from 'zod';

const schemaObj = {
	name: z.string().min(2).max(250),
	slug: z.string().min(2).max(250),
	status: z.number().max(2)
};

export const formSchema = z.object(schemaObj);

export const getFormSchemaWithDefaults = (category: any) => {
	const schemaObjWithDefaults =
		// @ts-ignore
		Object.keys(schemaObj).reduce(
			(a, i) => ({ ...a, [i]: schemaObj[i].default(category?.[i]) }),
			{}
		);
	return z.object(schemaObjWithDefaults);
};
export type CategoryForm = typeof formSchema;
