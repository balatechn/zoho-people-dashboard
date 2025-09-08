<script>
  import { onMount } from 'svelte';
  import { validateEmployeeData, getDepartmentStats, getEmployeeById } from '$lib/utils/employeeValidator.js';
  import { sampleAttendanceData } from '$lib/sampleData.js';

  let validationReport = null;
  let departmentStats = {};
  let isLoading = true;
  let selectedInconsistency = null;

  onMount(() => {
    // Run validation
    validationReport = validateEmployeeData(sampleAttendanceData);
    departmentStats = getDepartmentStats();
    isLoading = false;
  });

  function viewDetails(inconsistency) {
    selectedInconsistency = inconsistency;
  }

  function closeDetails() {
    selectedInconsistency = null;
  }
</script>

<svelte:head>
  <title>Employee Data Validation - Zoho People Dashboard</title>
</svelte:head>

<main class="min-h-screen bg-gray-50 py-8">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Employee Data Validation</h1>
      <p class="mt-2 text-gray-600">Cross-reference employee data between attendance records and employee database</p>
    </div>

    {#if isLoading}
      <div class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    {:else if validationReport}
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Records</p>
              <p class="text-2xl font-semibold text-gray-900">{validationReport.totalAttendanceRecords}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Valid Records</p>
              <p class="text-2xl font-semibold text-green-600">{validationReport.summary.validCount}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Inconsistencies</p>
              <p class="text-2xl font-semibold text-red-600">{validationReport.inconsistencies.length}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Missing Employees</p>
              <p class="text-2xl font-semibold text-yellow-600">{validationReport.missingEmployees.length}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Department Statistics -->
      <div class="bg-white rounded-lg shadow mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Department Statistics</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {#each Object.entries(departmentStats) as [department, count]}
              <div class="text-center p-4 border rounded-lg">
                <p class="text-sm font-medium text-gray-500">{department}</p>
                <p class="text-xl font-semibold text-gray-900">{count}</p>
              </div>
            {/each}
          </div>
        </div>
      </div>

      <!-- Inconsistencies -->
      {#if validationReport.inconsistencies.length > 0}
        <div class="bg-white rounded-lg shadow mb-8">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Data Inconsistencies</h3>
            <p class="text-sm text-gray-500">Issues found between employee database and attendance records</p>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each validationReport.inconsistencies as inconsistency}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        {inconsistency.type === 'EMPLOYEE_NOT_FOUND' ? 'bg-red-100 text-red-800' :
                         inconsistency.type === 'NAME_MISMATCH' ? 'bg-yellow-100 text-yellow-800' :
                         inconsistency.type === 'DEPARTMENT_MISMATCH' ? 'bg-orange-100 text-orange-800' :
                         'bg-blue-100 text-blue-800'}">
                        {inconsistency.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {inconsistency.employeeId}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      {inconsistency.message}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        class="text-blue-600 hover:text-blue-900"
                        on:click={() => viewDetails(inconsistency)}>
                        View Details
                      </button>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {/if}

      <!-- Missing Employees -->
      {#if validationReport.missingEmployees.length > 0}
        <div class="bg-white rounded-lg shadow">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Missing Attendance Records</h3>
            <p class="text-sm text-gray-500">Employees in database with no attendance records</p>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                {#each validationReport.missingEmployees as employee}
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.employeeId}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {employee.employeeName}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {employee.department}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        No Attendance
                      </span>
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      {/if}
    {/if}
  </div>

  <!-- Modal for viewing details -->
  {#if selectedInconsistency}
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Inconsistency Details</h3>
            <button 
              class="text-gray-400 hover:text-gray-600"
              on:click={closeDetails}>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="space-y-3">
            <div>
              <p class="text-sm font-medium text-gray-500">Type:</p>
              <p class="text-sm text-gray-900">{selectedInconsistency.type.replace('_', ' ')}</p>
            </div>
            
            <div>
              <p class="text-sm font-medium text-gray-500">Employee ID:</p>
              <p class="text-sm text-gray-900">{selectedInconsistency.employeeId}</p>
            </div>
            
            {#if selectedInconsistency.databaseName}
              <div>
                <p class="text-sm font-medium text-gray-500">Database Name:</p>
                <p class="text-sm text-gray-900">{selectedInconsistency.databaseName}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Attendance Name:</p>
                <p class="text-sm text-gray-900">{selectedInconsistency.attendanceName}</p>
              </div>
            {/if}
            
            {#if selectedInconsistency.databaseDepartment}
              <div>
                <p class="text-sm font-medium text-gray-500">Database Department:</p>
                <p class="text-sm text-gray-900">{selectedInconsistency.databaseDepartment}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Attendance Department:</p>
                <p class="text-sm text-gray-900">{selectedInconsistency.attendanceDepartment}</p>
              </div>
            {/if}
            
            <div>
              <p class="text-sm font-medium text-gray-500">Description:</p>
              <p class="text-sm text-gray-900">{selectedInconsistency.message}</p>
            </div>
          </div>
          
          <div class="mt-6">
            <button 
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              on:click={closeDetails}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  /* Custom scrollbar for tables */
  .overflow-x-auto::-webkit-scrollbar {
    height: 8px;
  }
  
  .overflow-x-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  .overflow-x-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }
  
  .overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
</style>
