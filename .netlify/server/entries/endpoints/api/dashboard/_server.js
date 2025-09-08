import { json } from "@sveltejs/kit";
import { Z as ZohoPeopleAPI } from "../../../../chunks/zohoApi.js";
async function GET() {
  try {
    const zohoApi = new ZohoPeopleAPI();
    const summary = await zohoApi.getDashboardSummary();
    return json({
      success: true,
      data: summary,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    return json({
      success: false,
      error: "Failed to fetch dashboard data",
      message: error.message,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    }, { status: 500 });
  }
}
export {
  GET
};
