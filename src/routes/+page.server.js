import { sampleDashboardData } from '$lib/sampleData.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	try {
		// For now, we'll use sample data instead of trying to connect to Zoho API
		// This allows the dashboard to work without valid Zoho credentials
		console.log('Loading dashboard with sample data...');
		
		return {
			...sampleDashboardData,
			rawData: {
				employees: [],
				attendance: [],
				organization: {}
			},
			apiStatus: 'Using sample data - Configure Zoho API credentials in .env to fetch real data'
		};
	} catch (error) {
		console.error('Error loading dashboard data:', error);
		
		// Always return fallback data so the page doesn't crash
		return {
			...sampleDashboardData,
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
