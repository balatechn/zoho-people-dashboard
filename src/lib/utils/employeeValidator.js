// Employee Data Validation and Cross-Reference Utility
// @ts-nocheck

import { sampleEmployees } from '../sampleData.js';

/**
 * Cross-reference employee data between attendance records and employee database
 */
export function validateEmployeeData(attendanceData) {
  if (!Array.isArray(attendanceData)) {
    return { error: 'Invalid attendance data - expected array' };
  }

  const report = {
    totalAttendanceRecords: attendanceData.length,
    totalEmployees: sampleEmployees.length,
    validRecords: [],
    inconsistencies: [],
    missingEmployees: [],
    summary: {
      validCount: 0,
      invalidCount: 0,
      missingCount: 0
    }
  };

  // Create employee lookup map for fast reference
  const employeeMap = new Map();
  sampleEmployees.forEach(emp => {
    employeeMap.set(emp.id, emp);
  });

  // Get unique employee IDs from attendance data
  const attendanceEmployeeIds = new Set(attendanceData.map(record => record.employeeId));

  // Validate each attendance record
  attendanceData.forEach(record => {
    const employee = employeeMap.get(record.employeeId);
    
    if (!employee) {
      report.inconsistencies.push({
        type: 'EMPLOYEE_NOT_FOUND',
        employeeId: record.employeeId,
        employeeName: record.employeeName,
        department: record.department,
        message: `Employee ID ${record.employeeId} (${record.employeeName}) not found in employee database`
      });
      report.summary.invalidCount++;
      return;
    }

    let hasIssues = false;

    // Check name consistency
    if (employee.name !== record.employeeName) {
      report.inconsistencies.push({
        type: 'NAME_MISMATCH',
        employeeId: record.employeeId,
        databaseName: employee.name,
        attendanceName: record.employeeName,
        message: `Name mismatch for ${record.employeeId}: Database has "${employee.name}", attendance has "${record.employeeName}"`
      });
      hasIssues = true;
    }

    // Check department consistency
    if (employee.department !== record.department) {
      report.inconsistencies.push({
        type: 'DEPARTMENT_MISMATCH',
        employeeId: record.employeeId,
        employeeName: employee.name,
        databaseDepartment: employee.department,
        attendanceDepartment: record.department,
        message: `Department mismatch for ${record.employeeId} (${employee.name}): Database has "${employee.department}", attendance has "${record.department}"`
      });
      hasIssues = true;
    }

    // Check email consistency (if available)
    if (record.emailId && employee.email !== record.emailId) {
      report.inconsistencies.push({
        type: 'EMAIL_MISMATCH',
        employeeId: record.employeeId,
        employeeName: employee.name,
        databaseEmail: employee.email,
        attendanceEmail: record.emailId,
        message: `Email mismatch for ${record.employeeId} (${employee.name}): Database has "${employee.email}", attendance has "${record.emailId}"`
      });
      hasIssues = true;
    }

    if (!hasIssues) {
      report.validRecords.push(record);
      report.summary.validCount++;
    }
  });

  // Find employees in database but not in attendance
  sampleEmployees.forEach(employee => {
    if (!attendanceEmployeeIds.has(employee.id)) {
      report.missingEmployees.push({
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        message: `Employee ${employee.id} (${employee.name}) exists in database but has no attendance records`
      });
      report.summary.missingCount++;
    }
  });

  return report;
}

/**
 * Get employee details by ID
 */
export function getEmployeeById(employeeId) {
  return sampleEmployees.find(emp => emp.id === employeeId) || null;
}

/**
 * Get all employees by department
 */
export function getEmployeesByDepartment(department) {
  return sampleEmployees.filter(emp => 
    emp.department && emp.department.toLowerCase() === department.toLowerCase()
  );
}

/**
 * Generate corrected attendance record with consistent employee data
 */
export function correctAttendanceRecord(attendanceRecord) {
  const employee = getEmployeeById(attendanceRecord.employeeId);
  
  if (!employee) {
    return attendanceRecord; // Return original if employee not found
  }

  return {
    ...attendanceRecord,
    employeeName: employee.name,
    department: employee.department,
    designation: employee.position,
    emailId: employee.email,
    location: employee.location
  };
}

/**
 * Get department statistics
 */
export function getDepartmentStats() {
  const stats = {};
  sampleEmployees.forEach(emp => {
    if (emp.department) {
      stats[emp.department] = (stats[emp.department] || 0) + 1;
    }
  });
  return stats;
}
