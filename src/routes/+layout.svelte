<script>
	import '../app.pcss';
	import Nav from '$lib/components/Nav.svelte';
	import WatchVideoStream from '$lib/components/WatchVideoStream.svelte';
</script>

<!-- Add Video Stream Modal -->
<WatchVideoStream />

<div class="flex flex-grow gap-x-5 px-[3.125rem] pt-[3.125rem]">
	<Nav />
	<div class="flex flex-col w-full">
		<slot />
	</div>
</div>