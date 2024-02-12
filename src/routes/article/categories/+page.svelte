<!-- <script lang="ts">
	import ArticleCard from '$lib/components/ArticleCard/ArticleCard.svelte';
  import DataTable from "./data-table.svelte";
	import Button from '$lib/components/ui/button/button.svelte';
	
    import {
    createTable,
    Subscribe,
    Render,
    createRender
  } from "svelte-headless-table";


	import { readable } from 'svelte/store';
  import {
    addSortBy,
    addPagination,
    addTableFilter,
    addSelectedRows,
    addHiddenColumns
  } from "svelte-headless-table/plugins";
  


  
  import * as Table from "$lib/components/ui/table";

  import Actions from "./data-table-actions.svelte";

  import { CaretSort, ChevronDown, Plus } from "radix-icons-svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { cn } from "$lib/utils";
  import { Input } from "$lib/components/ui/input";
  import DataTableCheckbox from "./data-table-checkbox.svelte";


  



  type Payment = {
    id: string;
    amount: number;
    status: "Pending" | "Processing" | "Success" | "Failed";
    email: string;
  };



  // const data: Payment[] = [
  //   {
  //     id: "m5gr84i9",
  //     amount: 316,
  //     status: "Success",
  //     email: "ken99@yahoo.com"
  //   },
  //   {
  //     id: "3u1reuv4",
  //     amount: 242,
  //     status: "Success",
  //     email: "Abe45@gmail.com"
  //   },
  //   {
  //     id: "derv1ws0",
  //     amount: 837,
  //     status: "Processing",
  //     email: "Monserrat44@gmail.com"
  //   },
  //   {
  //     id: "5kma53ae",
  //     amount: 874,
  //     status: "Success",
  //     email: "Silas22@gmail.com"
  //   },
  //   {
  //     id: "bhqecj4p",
  //     amount: 721,
  //     status: "Failed",
  //     email: "carmella@hotmail.com"
  //   }
  // ];

  // const table = createTable(readable(data), {
  //   sort: addSortBy({ disableMultiSort: true }),
  //   page: addPagination(),
  //   filter: addTableFilter({
  //     fn: ({ filterValue, value }) => value.includes(filterValue)
  //   }),
  //   select: addSelectedRows(),
  //   hide: addHiddenColumns()
  // });

  // const columns = table.createColumns([
  //   table.column({
  //     header: (_, { pluginStates }) => {
  //       const { allPageRowsSelected } = pluginStates.select;
  //       return createRender(DataTableCheckbox, {
  //         checked: allPageRowsSelected
  //       });
  //     },
  //     accessor: "id",
  //     cell: ({ row }, { pluginStates }) => {
  //       const { getRowState } = pluginStates.select;
  //       const { isSelected } = getRowState(row);

  //       return createRender(DataTableCheckbox, {
  //         checked: isSelected
  //       });
  //     },
  //     plugins: {
  //       sort: {
  //         disable: true
  //       },
  //       filter: {
  //         exclude: true
  //       }
  //     }
  //   }),
  //   table.column({
  //     header: "Status",
  //     accessor: "status",
  //     plugins: { sort: { disable: true }, filter: { exclude: true } }
  //   }),
  //   table.column({
  //     header: "Email",
  //     accessor: "email",
  //     cell: ({ value }) => value.toLowerCase(),
  //     plugins: {
  //       filter: {
  //         getFilterValue(value) {
  //           return value.toLowerCase();
  //         }
  //       }
  //     }
  //   }),
  //   table.column({
  //     header: "Amount",
  //     accessor: "amount",
  //     cell: ({ value }) => {
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD"
  //       }).format(value);
  //       return formatted;
  //     },
  //     plugins: {
  //       sort: {
  //         disable: true
  //       },
  //       filter: {
  //         exclude: true
  //       }
  //     }
  //   }),
  //   table.column({
  //     header: "",
  //     accessor: ({ id }) => id,
  //     cell: (item) => {
  //       return createRender(Actions, { id: item.value });
  //     },
  //     plugins: {
  //       sort: {
  //         disable: true
  //       }
  //     }
  //   })
  // ]);

  // const {
  //   headerRows,
  //   pageRows,
  //   tableAttrs,
  //   tableBodyAttrs,
  //   flatColumns,
  //   pluginStates,
  //   rows
  // } = table.createViewModel(columns);

  // const { sortKeys } = pluginStates.sort;

  // const { hiddenColumnIds } = pluginStates.hide;
  // const ids = flatColumns.map((c) => c.id);
  // let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

  // $: $hiddenColumnIds = Object.entries(hideForId)
  //   .filter(([, hide]) => !hide)
  //   .map(([id]) => id);

  // const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  // const { filterValue } = pluginStates.filter;

  // const { selectedDataIds } = pluginStates.select;

  // const hideableCols = ["status", "email", "amount"];


export let data 

</script>



<div class="mb-4 flex justify-between">
	<span class="text-xl font-semibold">Categories :</span>

	<a href="/article/new">
		<Button class="text-sm">
			<span class="mr-2">New Category </span>
			<Plus />
		</Button>
	</a>

</div>

<div>
  {#each data.categories as category}
		<a href={'/categories/' + category.id}>
			<DataTable {category} />
		</a>
	{/each}
</div>

 -->



 <div>
  categries home
 </div>