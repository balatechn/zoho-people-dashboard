import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Filter, Download, Search, Clock, TrendingUp, Users, AlertCircle, CheckCircle, Upload, FileText, Settings } from 'lucide-react';

const AttendanceDashboard = () => {
  // State management
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    fromDate: '2025-08-01',
    toDate: '2025-08-31'
  });
  
  // Filter states
  const [filters, setFilters] = useState({
    employeeId: '',
    employeeName: '',
    department: '',
    designation: '',
    location: '',
    shift: '',
    earlyEntry: '',
    lateEntry: '',
    earlyExit: '',
    lateExit: '',
    minTotalHours: '',
    maxTotalHours: ''
  });

  const [showFilters, setShowFilters] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Sample data based on your Early_Late Report
  const sampleAttendanceData = [
    {
      employeeId: 'NCPL001',
      employeeName: 'Mohammed Farooq',
      emailId: 'farooq@nationalconsultingindia.com',
      reportingTo: '',
      department: 'Management',
      designation: 'EA - Director',
      location: 'Head Office',
      role: 'Admin',
      date: '01-Aug-2025',
      firstIn: '09:07 AM',
      lastOut: '07:34 PM',
      totalHours: '10:27',
      totalHoursDecimal: 10.45,
      earlyEntry: '+00:53',
      lateEntry: '-',
      earlyExit: '-',
      lateExit: '+00:34',
      netHours: '+01:27',
      shiftName: '[10:00 AM - 07:00 PM] Shift C'
    },
    {
      employeeId: 'NCPL002',
      employeeName: 'Shruthi Nandeesh',
      emailId: 'shruthi.d@nationalconsultingindia.com',
      reportingTo: 'Mohammed Faisal',
      department: 'HR',
      designation: 'Asst Manager HR',
      location: 'Head Office',
      role: 'Manager',
      date: '01-Aug-2025',
      firstIn: '10:16 AM',
      lastOut: '09:47 AM',
      totalHours: '23:31',
      totalHoursDecimal: 23.52,
      earlyEntry: '-',
      lateEntry: '-01:16',
      earlyExit: '-',
      lateExit: '+15:47',
      netHours: '+14:31',
      shiftName: '[09:00 AM - 06:00 PM] Shift B'
    },
    {
      employeeId: 'NCPL010',
      employeeName: 'Abhiram C',
      emailId: 'abhiram.c@nationalconsultingindia.com',
      reportingTo: 'Harshdeep Singh',
      department: 'Marketing',
      designation: 'Graphic Designer',
      location: 'Head Office',
      role: 'Team member',
      date: '01-Aug-2025',
      firstIn: '09:29 AM',
      lastOut: '06:38 PM',
      totalHours: '09:09',
      totalHoursDecimal: 9.15,
      earlyEntry: '-',
      lateEntry: '-00:29',
      earlyExit: '-',
      lateExit: '+00:38',
      netHours: '+00:09',
      shiftName: '[09:00 AM - 06:00 PM] Shift B'
    }
  ];

  // Initialize with sample data
  useEffect(() => {
    setAttendanceData(sampleAttendanceData);
    setFilteredData(sampleAttendanceData);
  }, []);

  // Fetch attendance data from API
  const fetchAttendanceData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        fromDate: dateRange.fromDate,
        toDate: dateRange.toDate
      });
      
      if (filters.employeeId) {
        params.append('employeeId', filters.employeeId);
      }

      const response = await fetch(`/api/timetracker?${params}`);
      const result = await response.json();
      
      if (result.success) {
        setAttendanceData(result.data || []);
        applyFilters(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch attendance data');
        // Use sample data on error
        setAttendanceData(sampleAttendanceData);
        setFilteredData(sampleAttendanceData);
      }
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      setError('Failed to connect to server. Using sample data.');
      // Use sample data on error
      setAttendanceData(sampleAttendanceData);
      setFilteredData(sampleAttendanceData);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to data
  const applyFilters = (data = attendanceData) => {
    let filtered = [...data];

    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (!value) return;

      switch (key) {
        case 'employeeId':
          filtered = filtered.filter(item => 
            item.employeeId.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'employeeName':
          filtered = filtered.filter(item => 
            item.employeeName.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'department':
          filtered = filtered.filter(item => 
            item.department.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'designation':
          filtered = filtered.filter(item => 
            item.designation.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'location':
          filtered = filtered.filter(item => 
            item.location.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'shift':
          filtered = filtered.filter(item => 
            item.shiftName.toLowerCase().includes(value.toLowerCase())
          );
          break;
        case 'minTotalHours':
          filtered = filtered.filter(item => 
            item.totalHoursDecimal >= parseFloat(value)
          );
          break;
        case 'maxTotalHours':
          filtered = filtered.filter(item => 
            item.totalHoursDecimal <= parseFloat(value)
          );
          break;
        // Add more filter cases as needed
      }
    });

    setFilteredData(filtered);
  };

  // Effect to apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters, attendanceData]);

  // Statistics calculations
  const statistics = useMemo(() => {
    const totalEmployees = new Set(filteredData.map(item => item.employeeId)).size;
    const totalRecords = filteredData.length;
    const avgHours = filteredData.length > 0 
      ? (filteredData.reduce((sum, item) => sum + item.totalHoursDecimal, 0) / filteredData.length).toFixed(2)
      : 0;
    
    const earlyEntries = filteredData.filter(item => item.earlyEntry && item.earlyEntry.startsWith('+')).length;
    const lateEntries = filteredData.filter(item => item.lateEntry && item.lateEntry.startsWith('-')).length;
    const earlyExits = filteredData.filter(item => item.earlyExit && item.earlyExit.startsWith('-')).length;
    const lateExits = filteredData.filter(item => item.lateExit && item.lateExit.startsWith('+')).length;

    return {
      totalEmployees,
      totalRecords,
      avgHours,
      earlyEntries,
      lateEntries,
      earlyExits,
      lateExits
    };
  }, [filteredData]);

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      alert('Please upload a CSV or Excel file');
      return;
    }

    setUploadFile(file);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/attendance/upload', {
        method: 'POST',
        body: formData
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      const result = await response.json();
      
      if (result.success) {
        alert('File uploaded successfully!');
        fetchAttendanceData(); // Refresh data
      } else {
        alert('Upload failed: ' + result.message);
      }
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploadFile(null);
      setUploadProgress(0);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      'Employee ID', 'Employee Name', 'Email ID', 'Reporting To', 'Department',
      'Designation', 'Location', 'Role', 'Date', 'First In', 'Last Out',
      'Total Hours', 'Early Entry', 'Late Entry', 'Early Exit', 'Late Exit',
      'Net Hours', 'Shift Name'
    ];

    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        row.employeeId, row.employeeName, row.emailId, row.reportingTo,
        row.department, row.designation, row.location, row.role, row.date,
        row.firstIn, row.lastOut, row.totalHours, row.earlyEntry, row.lateEntry,
        row.earlyExit, row.lateExit, row.netHours, row.shiftName
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_report_${dateRange.fromDate}_to_${dateRange.toDate}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      employeeId: '',
      employeeName: '',
      department: '',
      designation: '',
      location: '',
      shift: '',
      earlyEntry: '',
      lateEntry: '',
      earlyExit: '',
      lateExit: '',
      minTotalHours: '',
      maxTotalHours: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Clock className="w-8 h-8 text-amber-600" />
                Attendance Dashboard
              </h1>
              <p className="mt-1 text-gray-600">Track and analyze employee attendance patterns</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.location.href = '/settings'}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                value={dateRange.fromDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, fromDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                value={dateRange.toDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, toDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={fetchAttendanceData}
                disabled={loading}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Fetch Data
                  </>
                )}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Excel</label>
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 bg-white"
              />
              {uploadProgress > 0 && (
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                  type="text"
                  placeholder="Employee ID"
                  value={filters.employeeId}
                  onChange={(e) => setFilters(prev => ({ ...prev, employeeId: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={filters.employeeName}
                  onChange={(e) => setFilters(prev => ({ ...prev, employeeName: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={filters.department}
                  onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Designation"
                  value={filters.designation}
                  onChange={(e) => setFilters(prev => ({ ...prev, designation: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
                <input
                  type="text"
                  placeholder="Shift"
                  value={filters.shift}
                  onChange={(e) => setFilters(prev => ({ ...prev, shift: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
                <input
                  type="number"
                  placeholder="Min Hours"
                  value={filters.minTotalHours}
                  onChange={(e) => setFilters(prev => ({ ...prev, minTotalHours: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
                <input
                  type="number"
                  placeholder="Max Hours"
                  value={filters.maxTotalHours}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxTotalHours: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.totalEmployees}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Records</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.totalRecords}</p>
              </div>
              <FileText className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Hours</p>
                <p className="text-3xl font-bold text-gray-900">{statistics.avgHours}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Late Entries</p>
                <p className="text-3xl font-bold text-red-600">{statistics.lateEntries}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-lg border border-amber-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Attendance Records</h2>
            <button
              onClick={exportToCSV}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Out</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Early Entry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Entry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Early Exit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late Exit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{record.employeeName}</div>
                      <div className="text-sm text-gray-500">{record.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.department}</div>
                      <div className="text-sm text-gray-500">{record.designation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.firstIn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.lastOut}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.totalHours}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${record.earlyEntry.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`}>
                        {record.earlyEntry}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${record.lateEntry.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
                        {record.lateEntry}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${record.earlyExit.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
                        {record.earlyExit}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm ${record.lateExit.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`}>
                        {record.lateExit}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${record.netHours.startsWith('+') ? 'text-green-600' : record.netHours.startsWith('-') ? 'text-red-600' : 'text-gray-500'}`}>
                        {record.netHours}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.shiftName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No attendance records found for the selected criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;