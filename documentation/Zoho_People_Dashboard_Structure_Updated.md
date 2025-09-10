# Zoho People Dashboard Documentation

**Project Name:** Zoho People Dashboard  
**Organization:** National Consulting India  
**Current Date:** September 9, 2025  
**Version:** 1.0.0

## Overview

The Zoho People Dashboard is an elegant management dashboard built for National Consulting India to visualize and manage employee data from Zoho People. The dashboard features a gold and off-white design theme and provides real-time insights into employee attendance, approvals, leave management, and other HR metrics.

## Technical Architecture

### Technology Stack

- **Frontend:** SvelteKit, TailwindCSS
- **Charting:** Recharts
- **Icons:** Lucide-svelte
- **API Integration:** Axios for Zoho People API
- **Deployment:** Netlify

### Project Structure

```
zoho-people-dashboard/
├── .env                    # Environment variables (gitignored)
├── .env.example            # Example environment variables template
├── package.json            # Project dependencies and scripts
├── svelte.config.js        # SvelteKit configuration
├── tailwind.config.js      # TailwindCSS configuration
├── vite.config.js          # Vite configuration
├── static/                 # Static assets
│   ├── favicon.png         # Site favicon
│   └── images/             # Static image files
├── src/
│   ├── app.html            # HTML template
│   ├── hooks.server.js     # Server hooks for auth
│   ├── routes/             # SvelteKit routes
│   │   ├── +layout.svelte  # Main layout
│   │   ├── +layout.js      # Layout data loading
│   │   ├── +page.svelte    # Dashboard home page
│   │   ├── +page.js        # Dashboard data loading
│   │   ├── attendance/     # Attendance management
│   │   │   ├── +page.svelte # Attendance page with advanced filtering
│   │   │   └── +page.js     # Attendance data loading
│   │   ├── approvals/      # Approvals management
│   │   │   ├── +page.svelte # Approvals page
│   │   │   └── +page.js     # Approvals data loading
│   │   └── auth/           # Authentication routes
│   ├── lib/                # Shared libraries
│   │   ├── components/     # Reusable components
│   │   │   ├── ui/         # Base UI components
│   │   │   │   ├── Button.svelte
│   │   │   │   ├── Card.svelte
│   │   │   │   ├── Dropdown.svelte
│   │   │   │   ├── Input.svelte
│   │   │   │   └── StatusBadge.svelte
│   │   │   ├── AttendanceTable.svelte
│   │   │   ├── AttendanceUploader.svelte
│   │   │   ├── ApprovalCard.svelte
│   │   │   ├── ChartCard.svelte
│   │   │   ├── EmployeeGrid.svelte
│   │   │   ├── EmployeeDetailModal.svelte
│   │   │   ├── FilterDropdown.svelte
│   │   │   ├── Header.svelte
│   │   │   ├── KpiCard.svelte
│   │   │   └── Sidebar.svelte
│   │   ├── charts/        # Chart components
│   │   │   ├── AreaChart.svelte
│   │   │   ├── BarChart.svelte
│   │   │   └── PieChart.svelte
│   │   ├── server/         # Server-only code
│   │   │   ├── zohoApi.js  # Zoho API client
│   │   │   └── auth.js     # Authentication utilities
│   │   └── utils/          # Shared utilities
│   │       ├── attendanceUtils.js  # Attendance data utilities
│   │       ├── excelImporter.js    # Excel/CSV import utilities
│   │       ├── formatters.js       # Date and number formatting
│   │       └── filterUtils.js      # Data filtering utilities
│   └── styles/             # Global styles
│       ├── app.css        # Global styles
│       └── tailwind.css   # Tailwind imports
├── documentation/         # Project documentation
│   ├── README.md          # General project overview
│   ├── Technical_Documentation.md  # Technical documentation
│   ├── User_Guide.md      # End-user documentation
│   ├── UI_Components_Guide.md     # UI components documentation
│   └── Implementation_Notes.md    # Developer notes
└── tests/                  # Test files
    ├── component/          # Component tests
    ├── integration/        # Integration tests
    └── unit/               # Unit tests
```

## Data Model

### Key Data Structures

1. **Employee Data**
   - ID
   - Name
   - Department
   - Location
   - Position
   - Email
   - Joining Date
   - Status

2. **Attendance Records**
   - Employee ID
   - Date
   - Check-in Time
   - Check-out Time
   - Total Hours
   - Status (Present, Absent, WFH, Leave)
   - Location

3. **Leave Records**
   - Leave ID
   - Employee ID
   - Leave Type (Casual, Sick, etc.)
   - From Date
   - To Date
   - Total Days
   - Reason
   - Status (Approved, Pending, Rejected)
   - Applied Date

4. **Organization Structure**
   - Departments
   - Locations
   - Total Employee Count

## Dashboard Components

### 1. KPI Cards

