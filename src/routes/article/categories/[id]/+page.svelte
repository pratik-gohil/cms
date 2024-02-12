<!-- 

<script>
	/** @type {import('./$types').PageData} */
	export let data;

    export function load({params}){
        if(params.id){
            render()
        }
    }

</script>

<script>

function render(){
    return (

        <h1>{params.id}</h1>
        <div>{@html data.content}</div>
    )
}

</script> -->

<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>