import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	return json({
		success: true,
		message: 'Zoho People Dashboard API is running!',
		timestamp: new Date().toISOString(),
		endpoints: [
			'/api/employees',
			'/api/attendance',
			'/api/leave',
			'/api/onboarding',
			'/api/offboarding',
			'/api/organization',
			'/api/timetracker',
			'/api/dashboard'
		]
	});
}
