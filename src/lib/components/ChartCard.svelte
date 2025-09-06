<script>
	import { onMount } from 'svelte';

	export let title;
	export let icon;
	export let chartType = 'area'; // 'area', 'pie', 'bar'
	export let data = [];

	let mounted = false;
	let chartContainer;

	onMount(() => {
		mounted = true;
		// In a real implementation, you would use a charting library like Chart.js or D3
		// For now, we'll create simple visual representations
	});

	function getStatusColor(status) {
		const colors = {
			'Present': 'bg-emerald-100 text-emerald-700',
			'WFH': 'bg-blue-100 text-blue-700',
			'Leave': 'bg-amber-100 text-amber-700',
			'OD': 'bg-purple-100 text-purple-700',
			'Absent': 'bg-red-100 text-red-700'
		};
		return colors[status] || 'bg-gray-100 text-gray-700';
	}
</script>

<div class="card">
	<div class="card-header">
		<h3 class="text-lg font-semibold text-gold-800 flex items-center gap-2">
			<svelte:component this={icon} class="h-5 w-5" />
			{title}
		</h3>
	</div>
	<div class="card-content">
		{#if chartType === 'area' && mounted}
			<!-- Area Chart for Check-ins vs Check-outs -->
			<div class="h-64 relative">
				<svg class="w-full h-full" viewBox="0 0 400 200">
					<!-- Grid lines -->
					<defs>
						<pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
							<path d="M 40 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" stroke-width="1"/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid)" />
					
					<!-- Data lines -->
					{#each data as point, i}
						{@const x = (i / (data.length - 1)) * 350 + 25}
						{@const checkinY = 180 - (point.checkins / 120) * 150}
						{@const checkoutY = 180 - (point.checkouts / 120) * 150}
						
						<!-- Points -->
						<circle cx={x} cy={checkinY} r="3" fill="#0ea5e9" />
						<circle cx={x} cy={checkoutY} r="3" fill="#f59e0b" />
						
						<!-- Labels -->
						<text x={x} y="195" text-anchor="middle" class="text-xs fill-zinc-500">{point.day}</text>
					{/each}
					
					<!-- Legend -->
					<g transform="translate(20, 20)">
						<circle cx="0" cy="0" r="3" fill="#0ea5e9" />
						<text x="10" y="4" class="text-xs fill-zinc-600">Check-ins</text>
						<circle cx="80" cy="0" r="3" fill="#f59e0b" />
						<text x="90" y="4" class="text-xs fill-zinc-600">Check-outs</text>
					</g>
				</svg>
			</div>
		{:else if chartType === 'pie' && mounted}
			<!-- Pie Chart for Attendance Split -->
			<div class="h-64 flex items-center justify-center">
				<div class="relative">
					<svg width="200" height="200" viewBox="0 0 200 200">
						{#each data as segment, i}
							{@const total = data.reduce((sum, d) => sum + d.value, 0)}
							{@const percentage = (segment.value / total) * 100}
							{@const angle = (segment.value / total) * 360}
							{@const startAngle = data.slice(0, i).reduce((sum, d) => sum + (d.value / total) * 360, 0)}
							{@const endAngle = startAngle + angle}
							{@const startRadians = (startAngle - 90) * Math.PI / 180}
							{@const endRadians = (endAngle - 90) * Math.PI / 180}
							{@const largeArc = angle > 180 ? 1 : 0}
							{@const x1 = 100 + 80 * Math.cos(startRadians)}
							{@const y1 = 100 + 80 * Math.sin(startRadians)}
							{@const x2 = 100 + 80 * Math.cos(endRadians)}
							{@const y2 = 100 + 80 * Math.sin(endRadians)}
							
							<path 
								d="M 100 100 L {x1} {y1} A 80 80 0 {largeArc} 1 {x2} {y2} Z"
								fill={segment.color}
								class="hover:opacity-80 transition-opacity"
							/>
						{/each}
						
						<!-- Center circle -->
						<circle cx="100" cy="100" r="30" fill="white" />
						<text x="100" y="105" text-anchor="middle" class="text-sm font-semibold fill-zinc-700">
							{data.reduce((sum, d) => sum + d.value, 0)}
						</text>
					</svg>
					
					<!-- Legend -->
					<div class="absolute left-full top-0 ml-4 space-y-2">
						{#each data as segment}
							<div class="flex items-center gap-2 text-sm">
								<div class="w-3 h-3 rounded-full" style="background-color: {segment.color}"></div>
								<span class="text-zinc-600">{segment.name}</span>
								<span class="font-medium text-zinc-800">{segment.value}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{:else if chartType === 'bar' && mounted}
			<!-- Bar Chart for Regularization -->
			<div class="h-64 relative">
				<svg class="w-full h-full" viewBox="0 0 400 200">
					<!-- Grid -->
					<rect width="100%" height="100%" fill="url(#grid)" />
					
					<!-- Bars -->
					{#each data as point, i}
						{@const x = (i / data.length) * 350 + 25}
						{@const barHeight = (point.count / 15) * 150}
						{@const barY = 180 - barHeight}
						
						<rect 
							x={x} 
							y={barY} 
							width="25" 
							height={barHeight} 
							fill="#f59e0b" 
							rx="4" 
							class="hover:fill-amber-600 transition-colors"
						/>
						
						<!-- Value labels -->
						<text x={x + 12.5} y={barY - 5} text-anchor="middle" class="text-xs fill-zinc-600">
							{point.count}
						</text>
						
						<!-- Date labels -->
						<text x={x + 12.5} y="195" text-anchor="middle" class="text-xs fill-zinc-500">
							{point.date}
						</text>
					{/each}
				</svg>
			</div>
		{:else}
			<div class="h-64 flex items-center justify-center text-zinc-500">
				Loading chart...
			</div>
		{/if}
	</div>
</div>
