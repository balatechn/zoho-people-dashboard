# Zoho People Dashboard - Technical Documentation

## Development Guide

**Version:** 1.0.0  
**Last Updated:** September 9, 2025  
**Framework:** SvelteKit with TailwindCSS

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Git
- Zoho People API credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/balatechn/zoho-people-dashboard.git

# Navigate to project directory
cd zoho-people-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Zoho API credentials

# Start development server
npm run dev
```

### Environment Variables

```
ZOHO_CLIENT_ID=your_zoho_client_id
ZOHO_CLIENT_SECRET=your_zoho_client_secret
ZOHO_REDIRECT_URI=http://localhost:5173/auth/callback
ZOHO_REFRESH_TOKEN=your_zoho_refresh_token
ZOHO_ACCESS_TOKEN=your_zoho_access_token
ZOHO_PEOPLE_API_URL=https://people.zoho.com/people/api
```

## Component Documentation

### KPICard.svelte

```javascript
/**
 * KPI Card Component
 * 
 * @component
 * @param {string} title - Title of the KPI card
 * @param {string} value - Main value to display
 * @param {string} subtitle - Subtitle or context for the value
 * @param {Component} icon - Lucide icon component
 * @param {string} gradient - CSS gradient string for the card
 */
```

### ChartCard.svelte

```javascript
/**
 * Chart Card Component
 * 
 * @component
 * @param {string} title - Chart title
 * @param {Component} icon - Lucide icon component
 * @param {string} chartType - Type of chart (pie, bar, area)
 * @param {Array} data - Chart data array
 */
```

### TableCard.svelte

```javascript
/**
 * Table Card Component
 * 
 * @component
 * @param {string} title - Table title
 * @param {Component} icon - Lucide icon component
 * @param {Array} data - Table data array
 * @param {string} type - Table type (attendance, approvals)
 */
```

### AttendanceUploader.svelte

```javascript
/**
 * Attendance Upload Component
 * 
 * @component
 * @param {Function} onUpload - Callback when file is uploaded
 * @param {Function} onProgress - Callback for upload progress
 * @param {Array} supportedFormats - Array of supported file formats
 * @param {Object} options - Additional configuration options
 */
```

### StatusBadge.svelte

```javascript
/**
 * Status Badge Component
 * 
 * @component
 * @param {string} status - Status value ('Present', 'WFH', 'Leave', 'Absent', 'OD')
 * @param {boolean} large - Whether to use large size variant
 * @param {boolean} outline - Whether to use outline style instead of filled
 * @returns {JSX.Element} - Color-coded badge based on status
 */
```

### ApprovalCard.svelte

```javascript
/**
 * Approval Request Card Component
 * 
 * @component
 * @param {string} id - Request identifier
 * @param {string} type - Request type (e.g., 'Regularization', 'Leave', 'WFH')
 * @param {string} requestedBy - Name of employee who made the request
 * @param {string} requestDetails - Details about what is being requested
 * @param {string} timeAgo - Time elapsed since request was made
 * @param {Function} onApprove - Callback for approval action
 * @param {Function} onReject - Callback for rejection action
 */
```

## Data Loading Pattern

The dashboard uses SvelteKit's load function to fetch data:

```javascript
// +page.js
export function load() {
  // Fetch data from API or use sample data
  const dashboardData = {
    kpis: {...},
    charts: {...},
    tables: {...}
  };
  
  return dashboardData;
}
```

## API Integration

### Zoho People API Integration

The `src/lib/server/zohoApi.js` module handles all API interactions:

```javascript
/**
 * Fetches attendance data from Zoho People API
 * @param {string} fromDate - Start date (DD-MM-YYYY)
 * @param {string} toDate - End date (DD-MM-YYYY)
 * @returns {Promise<Array>} - Attendance records
 */
export async function getAttendanceData(fromDate, toDate) {
  // Authentication logic
  // API call
  // Data transformation
  // Error handling
}
```

### Authentication Flow

1. Initialize with client credentials
2. Get authorization code via OAuth redirect
3. Exchange code for access and refresh tokens
4. Store tokens securely
5. Use tokens for API requests
6. Handle automatic token refresh

## Component Hierarchy

```
App
└── Layout
    ├── Header
    │   └── Navigation Menu
    ├── Sidebar
    │   ├── Navigation Links
    │   └── Filter Controls
    └── Main Content
        ├── KPICards
        ├── ChartCards
        │   ├── AttendanceSplitChart
        │   ├── CheckInOutChart
        │   └── RegularizationChart
        └── TableCards
            ├── AttendanceTable
            └── ApprovalsTable
