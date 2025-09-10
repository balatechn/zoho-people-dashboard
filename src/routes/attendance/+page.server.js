import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
  try {
    console.log('Loading attendance page with real data...');
    
    // Read the converted attendance data (same as main dashboard)
    let attendanceData = [];
    
    const attendanceFilePath = path.join(process.cwd(), 'static', 'attendance-data.json');
    if (fs.existsSync(attendanceFilePath)) {
      const rawData = fs.readFileSync(attendanceFilePath, 'utf-8');
      attendanceData = JSON.parse(rawData);
      console.log(`Loaded ${attendanceData.length} attendance records from Excel file`);
    } else {
      console.log('No attendance data file found');
    }
    
    // Transform data to match expected format for attendance page
    const transformedData = attendanceData.map(record => ({
      // Original Excel fields
      Date: record.Date,
      'Employee Id': record['Employee Id'],
      'Employee Name': record['Employee Name'],
      'Email ID': record['Email ID'],
      'First In': record['First In'],
      'Last Out': record['Last Out'],
      'Total Hours': record['Total Hours'],
      'Shift name': record['Shift name'],
      
      // Additional derived fields for UI
      employeeId: record['Employee Id'],
      employeeName: record['Employee Name'],
      email: record['Email ID'],
      firstIn: record['First In'],
      lastOut: record['Last Out'],
      totalHours: record['Total Hours'],
      shift: record['Shift name'],
      date: record['Date'],
      
      // Department inference from email
      Department: record['Email ID']?.includes('production') ? 'Production & Delivery' : 
                 record['Email ID']?.includes('rd') ? 'R&D' : 
                 record['Email ID']?.includes('business') ? 'Business & Strategy' : 
                 record['Email ID']?.includes('hr') ? 'Human Resources' :
                 record['Email ID']?.includes('finance') ? 'Finance' :
                 record['Email ID']?.includes('marketing') ? 'Marketing' :
                 'General',
      
      // Role inference (can be enhanced based on email patterns)
      Role: record['Email ID']?.includes('manager') ? 'Manager' :
            record['Employee Id']?.includes('NCPL') ? 'Employee' : 'Staff',
      
      // Location (default for now)
      Location: 'Head Office'
    }));
    
    return {
      attendanceData: transformedData,
      totalItems: transformedData.length,
      excelFileFound: true,
      loadedFromExcel: true
    };
  } catch (error) {
    console.error('Error loading attendance data:', error);
    
    return {
      attendanceData: [],
      totalItems: 0,
      excelFileFound: false,
      loadedFromExcel: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
