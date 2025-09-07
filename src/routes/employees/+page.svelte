<script>
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { Users, Search, Filter, Download, Upload } from 'lucide-svelte';
  import '../../app.css';

  // Employee data - this will eventually come from Zoho API or uploaded file
  let employees = [
    {
      employeeNumber: 'NCPL019',
      firstName: 'Balasubramanian',
      middleName: '',
      lastName: 'Pillai',
      gender: 'Male',
      dateOfJoining: '03-03-2025',
      designation: 'Manager IT',
      workEmail: 'bala@nationalconsultingindia.com',
      department: 'IT',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'bpillai100@gmail.com',
      mobileNumber: '91-8484040237',
      dateOfBirth: '28-11-1970'
    },
    {
      employeeNumber: 'NCPL001',
      firstName: 'Mohammed',
      middleName: '',
      lastName: 'Farooq',
      gender: 'Male',
      dateOfJoining: '22-01-2024',
      designation: 'EA - Director',
      workEmail: 'farooq@nationalconsultingindia.com',
      department: 'Management',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '11-04-1985'
    },
    {
      employeeNumber: 'NCPL017',
      firstName: 'Prasanna',
      middleName: '',
      lastName: 'Hegde',
      gender: 'Male',
      dateOfJoining: '10-02-2025',
      designation: 'Accounts Executive',
      workEmail: 'prasanna.h@nationalconsultingindia.com',
      department: 'Accounts',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'prasanna27hegde@gmail.com',
      mobileNumber: '9663783062',
      dateOfBirth: '27-09-1999'
    },
    {
      employeeNumber: 'NCPL007',
      firstName: 'Karthik',
      middleName: '',
      lastName: 'M K',
      gender: 'Male',
      dateOfJoining: '01-08-2024',
      designation: 'CFO',
      workEmail: 'karthik.mk@nationalconsultingindia.com',
      department: 'Accounts',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '06-05-1987'
    },
    {
      employeeNumber: 'NCPL000',
      firstName: 'Shahil',
      middleName: '',
      lastName: 'Anoof',
      gender: 'Male',
      dateOfJoining: '08-07-2010',
      designation: 'Managing Director',
      workEmail: 'shahil@nationalconsultingindia.com',
      department: 'Management',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '08-02-1991'
    },
    {
      employeeNumber: 'NCPL024',
      firstName: 'Yahya Ayash',
      middleName: '',
      lastName: 'Luqman',
      gender: 'Male',
      dateOfJoining: '05-05-2025',
      designation: 'Software Development Manager',
      workEmail: 'yahya@nationalconsultingindia.com',
      department: 'Software Development',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '04-02-1997'
    },
    {
      employeeNumber: 'NCPL002',
      firstName: 'Shruthi',
      middleName: '',
      lastName: 'Nandeesh',
      gender: 'Female',
      dateOfJoining: '03-03-2024',
      designation: 'Asst Manager HR',
      workEmail: 'shruthi.d@nationalconsultingindia.com',
      department: 'HR',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'shruthid04@gmail.com',
      mobileNumber: '9036093988',
      dateOfBirth: '04-02-1991'
    },
    {
      employeeNumber: 'NCPL008',
      firstName: 'Dipti',
      middleName: '',
      lastName: 'Amarnath',
      gender: 'Female',
      dateOfJoining: '02-09-2024',
      designation: 'Senior Manager Social Media Marketing',
      workEmail: 'dipti.a@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'diptiamarnath@gmail.com',
      mobileNumber: '9916246404',
      dateOfBirth: '08-04-1994'
    }
  ];

  let searchTerm = '';
  let selectedDepartment = 'All';
  let filteredEmployees = employees;

  // Get unique departments
  $: departments = ['All', ...new Set(employees.map(emp => emp.department))];

  // Filter employees based on search and department
  $: {
    filteredEmployees = employees.filter(employee => {
      const matchesSearch = searchTerm === '' || 
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.workEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = selectedDepartment === 'All' || 
        employee.department === selectedDepartment;
      
      return matchesSearch && matchesDepartment;
    });
  }

  // Department-wise statistics
  $: departmentStats = departments.filter(dept => dept !== 'All').map(dept => {
    const deptEmployees = employees.filter(emp => emp.department === dept);
    const activeCount = deptEmployees.filter(emp => emp.employeeStatus === 'Active').length;
    return {
      department: dept,
      total: deptEmployees.length,
      active: activeCount,
      inactive: deptEmployees.length - activeCount
    };
  });

  function exportToExcel() {
    // Create CSV content
    const headers = [
      'Employee Number', 'First Name', 'Middle Name', 'Last Name', 'Gender',
      'Date of Joining', 'Designation', 'Work Email', 'Department', 'Work Location',
      'Employee Status', 'Personal Email', 'Mobile Number', 'Date of Birth'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredEmployees.map(emp => [
        emp.employeeNumber,
        emp.firstName,
        emp.middleName,
        emp.lastName,
        emp.gender,
        emp.dateOfJoining,
        emp.designation,
        emp.workEmail,
        emp.department,
        emp.workLocation,
        emp.employeeStatus,
        emp.personalEmail,
        emp.mobileNumber,
        emp.dateOfBirth
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    // Download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees_${selectedDepartment}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
</script>

<svelte:head>
	<title>Employees - Zoho People Dashboard</title>
	<meta name="description" content="Employee directory and management" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100 text-zinc-800">
	<!-- Header -->
	<Header />

	<!-- Layout -->
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12">
		<!-- Sidebar -->
		<aside class="lg:col-span-2">
			<Sidebar currentPath="/employees" />
		</aside>
		
		<!-- Main Content -->
		<main class="lg:col-span-10 space-y-6">
			<!-- Page Header -->
			<div class="card">
				<div class="card-content">
					<div class="flex items-center justify-between">
						<div>
							<div class="flex items-center gap-3 mb-2">
								<Users class="w-8 h-8 text-gold-600" />
								<h1 class="text-3xl font-bold text-zinc-900">Employees</h1>
							</div>
							<p class="text-zinc-600">Employee directory and management</p>
						</div>
						<div class="flex gap-3">
							<button
								on:click={exportToExcel}
								class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg flex items-center gap-2"
							>
								<Download class="w-4 h-4" />
								Export
							</button>
							<a
								href="/settings"
								class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg flex items-center gap-2"
							>
								<Upload class="w-4 h-4" />
								Upload Data
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Department Statistics -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each departmentStats as stat}
					<div class="card hover:shadow-lg transition-shadow duration-200">
						<div class="card-content">
							<h3 class="text-lg font-semibold text-zinc-900 mb-2">{stat.department}</h3>
							<div class="space-y-1">
								<div class="flex justify-between">
									<span class="text-zinc-600">Total:</span>
									<span class="font-medium">{stat.total}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-green-600">Active:</span>
									<span class="font-medium text-green-600">{stat.active}</span>
								</div>
								{#if stat.inactive > 0}
									<div class="flex justify-between">
										<span class="text-red-600">Inactive:</span>
										<span class="font-medium text-red-600">{stat.inactive}</span>
									</div>
								{/if}
							</div>
						</div>
					</div>
				{/each}
			</div>

			<!-- Search and Filter -->
			<div class="card">
				<div class="card-content">
					<div class="flex flex-col md:flex-row gap-4">
						<div class="flex-1">
							<div class="relative">
								<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
								<input
									type="text"
									bind:value={searchTerm}
									placeholder="Search employees by name, ID, email, or designation..."
									class="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
								/>
							</div>
						</div>
						<div class="md:w-48">
							<div class="relative">
								<Filter class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
								<select
									bind:value={selectedDepartment}
									class="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none"
								>
									{#each departments as dept}
										<option value={dept}>{dept}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Employee Table -->
			<div class="card">
				<div class="card-content p-0">
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead class="bg-zinc-50 border-b border-zinc-200">
								<tr>
									<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Employee</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Department</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Designation</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Contact</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
									<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Joining Date</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-zinc-200">
								{#each filteredEmployees as employee}
									<tr class="hover:bg-zinc-50 transition-colors">
										<td class="px-6 py-4 whitespace-nowrap">
											<div class="flex items-center">
												<div class="flex-shrink-0 h-10 w-10">
													<div class="h-10 w-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-medium">
														{employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
													</div>
												</div>
												<div class="ml-4">
													<div class="text-sm font-medium text-zinc-900">
														{employee.firstName} {employee.middleName} {employee.lastName}
													</div>
													<div class="text-sm text-zinc-500">{employee.employeeNumber}</div>
													<div class="text-sm text-zinc-500">{employee.workEmail}</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
												{employee.department}
											</span>
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
											{employee.designation}
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
											{#if employee.mobileNumber}
												<div>{employee.mobileNumber}</div>
											{/if}
											{#if employee.personalEmail}
												<div class="text-xs">{employee.personalEmail}</div>
											{/if}
										</td>
										<td class="px-6 py-4 whitespace-nowrap">
											<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {employee.employeeStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
												{employee.employeeStatus}
											</span>
										</td>
										<td class="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
											{employee.dateOfJoining}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<!-- Results Summary -->
			<div class="card">
				<div class="card-content">
					<p class="text-sm text-zinc-600">
						Showing {filteredEmployees.length} of {employees.length} employees
						{#if selectedDepartment !== 'All'}
							in {selectedDepartment} department
						{/if}
						{#if searchTerm}
							matching "{searchTerm}"
						{/if}
					</p>
				</div>
			</div>
		</main>
	</div>
</div>
