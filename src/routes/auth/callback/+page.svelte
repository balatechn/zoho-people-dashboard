<script>
  import { onMount } from 'svelte';
  import { Loader } from 'lucide-svelte';

  onMount(() => {
    // This page will redirect automatically via +page.server.js
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center">
  <div class="text-center">
    <Loader class="w-8 h-8 text-amber-600 animate-spin mx-auto mb-4" />
    <h1 class="text-2xl font-bold text-gray-900 mb-2">Processing Authorization</h1>
    <p class="text-gray-600">Please wait while we complete the setup...</p>
  </div>
</div>
