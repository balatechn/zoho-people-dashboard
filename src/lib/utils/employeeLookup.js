/**
 * Employee Lookup Utility
 * Logic to capture Department, Designation, Location, Role from employee page based on Employee Number
 * @typedef {Object} Employee
 * @property {string} employeeNumber
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} fullName
 * @property {string} designation
 * @property {string} workEmail
 * @property {string} department
 * @property {string} workLocation
 * @property {string} role
 * @property {string} employeeStatus
 * 
 * @typedef {Object} EmployeeDetails
 * @property {string} employeeNumber
 * @property {string|null} department
 * @property {string|null} designation
 * @property {string|null} location
 * @property {string|null} role
 * @property {string|null} fullName
 * @property {string|null} workEmail
 * @property {boolean} found
 * @property {string|null} error
 * 
 * @typedef {Object} AttendanceRecord
 * @property {string} Employee Id
 * @property {string} Employee Name
 * @property {string} Email ID
 * @property {string} Department
 * @property {string} Designation
 * @property {string} Location
 * @property {string} Role
 * @property {boolean} found
 * @property {string|null} error
 */

// Employee master data - this should eventually come from a database or API
/** @type {Employee[]} */
const EMPLOYEES_MASTER_DATA = [
  {
    employeeNumber: 'NCPL019',
    firstName: 'Balasubramanian',
    lastName: 'Pillai',
    fullName: 'Balasubramanian Pillai',
    designation: 'Manager IT',
    workEmail: 'bala@nationalconsultingindia.com',
    department: 'IT',
    workLocation: 'Head Office',
    role: 'Admin', // Derived from designation
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL001',
    firstName: 'Mohammed',
    lastName: 'Farooq',
    fullName: 'Mohammed Farooq',
    designation: 'EA - Director',
    workEmail: 'farooq@nationalconsultingindia.com',
    department: 'Management',
    workLocation: 'Head Office',
    role: 'Manager',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL017',
    firstName: 'Prasanna',
    lastName: 'Hegde',
    fullName: 'Prasanna Hegde',
    designation: 'Accounts Executive',
    workEmail: 'prasanna.h@nationalconsultingindia.com',
    department: 'Accounts',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL007',
    firstName: 'Karthik',
    lastName: 'M K',
    fullName: 'Karthik M K',
    designation: 'CFO',
    workEmail: 'karthik.mk@nationalconsultingindia.com',
    department: 'Accounts',
    workLocation: 'Head Office',
    role: 'Manager',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL000',
    firstName: 'Shahil',
    lastName: 'Anoof',
    fullName: 'Shahil Anoof',
    designation: 'Managing Director',
    workEmail: 'shahil@nationalconsultingindia.com',
    department: 'Management',
    workLocation: 'Head Office',
    role: 'Admin',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL024',
    firstName: 'Yahya Ayash',
    lastName: 'Luqman',
    fullName: 'Yahya Ayash Luqman',
    designation: 'Software Development Manager',
    workEmail: 'yahya@nationalconsultingindia.com',
    department: 'Software Development',
    workLocation: 'Head Office',
    role: 'Manager',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL002',
    firstName: 'Shruthi',
    lastName: 'Nandeesh',
    fullName: 'Shruthi Nandeesh',
    designation: 'Asst Manager HR',
    workEmail: 'shruthi.d@nationalconsultingindia.com',
    department: 'HR',
    workLocation: 'Head Office',
    role: 'Manager',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL008',
    firstName: 'Dipti',
    lastName: 'Amarnath',
    fullName: 'Dipti Amarnath',
    designation: 'Senior Manager Social Media Marketing',
    workEmail: 'dipti.a@nationalconsultingindia.com',
    department: 'Marketing',
    workLocation: 'Head Office',
    role: 'Manager',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL012',
    firstName: 'Sanjana',
    lastName: 'Jagadeesha',
    fullName: 'Sanjana Jagadeesha',
    designation: 'Associate Legal Advisor',
    workEmail: 'sanjana.j@nationalconsultingindia.com',
    department: 'Legal',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL026',
    firstName: 'Shalini',
    lastName: 'N',
    fullName: 'Shalini N',
    designation: 'Tele Caller',
    workEmail: 'customerconnect@nationalconsultingindia.com',
    department: 'Marketing',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL014',
    firstName: 'Kiran Kumar',
    lastName: 'Uggina',
    fullName: 'Kiran Kumar Uggina',
    designation: 'Sr 3D Architectural Visualizer',
    workEmail: 'kiran.k@nationalconsultingindia.com',
    department: 'Real estate',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL018',
    firstName: 'Siddharth',
    lastName: 'Venkat',
    fullName: 'Siddharth Venkat',
    designation: 'Sr Architect',
    workEmail: 'siddharth.v@nationalconsultingindia.com',
    department: 'Real estate',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL023',
    firstName: 'Mamatha',
    lastName: 'M',
    fullName: 'Mamatha M',
    designation: 'Graphic Designer',
    workEmail: 'mamatha.m@nationalconsultingindia.com',
    department: 'Marketing',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL015',
    firstName: 'Manjushri',
    lastName: 'G',
    fullName: 'Manjushri G',
    designation: 'Tele Caller',
    workEmail: 'montrasupport@nationalconsultingindia.com',
    department: 'Marketing',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL016',
    firstName: 'Shwetha',
    lastName: 'D',
    fullName: 'Shwetha D',
    designation: 'Tele Caller',
    workEmail: 'isuzusupport@nationalconsultingindia.com',
    department: 'Marketing',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL028',
    firstName: 'Adityaa',
    lastName: 'Nagarajan',
    fullName: 'Adityaa Nagarajan',
    designation: 'Full Stack Developer',
    workEmail: 'aadityaa@nationalconsultingindia.com',
    department: 'Software Development',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL027',
    firstName: 'Akshay',
    lastName: 'Hondi',
    fullName: 'Akshay Hondi',
    designation: 'Jr Software Developer',
    workEmail: 'akshay.h@nationalconsultingindia.com',
    department: 'Software Development',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL032',
    firstName: 'Sanjay',
    lastName: 'Asthana',
    fullName: 'Sanjay Asthana',
    designation: 'Vice President',
    workEmail: 'sanjay.a@nationalconsultingindia.com',
    department: 'iSky',
    workLocation: 'Head Office',
    role: 'Manager',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL038',
    firstName: 'Harshdeep',
    lastName: 'Singh',
    fullName: 'Harshdeep Singh',
    designation: 'Head of Marketing',
    workEmail: 'harshdeep.s@nationalconsultingindia.com',
    department: 'Marketing',
    workLocation: 'Head Office',
    role: 'Manager',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL010',
    firstName: 'Abhiram',
    lastName: 'C',
    fullName: 'Abhiram C',
    designation: 'Graphic Designer',
    workEmail: 'abhiram.c@nationalconsultingindia.com',
    department: 'Marketing',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL039',
    firstName: 'Madhan',
    lastName: 'M',
    fullName: 'Madhan M',
    designation: 'Sr Architect',
    workEmail: 'madhan.m@nationalconsultingindia.com',
    department: 'Real estate',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  },
  {
    employeeNumber: 'NCPL034',
    firstName: 'Rakshith',
    lastName: 'R',
    fullName: 'Rakshith R',
    designation: 'Digital Media Marketing Executive',
    workEmail: 'rakshith.r@nationalconsultingindia.com',
    department: 'Marketing',
    workLocation: 'Head Office',
    role: 'Team member',
    employeeStatus: 'Active'
  }
];

