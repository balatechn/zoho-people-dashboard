<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  
  // Icons (you can replace these with your preferred icon library)
  const icons = {
    calendar: '📅',
    filter: '🔍',
    download: '⬇️',
    search: '🔎',
    clock: '🕐',
    trendingUp: '📈',
    users: '👥',
    alertCircle: '⚠️',
    checkCircle: '✅',
    upload: '⬆️',
    fileText: '📄',
    settings: '⚙️'
  };

  // State management
  let attendanceData = [];
  let filteredData = [];
  let loading = false;
  let error = null;
  let dateRange = {
    fromDate: '2025-08-01',
    toDate: '2025-08-31'
  };
  
  // Filter states
  let filters = {
    employeeId: '',
    employeeName: '',
    department: '',
    designation: '',
    location: '',
    shift: '',
    earlyEntry: '',
    lateEntry: '',
    earlyExit: '',
    lateExit: '',
    minTotalHours: '',
    maxTotalHours: ''
  };

  let showFilters = false;
  let uploadFile = null;
  let uploadProgress = 0;
  let fileInput;

  // Sample data based on your Early_Late Report
  const sampleAttendanceData = [
    {
      employeeId: 'NCPL001',
      employeeName: 'Mohammed Farooq',
      emailId: 'farooq@nationalconsultingindia.com',
      reportingTo: '',
      department: 'Management',
      designation: 'EA - Director',
      location: 'Head Office',
      role: 'Admin',
      date: '01-Aug-2025',
      firstIn: '09:07 AM',
      lastOut: '07:34 PM',
      totalHours: '10:27',
      totalHoursDecimal: 10.45,
      earlyEntry: '+00:53',
      lateEntry: '-',
      earlyExit: '-',
      lateExit: '+00:34',
      netHours: '+01:27',
      shiftName: '[10:00 AM - 07:00 PM] Shift C'
    },
    {
      employeeId: 'NCPL002',
      employeeName: 'Shruthi Nandeesh',
      emailId: 'shruthi.d@nationalconsultingindia.com',
      reportingTo: 'Mohammed Faisal',
      department: 'HR',
      designation: 'Asst Manager HR',
      location: 'Head Office',
      role: 'Manager',
      date: '01-Aug-2025',
      firstIn: '10:16 AM',
      lastOut: '09:47 AM',
      totalHours: '23:31',
      totalHoursDecimal: 23.52,
      earlyEntry: '-',
      lateEntry: '-01:16',
      earlyExit: '-',
      lateExit: '+15:47',
      netHours: '+14:31',
      shiftName: '[09:00 AM - 06:00 PM] Shift B'
    },
    {
      employeeId: 'NCPL010',
      employeeName: 'Abhiram C',
      emailId: 'abhiram.c@nationalconsultingindia.com',
      reportingTo: 'Harshdeep Singh',
      department: 'Marketing',
      designation: 'Graphic Designer',
      location: 'Head Office',
      role: 'Team member',
      date: '01-Aug-2025',
      firstIn: '09:29 AM',
      lastOut: '06:38 PM',
      totalHours: '09:09',
      totalHoursDecimal: 9.15,
      earlyEntry: '-',
      lateEntry: '-00:29',
      earlyExit: '-',
      lateExit: '+00:38',
      netHours: '+00:09',
      shiftName: '[09:00 AM - 06:00 PM] Shift B'
    }
  ];

  // Initialize with sample data
  onMount(() => {
    attendanceData = sampleAttendanceData;
    filteredData = sampleAttendanceData;
  });

  // Fetch attendance data from API
  async function fetchAttendanceData() {
    loading = true;
    error = null;
    
    try {
      const params = new URLSearchParams({
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate
      });
      
      if (filters.employeeId) {
        params.append('employeeId', filters.employeeId);
      }

      const response = await fetch(`/api/timetracker?${params}`);
      const result = await response.json();
      
      if (result.success) {
        attendanceData = result.data || [];
        applyFilters();
      } else {
        error = result.message || 'Failed to fetch attendance data';
        // Use sample data on error
        attendanceData = sampleAttendanceData;
        filteredData = sampleAttendanceData;
      }
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      error = 'Failed to connect to server. Using sample data.';
      // Use sample data on error
      attendanceData = sampleAttendanceData;
      filteredData = sampleAttendanceData;
    } finally {
      loading = false;
    }
  }

  // Apply filters to data
  function applyFilters() {
    let filtered = [...attendanceData];

    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (!value) return;

      switch (key) {
        case 'employeeId':
          filtered = filtered.filter(item => 
            item.employeeId.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'employeeName':
          filtered = filtered.filter(item => 
            item.employeeName.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'department':
          filtered = filtered.filter(item => 
            item.department.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'designation':
          filtered = filtered.filter(item => 
            item.designation.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'location':
          filtered = filtered.filter(item => 
            item.location.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'shift':
          filtered = filtered.filter(item => 
            item.shiftName.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'minTotalHours':
          filtered = filtered.filter(item => 
            item.totalHoursDecimal >= parseFloat(value)
          );
          break;
        case 'maxTotalHours':
          filtered = filtered.filter(item => 
            item.totalHoursDecimal <= parseFloat(value)
          );
          break;
      }
    });

    filteredData = filtered;
  }

  // Reactive statements for applying filters
  $: if (filters) {
    applyFilters();
  }

  // Statistics calculations
  $: statistics = (() => {
    const totalEmployees = new Set(filteredData.map(item => item.employeeId)).size;
    const totalRecords = filteredData.length;
    const avgHours = filteredData.length > 0 
      ? (filteredData.reduce((sum, item) => sum + item.totalHoursDecimal, 0) / filteredData.length).toFixed(2)
      : 0;
    
    const earlyEntries = filteredData.filter(item => item.earlyEntry && item.earlyEntry.startsWith('+')).length;
    const lateEntries = filteredData.filter(item => item.lateEntry && item.lateEntry.startsWith('-')).length;
    const earlyExits = filteredData.filter(item => item.earlyExit && item.earlyExit.startsWith('-')).length;
    const lateExits = filteredData.filter(item => item.lateExit && item.lateExit.startsWith('+')).length;

    return {
      totalEmployees,
      totalRecords,
      avgHours,
      earlyEntries,
      lateEntries,
      earlyExits,
      lateExits
    };
  })();

  // Handle file upload
  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      alert('Please upload a CSV or Excel file');
      return;
    }

    uploadFile = file;
    uploadProgress = 0;

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        uploadProgress = Math.min(uploadProgress + 10, 90);
      }, 200);

      const response = await fetch('/api/attendance/upload', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);
      uploadProgress = 100;

      const result = await response.json();
      
      if (result.success) {
        alert('File uploaded successfully!');
        await fetchAttendanceData(); // Refresh data
      } else {
        alert('Upload failed: ' + result.message);
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      uploadFile = null;
      uploadProgress = 0;
    }
  }

  // Export to CSV
  function exportToCSV() {
    const headers = [
      'Employee ID', 'Employee Name', 'Email ID', 'Reporting To', 'Department',
      'Designation', 'Location', 'Role', 'Date', 'First In', 'Last Out',
      'Total Hours', 'Early Entry', 'Late Entry', 'Early Exit', 'Late Exit',
      'Net Hours', 'Shift Name'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        row.employeeId, row.employeeName, row.emailId, row.reportingTo,
        row.department, row.designation, row.location, row.role, row.date,
        row.firstIn, row.lastOut, row.totalHours, row.earlyEntry, row.lateEntry,
        row.earlyExit, row.lateExit, row.netHours, row.shiftName
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${dateRange.fromDate}_to_${dateRange.toDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Clear all filters
  function clearFilters() {
    filters = {
      employeeId: '',
      employeeName: '',
      department: '',
      designation: '',
      location: '',
      shift: '',
      earlyEntry: '',
      lateEntry: '',
      earlyExit: '',
      lateExit: '',
      minTotalHours: '',
      maxTotalHours: ''
    };
  }

  function navigateToSettings() {
    window.location.href = '/settings';
  }
</script>

<svelte:head>
  <title>Attendance Dashboard - Zoho People</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100">
  <!-- Header -->
  <div class="sticky top-0 z-40 border-b border-gold-200/50 bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60">
    <div class="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
      <div class="flex items-center gap-3">
        <div class="h-12 w-12 rounded-xl overflow-hidden bg-white shadow-lg border border-gold-200 flex items-center justify-center">
          <span class="text-2xl">{icons.clock}</span>
        </div>
        <div class="leading-tight">
          <p class="text-xs uppercase tracking-wider text-zinc-500 font-medium">National Consulting India</p>
          <h1 class="text-xl font-bold bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">
            Attendance Dashboard — Track & Analyze
          </h1>
        </div>
      </div>
      <div class="ml-auto flex items-center gap-3">
        <button
          on:click={navigateToSettings}
          class="btn-secondary gap-2 flex items-center"
        >
          <span>{icons.settings}</span>
          Settings
        </button>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Controls Section -->
    <div class="card p-6 mb-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Date Range -->
        <div>
          <label class="block text-sm font-medium text-zinc-700 mb-2">From Date</label>
          <input
            type="date"
            bind:value={dateRange.fromDate}
            class="input w-full"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-zinc-700 mb-2">To Date</label>
          <input
            type="date"
            bind:value={dateRange.toDate}
            class="input w-full"
          />
        </div>

        <!-- Actions -->
        <div class="flex flex-col gap-2">
          <button
            on:click={fetchAttendanceData}
            disabled={loading}
            class="btn-primary flex items-center gap-2 justify-center disabled:opacity-50"
          >
            {#if loading}
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Loading...
            {:else}
              <span>{icons.search}</span>
              Fetch Data
            {/if}
          </button>
          <button
            on:click={() => showFilters = !showFilters}
            class="btn-secondary flex items-center gap-2 justify-center"
          >
            <span>{icons.filter}</span>
            Filters
          </button>
        </div>

        <!-- File Upload -->
        <div>
          <label class="block text-sm font-medium text-zinc-700 mb-2">Upload Excel</label>
          <input
            type="file"
            accept=".csv,.xlsx"
            on:change={handleFileUpload}
            bind:this={fileInput}
            class="input w-full"
          />
          {#if uploadProgress > 0}
            <div class="mt-2 bg-gold-200 rounded-full h-2">
              <div 
                class="bg-gold-500 h-2 rounded-full transition-all duration-300"
                style="width: {uploadProgress}%"
              ></div>
            </div>
          {/if}
        </div>
      </div>

      <!-- Advanced Filters -->
      {#if showFilters}
        <div class="mt-6 p-4 bg-gold-50/50 rounded-lg border border-gold-200/50">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-zinc-900">Advanced Filters</h3>
            <button
              on:click={clearFilters}
              class="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Clear All
            </button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Employee ID"
              bind:value={filters.employeeId}
              class="input"
            />
            <input
              type="text"
              placeholder="Employee Name"
              bind:value={filters.employeeName}
              class="input"
            />
            <input
              type="text"
              placeholder="Department"
              bind:value={filters.department}
              class="input"
            />
            <input
              type="text"
              placeholder="Designation"
              bind:value={filters.designation}
              class="input"
            />
            <input
              type="text"
              placeholder="Location"
              bind:value={filters.location}
              class="input"
            />
            <input
              type="text"
              placeholder="Shift"
              bind:value={filters.shift}
              class="input"
            />
            <input
              type="number"
              placeholder="Min Hours"
              bind:value={filters.minTotalHours}
              class="input"
            />
            <input
              type="number"
              placeholder="Max Hours"
              bind:value={filters.maxTotalHours}
              class="input"
            />
          </div>
        </div>
      {/if}
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-zinc-600">Total Employees</p>
            <p class="text-3xl font-bold text-zinc-900">{statistics.totalEmployees}</p>
          </div>
          <span class="text-2xl text-gold-500">{icons.users}</span>
        </div>
      </div>
      
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-zinc-600">Total Records</p>
            <p class="text-3xl font-bold text-zinc-900">{statistics.totalRecords}</p>
          </div>
          <span class="text-2xl text-emerald-500">{icons.fileText}</span>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-zinc-600">Average Hours</p>
            <p class="text-3xl font-bold text-zinc-900">{statistics.avgHours}</p>
          </div>
          <span class="text-2xl text-blue-500">{icons.clock}</span>
        </div>
      </div>

      <div class="card p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-zinc-600">Late Entries</p>
            <p class="text-3xl font-bold text-red-600">{statistics.lateEntries}</p>
          </div>
          <span class="text-2xl text-red-500">{icons.alertCircle}</span>
        </div>
      </div>
    </div>

    <!-- Error Message -->
    {#if error}
      <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div class="flex items-center gap-2">
          <span class="text-red-500">{icons.alertCircle}</span>
          <p class="text-red-700">{error}</p>
        </div>
      </div>
    {/if}

    <!-- Data Table -->
    <div class="card overflow-hidden">
      <div class="card-header flex justify-between items-center">
        <h2 class="text-xl font-semibold text-zinc-900">Attendance Records</h2>
        <button
          on:click={exportToCSV}
          class="btn-secondary flex items-center gap-2"
        >
          <span>{icons.download}</span>
          Export CSV
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gold-200/50">
          <thead class="bg-gold-50/50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Employee</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">First In</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Last Out</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Hours</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Early Entry</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Late Entry</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Early Exit</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Late Exit</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Net Hours</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Shift</th>
            </tr>
          </thead>
          <tbody class="bg-white/80 divide-y divide-gold-200/30">
            {#each filteredData as record, index}
              <tr class="hover:bg-gold-50/30 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-zinc-900">{record.employeeName}</div>
                  <div class="text-sm text-zinc-500">{record.employeeId}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-zinc-900">{record.department}</div>
                  <div class="text-sm text-zinc-500">{record.designation}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">{record.date}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">{record.firstIn}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">{record.lastOut}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">{record.totalHours}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm {record.earlyEntry.startsWith('+') ? 'text-emerald-600 font-medium' : 'text-zinc-500'}">
                    {record.earlyEntry}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm {record.lateEntry.startsWith('-') ? 'text-red-600 font-medium' : 'text-zinc-500'}">
                    {record.lateEntry}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm {record.earlyExit.startsWith('-') ? 'text-red-600 font-medium' : 'text-zinc-500'}">
                    {record.earlyExit}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm {record.lateExit.startsWith('+') ? 'text-emerald-600 font-medium' : 'text-zinc-500'}">
                    {record.lateExit}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-medium {record.netHours.startsWith('+') ? 'text-emerald-600' : record.netHours.startsWith('-') ? 'text-red-600' : 'text-zinc-500'}">
                    {record.netHours}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">{record.shiftName}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if filteredData.length === 0 && !loading}
        <div class="text-center py-8">
          <p class="text-zinc-500">No attendance records found for the selected criteria.</p>
        </div>
      {/if}
    </div>
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
