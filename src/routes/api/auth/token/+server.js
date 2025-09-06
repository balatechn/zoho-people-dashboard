import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const { code } = await request.json();
		
		if (!code) {
			return json({ success: false, message: 'Authorization code is required' }, { status: 400 });
		}

		const clientId = '1000.FCMJ4WPDJRQ29B5N5C4GVVXOM7O5EW';
		const clientSecret = 'b26ee4e0b733c916730af00f6e37a5bd1201024f79';
		const redirectUri = 'http://localhost:5173/auth/callback';

		// Exchange authorization code for access token
		const tokenUrl = 'https://accounts.zoho.com/oauth/v2/token';
		const tokenParams = new URLSearchParams({
			grant_type: 'authorization_code',
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
			code: code
		});

		const tokenResponse = await fetch(tokenUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: tokenParams
		});

		if (!tokenResponse.ok) {
			const errorText = await tokenResponse.text();
			console.error('Token exchange failed:', errorText);
			return json({ 
				success: false, 
				message: `Token exchange failed: ${tokenResponse.status} ${tokenResponse.statusText}` 
			}, { status: 400 });
		}

		const tokenData = await tokenResponse.json();
		
		if (tokenData.error) {
			return json({ 
				success: false, 
				message: `OAuth error: ${tokenData.error}` 
			}, { status: 400 });
		}

		// Return the tokens (in a real app, you'd save these securely)
		console.log('OAuth tokens received:', {
			access_token: tokenData.access_token ? '***RECEIVED***' : 'MISSING',
			refresh_token: tokenData.refresh_token ? '***RECEIVED***' : 'MISSING',
			expires_in: tokenData.expires_in
		});

		return json({
			success: true,
			message: 'Authorization completed successfully',
			tokens: {
				access_token: tokenData.access_token,
				refresh_token: tokenData.refresh_token,
				expires_in: tokenData.expires_in,
				token_type: tokenData.token_type
			}
		});

	} catch (error) {
		console.error('Token exchange error:', error);
		return json({ 
			success: false, 
			message: `Failed to exchange token: ${error instanceof Error ? error.message : 'Unknown error'}` 
		}, { status: 500 });
	}
}
