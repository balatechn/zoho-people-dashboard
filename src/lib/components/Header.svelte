<script>
	import { 
		Filter, Download, Plus, Settings
	} from 'lucide-svelte';

	let searchQuery = '';
</script>

<!-- Top Bar -->
<div class="sticky top-0 z-40 border-b border-gold-200/50 bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
	<div class="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
		<div class="flex items-center gap-3">
			<div class="h-12 w-12 rounded-xl overflow-hidden bg-white shadow-lg border border-gold-200 flex items-center justify-center">
				<img 
					src="/national-logo.png" 
					alt="National Group Logo" 
					class="h-8 w-auto object-contain"
				/>
			</div>
			<div class="leading-tight">
				<p class="text-xs uppercase tracking-wider text-zinc-500 font-medium">National Group</p>
				<h1 class="text-xl font-bold bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">
					Zoho People — Management Dashboard
				</h1>
			</div>
		</div>
		<div class="ml-auto flex items-center gap-3">
			<input 
				class="input w-64" 
				placeholder="Search employee, request, policy…"
				bind:value={searchQuery}
			/>
			<button class="btn-secondary gap-2 flex items-center">
				<Filter class="h-4 w-4"/>
				Filters
			</button>
			<button class="btn-secondary gap-2 flex items-center">
				<Download class="h-4 w-4"/>
				Export
			</button>
			<button class="btn-primary gap-2 flex items-center">
				<Plus class="h-4 w-4"/>
				Add Employee
			</button>
			<button class="p-2 text-gold-600 hover:bg-gold-100 rounded-lg transition-colors">
				<Settings class="h-5 w-5"/>
			</button>
		</div>
	</div>
</div>
