import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file || !(file instanceof File)) {
            return json({
                success: false,
                message: 'No file uploaded or invalid file',
                recordsProcessed: 0
            }, { status: 400 });
        }

        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            return json({
                success: false,
                message: 'File size exceeds 10MB limit',
                recordsProcessed: 0
            }, { status: 400 });
        }

        // Check file type
        const allowedTypes = [
            'text/csv',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];

        if (!allowedTypes.includes(file.type) && 
            !file.name.endsWith('.csv') && 
            !file.name.endsWith('.xlsx')) {
            return json({
                success: false,
                message: 'Invalid file type. Please upload CSV or Excel files only.',
                recordsProcessed: 0
            }, { status: 400 });
        }

        // Read file content
        const fileContent = await file.text();
        
        // Parse CSV (simple implementation)
        const lines = fileContent.split('\n');
        if (lines.length < 2) {
            return json({
                success: false,
                message: 'File appears to be empty or has no data rows',
                recordsProcessed: 0
            }, { status: 400 });
        }

        // Get headers
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        
        // Validate required headers
        const requiredHeaders = [
            'Employee Number', 'First Name', 'Last Name', 'Work Email', 
            'Department', 'Designation', 'Employee Status'
        ];
        
        const missingHeaders = requiredHeaders.filter(required => 
            !headers.some(header => header.toLowerCase().includes(required.toLowerCase()))
        );

        if (missingHeaders.length > 0) {
            return json({
                success: false,
                message: `Missing required columns: ${missingHeaders.join(', ')}`,
                recordsProcessed: 0
            }, { status: 400 });
        }

        // Parse data rows
        const employees = [];
        let validRows = 0;
        let errors = [];

        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue; // Skip empty lines
            
            try {
                const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
                
                if (values.length !== headers.length) {
                    errors.push(`Row ${i + 1}: Column count mismatch`);
                    continue;
                }

                const employee = {};
                headers.forEach((header, index) => {
                    employee[header] = values[index];
                });

                // Basic validation
                if (!employee['Employee Number'] || !employee['First Name'] || !employee['Work Email']) {
                    errors.push(`Row ${i + 1}: Missing required fields`);
                    continue;
                }

                employees.push({
                    employeeNumber: employee['Employee Number'],
                    firstName: employee['First Name'],
                    middleName: employee['Middle Name'] || '',
                    lastName: employee['Last Name'],
                    gender: employee['Gender'],
                    dateOfJoining: employee['Date of Joining'],
                    designation: employee['Designation'],
                    workEmail: employee['Work Email'],
                    department: employee['Department'],
                    workLocation: employee['Worklocation Name'] || 'Head Office',
                    employeeStatus: employee['Employee Status'],
                    personalEmail: employee['Personal Email'] || '',
                    mobileNumber: employee['Mobile Number'] || '',
                    dateOfBirth: employee['Date of Birth'] || ''
                });

                validRows++;
            } catch (error) {
                errors.push(`Row ${i + 1}: ${error.message}`);
            }
        }

        if (validRows === 0) {
            return json({
                success: false,
                message: `No valid employee records found. Errors: ${errors.slice(0, 5).join('; ')}${errors.length > 5 ? '...' : ''}`,
                recordsProcessed: 0
            }, { status: 400 });
        }

        // In a real application, you would save this data to a database
        // For now, we'll just simulate success
        console.log(`Processed ${validRows} employee records:`, employees);

        // Simulate some processing time
        await new Promise(resolve => setTimeout(resolve, 1000));

        return json({
            success: true,
            message: `Successfully processed ${validRows} employee records${errors.length > 0 ? ` (${errors.length} errors skipped)` : ''}`,
            recordsProcessed: validRows,
            errors: errors.length > 0 ? errors.slice(0, 10) : undefined // Return first 10 errors
        });

    } catch (error) {
        console.error('Employee upload error:', error);
        return json({
            success: false,
            message: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            recordsProcessed: 0
        }, { status: 500 });
    }
}
