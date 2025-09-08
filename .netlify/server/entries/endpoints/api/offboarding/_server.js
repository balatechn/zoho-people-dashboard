import { json } from "@sveltejs/kit";
import { Z as ZohoPeopleAPI } from "../../../../chunks/zohoApi.js";
async function GET() {
  try {
    const zohoApi = new ZohoPeopleAPI();
    const offboarding = await zohoApi.getOffboardingData();
    return json({
      success: true,
      data: offboarding
    });
  } catch (error) {
    console.error("Error fetching offboarding data:", error);
    return json({
      success: false,
      error: "Failed to fetch offboarding data",
      message: error.message
    }, { status: 500 });
  }
}
export {
  GET
};
