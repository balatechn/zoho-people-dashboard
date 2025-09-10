<script>
  // Script for manually uploading attendance data
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  onMount(() => {
    // Get the file path from query params if available
    const urlParams = new URLSearchParams(window.location.search);
    const filePath = urlParams.get('path') || 'D:\\DATA\\Zoho People Dashboard\\1data\\Attend.xlsx';
    
    // Redirect to settings page with file path
    goto(`/settings?tab=data&section=attendance&filePath=${encodeURIComponent(filePath)}`);
  });
</script>

<div class="p-8 text-center">
  <h1 class="text-2xl font-bold mb-4">Redirecting...</h1>
  <p>You are being redirected to the attendance upload page.</p>
</div>
