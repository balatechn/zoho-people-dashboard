/**
 * Attendance Employee Integration
 * Shows how to integrate employee lookup with attendance system
 */

import { getEmployeeDetails, captureEmployeeForAttendance } from './employeeLookup.js';

/**
 * Enhance attendance records with employee details
 * @param {Array} attendanceData - Raw attendance data
 * @returns {Array} Enhanced attendance data with employee details
 */
export function enhanceAttendanceWithEmployeeData(attendanceData) {
  return attendanceData.map(record => {
    // Get the employee ID from the record
    const employeeId = record['Employee Id'] || record.employeeId || record.EmployeeId;
    
    if (!employeeId) {
      console.warn('No employee ID found in record:', record);
      return {
        ...record,
        'Employee Name': record['Employee Name'] || 'Unknown',
        'Email ID': record['Email ID'] || '',
        'Department': record['Department'] || 'N/A',
        'Designation': record['Designation'] || 'N/A',
        'Location': record['Location'] || 'N/A',
        'Role': record['Role'] || 'N/A'
      };
    }

    // Get employee details from lookup
    const employeeDetails = getEmployeeDetails(employeeId);
    
    if (employeeDetails.found) {
      return {
        ...record,
        'Employee Id': employeeDetails.employeeNumber,
        'Employee Name': employeeDetails.fullName,
        'Email ID': employeeDetails.workEmail,
        'Department': employeeDetails.department,
        'Designation': employeeDetails.designation,
        'Location': employeeDetails.location,
        'Role': employeeDetails.role
      };
    } else {
      // Keep original data if employee not found in lookup
      console.warn(`Employee ${employeeId} not found in employee database`);
      return {
        ...record,
        'Employee Name': record['Employee Name'] || 'Unknown Employee',
        'Email ID': record['Email ID'] || '',
        'Department': record['Department'] || 'N/A',
        'Designation': record['Designation'] || 'N/A',
        'Location': record['Location'] || 'N/A',
        'Role': record['Role'] || 'N/A'
      };
    }
  });
}

/**
 * Create attendance record from employee ID with default times
 * @param {string} employeeId - Employee ID (e.g., "NCPL019")
 * @param {Object} timeData - Optional time data { firstIn, lastOut, totalHours }
 * @returns {Object} Complete attendance record
 */
export function createAttendanceRecord(employeeId, timeData = {}) {
  const employeeRecord = captureEmployeeForAttendance(employeeId);
  
  const defaultTimes = {
    'First In': timeData.firstIn || '09:00 AM',
    'Last Out': timeData.lastOut || '06:00 PM',
    'Total Hours': timeData.totalHours || '9h 00m'
  };

  return {
    ...employeeRecord,
    ...defaultTimes,
    'Date': timeData.date || new Date().toLocaleDateString('en-IN'),
    'Status': timeData.status || 'Present'
  };
}

/**
 * Bulk create attendance records for multiple employees
 * @param {Array} employeeIds - Array of employee IDs
 * @param {Object} commonTimeData - Common time data for all employees
 * @returns {Array} Array of attendance records
 */
export function bulkCreateAttendanceRecords(employeeIds, commonTimeData = {}) {
  return employeeIds.map(empId => createAttendanceRecord(empId, commonTimeData));
}

/**
 * Validate employee exists before creating attendance
 * @param {string} employeeId - Employee ID to validate
 * @returns {Object} Validation result
 */
export function validateEmployeeForAttendance(employeeId) {
  const details = getEmployeeDetails(employeeId);
  
  return {
    isValid: details.found,
    employeeId: employeeId,
    employeeName: details.fullName,
    department: details.department,
    error: details.error,
    canCreateAttendance: details.found
  };
}

/**
 * Get employee quick info for attendance UI
 * @param {string} employeeId - Employee ID
 * @returns {Object} Quick employee info
 */
export function getEmployeeQuickInfo(employeeId) {
  const details = getEmployeeDetails(employeeId);
  
  if (!details.found) {
    return {
      found: false,
      display: `${employeeId} - Not Found`,
      error: details.error
    };
  }

  return {
    found: true,
    display: `${details.employeeNumber} - ${details.fullName}`,
    name: details.fullName,
    department: details.department,
    designation: details.designation,
    role: details.role,
    error: null
  };
}

/**
 * Example usage for Svelte attendance component
 */
export const attendanceIntegrationExample = {
  // Example 1: Enhanced attendance data
  enhancedData: () => {
    const rawData = [
      { 'Employee Id': 'NCPL019', 'First In': '09:15 AM', 'Last Out': '06:30 PM' },
      { 'Employee Id': 'NCPL001', 'First In': '09:00 AM', 'Last Out': '06:00 PM' },
      { 'Employee Id': 'NCPL024', 'First In': '09:30 AM', 'Last Out': '07:00 PM' }
    ];
    
    return enhanceAttendanceWithEmployeeData(rawData);
  },

  // Example 2: Create new attendance
  createNew: () => {
    return createAttendanceRecord('NCPL019', {
      firstIn: '09:15 AM',
      lastOut: '06:30 PM',
      totalHours: '9h 15m',
      status: 'Present',
      date: '2024-01-15'
    });
  },

  // Example 3: Bulk creation
  bulkCreate: () => {
    const employeeIds = ['NCPL019', 'NCPL001', 'NCPL024'];
    return bulkCreateAttendanceRecords(employeeIds, {
      date: '2024-01-15',
      status: 'Present'
    });
  },

  // Example 4: Validation
  validate: () => {
    return validateEmployeeForAttendance('NCPL019');
  }
};

/**
 * Department-wise attendance summary
 * @param {Array} attendanceRecords - Array of attendance records
 * @returns {Object} Department-wise summary
 */
export function getDepartmentAttendanceSummary(attendanceRecords) {
  const summary = {};
  
  attendanceRecords.forEach(record => {
    const dept = record['Department'] || 'Unknown';
    if (!summary[dept]) {
      summary[dept] = {
        total: 0,
        present: 0,
        absent: 0,
        employees: []
      };
    }
    
    summary[dept].total++;
    summary[dept].employees.push(record['Employee Name']);
    
    if (record['Status'] === 'Present') {
      summary[dept].present++;
    } else {
      summary[dept].absent++;
    }
  });
  
  return summary;
}

/**
 * Role-wise attendance summary
 * @param {Array} attendanceRecords - Array of attendance records
 * @returns {Object} Role-wise summary
 */
export function getRoleAttendanceSummary(attendanceRecords) {
  const summary = {};
  
  attendanceRecords.forEach(record => {
    const role = record['Role'] || 'Unknown';
    if (!summary[role]) {
      summary[role] = {
        total: 0,
        present: 0,
        absent: 0,
        employees: []
      };
    }
    
    summary[role].total++;
    summary[role].employees.push(record['Employee Name']);
    
    if (record['Status'] === 'Present') {
      summary[role].present++;
    } else {
      summary[role].absent++;
    }
  });
  
  return summary;
}
