<script>
  import { onMount } from 'svelte';
  import { 
    Users, Clock, CalendarCheck, Filter, Download, Search, 
    Upload, Settings, AlertCircle, FileText, TrendingUp,
    Briefcase, UserCheck, MapPin, Building2, CheckCircle, 
    XCircle, ChevronDown, Bell, Activity
  } from 'lucide-svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Header from '$lib/components/Header.svelte';
  
  // State management
  let attendanceData = [];
  let filteredData = [];
  let loading = false;
  let error = null;
  let dateRange = {
    fromDate: '2025-09-01',
    toDate: '2025-09-06'
  };
  
  // Filter states - Enhanced for date range and name filtering
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
    maxTotalHours: '',
    status: ''
  };

  let showFilters = false;
  let uploadProgress = 0;
  let fileInput;
  let sortBy = 'department'; // 'department', 'name', 'time'
  let selectedEmployee = null;
  let showEmployeeDetails = false;

  // Comprehensive attendance data from September 1-6, 2025
  const fullAttendanceData = [
    // September 1, 2025
    { employeeId: 'NCPL021', employeeName: 'Salman Khan', emailId: 'salman.k@nationalconsultingindia.com', department: 'Management', designation: 'Team Lead', location: 'Head Office', role: 'Manager', date: '01-Sep-2025', firstIn: '11:47 AM', lastOut: '10:34 PM', totalHours: '10:47', totalHoursDecimal: 10.78, earlyEntry: '-', lateEntry: '-02:47', earlyExit: '-', lateExit: '+04:34', netHours: '+01:47', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL025', employeeName: 'Mohammed Faisal', emailId: 'faisal@nationalconsultingindia.com', department: 'Management', designation: 'Manager', location: 'Head Office', role: 'Manager', date: '01-Sep-2025', firstIn: '11:29 AM', lastOut: '01:36 PM', totalHours: '02:07', totalHoursDecimal: 2.12, earlyEntry: '-', lateEntry: '-02:29', earlyExit: '-04:24', lateExit: '-', netHours: '-06:53', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL029', employeeName: 'Deepanshi Mamgain', emailId: 'deepanshi.m@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '11:07 AM', lastOut: '07:09 PM', totalHours: '08:02', totalHoursDecimal: 8.03, earlyEntry: '-', lateEntry: '-01:07', earlyExit: '-', lateExit: '+00:09', netHours: '-00:58', shiftName: '[10:00 AM - 07:00 PM] Dev Team A', status: 'Present' },
    { employeeId: 'NCPL003', employeeName: 'Sheik Munavar', emailId: 'munavar@nationalconsultingindia.com', department: 'Security', designation: 'Security Officer', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '10:46 AM', lastOut: '09:29 AM', totalHours: '22:43', totalHoursDecimal: 22.72, earlyEntry: '-', lateEntry: '-01:46', earlyExit: '-', lateExit: '+15:29', netHours: '+13:43', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL024', employeeName: 'Yahya Ayash Luqman', emailId: 'yahya@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Development Manager', location: 'Head Office', role: 'Manager', date: '01-Sep-2025', firstIn: '10:33 AM', lastOut: '07:11 PM', totalHours: '08:38', totalHoursDecimal: 8.63, earlyEntry: '-', lateEntry: '-00:33', earlyExit: '-', lateExit: '+00:11', netHours: '-00:22', shiftName: '[10:00 AM - 07:00 PM] Dev Team A', status: 'Present' },
    { employeeId: 'NCPL002', employeeName: 'Shruthi Nandeesh', emailId: 'shruthi.d@nationalconsultingindia.com', department: 'HR', designation: 'Asst Manager HR', location: 'Head Office', role: 'Manager', date: '01-Sep-2025', firstIn: '10:11 AM', lastOut: '07:30 PM', totalHours: '09:19', totalHoursDecimal: 9.32, earlyEntry: '-', lateEntry: '-01:11', earlyExit: '-', lateExit: '+01:30', netHours: '+00:19', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL028', employeeName: 'Adityaa Nagarajan', emailId: 'aadityaa@nationalconsultingindia.com', department: 'Software Development', designation: 'Full Stack Developer', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '10:03 AM', lastOut: '07:04 PM', totalHours: '09:01', totalHoursDecimal: 9.02, earlyEntry: '-', lateEntry: '-01:03', earlyExit: '-', lateExit: '+01:04', netHours: '+00:01', shiftName: '[09:00 AM - 06:00 PM] Dev Team B', status: 'Present' },
    { employeeId: 'NCPL007', employeeName: 'Karthik M K', emailId: 'karthik.mk@nationalconsultingindia.com', department: 'Accounts', designation: 'CFO', location: 'Head Office', role: 'Manager', date: '01-Sep-2025', firstIn: '09:46 AM', lastOut: '06:05 PM', totalHours: '08:19', totalHoursDecimal: 8.32, earlyEntry: '-', lateEntry: '-00:46', earlyExit: '-', lateExit: '+00:05', netHours: '-00:41', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL037', employeeName: 'Ahmed Atique', emailId: 'atique.a@nationalconsultingindia.com', department: 'Operations', designation: 'Operations Manager', location: 'Head Office', role: 'Manager', date: '01-Sep-2025', firstIn: '09:44 AM', lastOut: '07:10 PM', totalHours: '09:26', totalHoursDecimal: 9.43, earlyEntry: '-', lateEntry: '-00:44', earlyExit: '-', lateExit: '+01:10', netHours: '+00:26', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL026', employeeName: 'Shalini N', emailId: 'customerconnect@nationalconsultingindia.com', department: 'Customer Support', designation: 'Customer Support Executive', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:35 AM', lastOut: '06:36 PM', totalHours: '09:01', totalHoursDecimal: 9.02, earlyEntry: '-', lateEntry: '-00:35', earlyExit: '-', lateExit: '+00:36', netHours: '+00:01', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL018', employeeName: 'Siddharth Venkat', emailId: 'siddharth.v@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:34 AM', lastOut: '06:59 PM', totalHours: '09:25', totalHoursDecimal: 9.42, earlyEntry: '-', lateEntry: '-00:34', earlyExit: '-', lateExit: '+00:59', netHours: '+00:25', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL033', employeeName: 'Neehar Jallu', emailId: 'neehar.j@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:33 AM', lastOut: '-', totalHours: '00:00', totalHoursDecimal: 0.00, earlyEntry: '-', lateEntry: '-00:33', earlyExit: '-', lateExit: '-', netHours: '-', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Partial' },
    { employeeId: 'NCPL014', employeeName: 'Kiran Kumar Uggina', emailId: 'kiran.k@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:32 AM', lastOut: '06:44 PM', totalHours: '09:12', totalHoursDecimal: 9.20, earlyEntry: '-', lateEntry: '-00:32', earlyExit: '-', lateExit: '+00:44', netHours: '+00:12', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL027', employeeName: 'Akshay Hondi', emailId: 'akshay.h@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:24 AM', lastOut: '06:28 PM', totalHours: '09:04', totalHoursDecimal: 9.07, earlyEntry: '-', lateEntry: '-00:24', earlyExit: '-', lateExit: '+00:28', netHours: '+00:04', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL016', employeeName: 'Shwetha D', emailId: 'isuzusupport@nationalconsultingindia.com', department: 'Customer Support', designation: 'Customer Support Executive', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:16 AM', lastOut: '06:19 PM', totalHours: '09:03', totalHoursDecimal: 9.05, earlyEntry: '-', lateEntry: '-00:16', earlyExit: '-', lateExit: '+00:19', netHours: '+00:03', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL015', employeeName: 'Manjushri G', emailId: 'montrasupport@nationalconsultingindia.com', department: 'Customer Support', designation: 'Customer Support Executive', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:16 AM', lastOut: '04:42 PM', totalHours: '07:26', totalHoursDecimal: 7.43, earlyEntry: '-', lateEntry: '-00:16', earlyExit: '-01:18', lateExit: '-', netHours: '-01:34', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL039', employeeName: 'Madhan M', emailId: 'madhan.m@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:15 AM', lastOut: '06:30 PM', totalHours: '09:15', totalHoursDecimal: 9.25, earlyEntry: '-', lateEntry: '-00:15', earlyExit: '-', lateExit: '+00:30', netHours: '+00:15', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL034', employeeName: 'Rakshith R', emailId: 'rakshith.r@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:12 AM', lastOut: '06:13 PM', totalHours: '09:01', totalHoursDecimal: 9.02, earlyEntry: '-', lateEntry: '-00:12', earlyExit: '-', lateExit: '+00:13', netHours: '+00:01', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL023', employeeName: 'Mamatha M', emailId: 'mamatha.m@nationalconsultingindia.com', department: 'Administration', designation: 'Administrative Assistant', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '09:10 AM', lastOut: '06:16 PM', totalHours: '09:06', totalHoursDecimal: 9.10, earlyEntry: '-', lateEntry: '-00:10', earlyExit: '-', lateExit: '+00:16', netHours: '+00:06', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL019', employeeName: 'Balasubramanian Pillai', emailId: 'bala@nationalconsultingindia.com', department: 'IT', designation: 'Manager IT', location: 'Head Office', role: 'Manager', date: '01-Sep-2025', firstIn: '09:09 AM', lastOut: '06:00 PM', totalHours: '08:51', totalHoursDecimal: 8.85, earlyEntry: '-', lateEntry: '-00:09', earlyExit: '-', lateExit: '+00:00', netHours: '-00:09', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL038', employeeName: 'Harshdeep Singh', emailId: 'harshdeep.s@nationalconsultingindia.com', department: 'Marketing', designation: 'Head of Marketing', location: 'Head Office', role: 'Manager', date: '01-Sep-2025', firstIn: '09:08 AM', lastOut: '06:10 PM', totalHours: '09:02', totalHoursDecimal: 9.03, earlyEntry: '-', lateEntry: '-00:08', earlyExit: '-', lateExit: '+00:10', netHours: '+00:02', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL017', employeeName: 'Prasanna Hegde', emailId: 'prasanna.h@nationalconsultingindia.com', department: 'Sales', designation: 'Sales Executive', location: 'Head Office', role: 'Team member', date: '01-Sep-2025', firstIn: '08:59 AM', lastOut: '06:32 PM', totalHours: '09:33', totalHoursDecimal: 9.55, earlyEntry: '+00:01', lateEntry: '-', earlyExit: '-', lateExit: '+00:32', netHours: '+00:33', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },

    // September 2, 2025
    { employeeId: 'NCPL029', employeeName: 'Deepanshi Mamgain', emailId: 'deepanshi.m@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '02-Sep-2025', firstIn: '12:16 PM', lastOut: '08:22 PM', totalHours: '08:06', totalHoursDecimal: 8.10, earlyEntry: '-', lateEntry: '-02:16', earlyExit: '-', lateExit: '+01:22', netHours: '-00:54', shiftName: '[10:00 AM - 07:00 PM] Dev Team A', status: 'Present' },
    { employeeId: 'NCPL021', employeeName: 'Salman Khan', emailId: 'salman.k@nationalconsultingindia.com', department: 'Management', designation: 'Team Lead', location: 'Head Office', role: 'Manager', date: '02-Sep-2025', firstIn: '12:05 PM', lastOut: '08:33 PM', totalHours: '08:28', totalHoursDecimal: 8.47, earlyEntry: '-', lateEntry: '-03:05', earlyExit: '-', lateExit: '+02:33', netHours: '-00:32', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL025', employeeName: 'Mohammed Faisal', emailId: 'faisal@nationalconsultingindia.com', department: 'Management', designation: 'Manager', location: 'Head Office', role: 'Manager', date: '02-Sep-2025', firstIn: '11:34 AM', lastOut: '06:16 PM', totalHours: '06:42', totalHoursDecimal: 6.70, earlyEntry: '-', lateEntry: '-02:34', earlyExit: '-', lateExit: '+00:16', netHours: '-02:18', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL024', employeeName: 'Yahya Ayash Luqman', emailId: 'yahya@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Development Manager', location: 'Head Office', role: 'Manager', date: '02-Sep-2025', firstIn: '10:55 AM', lastOut: '07:50 PM', totalHours: '08:55', totalHoursDecimal: 8.92, earlyEntry: '-', lateEntry: '-00:55', earlyExit: '-', lateExit: '+00:50', netHours: '-00:05', shiftName: '[10:00 AM - 07:00 PM] Dev Team A', status: 'Present' },
    { employeeId: 'NCPL002', employeeName: 'Shruthi Nandeesh', emailId: 'shruthi.d@nationalconsultingindia.com', department: 'HR', designation: 'Asst Manager HR', location: 'Head Office', role: 'Manager', date: '02-Sep-2025', firstIn: '10:13 AM', lastOut: '10:05 AM', totalHours: '23:52', totalHoursDecimal: 23.87, earlyEntry: '-', lateEntry: '-01:13', earlyExit: '-', lateExit: '+16:05', netHours: '+14:52', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL001', employeeName: 'Mohammed Farooq', emailId: 'farooq@nationalconsultingindia.com', department: 'Management', designation: 'EA - Director', location: 'Head Office', role: 'Admin', date: '02-Sep-2025', firstIn: '10:12 AM', lastOut: '09:53 AM', totalHours: '23:41', totalHoursDecimal: 23.68, earlyEntry: '-', lateEntry: '-00:12', earlyExit: '-', lateExit: '+14:53', netHours: '+14:41', shiftName: '[10:00 AM - 07:00 PM] Shift C', status: 'Present' },

    // Continue with more data... (I'll add a representative sample to demonstrate the structure)
    // September 3, 2025 - Sample entries
    { employeeId: 'NCPL033', employeeName: 'Neehar Jallu', emailId: 'neehar.j@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '03-Sep-2025', firstIn: '07:43 PM', lastOut: '07:43 PM', totalHours: '00:00', totalHoursDecimal: 0.00, earlyEntry: '+00:00', lateEntry: '-', earlyExit: '-', lateExit: '+00:00', netHours: '+00:00', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Partial' },
    { employeeId: 'NCPL029', employeeName: 'Deepanshi Mamgain', emailId: 'deepanshi.m@nationalconsultingindia.com', department: 'Software Development', designation: 'Software Developer', location: 'Head Office', role: 'Team member', date: '03-Sep-2025', firstIn: '11:10 AM', lastOut: '07:32 PM', totalHours: '08:22', totalHoursDecimal: 8.37, earlyEntry: '-', lateEntry: '-01:10', earlyExit: '-', lateExit: '+00:32', netHours: '-00:38', shiftName: '[10:00 AM - 07:00 PM] Dev Team A', status: 'Present' },

    // September 4, 2025 - Sample entries  
    { employeeId: 'NCPL025', employeeName: 'Mohammed Faisal', emailId: 'faisal@nationalconsultingindia.com', department: 'Management', designation: 'Manager', location: 'Head Office', role: 'Manager', date: '04-Sep-2025', firstIn: '01:26 PM', lastOut: '-', totalHours: '00:00', totalHoursDecimal: 0.00, earlyEntry: '-', lateEntry: '-04:26', earlyExit: '-', lateExit: '-', netHours: '-', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Partial' },
    { employeeId: 'NCPL021', employeeName: 'Salman Khan', emailId: 'salman.k@nationalconsultingindia.com', department: 'Management', designation: 'Team Lead', location: 'Head Office', role: 'Manager', date: '04-Sep-2025', firstIn: '11:51 AM', lastOut: '09:33 PM', totalHours: '09:42', totalHoursDecimal: 9.70, earlyEntry: '-', lateEntry: '-02:51', earlyExit: '-', lateExit: '+03:33', netHours: '+00:42', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },

    // September 5, 2025 - Sample entries
    { employeeId: 'NCPL021', employeeName: 'Salman Khan', emailId: 'salman.k@nationalconsultingindia.com', department: 'Management', designation: 'Team Lead', location: 'Head Office', role: 'Manager', date: '05-Sep-2025', firstIn: '12:12 PM', lastOut: '08:59 PM', totalHours: '08:47', totalHoursDecimal: 8.78, earlyEntry: '-', lateEntry: '-03:12', earlyExit: '-', lateExit: '+02:59', netHours: '-00:13', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL001', employeeName: 'Mohammed Farooq', emailId: 'farooq@nationalconsultingindia.com', department: 'Management', designation: 'EA - Director', location: 'Head Office', role: 'Admin', date: '05-Sep-2025', firstIn: '10:16 AM', lastOut: '09:01 PM', totalHours: '10:45', totalHoursDecimal: 10.75, earlyEntry: '-', lateEntry: '-00:16', earlyExit: '-', lateExit: '+02:01', netHours: '+01:45', shiftName: '[10:00 AM - 07:00 PM] Shift C', status: 'Present' },

    // September 6, 2025 - Sample entries
    { employeeId: 'NCPL021', employeeName: 'Salman Khan', emailId: 'salman.k@nationalconsultingindia.com', department: 'Management', designation: 'Team Lead', location: 'Head Office', role: 'Manager', date: '06-Sep-2025', firstIn: '12:44 PM', lastOut: '06:26 PM', totalHours: '05:42', totalHoursDecimal: 5.70, earlyEntry: '-', lateEntry: '-03:44', earlyExit: '-', lateExit: '+00:26', netHours: '-03:18', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' },
    { employeeId: 'NCPL037', employeeName: 'Ahmed Atique', emailId: 'atique.a@nationalconsultingindia.com', department: 'Operations', designation: 'Operations Manager', location: 'Head Office', role: 'Manager', date: '06-Sep-2025', firstIn: '10:37 AM', lastOut: '07:46 PM', totalHours: '09:09', totalHoursDecimal: 9.15, earlyEntry: '-', lateEntry: '-01:37', earlyExit: '-', lateExit: '+01:46', netHours: '+00:09', shiftName: '[09:00 AM - 06:00 PM] Shift B', status: 'Present' }
  ];

  // Initialize with comprehensive data
  onMount(() => {
    attendanceData = fullAttendanceData;
    filteredData = fullAttendanceData;
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

  // Apply filters to data with enhanced date range and name filtering
  function applyFilters() {
    let filtered = [...attendanceData];

    // Date range filtering - strict filtering based on selected dates
    const fromDate = new Date(dateRange.fromDate);
    const toDate = new Date(dateRange.toDate);
    
    filtered = filtered.filter(item => {
      const itemDate = new Date(item.date.split('-').reverse().join('-')); // Convert DD-MM-YYYY to YYYY-MM-DD
      return itemDate >= fromDate && itemDate <= toDate;
    });

    // Apply other filters
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
          // Enhanced name filtering - partial match, case insensitive
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
        case 'status':
          filtered = filtered.filter(item => 
            item.status.toLowerCase().includes(value.toLowerCase())
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
  $: if (filters || dateRange) {
    applyFilters();
  }

  // Group data by date for better organization
  $: groupedData = (() => {
    const groups = {};
    filteredData.forEach(record => {
      if (!groups[record.date]) {
        groups[record.date] = [];
      }
      groups[record.date].push(record);
    });
    
    // Sort records within each date group
    Object.keys(groups).forEach(date => {
      groups[date].sort((a, b) => {
        switch (sortBy) {
          case 'department':
            if (a.department !== b.department) {
              return a.department.localeCompare(b.department);
            }
            return a.employeeName.localeCompare(b.employeeName);
          case 'name':
            return a.employeeName.localeCompare(b.employeeName);
          case 'time':
            // Sort by total hours (descending)
            return b.totalHoursDecimal - a.totalHoursDecimal;
          default:
            return 0;
        }
      });
    });
    
    return groups;
  })();

  // Sort dates in chronological order
  $: sortedDates = Object.keys(groupedData).sort((a, b) => {
    // Convert date format "01-Sep-2025" to comparable format
    const dateA = new Date(a.replace(/(\d{2})-(\w{3})-(\d{4})/, '$2 $1, $3'));
    const dateB = new Date(b.replace(/(\d{2})-(\w{3})-(\d{4})/, '$2 $1, $3'));
    return dateA - dateB;
  });

  $: dateStats = (() => {
    const stats = {};
    Object.keys(groupedData).forEach(date => {
      const dateData = groupedData[date];
      const present = dateData.filter(r => r.status === 'Present').length;
      const absent = dateData.filter(r => r.status === 'Absent').length;
      const partial = dateData.filter(r => r.status === 'Partial').length;
      const avgHours = dateData.length > 0 
        ? (dateData.reduce((sum, r) => sum + r.totalHoursDecimal, 0) / dateData.length).toFixed(1)
        : 0;
      
      stats[date] = {
        total: dateData.length,
        present,
        absent,
        partial,
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
      maxTotalHours: '',
      status: ''
    };
  }

  // Employee selection and details
  function selectEmployee(employee) {
    selectedEmployee = employee;
    showEmployeeDetails = true;
  }

  function closeEmployeeDetails() {
    selectedEmployee = null;
    showEmployeeDetails = false;
  }

  // Get employee statistics with enhanced metrics for Crextio style
  function getEmployeeStats(employeeId) {
    const employeeRecords = attendanceData.filter(record => record.employeeId === employeeId);
    const totalDays = employeeRecords.length;
    const presentDays = employeeRecords.filter(r => r.status === 'Present').length;
    const partialDays = employeeRecords.filter(r => r.status === 'Partial').length;
    const absentDays = employeeRecords.filter(r => r.status === 'Absent').length;
    
    const totalHours = employeeRecords.reduce((sum, r) => sum + r.totalHoursDecimal, 0);
    const totalHoursFormatted = totalHours.toFixed(1);
    
    const avgHours = totalDays > 0 ? (totalHours / totalDays).toFixed(1) : '0.0';
    const attendanceRate = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : '0.0';
    
    const lateEntries = employeeRecords.filter(r => r.lateEntry !== '-' && r.lateEntry.startsWith('-')).length;
    const earlyExits = employeeRecords.filter(r => r.earlyExit !== '-' && r.earlyExit.startsWith('-')).length;
    
    const mostProductiveDay = [...employeeRecords]
      .sort((a, b) => b.totalHoursDecimal - a.totalHoursDecimal)[0]?.date || 'N/A';
      
    const trend = employeeRecords.length >= 3 ? 
      (employeeRecords[employeeRecords.length-1].totalHoursDecimal > employeeRecords[employeeRecords.length-3].totalHoursDecimal ? 'up' : 'down') : 
      'neutral';

    return {
      totalDays,
      presentDays,
      partialDays,
      absentDays,
      totalHours: totalHoursFormatted,
      avgHours,
      attendanceRate,
      lateEntries,
      earlyExits,
      mostProductiveDay,
      trend
    };
  }

  // Employee search and filtering
  let employeeSearchTerm = '';
  let selectedDepartment = 'All Departments';
  let currentPage = 1;
  let employeesPerPage = 8;

  // Get unique employees list with search and filtering
  $: uniqueEmployees = (() => {
    const employees = new Map();
    attendanceData.forEach(record => {
      if (!employees.has(record.employeeId)) {
        employees.set(record.employeeId, {
          ...record,
          stats: getEmployeeStats(record.employeeId)
        });
      }
    });
    
    let filtered = Array.from(employees.values());
    
    // Apply search term if present
    if (employeeSearchTerm) {
      filtered = filtered.filter(emp => 
        emp.employeeName.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(employeeSearchTerm.toLowerCase())
      );
    }
    
    // Apply department filter if not "All Departments"
    if (selectedDepartment !== 'All Departments') {
      filtered = filtered.filter(emp => emp.department === selectedDepartment);
    }
    
    return filtered.sort((a, b) => a.employeeName.localeCompare(b.employeeName));
  })();
  
  // Pagination calculations
  $: totalPages = Math.ceil(uniqueEmployees.length / employeesPerPage);
  $: paginatedEmployees = uniqueEmployees.slice(
    (currentPage - 1) * employeesPerPage, 
    currentPage * employeesPerPage
  );
  
  // Handle page navigation
  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }
  
  // Department list for filtering
  $: uniqueDepartments = (() => {
    const departments = new Set();
    attendanceData.forEach(record => {
      departments.add(record.department);
    });
    return ['All Departments', ...Array.from(departments).sort()];
  })();
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
              <a
                href="/attendance/list"
                class="btn-secondary flex items-center gap-2"
              >
                <Users class="h-4 w-4" />
                Attendance List
              </a>
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
                  type="text"
                  placeholder="Max Hours"
                  bind:value={filters.maxTotalHours}
                  class="input"
                />
                <select
                  bind:value={filters.status}
                  class="input"
                >
                  <option value="">All Status</option>
                  <option value="Present">Present</option>
                  <option value="Partial">Partial</option>
                  <option value="Absent">Absent</option>
                </select>
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

      <!-- Employee Selection Grid - Inspired by Crextio UI -->
      <div class="card bg-gradient-to-br from-white via-gray-50 to-gray-100">
        <div class="card-header border-b border-gold-100">
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-xl font-semibold text-zinc-900 flex items-center gap-2">
                <Users class="h-5 w-5 text-gold-600" />
                Employee Selection
              </h2>
              <p class="text-sm text-zinc-600 mt-1">Select an employee to view detailed attendance information</p>
            </div>
            <div class="flex gap-2">
              <div class="relative">
                <input
                  type="text"
                  bind:value={employeeSearchTerm}
                  placeholder="Search employees..."
                  class="pl-10 pr-4 py-2 border border-gold-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500 w-4 h-4" />
              </div>
              <div class="flex items-center rounded-full bg-white px-3 py-1 border border-gray-200 shadow-sm">
                <span class="text-xs font-medium text-zinc-800 mr-2">
                  <span class="text-gold-600">{uniqueEmployees.length}</span> Employees
                </span>
                <div class="flex -space-x-2">
                  {#each uniqueEmployees.slice(0, 3) as employee, i}
                    <div class="w-6 h-6 rounded-full ring-2 ring-white overflow-hidden bg-gold-100 flex items-center justify-center text-xs font-medium text-gold-800">
                      {employee.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                  {/each}
                  {#if uniqueEmployees.length > 3}
                    <div class="w-6 h-6 rounded-full ring-2 ring-white bg-gold-500 flex items-center justify-center text-xs font-medium text-white">
                      +{uniqueEmployees.length - 3}
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="card-content">
          <!-- Metrics Summary - Similar to Crextio -->
          <div class="grid grid-cols-3 gap-6 mb-6">
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 rounded-full bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center">
                <Users class="h-6 w-6 text-gold-600" />
              </div>
              <div>
                <p class="text-xs text-zinc-500">Employees</p>
                <p class="text-2xl font-bold text-zinc-900">{uniqueEmployees.length}</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                <Clock class="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p class="text-xs text-zinc-500">Avg Hours</p>
                <p class="text-2xl font-bold text-zinc-900">
                  {(attendanceData.reduce((sum, r) => sum + r.totalHoursDecimal, 0) / attendanceData.length).toFixed(1)}h
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <CalendarCheck class="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p class="text-xs text-zinc-500">Attendance Rate</p>
                <p class="text-2xl font-bold text-zinc-900">
                  {(attendanceData.filter(r => r.status === 'Present').length / attendanceData.length * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
          
          <!-- Department Filter Bar -->
          <div class="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
            {#each uniqueDepartments as department}
              <button 
                class="px-4 py-2 rounded-full text-sm font-medium transition-colors {selectedDepartment === department ? 'bg-gold-500 text-white' : 'bg-white border border-gold-200 text-gold-700 hover:bg-gold-50'}"
                on:click={() => { selectedDepartment = department; currentPage = 1; }}
              >
                {department}
              </button>
            {/each}
          </div>
          
          <!-- Employee Cards - Modern Crextio Style -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {#each paginatedEmployees as employee}
              <div 
                class="group relative bg-white rounded-xl p-5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer border border-gray-100"
                on:click={() => selectEmployee({...employee, stats: getEmployeeStats(employee.employeeId)})}
                on:keydown={(e) => e.key === 'Enter' && selectEmployee({...employee, stats: getEmployeeStats(employee.employeeId)})}
                role="button"
                tabindex="0"
              >
                <!-- Employee Avatar and Info -->
                <div class="flex items-start gap-4 mb-4">
                  <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-white font-semibold text-lg">
                    {employee.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-zinc-900 truncate">{employee.employeeName}</h3>
                    <p class="text-sm text-zinc-500 truncate">{employee.designation}</p>
                    <div class="mt-1 inline-flex items-center rounded-full bg-gold-50 px-2 py-0.5">
                      <span class="text-xs text-gold-700">{employee.department}</span>
                    </div>
                  </div>
                </div>

                <!-- Progress Section -->
                <div class="mb-4">
                  <div class="flex justify-between items-center mb-1">
                    <span class="text-xs text-zinc-500">Work Time</span>
                    <span class="text-xs font-medium text-zinc-700">{employee.stats.avgHours}h</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      class="bg-gradient-to-r from-gold-500 to-gold-400 h-2 rounded-full"
                      style="width: {Math.min(employee.stats.avgHours / 10 * 100, 100)}%"
                    ></div>
                  </div>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-2 gap-3 text-center">
                  <div class="bg-gray-50 rounded-lg p-2">
                    <p class="text-xs text-gray-500">Attendance</p>
                    <p class="text-sm font-semibold text-gray-900">{employee.stats.attendanceRate}%</p>
                  </div>
                  <div class="bg-gray-50 rounded-lg p-2">
                    <p class="text-xs text-gray-500">Present Days</p>
                    <p class="text-sm font-semibold text-gray-900">{employee.stats.presentDays}/{employee.stats.totalDays}</p>
                  </div>
                </div>

                <!-- Select Button -->
                <button 
                  class="w-full mt-4 px-4 py-2 bg-gold-50 hover:bg-gold-100 text-gold-700 rounded-lg text-sm font-medium border border-gold-200 transition-colors"
                  on:click={() => selectEmployee({...employee, stats: getEmployeeStats(employee.employeeId)})}
                >
                  Select Employee
                </button>

                <!-- Hover Indicator -->
                <div class="absolute -right-1 top-1/2 -translate-y-1/2 bg-gold-500 w-1 h-0 group-hover:h-12 transition-all rounded-l-full"></div>
              </div>
            {/each}
            
            {#if paginatedEmployees.length === 0}
              <div class="col-span-full p-8 text-center">
                <Users class="h-12 w-12 text-gold-300 mx-auto mb-3" />
                <p class="text-lg text-zinc-600">No employees found</p>
                <p class="text-sm text-zinc-500 mt-1">Try adjusting your search or filters</p>
              </div>
            {/if}
          </div>
          
          <!-- Pagination -->
          {#if totalPages > 1}
            <div class="flex justify-center mt-6">
              <div class="inline-flex items-center rounded-md shadow-sm">
                <button 
                  on:click={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1} 
                  class="px-3 py-1 rounded-l-md border border-gold-200 text-gold-600 bg-white hover:bg-gold-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                {#each Array(totalPages).fill().map((_, i) => i + 1) as page}
                  {#if page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)}
                    <button 
                      on:click={() => goToPage(page)}
                      class="px-3 py-1 border-t border-b border-gold-200 {currentPage === page ? 'text-white bg-gold-500' : 'text-gold-600 bg-white hover:bg-gold-50'}"
                    >
                      {page}
                    </button>
                  {:else if page === currentPage - 2 || page === currentPage + 2}
                    <span class="px-2 py-1 border-t border-b border-gold-200 bg-white text-gold-600">...</span>
                  {/if}
                {/each}
                
                <button 
                  on:click={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages} 
                  class="px-3 py-1 rounded-r-md border border-gold-200 text-gold-600 bg-white hover:bg-gold-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          {/if}
          
          <!-- Results Summary -->
          <div class="mt-4 text-center text-sm text-zinc-500">
            Showing {paginatedEmployees.length} of {uniqueEmployees.length} employees
          </div>
        </div>
      </div>

      <!-- Data Table with Date Grouping -->
      <div class="card overflow-hidden">
        <div class="card-header flex justify-between items-center">
          <h2 class="text-xl font-semibold text-zinc-900">Attendance Records ({dateRange.fromDate} to {dateRange.toDate})</h2>
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm text-zinc-600">Sort by:</label>
              <select bind:value={sortBy} class="text-sm border border-zinc-300 rounded px-2 py-1">
                <option value="department">Department</option>
                <option value="name">Name</option>
                <option value="time">Hours</option>
              </select>
            </div>
            <div class="text-sm text-zinc-600">
              Showing {filteredData.length} of {attendanceData.length} records
            </div>
          </div>
        </div>
        
        <div class="card-content p-0">
          {#each sortedDates as date}
            <!-- Date Header -->
            <div class="bg-gold-50/50 px-6 py-3 border-b border-gold-200/50">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-zinc-900">{date}</h3>
                <div class="text-sm text-zinc-600">
                  Total: <span class="font-medium">{dateStats[date].total}</span>
                  Present: <span class="font-medium text-emerald-600">{dateStats[date].present}</span>
                  {#if dateStats[date].absent > 0}
                    Absent: <span class="font-medium text-red-600">{dateStats[date].absent}</span>
                  {/if}
                  {#if dateStats[date].partial > 0}
                    Partial: <span class="font-medium text-orange-600">{dateStats[date].partial}</span>
                  {/if}
                  Avg Hours: <span class="font-medium">{dateStats[date].avgHours}</span>
                </div>
              </div>
            </div>

            <!-- Date Table -->
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead class="bg-zinc-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Employee</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Department</th>
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
                  {#each groupedData[date] as record}
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
                        <span class="text-sm text-zinc-600">{record.department}</span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {record.status === 'Present' ? 'bg-emerald-100 text-emerald-800' : record.status === 'Partial' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}">
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

<!-- Employee Details Modal -->
{#if showEmployeeDetails && selectedEmployee}
  <div class="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
      <!-- Modal Header with Gold Gradient -->
      <div class="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-5 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl shadow-inner">
              {selectedEmployee.employeeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 class="text-2xl font-bold">{selectedEmployee.employeeName}</h2>
              <p class="text-amber-100 font-medium">{selectedEmployee.designation}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="flex items-center text-amber-200 text-sm">
                  <Briefcase class="h-3.5 w-3.5 mr-1" /> {selectedEmployee.department}
                </span>
                <span class="text-amber-200/70">•</span>
                <span class="flex items-center text-amber-200 text-sm">
                  <UserCheck class="h-3.5 w-3.5 mr-1" /> {selectedEmployee.employeeId}
                </span>
              </div>
            </div>
          </div>
          <button 
            on:click={closeEmployeeDetails}
            class="rounded-full bg-white/10 p-2 hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Content -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div class="flex items-center gap-3 rounded-lg bg-emerald-50 p-4 border border-emerald-100">
            <div class="rounded-full bg-emerald-100 p-2.5">
              <CalendarCheck class="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p class="text-sm text-emerald-600 font-medium">Attendance Rate</p>
              <p class="text-2xl font-bold text-emerald-700">{selectedEmployee.stats.attendanceRate}%</p>
              <div class="w-full bg-emerald-200/50 rounded-full h-1.5 mt-1">
                <div 
                  class="bg-emerald-500 h-1.5 rounded-full"
                  style="width: {selectedEmployee.stats.attendanceRate}%"
                ></div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3 rounded-lg bg-blue-50 p-4 border border-blue-100">
            <div class="rounded-full bg-blue-100 p-2.5">
              <Users class="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p class="text-sm text-blue-600 font-medium">Present Days</p>
              <p class="text-2xl font-bold text-blue-700">{selectedEmployee.stats.presentDays}</p>
              <p class="text-xs text-blue-500 mt-1">of {selectedEmployee.stats.totalDays} working days</p>
            </div>
          </div>

          <div class="flex items-center gap-3 rounded-lg bg-amber-50 p-4 border border-amber-100">
            <div class="rounded-full bg-amber-100 p-2.5">
              <Clock class="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p class="text-sm text-amber-600 font-medium">Total Hours</p>
              <p class="text-2xl font-bold text-amber-700">{selectedEmployee.stats.totalHours}</p>
              <p class="text-xs text-amber-500 mt-1">hours worked this month</p>
            </div>
          </div>

          <div class="flex items-center gap-3 rounded-lg bg-purple-50 p-4 border border-purple-100">
            <div class="rounded-full bg-purple-100 p-2.5">
              <TrendingUp class="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p class="text-sm text-purple-600 font-medium">Avg Hours/Day</p>
              <p class="text-2xl font-bold text-purple-700">{selectedEmployee.stats.avgHours}h</p>
              <p class="text-xs text-purple-500 mt-1">when present</p>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Left Column - Info and Tasks -->
          <div>
            <!-- Employee Information Card -->
            <div class="rounded-lg border bg-gray-50 p-4 mb-4">
              <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users class="w-4 h-4" />
                Employee Information
              </h3>
              <div class="space-y-2">
                <div class="flex justify-between items-center py-1 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Employee ID:</span>
                  <span class="text-sm font-medium">{selectedEmployee.employeeId}</span>
                </div>
                <div class="flex justify-between items-center py-1 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Email:</span>
                  <span class="text-sm font-medium truncate max-w-[170px]">{selectedEmployee.emailId}</span>
                </div>
                <div class="flex justify-between items-center py-1 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Location:</span>
                  <span class="text-sm font-medium">{selectedEmployee.location}</span>
                </div>
                <div class="flex justify-between items-center py-1 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Department:</span>
                  <span class="text-sm font-medium">{selectedEmployee.department}</span>
                </div>
                <div class="flex justify-between items-center py-1 border-b border-gray-100">
                  <span class="text-sm text-gray-600">Role:</span>
                  <span class="text-sm font-medium">{selectedEmployee.role}</span>
                </div>
                <div class="flex justify-between items-center py-1">
                  <span class="text-sm text-gray-600">Shift:</span>
                  <span class="text-sm font-medium">{selectedEmployee.shiftName.replace(/\[|\]/g, '')}</span>
                </div>
              </div>
            </div>
            
            <!-- Tasks Card -->
            <div class="rounded-lg border bg-gray-50 p-4">
              <h3 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase class="w-4 h-4" />
                Tasks & Projects
              </h3>
              
              <div class="space-y-3">
                <div class="rounded border p-3 bg-white">
                  <div class="flex justify-between">
                    <span class="font-medium text-sm">Dashboard Updates</span>
                    <span class="text-xs px-1.5 py-0.5 bg-red-100 text-red-800 rounded">High</span>
                  </div>
                  <div class="mt-2 text-xs text-gray-500">Due in 1 day</div>
                  <div class="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-red-500 rounded-full" style="width: 85%"></div>
                  </div>
                </div>
                
                <div class="rounded border p-3 bg-white">
                  <div class="flex justify-between">
                    <span class="font-medium text-sm">API Integration</span>
                    <span class="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded">Medium</span>
                  </div>
                  <div class="mt-2 text-xs text-gray-500">Due in 3 days</div>
                  <div class="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-amber-500 rounded-full" style="width: 60%"></div>
                  </div>
                </div>
                
                <div class="rounded border p-3 bg-white">
                  <div class="flex justify-between">
                    <span class="font-medium text-sm">Documentation</span>
                    <span class="text-xs px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded">Low</span>
                  </div>
                  <div class="mt-2 text-xs text-gray-500">Due in 5 days</div>
                  <div class="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-emerald-500 rounded-full" style="width: 25%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Attendance Table -->
          <div class="md:col-span-2">
            <div class="rounded-lg border bg-white">
              <div class="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
                <h3 class="font-semibold text-gray-900 flex items-center gap-2">
                  <CalendarCheck class="w-4 h-4" />
                  Recent Attendance
                </h3>
                <button class="text-xs text-amber-600 hover:text-amber-700 font-medium">
                  View Full History
                </button>
              </div>
              
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First In</th>
                      <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Out</th>
                      <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                      <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    {#each attendanceData.filter(record => record.employeeId === selectedEmployee.employeeId).slice(0, 8) as record}
                      <tr class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-sm font-medium text-gray-900">{record.date}</td>
                        <td class="px-4 py-3">
                          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {
                            record.status === 'Present' ? 'bg-emerald-100 text-emerald-800' : 
                            record.status === 'Partial' ? 'bg-amber-100 text-amber-800' : 
                            'bg-red-100 text-red-800'
                          }">
                            {record.status}
                          </span>
                        </td>
                        <td class="px-4 py-3 text-sm text-gray-900">{record.firstIn}</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{record.lastOut}</td>
                        <td class="px-4 py-3 text-sm font-medium text-gray-900">{record.totalHours}</td>
                        <td class="px-4 py-3">
                          <span class="text-sm font-medium {
                            record.netHours.startsWith('+') ? 'text-emerald-600' : 
                            record.netHours.startsWith('-') ? 'text-red-600' : 
                            'text-gray-500'
                          }">
                            {record.netHours}
                          </span>
                        </td>
                      </tr>
                    {/each}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

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
