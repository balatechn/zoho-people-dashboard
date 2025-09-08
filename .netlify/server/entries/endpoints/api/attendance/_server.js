import { json } from "@sveltejs/kit";
import { Z as ZohoPeopleAPI } from "../../../../chunks/zohoApi.js";
async function GET({ url }) {
  try {
    const zohoApi = new ZohoPeopleAPI();
    const fromDate = url.searchParams.get("fromDate") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const toDate = url.searchParams.get("toDate") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const attendance = await zohoApi.getAttendance(fromDate, toDate);
    return json({
      success: true,
      data: attendance,
      fromDate,
      toDate
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return json({
      success: false,
      error: "Failed to fetch attendance data",
      message: error.message
    }, { status: 500 });
  }
}
export {
  GET
};
