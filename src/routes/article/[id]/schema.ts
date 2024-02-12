import type { ArticleWithCategory } from "$lib/types/Article";
import { z } from "zod";

const schemaObj = {
    articleTitle: z.string().min(2).max(250),
    articleCategoryId: z.string().min(2).max(250),
    articleImage: z
        .any(),
    articleImageTitle: z.string().min(2).max(250),
    articleImageAlt: z.string().min(2).max(250),
    articleShortDescription: z.string().min(2).max(250),
    articleContents: z.string().min(2),
}

export const formSchema = z.object(schemaObj);

export const getFormSchemaWithDefaults = (article: ArticleWithCategory) => {
    const schemaObjWithDefaults =
        // @ts-ignore
        Object.keys(schemaObj).reduce((a, i) => ({ ...a, [i]: schemaObj[i].default(article?.[i]) }), {})

    return z.object(schemaObjWithDefaults)
}

export type FormSchema = typeof formSchema;