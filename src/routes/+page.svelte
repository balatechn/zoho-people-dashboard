<script>
  import { onMount } from 'svelte';
  import { 
    Users, Clock, CalendarCheck, ShieldCheck, Briefcase, UserCheck,
    ChevronRight, Calendar, ChevronDown
  } from 'lucide-svelte';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import ChartCard from '$lib/components/ChartCard.svelte';
  import KPICard from '$lib/components/KPICard.svelte';
  import TableCard from '$lib/components/TableCard.svelte';
  import '../app.css';

  /** @type {import('./$types').PageData} */
  export let data;

  // Data Sources - Use real attendance data from server
  let employeeData = data.sampleEmployees || [];
  let attendanceStats = data.attendanceStats || { present: 30, absent: 30, onTime: 22, late: 8, total: 60 };
  let departmentStats = data.departmentStats || {};
  let loading = false;
  let error = null;
  
  // Today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  
  // Calculate employee metrics based on current data
  $: metrics = {
    totalEmployees: employeeData.length,
    activeEmployees: Math.floor(employeeData.length * 0.95), // 95% active
    onLeave: 3, // Sample data
    newHires: 2, // Sample data
    pendingApprovals: data.kpis?.pendingApprovals || 3,
    departments: [...new Set(employeeData.map(emp => emp.department))].length,
    locations: [...new Set(employeeData.map(emp => emp.location))].length,
    avgYearsExperience: "3.2" // Sample data
  };
  
  // Create trend data - use the data already loaded from +page.js or create sample
  $: trendData = data.charts?.trendData || [];
  
  // Create department-wise data based on employees
  $: departmentData = createDepartmentData(employeeData);
  
  // Create department-wise data based on employees
  function createDepartmentData(employees) {
    /** @type {{[dept: string]: {count: number, percentage: number}}} */
    const deptCounts = {};
    
    // Count by department
    employees.forEach((employee) => {
      if (!deptCounts[employee.department]) {
        deptCounts[employee.department] = {
          count: 0,
          percentage: 0
        };
      }
      deptCounts[employee.department].count += 1;
    });
    
    // Calculate percentages
    const total = employees.length;
    Object.keys(deptCounts).forEach(dept => {
      deptCounts[dept].percentage = total > 0 ? Math.round((deptCounts[dept].count / total) * 100) : 0;
    });
    
    // Convert to array for charts
    return Object.entries(deptCounts).map(([dept, data]) => ({
      department: dept,
      count: data.count,
      percentage: data.percentage
    }));
  }
  
  // Create pending approvals data - use what's already loaded from page data
  const pendingApprovals = data.tables.pendingApprovals || [
    { id: "RG-1042", type: "Regularization", by: "Karthik P", for: "Sep 03 • 09:20", age: "2d" },
    { id: "LV-2218", type: "Leave", by: "Shwetha S", for: "Sep 09-10 • Casual", age: "1d" },
    { id: "WF-0081", type: "WFH", by: "Jason C", for: "Sep 06 • Full Day", age: "3h" }
  ];
  
  // Regularization request trend data - use what's already loaded from page data
  const regularizationData = data.charts.regularizationData || [
    { date: "Aug 29", count: 8 },
    { date: "Aug 30", count: 6 },
    { date: "Aug 31", count: 4 },
    { date: "Sep 01", count: 12 },
    { date: "Sep 02", count: 10 },
    { date: "Sep 03", count: 7 },
    { date: "Sep 04", count: 9 },
  ];
</script>

