<script lang="ts">
	import { Form } from 'formsnap';

	export let editor: HTMLDivElement;

	let colors = [
		'#6610f2',
		'#007bff',
		'#6f42c1',
		'#e83e8c',
		'#dc3545',
		'#fd7e14',
		'#ffc107',
		'#28a745',
		'#20c997',
		'#17a2b8',
		'#ffffff',
		'#6c757d',
		'#343a40',
		'#007bff',
		'#6c757d',
		'#28a745',
		'#17a2b8',
		'#ffc107',
		'#dc3545',
		'#f8f9fa',
		'#343a40',
		'transparent',
		'custom-color'
	];
</script>

<div>
	<div id="toolbar">
		<span class="ql-formats">
			<select class="ql-font" value="arial">
				<option selected value="nunito-bold">Nunito Bold</option>
			</select>
			<select title="size" class="ql-size" value="medium">
				<option value="extra-small">Extra Small</option>
				<option value="small">Small</option>
				<option value="medium">Medium</option>
				<option value="large">Large</option>
			</select>
			<select title="header" class="ql-header" value="1">
				<option value="1">Heading</option>
				<option value="2">Subheading</option>
				<option value="3">Normal</option>
			</select>
		</span>
		<span class="ql-formats">
			<button title="bold" class="ql-bold" />
			<button title="italic" class="ql-italic" />
			<button title="underline" class="ql-underline" />
			<button title="strike" class="ql-strike" />
		</span>
		<span class="ql-formats">
			<button title="ordered" class="ql-list" value="ordered" />
			<button title="bullet" class="ql-list" value="bullet" />
			<button title="decrese indentation" class="ql-indent" value="-1" />
			<button title="increase indentation" class="ql-indent" value="+1" />
		</span>
		<span class="ql-formats">
			<button title="super" class="ql-script" value="super" />
			<button title="sub" class="ql-script" value="sub" />
			<button title="blockquote" class="ql-blockquote" />
			<button title="direction" class="ql-direction" />
		</span>
		<span class="ql-formats">
			<select title="align" class="ql-align" />
			<select title="text color" class="ql-color">
				{#each colors as hex}
					<option value={hex} />
				{/each}
			</select>
			<select title="background color" class="ql-background">
				{#each colors as hex}
					<option title={hex} value={hex} />
				{/each}
			</select>
		</span>
		<span class="ql-formats">
			<button title="link" class="ql-link" />
			<button title="image" class="ql-image" />
			<button title="video" class="ql-video" />
		</span>
		<span class="ql-formats">
			<button title="formula" class="ql-formula" />
			<button title="code block" class="ql-code-block" />
			<button title="clean" class="ql-clean" />
		</span>
		<span class="ql-formats">
			<button title="undo" class="ql-undo">
				<!-- <CustomUndo /> -->
				<svg viewBox="0 0 18 18">
					<polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
					<path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
				</svg>
			</button>
			<button title="redo" class="ql-redo">
				<!-- <CustomRedo /> -->
				<svg viewBox="0 0 18 18">
					<polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
					<path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
				</svg>
			</button>
			<button title="table" class="ql-addTable">
				<!-- <CustomAddTables /> -->
				<svg
					width="15"
					height="15"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					><path
						d="M8 2H12.5C12.7761 2 13 2.22386 13 2.5V5H8V2ZM7 5V2H2.5C2.22386 2 2 2.22386 2 2.5V5H7ZM2 6V9H7V6H2ZM8 6H13V9H8V6ZM8 10H13V12.5C13 12.7761 12.7761 13 12.5 13H8V10ZM2 12.5V10H7V13H2.5C2.22386 13 2 12.7761 2 12.5ZM1 2.5C1 1.67157 1.67157 1 2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5Z"
						fill="currentColor"
						fill-rule="evenodd"
						clip-rule="evenodd"
					></path></svg
				>
			</button>
		</span>
		<span class="ql-formats">
			<input title="pick-color" type="color" id="quillColor" />
		</span>
	</div>
	<div bind:this={editor}></div>
	<Form.Validation />
</div>

<style>
	@import 'https://cdn.quilljs.com/2.0.0-dev.4/quill.snow.css';
	@import 'https://unpkg.com/quill-better-table@1.2.8/dist/quill-better-table.css';
</style>
