const sampleDashboardData = {
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
      { day: "Sun", checkins: 3, checkouts: 2 }
    ],
    attendanceSplit: [
      { name: "Present", value: 28, color: "#0ea5e9" },
      { name: "WFH", value: 4, color: "#22c55e" },
      { name: "Leave", value: 2, color: "#f59e0b" },
      { name: "OD", value: 1, color: "#6366f1" },
      { name: "Absent", value: 0, color: "#ef4444" }
    ],
    regularizationData: [
      { date: "Sep 01", count: 2 },
      { date: "Sep 02", count: 1 },
      { date: "Sep 03", count: 3 },
      { date: "Sep 04", count: 2 },
      { date: "Sep 05", count: 1 },
      { date: "Sep 06", count: 2 },
      { date: "Sep 07", count: 1 }
    ]
  },
  tables: {
    todayAttendance: [
      { name: "Balasubramanian Pillai", dept: "IT", location: "Head Office", status: "Present", time: "09:18" },
      { name: "Mohammed Farooq", dept: "Management", location: "Head Office", status: "WFH", time: "09:05" },
      { name: "Prasanna Hegde", dept: "Accounts", location: "Head Office", status: "Present", time: "09:24" },
      { name: "Ashwin K", dept: "Software Development", location: "Head Office", status: "Leave", time: "-" },
      { name: "Mamatha K", dept: "HR", location: "Head Office", status: "Present", time: "08:59" }
    ],
    pendingApprovals: [
      { id: "RG-1042", type: "Regularization", by: "Prasanna H", for: "Sep 06 • 09:20", age: "1d" },
      { id: "LV-2218", type: "Leave", by: "Ashwin K", for: "Sep 09-10 • Casual", age: "2d" },
      { id: "WF-0081", type: "WFH", by: "Mohammed F", for: "Sep 08 • Full Day", age: "1d" }
    ]
  }
};
async function load() {
  try {
    console.log("Loading dashboard with sample data...");
    return {
      ...sampleDashboardData,
      rawData: {
        employees: [],
        attendance: [],
        organization: {}
      },
      apiStatus: "Using sample data - Configure Zoho API credentials in .env to fetch real data"
    };
  } catch (error) {
    console.error("Error loading dashboard data:", error);
    return {
      ...sampleDashboardData,
      rawData: {
        employees: [],
        attendance: [],
        organization: {}
      },
      error: error instanceof Error ? error.message : "Unknown error occurred",
      apiStatus: "Error occurred - Using sample data"
    };
  }
}
export {
  load
};
