/**
 * Excel Importer Utility for Zoho People Dashboard
 * 
 * This utility provides functions to parse Excel/CSV data and convert it to the format
 * expected by the application for attendance records.
 */

/**
 * Parses attendance data from CSV/Excel format and converts to application format
 * 
 * @param {Array} excelData - Array of rows from Excel/CSV file
 * @param {Object} options - Configuration options
 * @returns {Array} Formatted attendance records
 */
export function parseAttendanceFromExcel(excelData, options = {}) {
  const {
    skipHeader = true,
    dateFormat = 'DD-MMM-YYYY' // Default format like '08-Sep-2025'
  } = options;
  
  // Skip header row if specified
  const dataRows = skipHeader ? excelData.slice(1) : excelData;
  
  return dataRows.map(row => {
    // Map columns to object properties
    // Adjust indexes based on your Excel column order
    const dateValue = row[0];
    const employeeId = row[1];
    const employeeName = row[2];
    const emailId = row[3];
    const firstIn = row[4];
    const lastOut = row[5];
    const totalHours = row[6];
    const earlyEntry = row[7];
    const lateEntry = row[8];
    const earlyExit = row[9];
    const lateExit = row[10];
    const netHours = row[11];
    const shiftName = row[12];
    
    // Calculate decimal hours from HH:MM format
    const totalHoursDecimal = calculateDecimalHours(totalHours);
    
    // Determine status based on check-in/check-out
    let status = 'Present';
    if (lastOut === '-' || !lastOut) {
      status = 'Partial';
    }
    
    // Get employee details from the application's employee database
    const employeeDetails = getEmployeeDetails(employeeId);
    
    // Build attendance record object
    return {
      employeeId,
      employeeName,
      emailId,
      department: employeeDetails?.department || '',
      designation: employeeDetails?.designation || '',
      location: employeeDetails?.location || 'Head Office',
      role: employeeDetails?.role || 'Team member',
      date: dateValue,
      firstIn,
      lastOut,
      totalHours,
      totalHoursDecimal,
      earlyEntry,
      lateEntry,
      earlyExit,
      lateExit,
      netHours,
      shiftName,
      status
    };
  }).filter(record => record.employeeId && record.date); // Filter out invalid records
}

/**
 * Calculates decimal hours from HH:MM format
 * 
 * @param {string} timeString - Time in HH:MM format
 * @returns {number} Hours in decimal format
 */
function calculateDecimalHours(timeString) {
  if (!timeString || timeString === '-') return 0;
  
  const parts = timeString.split(':');
  if (parts.length !== 2) return 0;
  
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  
  return hours + (minutes / 60);
}

/**
 * Gets employee details from the application's employee database
 * This is a stub function that should be implemented to retrieve 
 * actual employee details from your database
 * 
 * @param {string} employeeId - Employee ID
 * @returns {Object} Employee details
 */
function getEmployeeDetails(employeeId) {
  // In a real implementation, this would fetch data from your employee database
  // This is a placeholder implementation
  return {
    department: '',
    designation: '',
    location: 'Head Office',
    role: 'Team member'
  };
}

/**
 * Converts attendance data to CSV format for download
 * 
 * @param {Array} attendanceData - Array of attendance records
 * @returns {string} CSV content
 */
export function exportAttendanceToCsv(attendanceData) {
  const headers = [
    'Date', 'Employee Id', 'Employee Name', 'Email ID', 'First In', 
    'Last Out', 'Total Hours', 'Early Entry', 'Late Entry', 
    'Early Exit', 'Late Exit', 'Net hours', 'Shift name'
  ];
  
  const rows = attendanceData.map(record => [
    record.date,
    record.employeeId,
    record.employeeName,
    record.emailId,
    record.firstIn,
    record.lastOut,
    record.totalHours,
    record.earlyEntry,
    record.lateEntry,
    record.earlyExit,
    record.lateExit,
    record.netHours,
    record.shiftName
  ]);
  
  return [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell || ''}"`).join(','))
  ].join('\n');
}

/**
 * Parses CSV content into array of rows/columns
 * 
 * @param {string} csvContent - CSV file content
 * @returns {Array} Parsed rows and columns
 */
export function parseCsvContent(csvContent) {
  return csvContent
    .split('\n')
    .map(line => line.split(',')
      .map(cell => cell.replace(/^"(.*)"$/, '$1').trim())
    );
}

/**
 * Validates attendance data format
 * 
 * @param {Array} data - Array of attendance records
 * @returns {Object} Validation result with errors if any
 */
export function validateAttendanceData(data) {
  const errors = [];
  
  if (!Array.isArray(data) || data.length === 0) {
    errors.push('No data found or invalid data format');
    return { valid: false, errors };
  }
  
  // Validate required fields in each record
  data.forEach((record, index) => {
    const rowNum = index + 1;
    
    if (!record.date) {
      errors.push(`Row ${rowNum}: Missing date`);
    }
    
    if (!record.employeeId) {
      errors.push(`Row ${rowNum}: Missing employee ID`);
    }
    
    if (!record.firstIn) {
      errors.push(`Row ${rowNum}: Missing check-in time`);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}
