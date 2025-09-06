import { json } from '@sveltejs/kit';
import { ZohoPeopleAPI } from '$lib/server/zohoApi.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const zohoApi = new ZohoPeopleAPI();
		const organization = await zohoApi.getOrganizationData();
		
		return json({
			success: true,
			data: organization
		});
	} catch (error) {
		console.error('Error fetching organization data:', error);
		return json({
			success: false,
			error: 'Failed to fetch organization data',
			message: error.message
		}, { status: 500 });
	}
}
