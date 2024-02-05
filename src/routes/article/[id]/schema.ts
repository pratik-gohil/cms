import type { ArticleWithCategory } from "$lib/types/Article";
import { z } from "zod";

export const formSchema = z.object({
    articleTitle: z.string().min(2).max(250),
    articleCategoryId: z.string().min(2).max(250),
    articleImageSrc: z.string().min(2).max(250),
    articleImageTitle: z.string().min(2).max(250),
    articleImageAlt: z.string().min(2).max(250),
    articleShortDescription: z.string().min(2).max(250),
});

export const getFormSchemaWithDefaults = (article: ArticleWithCategory) => (z.object({
    articleTitle: z.string().min(2).max(250).default(article.articleTitle),
    articleCategoryId: z.string().min(2).max(250).default(article.articleCategory.id as string),
    articleImageSrc: z.string().min(2).max(250).default(article.articleImageSrc),
    articleImageTitle: z.string().min(2).max(250).default(article.articleImageTitle),
    articleImageAlt: z.string().min(2).max(250).default(article.articleImageAlt),
    articleShortDescription: z.string().min(2).max(250).default(article.articleShortDescription),
}))

export type FormSchema = typeof formSchema;