```

## Data Flow Architecture

1. API or sample data is loaded via `+page.js`
2. Data is passed to `+page.svelte` as the `data` prop
3. `+page.svelte` distributes data to appropriate components
4. Components render visualizations based on their specific data needs

## Custom Utilities

### excelImporter.js

```javascript
/**
 * Parses Excel/CSV files and converts to attendance data format
 * @param {File} file - Uploaded Excel/CSV file
 * @returns {Promise<Array>} - Parsed attendance data
 */
export async function parseAttendanceFile(file) {
  // File parsing logic
  // Data validation
  // Format conversion
  // Error handling
}
```

### attendanceUtils.js

```javascript
/**
 * Groups attendance records by date for better organization and display
 * @param {Array} records - Array of attendance records
 * @param {string} sortBy - Sort option ('department', 'name', or 'time')
 * @returns {Object} - Records grouped by date with internal sorting
 */
export function groupAttendanceByDate(records, sortBy = 'department') {
  // Grouping logic
  // Sorting implementation
  // Returns date-based object structure
}

/**
 * Calculates employee attendance statistics and metrics
 * @param {string} employeeId - Employee ID to calculate stats for
 * @param {Array} attendanceData - All attendance records
 * @returns {Object} - Stats including attendance rate, hours, trends
 */
export function getEmployeeStats(employeeId, attendanceData) {
  // Statistics calculation
  // Performance metrics
  // Trend analysis
}

/**
 * Enhanced filtering system for attendance records
 * @param {Array} data - Raw attendance data
 * @param {Object} filters - Filter criteria
 * @param {Object} dateRange - From and to dates
 * @returns {Array} - Filtered attendance records
 */
export function applyAttendanceFilters(data, filters, dateRange) {
  // Date range filtering
  // Employee filtering
  // Department and location filtering
  // Status and hours filtering
}
```

## Styling

The project uses TailwindCSS with custom theme extensions:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'gold': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        'offwhite': {
          50: '#fafaf9',
          100: '#f5f5f4',
          // ...other shades
        }
      }
    }
  }
}
```

## Testing

### Unit Testing

```bash
# Run tests
npm test
```

### Component Testing

Components are tested using Svelte Testing Library.

Example test:

```javascript
// KPICard.test.js
import { render, screen } from '@testing-library/svelte';
import KPICard from '../src/lib/components/KPICard.svelte';
import { Users } from 'lucide-svelte';

test('renders KPI card with correct props', () => {
  render(KPICard, { 
    title: 'Test KPI', 
    value: '123', 
    subtitle: 'Test subtitle',
    icon: Users,
    gradient: 'from-gold-400 to-gold-600'
  });
  
  expect(screen.getByText('Test KPI')).toBeInTheDocument();
  expect(screen.getByText('123')).toBeInTheDocument();
  expect(screen.getByText('Test subtitle')).toBeInTheDocument();
});
```

## Build and Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Deployment

The project is configured for deployment on Netlify:

```
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"
  functions = "functions"

[[redirects]]
  from = "/*"
  to = "/"
  status = 200
```

## Performance Optimization

1. Lazy loading of chart components
2. Memoization of expensive calculations
3. Efficient reactive updates
4. Image optimization
5. Server-side rendering of initial content

## Security Considerations

1. Environment variables for sensitive credentials
2. No client-side storage of tokens
3. API rate limiting
4. Input validation
5. Content Security Policy

## Troubleshooting Common Issues

### API Authentication Errors

If you encounter authentication errors:
1. Check if your Zoho API tokens are valid
2. Verify the token expiration and refresh mechanism
3. Ensure correct scopes are requested during authentication

### Chart Rendering Issues

If charts fail to render:
1. Check browser console for errors
2. Verify data format matches expected structure
3. Test with sample data to isolate the issue

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch
3. Follow the code style using Prettier
4. Write tests for new features
5. Submit a pull request

## Code Style and Standards

This project follows:
- Prettier for code formatting
- ESLint for code quality
- JSDoc for documentation
- Semantic commit messages

---

© 2025 National Consulting India • Zoho People Dashboard
