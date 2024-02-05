<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Selected } from 'bits-ui';
	import { formSchema, type FormSchema } from './schema';
	export let data;
	import type { FormOptions } from 'formsnap';
	import { Check, Reload } from 'radix-icons-svelte';

	let form = data.form;

	let selected: Selected<any> = {
		value: data.article?.articleCategory.id as string,
		label: data.article?.articleCategory.name as string
	};

	const options: FormOptions<FormSchema> = {
		onSubmit() {
			loading = true;
			console.log(form);
		},
		onResult({ result }) {
			loading = false;
			if (result.status === 200) alert('Success!');
			if (result.status === 400) alert('Error!');
		}
	};

	let loading = false;
</script>

<Form.Root
	method="POST"
	action={data.id === 'new' ? '?/create' : '?/update'}
	class="grid max-w-[460px] gap-4"
	{form}
	{options}
	schema={formSchema}
	let:config
	on:input={(e) => console.log(form)}
>
	<div class="mb-4 flex justify-between">
		<span class="text-xl font-semibold">Articles :</span>
		<div>
			<Form.Button disabled={!data.id} type="submit" value="publish" class="text-sm">
				<Check class="mr-2 h-3 w-3" />
				{#if loading}
					Publish
				{:else}
					Un-Publish
				{/if}
			</Form.Button>
			<Form.Button type="submit" value="save" class="text-sm" disabled={loading}>
				{#if loading}
					<Reload class="mr-2 h-3 w-3 animate-spin" />
				{/if}
				Save</Form.Button
			>
		</div>
	</div>
	<Form.Field {config} name="articleTitle">
		<Form.Item>
			<Form.Label>Title</Form.Label>
			<Form.Input value={data.article?.articleTitle} />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="articleCategoryId">
		<Form.Item>
			<Form.Label>Category:</Form.Label>
			<Form.Select bind:selected>
				<Form.SelectTrigger placeholder="Select a Category" />
				<Form.SelectContent>
					<Form.SelectGroup>
						<Form.SelectLabel>Categories</Form.SelectLabel>
						{#each data.categories as category}
							<Form.SelectItem value={category.id}>{category.name}</Form.SelectItem>
						{/each}
					</Form.SelectGroup>
				</Form.SelectContent>
			</Form.Select>
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="articleImageSrc">
		<Form.Item>
			<Form.Label>Image Path</Form.Label>
			<Form.Input value={data.article?.articleImageSrc} />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="articleImageAlt">
		<Form.Item>
			<Form.Label>Image Alt</Form.Label>
			<Form.Input value={data.article?.articleImageAlt} />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="articleImageTitle">
		<Form.Item>
			<Form.Label>Image Title</Form.Label>
			<Form.Input value={data.article?.articleImageTitle} />
			<Form.Validation />
		</Form.Item>
	</Form.Field>
	<Form.Field {config} name="articleShortDescription">
		<Form.Item>
			<Form.Label>Short Description</Form.Label>
			<Form.Textarea
				placeholder="Short Description"
				value={data.article?.articleShortDescription}
			/>
			<Form.Validation />
		</Form.Item>
	</Form.Field>
</Form.Root>
