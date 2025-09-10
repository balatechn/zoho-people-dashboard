<script>
  import { onMount } from 'svelte';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { Users, Search, Filter, Download, Upload, Plus, Edit, Trash2, X, MoreVertical, Eye, UserPlus, FileText } from 'lucide-svelte';
  import '../../app.css';

  // Employee data - this will eventually come from Zoho API or uploaded file
  let employees = [
    {
      employeeNumber: 'NCPL019',
      firstName: 'Balasubramanian',
      middleName: '',
      lastName: 'Pillai',
      fullName: 'Balasubramanian Pillai',
      gender: 'Male',
      dateOfJoining: '03-03-2025',
      designation: 'Manager IT',
      workEmail: 'bala@nationalconsultingindia.com',
      department: 'IT',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'bpillai100@gmail.com',
      mobileNumber: '91-8484040237',
      dateOfBirth: '28-11-1970',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL001',
      firstName: 'Mohammed',
      middleName: '',
      lastName: 'Farooq',
      fullName: 'Mohammed Farooq',
      gender: 'Male',
      dateOfJoining: '22-01-2024',
      designation: 'EA - Director',
      workEmail: 'farooq@nationalconsultingindia.com',
      department: 'Management',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '11-04-1985',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL017',
      firstName: 'Prasanna',
      middleName: '',
      lastName: 'Hegde',
      fullName: 'Prasanna Hegde',
      gender: 'Male',
      dateOfJoining: '10-02-2025',
      designation: 'Accounts Executive',
      workEmail: 'prasanna.h@nationalconsultingindia.com',
      department: 'Accounts',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'prasanna27hegde@gmail.com',
      mobileNumber: '9663783062',
      dateOfBirth: '27-09-1999',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL007',
      firstName: 'Karthik',
      middleName: '',
      lastName: 'M K',
      fullName: 'Karthik M K',
      gender: 'Male',
      dateOfJoining: '01-08-2024',
      designation: 'CFO',
      workEmail: 'karthik.mk@nationalconsultingindia.com',
      department: 'Accounts',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '06-05-1987',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL000',
      firstName: 'Shahil',
      middleName: '',
      lastName: 'Anoof',
      fullName: 'Shahil Anoof',
      gender: 'Male',
      dateOfJoining: '08-07-2010',
      designation: 'Managing Director',
      workEmail: 'shahil@nationalconsultingindia.com',
      department: 'Management',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '08-02-1991',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL024',
      firstName: 'Yahya Ayash',
      middleName: '',
      lastName: 'Luqman',
      fullName: 'Yahya Ayash Luqman',
      gender: 'Male',
      dateOfJoining: '05-05-2025',
      designation: 'Software Development Manager',
      workEmail: 'yahya@nationalconsultingindia.com',
      department: 'Software Development',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '04-02-1997',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL002',
      firstName: 'Shruthi',
      middleName: '',
      lastName: 'Nandeesh',
      fullName: 'Shruthi Nandeesh',
      gender: 'Female',
      dateOfJoining: '03-03-2024',
      designation: 'Asst Manager HR',
      workEmail: 'shruthi.d@nationalconsultingindia.com',
      department: 'HR',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'shruthid04@gmail.com',
      mobileNumber: '9036093988',
      dateOfBirth: '04-02-1991',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL008',
      firstName: 'Dipti',
      middleName: '',
      lastName: 'Amarnath',
      fullName: 'Dipti Amarnath',
      gender: 'Female',
      dateOfJoining: '02-09-2024',
      designation: 'Senior Manager Social Media Marketing',
      workEmail: 'dipti.a@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'diptiamarnath@gmail.com',
      mobileNumber: '9916246404',
      dateOfBirth: '08-04-1994',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL012',
      firstName: 'Sanjana',
      middleName: '',
      lastName: 'Jagadeesha',
      fullName: 'Sanjana Jagadeesha',
      gender: 'Female',
      dateOfJoining: '08-10-2024',
      designation: 'Associate Legal Advisor',
      workEmail: 'sanjana.j@nationalconsultingindia.com',
      department: 'Legal',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '9481895999',
      dateOfBirth: '12-10-1996',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL026',
      firstName: 'Shalini',
      middleName: '',
      lastName: 'N',
      fullName: 'Shalini N',
      gender: 'Female',
      dateOfJoining: '12-05-2025',
      designation: 'Tele Caller',
      workEmail: 'customerconnect@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'shalini145shalu@gmail.com',
      mobileNumber: '6363576184',
      dateOfBirth: '24-12-1999',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL014',
      firstName: 'Kiran Kumar',
      middleName: '',
      lastName: 'Uggina',
      fullName: 'Kiran Kumar Uggina',
      gender: 'Male',
      dateOfJoining: '01-01-2025',
      designation: 'Sr 3D Architectural Visualizer',
      workEmail: 'kiran.k@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'kiranuggina@gmail.com',
      mobileNumber: '9908524129',
      dateOfBirth: '03-06-1995',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL018',
      firstName: 'Siddharth',
      middleName: '',
      lastName: 'Venkat',
      fullName: 'Siddharth Venkat',
      gender: 'Male',
      dateOfJoining: '17-02-2025',
      designation: 'Sr Architect',
      workEmail: 'siddharth.v@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'siddharth2522@gmail.com',
      mobileNumber: '8148516036',
      dateOfBirth: '25-01-1996',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL023',
      firstName: 'Mamatha',
      middleName: '',
      lastName: 'M',
      fullName: 'Mamatha M',
      gender: 'Female',
      dateOfJoining: '05-05-2025',
      designation: 'Graphic Designer',
      workEmail: 'mamatha.m@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'mamatha.m1920@gmail.comm',
      mobileNumber: '9148395080',
      dateOfBirth: '07-09-2000',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL015',
      firstName: 'Manjushri',
      middleName: '',
      lastName: 'G',
      fullName: 'Manjushri G',
      gender: 'Female',
      dateOfJoining: '02-01-2025',
      designation: 'Tele Caller',
      workEmail: 'montrasupport@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'legendary.shree@gmail.com',
      mobileNumber: '7338527166',
      dateOfBirth: '15-03-1984',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL016',
      firstName: 'Shwetha',
      middleName: '',
      lastName: 'D',
      fullName: 'Shwetha D',
      gender: 'Female',
      dateOfJoining: '06-02-2025',
      designation: 'Tele Caller',
      workEmail: 'isuzusupport@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'eeshacutie421@gmail.com',
      mobileNumber: '9148288137',
      dateOfBirth: '23-06-2001',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL028',
      firstName: 'Adityaa',
      middleName: '',
      lastName: 'Nagarajan',
      fullName: 'Adityaa Nagarajan',
      gender: 'Male',
      dateOfJoining: '09-06-2025',
      designation: 'Full Stack Developer',
      workEmail: 'aadityaa@nationalconsultingindia.com',
      department: 'Software Development',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'aadi2606.business@gmail.com',
      mobileNumber: '9080276386',
      dateOfBirth: '26-06-2003',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL027',
      firstName: 'Akshay',
      middleName: '',
      lastName: 'Hondi',
      fullName: 'Akshay Hondi',
      gender: 'Male',
      dateOfJoining: '26-05-2025',
      designation: 'Social Media Analyst',
      workEmail: 'akshay.h@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'akshayhondi4@gmail.com',
      mobileNumber: '8762339217',
      dateOfBirth: '23-05-1998',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL010',
      firstName: 'Abhiram',
      middleName: '',
      lastName: 'C',
      fullName: 'Abhiram C',
      gender: 'Male',
      dateOfJoining: '21-10-2024',
      designation: 'Graphic Designer',
      workEmail: 'abhiram.c@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'abhiabhiram453@gmail.com',
      mobileNumber: '',
      dateOfBirth: '03-10-2000',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL006',
      firstName: 'Ijaz',
      middleName: '',
      lastName: 'Ahmed',
      fullName: 'Ijaz Ahmed',
      gender: 'Male',
      dateOfJoining: '29-07-2024',
      designation: 'Assistant Manager - BD',
      workEmail: 'ijaz@nationalconsultingindia.com',
      department: 'Business Development',
      workLocation: 'Head Office',
      employeeStatus: 'Exited',
      personalEmail: 'ijazahmedhdv@gmail.com',
      mobileNumber: '',
      dateOfBirth: '19-05-1996',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL003',
      firstName: 'Sheik',
      middleName: '',
      lastName: 'Munavar',
      fullName: 'Sheik Munavar',
      gender: 'Male',
      dateOfJoining: '29-07-2024',
      designation: 'Lead Business Development',
      workEmail: 'munavar@nationalconsultingindia.com',
      department: 'Business Development',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'sheik.munavar@gmail.com',
      mobileNumber: '',
      dateOfBirth: '06-08-1982',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL029',
      firstName: 'Deepanshi',
      middleName: '',
      lastName: 'Mamgain',
      fullName: 'Deepanshi Mamgain',
      gender: 'Female',
      dateOfJoining: '23-06-2025',
      designation: 'UI/UX Designer',
      workEmail: 'deepanshi.m@nationalconsultingindia.com',
      department: 'Software Development',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'deepanshi.mamgain18@gmail.com',
      mobileNumber: '',
      dateOfBirth: '05-09-2001',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL025',
      firstName: 'Mohammed',
      middleName: '',
      lastName: 'Faisal',
      fullName: 'Mohammed Faisal',
      gender: 'Male',
      dateOfJoining: '07-02-2020',
      designation: 'Director Strategies and Operations',
      workEmail: 'faisal@nationalconsultingindia.com',
      department: 'Management',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'mohammedfaisal91@gmail.com',
      mobileNumber: '',
      dateOfBirth: '13-02-1991',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL009',
      firstName: 'Nirup',
      middleName: '',
      lastName: 'Jayanth',
      fullName: 'Nirup Jayanth',
      gender: 'Male',
      dateOfJoining: '04-03-2021',
      designation: 'Head Design and Development',
      workEmail: 'nirup.j@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '11-06-1981',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL033',
      firstName: 'Neehar',
      middleName: '',
      lastName: 'Jallu',
      fullName: 'Neehar Jallu',
      gender: 'Male',
      dateOfJoining: '24-06-2025',
      designation: 'Sr Architect',
      workEmail: 'neehar.j@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'jishnu.neehar@gmail.com',
      mobileNumber: '',
      dateOfBirth: '22-08-1991',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL034',
      firstName: 'Rakshith',
      middleName: '',
      lastName: 'R',
      fullName: 'Rakshith R',
      gender: 'Male',
      dateOfJoining: '02-07-2025',
      designation: 'Digital Media Marketing Executive',
      workEmail: 'rakshith.r@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'rakshithkulal1427@gmail.com',
      mobileNumber: '',
      dateOfBirth: '03-04-2001',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL032',
      firstName: 'Sanjay',
      middleName: '',
      lastName: 'Asthana',
      fullName: 'Sanjay Asthana',
      gender: 'Male',
      dateOfJoining: '15-10-2020',
      designation: 'Vice President',
      workEmail: 'sanjay.a@nationalconsultingindia.com',
      department: 'iSky',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '25-06-1968',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL021',
      firstName: 'Salman',
      middleName: '',
      lastName: 'Khan',
      fullName: 'Salman Khan',
      gender: 'Male',
      dateOfJoining: '27-03-2025',
      designation: 'Assistant to Director',
      workEmail: 'salman.k@nationalconsultingindia.com',
      department: 'Management',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'skofficial1993@gmail.com',
      mobileNumber: '7411248615',
      dateOfBirth: '16-03-1993',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL031',
      firstName: 'Hedayath',
      middleName: '',
      lastName: 'Ullah',
      fullName: 'Hedayath Ullah',
      gender: 'Male',
      dateOfJoining: '01-07-2025',
      designation: 'Office Boy',
      workEmail: 'mahinariyan60034@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '6360182195',
      dateOfBirth: '25-03-2005',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL013',
      firstName: 'Srikantha',
      middleName: 'Bhaskar',
      lastName: 'Poojary',
      fullName: 'Srikantha Bhaskar Poojary',
      gender: 'Male',
      dateOfJoining: '01-01-2025',
      designation: 'Office Admin',
      workEmail: 'shreekanthanthanchan9743@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'Shreekanthanchan9743@gmail.com',
      mobileNumber: '',
      dateOfBirth: '12-08-1989',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL035',
      firstName: 'Biplob',
      middleName: 'Barman',
      lastName: '',
      fullName: 'Biplob Barman',
      gender: 'Male',
      dateOfJoining: '01-07-2025',
      designation: 'Office Boy',
      workEmail: 'barmanbiplob295@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'barmanbiplob295@gmail.com',
      mobileNumber: '',
      dateOfBirth: '19-08-1999',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL036',
      firstName: 'Abubbakkar',
      middleName: 'Siddiq',
      lastName: 'B M',
      fullName: 'Abubbakkar Siddiq B M',
      gender: 'Male',
      dateOfJoining: '26-06-2025',
      designation: 'Office Boy',
      workEmail: 'siddiqbmparappu786@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '9741462876',
      dateOfBirth: '29-07-1994',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL005',
      firstName: 'Muhammed',
      middleName: 'Ameen',
      lastName: 'K M',
      fullName: 'Muhammed Ameen K M',
      gender: 'Male',
      dateOfJoining: '01-01-2025',
      designation: 'Driver',
      workEmail: 'ameenmittur@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '11-01-2003',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL004',
      firstName: 'Irshad',
      middleName: '',
      lastName: 'Ahmed',
      fullName: 'Irshad Ahmed',
      gender: 'Male',
      dateOfJoining: '01-01-2025',
      designation: 'Driver',
      workEmail: 'irshad@gmail.com',
      department: 'Admin',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '07-08-1978',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL037',
      firstName: 'Ahmed',
      middleName: '',
      lastName: 'Atique',
      fullName: 'Ahmed Atique',
      gender: 'Male',
      dateOfJoining: '11-08-2025',
      designation: 'Senior Manager - Financial Planning and Operations',
      workEmail: 'atique.a@nationalconsultingindia.com',
      department: 'Real estate',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'atiqueonnet@yahoo.com',
      mobileNumber: '',
      dateOfBirth: '14-06-1981',
      profileImage: null
    },
    {
      employeeNumber: 'NCPL038',
      firstName: 'Harshdeep',
      middleName: '',
      lastName: 'Singh',
      fullName: 'Harshdeep Singh',
      gender: 'Male',
      dateOfJoining: '26-08-2025',
      designation: 'Head of Marketing',
      workEmail: 'harshdeep.s@nationalconsultingindia.com',
      department: 'Marketing',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: 'harsh9316@gmail.com',
      mobileNumber: '9967274605',
      dateOfBirth: '04-10-1988',
      profileImage: null
    }
  ];

  let searchTerm = '';
  let selectedDepartment = 'All';
  let selectedFilter = 'All'; // Recent, Following, Followers, Everyone
  let viewMode = 'grid'; // grid or list
  let filteredEmployees = employees;
  
  // Modal states
  let showAddEmployeeModal = false;
  let showEditEmployeeModal = false;
  let showBulkUploadModal = false;
  let showEmployeeDetailModal = false;
  let selectedEmployee = null;
  let newEmployee = {};
  let editEmployee = {};
  let bulkUploadFile = null;

  // Get unique departments
  $: departments = ['All', ...new Set(employees.map(emp => emp.department))];

  // Filter employees based on search, department, and filter
  $: {
    filteredEmployees = employees.filter(employee => {
      const matchesSearch = searchTerm === '' || 
        employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  // Generate initials for profile avatar
  function getInitials(employee) {
    if (employee.firstName && employee.lastName) {
      return (employee.firstName.charAt(0) + employee.lastName.charAt(0)).toUpperCase();
    }
    return employee.fullName ? employee.fullName.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase() : 'UN';
  }

  // Generate color based on name for consistent avatar colors
  function getAvatarColor(employee) {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 
      'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
    ];
    const name = employee.fullName || employee.firstName;
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  }

  // Modal handlers
  function openAddEmployeeModal() {
    newEmployee = {
      employeeNumber: '',
      firstName: '',
      middleName: '',
      lastName: '',
      fullName: '',
      gender: '',
      dateOfJoining: '',
      designation: '',
      workEmail: '',
      department: '',
      workLocation: 'Head Office',
      employeeStatus: 'Active',
      personalEmail: '',
      mobileNumber: '',
      dateOfBirth: '',
      profileImage: null
    };
    showAddEmployeeModal = true;
  }

  function openEditEmployeeModal(employee) {
    editEmployee = { ...employee };
    showEditEmployeeModal = true;
  }

  function openEmployeeDetailModal(employee) {
    selectedEmployee = employee;
    showEmployeeDetailModal = true;
  }

  function closeModals() {
    showAddEmployeeModal = false;
    showEditEmployeeModal = false;
    showBulkUploadModal = false;
    showEmployeeDetailModal = false;
    selectedEmployee = null;
  }

  // CRUD operations
  function addEmployee() {
    // Generate employee number automatically if not provided
    if (!newEmployee.employeeNumber) {
      const maxNum = Math.max(...employees.map(emp => parseInt(emp.employeeNumber.replace('NCPL', '')) || 0));
      newEmployee.employeeNumber = `NCPL${String(maxNum + 1).padStart(3, '0')}`;
    }
    
    // Generate full name
    newEmployee.fullName = `${newEmployee.firstName} ${newEmployee.middleName} ${newEmployee.lastName}`.replace(/\s+/g, ' ').trim();
    
    employees = [...employees, newEmployee];
    closeModals();
  }

  function updateEmployee() {
    editEmployee.fullName = `${editEmployee.firstName} ${editEmployee.middleName} ${editEmployee.lastName}`.replace(/\s+/g, ' ').trim();
    
    const index = employees.findIndex(emp => emp.employeeNumber === editEmployee.employeeNumber);
    if (index !== -1) {
      employees[index] = editEmployee;
      employees = [...employees];
    }
    closeModals();
  }

  function deleteEmployee(employeeNumber) {
    if (confirm('Are you sure you want to delete this employee?')) {
      employees = employees.filter(emp => emp.employeeNumber !== employeeNumber);
    }
  }

  // Bulk upload handler
  function handleBulkUpload() {
    if (!bulkUploadFile) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const data = e.target.result;
        const rows = data.split('\n').filter(row => row.trim());
        const headers = rows[0].split(',').map(h => h.trim().replace(/"/g, ''));
        
        const newEmployees = [];
        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',').map(v => v.trim().replace(/"/g, ''));
          if (values.length >= headers.length) {
            const employee = {};
            headers.forEach((header, index) => {
              employee[header] = values[index] || '';
            });
            
            // Generate full name
            employee.fullName = `${employee.firstName || ''} ${employee.middleName || ''} ${employee.lastName || ''}`.replace(/\s+/g, ' ').trim();
            employee.profileImage = null;
            
            newEmployees.push(employee);
          }
        }
        
        employees = [...employees, ...newEmployees];
        closeModals();
        alert(`Successfully uploaded ${newEmployees.length} employees.`);
      } catch (error) {
        alert('Error processing file. Please check the format.');
      }
    };
    reader.readAsText(bulkUploadFile);
  }

  function exportToExcel() {
    // Create CSV content
    const headers = [
      'employeeNumber', 'firstName', 'middleName', 'lastName', 'gender',
      'dateOfJoining', 'designation', 'workEmail', 'department', 'workLocation',
      'employeeStatus', 'personalEmail', 'mobileNumber', 'dateOfBirth'
    ];
    
    const csvContent = [
      headers.join(','),
      ...filteredEmployees.map(emp => headers.map(field => `"${emp[field] || ''}"`).join(','))
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
	<title>People - Zoho People Dashboard</title>
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
								<h1 class="text-3xl font-bold text-zinc-900">People ({filteredEmployees.length})</h1>
							</div>
							<p class="text-zinc-600">Employee directory and management</p>
						</div>
						<div class="flex gap-3">
							<button
								on:click={() => showBulkUploadModal = true}
								class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg flex items-center gap-2"
							>
								<Upload class="w-4 h-4" />
								Bulk Upload
							</button>
							<button
								on:click={exportToExcel}
								class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg flex items-center gap-2"
							>
								<Download class="w-4 h-4" />
								Export
							</button>
							<button
								on:click={openAddEmployeeModal}
								class="bg-gradient-to-r from-gold-500 to-amber-500 text-white px-4 py-2 rounded-lg font-medium hover:from-gold-600 hover:to-amber-600 transition-all duration-200 shadow-lg flex items-center gap-2"
							>
								<Plus class="w-4 h-4" />
								Add Employee
							</button>
						</div>
					</div>
				</div>
			</div>

			<!-- Search and Filter Bar -->
			<div class="card">
				<div class="card-content">
					<div class="flex flex-col lg:flex-row gap-4 items-center justify-between">
						<!-- Search -->
						<div class="flex-1 max-w-md">
							<div class="relative">
								<Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
								<input
									type="text"
									bind:value={searchTerm}
									placeholder="Search people..."
									class="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
								/>
							</div>
						</div>

						<!-- Filters -->
						<div class="flex gap-4 items-center">
							<!-- Filter Tabs -->
							<div class="flex bg-zinc-100 rounded-lg p-1">
								<button
									on:click={() => selectedFilter = 'All'}
									class="px-3 py-1 text-sm rounded-md transition-colors {selectedFilter === 'All' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'}"
								>
									Everyone
								</button>
								<button
									on:click={() => selectedFilter = 'Recent'}
									class="px-3 py-1 text-sm rounded-md transition-colors {selectedFilter === 'Recent' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'}"
								>
									Recent
								</button>
								<button
									on:click={() => selectedFilter = 'Following'}
									class="px-3 py-1 text-sm rounded-md transition-colors {selectedFilter === 'Following' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'}"
								>
									Following
								</button>
								<button
									on:click={() => selectedFilter = 'Followers'}
									class="px-3 py-1 text-sm rounded-md transition-colors {selectedFilter === 'Followers' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-600 hover:text-zinc-900'}"
								>
									Followers
								</button>
							</div>

							<!-- Department Filter -->
							<div class="relative">
								<Filter class="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
								<select
									bind:value={selectedDepartment}
									class="pl-10 pr-8 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent appearance-none bg-white"
								>
									{#each departments as dept}
										<option value={dept}>{dept}</option>
									{/each}
								</select>
							</div>

							<!-- View Mode Toggle -->
							<div class="flex bg-zinc-100 rounded-lg p-1">
								<button
									on:click={() => viewMode = 'grid'}
									class="p-2 rounded-md transition-colors {viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-zinc-200'}"
									title="Grid View"
								>
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
									</svg>
								</button>
								<button
									on:click={() => viewMode = 'list'}
									class="p-2 rounded-md transition-colors {viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-zinc-200'}"
									title="List View"
								>
									<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
										<path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 8a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 12a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Employee Grid/List -->
			{#if viewMode === 'grid'}
				<!-- Grid View -->
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{#each filteredEmployees as employee}
						<div class="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
							<div class="card-content relative">
								<!-- Action Menu -->
								<div class="absolute top-4 right-4">
									<div class="relative group">
										<button class="p-1 rounded-full hover:bg-zinc-100 transition-colors">
											<MoreVertical class="w-4 h-4 text-zinc-400" />
										</button>
										<div class="absolute right-0 top-8 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10 min-w-[120px]">
											<button
												on:click={() => openEmployeeDetailModal(employee)}
												class="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
											>
												<Eye class="w-3 h-3" />
												View Details
											</button>
											<button
												on:click={() => openEditEmployeeModal(employee)}
												class="w-full text-left px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
											>
												<Edit class="w-3 h-3" />
												Edit
											</button>
											<button
												on:click={() => deleteEmployee(employee.employeeNumber)}
												class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
											>
												<Trash2 class="w-3 h-3" />
												Delete
											</button>
										</div>
									</div>
								</div>

								<!-- Profile Section -->
								<div class="text-center mb-4">
									<div class="relative inline-block">
										{#if employee.profileImage}
											<img 
												src={employee.profileImage} 
												alt={employee.fullName}
												class="w-16 h-16 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
											/>
										{:else}
											<div class="w-16 h-16 rounded-full {getAvatarColor(employee)} text-white flex items-center justify-center text-lg font-semibold mx-auto border-4 border-white shadow-lg">
												{getInitials(employee)}
											</div>
										{/if}
										<div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full {employee.employeeStatus === 'Active' ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white"></div>
									</div>
									
									<h3 class="text-lg font-semibold text-zinc-900 mt-3 mb-1">
										{employee.fullName}
									</h3>
									<p class="text-sm text-zinc-600 mb-2">{employee.designation}</p>
									
									<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold-100 text-gold-800">
										{employee.department}
									</span>
								</div>

								<!-- Contact Info -->
								<div class="space-y-2 text-sm">
									<div class="flex items-center gap-2 text-zinc-600">
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
											<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
										</svg>
										<span class="truncate">{employee.workEmail}</span>
									</div>
									{#if employee.mobileNumber}
										<div class="flex items-center gap-2 text-zinc-600">
											<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
												<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
											</svg>
											<span>{employee.mobileNumber}</span>
										</div>
									{/if}
									<div class="flex items-center gap-2 text-zinc-600">
										<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
										</svg>
										<span>Joined {employee.dateOfJoining}</span>
									</div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<!-- List View -->
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
										<th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-zinc-200">
									{#each filteredEmployees as employee}
										<tr class="hover:bg-zinc-50 transition-colors">
											<td class="px-6 py-4 whitespace-nowrap">
												<div class="flex items-center">
													<div class="flex-shrink-0 h-10 w-10">
														{#if employee.profileImage}
															<img 
																src={employee.profileImage} 
																alt={employee.fullName}
																class="h-10 w-10 rounded-full object-cover"
															/>
														{:else}
															<div class="h-10 w-10 rounded-full {getAvatarColor(employee)} text-white flex items-center justify-center text-sm font-medium">
																{getInitials(employee)}
															</div>
														{/if}
													</div>
													<div class="ml-4">
														<div class="text-sm font-medium text-zinc-900">
															{employee.fullName}
														</div>
														<div class="text-sm text-zinc-500">{employee.employeeNumber}</div>
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
												<div>{employee.workEmail}</div>
												{#if employee.mobileNumber}
													<div class="text-xs">{employee.mobileNumber}</div>
												{/if}
											</td>
											<td class="px-6 py-4 whitespace-nowrap">
												<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {employee.employeeStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
													{employee.employeeStatus}
												</span>
											</td>
											<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<div class="flex gap-2">
													<button
														on:click={() => openEmployeeDetailModal(employee)}
														class="text-blue-600 hover:text-blue-900 p-1"
														title="View Details"
													>
														<Eye class="w-4 h-4" />
													</button>
													<button
														on:click={() => openEditEmployeeModal(employee)}
														class="text-indigo-600 hover:text-indigo-900 p-1"
														title="Edit"
													>
														<Edit class="w-4 h-4" />
													</button>
													<button
														on:click={() => deleteEmployee(employee.employeeNumber)}
														class="text-red-600 hover:text-red-900 p-1"
														title="Delete"
													>
														<Trash2 class="w-4 h-4" />
													</button>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			{/if}

			<!-- Empty State -->
			{#if filteredEmployees.length === 0}
				<div class="text-center py-12">
					<Users class="mx-auto h-12 w-12 text-zinc-400" />
					<h3 class="mt-2 text-sm font-medium text-zinc-900">No employees found</h3>
					<p class="mt-1 text-sm text-zinc-500">
						{#if searchTerm || selectedDepartment !== 'All'}
							Try adjusting your search or filter criteria.
						{:else}
							Get started by adding a new employee.
						{/if}
					</p>
					{#if searchTerm === '' && selectedDepartment === 'All'}
						<div class="mt-6">
							<button
								on:click={openAddEmployeeModal}
								class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
							>
								<Plus class="w-4 h-4 mr-2" />
								Add Employee
							</button>
						</div>
					{/if}
				</div>
			{/if}

		</main>
	</div>
</div>

<!-- Add Employee Modal -->
{#if showAddEmployeeModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
		<div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
			<div class="p-6 border-b border-zinc-200">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold text-zinc-900">Add New Employee</h2>
					<button on:click={closeModals} class="text-zinc-400 hover:text-zinc-600">
						<X class="w-6 h-6" />
					</button>
				</div>
			</div>
			<div class="p-6">
				<form on:submit|preventDefault={addEmployee} class="space-y-4">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="employeeNumber" class="block text-sm font-medium text-zinc-700 mb-1">Employee Number</label>
							<input id="employeeNumber" type="text" bind:value={newEmployee.employeeNumber} placeholder="Auto-generated if empty" class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="firstName" class="block text-sm font-medium text-zinc-700 mb-1">First Name *</label>
							<input id="firstName" type="text" bind:value={newEmployee.firstName} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="middleName" class="block text-sm font-medium text-zinc-700 mb-1">Middle Name</label>
							<input id="middleName" type="text" bind:value={newEmployee.middleName} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="lastName" class="block text-sm font-medium text-zinc-700 mb-1">Last Name *</label>
							<input id="lastName" type="text" bind:value={newEmployee.lastName} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="gender" class="block text-sm font-medium text-zinc-700 mb-1">Gender</label>
							<select id="gender" bind:value={newEmployee.gender} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div>
							<label for="dateOfJoining" class="block text-sm font-medium text-zinc-700 mb-1">Date of Joining *</label>
							<input id="dateOfJoining" type="date" bind:value={newEmployee.dateOfJoining} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="designation" class="block text-sm font-medium text-zinc-700 mb-1">Designation *</label>
							<input id="designation" type="text" bind:value={newEmployee.designation} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="workEmail" class="block text-sm font-medium text-zinc-700 mb-1">Work Email *</label>
							<input id="workEmail" type="email" bind:value={newEmployee.workEmail} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="department" class="block text-sm font-medium text-zinc-700 mb-1">Department *</label>
							<select id="department" bind:value={newEmployee.department} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
								<option value="">Select Department</option>
								{#each departments.filter(d => d !== 'All') as dept}
									<option value={dept}>{dept}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="workLocation" class="block text-sm font-medium text-zinc-700 mb-1">Work Location</label>
							<input id="workLocation" type="text" bind:value={newEmployee.workLocation} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="personalEmail" class="block text-sm font-medium text-zinc-700 mb-1">Personal Email</label>
							<input id="personalEmail" type="email" bind:value={newEmployee.personalEmail} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="mobileNumber" class="block text-sm font-medium text-zinc-700 mb-1">Mobile Number</label>
							<input id="mobileNumber" type="tel" bind:value={newEmployee.mobileNumber} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="dateOfBirth" class="block text-sm font-medium text-zinc-700 mb-1">Date of Birth</label>
							<input id="dateOfBirth" type="date" bind:value={newEmployee.dateOfBirth} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="employeeStatus" class="block text-sm font-medium text-zinc-700 mb-1">Employee Status</label>
							<select id="employeeStatus" bind:value={newEmployee.employeeStatus} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
								<option value="Active">Active</option>
								<option value="Inactive">Inactive</option>
								<option value="Exited">Exited</option>
							</select>
						</div>
					</div>
					<div class="flex justify-end gap-3 pt-4">
						<button type="button" on:click={closeModals} class="px-4 py-2 text-zinc-600 border border-zinc-300 rounded-lg hover:bg-zinc-50">
							Cancel
						</button>
						<button type="submit" class="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700">
							Add Employee
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

<!-- Edit Employee Modal -->
{#if showEditEmployeeModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
		<div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
			<div class="p-6 border-b border-zinc-200">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold text-zinc-900">Edit Employee</h2>
					<button on:click={closeModals} class="text-zinc-400 hover:text-zinc-600">
						<X class="w-6 h-6" />
					</button>
				</div>
			</div>
			<div class="p-6">
				<form on:submit|preventDefault={updateEmployee} class="space-y-4">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label for="editEmployeeNumber" class="block text-sm font-medium text-zinc-700 mb-1">Employee Number</label>
							<input id="editEmployeeNumber" type="text" bind:value={editEmployee.employeeNumber} readonly class="w-full px-3 py-2 border border-zinc-300 rounded-lg bg-zinc-50 text-zinc-500" />
						</div>
						<div>
							<label for="editFirstName" class="block text-sm font-medium text-zinc-700 mb-1">First Name *</label>
							<input id="editFirstName" type="text" bind:value={editEmployee.firstName} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editMiddleName" class="block text-sm font-medium text-zinc-700 mb-1">Middle Name</label>
							<input id="editMiddleName" type="text" bind:value={editEmployee.middleName} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editLastName" class="block text-sm font-medium text-zinc-700 mb-1">Last Name *</label>
							<input id="editLastName" type="text" bind:value={editEmployee.lastName} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editGender" class="block text-sm font-medium text-zinc-700 mb-1">Gender</label>
							<select id="editGender" bind:value={editEmployee.gender} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>
						</div>
						<div>
							<label for="editDateOfJoining" class="block text-sm font-medium text-zinc-700 mb-1">Date of Joining *</label>
							<input id="editDateOfJoining" type="date" bind:value={editEmployee.dateOfJoining} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editDesignation" class="block text-sm font-medium text-zinc-700 mb-1">Designation *</label>
							<input id="editDesignation" type="text" bind:value={editEmployee.designation} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editWorkEmail" class="block text-sm font-medium text-zinc-700 mb-1">Work Email *</label>
							<input id="editWorkEmail" type="email" bind:value={editEmployee.workEmail} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editDepartment" class="block text-sm font-medium text-zinc-700 mb-1">Department *</label>
							<select id="editDepartment" bind:value={editEmployee.department} required class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
								<option value="">Select Department</option>
								{#each departments.filter(d => d !== 'All') as dept}
									<option value={dept}>{dept}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="editWorkLocation" class="block text-sm font-medium text-zinc-700 mb-1">Work Location</label>
							<input id="editWorkLocation" type="text" bind:value={editEmployee.workLocation} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editPersonalEmail" class="block text-sm font-medium text-zinc-700 mb-1">Personal Email</label>
							<input id="editPersonalEmail" type="email" bind:value={editEmployee.personalEmail} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editMobileNumber" class="block text-sm font-medium text-zinc-700 mb-1">Mobile Number</label>
							<input id="editMobileNumber" type="tel" bind:value={editEmployee.mobileNumber} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editDateOfBirth" class="block text-sm font-medium text-zinc-700 mb-1">Date of Birth</label>
							<input id="editDateOfBirth" type="date" bind:value={editEmployee.dateOfBirth} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent" />
						</div>
						<div>
							<label for="editEmployeeStatus" class="block text-sm font-medium text-zinc-700 mb-1">Employee Status</label>
							<select id="editEmployeeStatus" bind:value={editEmployee.employeeStatus} class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent">
								<option value="Active">Active</option>
								<option value="Inactive">Inactive</option>
								<option value="Exited">Exited</option>
							</select>
						</div>
					</div>
					<div class="flex justify-end gap-3 pt-4">
						<button type="button" on:click={closeModals} class="px-4 py-2 text-zinc-600 border border-zinc-300 rounded-lg hover:bg-zinc-50">
							Cancel
						</button>
						<button type="submit" class="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700">
							Update Employee
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{/if}

<!-- Employee Detail Modal -->
{#if showEmployeeDetailModal && selectedEmployee}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
		<div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
			<div class="p-6 border-b border-zinc-200">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold text-zinc-900">Employee Details</h2>
					<button on:click={closeModals} class="text-zinc-400 hover:text-zinc-600">
						<X class="w-6 h-6" />
					</button>
				</div>
			</div>
			<div class="p-6">
				<!-- Profile Header -->
				<div class="text-center mb-6">
					<div class="relative inline-block">
						{#if selectedEmployee.profileImage}
							<img 
								src={selectedEmployee.profileImage} 
								alt={selectedEmployee.fullName}
								class="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
							/>
						{:else}
							<div class="w-24 h-24 rounded-full {getAvatarColor(selectedEmployee)} text-white flex items-center justify-center text-2xl font-semibold mx-auto border-4 border-white shadow-lg">
								{getInitials(selectedEmployee)}
							</div>
						{/if}
						<div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full {selectedEmployee.employeeStatus === 'Active' ? 'bg-green-500' : 'bg-gray-400'} border-2 border-white"></div>
					</div>
					<h3 class="text-2xl font-bold text-zinc-900 mt-4">{selectedEmployee.fullName}</h3>
					<p class="text-zinc-600 text-lg">{selectedEmployee.designation}</p>
					<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gold-100 text-gold-800 mt-2">
						{selectedEmployee.department}
					</span>
				</div>

				<!-- Details Grid -->
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="space-y-4">
						<div>
							<label class="block text-sm font-medium text-zinc-500 mb-1">Employee Number</label>
							<p class="text-zinc-900">{selectedEmployee.employeeNumber}</p>
						</div>
						<div>
							<label class="block text-sm font-medium text-zinc-500 mb-1">Work Email</label>
							<p class="text-zinc-900">{selectedEmployee.workEmail}</p>
						</div>
						<div>
							<label class="block text-sm font-medium text-zinc-500 mb-1">Personal Email</label>
							<p class="text-zinc-900">{selectedEmployee.personalEmail || 'Not provided'}</p>
						</div>
						<div>
							<label class="block text-sm font-medium text-zinc-500 mb-1">Mobile Number</label>
							<p class="text-zinc-900">{selectedEmployee.mobileNumber || 'Not provided'}</p>
						</div>
						<div>
							<label class="block text-sm font-medium text-zinc-500 mb-1">Gender</label>
							<p class="text-zinc-900">{selectedEmployee.gender || 'Not specified'}</p>
						</div>
					</div>
					<div class="space-y-4">
						<div>
							<label class="block text-sm font-medium text-zinc-500 mb-1">Date of Joining</label>
							<p class="text-zinc-900">{selectedEmployee.dateOfJoining}</p>
						</div>
						<div>
							<label class="block text-sm font-medium text-zinc-500 mb-1">Date of Birth</label>
							<p class="text-zinc-900">{selectedEmployee.dateOfBirth || 'Not provided'}</p>
						</div>
						<div>
							<label class="block text-sm font-medium text-zinc-500 mb-1">Work Location</label>
							<p class="text-zinc-900">{selectedEmployee.workLocation}</p>
						</div>
						<div>
							<label class="block text-sm font-medium text-zinc-500 mb-1">Employee Status</label>
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {selectedEmployee.employeeStatus === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
								{selectedEmployee.employeeStatus}
							</span>
						</div>
					</div>
				</div>

				<div class="flex justify-end gap-3 pt-6 border-t border-zinc-200 mt-6">
					<button on:click={closeModals} class="px-4 py-2 text-zinc-600 border border-zinc-300 rounded-lg hover:bg-zinc-50">
						Close
					</button>
					<button on:click={() => {closeModals(); openEditEmployeeModal(selectedEmployee);}} class="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 flex items-center gap-2">
						<Edit class="w-4 h-4" />
						Edit Employee
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<!-- Bulk Upload Modal -->
{#if showBulkUploadModal}
	<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
		<div class="bg-white rounded-xl max-w-lg w-full">
			<div class="p-6 border-b border-zinc-200">
				<div class="flex items-center justify-between">
					<h2 class="text-xl font-semibold text-zinc-900">Bulk Upload Employees</h2>
					<button on:click={closeModals} class="text-zinc-400 hover:text-zinc-600">
						<X class="w-6 h-6" />
					</button>
				</div>
			</div>
			<div class="p-6">
				<div class="space-y-4">
					<div>
						<label class="block text-sm font-medium text-zinc-700 mb-2">Upload CSV File</label>
						<div class="border-2 border-dashed border-zinc-300 rounded-lg p-6 text-center">
							<Upload class="mx-auto h-12 w-12 text-zinc-400" />
							<div class="mt-4">
								<label class="cursor-pointer">
									<span class="text-sm text-zinc-600">Choose a CSV file or drag and drop</span>
									<input type="file" accept=".csv" on:change={(e) => bulkUploadFile = e.target.files[0]} class="hidden" />
								</label>
							</div>
							{#if bulkUploadFile}
								<div class="mt-2 text-sm text-green-600">
									Selected: {bulkUploadFile.name}
								</div>
							{/if}
						</div>
					</div>

					<div class="bg-blue-50 p-4 rounded-lg">
						<h4 class="text-sm font-medium text-blue-900 mb-2">CSV Format Requirements:</h4>
						<ul class="text-sm text-blue-800 space-y-1">
							<li>• First row should contain headers</li>
							<li>• Required fields: firstName, lastName, workEmail, designation, department</li>
							<li>• Optional fields: middleName, gender, dateOfJoining, personalEmail, mobileNumber, dateOfBirth</li>
						</ul>
						<button 
							on:click={() => {
								const csvTemplate = 'employeeNumber,firstName,middleName,lastName,gender,dateOfJoining,designation,workEmail,department,workLocation,employeeStatus,personalEmail,mobileNumber,dateOfBirth\n';
								const blob = new Blob([csvTemplate], { type: 'text/csv' });
								const url = window.URL.createObjectURL(blob);
								const a = document.createElement('a');
								a.href = url;
								a.download = 'employee_template.csv';
								a.click();
								window.URL.revokeObjectURL(url);
							}}
							class="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
						>
							Download CSV Template
						</button>
					</div>
				</div>

				<div class="flex justify-end gap-3 pt-6">
					<button type="button" on:click={closeModals} class="px-4 py-2 text-zinc-600 border border-zinc-300 rounded-lg hover:bg-zinc-50">
						Cancel
					</button>
					<button 
						type="button" 
						on:click={handleBulkUpload} 
						disabled={!bulkUploadFile}
						class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						Upload Employees
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}