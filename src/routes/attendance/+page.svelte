<script>
  import { onMount } from 'svelte';
  import { 
    Users, Clock, CalendarCheck, Filter, Download, Search, 
    Upload, Settings, AlertCircle, FileText, TrendingUp
  } from 'lucide-svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  
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
  let uploadProgress = 0;
  let fileInput;

  // Sample data updated to match the live site employee data
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
      date: '08-Sep-2025',
      firstIn: '09:07 AM',
      lastOut: '07:34 PM',
      totalHours: '10:27',
      totalHoursDecimal: 10.45,
      earlyEntry: '+00:53',
      lateEntry: '-',
      earlyExit: '-',
      lateExit: '+00:34',
      netHours: '+01:27',
      shiftName: '[10:00 AM - 07:00 PM] Shift C',
      status: 'Present'
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
      date: '08-Sep-2025',
      firstIn: '10:16 AM',
      lastOut: '06:47 PM',
      totalHours: '08:31',
      totalHoursDecimal: 8.52,
      earlyEntry: '-',
      lateEntry: '-01:16',
      earlyExit: '-',
      lateExit: '+00:47',
      netHours: '-00:29',
      shiftName: '[09:00 AM - 06:00 PM] Shift B',
      status: 'Present'
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
      date: '08-Sep-2025',
      firstIn: '09:29 AM',
      lastOut: '06:38 PM',
      totalHours: '09:09',
      totalHoursDecimal: 9.15,
      earlyEntry: '-',
      lateEntry: '-00:29',
      earlyExit: '-',
      lateExit: '+00:38',
      netHours: '+00:09',
      shiftName: '[09:00 AM - 06:00 PM] Shift B',
      status: 'Present'
    },
    {
      employeeId: 'NCPL007',
      employeeName: 'Karthik M K',
      emailId: 'karthik.mk@nationalconsultingindia.com',
      reportingTo: 'Mohammed Farooq',
      department: 'Accounts',
      designation: 'CFO',
      location: 'Head Office',
      role: 'Manager',
      date: '08-Sep-2025',
      firstIn: '08:45 AM',
      lastOut: '05:45 PM',
      totalHours: '09:00',
      totalHoursDecimal: 9.0,
      earlyEntry: '+00:15',
      lateEntry: '-',
      earlyExit: '-00:15',
      lateExit: '-',
      netHours: '00:00',
      shiftName: '[09:00 AM - 06:00 PM] Shift B',
      status: 'Present'
    },
    {
      employeeId: 'NCPL019',
      employeeName: 'BP Balasubramanian Pillai',
      emailId: 'bala@nationalconsultingindia.com',
      reportingTo: 'Mohammed Farooq',
      department: 'IT',
      designation: 'Manager IT',
      location: 'Head Office',
      role: 'Manager',
      date: '08-Sep-2025',
      firstIn: '09:00 AM',
      lastOut: '06:00 PM',
      totalHours: '09:00',
      totalHoursDecimal: 9.0,
      earlyEntry: '-',
      lateEntry: '-',
      earlyExit: '-',
      lateExit: '-',
      netHours: '00:00',
      shiftName: '[09:00 AM - 06:00 PM] Shift B',
      status: 'Present'
    },
    {
      employeeId: 'NCPL024',
      employeeName: 'Yahya Ayash Luqman',
      emailId: 'yahya@nationalconsultingindia.com',
      reportingTo: 'Mohammed Farooq',
      department: 'Software Development',
      designation: 'Software Development Manager',
      location: 'Head Office',
      role: 'Manager',
      date: '08-Sep-2025',
      firstIn: '09:15 AM',
      lastOut: '06:30 PM',
      totalHours: '09:15',
      totalHoursDecimal: 9.25,
      earlyEntry: '-',
      lateEntry: '-00:15',
      earlyExit: '-',
      lateExit: '+00:30',
      netHours: '+00:15',
      shiftName: '[09:00 AM - 06:00 PM] Shift B',
      status: 'Present'
    },
    {
      employeeId: 'NCPL038',
      employeeName: 'Harshdeep Singh',
      emailId: 'harshdeep.s@nationalconsultingindia.com',
      reportingTo: 'Mohammed Farooq',
      department: 'Marketing',
      designation: 'Head of Marketing',
      location: 'Head Office',
      role: 'Manager',
      date: '08-Sep-2025',
      firstIn: '-',
      lastOut: '-',
      totalHours: '00:00',
      totalHoursDecimal: 0.0,
      earlyEntry: '-',
      lateEntry: '-',
      earlyExit: '-',
      lateExit: '-',
      netHours: '-09:00',
      shiftName: '[09:00 AM - 06:00 PM] Shift B',
      status: 'Absent'
    },
    {
      employeeId: 'NCPL028',
      employeeName: 'Adityaa Nagarajan',
      emailId: 'aadityaa@nationalconsultingindia.com',
      reportingTo: 'Yahya Ayash Luqman',
      department: 'Software Development',
      designation: 'Full Stack Developer',
      location: 'Head Office',
      role: 'Team member',
      date: '08-Sep-2025',
      firstIn: '10:30 AM',
      lastOut: '07:00 PM',
      totalHours: '08:30',
      totalHoursDecimal: 8.5,
      earlyEntry: '-',
      lateEntry: '-01:30',
      earlyExit: '-',
      lateExit: '+01:00',
      netHours: '-00:30',
      shiftName: '[09:00 AM - 06:00 PM] Shift B',
      status: 'Present'
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

  // Group data by department for better organization
  $: groupedData = (() => {
    const groups = {};
    filteredData.forEach(record => {
      if (!groups[record.department]) {
        groups[record.department] = [];
      }
      groups[record.department].push(record);
    });
    return groups;
  })();

  $: departmentStats = (() => {
    const stats = {};
    Object.keys(groupedData).forEach(dept => {
      const deptData = groupedData[dept];
      const present = deptData.filter(r => r.status === 'Present').length;
      const absent = deptData.filter(r => r.status === 'Absent').length;
      const avgHours = deptData.length > 0 
        ? (deptData.reduce((sum, r) => sum + r.totalHoursDecimal, 0) / deptData.length).toFixed(1)
        : 0;
      
      stats[dept] = {
        total: deptData.length,
        present,
        absent,
        avgHours
      };
    });
    return stats;
  })();

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
</script>

<svelte:head>
  <title>Attendance Dashboard - National Consulting India</title>
  <meta name="description" content="Track and analyze employee attendance patterns" />
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
      <!-- Page Title -->
      <div class="card">
        <div class="card-header">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <Clock class="h-6 w-6 text-gold-600" />
              <div>
                <h1 class="text-2xl font-bold text-zinc-900">Attendance</h1>
                <p class="text-sm text-zinc-600">Employee attendance tracking and management</p>
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
              <a
                href="/settings"
                class="btn-secondary flex items-center gap-2"
              >
                <Upload class="h-4 w-4" />
                Upload Data
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Controls Section -->
      <div class="card">
        <div class="card-content">
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
                  <Search class="h-4 w-4" />
                  Fetch Data
                {/if}
              </button>
              <button
                on:click={() => showFilters = !showFilters}
                class="btn-secondary flex items-center gap-2 justify-center"
              >
                <Filter class="h-4 w-4" />
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
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="card">
          <div class="card-content">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-zinc-600">Total Employees</p>
                <p class="text-3xl font-bold text-zinc-900">{statistics.totalEmployees}</p>
              </div>
              <Users class="h-8 w-8 text-gold-500" />
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-content">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-zinc-600">Total Records</p>
                <p class="text-3xl font-bold text-zinc-900">{statistics.totalRecords}</p>
              </div>
              <FileText class="h-8 w-8 text-emerald-500" />
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-zinc-600">Average Hours</p>
                <p class="text-3xl font-bold text-zinc-900">{statistics.avgHours}</p>
              </div>
              <Clock class="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-content">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-zinc-600">Late Entries</p>
                <p class="text-3xl font-bold text-red-600">{statistics.lateEntries}</p>
              </div>
              <AlertCircle class="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      {#if error}
        <div class="bg-red-50 border border-red-200 rounded-lg p-4">
          <div class="flex items-center gap-2">
            <AlertCircle class="h-5 w-5 text-red-500" />
            <p class="text-red-700">{error}</p>
          </div>
        </div>
      {/if}

      <!-- Data Table with Department Grouping -->
      <div class="card overflow-hidden">
        <div class="card-header flex justify-between items-center">
          <h2 class="text-xl font-semibold text-zinc-900">Today's Attendance Records</h2>
          <div class="text-sm text-zinc-600">
            Showing {filteredData.length} of {attendanceData.length} employees
          </div>
        </div>
        
        <div class="card-content p-0">
          {#each Object.keys(groupedData) as department}
            <!-- Department Header -->
            <div class="bg-gold-50/50 px-6 py-3 border-b border-gold-200/50">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-zinc-900">{department}</h3>
                <div class="text-sm text-zinc-600">
                  Total: <span class="font-medium">{departmentStats[department].total}</span>
                  Present: <span class="font-medium text-emerald-600">{departmentStats[department].present}</span>
                  {#if departmentStats[department].absent > 0}
                    Absent: <span class="font-medium text-red-600">{departmentStats[department].absent}</span>
                  {/if}
                  Avg Hours: <span class="font-medium">{departmentStats[department].avgHours}</span>
                </div>
              </div>
            </div>

            <!-- Department Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-zinc-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Employee</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">First In</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Last Out</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Hours</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Late Entry</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Early Exit</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Net Hours</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Shift</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-zinc-200">
                  {#each groupedData[department] as record}
                    <tr class="hover:bg-gold-50/30 transition-colors">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="h-8 w-8 rounded-full bg-gold-100 flex items-center justify-center text-sm font-medium text-gold-800 mr-3">
                            {record.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <div class="text-sm font-medium text-zinc-900">{record.employeeName}</div>
                            <div class="text-sm text-zinc-500">{record.employeeId} • {record.designation}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {record.status === 'Present' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                          {record.status}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                        {record.firstIn}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                        {record.lastOut}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900">
                        {record.totalHours}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-sm {record.lateEntry.startsWith('-') ? 'text-red-600 font-medium' : 'text-zinc-500'}">
                          {record.lateEntry === '-' ? 'On Time' : record.lateEntry}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-sm {record.earlyExit.startsWith('-') ? 'text-red-600 font-medium' : 'text-zinc-500'}">
                          {record.earlyExit === '-' ? 'On Time' : record.earlyExit}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="text-sm font-medium {record.netHours.startsWith('+') ? 'text-emerald-600' : record.netHours.startsWith('-') ? 'text-red-600' : 'text-zinc-500'}">
                          {record.netHours}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                        {record.shiftName.replace(/\[|\]/g, '')}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/each}

          {#if filteredData.length === 0 && !loading}
            <div class="text-center py-12">
              <Clock class="h-12 w-12 text-zinc-400 mx-auto mb-4" />
              <p class="text-zinc-500 text-lg">No attendance records found for the selected criteria.</p>
              <p class="text-zinc-400 text-sm mt-2">Try adjusting your filters or date range.</p>
            </div>
          {/if}
        </div>
      </div>

      <!-- Footer -->
      <div class="pb-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} National Consulting India • Attendance Dashboard • Gold & Off‑White theme
      </div>
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
