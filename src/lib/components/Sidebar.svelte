<script>
	import { 
		Users, CalendarCheck, Clock, ShieldCheck, Briefcase, Building2,
		ChevronDown, MapPin, Settings
	} from 'lucide-svelte';

	export let currentPath = '/';

	const navigationItems = [
		{ icon: Users, label: "Dashboard", href: "/", key: "dashboard" },
		{ icon: CalendarCheck, label: "Attendance", href: "/attendance", key: "attendance" },
		{ icon: Clock, label: "Timesheets", href: "/timesheets", key: "timesheets" },
		{ icon: ShieldCheck, label: "Approvals", href: "/approvals", key: "approvals" },
		{ icon: Briefcase, label: "HR Files", href: "/hr-files", key: "hr-files" },
		{ icon: Building2, label: "Org Chart", href: "/org-chart", key: "org-chart" },
		{ icon: Settings, label: "Settings", href: "/settings", key: "settings" },
	];

	function isActive(item) {
		if (item.href === '/' && currentPath === '/') return true;
		if (item.href !== '/' && currentPath.startsWith(item.href)) return true;
		return false;
	}

	let showDateDropdown = false;
	let showLocationDropdown = false;
	let showDepartmentDropdown = false;
</script>

<div class="space-y-4">
	<!-- Navigation Card -->
	<div class="card">
		<div class="card-header">
			<h3 class="text-sm font-semibold text-gold-800">Navigation</h3>
		</div>
		<div class="card-content space-y-1 text-sm">
			{#each navigationItems as item}
				<a 
					href={item.href}
					class="flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors {isActive(item) ? 'bg-gold-100 text-gold-800 font-medium' : 'hover:bg-gold-50 text-zinc-700'}"
				>
					<svelte:component this={item.icon} class="h-4 w-4" />
					<span>{item.label}</span>
				</a>
			{/each}
		</div>
	</div>

	<!-- Quick Filters Card -->
	<div class="card">
		<div class="card-header">
			<h3 class="text-sm font-semibold text-gold-800">Quick Filters</h3>
		</div>
		<div class="card-content space-y-3">
			<!-- Date Range Filter -->
			<div class="relative">
				<button 
					class="btn-secondary w-full justify-between flex items-center"
					on:click={() => showDateDropdown = !showDateDropdown}
				>
					Date Range 
					<ChevronDown class="h-4 w-4" />
				</button>
				{#if showDateDropdown}
					<div class="absolute top-full left-0 right-0 mt-1 bg-white border border-gold-200 rounded-lg shadow-lg z-10 py-2">
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">Today</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">This Week</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">This Month</button>
						<hr class="my-1 border-gold-100">
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">Custom…</button>
					</div>
				{/if}
			</div>

			<!-- Location Filter -->
			<div class="relative">
				<button 
					class="btn-secondary w-full justify-between flex items-center"
					on:click={() => showLocationDropdown = !showLocationDropdown}
				>
					<div class="flex items-center gap-2">
						<MapPin class="h-4 w-4" />
						Location
					</div>
					<ChevronDown class="h-4 w-4" />
				</button>
				{#if showLocationDropdown}
					<div class="absolute top-full left-0 right-0 mt-1 bg-white border border-gold-200 rounded-lg shadow-lg z-10 py-2">
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">All</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">Bengaluru</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">Mumbai</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">Mangaluru</button>
					</div>
				{/if}
			</div>

			<!-- Department Filter -->
			<div class="relative">
				<button 
					class="btn-secondary w-full justify-between flex items-center"
					on:click={() => showDepartmentDropdown = !showDepartmentDropdown}
				>
					<div class="flex items-center gap-2">
						<Briefcase class="h-4 w-4" />
						Department
					</div>
					<ChevronDown class="h-4 w-4" />
				</button>
				{#if showDepartmentDropdown}
					<div class="absolute top-full left-0 right-0 mt-1 bg-white border border-gold-200 rounded-lg shadow-lg z-10 py-2">
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">All</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">IT</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">HR</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">Sales</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">Finance</button>
						<button class="w-full px-3 py-2 text-left text-sm hover:bg-gold-50">Projects</button>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* Close dropdowns when clicking outside */
	:global(body) {
		--dropdown-z: 50;
	}
</style>
