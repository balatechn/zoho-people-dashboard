// demoAutoUpload.js
import { processAttendanceExcel } from './excelUploader.js';

/**
 * Create a demo function for attendance upload
 */
export async function demoAutoUpload() {
  try {
    console.log("Starting automatic attendance data upload...");
    
    // Set the file path to the attendance Excel file
    const filePath = "D:/DATA/Zoho People Dashboard/1data/Attend.xlsx";
    
    console.log(`Reading file from: ${filePath}`);
    
    // Process the Excel file
    const result = await processAttendanceExcel(filePath);
    
    if (result.success && result.data) {
      console.log(`Successfully processed ${result.data.length} attendance records`);
      console.log("Sample data:", result.data.slice(0, 2));
      
      // Here you would typically save the data to your store or database
      return {
        success: true,
        message: `Successfully processed ${result.data.length} attendance records`,
        data: result.data
      };
    } else {
      console.error("Failed to process attendance data:", result.errors);
      return {
        success: false,
        message: "Failed to process attendance data",
        errors: result.errors
      };
    }
  } catch (error) {
    console.error("Error in demo auto upload:", error);
    return {
      success: false,
      message: "Error in automatic upload",
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
