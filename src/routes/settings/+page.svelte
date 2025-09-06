<script>
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Header from '$lib/components/Header.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { Settings, TestTube, Wifi, AlertCircle, CheckCircle, Loader } from 'lucide-svelte';
  import '../../app.css';

  // Stores for API configuration 
  const apiConfig = writable({
    clientId: '1000.FCMJ4WPDJRQ29B5N5C4GVVXOM7O5EW',
    clientSecret: 'b26ee4e0b733c916730af00f6e37a5bd1201024f79',
    redirectUri: 'http://localhost:5173/auth/callback',
    accessToken: '',
    refreshToken: '',
    domain: 'people.zoho.com'
  });

  const testResults = writable({
    status: 'idle', // idle, testing, success, error
    message: '',
    lastTested: null,
    endpoints: {}
  });

  let activeTab = 'config';
  let config = {};
  let testing = false;
  let testData = {};
  let mounted = false;

  onMount(() => {
    mounted = true;
    apiConfig.subscribe(value => config = value);
    testResults.subscribe(value => testData = value);
    loadSavedConfig();
  });

  async function loadSavedConfig() {
    try {
      const response = await fetch('/api/settings/config');
      if (response.ok) {
        const savedConfig = await response.json();
        apiConfig.update(current => ({ ...current, ...savedConfig }));
      }
    } catch (error) {
      console.error('Failed to load saved config:', error);
    }
  }

  async function saveConfig() {
    try {
      const response = await fetch('/api/settings/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        alert('Configuration saved successfully!');
      } else {
        alert('Failed to save configuration');
      }
    } catch (error) {
      console.error('Failed to save config:', error);
      alert('Failed to save configuration');
    }
  }

  async function testConnection() {
    testing = true;
    testResults.update(current => ({
      ...current,
      status: 'testing',
      message: 'Testing API connection...'
    }));

    try {
      const response = await fetch('/api/settings/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      const result = await response.json();
      
      testResults.update(current => ({
        ...current,
        status: result.success ? 'success' : 'error',
        message: result.message,
        lastTested: new Date().toLocaleString(),
        endpoints: result.endpoints || {}
      }));
    } catch (error) {
      testResults.update(current => ({
        ...current,
        status: 'error',
        message: 'Failed to test connection: ' + error.message,
        lastTested: new Date().toLocaleString()
      }));
    } finally {
      testing = false;
    }
  }

  async function generateAuthUrl() {
    const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoPeople.employee.ALL,ZohoPeople.attendance.READ,ZohoPeople.leave.READ,ZohoPeople.forms.ALL,ZohoPeople.timetracker.READ&client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(config.redirectUri)}&access_type=offline`;
    
    window.open(authUrl, '_blank');
  }

  function updateConfig(field, value) {
    apiConfig.update(current => ({
      ...current,
      [field]: value
    }));
  }
</script>

<svelte:head>
	<title>Settings - Zoho People Dashboard</title>
	<meta name="description" content="Configure Zoho People API integration and test connectivity" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100 text-zinc-800">
	<!-- Header -->
	<Header />

	<!-- Layout -->
	<div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12">
		<!-- Sidebar -->
		<aside class="lg:col-span-2">
			<Sidebar currentPath="/settings" />
		</aside>
		
		<!-- Main Content -->
		<main class="lg:col-span-10 space-y-6">
			<!-- Page Header -->
			<div class="card">
				<div class="card-content">
					<div class="flex items-center gap-3 mb-2">
						<Settings class="w-8 h-8 text-gold-600" />
						<h1 class="text-3xl font-bold text-zinc-900">Settings</h1>
					</div>
					<p class="text-zinc-600">Configure Zoho People API integration and test connectivity</p>
				</div>
			</div>

			<!-- Tabs -->
			<div class="flex space-x-1">
				<button
					class="px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'config' 
						? 'bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-lg' 
						: 'card hover:bg-gold-50'}"
					on:click={() => activeTab = 'config'}
				>
					<Wifi class="w-4 h-4 inline mr-2" />
					API Configuration
				</button>
				<button
					class="px-6 py-3 rounded-lg font-medium transition-all duration-200 {activeTab === 'testing' 
						? 'bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-lg' 
						: 'card hover:bg-gold-50'}"
					on:click={() => activeTab = 'testing'}
				>
					<TestTube class="w-4 h-4 inline mr-2" />
					Testing & Status
				</button>
			</div>

        <!-- Configuration Tab -->
        {#if activeTab === 'config'}
        <div class="space-y-6">
          <!-- API Credentials Card -->
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Zoho People API Credentials</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Client ID</label>
                <input
                  type="text"
                  bind:value={config.clientId}
                  on:input={(e) => updateConfig('clientId', e.target.value)}
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="1000.XXXXXXXXXXXXXXX"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Client Secret</label>
                <input
                  type="password"
                  bind:value={config.clientSecret}
                  on:input={(e) => updateConfig('clientSecret', e.target.value)}
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Enter your client secret"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Redirect URI</label>
                <input
                  type="url"
                  bind:value={config.redirectUri}
                  on:input={(e) => updateConfig('redirectUri', e.target.value)}
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="http://localhost:5173/auth/callback"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                <select
                  bind:value={config.domain}
                  on:change={(e) => updateConfig('domain', e.target.value)}
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="people.zoho.com">people.zoho.com (Global)</option>
                  <option value="people.zoho.in">people.zoho.in (India)</option>
                  <option value="people.zoho.eu">people.zoho.eu (Europe)</option>
                  <option value="people.zoho.com.cn">people.zoho.com.cn (China)</option>
                </select>
              </div>
            </div>

            <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 class="font-semibold text-blue-900 mb-2">OAuth Authorization</h3>
              <p class="text-blue-700 text-sm mb-4">
                After configuring your credentials, you need to authorize the application to access your Zoho People data.
              </p>
              <button
                on:click={generateAuthUrl}
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Authorization URL
              </button>
            </div>

            <div class="flex gap-4 mt-8">
              <button
                on:click={saveConfig}
                class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
              >
                Save Configuration
              </button>
              <button
                on:click={testConnection}
                disabled={testing}
                class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {#if testing}
                  <Loader class="w-4 h-4 inline mr-2 animate-spin" />
                  Testing...
                {:else}
                  <TestTube class="w-4 h-4 inline mr-2" />
                  Test Connection
                {/if}
              </button>
            </div>
          </div>

          <!-- Token Management Card -->
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Token Management</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Access Token</label>
                <textarea
                  bind:value={config.accessToken}
                  on:input={(e) => updateConfig('accessToken', e.target.value)}
                  rows="3"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Access token will appear here after authorization"
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Refresh Token</label>
                <textarea
                  bind:value={config.refreshToken}
                  on:input={(e) => updateConfig('refreshToken', e.target.value)}
                  rows="3"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Refresh token will appear here after authorization"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        {/if}

        <!-- Testing Tab -->
        {#if activeTab === 'testing'}
        <div class="space-y-6">
          <!-- Connection Status Card -->
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-900">Connection Status</h2>
              <button
                on:click={testConnection}
                disabled={testing}
                class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg disabled:opacity-50"
              >
                {#if testing}
                  <Loader class="w-4 h-4 inline mr-2 animate-spin" />
                  Testing...
                {:else}
                  Refresh Test
                {/if}
              </button>
            </div>

            <div class="flex items-center gap-3 mb-4">
              {#if testData.status === 'success'}
                <CheckCircle class="w-6 h-6 text-green-500" />
                <span class="text-green-700 font-medium">Connected Successfully</span>
              {:else if testData.status === 'error'}
                <AlertCircle class="w-6 h-6 text-red-500" />
                <span class="text-red-700 font-medium">Connection Failed</span>
              {:else if testData.status === 'testing'}
                <Loader class="w-6 h-6 text-blue-500 animate-spin" />
                <span class="text-blue-700 font-medium">Testing Connection...</span>
              {:else}
                <AlertCircle class="w-6 h-6 text-gray-400" />
                <span class="text-gray-600 font-medium">Not Tested</span>
              {/if}
            </div>

            {#if testData.message}
              <div class="p-4 rounded-lg {testData.status === 'success' ? 'bg-green-50 border border-green-200' : testData.status === 'error' ? 'bg-red-50 border border-red-200' : 'bg-blue-50 border border-blue-200'}">
                <p class="text-sm {testData.status === 'success' ? 'text-green-800' : testData.status === 'error' ? 'text-red-800' : 'text-blue-800'}">{testData.message}</p>
              </div>
            {/if}

            {#if testData.lastTested}
              <p class="text-sm text-gray-600 mt-4">Last tested: {testData.lastTested}</p>
            {/if}
          </div>

          <!-- API Endpoints Status -->
          {#if Object.keys(testData.endpoints).length > 0}
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">API Endpoints Status</h2>
            
            <div class="space-y-4">
              {#each Object.entries(testData.endpoints) as [endpoint, status]}
                <div class="flex items-center justify-between p-4 rounded-lg border {status.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}">
                  <div class="flex items-center gap-3">
                    {#if status.success}
                      <CheckCircle class="w-5 h-5 text-green-500" />
                    {:else}
                      <AlertCircle class="w-5 h-5 text-red-500" />
                    {/if}
                    <span class="font-medium">{endpoint}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-sm {status.success ? 'text-green-700' : 'text-red-700'}">
                      {status.success ? 'Working' : 'Failed'}
                    </span>
                    {#if status.responseTime}
                      <div class="text-xs text-gray-500">{status.responseTime}ms</div>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
          </div>
          {/if}

          <!-- Sample Data Preview -->
          <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Sample Data Preview</h2>
            <p class="text-gray-600 mb-4">Once connected, you'll see real data from your Zoho People account here.</p>
            
            <div class="bg-gray-50 rounded-lg p-4">
              <pre class="text-sm text-gray-700 overflow-x-auto">
{JSON.stringify(testData.endpoints || {}, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        {/if}
      </main>
    </div>
  </div>
