<script>
	import { onMount } from 'svelte';

	export let title;
	export let value;
	export let subtitle;
	export let icon;
	export let gradient = "from-gold-400 to-gold-600";

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<div class="card overflow-hidden group hover:shadow-xl transition-all duration-300">
	<div class="card-header flex flex-row items-center justify-between pb-3">
		<h3 class="text-sm font-medium text-zinc-600">{title}</h3>
		<div class="p-2 rounded-lg bg-gradient-to-r {gradient} text-white shadow-sm">
			<svelte:component this={icon} class="h-4 w-4" />
		</div>
	</div>
	<div class="card-content pt-0">
		{#if mounted}
			<div class="transition-all duration-500 transform {mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}">
				<div class="text-3xl font-bold text-zinc-800 mb-1">{value}</div>
				<div class="text-xs text-zinc-500">{subtitle}</div>
			</div>
		{:else}
			<div class="text-3xl font-bold text-zinc-800 mb-1">-</div>
			<div class="text-xs text-zinc-500">Loading...</div>
		{/if}
	</div>
</div>
