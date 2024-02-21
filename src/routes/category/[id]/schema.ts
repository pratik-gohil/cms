import type { ArticleWithCategory } from '$lib/types/common';
import { z } from 'zod';

const schemaObj = {
	name: z.string().min(3)
};

export const formSchema = z.object(schemaObj);

export const getFormSchemaWithDefaults = (article: ArticleWithCategory) => {
	const schemaObjWithDefaults =
		// @ts-ignore
		Object.keys(schemaObj).reduce((a, i) => ({ ...a, [i]: schemaObj[i].default(article?.[i]) }),
			{}
		);
	return z.object(schemaObjWithDefaults);
};

export type FormSchema = typeof formSchema;
