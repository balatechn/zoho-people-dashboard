import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, fetch }) {
	const code = url.searchParams.get('code');
	const error = url.searchParams.get('error');
	
	if (error) {
		// Redirect to settings with error
		throw redirect(302, `/settings?error=${encodeURIComponent(error)}`);
	}
	
	if (!code) {
		// Redirect to settings if no code
		throw redirect(302, '/settings?error=No authorization code received');
	}

	try {
		// Exchange code for tokens
		const tokenResponse = await fetch('/api/auth/token', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ code })
		});

		const result = await tokenResponse.json();
		
		if (result.success) {
			// Redirect to settings with success
			throw redirect(302, '/settings?success=Authorization completed successfully');
		} else {
			throw redirect(302, `/settings?error=${encodeURIComponent(result.message)}`);
		}
	} catch (error) {
		console.error('OAuth callback error:', error);
		throw redirect(302, `/settings?error=${encodeURIComponent('Failed to complete authorization')}`);
	}
}
