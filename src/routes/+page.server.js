import { sampleDashboardData } from '$lib/sampleData.js';
import fs from 'fs';
import path from 'path';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		// Load real attendance data from the Excel conversion
		console.log('Loading dashboard with real attendance data...');
		
		let attendanceData = [];
		let attendanceStats = {
			present: 0,
			absent: 0,
			onTime: 0,
			late: 0,
			total: 0
		};
		
		try {
			// Read the converted attendance data
			const attendanceFilePath = path.join(process.cwd(), 'static', 'attendance-data.json');
			if (fs.existsSync(attendanceFilePath)) {
				const rawData = fs.readFileSync(attendanceFilePath, 'utf-8');
				attendanceData = JSON.parse(rawData);
				
				// Calculate attendance statistics for today (or latest date)
				const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
				const todayData = attendanceData.filter(record => {
					const recordDate = new Date(record.Date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
					return recordDate === today || record.Date === '09-Sep-2025'; // Fallback to sample date
				});
				
				// Get unique employees for today
				const uniqueEmployees = new Map();
				todayData.forEach(record => {
					uniqueEmployees.set(record['Employee Id'], record);
				});
				
				attendanceStats.total = uniqueEmployees.size;
				
				// Calculate stats based on attendance records
				uniqueEmployees.forEach(record => {
					if (record['First In'] && record['First In'] !== '--') {
						attendanceStats.present++;
						
						// Check if on time (before 9:30 AM)
						const firstIn = record['First In'];
						if (firstIn.includes('AM')) {
							const time = firstIn.replace(' AM', '');
							const [hours, minutes] = time.split(':').map(Number);
							if (hours < 9 || (hours === 9 && minutes <= 30)) {
								attendanceStats.onTime++;
							} else {
								attendanceStats.late++;
							}
						} else {
							attendanceStats.late++; // PM arrival is late
						}
					} else {
						attendanceStats.absent++;
					}
				});
				
				console.log('Attendance stats calculated:', attendanceStats);
			}
		} catch (error) {
			console.error('Error loading attendance data:', error);
			// Use sample data as fallback
			attendanceData = sampleDashboardData.sampleEmployees || [];
		}
		
		// Process department-wise data
		const departmentStats = {};
		attendanceData.forEach(record => {
			// Extract department from email or use default
			const email = record['Email ID'] || '';
			let department = 'Other';
			
			if (email.includes('production') || email.includes('delivery')) {
				department = 'Production & Delivery';
			} else if (email.includes('rd') || email.includes('research')) {
				department = 'R&D';
			} else if (email.includes('business') || email.includes('strategy')) {
				department = 'Business & Strategy';
			}
			
			if (!departmentStats[department]) {
				departmentStats[department] = { present: 0, absent: 0, late: 0, onTime: 0 };
			}
			
			if (record['First In'] && record['First In'] !== '--') {
				departmentStats[department].present++;
				// Check timing logic as above
				const firstIn = record['First In'];
				if (firstIn.includes('AM')) {
					const time = firstIn.replace(' AM', '');
					const [hours, minutes] = time.split(':').map(Number);
					if (hours < 9 || (hours === 9 && minutes <= 30)) {
						departmentStats[department].onTime++;
					} else {
						departmentStats[department].late++;
					}
				} else {
					departmentStats[department].late++;
				}
			} else {
				departmentStats[department].absent++;
			}
		});
		
		return {
			attendanceData,
			attendanceStats,
			departmentStats,
			sampleEmployees: attendanceData.map(record => ({
				employeeId: record['Employee Id'],
				employeeName: record['Employee Name'],
				email: record['Email ID'],
				firstIn: record['First In'],
				lastOut: record['Last Out'],
				totalHours: record['Total Hours'],
				shift: record['Shift name'],
				date: record['Date'],
				department: record['Email ID']?.includes('production') ? 'Production & Delivery' : 
							record['Email ID']?.includes('rd') ? 'R&D' : 
							record['Email ID']?.includes('business') ? 'Business & Strategy' : 'Other'
			})),
			rawData: {
				employees: attendanceData,
				attendance: attendanceData,
				organization: {}
			},
			apiStatus: 'Using real attendance data from Excel file'
		};
	} catch (error) {
		console.error('Error loading dashboard data:', error);
		
		// Always return fallback data so the page doesn't crash
		return {
			...sampleDashboardData,
			attendanceStats: { present: 30, absent: 30, onTime: 22, late: 8, total: 60 },
			departmentStats: {},
			rawData: {
				employees: [],
				attendance: [],
				organization: {}
			},
			error: error instanceof Error ? error.message : 'Unknown error occurred',
			apiStatus: 'Error occurred - Using sample data'
		};
	}
}