<svelte:head>
  <title>Home Dashboard - Zoho People</title>
  <meta name="description" content="Zoho People Management Dashboard" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100 text-gold-900">
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
      <!-- Loading State -->
      {#if loading}
        <div class="flex justify-center items-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
          <span class="ml-3 text-gold-800">Loading dashboard data...</span>
        </div>
      {:else if error}
        <!-- Error State -->
        <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 class="text-red-800 text-xl mb-2">Error Loading Data</h2>
          <p class="text-red-600">{error}</p>
          <button class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Retry
          </button>
        </div>
      {:else}
      <!-- Dashboard Content -->
      
      <!-- Page Header -->
      <div class="bg-gradient-to-br from-offwhite-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 p-6 backdrop-blur-sm">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gold-900">ATTENDANCE</h1>
            <p class="text-gold-700">Saturday, 09/10/2021</p>
          </div>
          <div class="flex items-center space-x-3">
            <button class="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center space-x-2 shadow-md">
              <span>📹</span>
              <span>Watch Tutorial</span>
            </button>
            <span class="text-sm text-gold-600">Home / Attendance</span>
          </div>
        </div>
      </div>

      <!-- Attendance Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Present -->
        <div class="bg-gradient-to-br from-offwhite-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gold-700">Present</p>
              <p class="text-3xl font-bold text-gold-900 mt-1">{attendanceStats.present}</p>
            </div>
            <div class="w-16 h-16 relative">
              <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f3e8ff"
                  stroke-width="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#d97706"
                  stroke-width="3"
                  stroke-dasharray="{attendanceStats.total > 0 ? (attendanceStats.present / attendanceStats.total) * 100 : 50}, 100"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-sm font-semibold text-gold-700">{attendanceStats.total > 0 ? Math.round((attendanceStats.present / attendanceStats.total) * 100) : 50}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Absent -->
        <div class="bg-gradient-to-br from-offwhite-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 p-6 backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gold-700">Absent</p>
              <p class="text-3xl font-bold text-gold-900 mt-1">{attendanceStats.absent}</p>
            </div>
            <div class="w-16 h-16 relative">
              <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f3e8ff"
                  stroke-width="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ef4444"
                  stroke-width="3"
                  stroke-dasharray="{attendanceStats.total > 0 ? (attendanceStats.absent / attendanceStats.total) * 100 : 50}, 100"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-sm font-semibold text-red-600">{attendanceStats.total > 0 ? Math.round((attendanceStats.absent / attendanceStats.total) * 100) : 50}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- On Time -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">On Time</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">{attendanceStats.onTime}</p>
            </div>
            <div class="w-16 h-16 relative">
              <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  stroke-width="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  stroke-width="3"
                  stroke-dasharray="{attendanceStats.present > 0 ? (attendanceStats.onTime / attendanceStats.present) * 100 : 75}, 100"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-sm font-semibold text-green-600">{attendanceStats.present > 0 ? Math.round((attendanceStats.onTime / attendanceStats.present) * 100) : 75}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Late -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Late</p>
              <p class="text-3xl font-bold text-gray-900 mt-1">{attendanceStats.late}</p>
            </div>
            <div class="w-16 h-16 relative">
              <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  stroke-width="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f59e0b"
                  stroke-width="3"
                  stroke-dasharray="{attendanceStats.present > 0 ? (attendanceStats.late / attendanceStats.present) * 100 : 25}, 100"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-sm font-semibold text-amber-600">{attendanceStats.present > 0 ? Math.round((attendanceStats.late / attendanceStats.present) * 100) : 25}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Department Wise Attendance Charts -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Department Wise Attendance</h3>
            <div class="flex space-x-4">
              <button class="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronDown class="h-4 w-4 text-gray-600 rotate-90" />
              </button>
              <button class="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronDown class="h-4 w-4 text-gray-600 -rotate-90" />
              </button>
            </div>
          </div>
          
          <!-- Department Charts -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Production & Delivery -->
            <div class="text-center">
              <div class="w-32 h-32 mx-auto relative mb-4">
                <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="3"
                  />
                  <!-- Green segment -->
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    stroke-width="3"
                    stroke-dasharray="40, 100"
                  />
                  <!-- Yellow segment -->
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f59e0b"
                    stroke-width="3"
                    stroke-dasharray="30, 100"
                    stroke-dashoffset="-40"
                  />
                  <!-- Red segment -->
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ef4444"
                    stroke-width="3"
                    stroke-dasharray="30, 100"
                    stroke-dashoffset="-70"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-sm font-semibold text-gray-900">Production &</div>
                    <div class="text-sm font-semibold text-gray-900">Delivery</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- R&D -->
            <div class="text-center">
              <div class="w-32 h-32 mx-auto relative mb-4">
                <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="3"
                  />
                  <!-- Green segment -->
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    stroke-width="3"
                    stroke-dasharray="50, 100"
                  />
                  <!-- Yellow segment -->
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f59e0b"
                    stroke-width="3"
                    stroke-dasharray="25, 100"
                    stroke-dashoffset="-50"
                  />
                  <!-- Red segment -->
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ef4444"
                    stroke-width="3"
                    stroke-dasharray="25, 100"
                    stroke-dashoffset="-75"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-lg font-semibold text-gray-900">R&D</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business & Strategy -->
            <div class="text-center">
              <div class="w-32 h-32 mx-auto relative mb-4">
                <svg class="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="3"
                  />
                  <!-- Green segment -->
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    stroke-width="3"
                    stroke-dasharray="45, 100"
                  />
                  <!-- Red segment -->
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#ef4444"
                    stroke-width="3"
                    stroke-dasharray="35, 100"
                    stroke-dashoffset="-45"
                  />
                  <!-- Yellow segment -->
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#f59e0b"
                    stroke-width="3"
                    stroke-dasharray="20, 100"
                    stroke-dashoffset="-80"
                  />
                </svg>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="text-center">
                    <div class="text-sm font-semibold text-gray-900">Business &</div>
                    <div class="text-sm font-semibold text-gray-900">Strategy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Legend -->
          <div class="flex flex-wrap justify-center gap-6 mt-6 text-sm">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Late</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded"></div>
              <span>On Leave</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-red-500 rounded"></div>
              <span>Absent</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-teal-500 rounded"></div>
              <span>On Time</span>
            </div>
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-gray-400 rounded"></div>
              <span>Holiday/Off Day</span>
            </div>
          </div>
        </div>

        <!-- Attendance Feed -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Attendance Feed</h3>
          
          <div class="space-y-4">
            {#each employeeData.slice(0, 5) as employee, index}
              {@const employeeName = employee.employeeName || 'Unknown Employee'}
              {@const nameWords = employeeName.split(' ')}
              {@const initials = nameWords.length >= 2 ? nameWords[0].charAt(0) + nameWords[nameWords.length - 1].charAt(0) : nameWords[0]?.charAt(0) || 'U'}
              {@const colors = ['blue', 'purple', 'yellow', 'gray', 'green']}
              {@const color = colors[index % colors.length]}
              {@const timeAgo = ['Moments Ago', '20m Ago', '25m Ago', '30m Ago', '1h Ago'][index] || 'Recent'}
              
              <!-- Feed Item -->
              <div class="flex items-start space-x-3">
                <div class="w-10 h-10 rounded-full bg-{color}-100 flex items-center justify-center">
                  <span class="text-sm font-semibold text-{color}-600">{initials}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <h4 class="text-sm font-medium text-gray-900">{employeeName}</h4>
                    <span class="text-xs text-gray-500">{timeAgo}</span>
                  </div>
                  <p class="text-xs text-gray-500">{employee.department || 'Department'}</p>
                  <div class="flex items-center space-x-2 mt-1">
                    <Clock class="h-3 w-3 text-gray-400" />
                    <span class="text-xs text-gray-500">{employee.firstIn || '09:00 AM'}</span>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Late Today -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Late Today</h3>
          
          <div class="space-y-4">
            {#each employeeData.filter(emp => emp.firstIn && emp.firstIn.includes('PM') || (emp.firstIn && emp.firstIn.includes('AM') && parseInt(emp.firstIn.split(':')[0]) >= 10)).slice(0, 3) as employee, index}
              {@const employeeName = employee.employeeName || 'Unknown Employee'}
              {@const nameWords = employeeName.split(' ')}
              {@const initials = nameWords.length >= 2 ? nameWords[0].charAt(0) + nameWords[nameWords.length - 1].charAt(0) : nameWords[0]?.charAt(0) || 'U'}
              {@const colors = ['purple', 'yellow', 'gray']}
              {@const color = colors[index % colors.length]}
              {@const lateTime = employee.firstIn || '10:28 AM'}
              {@const lateDuration = '1h 28m'} <!-- Calculate this based on expected vs actual time -->
              {@const lateDays = [6, 9, 7][index] || 5}
              
              <!-- Late Employee -->
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-full bg-{color}-100 flex items-center justify-center">
                  <span class="text-sm font-semibold text-{color}-600">{initials}</span>
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="text-sm font-medium text-gray-900">{employeeName}</h4>
                  <p class="text-xs text-gray-500">{employee.department || 'Department'}</p>
                  <p class="text-xs text-gray-500">Line Manager • Not Set</p>
                </div>
                <div class="text-right">
                  <div class="flex items-center space-x-2">
                    <Clock class="h-4 w-4 text-gray-400" />
                    <span class="text-sm text-gray-900">{lateTime}</span>
                    <span class="text-xs text-red-500">⚠ {lateDuration}</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">This Month • {lateDays} Days</p>
                </div>
              </div>
            {:else}
              <div class="text-center text-gray-500 py-4">
                <p class="text-sm">No late employees today</p>
              </div>
            {/each}
          </div>
        </div>

        <!-- On Leave -->
        <div class="chart-card p-6 hover:shadow-xl transition-all duration-300">
          <h3 class="text-lg font-semibold gradient-text mb-6">On Leave</h3>
          
          <div class="space-y-4">
            {#each employeeData.filter(emp => !emp.firstIn || emp.firstIn === '--').slice(0, 2) as employee, index}
              {@const employeeName = employee.employeeName || 'Unknown Employee'}
              {@const nameWords = employeeName.split(' ')}
              {@const initials = nameWords.length >= 2 ? nameWords[0].charAt(0) + nameWords[nameWords.length - 1].charAt(0) : nameWords[0]?.charAt(0) || 'U'}
              {@const leaveDates = ['10 Oct 2021 - 12 Oct 2021', '13 Oct 2021 - 13 Oct 2021'][index] || '10 Oct 2021 - 10 Oct 2021'}
              
              <!-- Leave Employee -->
              <div class="bg-gradient-to-r from-gold-50 to-off-white-100 p-4 rounded-lg border border-gold-200 hover:shadow-md transition-all duration-300">
                <div class="flex items-center space-x-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                    <span class="text-sm font-semibold text-white">{initials}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900">{employeeName}</h4>
                    <p class="text-xs text-gray-600">{employee.department || 'Department'}</p>
                    <p class="text-xs text-gray-500">Line Manager • Not Set</p>
                  </div>
                  <div class="text-right">
                    <p class="text-xs text-gray-500">{leaveDates}</p>
                  </div>
                </div>
              </div>
            {:else}
              <div class="text-center text-gray-500 py-4">
                <p class="text-sm">No employees on leave today</p>
              </div>
            {/each}
          </div>
        </div>
      </div>
      {/if}
    </main>
  </div>
</div>

<style>
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
