<script>
	import { onMount } from 'svelte';
	import { 
		Users, Clock, CalendarCheck, ShieldCheck, ChevronDown, Filter, 
		Download, Plus, Settings, Building2, Briefcase, MapPin, UserCheck, 
		Calendar, Bell
	} from 'lucide-svelte';
	import KPICard from '$lib/components/KPICard.svelte';
	import ChartCard from '$lib/components/ChartCard.svelte';
	import TableCard from '$lib/components/TableCard.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';

	/** @type {import('./$types').PageData} */
	export let data;

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

<svelte:head>
	<title>National Consulting India - Zoho People Dashboard</title>
	<meta name="description" content="National Consulting India Zoho People Management Dashboard with elegant gold and off-white design" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100 text-zinc-800">
	<!-- Header -->
	<Header />

	<!-- Layout -->
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12">
		<!-- Sidebar -->
		<aside class="lg:col-span-2">
			<Sidebar currentPath="/" />
		</aside>

		<!-- Main Content -->
		<main class="lg:col-span-10 space-y-6">
			<!-- KPI Row -->
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
				<KPICard
					title="Total Employees"
					value="35"
					subtitle="+3 this month"
					icon={Users}
					gradient="from-gold-400 to-gold-600"
				/>
				<KPICard
					title="Present Now"
					value="32"
					subtitle="↑ 3% vs last wk"
					icon={UserCheck}
					gradient="from-emerald-400 to-emerald-600"
				/>
				<KPICard
					title="Pending Approvals"
					value="3"
					subtitle="Reg/Leave/WFH"
					icon={ShieldCheck}
					gradient="from-amber-400 to-amber-600"
				/>
				<KPICard
					title="Avg. Check-in"
					value="10:15"
					subtitle="Bengaluru • Sep 09"
					icon={Clock}
					gradient="from-blue-400 to-blue-600"
				/>
			</div>

			<!-- Today's Attendance Table (Moved Up) -->
			<div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
				<div class="xl:col-span-2">
					<TableCard
						title="Today's Attendance (September 9, 2025)"
						icon={CalendarCheck}
						data={data.tables.todayAttendance}
						type="attendance"
					/>
				</div>
				
				<!-- Attendance Split Chart -->
				<ChartCard
					title="Attendance Split (September 9, 2025)"
					icon={Calendar}
					chartType="pie"
					data={data.charts.attendanceSplit}
				/>
			</div>

			<!-- Charts Row -->
			<div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
				<!-- Check-ins vs Check-outs Chart -->
				<ChartCard
					title="Check-ins vs Check-outs"
					icon={Clock}
					chartType="area"
					data={data.charts.trendData}
				/>

				<!-- Pending Approvals -->
				<TableCard
					title="Pending Approvals"
					icon={Bell}
					data={data.tables.pendingApprovals}
					type="approvals"
				/>
			</div>

			<!-- Regularization Chart -->
			<ChartCard
				title="Regularization Requests (Last 7 days)"
				icon={ShieldCheck}
				chartType="bar"
				data={data.charts.regularizationData}
			/>

			<!-- Footer -->
			<div class="pb-6 text-center text-xs text-zinc-500">
				© {new Date().getFullYear()} National Consulting India • Zoho People Dashboard
			</div>
		</main>
	</div>
</div>
