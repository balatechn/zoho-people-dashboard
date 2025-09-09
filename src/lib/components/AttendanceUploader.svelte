<script>
  import { onMount } from 'svelte';
  import { parseAttendanceFromExcel, validateAttendanceData } from '$lib/utils/excelImporter';
  import { fade } from 'svelte/transition';
  import { Upload, X, Check, AlertTriangle } from 'lucide-svelte';
  
  export let onUploadComplete = () => {};
  
  let fileInput;
  let dragActive = false;
  let isUploading = false;
  let uploadProgress = 0;
  let uploadError = null;
  let uploadSuccess = false;
  let processedData = [];
  let fileName = '';
  let fileSize = '';
  let previewData = [];
  let showPreview = false;
  let validationErrors = [];
  
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = true;
  }
  
  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = false;
  }
  
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    dragActive = false;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }
  
  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }
  
  function handleFiles(files) {
    const file = files[0];
    
    if (!file) return;
    
    // Check file extension
    const extension = file.name.split('.').pop().toLowerCase();
    
    if (extension !== 'csv' && extension !== 'xlsx' && extension !== 'xls') {
      uploadError = 'Please upload a CSV or Excel file (.csv, .xlsx, .xls)';
      return;
    }
    
    fileName = file.name;
    fileSize = formatFileSize(file.size);
    uploadError = null;
    uploadSuccess = false;
    processedData = [];
    
    // For demonstration, we'll only handle CSV files
    // In a real implementation, you would use a library like SheetJS to handle Excel files too
    if (extension === 'csv') {
      readCsvFile(file);
    } else {
      uploadError = 'Excel format support is coming soon. Please use CSV format for now.';
    }
  }
  
  function readCsvFile(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvContent = e.target.result;
        processAndPreviewCsv(csvContent);
      } catch (err) {
        console.error('Error processing file:', err);
        uploadError = `Error processing file: ${err.message}`;
      }
    };
    
    reader.onerror = () => {
      uploadError = 'Error reading file';
    };
    
    reader.readAsText(file);
  }
  
  function processAndPreviewCsv(csvContent) {
    try {
      // Split by lines and then by commas
      const lines = csvContent.split('\n');
      
      // Simple CSV parsing (for production, use a proper CSV parser)
      const rows = lines.map(line => 
        line.split(',').map(cell => 
          cell.replace(/^"(.*)"$/, '$1').trim()
        )
      );
      
      if (rows.length < 2) {
        uploadError = 'File does not contain enough data';
        return;
      }
      
      // Process the CSV data using our utility
      processedData = parseAttendanceFromExcel(rows);
      
      // Validate the processed data
      const validationResult = validateAttendanceData(processedData);
      validationErrors = validationResult.errors;
      
      // Show preview of the first few records
      previewData = processedData.slice(0, 5);
      showPreview = true;
      
      if (validationResult.valid) {
        uploadSuccess = true;
      }
    } catch (err) {
      console.error('Error processing CSV:', err);
      uploadError = `Error processing CSV: ${err.message}`;
    }
  }
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  
  function confirmUpload() {
    // Start simulated upload
    isUploading = true;
    uploadProgress = 0;
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      uploadProgress += 10;
      
      if (uploadProgress >= 100) {
        clearInterval(progressInterval);
        finishUpload();
      }
    }, 200);
  }
  
  function finishUpload() {
    // Simulate processing delay
    setTimeout(() => {
      isUploading = false;
      uploadSuccess = true;
      
      // In a real app, this is where you'd save the processed data
      // to your store or send it to your API
      
      // Notify parent component that upload is complete
      onUploadComplete(processedData);
    }, 500);
  }
  
  function cancelUpload() {
    showPreview = false;
    processedData = [];
    previewData = [];
    fileName = '';
    fileSize = '';
    uploadSuccess = false;
    uploadError = null;
  }
</script>

<div 
  class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
  aria-labelledby="attendance-uploader-title"
