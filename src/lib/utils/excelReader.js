import * as XLSX from 'xlsx';

/**
 * Read and parse Excel file from the 1data folder
 * @param {string} filePath - Path to the Excel file
 * @returns {Promise<Array>} Parsed attendance data
 */
export async function readAttendanceExcel(filePath = '/1data/Attend.xlsx') {
  try {
    // For browser environment, we'll need to fetch the file
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to fetch Excel file: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Get the first worksheet
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Skip header row and process data
    const headers = jsonData[0] || [];
    const dataRows = jsonData.slice(1);
    
    // Map the data to our expected format
    const attendanceData = dataRows.map((row, index) => {
      const rowData = {};
      headers.forEach((header, colIndex) => {
        rowData[header] = row[colIndex] || '';
      });
      
      // Transform to our attendance format
      return {
        id: rowData['Employee ID'] || rowData['EmpID'] || `EMP${String(index + 1).padStart(3, '0')}`,
        name: rowData['Employee Name'] || rowData['Name'] || rowData['EmpName'] || 'Unknown Employee',
        designation: rowData['Designation'] || rowData['Job Title'] || 'Employee',
        type: rowData['Type'] || rowData['Employee Type'] || 'Regular',
        department: rowData['Department'] || rowData['Dept'] || 'General',
        loginTime: rowData['Login Time'] || rowData['Check In'] || rowData['In Time'] || '--:--',
        logoutTime: rowData['Logout Time'] || rowData['Check Out'] || rowData['Out Time'] || '--:--',
        date: rowData['Date'] || rowData['Attendance Date'] || new Date().toLocaleDateString(),
        status: determineStatus(rowData['Login Time'] || rowData['Check In'] || rowData['In Time']),
        avatar: generateAvatar(rowData['Employee Name'] || rowData['Name'] || rowData['EmpName'])
      };
    }).filter(row => row.name !== 'Unknown Employee' && row.name.trim() !== '');
    
    return attendanceData;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return [];
  }
}

/**
 * Determine attendance status based on login time
 * @param {string} loginTime - Login time string
 * @returns {string} Status (Ontime/Late)
 */
function determineStatus(loginTime) {
  if (!loginTime || loginTime === '--:--') return 'Absent';
  
  try {
    // Convert time to 24-hour format for comparison
    const time = parseTime(loginTime);
    const cutoffTime = parseTime('09:00'); // 9:00 AM cutoff
    
    return time <= cutoffTime ? 'Ontime' : 'Late';
  } catch (error) {
    return 'Unknown';
  }
}

/**
 * Parse time string to minutes for comparison
 * @param {string} timeStr - Time string (e.g., "9:15 AM", "14:30")
 * @returns {number} Time in minutes from midnight
 */
function parseTime(timeStr) {
  if (!timeStr) return 0;
  
  const cleanTime = timeStr.toString().trim().toUpperCase();
  
  // Handle 12-hour format (9:15 AM, 2:30 PM)
  if (cleanTime.includes('AM') || cleanTime.includes('PM')) {
    const [time, period] = cleanTime.split(/\s+/);
    const [hours, minutes] = time.split(':').map(Number);
    
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    return hour24 * 60 + (minutes || 0);
  }
  
  // Handle 24-hour format (14:30, 09:15)
  const [hours, minutes] = cleanTime.split(':').map(Number);
  return hours * 60 + (minutes || 0);
}

/**
 * Generate avatar emoji based on employee name
 * @param {string} name - Employee name
 * @returns {string} Avatar emoji
 */
function generateAvatar(name) {
  if (!name) return '👤';
  
  const avatars = ['👨‍💼', '👩‍💼', '👨‍💻', '👩‍💻', '👨‍🔧', '👩‍🔧', '👨‍🎨', '👩‍🎨'];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatars[hash % avatars.length];
}

/**
 * Server-side function to read Excel file (for development)
 * This would be used in +page.server.js
 */
export async function readAttendanceExcelServer() {
  try {
    // In a real server environment, read from file system
    const fs = await import('fs');
    const path = await import('path');
    
    const filePath = path.join(process.cwd(), '1data', 'Attend.xlsx');
    
    if (!fs.existsSync(filePath)) {
      console.warn('Excel file not found:', filePath);
      // Try static folder as fallback
      const staticPath = path.join(process.cwd(), 'static', 'attendance-data.json');
      if (fs.existsSync(staticPath)) {
        const jsonData = JSON.parse(fs.readFileSync(staticPath, 'utf8'));
        return jsonData;
      }
      return [];
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    // Convert to JSON with headers
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(`Loaded ${jsonData.length} attendance records from Excel file`);
    return jsonData;
  } catch (error) {
    console.error('Error reading Excel file on server:', error);
    
    // Try to read from static JSON as fallback
    try {
      const fs = await import('fs');
      const path = await import('path');
      const staticPath = path.join(process.cwd(), 'static', 'attendance-data.json');
      if (fs.existsSync(staticPath)) {
        const jsonData = JSON.parse(fs.readFileSync(staticPath, 'utf8'));
        console.log(`Loaded ${jsonData.length} attendance records from static JSON file`);
        return jsonData;
      }
    } catch (fallbackError) {
      console.error('Error reading fallback JSON file:', fallbackError);
    }
    
    return [];
  }
}
