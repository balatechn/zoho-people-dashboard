import { s as sampleDashboardData } from "../../chunks/sampleData.js";
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
