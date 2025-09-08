import { json } from "@sveltejs/kit";
import { Z as ZohoPeopleAPI } from "../../../../chunks/zohoApi.js";
async function GET({ url }) {
  try {
    const zohoApi = new ZohoPeopleAPI();
    const fromDate = url.searchParams.get("fromDate") || null;
    const toDate = url.searchParams.get("toDate") || null;
    const employeeId = url.searchParams.get("employeeId") || null;
    const timetracker = await zohoApi.getTimeTrackerData(fromDate, toDate, employeeId);
    return json({
      success: true,
      data: timetracker,
      fromDate,
      toDate,
      employeeId
    });
  } catch (error) {
    console.error("Error fetching timetracker data:", error);
    return json({
      success: false,
      error: "Failed to fetch timetracker data",
      message: error instanceof Error ? error.message : "Unknown error occurred"
    }, { status: 500 });
  }
}
export {
  GET
};
