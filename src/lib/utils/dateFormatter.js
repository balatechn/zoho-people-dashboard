/**
 * Utility functions for date formatting and manipulation
 */

/**
 * Format date to display in a user-friendly format
 * @param {string|Date} dateInput - Date string in various formats or Date object
 * @param {string} format - Format type: 'short', 'medium', 'long', 'time'
 * @returns {string} - Formatted date string
 */
export function formatDate(dateInput, format = 'medium') {
  if (!dateInput) return '-';
  
  let date;
  if (typeof dateInput === 'string') {
    // Handle various date formats
    if (dateInput.includes('-')) {
      // Check if it's in the format DD-MMM-YYYY (like 08-Sep-2025)
      if (dateInput.split('-')[1].length === 3) {
        const parts = dateInput.split('-');
        const day = parseInt(parts[0], 10);
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(parts[1]);
        const year = parseInt(parts[2], 10);
        date = new Date(year, month, day);
      } else {
        // Otherwise assume YYYY-MM-DD
        date = new Date(dateInput);
      }
    } else {
      // If it's not a recognized format, return as is
      return dateInput;
    }
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    return String(dateInput);
  }
  
  if (isNaN(date.getTime())) {
    return String(dateInput); // Return original as string if invalid date
  }
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    
    case 'medium':
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    
    case 'long':
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    
    case 'time':
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      });
    
    default:
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
  }
}

/**
 * Get current date in format YYYY-MM-DD
 * @returns {string} Date string in YYYY-MM-DD format
 */
export function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Check if a date is today
 * @param {string|Date} dateInput - Date to check
 * @returns {boolean} - True if date is today
 */
export function isToday(dateInput) {
  if (!dateInput) return false;
  
  let date;
  if (typeof dateInput === 'string') {
    // Handle various date formats
    if (dateInput.includes('-')) {
      // Check if it's in the format DD-MMM-YYYY (like 08-Sep-2025)
      if (dateInput.split('-')[1].length === 3) {
        const parts = dateInput.split('-');
        const day = parseInt(parts[0], 10);
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(parts[1]);
        const year = parseInt(parts[2], 10);
        date = new Date(year, month, day);
      } else {
        // Otherwise assume YYYY-MM-DD
        date = new Date(dateInput);
      }
    } else {
      return false; // Unknown format
    }
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    return false;
  }
  
  const today = new Date();
  return date.getDate() === today.getDate() &&
         date.getMonth() === today.getMonth() &&
         date.getFullYear() === today.getFullYear();
}
