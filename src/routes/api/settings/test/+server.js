import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	try {
		const config = await request.json();
		
		if (!config.clientId || !config.clientSecret) {
			return json({
				success: false,
				message: 'Client ID and Client Secret are required',
				endpoints: {}
			});
		}

		const testResults = {
			success: false,
			message: '',
			endpoints: {}
		};

		// Test basic configuration
		try {
			// Test 1: Validate Client ID format
			if (!config.clientId.startsWith('1000.')) {
				throw new Error('Invalid Client ID format. Should start with "1000."');
			}

			// Test 2: Check if we have access token
			if (!config.accessToken) {
				testResults.success = false;
				testResults.message = 'No access token found. Please complete OAuth authorization first.';
				testResults.endpoints = {
					'OAuth Authorization': {
						success: false,
						message: 'Access token required',
						responseTime: 0
					}
				};
				return json(testResults);
			}

			// Test 3: Try to make API calls if we have access token
			const baseUrl = `https://${config.domain}/people/api`;
			const headers = {
				'Authorization': `Zoho-oauthtoken ${config.accessToken}`,
				'Content-Type': 'application/json'
			};

			const endpoints = [
				{ name: 'Organization Info', url: `${baseUrl}/organization` },
				{ name: 'Employee List', url: `${baseUrl}/employee` },
				{ name: 'Attendance Data', url: `${baseUrl}/attendance` },
				{ name: 'Leave Records', url: `${baseUrl}/leave` }
			];

			let successCount = 0;
			const endpointResults = {};

			for (const endpoint of endpoints) {
				const startTime = Date.now();
				try {
					const response = await fetch(endpoint.url, {
						method: 'GET',
						headers,
						signal: AbortSignal.timeout(10000) // 10 second timeout
					});

					const responseTime = Date.now() - startTime;
					
					if (response.ok) {
						successCount++;
						endpointResults[endpoint.name] = {
							success: true,
							message: 'Connected successfully',
							responseTime
						};
					} else {
						endpointResults[endpoint.name] = {
							success: false,
							message: `HTTP ${response.status}: ${response.statusText}`,
							responseTime
						};
					}
				} catch (error) {
					const responseTime = Date.now() - startTime;
					endpointResults[endpoint.name] = {
						success: false,
						message: error.message || 'Connection failed',
						responseTime
					};
				}
			}

			testResults.endpoints = endpointResults;
			
			if (successCount === endpoints.length) {
				testResults.success = true;
				testResults.message = `All ${successCount} API endpoints are working correctly!`;
			} else if (successCount > 0) {
				testResults.success = false;
				testResults.message = `${successCount}/${endpoints.length} endpoints working. Check individual endpoint status below.`;
			} else {
				testResults.success = false;
				testResults.message = 'All API endpoints failed. Please check your credentials and authorization.';
			}

		} catch (error) {
			testResults.success = false;
			testResults.message = `Configuration test failed: ${error.message}`;
		}

		return json(testResults);

	} catch (error) {
		console.error('Test connection error:', error);
		return json({
			success: false,
			message: `Test failed: ${error.message}`,
			endpoints: {}
		}, { status: 500 });
	}
}
