import { json } from '@sveltejs/kit';
import { ZohoPeopleAPI } from '$lib/server/zohoApi.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const zohoApi = new ZohoPeopleAPI();
		const employees = await zohoApi.getAllEmployees();
		
		return json({
			success: true,
			data: employees,
			count: employees.length
		});
	} catch (error) {
		console.error('Error fetching employees:', error);
		return json({
			success: false,
			error: 'Failed to fetch employee data',
			message: error.message
		}, { status: 500 });
	}
}
