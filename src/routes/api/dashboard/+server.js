import { json } from '@sveltejs/kit';
import { ZohoPeopleAPI } from '$lib/server/zohoApi.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const zohoApi = new ZohoPeopleAPI();
		const summary = await zohoApi.getDashboardSummary();
		
		return json({
			success: true,
			data: summary,
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		console.error('Error fetching dashboard summary:', error);
		return json({
			success: false,
			error: 'Failed to fetch dashboard data',
			message: error.message,
			timestamp: new Date().toISOString()
		}, { status: 500 });
	}
}