/**
 * Get employee information by Employee Number
 * @param {string} employeeNumber - Employee Number (e.g., "NCPL019")
 * @returns {Employee|null} Employee details or null if not found
 */
export function getEmployeeByNumber(employeeNumber) {
  if (!employeeNumber || typeof employeeNumber !== 'string') {
    console.warn('Invalid employee number provided:', employeeNumber);
    return null;
  }

  const employee = EMPLOYEES_MASTER_DATA.find(emp => 
    emp.employeeNumber === employeeNumber.toUpperCase()
  );

  if (!employee) {
    console.warn(`Employee not found for number: ${employeeNumber}`);
    return null;
  }

  return employee;
}

/**
 * Get specific employee details (Department, Designation, Location, Role)
 * @param {string} employeeNumber - Employee Number (e.g., "NCPL019")
 * @returns {EmployeeDetails} Employee details object
 */
export function getEmployeeDetails(employeeNumber) {
  const employee = getEmployeeByNumber(employeeNumber);
  
  if (!employee) {
    return {
      employeeNumber: employeeNumber,
      department: null,
      designation: null,
      location: null,
      role: null,
      fullName: null,
      workEmail: null,
      found: false,
      error: `Employee ${employeeNumber} not found in database`
    };
  }

  return {
    employeeNumber: employee.employeeNumber,
    department: employee.department,
    designation: employee.designation,
    location: employee.workLocation,
    role: employee.role,
    fullName: employee.fullName,
    workEmail: employee.workEmail,
    found: true,
    error: null
  };
}

