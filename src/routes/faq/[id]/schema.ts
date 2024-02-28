import type { ArticleCategory } from '$lib/types/Category';
import { z } from 'zod';

const schemaObj = { id: z.string(), name: z.string() };

export const formSchema = z.object(schemaObj);

export const getFormSchemaWithDefaults = (category: ArticleCategory) => {
	const schemaObjWithDefaults =
		// @ts-ignore
		Object.keys(schemaObj).reduce((a, i) => ({ ...a, [i]: schemaObj[i].default(category?.[i]) }),
			{}
		);

	return z.object(schemaObjWithDefaults);
};

export type FormSchema = typeof formSchema;
