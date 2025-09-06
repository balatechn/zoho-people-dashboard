import { json } from '@sveltejs/kit';
import { ZohoPeopleAPI } from '$lib/server/zohoApi.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	try {
		const zohoApi = new ZohoPeopleAPI();
		const fromDate = url.searchParams.get('fromDate') || new Date().toISOString().split('T')[0];
		const toDate = url.searchParams.get('toDate') || new Date().toISOString().split('T')[0];
		
		const attendance = await zohoApi.getAttendance(fromDate, toDate);
		
		return json({
			success: true,
			data: attendance,
			fromDate,
			toDate
		});
	} catch (error) {
		console.error('Error fetching attendance:', error);
		return json({
			success: false,
			error: 'Failed to fetch attendance data',
			message: error.message
		}, { status: 500 });
	}
}
