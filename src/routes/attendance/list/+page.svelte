<script>
  import { onMount } from 'svelte';
  import { 
    Users, Clock, CalendarCheck, Filter, Download, Search, 
    Upload, Settings, AlertCircle, FileText,
    CheckCircle, XCircle, ChevronDown 
  } from 'lucide-svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  
  // State management
  let attendanceData = [];
  let filteredData = [];
  let loading = false;
  let error = null;
  let date = new Date().toISOString().split('T')[0]; // Today's date by default
  let filters = {
    employeeName: '',
    employeeId: '',
    department: '',
    status: '' // 'On Time', 'Late'
  };

  let departments = ['All', 'Software Development', 'Marketing', 'Management', 'HR', 'Sales', 'Design', 'Data Science'];
  
  // Sample attendance data for demonstration
  const sampleAttendanceData = [
    { employeeId: 'DD0433', employeeName: 'Brett Johnson', department: 'Design', designation: 'UI Designer', status: 'Late', loginTime: '9:18 AM', logoutTime: '-', profileImg: null },
    { employeeId: 'DD0123', employeeName: 'Brett Johnson', department: 'Software Development', designation: 'Software Engineer', status: 'Late', loginTime: '9:15 AM', logoutTime: '-', profileImg: null },
    { employeeId: 'DD0242', employeeName: 'Rhodes Peter', department: 'Software Development', designation: 'Project Manager', status: 'Late', loginTime: '9:05 AM', logoutTime: '-', profileImg: null },
    { employeeId: 'DD0032', employeeName: 'Jeff Jane', department: 'HR', designation: 'HR Head', status: 'On Time', loginTime: '9:00 AM', logoutTime: '-', profileImg: null },
    { employeeId: 'DD0546', employeeName: 'Emily Butler', department: 'Data Science', designation: 'Data Scientist', status: 'On Time', loginTime: '8:55 AM', logoutTime: '-', profileImg: null },
    { employeeId: 'DD0070', employeeName: 'Anna Shvets', department: 'Sales', designation: 'Sales Associate', status: 'On Time', loginTime: '8:55 AM', logoutTime: '-', profileImg: null },
    { employeeId: 'DD0260', employeeName: 'Spencer Selover', department: 'Design', designation: 'UX Designer', status: 'Late', loginTime: '8:52 AM', logoutTime: '-', profileImg: null },
    { employeeId: 'DD0357', employeeName: 'Marcela Oliveira', department: 'Design', designation: 'Illustrator', status: 'Late', loginTime: '8:50 AM', logoutTime: '-', profileImg: null },
    { employeeId: 'DD0112', employeeName: 'John Smith', department: 'Management', designation: 'Team Lead', status: 'On Time', loginTime: '8:45 AM', logoutTime: '-', profileImg: null },
    { employeeId: 'DD0225', employeeName: 'Sarah Wilson', department: 'Marketing', designation: 'Marketing Executive', status: 'On Time', loginTime: '8:40 AM', logoutTime: '-', profileImg: null }
  ];

  // Initialize with sample data
  onMount(() => {
    attendanceData = sampleAttendanceData;
    filteredData = [...sampleAttendanceData];
  });

  // Apply filters to data
  function applyFilters() {
    let filtered = [...attendanceData];
    
    // Filter by name
    if (filters.employeeName) {
      filtered = filtered.filter(item => 
        item.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase())
      );
    }
    
    // Filter by employee ID
    if (filters.employeeId) {
      filtered = filtered.filter(item => 
        item.employeeId.toLowerCase().includes(filters.employeeId.toLowerCase())
      );
    }
    
    // Filter by department
    if (filters.department && filters.department !== 'All') {
      filtered = filtered.filter(item => item.department === filters.department);
    }
    
    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }
    
    filteredData = filtered;
  }

  // Reactive statement for applying filters
  $: {
    if (filters) {
      applyFilters();
    }
  }

  // Format date for display
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Export to CSV
  function exportToCSV() {
    const headers = [
      'Employee ID', 'Employee Name', 'Department', 'Designation', 
      'Status', 'Login Time', 'Logout Time'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        row.employeeId, row.employeeName, row.department, row.designation,
        row.status, row.loginTime, row.logoutTime
      ].map(field => `"${field || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_list_${date}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>Attendance List - National Consulting India</title>
  <meta name="description" content="Daily employee attendance list" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100 text-zinc-800">
  <!-- Header -->
  <Header />

  <!-- Layout -->
  <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12">
    <!-- Sidebar -->
    <aside class="lg:col-span-2">
      <Sidebar currentPath="/attendance" />
    </aside>

    <!-- Main Content -->
    <main class="lg:col-span-10 space-y-6">
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm text-zinc-600 space-x-2 mb-2">
        <a href="/attendance" class="hover:text-gold-600">Attendance</a>
        <span>/</span>
        <span class="text-gold-600 font-medium">Attendance List</span>
      </div>
      
      <!-- Page Title -->
      <div class="card">
        <div class="card-header">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-full bg-gold-100 flex items-center justify-center">
                <Clock class="h-6 w-6 text-gold-600" />
              </div>
              <div>
                <h1 class="text-2xl font-bold text-zinc-900">Attendance List</h1>
                <p class="text-sm text-zinc-600">Daily employee attendance tracking</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <button
                on:click={exportToCSV}
                class="btn-secondary flex items-center gap-2"
              >
                <Download class="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Date and Shift Selection -->
      <div class="card">
        <div class="card-content">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Date Picker -->
            <div>
              <label class="block text-sm font-medium text-zinc-700 mb-2">Date</label>
              <input
                type="date"
                bind:value={date}
                class="input w-full"
              />
            </div>
            
            <!-- Shift Selection -->
            <div>
              <label class="block text-sm font-medium text-zinc-700 mb-2">Shift</label>
              <div class="relative">
                <select class="input w-full appearance-none">
                  <option>9:00 AM to 5:00 PM</option>
                  <option>10:00 AM to 6:00 PM</option>
                  <option>11:00 AM to 7:00 PM</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown class="h-4 w-4" />
                </div>
              </div>
            </div>
            
            <!-- Stats Summary -->
            <div class="flex items-center justify-end gap-6">
              <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-emerald-500"></div>
                <span class="text-sm text-zinc-700">On Time: <span class="font-medium">{filteredData.filter(item => item.status === 'On Time').length}</span></span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-3 w-3 rounded-full bg-amber-500"></div>
                <span class="text-sm text-zinc-700">Late: <span class="font-medium">{filteredData.filter(item => item.status === 'Late').length}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="card">
        <div class="card-content">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <!-- Employee Name Search -->
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input
                type="text"
                bind:value={filters.employeeName}
                placeholder="Search employee name..."
                class="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            
            <!-- Employee ID Search -->
            <div class="relative">
              <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <input
                type="text"
                bind:value={filters.employeeId}
                placeholder="Search employee ID..."
                class="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              />
            </div>
            
            <!-- Department Filter -->
            <div class="relative">
              <Filter class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <select
                bind:value={filters.department}
                class="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none"
              >
                {#each departments as dept}
                  <option value={dept}>{dept}</option>
                {/each}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown class="h-4 w-4" />
              </div>
            </div>
            
            <!-- Status Filter -->
            <div class="relative">
              <Filter class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
              <select
                bind:value={filters.status}
                class="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none"
              >
                <option value="">All Status</option>
                <option value="On Time">On Time</option>
                <option value="Late">Late</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown class="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Attendance List Table -->
      <div class="card overflow-hidden">
        <div class="card-header flex justify-between items-center">
          <h2 class="text-xl font-semibold text-zinc-900">Attendance List • {formatDate(date)}</h2>
          <div class="text-sm text-zinc-600">
            Showing {filteredData.length} of {attendanceData.length} employees
          </div>
        </div>
        
        <div class="card-content p-0">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gold-100">
              <thead class="bg-gold-50/50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Employee</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Employee ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Department</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Login Time</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Logout Time</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Profile</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gold-100/50">
                {#each filteredData as employee}
                  <tr class="hover:bg-zinc-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="h-10 w-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-medium">
                          {employee.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-zinc-900">{employee.employeeName}</div>
                          <div class="text-sm text-zinc-500">{employee.designation}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                      {employee.employeeId}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
                        {employee.department}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                      {employee.loginTime}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                      {employee.logoutTime === '-' ? '–' : employee.logoutTime}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {employee.status === 'On Time' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                        <span class="{employee.status === 'On Time' ? 'text-emerald-500' : 'text-amber-500'} mr-1">
                          {employee.status === 'On Time' ? '●' : '●'}
                        </span>
                        {employee.status}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="/employees/{employee.employeeId}" class="text-blue-600 hover:text-blue-900">View details</a>
                    </td>
                  </tr>
                {/each}

                {#if filteredData.length === 0}
                  <tr>
                    <td colspan="7" class="px-6 py-12 text-center">
                      <div class="flex flex-col items-center">
                        <Clock class="h-12 w-12 text-zinc-300 mb-3" />
                        <p class="text-zinc-500 text-lg">No attendance records found</p>
                        <p class="text-zinc-400 text-sm mt-1">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                {/if}
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Pagination -->
        <div class="bg-white border-t border-gold-100 px-6 py-3 flex items-center justify-between">
          <div class="text-sm text-zinc-500">
            1-10 of 50
          </div>
          <div class="flex items-center space-x-2">
            <button class="px-3 py-1 border border-gold-200 rounded text-sm text-gold-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <span class="text-sm text-zinc-700">Page 1 of 5</span>
            <button class="px-3 py-1 border border-gold-200 rounded text-sm bg-gold-50 text-gold-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>


