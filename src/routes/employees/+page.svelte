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
    },
    {
      employeeNumber: 'NCPL012',
      firstName: 'Sanjana',
      middleName: '',
      lastName: 'Jagadeesha',
      gender: 'Female',
      dateOfJoining: '08-10-2024',
      designation: 'Associate Legal Advisor',
      workEmail: 'sanjana.j@nationalconsultingindia.com',
      department: 'Legal',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '9481895999',
      dateOfBirth: '12-10-1996'
    },
    {
      employeeNumber: 'NCPL026',
      firstName: 'Shalini',
      middleName: '',
      lastName: 'N',
      gender: 'Female',
      dateOfJoining: '12-05-2025',
      designation: 'Tele Caller',
      workEmail: 'customerconnect@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'shalini145shalu@gmail.com',
      mobileNumber: '6363576184',
      dateOfBirth: '24-12-1999'
    },
    {
      employeeNumber: 'NCPL014',
      firstName: 'Kiran Kumar',
      middleName: '',
      lastName: 'Uggina',
      gender: 'Male',
      dateOfJoining: '01-01-2025',
      designation: 'Sr 3D Architectural Visualizer',
      workEmail: 'kiran.k@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'kiranuggina@gmail.com',
      mobileNumber: '9908524129',
      dateOfBirth: '03-06-1995'
    },
    {
      employeeNumber: 'NCPL018',
      firstName: 'Siddharth',
      middleName: '',
      lastName: 'Venkat',
      gender: 'Male',
      dateOfJoining: '17-02-2025',
      designation: 'Sr Architect',
      workEmail: 'siddharth.v@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'siddharth2522@gmail.com',
      mobileNumber: '8148516036',
      dateOfBirth: '25-01-1996'
    },
    {
      employeeNumber: 'NCPL023',
      firstName: 'Mamatha',
      middleName: '',
      lastName: 'M',
      gender: 'Female',
      dateOfJoining: '05-05-2025',
      designation: 'Graphic Designer',
      workEmail: 'mamatha.m@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'mamatha.m1920@gmail.comm',
      mobileNumber: '9148395080',
      dateOfBirth: '07-09-2000'
    },
    {
      employeeNumber: 'NCPL015',
      firstName: 'Manjushri',
      middleName: '',
      lastName: 'G',
      gender: 'Female',
      dateOfJoining: '02-01-2025',
      designation: 'Tele Caller',
      workEmail: 'montrasupport@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'legendary.shree@gmail.com',
      mobileNumber: '7338527166',
      dateOfBirth: '15-03-1984'
    },
    {
      employeeNumber: 'NCPL016',
      firstName: 'Shwetha',
      middleName: '',
      lastName: 'D',
      gender: 'Female',
      dateOfJoining: '06-02-2025',
      designation: 'Tele Caller',
      workEmail: 'isuzusupport@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'eeshacutie421@gmail.com',
      mobileNumber: '9148288137',
      dateOfBirth: '23-06-2001'
    },
    {
      employeeNumber: 'NCPL028',
      firstName: 'Adityaa',
      middleName: '',
      lastName: 'Nagarajan',
      gender: 'Male',
      dateOfJoining: '09-06-2025',
      designation: 'Full Stack Developer',
      workEmail: 'aadityaa@nationalconsultingindia.com',
      department: 'Software Development',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'aadi2606.business@gmail.com',
      mobileNumber: '9080276386',
      dateOfBirth: '26-06-2003'
    },
    {
      employeeNumber: 'NCPL027',
      firstName: 'Akshay',
      middleName: '',
      lastName: 'Hondi',
      gender: 'Male',
      dateOfJoining: '26-05-2025',
      designation: 'Social Media Analyst',
      workEmail: 'akshay.h@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'akshayhondi4@gmail.com',
      mobileNumber: '8762339217',
      dateOfBirth: '23-05-1998'
    },
    {
      employeeNumber: 'NCPL010',
      firstName: 'Abhiram',
      middleName: '',
      lastName: 'C',
      gender: 'Male',
      dateOfJoining: '21-10-2024',
      designation: 'Graphic Designer',
      workEmail: 'abhiram.c@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'abhiabhiram453@gmail.com',
      mobileNumber: '',
      dateOfBirth: '03-10-2000'
    },
    {
      employeeNumber: 'NCPL006',
      firstName: 'Ijaz',
      middleName: '',
      lastName: 'Ahmed',
      gender: 'Male',
      dateOfJoining: '29-07-2024',
      designation: 'Assistant Manager - BD',
      workEmail: 'ijaz@nationalconsultingindia.com',
      department: 'Business Development',
      workLocation: 'Head Office',
      employeeStatus: 'Exited',
      personalEmail: 'ijazahmedhdv@gmail.com',
      mobileNumber: '',
      dateOfBirth: '19-05-1996'
    },
    {
      employeeNumber: 'NCPL003',
      firstName: 'Sheik',
      middleName: '',
      lastName: 'Munavar',
      gender: 'Male',
      dateOfJoining: '29-07-2024',
      designation: 'Lead Business Development',
      workEmail: 'munavar@nationalconsultingindia.com',
      department: 'Business Development',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'sheik.munavar@gmail.com',
      mobileNumber: '',
      dateOfBirth: '06-08-1982'
    },
    {
      employeeNumber: 'NCPL029',
      firstName: 'Deepanshi',
      middleName: '',
      lastName: 'Mamgain',
      gender: 'Female',
      dateOfJoining: '23-06-2025',
      designation: 'UI/UX Designer',
      workEmail: 'deepanshi.m@nationalconsultingindia.com',
      department: 'Software Development',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'deepanshi.mamgain18@gmail.com',
      mobileNumber: '',
      dateOfBirth: '05-09-2001'
    },
    {
      employeeNumber: 'NCPL025',
      firstName: 'Mohammed',
      middleName: '',
      lastName: 'Faisal',
      gender: 'Male',
      dateOfJoining: '07-02-2020',
      designation: 'Director Strategies and Operations',
      workEmail: 'faisal@nationalconsultingindia.com',
      department: 'Management',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'mohammedfaisal91@gmail.com',
      mobileNumber: '',
      dateOfBirth: '13-02-1991'
    },
    {
      employeeNumber: 'NCPL009',
      firstName: 'Nirup',
      middleName: '',
      lastName: 'Jayanth',
      gender: 'Male',
      dateOfJoining: '04-03-2021',
      designation: 'Head Design and Development',
      workEmail: 'nirup.j@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '11-06-1981'
    },
    {
      employeeNumber: 'NCPL033',
      firstName: 'Neehar',
      middleName: '',
      lastName: 'Jallu',
      gender: 'Male',
      dateOfJoining: '24-06-2025',
      designation: 'Sr Architect',
      workEmail: 'neehar.j@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'jishnu.neehar@gmail.com',
      mobileNumber: '',
      dateOfBirth: '22-08-1991'
    },
    {
      employeeNumber: 'NCPL034',
      firstName: 'Rakshith',
      middleName: '',
      lastName: 'R',
      gender: 'Male',
      dateOfJoining: '02-07-2025',
      designation: 'Digital Media Marketing Executive',
      workEmail: 'rakshith.r@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'rakshithkulal1427@gmail.com',
      mobileNumber: '',
      dateOfBirth: '03-04-2001'
    },
    {
      employeeNumber: 'NCPL032',
      firstName: 'Sanjay',
      middleName: '',
      lastName: 'Asthana',
      gender: 'Male',
      dateOfJoining: '15-10-2020',
      designation: 'Vice President',
      workEmail: 'sanjay.a@nationalconsultingindia.com',
      department: 'iSky',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '25-06-1968'
    },
    {
      employeeNumber: 'NCPL021',
      firstName: 'Salman',
      middleName: '',
      lastName: 'Khan',
      gender: 'Male',
      dateOfJoining: '27-03-2025',
      designation: 'Assistant to Director',
      workEmail: 'salman.k@nationalconsultingindia.com',
      department: 'Management',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'skofficial1993@gmail.com',
      mobileNumber: '7411248615',
      dateOfBirth: '16-03-1993'
    },
    {
      employeeNumber: 'NCPL031',
      firstName: 'Hedayath',
      middleName: '',
      lastName: 'Ullah',
      gender: 'Male',
      dateOfJoining: '01-07-2025',
      designation: 'Office Boy',
      workEmail: 'mahinariyan60034@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '6360182195',
      dateOfBirth: '25-03-2005'
    },
    {
      employeeNumber: 'NCPL013',
      firstName: 'Srikantha',
      middleName: 'Bhaskar',
      lastName: 'Poojary',
      gender: 'Male',
      dateOfJoining: '01-01-2025',
      designation: 'Office Admin',
      workEmail: 'shreekanthanthanchan9743@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'Shreekanthanchan9743@gmail.com',
      mobileNumber: '',
      dateOfBirth: '12-08-1989'
    },
    {
      employeeNumber: 'NCPL035',
      firstName: 'Biplob',
      middleName: 'Barman',
      lastName: '',
      gender: 'Male',
      dateOfJoining: '01-07-2025',
      designation: 'Office Boy',
      workEmail: 'barmanbiplob295@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'barmanbiplob295@gmail.com',
      mobileNumber: '',
      dateOfBirth: '19-08-1999'
    },
    {
      employeeNumber: 'NCPL036',
      firstName: 'Abubbakkar',
      middleName: 'Siddiq',
      lastName: 'B M',
      gender: 'Male',
      dateOfJoining: '26-06-2025',
      designation: 'Office Boy',
      workEmail: 'siddiqbmparappu786@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '9741462876',
      dateOfBirth: '29-07-1994'
    },
    {
      employeeNumber: 'NCPL005',
      firstName: 'Muhammed',
      middleName: 'Ameen',
      lastName: 'K M',
      gender: 'Male',
      dateOfJoining: '01-01-2025',
      designation: 'Driver',
      workEmail: 'ameenmittur@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '11-01-2003'
    },
    {
      employeeNumber: 'NCPL004',
      firstName: 'Irshad',
      middleName: '',
      lastName: 'Ahmed',
      gender: 'Male',
      dateOfJoining: '01-01-2025',
      designation: 'Driver',
      workEmail: 'irshad@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '07-08-1978'
    },
    {
      employeeNumber: 'NCPL037',
      firstName: 'Ahmed',
      middleName: '',
      lastName: 'Atique',
      gender: 'Male',
      dateOfJoining: '11-08-2025',
      designation: 'Senior Manager - Financial Planning and Operations',
      workEmail: 'atique.a@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'atiqueonnet@yahoo.com',
      mobileNumber: '',
      dateOfBirth: '14-06-1981'
    },
    {
      employeeNumber: 'NCPL038',
      firstName: 'Harshdeep',
      middleName: '',
      lastName: 'Singh',
      gender: 'Male',
      dateOfJoining: '26-08-2025',
      designation: 'Head of Marketing',
      workEmail: 'harshdeep.s@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'harsh9316@gmail.com',
      mobileNumber: '9967274605',
      dateOfBirth: '04-10-1988'
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
