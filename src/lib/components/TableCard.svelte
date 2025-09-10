<script>
	import { formatDate } from '$lib/utils/dateFormatter';
	
	export let title;
	export let icon;
	export let data = [];
	export let type = 'attendance'; // 'attendance' or 'approvals'
	export let showDate = false; // Flag to show date column

	function getStatusColor(status) {
		const colors = {
			'Present': 'bg-emerald-100 text-emerald-700',
			'WFH': 'bg-blue-100 text-blue-700',
			'Leave': 'bg-amber-100 text-amber-700',
			'OD': 'bg-purple-100 text-purple-700',
			'Partial': 'bg-blue-100 text-blue-700',
			'Absent': 'bg-red-100 text-red-700'
		};
		return colors[status] || 'bg-gray-100 text-gray-700';
	}

	function handleApprove(item) {
		console.log('Approved:', item);
		// In real implementation, make API call to approve
	}

	function handleReject(item) {
		console.log('Rejected:', item);
		// In real implementation, make API call to reject
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
		{#if type === 'attendance'}
			<!-- Attendance Table -->
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-gold-200 bg-gold-50/50 text-left text-xs uppercase text-zinc-600 font-medium">
							{#if showDate}
								<th class="px-4 py-3">Date</th>
							{/if}
							<th class="px-4 py-3">Employee</th>
							<th class="px-4 py-3">Department</th>
							<th class="px-4 py-3">Status</th>
							<th class="px-4 py-3">Check-in/out</th>
							<th class="px-4 py-3">Hours</th>
						</tr>
					</thead>
					<tbody>
						{#each data as row, i}
							<tr class="border-b border-gold-100 last:border-none hover:bg-gold-25 transition-colors">
								{#if showDate}
									<td class="px-4 py-3 text-zinc-600">{formatDate(row.date)}</td>
								{/if}
								<td class="px-4 py-3 font-medium text-zinc-800">{row.name || row.employeeName}</td>
								<td class="px-4 py-3 text-zinc-600">{row.dept || row.department}</td>
								<td class="px-4 py-3">
									<span class="rounded-full px-3 py-1 text-xs font-medium {getStatusColor(row.status)}">
										{row.status}
									</span>
								</td>
								<td class="px-4 py-3 text-zinc-600 font-mono text-xs">
									{#if row.time}
										{row.time}
									{:else if row.firstIn && row.lastOut}
										{row.firstIn} - {row.lastOut !== '-' ? row.lastOut : '...'}
									{:else if row.checkIn}
										{row.checkIn}{row.checkOut ? ' - ' + row.checkOut : ''}
									{:else}
										-
									{/if}
								</td>
								<td class="px-4 py-3 text-zinc-600 font-medium text-xs">
									{row.hours || row.totalHours || row.workingHours || '-'}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else if type === 'approvals'}
			<!-- Approvals List -->
			<div class="space-y-4">
				{#each data as approval}
					<div class="rounded-xl border border-gold-200 p-4 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gold-25">
						<div class="flex items-center justify-between text-sm mb-2">
							<div class="font-semibold text-gold-800">
								{approval.type} • <span class="text-zinc-500 font-normal">{approval.id}</span>
							</div>
							<div class="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">{approval.age} ago</div>
						</div>
						<div class="text-xs text-zinc-600 mb-3">{approval.by} — {approval.for}</div>
						<div class="flex gap-2">
							<button 
								class="btn-primary text-xs px-3 py-1.5"
								on:click={() => handleApprove(approval)}
							>
								Approve
							</button>
							<button 
								class="btn-secondary text-xs px-3 py-1.5"
								on:click={() => handleReject(approval)}
							>
								Reject
							</button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
