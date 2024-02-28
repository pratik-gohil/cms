	
<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  export let sections : []
  export let setActiveTab: Function   ;
  
  </script>

  <Tabs.Root  class="w-[400px]">
    <Tabs.List class="grid w-full grid-cols-2">
      {#each sections as section }
      <Tabs.Trigger value={section} on:click={setActiveTab(section)} > {section} </Tabs.Trigger>
      {/each}
    </Tabs.List>
    {#each sections as section }
    <Tabs.Content value={section}>
    <div> value : 
      { section} </div>
    </Tabs.Content>
    {/each}
  </Tabs.Root>