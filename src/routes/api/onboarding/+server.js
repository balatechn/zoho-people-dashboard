import { json } from '@sveltejs/kit';
import { ZohoPeopleAPI } from '$lib/server/zohoApi.js';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		const zohoApi = new ZohoPeopleAPI();
		const onboarding = await zohoApi.getOnboardingData();
		
		return json({
			success: true,
			data: onboarding
		});
	} catch (error) {
		console.error('Error fetching onboarding data:', error);
		return json({
			success: false,
			error: 'Failed to fetch onboarding data',
			message: error.message
		}, { status: 500 });
	}
}
