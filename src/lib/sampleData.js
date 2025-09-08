// Sample data based on National Consulting India employee structure

export const sampleEmployees = [
  {
    id: "NCPL019",
    name: "Balasubramanian Pillai",
    department: "IT",
    location: "Head Office",
    position: "Manager IT",
    email: "bala@nationalconsultingindia.com",
    joiningDate: "2025-03-03",
    status: "Active"
  },
  {
    id: "NCPL001",
    name: "Mohammed Farooq",
    department: "Management",
    location: "Head Office",
    position: "EA - Director",
    email: "farooq@nationalconsultingindia.com",
    joiningDate: "2024-01-22",
    status: "Active"
  },
  {
    id: "NCPL017",
    name: "Prasanna Hegde",
    department: "Accounts",
    location: "Head Office",
    position: "Accounts Executive",
    email: "prasanna.h@nationalconsultingindia.com",
    joiningDate: "2025-02-10",
    status: "Active"
  },
  {
    id: "NCPL024",
    name: "Ashwin K",
    department: "Software Development",
    location: "Head Office",
    position: "Software Developer",
    email: "ashwin.k@nationalconsultingindia.com",
    joiningDate: "2025-04-07",
    status: "Active"
  },
  {
    id: "NCPL002",
    name: "Mamatha K",
    department: "HR",
    location: "Head Office",
    position: "HR Executive",
    email: "mamatha.k@nationalconsultingindia.com",
    joiningDate: "2024-01-22",
    status: "Active"
  }
];

export const sampleAttendance = [
  {
    employeeId: "NCPL019",
    date: "2025-09-07",
    checkIn: "09:18",
    checkOut: "18:30",
    status: "Present",
    workingHours: "8h 42m"
  },
  {
    employeeId: "NCPL001",
    date: "2025-09-07",
    checkIn: "09:05",
    checkOut: "17:45",
    status: "WFH",
    workingHours: "8h 40m"
  },
  {
    employeeId: "NCPL017",
    date: "2025-09-07",
    checkIn: "09:24",
    checkOut: "18:15",
    status: "Present",
    workingHours: "8h 51m"
  },
  {
    employeeId: "NCPL024",
    date: "2025-09-07",
    checkIn: null,
    checkOut: null,
    status: "Leave",
    workingHours: "0h"
  },
  {
    employeeId: "NCPL002",
    date: "2025-09-07",
    checkIn: "08:59",
    checkOut: "18:00",
    status: "Present",
    workingHours: "9h 1m"
  }
];

export const sampleLeaveRecords = [
  {
    id: "LV-2218",
    employeeId: "NCPL024",
    leaveType: "Casual Leave",
    fromDate: "2025-09-07",
    toDate: "2025-09-07",
    days: 1,
    reason: "Personal work",
    status: "Approved",
    appliedDate: "2025-09-05"
  },
  {
    id: "LV-2219",
    employeeId: "NCPL001",
    leaveType: "Sick Leave",
    fromDate: "2025-09-10",
    toDate: "2025-09-11",
    days: 2,
    reason: "Medical checkup",
    status: "Pending",
    appliedDate: "2025-09-06"
  }
];

export const sampleOrganization = {
  name: "National Consulting India",
  totalEmployees: 35,
  departments: [
    { name: "IT", count: 9 },
    { name: "Management", count: 6 },
    { name: "Accounts", count: 4 },
    { name: "Software Development", count: 3 },
    { name: "HR", count: 2 },
    { name: "Marketing", count: 7 },
    { name: "Legal", count: 1 },
    { name: "Real estate", count: 2 },
    { name: "Business Development", count: 2 },
    { name: "iSky", count: 1 },
    { name: "Admin", count: 1 }
  ],
  locations: [
    { name: "Head Office", count: 35 }
  ]
};

export const sampleTimeTracker = [
  {
    employeeId: "NCPL019",
    date: "2025-09-07",
    projectName: "Dashboard Development",
    hoursWorked: 8.5,
    description: "Working on Zoho People dashboard UI"
  },
  {
    employeeId: "NCPL017",
    date: "2025-09-07",
    projectName: "Financial Analysis",
    hoursWorked: 8.0,
    description: "Monthly financial report preparation"
  }
];

export const sampleDashboardData = {
  kpis: {
    totalEmployees: 35,
    presentToday: 28,
    pendingApprovals: 5,
    avgCheckin: "09:15"
  },
  charts: {
    trendData: [
      { day: "Mon", checkins: 32, checkouts: 30 },
      { day: "Tue", checkins: 34, checkouts: 33 },
      { day: "Wed", checkins: 35, checkouts: 34 },
      { day: "Thu", checkins: 31, checkouts: 29 },
      { day: "Fri", checkins: 33, checkouts: 32 },
      { day: "Sat", checkins: 8, checkouts: 7 },
      { day: "Sun", checkins: 3, checkouts: 2 },
    ],
    attendanceSplit: [
      { name: "Present", value: 28, color: "#0ea5e9" },
      { name: "WFH", value: 4, color: "#22c55e" },
      { name: "Leave", value: 2, color: "#f59e0b" },
      { name: "OD", value: 1, color: "#6366f1" },
      { name: "Absent", value: 0, color: "#ef4444" },
    ],
    regularizationData: [
      { date: "Sep 01", count: 2 },
      { date: "Sep 02", count: 1 },
      { date: "Sep 03", count: 3 },
      { date: "Sep 04", count: 2 },
      { date: "Sep 05", count: 1 },
      { date: "Sep 06", count: 2 },
      { date: "Sep 07", count: 1 },
    ]
  },
  tables: {
    todayAttendance: [
      { name: "Balasubramanian Pillai", dept: "IT", location: "Head Office", status: "Present", time: "09:18" },
      { name: "Mohammed Farooq", dept: "Management", location: "Head Office", status: "WFH", time: "09:05" },
      { name: "Prasanna Hegde", dept: "Accounts", location: "Head Office", status: "Present", time: "09:24" },
      { name: "Ashwin K", dept: "Software Development", location: "Head Office", status: "Leave", time: "-" },
      { name: "Mamatha K", dept: "HR", location: "Head Office", status: "Present", time: "08:59" },
    ],
    pendingApprovals: [
      { id: "RG-1042", type: "Regularization", by: "Prasanna H", for: "Sep 06 • 09:20", age: "1d" },
      { id: "LV-2218", type: "Leave", by: "Ashwin K", for: "Sep 09-10 • Casual", age: "2d" },
      { id: "WF-0081", type: "WFH", by: "Mohammed F", for: "Sep 08 • Full Day", age: "1d" },
    ]
  }
};
