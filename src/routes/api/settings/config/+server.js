import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		// Return default config with provided credentials
		return json({
			clientId: '1000.FCMJ4WPDJRQ29B5N5C4GVVXOM7O5EW',
			clientSecret: 'b26ee4e0b733c916730af00f6e37a5bd1201024f79',
			redirectUri: 'http://localhost:5173/auth/callback',
			accessToken: '',
			refreshToken: '',
			domain: 'people.zoho.com'
		});
	} catch (error) {
		return json({
			clientId: '1000.FCMJ4WPDJRQ29B5N5C4GVVXOM7O5EW',
			clientSecret: 'b26ee4e0b733c916730af00f6e37a5bd1201024f79',
			redirectUri: 'http://localhost:5173/auth/callback',
			accessToken: '',
			refreshToken: '',
			domain: 'people.zoho.com'
		});
	}
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const config = await request.json();
		
		// For now, just return success
		// In a real implementation, you would save to a secure storage
		console.log('Saving configuration:', {
			clientId: config.clientId,
			redirectUri: config.redirectUri,
			domain: config.domain
			// Don't log sensitive data like secrets and tokens
		});
		
		return json({ success: true, message: 'Configuration saved successfully' });
	} catch (error) {
		console.error('Failed to save configuration:', error);
		return json({ success: false, message: 'Failed to save configuration' }, { status: 500 });
	}
}
