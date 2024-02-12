import type { ArticleWithCategory } from '$lib/types/Article';
import { z } from 'zod';

// const MAX_FILE_SIZE = 15000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const formSchema = z.object({
	articleTitle: z.string().min(2).max(250),
	articleCategoryId: z.string().min(2).max(250),
	articleImage: z.any(),
	// .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
	// .refine(
	//     (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
	//     "Only .jpg, .jpeg, .png and .webp formats are supported."
	// ),
	articleImageTitle: z.string().min(2).max(250),
	articleImageAlt: z.string().min(2).max(250),
	articleShortDescription: z.string().min(2).max(250)
});

export const getFormSchemaWithDefaults = (article: ArticleWithCategory) =>
	z.object({
		articleTitle: z.string().min(2).max(250).default(article?.articleTitle),
		articleCategoryId: z
			.string()
			.min(2)
			.max(250)
			.default(article?.articleCategory.id as string),
		articleImageSrc: z.string().min(2).max(250).default(article?.articleImageSrc),
		articleImageTitle: z.string().min(2).max(250).default(article?.articleImageTitle),
		articleImageAlt: z.string().min(2).max(250).default(article?.articleImageAlt),
		articleShortDescription: z.string().min(2).max(250).default(article?.articleShortDescription)
	});

export type FormSchema = typeof formSchema;
