<script>
	import { 
		Activity, Bell
	} from 'lucide-svelte';

	// Get current date
	const today = new Date();
	const formattedDate = today.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	});
</script>

<!-- Top Bar -->
<div class="sticky top-0 z-40 border-b border-gold-200/50 bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
	<div class="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
		<div class="flex items-center gap-3">
			<div class="h-12 w-12 rounded-xl overflow-hidden bg-white shadow-lg border border-gold-200 flex items-center justify-center">
				<img 
					src="/national-logo.png" 
					alt="National Consulting India Logo" 
					class="h-8 w-auto object-contain"
				/>
			</div>
			<div class="leading-tight">
				<p class="text-xs uppercase tracking-wider text-zinc-500 font-medium">National Consulting India</p>
				<h1 class="text-xl font-bold bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">
					Zoho People — Management Dashboard
				</h1>
			</div>
		</div>
		<div class="ml-auto flex items-center gap-3">
			<!-- Removed search, filter, and export buttons for cleaner interface -->
		</div>
	</div>
</div>

<!-- Welcome Banner -->
<div class="border-b border-gold-200/50 bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600">
	<div class="mx-auto max-w-7xl px-6 py-5">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<div class="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">
					<Activity class="h-6 w-6" />
				</div>
				<div>
					<h2 class="text-2xl font-bold text-white">Welcome to Zoho People</h2>
					<p class="text-amber-100">Dashboard Overview • {formattedDate}</p>
				</div>
			</div>
			<div class="flex items-center gap-3">
				<div class="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm text-white">
					<Bell class="h-4 w-4" />
					<span class="text-sm font-medium">3 Pending Approvals</span>
				</div>
			</div>
		</div>
	</div>
</div>
