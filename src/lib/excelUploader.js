import { read, utils } from 'xlsx';

/**
 * Process an attendance Excel file and convert it to structured data
 * @param {string|File} filePath - Path to the Excel file or File object
 * @returns {Promise<{success: boolean, data?: Array<any>, errors?: Array<string>}>}
 */
export async function processAttendanceExcel(filePath) {
  try {
    // For browser environments, we'd use the File API
    // For Node.js environments, we need to use fs
    let workbook;
    
    // If running in Node.js environment
    if (typeof window === 'undefined') {
      try {
        const fs = await import('node:fs/promises');
        const buffer = await fs.readFile(filePath);
        workbook = read(buffer);
      } catch (error) {
        console.error('Failed to read file in Node.js environment:', error);
        // Fallback to browser fetch API for server-side rendering environments
        const response = await fetch(`file://${filePath}`);
        const buffer = await response.arrayBuffer();
        workbook = read(buffer);
      }
    } else {
      // For browser environment
      if (typeof filePath === 'string') {
        // If it's a string URL/path, fetch it
        const response = await fetch(filePath);
        const buffer = await response.arrayBuffer();
        workbook = read(buffer);
      } else if (filePath instanceof File) {
        // If it's a File object
        const buffer = await filePath.arrayBuffer();
        workbook = read(buffer);
      } else {
        throw new Error('Invalid file input: Expected a file path string or File object');
      }
    }
    
    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = utils.sheet_to_json(worksheet);
    
    if (jsonData.length === 0) {
      return {
        success: false,
        errors: ['No data found in the Excel sheet']
      };
    }
    
    // Validate the data structure
    const requiredColumns = ['Date', 'Employee Id', 'Name', 'Check-in', 'Check-out'];
    const headers = Object.keys(jsonData[0]);
    
    const missingColumns = requiredColumns.filter(col => 
      !headers.some(header => header.toLowerCase() === col.toLowerCase())
    );
    
    if (missingColumns.length > 0) {
      return {
        success: false,
        errors: [`Missing required columns: ${missingColumns.join(', ')}`]
      };
    }
    
    // Process and normalize the data
    const processedData = jsonData.map(row => {
      // Normalize dates and times
      const checkInTime = row['Check-in'] ? new Date(row['Check-in']) : null;
      const checkOutTime = row['Check-out'] ? new Date(row['Check-out']) : null;
      
      return {
        date: row.Date,
        employeeId: row['Employee Id'],
        name: row.Name,
        email: row.Email || '',
        checkIn: checkInTime ? checkInTime.toISOString() : null,
        checkOut: checkOutTime ? checkOutTime.toISOString() : null,
        status: determineAttendanceStatus(checkInTime, checkOutTime),
        department: row.Department || '',
        location: row.Location || ''
      };
    });
    
    return {
      success: true,
      data: processedData
    };
  } catch (error) {
    console.error('Error processing Excel file:', error);
    return {
      success: false,
      errors: [error instanceof Error ? error.message : String(error)]
    };
  }
}

/**
 * Determine attendance status based on check-in and check-out times
 * @param {Date|null} checkIn - Check-in time
 * @param {Date|null} checkOut - Check-out time
 * @returns {string} - Status like "Present", "Absent", etc.
 */
function determineAttendanceStatus(checkIn, checkOut) {
  if (!checkIn && !checkOut) return 'Absent';
  if (checkIn && !checkOut) return 'Present (No Check-out)';
  return 'Present';
}
