<script lang="ts">
	import { Form } from 'formsnap';

	export let editor: HTMLDivElement;
</script>

<div>
	<div id="toolbar">
		<span class="ql-formats">
			<select class="ql-font" value="arial">
				<option value="arial">Arial</option>
				<option value="comic-sans">Comic Sans</option>
				<option value="courier-new">Courier New</option>
				<option value="georgia">Georgia</option>
				<option value="helvetica">Helvetica</option>
				<option value="lucida">Lucida</option>
			</select>
			<select class="ql-size" value="medium">
				<option value="extra-small">Size 1</option>
				<option value="small">Size 2</option>
				<option value="medium">Size 3</option>
				<option value="large">Size 4</option>
			</select>
			<select class="ql-header" value="3">
				<option value="1">Heading</option>
				<option value="2">Subheading</option>
				<option value="3">Normal</option>
			</select>
		</span>
		<span class="ql-formats">
			<button class="ql-bold" />
			<button class="ql-italic" />
			<button class="ql-underline" />
			<button class="ql-strike" />
		</span>
		<span class="ql-formats">
			<button class="ql-list" value="ordered" />
			<button class="ql-list" value="bullet" />
			<button class="ql-indent" value="-1" />
			<button class="ql-indent" value="+1" />
		</span>
		<span class="ql-formats">
			<button class="ql-script" value="super" />
			<button class="ql-script" value="sub" />
			<button class="ql-blockquote" />
			<button class="ql-direction" />
		</span>
		<span class="ql-formats">
			<select class="ql-align" />
			<select class="ql-color" />
			<select class="ql-background" />
		</span>
		<span class="ql-formats">
			<button class="ql-link" />
			<button class="ql-image" />
			<button class="ql-video" />
		</span>
		<span class="ql-formats">
			<button class="ql-formula" />
			<button class="ql-code-block" />
			<button class="ql-clean" />
		</span>
		<span class="ql-formats">
			<button class="ql-undo">
				<!-- <CustomUndo /> -->
				<svg viewBox="0 0 18 18">
					<polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
					<path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9" />
				</svg>
			</button>
			<button class="ql-redo">
				<!-- <CustomRedo /> -->
				<svg viewBox="0 0 18 18">
					<polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
					<path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5" />
				</svg>
			</button>
		</span>
	</div>
	<div bind:this={editor}></div>
	<Form.Validation />
</div>

<style>
	@import 'https://cdn.quilljs.com/1.3.6/quill.snow.css';
</style>
