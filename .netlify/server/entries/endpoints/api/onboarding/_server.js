import { json } from "@sveltejs/kit";
import { Z as ZohoPeopleAPI } from "../../../../chunks/zohoApi.js";
async function GET() {
  try {
    const zohoApi = new ZohoPeopleAPI();
    const onboarding = await zohoApi.getOnboardingData();
    return json({
      success: true,
      data: onboarding
    });
  } catch (error) {
    console.error("Error fetching onboarding data:", error);
    return json({
      success: false,
      error: "Failed to fetch onboarding data",
      message: error.message
    }, { status: 500 });
  }
}
export {
  GET
};