>
  <div class="px-4 py-3 bg-gradient-to-r from-amber-500 to-gold-600 flex justify-between items-center">
    <h2 id="attendance-uploader-title" class="text-white font-medium flex items-center gap-2">
      <Upload class="h-4 w-4" />
      Attendance Data Upload
    </h2>
  </div>
  
  <div class="p-6">
    {#if isUploading}
      <!-- Upload Progress -->
      <div transition:fade class="text-center py-6">
        <div class="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div class="bg-gradient-to-r from-amber-500 to-gold-500 h-3 rounded-full transition-all duration-300"
              style="width: {uploadProgress}%"></div>
        </div>
        <p class="text-sm text-gray-600 mt-2">Processing {fileName}...</p>
      </div>
    {:else if uploadSuccess && !showPreview}
      <!-- Success Message -->
      <div transition:fade class="text-center py-6">
        <div class="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
          <Check class="h-6 w-6 text-green-600" />
        </div>
        <h3 class="text-xl font-semibold text-gray-800 mb-2">Upload Successful!</h3>
        <p class="text-gray-600">
          {processedData.length} attendance records have been processed and imported.
        </p>
      </div>
    {:else if showPreview}
      <!-- Data Preview -->
      <div transition:fade>
        <div class="flex justify-between items-center mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-800">Data Preview</h3>
            <p class="text-sm text-gray-600">
              {processedData.length} records found in {fileName} ({fileSize})
            </p>
          </div>
          <button 
            on:click={cancelUpload}
            class="text-gray-400 hover:text-gray-600"
            aria-label="Cancel upload"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
        
        {#if validationErrors.length > 0}
          <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div class="flex items-start">
              <AlertTriangle class="h-5 w-5 text-red-500 mt-0.5 mr-2" />
              <div>
                <h4 class="text-sm font-medium text-red-800">Validation Errors</h4>
                <ul class="mt-1 text-xs text-red-700 list-disc pl-5">
                  {#each validationErrors as error, i}
                    {#if i < 5}
                      <li>{error}</li>
                    {:else if i === 5}
                      <li>...and {validationErrors.length - 5} more errors</li>
                    {/if}
                  {/each}
                </ul>
              </div>
            </div>
          </div>
        {/if}
        
        <div class="overflow-x-auto mb-4">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First In</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Out</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each previewData as record, i}
                <tr class="text-sm">
                  <td class="px-3 py-2 whitespace-nowrap">{record.date}</td>
                  <td class="px-3 py-2 whitespace-nowrap">
                    <div>
                      <div class="font-medium text-gray-900">{record.employeeName}</div>
                      <div class="text-xs text-gray-500">{record.employeeId}</div>
                    </div>
                  </td>
                  <td class="px-3 py-2 whitespace-nowrap">{record.firstIn}</td>
                  <td class="px-3 py-2 whitespace-nowrap">{record.lastOut || '-'}</td>
                  <td class="px-3 py-2 whitespace-nowrap">{record.totalHours}</td>
                  <td class="px-3 py-2 whitespace-nowrap">
                    <span class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium {
                      record.status === 'Present' 
                        ? 'bg-green-100 text-green-800'
                        : record.status === 'Partial'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }">
                      {record.status}
                    </span>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        
        {#if previewData.length < processedData.length}
          <p class="text-xs text-gray-500 mb-4">Showing {previewData.length} of {processedData.length} records</p>
        {/if}
        
        <div class="flex justify-end gap-3">
          <button 
            on:click={cancelUpload}
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            on:click={confirmUpload}
            disabled={validationErrors.length > 0}
            class="px-4 py-2 bg-gradient-to-r from-amber-500 to-gold-600 rounded-md text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Import Data
          </button>
        </div>
      </div>
    {:else}
      <!-- File Upload Area -->
      <div
        on:dragover={handleDragOver}
        on:dragleave={handleDragLeave}
        on:drop={handleDrop}
        class="border-2 border-dashed rounded-lg p-8 text-center {
          dragActive ? 'border-gold-500 bg-gold-50' : 'border-gray-300 hover:border-gold-400'
        } transition-colors duration-150"
      >
        <div class="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-3">
          <Upload class="h-6 w-6 text-gold-600" />
        </div>
        
        <p class="mb-2 text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
        <p class="mb-4 text-xs text-gray-500">CSV or Excel files only</p>
        
        <button 
          on:click={() => fileInput.click()}
          class="px-4 py-2 bg-gradient-to-r from-amber-500 to-gold-600 rounded-md text-white text-sm font-medium hover:opacity-90 inline-flex items-center gap-1"
        >
          <Upload class="h-4 w-4" />
          Select File
        </button>
        
        <input
          type="file"
          bind:this={fileInput}
          on:change={handleFileChange}
          accept=".csv,.xlsx,.xls"
          class="hidden"
          aria-label="Upload attendance data file"
        />
      </div>
      
      {#if uploadError}
        <div class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertTriangle class="h-5 w-5 text-red-500 mt-0.5 mr-2" />
          <p class="text-sm text-red-700">{uploadError}</p>
        </div>
      {/if}
      
      <div class="mt-4">
        <h3 class="text-sm font-medium text-gray-900 mb-2">Supported Formats</h3>
        <ul class="text-xs text-gray-600 space-y-1 list-disc pl-5">
          <li>CSV file with header row (recommended)</li>
          <li>Excel file (.xlsx) with attendance data</li>
          <li>Required columns: Date, Employee Id, Name, Email, Check-in, Check-out, etc.</li>
        </ul>
      </div>
    {/if}
  </div>
</div>