/**
 * Capture employee data for attendance purposes
 * @param {string} employeeNumber - Employee Number (e.g., "NCPL019")
 * @returns {AttendanceRecord} Formatted employee data for attendance
 */
export function captureEmployeeForAttendance(employeeNumber) {
  const details = getEmployeeDetails(employeeNumber);
  
  if (!details.found) {
    return {
      'Employee Id': employeeNumber,
      'Employee Name': 'Unknown Employee',
      'Email ID': '',
      'Department': 'N/A',
      'Designation': 'N/A',
      'Location': 'N/A',
      'Role': 'N/A',
      found: false,
      error: details.error
    };
  }

  return {
    'Employee Id': details.employeeNumber,
    'Employee Name': details.fullName,
    'Email ID': details.workEmail,
    'Department': details.department,
    'Designation': details.designation,
    'Location': details.location,
    'Role': details.role,
    found: true,
    error: null
  };
}

/**
 * Bulk capture multiple employees
 * @param {string[]} employeeNumbers - Array of employee numbers
 * @returns {Object[]} Array of employee details
 */
export function captureMultipleEmployees(employeeNumbers) {
  if (!Array.isArray(employeeNumbers)) {
    throw new Error('Employee numbers must be provided as an array');
  }

  return employeeNumbers.map(empNum => captureEmployeeForAttendance(empNum));
}

/**
 * Get all employees data
 * @returns {Object[]} All employees with formatted data
 */
export function getAllEmployeesForAttendance() {
  return EMPLOYEES_MASTER_DATA.map(employee => ({
    'Employee Id': employee.employeeNumber,
    'Employee Name': employee.fullName,
    'Email ID': employee.workEmail,
    'Department': employee.department,
    'Designation': employee.designation,
    'Location': employee.workLocation,
    'Role': employee.role
  }));
}

/**
 * Search employees by department
 * @param {string} department - Department name
 * @returns {Object[]} Employees in the specified department
 */
export function getEmployeesByDepartment(department) {
  const filtered = EMPLOYEES_MASTER_DATA.filter(emp => 
    emp.department.toLowerCase() === department.toLowerCase()
  );
  
  return filtered.map(employee => ({
    'Employee Id': employee.employeeNumber,
    'Employee Name': employee.fullName,
    'Email ID': employee.workEmail,
    'Department': employee.department,
    'Designation': employee.designation,
    'Location': employee.workLocation,
    'Role': employee.role
  }));
}

/**
 * Search employees by role
 * @param {string} role - Role name (Manager, Team member, Admin)
 * @returns {Object[]} Employees with the specified role
 */
export function getEmployeesByRole(role) {
  const filtered = EMPLOYEES_MASTER_DATA.filter(emp => 
    emp.role.toLowerCase() === role.toLowerCase()
  );
  
  return filtered.map(employee => ({
    'Employee Id': employee.employeeNumber,
    'Employee Name': employee.fullName,
    'Email ID': employee.workEmail,
    'Department': employee.department,
    'Designation': employee.designation,
    'Location': employee.workLocation,
    'Role': employee.role
  }));
}

/**
 * Validate employee number format
 * @param {string} employeeNumber - Employee number to validate
 * @returns {boolean} True if valid format
 */
export function isValidEmployeeNumber(employeeNumber) {
  // NCPL followed by 3 digits (NCPL001, NCPL019, etc.)
  const pattern = /^NCPL\d{3}$/;
  return pattern.test(employeeNumber);
}

/**
 * Auto-determine role based on designation
 * @param {string} designation - Employee designation
 * @returns {string} Determined role
 */
export function determineRole(designation) {
  const managerKeywords = ['manager', 'director', 'head', 'cfo', 'vice president', 'president'];
  const adminKeywords = ['admin', 'managing director', 'manager it'];
  
  const lowerDesignation = designation.toLowerCase();
  
  if (adminKeywords.some(keyword => lowerDesignation.includes(keyword))) {
    return 'Admin';
  }
  
  if (managerKeywords.some(keyword => lowerDesignation.includes(keyword))) {
    return 'Manager';
  }
  
  return 'Team member';
}

// Example usage:
// const empDetails = getEmployeeDetails('NCPL019');
// console.log('Employee Details:', empDetails);
// Output: { employeeNumber: 'NCPL019', department: 'IT', designation: 'Manager IT', location: 'Head Office', role: 'Admin' }

// const attendanceRecord = captureEmployeeForAttendance('NCPL019');
// console.log('Attendance Record:', attendanceRecord);
// Output: { 'Employee Id': 'NCPL019', 'Employee Name': 'Balasubramanian Pillai', 'Department': 'IT', ... }
