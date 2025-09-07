import { json } from '@sveltejs/kit';

// Helper function to test basic connectivity to Zoho API
async function testBasicConnectivity(domain) {
	const startTime = Date.now();
	try {
		// Test connectivity to Zoho API base URL
		const response = await fetch(`https://${domain}/people/api/forms`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			signal: AbortSignal.timeout(5000) // 5 second timeout
		});

		const responseTime = Date.now() - startTime;
		
		// Even if we get 401/403, it means the API is reachable
		if (response.status === 401 || response.status === 403) {
			return {
				success: true,
				message: 'Zoho API is reachable (authentication required)',
				responseTime
			};
		} else if (response.ok) {
			return {
				success: true,
				message: 'Zoho API is reachable and responding',
				responseTime
			};
		} else {
			return {
				success: false,
				message: `HTTP ${response.status}: ${response.statusText}`,
				responseTime
			};
		}
	} catch (error) {
		const responseTime = Date.now() - startTime;
		return {
			success: false,
			message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
			responseTime
		};
	}
}

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

			// Test 2: Basic connectivity test - check if Zoho API is reachable
			const connectivityTest = await testBasicConnectivity(config.domain);
			
			// Test 3: Check if we have access token
			if (!config.accessToken) {
				testResults.success = false;
				testResults.message = 'OAuth authorization required. Click "Generate Authorization URL" to get access tokens.';
				testResults.endpoints = {
					'Client ID Validation': {
						success: true,
						message: 'Valid Client ID format',
						responseTime: 0
					},
					'Zoho API Connectivity': connectivityTest,
					'OAuth Authorization': {
						success: false,
						message: 'Access token required - Please complete OAuth flow',
						responseTime: 0
					}
				};
				return json(testResults);
			}

			// Test 4: Try to make API calls if we have access token
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
						message: (error instanceof Error ? error.message : 'Connection failed'),
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
			testResults.message = `Configuration test failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
		}

		return json(testResults);

	} catch (error) {
		console.error('Test connection error:', error);
		return json({
			success: false,
			message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
			endpoints: {}
		}, { status: 500 });
	}
}
