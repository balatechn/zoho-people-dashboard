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
src/
├── lib/
│   ├── components/          # Reusable Svelte components
│   │   ├── Header.svelte    # Top navigation
│   │   ├── Sidebar.svelte   # Navigation sidebar
│   │   ├── KPICard.svelte   # KPI display cards
│   │   ├── ChartCard.svelte # Chart components
│   │   ├── TableCard.svelte # Data table components
│   │   └── AttendanceUploader.svelte # File uploader
│   ├── server/
│   │   └── zohoApi.js       # Zoho People API integration
│   ├── sampleData.js        # Sample data structures
│   └── utils/
│       └── excelImporter.js # Excel data import utility
├── routes/
│   ├── api/                 # Backend API endpoints
│   ├── +page.svelte         # Main dashboard page
│   ├── +page.js             # Data loading for dashboard
│   ├── attendance/
│   │   └── +page.svelte     # Attendance management page
│   ├── employees/
│   │   └── +page.svelte     # Employee management page
│   ├── settings/
│   │   └── +page.svelte     # Settings page
│   └── auth/
│       └── callback/        # OAuth callback handling
├── app.html                 # HTML template
└── app.css                  # Global styles and Tailwind
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

- **Total Employees:** Currently 35 employees (+3 this month)
- **Present Today:** 32 employees present (as of September 9, 2025)
- **Pending Approvals:** 3 pending approvals (Leave/WFH/Regularization)
- **Average Check-in:** 10:15 AM at Head Office

### 2. Today's Attendance Table

Displays a detailed table of employee attendance for the current day (September 9, 2025):
- Employee name
- Department
- Location
- Status (Present, WFH, Leave, Absent)
- Check-in and Check-out times
- Total hours worked

### 3. Attendance Split Chart

A pie chart showing the breakdown of attendance status for the current day:
- Present: 32 employees
- WFH: 0 employees
- Leave: 3 employees
- OD (On Duty): 0 employees
- Absent: 0 employees

### 4. Check-ins vs Check-outs Chart

An area chart displaying the trend of check-ins and check-outs for the past week, helping identify patterns in attendance behavior.

### 5. Pending Approvals Table

Shows all pending approval requests:
- Request ID
- Request Type (Leave, WFH, Regularization)
- Requested By
- Request Details
- Age of Request
- Action buttons (Approve/Reject)

### 6. Regularization Requests Chart

Bar chart displaying regularization requests over the past 7 days.

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

## Usage Guide

### Viewing Dashboard

1. The main dashboard displays current day's data automatically
2. Use the date filter to view historical data
3. Filter by location or department using the sidebar filters

### Approving Requests

1. Navigate to the pending approvals section
2. Review the request details
3. Click "Approve" or "Reject" buttons to process

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

### Uploading Attendance Data

1. Use the Attendance Uploader component
2. Import Excel/CSV files with attendance data
3. Map columns if prompted (date, employee ID, check-in, check-out)
4. The system will parse, validate, and process the data
5. View upload progress with real-time feedback

## Future Enhancements

1. Mobile application for attendance tracking
2. Integration with biometric devices
3. Advanced analytics and reporting features
4. Employee self-service portal
5. Customizable dashboard widgets
6. Email notifications for approvals

## Contact Information

For support or questions:
- Email: it@nationalconsultingindia.com
- Internal Extension: 101

---

© 2025 National Consulting India • Zoho People Dashboard
