import { json } from "@sveltejs/kit";
async function POST({ request }) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof File)) {
      return json({
        success: false,
        message: "No file uploaded or invalid file",
        recordsProcessed: 0
      }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return json({
        success: false,
        message: "File size exceeds 10MB limit",
        recordsProcessed: 0
      }, { status: 400 });
    }
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];
    if (!allowedTypes.includes(file.type) && !file.name.endsWith(".csv") && !file.name.endsWith(".xlsx")) {
      return json({
        success: false,
        message: "Invalid file type. Please upload CSV or Excel files only.",
        recordsProcessed: 0
      }, { status: 400 });
    }
    const fileContent = await file.text();
    const lines = fileContent.split("\n");
    if (lines.length < 2) {
      return json({
        success: false,
        message: "File appears to be empty or has no data rows",
        recordsProcessed: 0
      }, { status: 400 });
    }
    const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim());
    const requiredHeaders = [
      "Employee Number",
      "First Name",
      "Last Name",
      "Work Email",
      "Department",
      "Designation",
      "Employee Status"
    ];
    const missingHeaders = requiredHeaders.filter(
      (required) => !headers.some((header) => header.toLowerCase().includes(required.toLowerCase()))
    );
    if (missingHeaders.length > 0) {
      return json({
        success: false,
        message: `Missing required columns: ${missingHeaders.join(", ")}`,
        recordsProcessed: 0
      }, { status: 400 });
    }
    const employees = [];
    let validRows = 0;
    let errors = [];
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      try {
        const values = lines[i].split(",").map((v) => v.replace(/"/g, "").trim());
        if (values.length < headers.length - 5) {
          errors.push(`Row ${i + 1}: Column count mismatch`);
          continue;
        }
        const employee = {};
        headers.forEach((header, index) => {
          if (values[index] !== void 0) {
            employee[header] = values[index];
          }
        });
        const empNumber = employee["Employee Number"] || "";
        const firstName = employee["First Name"] || "";
        const workEmail = employee["Work Email"] || "";
        const department = employee["Department"] || "";
        if (!empNumber || !firstName || !workEmail) {
          errors.push(`Row ${i + 1}: Missing required fields (Employee Number, First Name, or Work Email)`);
          continue;
        }
        employees.push({
          employeeNumber: empNumber,
          firstName,
          middleName: employee["Middle Name"] || "",
          lastName: employee["Last Name"] || "",
          gender: employee["Gender"] || "",
          dateOfJoining: employee["Date of Joining"] || "",
          designation: employee["Designation"] || "",
          workEmail,
          department,
          workLocation: employee["Worklocation Name"] || "Head Office",
          employeeStatus: employee["Employee Status"] || "Active",
          personalEmail: employee["Personal Email"] || "",
          mobileNumber: employee["Mobile Number"] || "",
          dateOfBirth: employee["Date of Birth"] || "",
          fatherName: employee["Father Name"] || "",
          panNumber: employee["PAN Number"] || "",
          // Additional fields from your format
          workLocationAddress1: employee["Worklocation AddressLine1"] || "",
          workLocationAddress2: employee["Worklocation AddressLine2"] || "",
          workLocationCity: employee["Worklocation City"] || "",
          workLocationState: employee["Worklocation StateCode"] || "",
          workLocationCountry: employee["Worklocation Country"] || "",
          workLocationPostalCode: employee["Worklocation PostalCode"] || "",
          enablePortal: employee["Enable Portal"] || "",
          personalAddress1: employee["Personal AddressLine1"] || "",
          personalAddress2: employee["Personal AddressLine2"] || "",
          personalCity: employee["Personal City"] || "",
          personalState: employee["Personal StateCode"] || "",
          personalPostalCode: employee["Personal PostalCode"] || "",
          personalCountry: employee["Personal Country"] || "",
          differentlyAbledType: employee["Differently Abled Type"] || ""
        });
        validRows++;
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
    if (validRows === 0) {
      return json({
        success: false,
        message: `No valid employee records found. Errors: ${errors.slice(0, 5).join("; ")}${errors.length > 5 ? "..." : ""}`,
        recordsProcessed: 0
      }, { status: 400 });
    }
    console.log(`Processed ${validRows} employee records:`, employees);
    await new Promise((resolve) => setTimeout(resolve, 1e3));
    return json({
      success: true,
      message: `Successfully processed ${validRows} employee records${errors.length > 0 ? ` (${errors.length} errors skipped)` : ""}`,
      recordsProcessed: validRows,
      errors: errors.length > 0 ? errors.slice(0, 10) : void 0
      // Return first 10 errors
    });
  } catch (error) {
    console.error("Employee upload error:", error);
    return json({
      success: false,
      message: `Upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      recordsProcessed: 0
    }, { status: 500 });
  }
}
export {
  POST
};
