import { json } from '@sveltejs/kit';
import { ZohoPeopleAPI } from '$lib/server/zohoApi.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
	try {
		const zohoApi = new ZohoPeopleAPI();
		const employeeId = url.searchParams.get('employeeId');
		const fromDate = url.searchParams.get('fromDate');
		const toDate = url.searchParams.get('toDate');
		
		const leave = await zohoApi.getLeaveRecords(employeeId, fromDate, toDate);
		
		return json({
			success: true,
			data: leave,
			employeeId,
			fromDate,
			toDate
		});
	} catch (error) {
		console.error('Error fetching leave records:', error);
		return json({
			success: false,
			error: 'Failed to fetch leave data',
			message: error.message
		}, { status: 500 });
	}
}
