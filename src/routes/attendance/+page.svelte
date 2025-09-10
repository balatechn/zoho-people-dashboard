<script>
  import { Calendar, Search, ChevronLeft, ChevronRight, User, Clock, MapPin, Upload, FileText, X, CheckCircle, AlertCircle, Filter, Download, RefreshCw, MoreVertical, Eye, Edit3, TrendingUp, Users, UserCheck, UserX, Timer, Building } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';

  /** @type {import('./$types').PageData} */
  export let data;

  // Get attendance data from server (loaded from Excel file)
  let attendanceData = data.attendanceData || [];
  let totalItems = data.totalItems || attendanceData.length;
  let excelFileFound = data.excelFileFound || false;
  let loadedFromExcel = data.loadedFromExcel || false;

  let filteredData = [...attendanceData];
  let searchTerm = '';
  let statusFilter = 'All';
  let dateFilter = '';
  let departmentFilter = '';
  let roleFilter = '';
  let currentPage = 1;
  let itemsPerPage = 12;
  let viewMode = 'cards'; // Default to cards view for modern look

  // Date formatting function
  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  // Calculate attendance statistics
  $: attendanceStats = calculateAttendanceStats(filteredData);

  // Aggregate attendance data by employee
  $: aggregatedData = aggregateAttendanceByEmployee(filteredData);

  function aggregateAttendanceByEmployee(data) {
    const employeeMap = new Map();
    
    data.forEach(record => {
      const empId = record['Employee Id'];
      const empName = record['Employee Name'];
      
      if (!employeeMap.has(empId)) {
        employeeMap.set(empId, {
          'Employee Id': empId,
          'Employee Name': empName,
          Department: record.Department,
          Role: record.Role,
          totalWorkDays: 0,
          presentDays: 0,
          absentDays: 0,
          totalHours: 0,
          attendanceRecords: []
        });
      }
      
      const employee = employeeMap.get(empId);
      employee.totalWorkDays++;
      employee.attendanceRecords.push(record);
      
      // Check if present
      if (record['First In'] && record['First In'] !== '' && record['First In'] !== '--') {
        employee.presentDays++;
        
        // Calculate hours
        const hours = parseFloat(record['Total Hours']) || 0;
        employee.totalHours += hours;
      } else {
        employee.absentDays++;
      }
    });
    
    // Convert to array and calculate averages
    return Array.from(employeeMap.values()).map(emp => ({
      ...emp,
      attendanceRate: emp.totalWorkDays > 0 ? (emp.presentDays / emp.totalWorkDays * 100).toFixed(1) : '0.0',
      avgHoursPerDay: emp.presentDays > 0 ? (emp.totalHours / emp.presentDays).toFixed(1) : '0.0'
    }));
  }

  function calculateAttendanceStats(data) {
    const stats = {
      total: data.length,
      present: 0,
      absent: 0,
      late: 0,
      onTime: 0,
      avgHours: '0:00'
    };

    let totalMinutes = 0;
    let validHoursCount = 0;

    data.forEach(emp => {
      const status = getAttendanceStatus(emp['First In'], emp['Last Out'], emp['Total Hours']);
      
      if (status.status === 'Absent') {
        stats.absent++;
      } else {
        stats.present++;
        if (status.status === 'Late') {
          stats.late++;
        } else if (status.status === 'On Time') {
          stats.onTime++;
        }
      }

      // Calculate average hours
      if (emp['Total Hours'] && emp['Total Hours'] !== '-' && emp['Total Hours'] !== '00:00') {
        const timeParts = emp['Total Hours'].split(':');
        if (timeParts.length === 2) {
          const hours = parseInt(timeParts[0]) || 0;
          const mins = parseInt(timeParts[1]) || 0;
          totalMinutes += (hours * 60 + mins);
          validHoursCount++;
        }
      }
    });

    if (validHoursCount > 0) {
      const avgTotalMinutes = Math.round(totalMinutes / validHoursCount);
      const avgHours = Math.floor(avgTotalMinutes / 60);
      const avgMins = avgTotalMinutes % 60;
      stats.avgHours = `${avgHours}:${avgMins.toString().padStart(2, '0')}`;
    }

    return stats;
  }

  // Get unique dates, departments and roles for filters
  $: uniqueDates = [...new Set(attendanceData.map(emp => emp.Date))].sort().reverse();
  $: uniqueDepartments = [...new Set(attendanceData.map(emp => emp.Department).filter(Boolean))].sort();
  $: uniqueRoles = [...new Set(attendanceData.map(emp => emp.Role).filter(Boolean))].sort();

  // Function to generate employee initials
  function getEmployeeInitials(name) {
    if (!name || typeof name !== 'string') return '?';
    return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase();
  }

  // Function to determine attendance status
  function getAttendanceStatus(firstIn, lastOut, totalHours) {
    if (!firstIn || firstIn === '-') return { status: 'Absent', color: 'bg-red-100 text-red-800' };
    if (!lastOut || lastOut === '-') return { status: 'Active', color: 'bg-green-100 text-green-800' };
    
    // Parse first in time to check if late (after 9:30 AM)
    const [time, period] = firstIn.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = (period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours) * 60 + minutes;
    const lateThreshold = 9 * 60 + 30; // 9:30 AM in minutes
    
    if (totalMinutes > lateThreshold) {
      return { status: 'Late', color: 'bg-amber-100 text-amber-800' };
    } else {
      return { status: 'On Time', color: 'bg-blue-100 text-blue-800' };
    }
  }

  // Layout mode state
  let selectedDateRange = 'today'; // today, week, month, custom
  let customDateFrom = '';
  let customDateTo = '';

  // Bulk upload state
  let showUploadModal = false;
  let showFiltersPanel = false;
  let showEmployeeModal = false;
  let selectedEmployee = null;
  let uploadFile = null;
  let uploadProgress = 0;
  let uploadStatus = 'idle'; // idle, uploading, success, error
  let uploadMessage = '';
  let dragOver = false;

  // Editing state
  let editingRows = new Set();
  let editedData = {};

  // Today's date - September 10, 2025
  const today = new Date(2025, 8, 10);
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Filter and search functionality
  $: {
    filteredData = attendanceData.filter(emp => {
      const matchesSearch = emp['Employee Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp['Employee Id']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp['Email ID']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.Department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.Designation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.Location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           emp.Role?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const attendanceStatus = getAttendanceStatus(emp['First In'], emp['Last Out'], emp['Total Hours']);
      const matchesStatus = statusFilter === 'All' || attendanceStatus.status === statusFilter;
      
      const matchesDate = !dateFilter || emp.Date === dateFilter;
      const matchesDepartment = !departmentFilter || emp.Department === departmentFilter;
      const matchesRole = !roleFilter || emp.Role === roleFilter;
      
      return matchesSearch && matchesStatus && matchesDate && matchesDepartment && matchesRole;
    });
    
    // Update total items based on filtered results
    totalItems = filteredData.length;
  }

  // Pagination - use aggregated data length  
  $: totalPages = Math.ceil(aggregatedData.length / itemsPerPage);
  $: paginatedData = aggregatedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  $: totalItems = aggregatedData.length;

  function handleSearch(event) {
    searchTerm = event.target.value;
    currentPage = 1; // Reset to first page when searching
  }

  function handleStatusFilter(status) {
    statusFilter = status;
    currentPage = 1;
  }

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }

  function viewDetails(employee) {
    // Handle view details action
    console.log('View details for:', employee['Employee Name']);
  }

  function viewEmployeeDetails(employee) {
    selectedEmployee = employee;
    showEmployeeModal = true;
  }

  // Edit functionality
  function startEdit(employeeId) {
    editingRows.add(employeeId);
    editingRows = editingRows; // Trigger reactivity
    
    // Initialize edited data for this row
    const employee = attendanceData.find(emp => emp['Employee Id'] === employeeId);
    if (employee) {
      editedData[employeeId] = {
        Department: employee.Department || '',
        Designation: employee.Designation || '',
        Location: employee.Location || '',
        Role: employee.Role || ''
      };
    }
  }

  function cancelEdit(employeeId) {
    editingRows.delete(employeeId);
    editingRows = editingRows; // Trigger reactivity
    delete editedData[employeeId];
  }

  function saveEdit(employeeId) {
    if (editedData[employeeId]) {
      // Update the main data
      const employeeIndex = attendanceData.findIndex(emp => emp['Employee Id'] === employeeId);
      if (employeeIndex !== -1) {
        attendanceData[employeeIndex] = {
          ...attendanceData[employeeIndex],
          ...editedData[employeeId]
        };
        attendanceData = attendanceData; // Trigger reactivity
      }
      
      // Update filtered data
      const filteredIndex = filteredData.findIndex(emp => emp['Employee Id'] === employeeId);
      if (filteredIndex !== -1) {
        filteredData[filteredIndex] = {
          ...filteredData[filteredIndex],
          ...editedData[employeeId]
        };
        filteredData = filteredData; // Trigger reactivity
      }
    }
    
    editingRows.delete(employeeId);
    editingRows = editingRows; // Trigger reactivity
    delete editedData[employeeId];
  }

  function updateEditedField(employeeId, field, value) {
    if (!editedData[employeeId]) {
      editedData[employeeId] = {};
    }
    editedData[employeeId][field] = value;
  }

  // Bulk upload functions
  function openUploadModal() {
    showUploadModal = true;
    uploadStatus = 'idle';
    uploadFile = null;
    uploadProgress = 0;
    uploadMessage = '';
  }

  function closeUploadModal() {
    showUploadModal = false;
    uploadFile = null;
    uploadProgress = 0;
    uploadStatus = 'idle';
    uploadMessage = '';
  }

  function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel')) {
      uploadFile = file;
      uploadStatus = 'idle';
      uploadMessage = '';
    } else {
      uploadStatus = 'error';
      uploadMessage = 'Please select a valid Excel file (.xlsx or .xls)';
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    dragOver = false;
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
        uploadFile = file;
        uploadStatus = 'idle';
        uploadMessage = '';
      } else {
        uploadStatus = 'error';
        uploadMessage = 'Please select a valid Excel file (.xlsx or .xls)';
      }
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
    dragOver = true;
  }

  function handleDragLeave(event) {
    event.preventDefault();
    dragOver = false;
  }

  async function uploadAttendance() {
    if (!uploadFile) {
      uploadStatus = 'error';
      uploadMessage = 'Please select a file to upload';
      return;
    }

    uploadStatus = 'uploading';
    uploadProgress = 0;
    uploadMessage = 'Processing Excel file...';

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        uploadProgress += 10;
        if (uploadProgress >= 90) {
          clearInterval(progressInterval);
        }
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      uploadProgress = 100;
      uploadStatus = 'success';
      uploadMessage = `Successfully processed attendance data from ${uploadFile.name}. 25 records imported.`;

      // Simulate adding new data to the table
      setTimeout(() => {
        totalItems += 25;
        closeUploadModal();
      }, 2000);

    } catch (error) {
      uploadStatus = 'error';
      uploadMessage = 'Failed to upload attendance data. Please try again.';
      console.error('Upload error:', error);
    }
  }

  function downloadTemplate() {
    // Create a template structure with the new column headers
    const templateData = [
      ['Employee Id', 'Employee Name', 'Email ID', 'Department', 'Designation', 'Location', 'Role', 'First In', 'Last Out', 'Total Hours'],
      ['NCPL001', 'John Doe', 'john.doe@nationalconsultingindia.com', 'Software Development', 'Developer', 'Head Office', 'Team member', '09:00 AM', '06:00 PM', '09:00'],
      ['NCPL002', 'Jane Smith', 'jane.smith@nationalconsultingindia.com', 'Marketing', 'Marketing Executive', 'Head Office', 'Team member', '09:15 AM', '06:15 PM', '09:00'],
      ['NCPL003', 'Bob Johnson', 'bob.johnson@nationalconsultingindia.com', 'HR', 'HR Manager', 'Head Office', 'Manager', '08:45 AM', '05:45 PM', '09:00']
    ];
    
    // Convert to CSV for download
    const csvContent = templateData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'attendance-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
  <title>Attendance Dashboard - Zoho People</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100">
  <Header />
  
  <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12">
    <!-- Sidebar -->
    <aside class="lg:col-span-2">
      <Sidebar currentPath="/attendance" />
    </aside>

    <!-- Main Content -->
    <main class="lg:col-span-10 space-y-6">
      <!-- Page Header -->
      <div class="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 rounded-2xl shadow-2xl border border-gold-200/50 p-8 text-white backdrop-blur-sm">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                <UserCheck class="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 class="text-2xl lg:text-3xl font-bold text-white drop-shadow-sm">
                  Attendance Dashboard
                </h1>
                <p class="text-gold-100 text-sm">September 10, 2025 • Today</p>
              </div>
            </div>
            
            {#if loadedFromExcel}
              <div class="flex items-center space-x-2 mt-3">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span class="text-sm text-green-600 font-medium">
                  Live data from {totalItems} employee records
                </span>
              </div>
            {/if}
          </div>
          
          <div class="flex items-center space-x-3">
            <button 
              class="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 text-sm font-medium transition-all"
              on:click={() => showFiltersPanel = !showFiltersPanel}
            >
              <Filter class="h-4 w-4" />
              <span>Filters</span>
            </button>
            
            <button class="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all">
              <Download class="h-4 w-4" />
              <span>Export</span>
            </button>
            
            <button 
              class="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-medium transition-all"
              on:click={openUploadModal}
            >
              <Upload class="h-4 w-4" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Employees -->
        <div class="bg-gradient-to-br from-offwhite-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 p-6 hover:shadow-xl transition-all backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gold-700 mb-1">Total Employees</p>
              <p class="text-3xl font-bold text-gold-800">{attendanceStats.total}</p>
              <p class="text-xs text-gold-600 mt-1">Active today</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <!-- Present -->
        <div class="bg-gradient-to-br from-green-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 p-6 hover:shadow-xl transition-all backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-green-700 mb-1">Present</p>
              <p class="text-3xl font-bold text-green-600">{attendanceStats.present}</p>
              <p class="text-xs text-green-600 mt-1">
                {attendanceStats.total > 0 ? Math.round((attendanceStats.present / attendanceStats.total) * 100) : 0}% attendance
              </p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserCheck class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <!-- Absent -->
        <div class="bg-gradient-to-br from-red-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 p-6 hover:shadow-xl transition-all backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-red-700 mb-1">Absent</p>
              <p class="text-3xl font-bold text-red-600">{attendanceStats.absent}</p>
              <p class="text-xs text-red-600 mt-1">Missing today</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserX class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <!-- Average Hours -->
        <div class="bg-gradient-to-br from-purple-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 p-6 hover:shadow-xl transition-all backdrop-blur-sm">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-purple-700 mb-1">Avg. Hours</p>
              <p class="text-3xl font-bold text-purple-600">{attendanceStats.avgHours}</p>
              <p class="text-xs text-purple-600 mt-1">Per employee</p>
            </div>
            <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Timer class="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Controls -->
      <div class="bg-gradient-to-br from-offwhite-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 p-6 backdrop-blur-sm">
        <div class="flex flex-col lg:flex-row lg:items-center gap-4">
          <!-- Search -->
          <div class="flex-1 relative">
            <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold-600" />
            <input
              type="text"
              placeholder="Search employees by name, ID, department..."
              class="w-full pl-12 pr-4 py-3 bg-offwhite-50 border border-gold-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm text-gold-800 placeholder-gold-500 shadow-sm"
              value={searchTerm}
              on:input={handleSearch}
            />
          </div>

          <!-- Quick Filters -->
          <div class="flex items-center space-x-2">
            <button
              class="px-4 py-2 text-sm font-medium rounded-xl transition-all shadow-sm {statusFilter === 'All' ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-white' : 'bg-offwhite-100 text-gold-700 hover:bg-gold-100 border border-gold-200'}"
              on:click={() => handleStatusFilter('All')}
            >
              All
            </button>
            <button
              class="px-4 py-2 text-sm font-medium rounded-xl transition-all shadow-sm {statusFilter === 'On Time' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' : 'bg-offwhite-100 text-green-700 hover:bg-green-100 border border-green-200'}"
              on:click={() => handleStatusFilter('On Time')}
            >
              On Time
            </button>
            <button
              class="px-4 py-2 text-sm font-medium rounded-xl transition-all shadow-sm {statusFilter === 'Late' ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white' : 'bg-offwhite-100 text-amber-700 hover:bg-amber-100 border border-amber-200'}"
              on:click={() => handleStatusFilter('Late')}
            >
              Late
            </button>
            <button
              class="px-4 py-2 text-sm font-medium rounded-xl transition-all shadow-sm {statusFilter === 'Absent' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' : 'bg-offwhite-100 text-red-700 hover:bg-red-100 border border-red-200'}"
              on:click={() => handleStatusFilter('Absent')}
            >
              Absent
            </button>
          </div>

          <!-- View Toggle -->
          <div class="flex bg-gold-100 rounded-xl p-1 shadow-sm border border-gold-200">
            <button
              class="px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center space-x-2 {viewMode === 'cards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-800'}"
              on:click={() => viewMode = 'cards'}
            >
              <div class="grid grid-cols-2 gap-0.5 w-3 h-3">
                <div class="bg-current rounded-sm"></div>
                <div class="bg-current rounded-sm"></div>
                <div class="bg-current rounded-sm"></div>
                <div class="bg-current rounded-sm"></div>
              </div>
              <span>Cards</span>
            </button>
            <button
              class="px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center space-x-2 {viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-800'}"
              on:click={() => viewMode = 'table'}
            >
              <div class="flex flex-col space-y-0.5 w-3 h-3">
                <div class="bg-current h-0.5 rounded-sm"></div>
                <div class="bg-current h-0.5 rounded-sm"></div>
                <div class="bg-current h-0.5 rounded-sm"></div>
              </div>
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Filters Panel -->
      {#if showFiltersPanel}
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label for="date-range-filter" class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                id="date-range-filter"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={selectedDateRange}
                on:change={(e) => selectedDateRange = e.target?.value || ''}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div>
              <label for="department-filter-advanced" class="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                id="department-filter-advanced"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={departmentFilter}
                on:change={(e) => { departmentFilter = e.target?.value || ''; currentPage = 1; }}
              >
                <option value="">All Departments</option>
                {#each uniqueDepartments as dept}
                  <option value={dept}>{dept}</option>
                {/each}
              </select>
            </div>
            
            <div>
              <label for="role-filter-advanced" class="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                id="role-filter-advanced"
                class="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={roleFilter}
                on:change={(e) => { roleFilter = e.target?.value || ''; currentPage = 1; }}
              >
                <option value="">All Roles</option>
                {#each uniqueRoles as role}
                  <option value={role}>{role}</option>
                {/each}
              </select>
            </div>
            
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-2">Actions</span>
              <div class="flex space-x-2">
                <button class="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-all">
                  Reset
                </button>
                <button class="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition-all">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      {/if}

      <!-- Attendance Display -->
      <div class="space-y-6">
        {#if viewMode === 'cards'}
          <!-- Cards View - Employee Summary Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each paginatedData as employee (employee['Employee Id'])}
              {@const isEditing = editingRows.has(employee['Employee Id'])}
              {@const editData = editedData[employee['Employee Id']] || {}}
              
              <div class="bg-gradient-to-br from-offwhite-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 hover:shadow-xl transition-all duration-300 overflow-hidden group backdrop-blur-sm">
                <!-- Card Header -->
                <div class="p-6 pb-4">
                  <div class="flex items-start justify-between mb-4">
                    <div class="flex items-center space-x-3">
                      <div class="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg">
                        {getEmployeeInitials(employee['Employee Name'])}
                      </div>
                      <div class="min-w-0 flex-1">
                        <h3 class="font-semibold text-gold-900 truncate text-sm">
                          {employee['Employee Name'] || 'N/A'}
                        </h3>
                        <p class="text-xs text-gold-600 truncate">{employee['Employee Id']}</p>
                        <p class="text-xs text-gold-700 font-medium truncate">{employee.Role || 'Employee'}</p>
                      </div>
                    </div>
                    
                    <div class="text-right">
                      <div class="text-gold-700 text-xs font-medium mb-1">{employee.Department}</div>
                      <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-1 hover:bg-gold-200 rounded-lg">
                          <MoreVertical class="h-4 w-4 text-gold-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Work Time Progress -->
                <div class="px-6 pb-4">
                  <div class="mb-4">
                    <div class="flex justify-between items-center mb-2">
                      <span class="text-sm text-gold-700">Work Time</span>
                      <span class="text-lg font-bold text-gold-900">{employee.totalHours.toFixed(1)}h</span>
                    </div>
                    <div class="w-full bg-gold-200 rounded-full h-2">
                      <div 
                        class="bg-gradient-to-r from-gold-400 to-gold-600 h-2 rounded-full transition-all duration-300 shadow-sm"
                        style="width: {Math.min((employee.totalHours / 40) * 100, 100)}%"
                      ></div>
                    </div>
                  </div>

                  <!-- Attendance Stats -->
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-center">
                      <div class="text-sm text-gold-600 mb-1">Attendance</div>
                      <div class="text-xl font-bold text-gold-900">{employee.attendanceRate}%</div>
                    </div>
                    <div class="text-center">
                      <div class="text-sm text-gold-600 mb-1">Present Days</div>
                      <div class="text-xl font-bold text-gold-900">{employee.presentDays}/{employee.totalWorkDays}</div>
                    </div>
                  </div>
                </div>

                <!-- Action Button -->
                <div class="px-6 pb-6">
                  <button
                    class="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                    on:click={() => viewEmployeeDetails(employee)}
                  >
                    Select Employee
                  </button>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <!-- Table View -->
          <div class="bg-gradient-to-br from-offwhite-50 to-gold-100 rounded-2xl shadow-lg border border-gold-200/50 overflow-hidden backdrop-blur-sm">
            <!-- Table Header -->
            <div class="px-6 py-4 border-b border-gold-200/50 bg-gradient-to-r from-gold-50 to-offwhite-100">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gold-900">Employee Attendance</h3>
                <p class="text-sm text-gold-700">
                  {paginatedData.length} of {totalItems} employees
                </p>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gradient-to-r from-gold-100 to-offwhite-100 border-b border-gold-200/50">
                  <tr>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gold-800 uppercase tracking-wider">
                      Employee
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gold-800 uppercase tracking-wider">
                      Department
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Check In
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Check Out
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Total Hours
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100">
                  {#each paginatedData as employee (employee['Employee Id'] + employee.Date)}
                    {@const attendanceStatus = getAttendanceStatus(employee['First In'], employee['Last Out'], employee['Total Hours'])}
                    {@const isEditing = editingRows.has(employee['Employee Id'])}
                    
                    <tr class="hover:bg-gray-50 transition-colors">
                      <!-- Employee Info -->
                      <td class="px-6 py-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {getEmployeeInitials(employee['Employee Name'])}
                          </div>
                          <div>
                            <p class="font-medium text-gray-900">{employee['Employee Name'] || 'N/A'}</p>
                            <p class="text-sm text-gray-500">{employee['Employee Id']}</p>
                          </div>
                        </div>
                      </td>
                      
                      <!-- Department -->
                      <td class="px-6 py-4">
                        <p class="text-sm text-gray-900">{employee.Department || 'N/A'}</p>
                        <p class="text-xs text-gray-500">{employee.Designation || 'N/A'}</p>
                      </td>
                      
                      <!-- Check In -->
                      <td class="px-6 py-4">
                        <p class="text-sm font-medium text-gray-900">{employee['First In'] || '--:--'}</p>
                      </td>
                      
                      <!-- Check Out -->
                      <td class="px-6 py-4">
                        <p class="text-sm font-medium text-gray-900">{employee['Last Out'] || '--:--'}</p>
                      </td>
                      
                      <!-- Total Hours -->
                      <td class="px-6 py-4">
                        <p class="text-sm font-bold text-blue-600">{employee['Total Hours'] || '00:00'}</p>
                      </td>
                      
                      <!-- Status -->
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                          {attendanceStatus.status === 'On Time' ? 'bg-green-100 text-green-800' : 
                           attendanceStatus.status === 'Late' ? 'bg-amber-100 text-amber-800' : 
                           attendanceStatus.status === 'Absent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}">
                          {attendanceStatus.status}
                        </span>
                      </td>
                      
                      <!-- Actions -->
                      <td class="px-6 py-4">
                        <div class="flex items-center space-x-2">
                          {#if isEditing}
                            <button
                              class="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all"
                              on:click={() => saveEdit(employee['Employee Id'])}
                            >
                              <CheckCircle class="h-4 w-4" />
                            </button>
                            <button
                              class="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all"
                              on:click={() => cancelEdit(employee['Employee Id'])}
                            >
                              <X class="h-4 w-4" />
                            </button>
                          {:else}
                            <button
                              class="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                              on:click={() => startEdit(employee['Employee Id'])}
                            >
                              <Edit3 class="h-4 w-4" />
                            </button>
                            <button
                              class="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all"
                              on:click={() => viewDetails(employee)}
                            >
                              <Eye class="h-4 w-4" />
                            </button>
                          {/if}
                        </div>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        {/if}

        <!-- Pagination -->
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>
              to <span class="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span>
              of <span class="font-medium">{totalItems}</span> results
            </p>
          </div>
          
          <div class="flex items-center space-x-2">
            <button
              class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              disabled={currentPage === 1}
              on:click={() => goToPage(currentPage - 1)}
            >
              <ChevronLeft class="h-4 w-4" />
            </button>
            
            {#each Array(Math.min(5, totalPages)) as _, i}
              {@const page = i + 1}
              <button
                class="px-4 py-2 text-sm font-medium transition-all rounded-lg {page === currentPage ? 'bg-blue-600 text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'}"
                on:click={() => goToPage(page)}
              >
                {page}
              </button>
            {/each}
            
            <button
              class="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              disabled={currentPage === totalPages}
              on:click={() => goToPage(currentPage + 1)}
            >
              <ChevronRight class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
  <!-- Bulk Upload Modal -->
  {#if showUploadModal}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-100">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Upload class="h-5 w-5 text-white" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">Upload Attendance</h3>
          </div>
          <button
            class="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-all"
            on:click={closeUploadModal}
          >
            <X class="h-5 w-5" />
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <!-- File Upload Area -->
          <div 
            class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center transition-all hover:border-gray-300 hover:bg-gray-50 {dragOver ? 'border-blue-400 bg-blue-50' : ''}"
            role="button"
            tabindex="0"
            aria-label="File upload area"
            on:drop={handleDrop}
            on:dragover={handleDragOver}
            on:dragleave={handleDragLeave}
          >
            {#if uploadFile}
              <div class="flex items-center justify-center space-x-3 text-green-600">
                <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText class="h-6 w-6" />
                </div>
                <div class="text-left">
                  <p class="font-medium">{uploadFile.name}</p>
                  <p class="text-sm text-gray-500">{(uploadFile.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
            {:else}
              <div class="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload class="h-8 w-8 text-gray-400" />
              </div>
              <p class="text-gray-600 mb-2">
                Drag and drop your Excel file here, or 
                <label class="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                  browse
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    class="hidden"
                    on:change={handleFileSelect}
                  />
                </label>
              </p>
              <p class="text-sm text-gray-400">Supports .xlsx and .xls files (Max 10MB)</p>
            {/if}
          </div>

          <!-- Status Messages -->
          {#if uploadMessage}
            <div class="mt-4 p-4 rounded-xl {uploadStatus === 'error' ? 'bg-red-50 border border-red-200' : uploadStatus === 'success' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}">
              <div class="flex items-center space-x-3">
                {#if uploadStatus === 'error'}
                  <AlertCircle class="h-5 w-5 text-red-600" />
                  <span class="text-sm font-medium text-red-800">{uploadMessage}</span>
                {:else if uploadStatus === 'success'}
                  <CheckCircle class="h-5 w-5 text-green-600" />
                  <span class="text-sm font-medium text-green-800">{uploadMessage}</span>
                {:else}
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span class="text-sm font-medium text-blue-800">{uploadMessage}</span>
                {/if}
              </div>
            </div>
          {/if}

          <!-- Progress Bar -->
          {#if uploadStatus === 'uploading'}
            <div class="mt-4">
              <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style="width: {uploadProgress}%"
                ></div>
              </div>
              <p class="text-sm text-gray-600 mt-2 text-center">{uploadProgress}% uploaded</p>
            </div>
          {/if}

          <!-- Template Download -->
          <div class="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <p class="text-sm text-gray-700 mb-2 font-medium">
              Need a template? Download our Excel template to get started.
            </p>
            <button
              class="text-blue-600 hover:text-blue-700 text-sm font-semibold underline underline-offset-2 transition-colors"
              on:click={downloadTemplate}
            >
              Download Template →
            </button>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <button
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg transition-all"
            on:click={closeUploadModal}
            disabled={uploadStatus === 'uploading'}
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            on:click={uploadAttendance}
            disabled={!uploadFile || uploadStatus === 'uploading'}
          >
            {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Employee Detail Modal -->
  {#if showEmployeeModal && selectedEmployee}
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header - Orange gradient like the image -->
        <div class="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-6 text-white relative">
          <div class="absolute top-4 right-4">
            <button 
              class="text-white/80 hover:text-white transition-colors p-2"
              on:click={() => showEmployeeModal = false}
            >
              <X class="h-6 w-6" />
            </button>
          </div>
          
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-xl border border-white/30">
              {getEmployeeInitials(selectedEmployee['Employee Name'])}
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">{selectedEmployee['Employee Name']}</h3>
              <p class="text-orange-100 font-medium">{selectedEmployee.Role || 'Employee'}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4 text-orange-100">
            <div class="flex items-center space-x-2">
              <Building class="h-4 w-4" />
              <span class="text-sm">{selectedEmployee.Department}</span>
            </div>
            <div class="flex items-center space-x-2">
              <User class="h-4 w-4" />
              <span class="text-sm">{selectedEmployee['Employee Id']}</span>
            </div>
          </div>
        </div>

        <!-- Stats Cards Section -->
        <div class="p-6 bg-gray-50">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <!-- Attendance Rate -->
            <div class="bg-green-50 rounded-xl p-4 border border-green-100">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar class="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p class="text-green-600 text-sm font-semibold">Attendance Rate</p>
                  <p class="text-green-800 text-lg font-bold">{selectedEmployee.attendanceRate}%</p>
                </div>
              </div>
            </div>

            <!-- Present Days -->
            <div class="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users class="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p class="text-blue-600 text-sm font-semibold">Present Days</p>
                  <p class="text-blue-800 text-lg font-bold">{selectedEmployee.presentDays}</p>
                  <p class="text-blue-500 text-xs">of {selectedEmployee.totalWorkDays} working days</p>
                </div>
              </div>
            </div>

            <!-- Total Hours -->
            <div class="bg-orange-50 rounded-xl p-4 border border-orange-100">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock class="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p class="text-orange-600 text-sm font-semibold">Total Hours</p>
                  <p class="text-orange-800 text-lg font-bold">{selectedEmployee.totalHours.toFixed(1)}</p>
                  <p class="text-orange-500 text-xs">hours worked this month</p>
                </div>
              </div>
            </div>

            <!-- Avg Hours/Day -->
            <div class="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp class="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p class="text-purple-600 text-sm font-semibold">Avg Hours/Day</p>
                  <p class="text-purple-800 text-lg font-bold">{selectedEmployee.avgHoursPerDay}h</p>
                  <p class="text-purple-500 text-xs">when present</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <!-- Employee Information Section - Smaller -->
          <div class="lg:col-span-1">
            <div class="flex items-center space-x-2 mb-4">
              <User class="h-5 w-5 text-gray-600" />
              <h4 class="font-semibold text-gray-900">Employee Information</h4>
            </div>
            
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Employee ID:</span>
                <span class="font-medium text-gray-900">{selectedEmployee['Employee Id']}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Email:</span>
                <span class="font-medium text-gray-900 text-xs break-all">{selectedEmployee['Employee Name'].toLowerCase().replace(/\s+/g, '.') + '@nationalconsulting.com'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Location:</span>
                <span class="font-medium text-gray-900">Head Office</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Department:</span>
                <span class="font-medium text-gray-900">{selectedEmployee.Department}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Role:</span>
                <span class="font-medium text-gray-900">{selectedEmployee.Role || 'Employee'}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Shift:</span>
                <span class="font-medium text-gray-900">09:00 AM - 06:00 PM Shift B</span>
              </div>
            </div>
          </div>

          <!-- Recent Attendance Section - Larger and Clearer -->
          <div class="lg:col-span-2">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2">
                <Calendar class="h-5 w-5 text-gray-600" />
                <h4 class="font-semibold text-gray-900">Recent Attendance</h4>
              </div>
              <button class="text-orange-600 hover:text-orange-700 text-sm font-semibold">
                View Full History
              </button>
            </div>

            <!-- Attendance Records Table - Improved Layout -->
            <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <!-- Table Header -->
              <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div class="grid grid-cols-6 gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <span>DATE</span>
                  <span>STATUS</span>
                  <span>FIRST IN</span>
                  <span>LAST OUT</span>
                  <span>HOURS</span>
                  <span>NET</span>
                </div>
              </div>
              
              <!-- Table Body -->
              <div class="max-h-80 overflow-y-auto">
                {#each selectedEmployee.attendanceRecords.slice(0, 15) as record, index}
                  {@const attendanceStatus = getAttendanceStatus(record['First In'], record['Last Out'], record['Total Hours'])}
                  <div class="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors {index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}">
                    <div class="grid grid-cols-6 gap-4 text-sm items-center">
                      <span class="font-medium text-gray-900">{formatDate(record.Date)}</span>
                      <span class="inline-flex w-fit px-2 py-1 text-xs font-medium rounded-full
                        {record['First In'] && record['First In'] !== '' && record['First In'] !== '--' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        {record['First In'] && record['First In'] !== '' && record['First In'] !== '--' ? 'Present' : 'Absent'}
                      </span>
                      <span class="text-gray-900 font-mono">{record['First In'] || '--:--'}</span>
                      <span class="text-gray-900 font-mono">{record['Last Out'] || '--:--'}</span>
                      <span class="text-gray-900 font-mono font-semibold">{record['Total Hours'] || '00:00'}</span>
                      <span class="text-red-600 font-medium font-mono">-00:09</span>
                    </div>
                  </div>
                {/each}
              </div>
              
              <!-- Table Footer -->
              {#if selectedEmployee.attendanceRecords.length > 15}
                <div class="bg-gray-50 px-4 py-3 border-t border-gray-200 text-center">
                  <span class="text-sm text-gray-500">
                    Showing 15 of {selectedEmployee.attendanceRecords.length} records
                  </span>
                  <button class="ml-2 text-orange-600 hover:text-orange-700 text-sm font-semibold">
                    Load More
                  </button>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
