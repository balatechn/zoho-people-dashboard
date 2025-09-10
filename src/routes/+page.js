import { sampleDashboardData, sampleEmployees } from '$lib/sampleData.js';

/** @type {import('./$types').PageLoad} */
export function load() {
  // Current date is September 9, 2025
  const currentDate = new Date(2025, 8, 9); // September 9, 2025
  
  // Update dashboard data
  const updatedData = {
    ...sampleDashboardData,
    sampleEmployees: sampleEmployees,
    kpis: {
      ...sampleDashboardData.kpis,
      totalEmployees: 35,
      presentToday: 32,
      pendingApprovals: 3,
      avgCheckin: "10:15",  // Average from all employees
      avgHours: "9.2"       // Average hours worked
    }
  };

  return updatedData;
}
