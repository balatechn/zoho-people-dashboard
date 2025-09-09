import { sampleDashboardData } from '$lib/sampleData.js';

/** @type {import('./$types').PageData} */
export function load() {
  // Current date is September 9, 2025
  
  // Update dashboard data with attendance from today's date (September 9, 2025)
  const updatedData = {
    ...sampleDashboardData,
    kpis: {
      ...sampleDashboardData.kpis,
      totalEmployees: 35,
      presentToday: 32,
      pendingApprovals: 3,
      avgCheckin: "10:15"  // Average from all employees
    },
    // Update attendance data based on attachment screenshot
    tables: {
      ...sampleDashboardData.tables,
      todayAttendance: [
        { name: "Salman Khan", dept: "Management", location: "Head Office", status: "Present", time: "11:47 - 22:34", hours: "10h 47m" },
        { name: "Mohammed Farooq", dept: "Management", location: "Head Office", status: "Present", time: "10:16 - 21:01", hours: "10h 45m" },
        { name: "Yahya Ayash Luqman", dept: "Software Development", location: "Head Office", status: "Present", time: "10:37 - 19:30", hours: "8h 53m" },
        { name: "Shruthi Nandeesh", dept: "HR", location: "Head Office", status: "Present", time: "10:22 - 19:05", hours: "8h 43m" },
        { name: "Adityaa Nagarajan", dept: "Software Development", location: "Head Office", status: "Present", time: "09:56 - 19:14", hours: "9h 18m" },
        { name: "Harshdeep Singh", dept: "Marketing", location: "Head Office", status: "Present", time: "09:43 - 18:43", hours: "9h 00m" },
        { name: "Balasubramanian Pillai", dept: "IT", location: "Head Office", status: "Present", time: "08:51 - 20:34", hours: "11h 43m" },
        { name: "Deepanshi Mamgain", dept: "Software Development", location: "Head Office", status: "Present", time: "11:18 - 19:32", hours: "8h 22m" }
      ]
    },
    charts: {
      ...sampleDashboardData.charts,
      // Update attendance split with current numbers from attachment
      attendanceSplit: [
        { name: "Present", value: 32, color: "#0ea5e9" },  // 32 employees present
        { name: "WFH", value: 0, color: "#22c55e" },       // No work from home
        { name: "Leave", value: 3, color: "#f59e0b" },     // 3 pending approvals/leaves
        { name: "OD", value: 0, color: "#6366f1" },        // No on-duty
        { name: "Absent", value: 0, color: "#ef4444" }     // No absents
      ]
    }
  };

  return updatedData;
}
