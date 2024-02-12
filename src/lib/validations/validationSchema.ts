import { z } from 'zod';

export const categoryFormSchema = z.object({
	name: z.string().min(3).max(250),
	slug: z.string().min(3).max(250),
	status: z.number()
});

export type CategoryFormType = typeof categoryFormSchema;
