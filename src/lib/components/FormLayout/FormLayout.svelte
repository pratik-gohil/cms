<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { DotFilled, Trash } from 'radix-icons-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import type { z } from 'zod';
	import type { FormOptions } from 'formsnap';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { cn } from '$lib/utils/common';

	export let id: String | number | undefined,
		action: string,
		formSchema: z.AnyZodObject,
		form: SuperValidated<typeof formSchema>,
		options: FormOptions<typeof formSchema>,
		entry: any,
		title: string;
</script>

<Form.Root
	method="POST"
	{action}
	class="grid gap-4"
	{form}
	{options}
	schema={formSchema}
	let:config
	enctype="multipart/form-data"
>
	<div class="mb-4 flex justify-between">
		<span class="text-xl font-semibold">{title} :</span>
		<slot name="action-buttons" />
	</div>

	<div class="flex flex-col gap-4 lg:flex-row">
		<div class="flex-1">
			<slot name="form" {config} />
		</div>
		<div class="flex h-fit min-w-[300px] flex-col gap-4">
			<div
				class={cn('flex items-center rounded border p-3', {
					'text-blue-500': !entry?.isPublished,
					'text-green-500': entry?.isPublished
				})}
			>
				<DotFilled size={20} /> Editing {entry?.isPublished ? 'published' : 'draft'} version
			</div>
			<div class="flex flex-col gap-4 bg-secondary p-4">
				<h1 class="font-semibold">Information:</h1>
				<Separator />
				<p class="text-secondary-foreground">
					Create At: {entry?.createdAt ? new Date(entry?.createdAt).toDateString() : '-'}
				</p>
				<p class="text-secondary-foreground">By: Admin</p>
				<p class="text-secondary-foreground">
					Last Update: {entry?.updatedAt ? new Date(entry?.updatedAt).toDateString() : '-'}
				</p>
				<p class="text-secondary-foreground">By: Admin</p>
				<p class="text-secondary-foreground">
					Publish At: {entry?.createdAt ? new Date(entry?.createdAt).toDateString() : '-'}
				</p>
			</div>

			<Button
				disabled={id === 'new'}
				type="submit"
				formaction="?/delete"
				variant="destructive"
				class="px-10">Delete {title} <Trash size={20} /></Button
			>
		</div>
	</div>
</Form.Root>