The dashboard displays four key KPI cards at the top:

- **Total Employees:** Currently 177 employees (+4 this month)
- **Present Today:** 146 employees present (91% attendance rate)
- **Pending Approvals:** 18 pending approvals (Leave/WFH/Regularization)
- **Average Check-in:** 09:21 AM at Bengaluru office

### 2. Today's Attendance Table

Displays a detailed table of employee attendance for the current day (September 9, 2025):
- Employee name
- Department
- Location
- Status (Present, WFH, Leave, Absent)
- Check-in time

### 3. Attendance Split Chart

A pie chart showing the breakdown of attendance status for the current day:
- Present: 124 employees
- WFH: 22 employees
- Leave: 15 employees
- OD (On Duty): 7 employees
- Absent: 9 employees

### 4. Check-ins vs Check-outs Chart

An area chart displaying the trend of check-ins and check-outs for the past week, helping identify patterns in attendance behavior.

### 5. Pending Approvals Section

Shows all pending approval requests:
- Request ID
- Request Type (Leave, WFH, Regularization)
- Requested By
- Request Details
- Age of Request
- Action buttons (Approve/Reject)

### 6. Regularization Requests Chart

Bar chart displaying regularization requests over the past 7 days.

## Advanced Features

### Detailed Attendance Management

The dedicated Attendance page provides comprehensive attendance management features:

1. **Advanced Filtering**
   - Date range selection (specific date periods)
   - Employee name and ID search
   - Department and designation filters
   - Location and shift filters
   - Working hours range filters
   - Attendance status filtering

2. **Employee Selection Grid**
   - Visual employee cards with profile information
   - Department-based filtering with quick filters
   - Attendance rate and working hour visualizations
   - Pagination for navigating large employee lists

3. **Employee Detail View**
   - Modal view with comprehensive employee information
   - Recent attendance records table
   - Performance statistics (attendance rate, working hours)
   - Task and project assignment tracking

4. **Data Grouping and Visualization**
   - Attendance records grouped by date
   - Daily attendance statistics (present, absent, partial)
   - Sorting options by department, name, or hours
   - Color-coded status indicators

### Attendance Uploader

A specialized component for bulk uploading attendance data:

1. **File Import**
   - Support for CSV and Excel formats
   - Drag-and-drop interface
   - File validation and error checking

2. **Data Processing**
   - Column mapping for flexible import formats
   - Data validation and error highlighting
   - Progress tracking during import
   - Summary report after import completion

3. **Advanced Options**
   - Date format selection
   - Default status handling for missing entries
   - Duplicate record handling options
   - Error tolerance settings

## Integration with Zoho People

### API Endpoints Used

- `ZOHOPEOPLE.employee.ALL` - All employee data
- `ZOHOPEOPLE.employee.READ` - Individual employee details
- `ZOHOPEOPLE.leave.READ` - Leave records and requests
- `ZOHOPEOPLE.organization.READ` - Organization structure
- `ZOHOPEOPLE.timetracker.all` - Time tracking data
- `zohopeople.attendance.READ` - Attendance records

### Authentication

The dashboard uses OAuth 2.0 for authentication with Zoho People API:
1. Client ID and Client Secret stored in environment variables
2. Access Token and Refresh Token management
3. Automatic token refresh when expired

## Recent Updates

### September 9, 2025

- Updated the Attendance Split Chart title to include specific date: "Attendance Split (September 9, 2025)"
- Simplified the footer text to "© 2025 National Consulting India • Zoho People Dashboard"
- Added attendance data for September 9, 2025
- Added Excel data import functionality for attendance records
- Enhanced the Attendance page with advanced filtering and employee selection grid
- Improved documentation with comprehensive UI Components Guide

## Design Elements

### Color Scheme

- **Primary Color:** Gold (#f59e0b) and derivatives
- **Secondary Color:** Off-white (#fafaf9) gradient
- **Accent Colors:**
  - Blue (#0ea5e9) - For attendance data
  - Green (#22c55e) - For WFH status
  - Amber (#f59e0b) - For leave data
  - Indigo (#6366f1) - For on-duty status
  - Red (#ef4444) - For absence data

### UI Components

- Gradient background with gold and off-white tones
- Card-based layout with subtle shadows
- Responsive grid design that adapts to all screen sizes
- Modern icons from Lucide-svelte library
- Interactive charts with tooltips and hover effects
- Animations for better user experience

## Future Enhancements

1. Mobile application for attendance tracking
2. Integration with biometric devices
3. Advanced analytics and reporting features
4. Employee self-service portal
5. Customizable dashboard widgets
6. Email notifications for approvals
7. Real-time attendance updates via WebSockets
8. AI-powered insights for attendance patterns

## Contact Information

For support or questions:
- Email: it@nationalconsultingindia.com
- Internal Extension: 101

---

© 2025 National Consulting India • Zoho People Dashboard
