<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>Contentful.js Svelte Test</h1>
<div id="loading-entries">{@html data.result}</div>