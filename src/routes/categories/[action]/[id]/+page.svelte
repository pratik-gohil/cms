<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import type { Selected } from 'bits-ui';
	import type { FormOptions } from 'formsnap';
	import { Check,DotFilled, Reload, Trash } from 'radix-icons-svelte';
	import { onMount } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { cn, slugify } from '$lib/utils/common.js';
    import {categoryFormSchema} from '../schema'
	
	export let data ; 
    $: ({form}=data)
    
    $: slug = data.category.slug
    
    const handleChange = (e:InputEvent)=>{
        console.log(e.target.value)
    }

</script>


<div class="mb-4 flex justify-between">
    <span class="text-xl font-semibold">Category : {data.category.name} </span>
    <div>
        <Form.Button
            type="submit"
            name="save"
            value={(!data.id).toString()}
            class="text-sm"
        >
            {#if data.id}
                save
            {:else}
                add
            {/if}
        </Form.Button>
    </div>
</div>

<Form.Root method="POST" form={form} schema={categoryFormSchema} let:config>
    <Form.Field {config} name='name'>
      <Form.Item>
        <Form.Label>Category Name</Form.Label>
        <Form.Input name='name' 
         on:input={handleChange}  
         />
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <Form.Field {config} name='slug'>
        <Form.Item>
            <Form.Label>slug</Form.Label>
            <Form.Input  name='slug' 
            bind:value={slug} 
            disabled/>
            <Form.Validation />
          </Form.Item>
    </Form.Field>
    <Form.Field {config} name='status'>
        <Form.Item
        class="flex flex-row items-center justify-between rounded-lg border p-4"
      >
        <div class="space-y-0.5">
          <Form.Label class={data.category.status ? 'text-green-600':'text-gray-600'}>Active Status</Form.Label>
          <Form.Description>
            Enable the category.
          </Form.Description>
        </div>
        <Form.Switch value={data.category?.status}  />
      </Form.Item>
    </Form.Field>

    <Form.Button class='my-4'>{data.id ? 'save' :'submit' }</Form.Button>
  </Form.Root>



<div class="flex h-fit min-w-[300px] flex-col gap-4">
    <div
        class={cn('flex items-center rounded border p-3', {
            'text-blue-500': !data.category?.status,
            'text-green-500': data.category?.status
        })}
    >
        <DotFilled size={20} /> Editing {data.category?.status==1 ? 'published' : 'draft'} version
    </div>
    <div class="flex flex-col gap-4 bg-secondary p-4">
        <h1 class="font-semibold">Information:</h1>
        <Separator />
        <p class="text-secondary-foreground">
            Create At: {data.category?.createdAt
                ? new Date(data.category.createdAt).toDateString()
                : '-'}
        </p>
        <p class="text-secondary-foreground">By: Admin</p>
        <p class="text-secondary-foreground">
            Last Update: {data.category?.updatedAt
                ? new Date(data.category.updatedAt).toDateString()
                : '-'}
        </p>
        <p class="text-secondary-foreground">By: Admin</p>
        <p class="text-secondary-foreground">
            Publish At: {data.category?.createdAt
                ? new Date(data.category.createdAt).toDateString()
                : '-'}
        </p>
    </div>
    <!-- <Button type="submit" formaction="?/delete" variant="destructive" class="px-10"
        >Delete Article <Trash size={20} /></Button
    > -->
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
