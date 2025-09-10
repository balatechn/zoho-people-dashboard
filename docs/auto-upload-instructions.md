# Zoho People Dashboard - Automatic Attendance Upload

This document explains how to use the automatic attendance data upload functionality in the Zoho People Dashboard.

## Prerequisites

- Node.js and npm installed
- Excel file with attendance data (default location: `D:/DATA/Zoho People Dashboard/1data/Attend.xlsx`)

## Attendance Data Format

The Excel file should have the following columns:

- **Date**: Date of attendance
- **Employee Id**: Unique employee identifier
- **Name**: Employee name
- **Email**: Employee email
- **Check-in**: Time employee checked in
- **Check-out**: Time employee checked out

Additional columns like Department, Designation, and Location are also supported.

## Automatic Upload Methods

There are several ways to trigger the automatic upload of attendance data:

### 1. Web Interface

Access the auto-upload page through your browser at:

```
http://localhost:5173/auto-upload
```

You can also automatically trigger the upload by appending parameters:

```
http://localhost:5173/auto-upload?auto=true
```

To specify a different file path:

```
http://localhost:5173/auto-upload?filePath=D:/path/to/file.xlsx&auto=true
```

### 2. Command Line Script

Run the PowerShell script to upload attendance data:

```powershell
.\upload-attendance.ps1
```

### 3. Scheduled Task (Windows)

Set up a scheduled task to automatically upload attendance data at specified intervals:

```powershell
.\Schedule-AttendanceUpload.ps1
```

Follow the prompts to configure your schedule preferences.

### 4. Manual API Call

You can also manually call the upload functionality from your code:

```javascript
import { demoAutoUpload } from './src/lib/demoAutoUpload';

async function triggerUpload() {
  try {
    const result = await demoAutoUpload();
    console.log(`Upload ${result.success ? 'succeeded' : 'failed'}`);
    console.log(`Processed ${result.data?.length} records`);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
```

## Troubleshooting

If you encounter issues with the automatic upload:

1. **File not found**: Ensure the Excel file exists at the specified path
2. **Permission errors**: Make sure you have read access to the file
3. **Format issues**: Verify the Excel file has the required columns
4. **Node.js errors**: Check that all dependencies are installed with `npm install`

## Additional Information

The automatic upload functionality uses the following components:

- `src/lib/excelUploader.js`: Core Excel file processing logic
- `src/lib/demoAutoUpload.js`: Function to trigger uploads programmatically
- `src/lib/components/AttendanceUploader.svelte`: UI component for uploads
- `src/routes/auto-upload/+page.svelte`: Auto-upload page
- `upload-attendance.js`: Node.js script for command-line uploads
- `upload-attendance.ps1`: PowerShell script wrapper
- `Schedule-AttendanceUpload.ps1`: PowerShell script to set up scheduled tasks

For any additional help, please refer to the main documentation or contact the system administrator.
