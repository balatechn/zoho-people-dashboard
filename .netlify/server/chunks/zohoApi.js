import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
class ZohoPeopleAPI {
  constructor() {
    this.baseURL = process.env.ZOHO_PEOPLE_API_URL || "https://people.zoho.com/people/api";
    this.accessToken = process.env.ZOHO_ACCESS_TOKEN;
    this.refreshToken = process.env.ZOHO_REFRESH_TOKEN;
    this.clientId = process.env.ZOHO_CLIENT_ID;
    this.clientSecret = process.env.ZOHO_CLIENT_SECRET;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Authorization": `Zoho-oauthtoken ${this.accessToken}`,
        "Content-Type": "application/json"
      }
    });
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          await this.refreshAccessToken();
          error.config.headers["Authorization"] = `Zoho-oauthtoken ${this.accessToken}`;
          return this.client.request(error.config);
        }
        return Promise.reject(error);
      }
    );
  }
  async refreshAccessToken() {
    try {
      const response = await axios.post("https://accounts.zoho.com/oauth/v2/token", {
        refresh_token: this.refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: "refresh_token"
      });
      this.accessToken = response.data.access_token;
      this.client.defaults.headers["Authorization"] = `Zoho-oauthtoken ${this.accessToken}`;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw new Error("Failed to refresh access token");
    }
  }
  // ZOHOPEOPLE.employee.ALL
  async getAllEmployees() {
    try {
      const response = await this.client.get("/employee");
      return response.data;
    } catch (error) {
      console.error("Error fetching all employees:", error);
      throw error;
    }
  }
  // ZOHOPEOPLE.employee.READ
  async getEmployee(employeeId) {
    try {
      const response = await this.client.get(`/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee ${employeeId}:`, error);
      throw error;
    }
  }
  // ZOHOPEOPLE.leave.READ
  async getLeaveRecords(employeeId = null, fromDate = null, toDate = null) {
    try {
      let url = "/leave";
      const params = new URLSearchParams();
      if (employeeId) params.append("employeeId", employeeId);
      if (fromDate) params.append("fromDate", fromDate);
      if (toDate) params.append("toDate", toDate);
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching leave records:", error);
      throw error;
    }
  }
  // ZOHOPEOPLE.offboarding.ALL
  async getOffboardingData() {
    try {
      const response = await this.client.get("/offboarding");
      return response.data;
    } catch (error) {
      console.error("Error fetching offboarding data:", error);
      throw error;
    }
  }
  // ZOHOPEOPLE.onboarding.ALL
  async getOnboardingData() {
    try {
      const response = await this.client.get("/onboarding");
      return response.data;
    } catch (error) {
      console.error("Error fetching onboarding data:", error);
      throw error;
    }
  }
  // ZOHOPEOPLE.organization.READ
  async getOrganizationData() {
    try {
      const response = await this.client.get("/organization");
      return response.data;
    } catch (error) {
      console.error("Error fetching organization data:", error);
      throw error;
    }
  }
  // ZOHOPEOPLE.timetracker.all
  async getTimeTrackerData(fromDate = null, toDate = null, employeeId = null) {
    try {
      let url = "/timetracker";
      const params = new URLSearchParams();
      if (fromDate) params.append("fromDate", fromDate);
      if (toDate) params.append("toDate", toDate);
      if (employeeId) params.append("employeeId", employeeId);
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching timetracker data:", error);
      throw error;
    }
  }
  // zohopeople.attendance.READ
  async getAttendance(fromDate = null, toDate = null, employeeId = null) {
    try {
      let url = "/attendance";
      const params = new URLSearchParams();
      if (fromDate) params.append("fromDate", fromDate);
      if (toDate) params.append("toDate", toDate);
      if (employeeId) params.append("employeeId", employeeId);
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      const response = await this.client.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      throw error;
    }
  }
  // Helper method to get dashboard summary
  async getDashboardSummary() {
    try {
      const [employees, attendance, organization] = await Promise.all([
        this.getAllEmployees(),
        this.getAttendance(),
        this.getOrganizationData()
      ]);
      return {
        employees,
        attendance,
        organization,
        totalEmployees: employees?.length || 0,
        presentToday: attendance?.filter((a) => a.status === "Present")?.length || 0
      };
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      throw error;
    }
  }
}
export {
  ZohoPeopleAPI as Z
};
