/**
 * Excel File Uploader Utility for Zoho People Dashboard
 * This utility provides functions to read and process Excel files
 */
import * as XLSX from 'xlsx';
import { parseAttendanceFromExcel, validateAttendanceData } from './excelImporter';

/**
 * Reads an Excel file and returns the parsed data
 * @param {File} file - The Excel file object
 * @returns {Promise} - Resolves to the parsed data
 */
export async function readExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Convert to array of arrays
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        resolve(sheetData);
      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error.message}`));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Processes an attendance Excel file
 * @param {File} file - The Excel file object
 * @returns {Promise} - Resolves to the processed attendance data
 */
export async function processAttendanceExcel(file) {
  try {
    const sheetData = await readExcelFile(file);
    
    // Parse attendance data
    const attendanceData = parseAttendanceFromExcel(sheetData, {
      skipHeader: true,
      dateFormat: 'DD-MMM-YYYY'
    });
    
    // Validate the data
    const validation = validateAttendanceData(attendanceData);
    
    return {
      success: validation.valid,
      data: attendanceData,
      validation,
      fileName: file.name,
      fileSize: file.size
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      fileName: file.name,
      fileSize: file.size
    };
  }
}

/**
 * Uploads attendance data to the API
 * @param {Array} attendanceData - The processed attendance data
 * @returns {Promise} - Resolves to the API response
 */
export async function uploadAttendanceData(attendanceData) {
  try {
    const response = await fetch('/api/attendance/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ records: attendanceData })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to upload data: ${error.message}`);
  }
}

/**
 * Creates a mock upload function for testing
 * @param {Array} attendanceData - The processed attendance data
 * @returns {Promise} - Resolves to a mock response
 */
export async function mockUploadAttendance(attendanceData) {
  return new Promise((resolve) => {
    // Simulate API call delay
    setTimeout(() => {
      resolve({
        success: true,
        message: `Successfully processed ${attendanceData.length} attendance records`,
        recordCount: attendanceData.length
      });
    }, 1500);
  });
}
