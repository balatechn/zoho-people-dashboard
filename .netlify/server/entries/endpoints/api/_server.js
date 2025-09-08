import { json } from "@sveltejs/kit";
async function GET() {
  return json({
    success: true,
    message: "Zoho People Dashboard API is running!",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    endpoints: [
      "/api/employees",
      "/api/attendance",
      "/api/leave",
      "/api/onboarding",
      "/api/offboarding",
      "/api/organization",
      "/api/timetracker",
      "/api/dashboard"
    ]
  });
}
export {
  GET
};
