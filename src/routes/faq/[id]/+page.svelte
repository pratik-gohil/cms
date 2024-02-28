<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Selected } from 'bits-ui';
	import { formSchema, type FormSchema } from './schema';
	import type { FormOptions } from 'formsnap';
	import { onMount } from 'svelte';
	import FormLayout from '$lib/components/FormLayout/FormLayout.svelte';
	import QuillEditor from '$lib/components/QuillEditor/QuillEditor.svelte';
	import { slugify } from '$lib/utils/common';

	export let data;
	$: ({faq} = data)
	// function handleFaqInput(e){
	// 	console.log(e.target.value)
	// }
	
	
</script>


<div>
	{JSON.stringify(data)}
</div>
<!-- 
 <FormLayout
	let:config
	entry={faq}
	id={faq.id}
	action={data.id === 'new' ? '?/create' : '?/update'}
	form={data.form}
	{options}
	{formSchema}
	title="Faq"
	>
	<div class="flex flex-col gap-4 lg:flex-row">
		<div class="flex-1">
			<Form.Field {config} name="name">
				<Form.Item>
					<Form.Label>Title</Form.Label>
					<Form.Input on:input={handleFaqInput} />
					<Form.Validation />
				</Form.Item>
			</Form.Field>
	</div>
	
</FormLayout>  -->
