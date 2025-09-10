/**
 * Employee Lookup Test and Demo
 * Demonstrates how to use the employee lookup logic
 */

import { 
  getEmployeeDetails, 
  captureEmployeeForAttendance, 
  getEmployeesByDepartment,
  getEmployeesByRole,
  getAllEmployeesForAttendance,
  isValidEmployeeNumber 
} from './employeeLookup.js';

/**
 * Test the employee lookup functionality
 */
export function testEmployeeLookup() {
  console.log('=== Employee Lookup Test Results ===\n');

  // Test 1: Get NCPL019 details (Balasubramanian Pillai)
  console.log('1. Testing NCPL019 (Balasubramanian Pillai):');
  const ncpl019 = getEmployeeDetails('NCPL019');
  console.log('   Employee Details:', ncpl019);
  console.log('   Found:', ncpl019.found);
  console.log('   Department:', ncpl019.department);
  console.log('   Designation:', ncpl019.designation);
  console.log('   Location:', ncpl019.location);
  console.log('   Role:', ncpl019.role);
  console.log('');

  // Test 2: Capture for attendance system
  console.log('2. Testing attendance capture for NCPL019:');
  const attendanceRecord = captureEmployeeForAttendance('NCPL019');
  console.log('   Attendance Record:', attendanceRecord);
  console.log('');

  // Test 3: Test invalid employee number
  console.log('3. Testing invalid employee number (NCPL999):');
  const invalidEmployee = getEmployeeDetails('NCPL999');
  console.log('   Result:', invalidEmployee);
  console.log('   Found:', invalidEmployee.found);
  console.log('   Error:', invalidEmployee.error);
  console.log('');

  // Test 4: Get all IT department employees
  console.log('4. Testing IT department employees:');
  const itEmployees = getEmployeesByDepartment('IT');
  console.log('   IT Department:', itEmployees);
  console.log('');

  // Test 5: Get all managers
  console.log('5. Testing all managers:');
  const managers = getEmployeesByRole('Manager');
  console.log('   Managers:', managers);
  console.log('');

  // Test 6: Validate employee number format
  console.log('6. Testing employee number validation:');
  console.log('   NCPL019 valid:', isValidEmployeeNumber('NCPL019'));
  console.log('   INVALID123 valid:', isValidEmployeeNumber('INVALID123'));
  console.log('   ncpl019 valid:', isValidEmployeeNumber('ncpl019'));
  console.log('');

  return {
    ncpl019Details: ncpl019,
    attendanceRecord: attendanceRecord,
    invalidEmployee: invalidEmployee,
    itEmployees: itEmployees,
    managers: managers
  };
}

/**
 * Demo: Practical usage scenarios
 */
export function demonstrateUsage() {
  console.log('=== Practical Usage Scenarios ===\n');

  // Scenario 1: Processing attendance for multiple employees
  const employeeNumbers = ['NCPL019', 'NCPL001', 'NCPL024', 'NCPL999']; // Including one invalid
  
  console.log('Scenario 1: Processing attendance for multiple employees');
  console.log('Employee Numbers:', employeeNumbers);
  
  const attendanceRecords = employeeNumbers.map(empNum => {
    const record = captureEmployeeForAttendance(empNum);
    console.log(`  ${empNum}: ${record.found ? 'Found' : 'Not Found'}`);
    return record;
  });
  
  console.log('');

  // Scenario 2: Department-wise analysis
  console.log('Scenario 2: Department-wise employee count');
  const departments = ['IT', 'Marketing', 'Software Development', 'HR', 'Management'];
  
  departments.forEach(dept => {
    const deptEmployees = getEmployeesByDepartment(dept);
    console.log(`  ${dept}: ${deptEmployees.length} employees`);
  });
  
  console.log('');

  // Scenario 3: Role-based filtering
  console.log('Scenario 3: Role-based employee distribution');
  const roles = ['Admin', 'Manager', 'Team member'];
  
  roles.forEach(role => {
    const roleEmployees = getEmployeesByRole(role);
    console.log(`  ${role}: ${roleEmployees.length} employees`);
  });
  
  console.log('');

  return {
    attendanceRecords,
    departmentCounts: departments.map(dept => ({
      department: dept,
      count: getEmployeesByDepartment(dept).length
    })),
    roleCounts: roles.map(role => ({
      role: role,
      count: getEmployeesByRole(role).length
    }))
  };
}

/**
 * Integration example: How to use in Svelte components
 */
export function generateSvelteIntegrationExample() {
  return `
// Example: Using in Svelte component
<script>
  import { getEmployeeDetails, captureEmployeeForAttendance } from '$lib/utils/employeeLookup.js';
  
  let employeeNumber = 'NCPL019';
  let employeeDetails = null;
  let errorMessage = '';
  
  function lookupEmployee() {
    employeeDetails = getEmployeeDetails(employeeNumber);
    
    if (!employeeDetails.found) {
      errorMessage = employeeDetails.error;
    } else {
      errorMessage = '';
    }
  }
  
  function addToAttendance() {
    const attendanceRecord = captureEmployeeForAttendance(employeeNumber);
    // Add to attendance list
    console.log('Adding to attendance:', attendanceRecord);
  }
</script>

<div class="employee-lookup">
  <input 
    bind:value={employeeNumber} 
    placeholder="Enter Employee Number (e.g., NCPL019)"
  />
  <button on:click={lookupEmployee}>Lookup Employee</button>
  
  {#if employeeDetails && employeeDetails.found}
    <div class="employee-card">
      <h3>{employeeDetails.fullName}</h3>
      <p><strong>Department:</strong> {employeeDetails.department}</p>
      <p><strong>Designation:</strong> {employeeDetails.designation}</p>
      <p><strong>Location:</strong> {employeeDetails.location}</p>
      <p><strong>Role:</strong> {employeeDetails.role}</p>
      <button on:click={addToAttendance}>Add to Attendance</button>
    </div>
  {/if}
  
  {#if errorMessage}
    <div class="error">{errorMessage}</div>
  {/if}
</div>
`;
}

// If running in browser environment, run tests
if (typeof window !== 'undefined') {
  // Run tests when file is loaded
  // Uncomment below to run tests automatically
  // testEmployeeLookup();
  // demonstrateUsage();
}
