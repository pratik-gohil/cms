<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Selected } from 'bits-ui';
	import { formSchema, type FormSchema } from './schema';
	import type { FormOptions } from 'formsnap';
	import { onMount } from 'svelte';
	import FormLayout from '$lib/components/FormLayout/FormLayout.svelte';
	import QuillEditor from '$lib/components/QuillEditor/QuillEditor.svelte';
	import { slugify } from '$lib/utils/common';
	import CommonTab from '$lib/components/CommonTab/CommonTab.svelte';
	import { Reload } from 'radix-icons-svelte';
	// import { BASE_URL } from '$env/static/private';

	export let data;
	$: ({ form, category } = data);
	let  name = ''
	let tabActive  : string 
	$: tabActive = ''

	const options: FormOptions<FormSchema> = {
		async onSubmit() {
			loading = true;
		},
		onResult({ result }) {
			loading = false;
			if (result.status === 204) alert('Success!');
			if (result.status === 400) alert('Error!');
		}
	};
	let loading = false;
	function handleTitleInput (e:any){
		const  slug =  slugify(e.target?.value)
		name = e.target.value
	}

	function setActiveTab(tab=''){
		tabActive =  tab 
	}

	
</script>


<FormLayout
	entry={category}
	id={data.id}
	action={data.id === 'new' ? '?/create' : '?/update'}
	form={form}
	{options}
	{formSchema}
	title="Category"
	>
	<!-- {(tabActive)} -->

	
	<div slot="action-buttons">
		<Form.Button
		disabled= {!name}
			type="submit"
			name="Create"
			class="text-sm"
		>
		Save
		</Form.Button>
		
	</div>

	<div slot="form" let:config>
		<div class="flex flex-col gap-4 lg:flex-col">
			<div class="flex-1">
				<Form.Field {config} name="name">
					<Form.Item>
						<Form.Label>Title</Form.Label>
						<Form.Input on:input={handleTitleInput} />
						<Form.Validation />
					</Form.Item>
				</Form.Field>
			</div>
			
	</div>
		<!-- <CommonTab entry ={category} setActiveTab={setActiveTab} sections={['Articles','Faqs']} /> -->
</FormLayout>
