import { redirect } from "@sveltejs/kit";
async function load({ url, fetch }) {
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  if (error) {
    throw redirect(302, `/settings?error=${encodeURIComponent(error)}`);
  }
  if (!code) {
    throw redirect(302, "/settings?error=No authorization code received");
  }
  try {
    const tokenResponse = await fetch("/api/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });
    const result = await tokenResponse.json();
    if (result.success) {
      throw redirect(302, "/settings?success=Authorization completed successfully");
    } else {
      throw redirect(302, `/settings?error=${encodeURIComponent(result.message)}`);
    }
  } catch (error2) {
    console.error("OAuth callback error:", error2);
    throw redirect(302, `/settings?error=${encodeURIComponent("Failed to complete authorization")}`);
  }
}
export {
  load
};
