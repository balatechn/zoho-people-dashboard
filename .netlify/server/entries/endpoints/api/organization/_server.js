import { json } from "@sveltejs/kit";
import { Z as ZohoPeopleAPI } from "../../../../chunks/zohoApi.js";
async function GET() {
  try {
    const zohoApi = new ZohoPeopleAPI();
    const organization = await zohoApi.getOrganizationData();
    return json({
      success: true,
      data: organization
    });
  } catch (error) {
    console.error("Error fetching organization data:", error);
    return json({
      success: false,
      error: "Failed to fetch organization data",
      message: error.message
    }, { status: 500 });
  }
}
export {
  GET
};
