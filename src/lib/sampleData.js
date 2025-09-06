// Sample data for development and testing

export const sampleEmployees = [
  {
    id: "EMP001",
    name: "Anita Desai",
    department: "HR",
    location: "Bengaluru",
    position: "HR Manager",
    email: "anita.desai@company.com",
    joiningDate: "2020-03-15",
    status: "Active"
  },
  {
    id: "EMP002",
    name: "Vishal Singh",
    department: "Finance",
    location: "Mumbai",
    position: "Finance Analyst",
    email: "vishal.singh@company.com",
    joiningDate: "2021-07-01",
    status: "Active"
  },
  {
    id: "EMP003",
    name: "Harini V",
    department: "Sales",
    location: "Bengaluru",
    position: "Sales Executive",
    email: "harini.v@company.com",
    joiningDate: "2019-11-20",
    status: "Active"
  },
  {
    id: "EMP004",
    name: "Rohit Jain",
    department: "Projects",
    location: "Mangaluru",
    position: "Project Manager",
    email: "rohit.jain@company.com",
    joiningDate: "2018-05-10",
    status: "Active"
  },
  {
    id: "EMP005",
    name: "Farheen K",
    department: "IT",
    location: "Bengaluru",
    position: "Software Developer",
    email: "farheen.k@company.com",
    joiningDate: "2022-01-12",
    status: "Active"
  }
];

export const sampleAttendance = [
  {
    employeeId: "EMP001",
    date: "2025-09-06",
    checkIn: "09:18",
    checkOut: "18:30",
    status: "Present",
    workingHours: "8h 42m"
  },
  {
    employeeId: "EMP002",
    date: "2025-09-06",
    checkIn: "09:05",
    checkOut: "17:45",
    status: "WFH",
    workingHours: "8h 40m"
  },
  {
    employeeId: "EMP003",
    date: "2025-09-06",
    checkIn: "09:24",
    checkOut: "18:15",
    status: "Present",
    workingHours: "8h 51m"
  },
  {
    employeeId: "EMP004",
    date: "2025-09-06",
    checkIn: null,
    checkOut: null,
    status: "Leave",
    workingHours: "0h"
  },
  {
    employeeId: "EMP005",
    date: "2025-09-06",
    checkIn: "08:59",
    checkOut: "18:00",
    status: "Present",
    workingHours: "9h 1m"
  }
];

export const sampleLeaveRecords = [
  {
    id: "LV-2218",
    employeeId: "EMP004",
    leaveType: "Casual Leave",
    fromDate: "2025-09-06",
    toDate: "2025-09-06",
    days: 1,
    reason: "Personal work",
    status: "Approved",
    appliedDate: "2025-09-04"
  },
  {
    id: "LV-2219",
    employeeId: "EMP002",
    leaveType: "Sick Leave",
    fromDate: "2025-09-10",
    toDate: "2025-09-11",
    days: 2,
    reason: "Medical checkup",
    status: "Pending",
    appliedDate: "2025-09-05"
  }
];

export const sampleOrganization = {
  name: "National Group",
  totalEmployees: 177,
  departments: [
    { name: "IT", count: 45 },
    { name: "HR", count: 12 },
    { name: "Sales", count: 38 },
    { name: "Finance", count: 15 },
    { name: "Projects", count: 35 },
    { name: "Marketing", count: 22 },
    { name: "Operations", count: 10 }
  ],
  locations: [
    { name: "Bengaluru", count: 95 },
    { name: "Mumbai", count: 45 },
    { name: "Mangaluru", count: 25 },
    { name: "Delhi", count: 12 }
  ]
};

export const sampleTimeTracker = [
  {
    employeeId: "EMP001",
    date: "2025-09-06",
    projectName: "Dashboard Development",
    hoursWorked: 8.5,
    description: "Working on Zoho People dashboard UI"
  },
  {
    employeeId: "EMP002",
    date: "2025-09-06",
    projectName: "Financial Analysis",
    hoursWorked: 8.0,
    description: "Monthly financial report preparation"
  }
];

export const sampleDashboardData = {
  kpis: {
    totalEmployees: 177,
    presentToday: 146,
    pendingApprovals: 18,
    avgCheckin: "09:21"
  },
  charts: {
    trendData: [
      { day: "Mon", checkins: 82, checkouts: 79 },
      { day: "Tue", checkins: 96, checkouts: 92 },
      { day: "Wed", checkins: 101, checkouts: 98 },
      { day: "Thu", checkins: 88, checkouts: 85 },
      { day: "Fri", checkins: 110, checkouts: 104 },
      { day: "Sat", checkins: 37, checkouts: 36 },
      { day: "Sun", checkins: 12, checkouts: 10 },
    ],
    attendanceSplit: [
      { name: "Present", value: 124, color: "#0ea5e9" },
      { name: "WFH", value: 22, color: "#22c55e" },
      { name: "Leave", value: 15, color: "#f59e0b" },
      { name: "OD", value: 7, color: "#6366f1" },
      { name: "Absent", value: 9, color: "#ef4444" },
    ],
    regularizationData: [
      { date: "Aug 29", count: 8 },
      { date: "Aug 30", count: 6 },
      { date: "Aug 31", count: 4 },
      { date: "Sep 01", count: 12 },
      { date: "Sep 02", count: 10 },
      { date: "Sep 03", count: 7 },
      { date: "Sep 04", count: 9 },
    ]
  },
  tables: {
    todayAttendance: [
      { name: "Anita Desai", dept: "HR", location: "Bengaluru", status: "Present", time: "09:18" },
      { name: "Vishal Singh", dept: "Finance", location: "Mumbai", status: "WFH", time: "09:05" },
      { name: "Harini V", dept: "Sales", location: "Bengaluru", status: "Present", time: "09:24" },
      { name: "Rohit Jain", dept: "Projects", location: "Mangaluru", status: "Leave", time: "-" },
      { name: "Farheen K", dept: "IT", location: "Bengaluru", status: "Present", time: "08:59" },
    ],
    pendingApprovals: [
      { id: "RG-1042", type: "Regularization", by: "Karthik P", for: "Sep 03 • 09:20", age: "2d" },
      { id: "LV-2218", type: "Leave", by: "Shwetha S", for: "Sep 09-10 • Casual", age: "1d" },
      { id: "WF-0081", type: "WFH", by: "Jason C", for: "Sep 06 • Full Day", age: "3h" },
    ]
  }
};
