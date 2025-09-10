import { c as create_ssr_component, v as validate_component, e as escape, m as missing_component, f as each, h as add_attribute } from "../../chunks/ssr.js";
import { H as Header, S as Sidebar, U as Users, C as Clock, a as Shield_check, B as Briefcase } from "../../chunks/app.js";
import { I as Icon } from "../../chunks/Icon.js";
const Activity = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M22 12h-4l-3 9L9 3l-3 9H2" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "activity" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Bell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
      }
    ],
    ["path", { "d": "M10.3 21a1.94 1.94 0 0 0 3.4 0" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "bell" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Calendar_check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "line",
      {
        "x1": "16",
        "x2": "16",
        "y1": "2",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "8",
        "y1": "2",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "21",
        "y1": "10",
        "y2": "10"
      }
    ],
    ["path", { "d": "m9 16 2 2 4-4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "calendar-check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Calendar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "line",
      {
        "x1": "16",
        "x2": "16",
        "y1": "2",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "8",
        "y1": "2",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "21",
        "y1": "10",
        "y2": "10"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "calendar" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const User_check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }],
    ["polyline", { "points": "16 11 18 13 22 9" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "user-check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ChartCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { icon } = $$props;
  let { chartType = "area" } = $$props;
  let { data = [] } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.chartType === void 0 && $$bindings.chartType && chartType !== void 0) $$bindings.chartType(chartType);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="card"><div class="card-header"><h3 class="text-lg font-semibold text-gold-800 flex items-center gap-2">${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "h-5 w-5" }, {}, {})} ${escape(title)}</h3></div> <div class="card-content">${`${`${`<div class="h-64 flex items-center justify-center text-zinc-500" data-svelte-h="svelte-1b3758m">Loading chart...</div>`}`}`}</div></div>`;
});
const KPICard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { value } = $$props;
  let { subtitle } = $$props;
  let { icon } = $$props;
  let { gradient = "from-gold-400 to-gold-600" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0) $$bindings.value(value);
  if ($$props.subtitle === void 0 && $$bindings.subtitle && subtitle !== void 0) $$bindings.subtitle(subtitle);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.gradient === void 0 && $$bindings.gradient && gradient !== void 0) $$bindings.gradient(gradient);
  return `<div class="card overflow-hidden group hover:shadow-xl transition-all duration-300"><div class="card-header flex flex-row items-center justify-between pb-3"><h3 class="text-sm font-medium text-zinc-600">${escape(title)}</h3> <div class="${"p-2 rounded-lg bg-gradient-to-r " + escape(gradient, true) + " text-white shadow-sm"}">${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "h-4 w-4" }, {}, {})}</div></div> <div class="card-content pt-0">${`<div class="text-3xl font-bold text-zinc-800 mb-1" data-svelte-h="svelte-1n7ftuy">-</div> <div class="text-xs text-zinc-500" data-svelte-h="svelte-arp0ro">Loading...</div>`}</div></div>`;
});
function formatDate(dateInput, format = "medium") {
  if (!dateInput) return "-";
  let date;
  if (typeof dateInput === "string") {
    if (dateInput.includes("-")) {
      if (dateInput.split("-")[1].length === 3) {
        const parts = dateInput.split("-");
        const day = parseInt(parts[0], 10);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].indexOf(parts[1]);
        const year = parseInt(parts[2], 10);
        date = new Date(year, month, day);
      } else {
        date = new Date(dateInput);
      }
    } else {
      return dateInput;
    }
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    return String(dateInput);
  }
  if (isNaN(date.getTime())) {
    return String(dateInput);
  }
  switch (format) {
    case "short":
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });
    case "medium":
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    case "long":
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric"
      });
    case "time":
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      });
    default:
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
  }
}
function getStatusColor(status) {
  const colors = {
    "Present": "bg-emerald-100 text-emerald-700",
    "WFH": "bg-blue-100 text-blue-700",
    "Leave": "bg-amber-100 text-amber-700",
    "OD": "bg-purple-100 text-purple-700",
    "Partial": "bg-blue-100 text-blue-700",
    "Absent": "bg-red-100 text-red-700"
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}
const TableCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { icon } = $$props;
  let { data = [] } = $$props;
  let { type = "attendance" } = $$props;
  let { showDate = false } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  if ($$props.showDate === void 0 && $$bindings.showDate && showDate !== void 0) $$bindings.showDate(showDate);
  return `<div class="card"><div class="card-header"><h3 class="text-lg font-semibold text-gold-800 flex items-center gap-2">${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "h-5 w-5" }, {}, {})} ${escape(title)}</h3></div> <div class="card-content">${type === "attendance" ? ` <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b border-gold-200 bg-gold-50/50 text-left text-xs uppercase text-zinc-600 font-medium">${showDate ? `<th class="px-4 py-3" data-svelte-h="svelte-s4obp5">Date</th>` : ``} <th class="px-4 py-3" data-svelte-h="svelte-1ok2zbd">Employee</th> <th class="px-4 py-3" data-svelte-h="svelte-1ccxjhr">Department</th> <th class="px-4 py-3" data-svelte-h="svelte-cnmn4r">Status</th> <th class="px-4 py-3" data-svelte-h="svelte-15voa4y">Check-in/out</th> <th class="px-4 py-3" data-svelte-h="svelte-1iq7w3c">Hours</th></tr></thead> <tbody>${each(data, (row, i) => {
    return `<tr class="border-b border-gold-100 last:border-none hover:bg-gold-25 transition-colors">${showDate ? `<td class="px-4 py-3 text-zinc-600">${escape(formatDate(row.date))}</td>` : ``} <td class="px-4 py-3 font-medium text-zinc-800">${escape(row.name || row.employeeName)}</td> <td class="px-4 py-3 text-zinc-600">${escape(row.dept || row.department)}</td> <td class="px-4 py-3"><span class="${"rounded-full px-3 py-1 text-xs font-medium " + escape(getStatusColor(row.status), true)}">${escape(row.status)} </span></td> <td class="px-4 py-3 text-zinc-600 font-mono text-xs">${row.time ? `${escape(row.time)}` : `${row.firstIn && row.lastOut ? `${escape(row.firstIn)} - ${escape(row.lastOut !== "-" ? row.lastOut : "...")}` : `${row.checkIn ? `${escape(row.checkIn)}${escape(row.checkOut ? " - " + row.checkOut : "")}` : `-`}`}`}</td> <td class="px-4 py-3 text-zinc-600 font-medium text-xs">${escape(row.hours || row.totalHours || row.workingHours || "-")}</td> </tr>`;
  })}</tbody></table></div>` : `${type === "approvals" ? ` <div class="space-y-4">${each(data, (approval) => {
    return `<div class="rounded-xl border border-gold-200 p-4 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gold-25"><div class="flex items-center justify-between text-sm mb-2"><div class="font-semibold text-gold-800">${escape(approval.type)} • <span class="text-zinc-500 font-normal">${escape(approval.id)}</span></div> <div class="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">${escape(approval.age)} ago</div></div> <div class="text-xs text-zinc-600 mb-3">${escape(approval.by)} — ${escape(approval.for)}</div> <div class="flex gap-2"><button class="btn-primary text-xs px-3 py-1.5" data-svelte-h="svelte-1jz8d8l">Approve</button> <button class="btn-secondary text-xs px-3 py-1.5" data-svelte-h="svelte-1c2vqcn">Reject
							</button></div> </div>`;
  })}</div>` : ``}`}</div></div>`;
});
const css = {
  code: ".animate-spin.svelte-1q01t3c{animation:svelte-1q01t3c-spin 1s linear infinite}@keyframes svelte-1q01t3c-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\r\\n  import { onMount } from 'svelte';\\r\\n  import { \\r\\n    Users, Clock, CalendarCheck, ShieldCheck, Bell, Briefcase, UserCheck,\\r\\n    Activity, ChevronRight, Calendar\\r\\n  } from 'lucide-svelte';\\r\\n  import Header from '$lib/components/Header.svelte';\\r\\n  import Sidebar from '$lib/components/Sidebar.svelte';\\r\\n  import ChartCard from '$lib/components/ChartCard.svelte';\\r\\n  import KPICard from '$lib/components/KPICard.svelte';\\r\\n  import TableCard from '$lib/components/TableCard.svelte';\\r\\n  import '../app.css';\\r\\n\\r\\n  /** @type {import('./$types').PageData} */\\r\\n  export let data;\\r\\n\\r\\n  // Data Sources - Combine what's already loaded from +page.js with any additional data we need\\r\\n  let employeeData = data.sampleEmployees || [];\\r\\n  let loading = false;\\r\\n  let error = null;\\r\\n  \\r\\n  // Today's date\\r\\n  const today = new Date(2025, 8, 9); // September 9, 2025 for consistency with sample data\\r\\n  const formattedDate = today.toLocaleDateString('en-GB', {\\r\\n    day: '2-digit',\\r\\n    month: 'short',\\r\\n    year: 'numeric'\\r\\n  });\\r\\n  \\r\\n  // Dashboard state\\r\\n  let selectedLocation = 'All Locations';\\r\\n  let selectedDepartment = 'All Departments';\\r\\n  let dateRange = {\\r\\n    fromDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)\\r\\n      .toISOString().split('T')[0],\\r\\n    toDate: new Date().toISOString().split('T')[0]\\r\\n  };\\r\\n  \\r\\n  // Get unique locations and departments for filters\\r\\n  $: locations = ['All Locations', ...new Set(employeeData.map(r => r.workLocation || 'Head Office'))];\\r\\n  $: departments = ['All Departments', ...new Set(employeeData.map(r => r.department))];\\r\\n\\r\\n  // Calculate dashboard metrics based on employee data\\r\\n  $: filteredEmployees = employeeData.filter(record => {\\r\\n    // Apply location filter\\r\\n    const empLocation = record.workLocation || 'Head Office';\\r\\n    if (selectedLocation !== 'All Locations' && empLocation !== selectedLocation) {\\r\\n      return false;\\r\\n    }\\r\\n    \\r\\n    // Apply department filter\\r\\n    if (selectedDepartment !== 'All Departments' && record.department !== selectedDepartment) {\\r\\n      return false;\\r\\n    }\\r\\n    \\r\\n    return true;\\r\\n  });\\r\\n  \\r\\n  // Calculate employee metrics based on current data\\r\\n  $: metrics = {\\r\\n    totalEmployees: filteredEmployees.length,\\r\\n    activeEmployees: Math.floor(filteredEmployees.length * 0.95), // 95% active\\r\\n    onLeave: 3, // Sample data\\r\\n    newHires: 2, // Sample data\\r\\n    pendingApprovals: data.kpis?.pendingApprovals || 3,\\r\\n    departments: [...new Set(filteredEmployees.map(emp => emp.department))].length,\\r\\n    locations: [...new Set(filteredEmployees.map(emp => emp.location))].length,\\r\\n    avgYearsExperience: \\"3.2\\" // Sample data\\r\\n  };\\r\\n  \\r\\n  // Create trend data - use the data already loaded from +page.js or create sample\\r\\n  $: trendData = data.charts?.trendData || [];\\r\\n  \\r\\n  // Create department-wise data based on filtered employees\\r\\n  $: departmentData = createDepartmentData(filteredEmployees);\\r\\n  \\r\\n  // Create department-wise data based on employees\\r\\n  function createDepartmentData(employees) {\\r\\n    /** @type {{[dept: string]: {count: number, percentage: number}}} */\\r\\n    const deptCounts = {};\\r\\n    \\r\\n    // Count by department\\r\\n    employees.forEach((employee) => {\\r\\n      if (!deptCounts[employee.department]) {\\r\\n        deptCounts[employee.department] = {\\r\\n          count: 0,\\r\\n          percentage: 0\\r\\n        };\\r\\n      }\\r\\n      deptCounts[employee.department].count += 1;\\r\\n    });\\r\\n    \\r\\n    // Calculate percentages\\r\\n    const total = employees.length;\\r\\n    Object.keys(deptCounts).forEach(dept => {\\r\\n      deptCounts[dept].percentage = total > 0 ? Math.round((deptCounts[dept].count / total) * 100) : 0;\\r\\n    });\\r\\n    \\r\\n    // Convert to array for charts\\r\\n    return Object.entries(deptCounts).map(([dept, data]) => ({\\r\\n      department: dept,\\r\\n      count: data.count,\\r\\n      percentage: data.percentage\\r\\n    }));\\r\\n  }\\r\\n  \\r\\n  // Create pending approvals data - use what's already loaded from page data\\r\\n  const pendingApprovals = data.tables.pendingApprovals || [\\r\\n    { id: \\"RG-1042\\", type: \\"Regularization\\", by: \\"Karthik P\\", for: \\"Sep 03 • 09:20\\", age: \\"2d\\" },\\r\\n    { id: \\"LV-2218\\", type: \\"Leave\\", by: \\"Shwetha S\\", for: \\"Sep 09-10 • Casual\\", age: \\"1d\\" },\\r\\n    { id: \\"WF-0081\\", type: \\"WFH\\", by: \\"Jason C\\", for: \\"Sep 06 • Full Day\\", age: \\"3h\\" }\\r\\n  ];\\r\\n  \\r\\n  // Regularization request trend data - use what's already loaded from page data\\r\\n  const regularizationData = data.charts.regularizationData || [\\r\\n    { date: \\"Aug 29\\", count: 8 },\\r\\n    { date: \\"Aug 30\\", count: 6 },\\r\\n    { date: \\"Aug 31\\", count: 4 },\\r\\n    { date: \\"Sep 01\\", count: 12 },\\r\\n    { date: \\"Sep 02\\", count: 10 },\\r\\n    { date: \\"Sep 03\\", count: 7 },\\r\\n    { date: \\"Sep 04\\", count: 9 },\\r\\n  ];\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n  <title>Home Dashboard - Zoho People</title>\\r\\n  <meta name=\\"description\\" content=\\"Zoho People Management Dashboard\\" />\\r\\n</svelte:head>\\r\\n\\r\\n<div class=\\"min-h-screen bg-gradient-to-br from-amber-50 via-white to-gold-50 text-zinc-800\\">\\r\\n  <!-- Header -->\\r\\n  <Header />\\r\\n\\r\\n  <!-- Layout -->\\r\\n  <div class=\\"mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12\\">\\r\\n    <!-- Sidebar -->\\r\\n    <aside class=\\"lg:col-span-2\\">\\r\\n      <Sidebar currentPath=\\"/\\" />\\r\\n    </aside>\\r\\n\\r\\n    <!-- Main Content -->\\r\\n    <main class=\\"lg:col-span-10 space-y-6\\">\\r\\n      <!-- Welcome Banner -->\\r\\n      <div class=\\"card overflow-hidden shadow-lg border-0\\">\\r\\n        <div class=\\"bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 card-header py-5\\">\\r\\n          <div class=\\"flex items-center justify-between\\">\\r\\n            <div class=\\"flex items-center gap-3\\">\\r\\n              <div class=\\"h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner\\">\\r\\n                <Activity class=\\"h-6 w-6\\" />\\r\\n              </div>\\r\\n              <div>\\r\\n                <h1 class=\\"text-2xl font-bold text-white\\">Welcome to Zoho People</h1>\\r\\n                <p class=\\"text-amber-100\\">Dashboard Overview • {formattedDate}</p>\\r\\n              </div>\\r\\n            </div>\\r\\n            <div class=\\"flex items-center gap-3\\">\\r\\n              <div class=\\"flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm text-white\\">\\r\\n                <Bell class=\\"h-4 w-4\\" />\\r\\n                <span class=\\"text-sm font-medium\\">{metrics.pendingApprovals} Pending Approvals</span>\\r\\n              </div>\\r\\n            </div>\\r\\n          </div>\\r\\n        </div>\\r\\n      </div>\\r\\n\\r\\n      <!-- Loading State -->\\r\\n      {#if loading}\\r\\n        <div class=\\"flex justify-center items-center py-12\\">\\r\\n          <div class=\\"animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600\\"></div>\\r\\n          <span class=\\"ml-3 text-amber-800\\">Loading dashboard data...</span>\\r\\n        </div>\\r\\n      {:else if error}\\r\\n        <!-- Error State -->\\r\\n        <div class=\\"bg-red-50 border border-red-200 rounded-lg p-6 text-center\\">\\r\\n          <h2 class=\\"text-red-800 text-xl mb-2\\">Error Loading Data</h2>\\r\\n          <p class=\\"text-red-600\\">{error}</p>\\r\\n          <button class=\\"mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700\\">\\r\\n            Retry\\r\\n          </button>\\r\\n        </div>\\r\\n      {:else}\\r\\n        <!-- Dashboard Content -->\\r\\n        \\r\\n        <!-- Filters Bar -->\\r\\n        <div class=\\"flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100\\">\\r\\n          <div class=\\"text-sm text-gray-600 font-medium\\">Filter by:</div>\\r\\n          \\r\\n          <div class=\\"flex-1\\">\\r\\n            <select\\r\\n              bind:value={selectedLocation}\\r\\n              class=\\"w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent\\"\\r\\n            >\\r\\n              {#each locations as location}\\r\\n                <option value={location}>{location}</option>\\r\\n              {/each}\\r\\n            </select>\\r\\n          </div>\\r\\n          \\r\\n          <div class=\\"flex-1\\">\\r\\n            <select\\r\\n              bind:value={selectedDepartment}\\r\\n              class=\\"w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent\\"\\r\\n            >\\r\\n              {#each departments as department}\\r\\n                <option value={department}>{department}</option>\\r\\n              {/each}\\r\\n            </select>\\r\\n          </div>\\r\\n          \\r\\n          <a href=\\"/employees\\" class=\\"text-gold-600 hover:text-gold-800 text-sm font-medium flex items-center\\">\\r\\n            Advanced Filters\\r\\n            <ChevronRight class=\\"h-4 w-4\\" />\\r\\n          </a>\\r\\n        </div>\\r\\n\\r\\n        <!-- KPI Cards -->\\r\\n        <div class=\\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4\\">\\r\\n          <KPICard \\r\\n            title=\\"Total Employees\\" \\r\\n            value={metrics.totalEmployees} \\r\\n            subtitle=\\"+4 this month\\" \\r\\n            icon={Users} \\r\\n            gradient=\\"from-gold-400 to-gold-600\\" \\r\\n          />\\r\\n          \\r\\n          <KPICard \\r\\n            title=\\"Active Employees\\" \\r\\n            value={metrics.activeEmployees} \\r\\n            subtitle={\`\${Math.round((metrics.activeEmployees/metrics.totalEmployees)*100)}% active\`}\\r\\n            icon={UserCheck} \\r\\n            gradient=\\"from-emerald-400 to-emerald-600\\" \\r\\n          />\\r\\n          \\r\\n          <KPICard \\r\\n            title=\\"Departments\\" \\r\\n            value={metrics.departments} \\r\\n            subtitle={\`\${metrics.locations} locations\`}\\r\\n            icon={Clock} \\r\\n            gradient=\\"from-blue-400 to-blue-600\\" \\r\\n          />\\r\\n          \\r\\n          <KPICard \\r\\n            title=\\"Pending Approvals\\" \\r\\n            value={metrics.pendingApprovals} \\r\\n            subtitle=\\"Reg/Leave/WFH\\" \\r\\n            icon={ShieldCheck} \\r\\n            gradient=\\"from-amber-400 to-amber-600\\" \\r\\n          />\\r\\n        </div>\\r\\n\\r\\n        <!-- Charts Row -->\\r\\n        <div class=\\"grid grid-cols-1 lg:grid-cols-3 gap-6\\">\\r\\n          <!-- Employee Trend -->\\r\\n          <div class=\\"lg:col-span-2\\">\\r\\n            <ChartCard \\r\\n              title=\\"Employee Trend\\" \\r\\n              icon={Clock}\\r\\n              chartType=\\"area\\"\\r\\n              data={trendData}\\r\\n            />\\r\\n          </div>\\r\\n          \\r\\n          <!-- Department Distribution -->\\r\\n          <ChartCard \\r\\n            title=\\"Department Distribution\\" \\r\\n            icon={Calendar}\\r\\n            chartType=\\"pie\\"\\r\\n            data={departmentData}\\r\\n          />\\r\\n        </div>\\r\\n\\r\\n        <!-- Tables Row -->\\r\\n        <div class=\\"grid grid-cols-1 lg:grid-cols-3 gap-6\\">\\r\\n          <!-- Employee List -->\\r\\n          <div class=\\"lg:col-span-2\\">\\r\\n            <TableCard \\r\\n              title=\\"Employee Directory (September 9, 2025)\\"\\r\\n              icon={CalendarCheck}\\r\\n              data={filteredEmployees.slice(0, 6)}\\r\\n              type=\\"employees\\"\\r\\n            />\\r\\n          </div>\\r\\n\\r\\n          <!-- Pending Approvals -->\\r\\n          <TableCard \\r\\n            title=\\"Pending Approvals\\"\\r\\n            icon={Bell}\\r\\n            data={pendingApprovals}\\r\\n            type=\\"approvals\\"\\r\\n          />\\r\\n        </div>\\r\\n\\r\\n        <!-- Department Performance -->\\r\\n        <div class=\\"card\\">\\r\\n          <div class=\\"card-header\\">\\r\\n            <h3 class=\\"text-lg font-semibold text-gold-800 flex items-center gap-2\\">\\r\\n              <Briefcase class=\\"h-5 w-5\\" />\\r\\n              Department-wise Employee Distribution\\r\\n            </h3>\\r\\n          </div>\\r\\n          <div class=\\"card-content p-0\\">\\r\\n            <div class=\\"overflow-x-auto\\">\\r\\n              <table class=\\"w-full text-sm\\">\\r\\n                <thead>\\r\\n                  <tr class=\\"border-b border-gold-200 bg-gold-50/50 text-left text-xs uppercase text-zinc-600 font-medium\\">\\r\\n                    <th class=\\"px-4 py-3\\">Department</th>\\r\\n                    <th class=\\"px-4 py-3 text-center\\">Employee Count</th>\\r\\n                    <th class=\\"px-4 py-3 text-center\\">Percentage</th>\\r\\n                  </tr>\\r\\n                </thead>\\r\\n                <tbody>\\r\\n                  {#each departmentData as dept}\\r\\n                    <tr class=\\"border-b border-gold-100 last:border-none hover:bg-gold-25 transition-colors\\">\\r\\n                      <td class=\\"px-4 py-3 font-medium text-zinc-800\\">{dept.department}</td>\\r\\n                      <td class=\\"px-4 py-3 text-center text-zinc-600\\">{dept.count}</td>\\r\\n                      <td class=\\"px-4 py-3\\">\\r\\n                        <div class=\\"flex items-center justify-center\\">\\r\\n                          <span class=\\"mr-2 font-medium text-blue-600\\">{dept.percentage}%</span>\\r\\n                          <div class=\\"w-24 h-2 bg-gray-200 rounded-full overflow-hidden\\">\\r\\n                            <div class=\\"h-full rounded-full bg-blue-500\\" \\r\\n                              style=\\"width: {dept.percentage}%\\"></div>\\r\\n                          </div>\\r\\n                        </div>\\r\\n                      </td>\\r\\n                    </tr>\\r\\n                  {/each}\\r\\n                </tbody>\\r\\n              </table>\\r\\n            </div>\\r\\n          </div>\\r\\n        </div>\\r\\n\\r\\n        <!-- Regularization Chart -->\\r\\n        <ChartCard \\r\\n          title=\\"Regularization Requests (Last 7 days)\\" \\r\\n          icon={ShieldCheck}\\r\\n          chartType=\\"bar\\"\\r\\n          data={regularizationData}\\r\\n        />\\r\\n\\r\\n        <!-- Footer -->\\r\\n        <div class=\\"pb-6 text-center text-xs text-zinc-500\\">\\r\\n          © {new Date().getFullYear()} National Consulting India • Zoho People Dashboard • Gold & Off‑White theme\\r\\n        </div>\\r\\n      {/if}\\r\\n    </main>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n  .animate-spin {\\r\\n    animation: spin 1s linear infinite;\\r\\n  }\\r\\n  \\r\\n  @keyframes spin {\\r\\n    from {\\r\\n      transform: rotate(0deg);\\r\\n    }\\r\\n    to {\\r\\n      transform: rotate(360deg);\\r\\n    }\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA+VE,4BAAc,CACZ,SAAS,CAAE,mBAAI,CAAC,EAAE,CAAC,MAAM,CAAC,QAC5B,CAEA,WAAW,mBAAK,CACd,IAAK,CACH,SAAS,CAAE,OAAO,IAAI,CACxB,CACA,EAAG,CACD,SAAS,CAAE,OAAO,MAAM,CAC1B,CACF"}`
};
function createDepartmentData(employees) {
  const deptCounts = {};
  employees.forEach((employee) => {
    if (!deptCounts[employee.department]) {
      deptCounts[employee.department] = { count: 0, percentage: 0 };
    }
    deptCounts[employee.department].count += 1;
  });
  const total = employees.length;
  Object.keys(deptCounts).forEach((dept) => {
    deptCounts[dept].percentage = total > 0 ? Math.round(deptCounts[dept].count / total * 100) : 0;
  });
  return Object.entries(deptCounts).map(([dept, data]) => ({
    department: dept,
    count: data.count,
    percentage: data.percentage
  }));
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let locations;
  let departments;
  let filteredEmployees;
  let metrics;
  let trendData;
  let departmentData;
  let { data } = $$props;
  let employeeData = data.sampleEmployees || [];
  const today = new Date(2025, 8, 9);
  const formattedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  ({
    fromDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString().split("T")[0],
    toDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  const pendingApprovals = data.tables.pendingApprovals || [
    {
      id: "RG-1042",
      type: "Regularization",
      by: "Karthik P",
      for: "Sep 03 • 09:20",
      age: "2d"
    },
    {
      id: "LV-2218",
      type: "Leave",
      by: "Shwetha S",
      for: "Sep 09-10 • Casual",
      age: "1d"
    },
    {
      id: "WF-0081",
      type: "WFH",
      by: "Jason C",
      for: "Sep 06 • Full Day",
      age: "3h"
    }
  ];
  const regularizationData = data.charts.regularizationData || [
    { date: "Aug 29", count: 8 },
    { date: "Aug 30", count: 6 },
    { date: "Aug 31", count: 4 },
    { date: "Sep 01", count: 12 },
    { date: "Sep 02", count: 10 },
    { date: "Sep 03", count: 7 },
    { date: "Sep 04", count: 9 }
  ];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  locations = [
    "All Locations",
    ...new Set(employeeData.map((r) => r.workLocation || "Head Office"))
  ];
  departments = ["All Departments", ...new Set(employeeData.map((r) => r.department))];
  filteredEmployees = employeeData.filter((record) => {
    record.workLocation || "Head Office";
    return true;
  });
  metrics = {
    totalEmployees: filteredEmployees.length,
    activeEmployees: Math.floor(filteredEmployees.length * 0.95),
    // 95% active
    onLeave: 3,
    // Sample data
    newHires: 2,
    // Sample data
    pendingApprovals: data.kpis?.pendingApprovals || 3,
    departments: [...new Set(filteredEmployees.map((emp) => emp.department))].length,
    locations: [...new Set(filteredEmployees.map((emp) => emp.location))].length,
    avgYearsExperience: "3.2"
    // Sample data
  };
  trendData = data.charts?.trendData || [];
  departmentData = createDepartmentData(filteredEmployees);
  return `${$$result.head += `<!-- HEAD_svelte-p1fxmc_START -->${$$result.title = `<title>Home Dashboard - Zoho People</title>`, ""}<meta name="description" content="Zoho People Management Dashboard"><!-- HEAD_svelte-p1fxmc_END -->`, ""} <div class="min-h-screen bg-gradient-to-br from-amber-50 via-white to-gold-50 text-zinc-800"> ${validate_component(Header, "Header").$$render($$result, {}, {}, {})}  <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12"> <aside class="lg:col-span-2">${validate_component(Sidebar, "Sidebar").$$render($$result, { currentPath: "/" }, {}, {})}</aside>  <main class="lg:col-span-10 space-y-6"> <div class="card overflow-hidden shadow-lg border-0"><div class="bg-gradient-to-r from-amber-500 via-gold-500 to-amber-600 card-header py-5"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white shadow-inner">${validate_component(Activity, "Activity").$$render($$result, { class: "h-6 w-6" }, {}, {})}</div> <div><h1 class="text-2xl font-bold text-white" data-svelte-h="svelte-rxplg1">Welcome to Zoho People</h1> <p class="text-amber-100">Dashboard Overview • ${escape(formattedDate)}</p></div></div> <div class="flex items-center gap-3"><div class="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm text-white">${validate_component(Bell, "Bell").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span class="text-sm font-medium">${escape(metrics.pendingApprovals)} Pending Approvals</span></div></div></div></div></div>  ${`${`  <div class="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100"><div class="text-sm text-gray-600 font-medium" data-svelte-h="svelte-1x1uent">Filter by:</div> <div class="flex-1"><select class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent">${each(locations, (location) => {
    return `<option${add_attribute("value", location, 0)}>${escape(location)}</option>`;
  })}</select></div> <div class="flex-1"><select class="w-full px-3 py-2 rounded-md border border-gray-300 text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent">${each(departments, (department) => {
    return `<option${add_attribute("value", department, 0)}>${escape(department)}</option>`;
  })}</select></div> <a href="/employees" class="text-gold-600 hover:text-gold-800 text-sm font-medium flex items-center">Advanced Filters
            ${validate_component(Chevron_right, "ChevronRight").$$render($$result, { class: "h-4 w-4" }, {}, {})}</a></div>  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">${validate_component(KPICard, "KPICard").$$render(
    $$result,
    {
      title: "Total Employees",
      value: metrics.totalEmployees,
      subtitle: "+4 this month",
      icon: Users,
      gradient: "from-gold-400 to-gold-600"
    },
    {},
    {}
  )} ${validate_component(KPICard, "KPICard").$$render(
    $$result,
    {
      title: "Active Employees",
      value: metrics.activeEmployees,
      subtitle: `${Math.round(metrics.activeEmployees / metrics.totalEmployees * 100)}% active`,
      icon: User_check,
      gradient: "from-emerald-400 to-emerald-600"
    },
    {},
    {}
  )} ${validate_component(KPICard, "KPICard").$$render(
    $$result,
    {
      title: "Departments",
      value: metrics.departments,
      subtitle: `${metrics.locations} locations`,
      icon: Clock,
      gradient: "from-blue-400 to-blue-600"
    },
    {},
    {}
  )} ${validate_component(KPICard, "KPICard").$$render(
    $$result,
    {
      title: "Pending Approvals",
      value: metrics.pendingApprovals,
      subtitle: "Reg/Leave/WFH",
      icon: Shield_check,
      gradient: "from-amber-400 to-amber-600"
    },
    {},
    {}
  )}</div>  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div class="lg:col-span-2">${validate_component(ChartCard, "ChartCard").$$render(
    $$result,
    {
      title: "Employee Trend",
      icon: Clock,
      chartType: "area",
      data: trendData
    },
    {},
    {}
  )}</div>  ${validate_component(ChartCard, "ChartCard").$$render(
    $$result,
    {
      title: "Department Distribution",
      icon: Calendar,
      chartType: "pie",
      data: departmentData
    },
    {},
    {}
  )}</div>  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"> <div class="lg:col-span-2">${validate_component(TableCard, "TableCard").$$render(
    $$result,
    {
      title: "Employee Directory (September 9, 2025)",
      icon: Calendar_check,
      data: filteredEmployees.slice(0, 6),
      type: "employees"
    },
    {},
    {}
  )}</div>  ${validate_component(TableCard, "TableCard").$$render(
    $$result,
    {
      title: "Pending Approvals",
      icon: Bell,
      data: pendingApprovals,
      type: "approvals"
    },
    {},
    {}
  )}</div>  <div class="card"><div class="card-header"><h3 class="text-lg font-semibold text-gold-800 flex items-center gap-2">${validate_component(Briefcase, "Briefcase").$$render($$result, { class: "h-5 w-5" }, {}, {})}
              Department-wise Employee Distribution</h3></div> <div class="card-content p-0"><div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b border-gold-200 bg-gold-50/50 text-left text-xs uppercase text-zinc-600 font-medium"><th class="px-4 py-3" data-svelte-h="svelte-1ccxjhr">Department</th> <th class="px-4 py-3 text-center" data-svelte-h="svelte-f8tl3x">Employee Count</th> <th class="px-4 py-3 text-center" data-svelte-h="svelte-1n541o2">Percentage</th></tr></thead> <tbody>${each(departmentData, (dept) => {
    return `<tr class="border-b border-gold-100 last:border-none hover:bg-gold-25 transition-colors"><td class="px-4 py-3 font-medium text-zinc-800">${escape(dept.department)}</td> <td class="px-4 py-3 text-center text-zinc-600">${escape(dept.count)}</td> <td class="px-4 py-3"><div class="flex items-center justify-center"><span class="mr-2 font-medium text-blue-600">${escape(dept.percentage)}%</span> <div class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden"><div class="h-full rounded-full bg-blue-500" style="${"width: " + escape(dept.percentage, true) + "%"}"></div></div> </div></td> </tr>`;
  })}</tbody></table></div></div></div>  ${validate_component(ChartCard, "ChartCard").$$render(
    $$result,
    {
      title: "Regularization Requests (Last 7 days)",
      icon: Shield_check,
      chartType: "bar",
      data: regularizationData
    },
    {},
    {}
  )}  <div class="pb-6 text-center text-xs text-zinc-500">© ${escape((/* @__PURE__ */ new Date()).getFullYear())} National Consulting India • Zoho People Dashboard • Gold &amp; Off‑White theme</div>`}`}</main></div> </div>`;
});
export {
  Page as default
};
