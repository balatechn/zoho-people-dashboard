import { json } from '@sveltejs/kit';
import { ZohoPeopleAPI } from '$lib/server/zohoApi.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	try {
		const zohoApi = new ZohoPeopleAPI();
		const fromDate = url.searchParams.get('fromDate');
		const toDate = url.searchParams.get('toDate');
		const employeeId = url.searchParams.get('employeeId');
		
		const timetracker = await zohoApi.getTimeTrackerData(fromDate, toDate, employeeId);
		
		return json({
			success: true,
			data: timetracker,
			fromDate,
			toDate,
			employeeId
		});
	} catch (error) {
		console.error('Error fetching timetracker data:', error);
		return json({
			success: false,
			error: 'Failed to fetch timetracker data',
			message: error.message
		}, { status: 500 });
	}
}
