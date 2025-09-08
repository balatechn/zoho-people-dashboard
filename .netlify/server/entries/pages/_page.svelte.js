import { c as create_ssr_component, v as validate_component, e as escape, m as missing_component, f as each } from "../../chunks/ssr.js";
import { H as Header, S as Sidebar, U as Users, a as Shield_check, C as Clock, b as Calendar_check } from "../../chunks/Header.js";
/* empty css               */
import { I as Icon } from "../../chunks/Icon.js";
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
function getStatusColor(status) {
  const colors = {
    "Present": "bg-emerald-100 text-emerald-700",
    "WFH": "bg-blue-100 text-blue-700",
    "Leave": "bg-amber-100 text-amber-700",
    "OD": "bg-purple-100 text-purple-700",
    "Absent": "bg-red-100 text-red-700"
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}
const TableCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { icon } = $$props;
  let { data = [] } = $$props;
  let { type = "attendance" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.type === void 0 && $$bindings.type && type !== void 0) $$bindings.type(type);
  return `<div class="card"><div class="card-header"><h3 class="text-lg font-semibold text-gold-800 flex items-center gap-2">${validate_component(icon || missing_component, "svelte:component").$$render($$result, { class: "h-5 w-5" }, {}, {})} ${escape(title)}</h3></div> <div class="card-content">${type === "attendance" ? ` <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b border-gold-200 bg-gold-50/50 text-left text-xs uppercase text-zinc-600 font-medium"><th class="px-4 py-3" data-svelte-h="svelte-1ok2zbd">Employee</th> <th class="px-4 py-3" data-svelte-h="svelte-1ccxjhr">Department</th> <th class="px-4 py-3" data-svelte-h="svelte-rok4vu">Location</th> <th class="px-4 py-3" data-svelte-h="svelte-cnmn4r">Status</th> <th class="px-4 py-3" data-svelte-h="svelte-1e7dc81">Check-in</th></tr></thead> <tbody>${each(data, (row, i) => {
    return `<tr class="border-b border-gold-100 last:border-none hover:bg-gold-25 transition-colors"><td class="px-4 py-3 font-medium text-zinc-800">${escape(row.name)}</td> <td class="px-4 py-3 text-zinc-600">${escape(row.dept)}</td> <td class="px-4 py-3 text-zinc-600">${escape(row.location)}</td> <td class="px-4 py-3"><span class="${"rounded-full px-3 py-1 text-xs font-medium " + escape(getStatusColor(row.status), true)}">${escape(row.status)} </span></td> <td class="px-4 py-3 text-zinc-600 font-mono">${escape(row.time)}</td> </tr>`;
  })}</tbody></table></div>` : `${type === "approvals" ? ` <div class="space-y-4">${each(data, (approval) => {
    return `<div class="rounded-xl border border-gold-200 p-4 hover:shadow-md transition-shadow bg-gradient-to-r from-white to-gold-25"><div class="flex items-center justify-between text-sm mb-2"><div class="font-semibold text-gold-800">${escape(approval.type)} • <span class="text-zinc-500 font-normal">${escape(approval.id)}</span></div> <div class="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">${escape(approval.age)} ago</div></div> <div class="text-xs text-zinc-600 mb-3">${escape(approval.by)} — ${escape(approval.for)}</div> <div class="flex gap-2"><button class="btn-primary text-xs px-3 py-1.5" data-svelte-h="svelte-1jz8d8l">Approve</button> <button class="btn-secondary text-xs px-3 py-1.5" data-svelte-h="svelte-1c2vqcn">Reject
							</button></div> </div>`;
  })}</div>` : ``}`}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-1sh2qdb_START -->${$$result.title = `<title>National Consulting India - Zoho People Dashboard</title>`, ""}<meta name="description" content="National Consulting India Zoho People Management Dashboard with elegant gold and off-white design"><!-- HEAD_svelte-1sh2qdb_END -->`, ""} <div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100 text-zinc-800"> ${validate_component(Header, "Header").$$render($$result, {}, {}, {})}  <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12"> <aside class="lg:col-span-2">${validate_component(Sidebar, "Sidebar").$$render($$result, { currentPath: "/" }, {}, {})}</aside>  <main class="lg:col-span-10 space-y-6"> <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">${validate_component(KPICard, "KPICard").$$render(
    $$result,
    {
      title: "Total Employees",
      value: data.kpis.totalEmployees,
      subtitle: "+4 this month",
      icon: Users,
      gradient: "from-gold-400 to-gold-600"
    },
    {},
    {}
  )} ${validate_component(KPICard, "KPICard").$$render(
    $$result,
    {
      title: "Present Now",
      value: data.kpis.presentToday,
      subtitle: "↑ 3% vs last wk",
      icon: User_check,
      gradient: "from-emerald-400 to-emerald-600"
    },
    {},
    {}
  )} ${validate_component(KPICard, "KPICard").$$render(
    $$result,
    {
      title: "Pending Approvals",
      value: data.kpis.pendingApprovals,
      subtitle: "Reg/Leave/WFH",
      icon: Shield_check,
      gradient: "from-amber-400 to-amber-600"
    },
    {},
    {}
  )} ${validate_component(KPICard, "KPICard").$$render(
    $$result,
    {
      title: "Avg. Check-in",
      value: data.kpis.avgCheckin,
      subtitle: "Bengaluru • Sep 06",
      icon: Clock,
      gradient: "from-blue-400 to-blue-600"
    },
    {},
    {}
  )}</div>  <div class="grid grid-cols-1 gap-6 xl:grid-cols-3"><div class="xl:col-span-2">${validate_component(TableCard, "TableCard").$$render(
    $$result,
    {
      title: "Today's Attendance",
      icon: Calendar_check,
      data: data.tables.todayAttendance,
      type: "attendance"
    },
    {},
    {}
  )}</div>  ${validate_component(ChartCard, "ChartCard").$$render(
    $$result,
    {
      title: "Attendance Split (Today)",
      icon: Calendar,
      chartType: "pie",
      data: data.charts.attendanceSplit
    },
    {},
    {}
  )}</div>  <div class="grid grid-cols-1 gap-6 xl:grid-cols-2"> ${validate_component(ChartCard, "ChartCard").$$render(
    $$result,
    {
      title: "Check-ins vs Check-outs",
      icon: Clock,
      chartType: "area",
      data: data.charts.trendData
    },
    {},
    {}
  )}  ${validate_component(TableCard, "TableCard").$$render(
    $$result,
    {
      title: "Pending Approvals",
      icon: Bell,
      data: data.tables.pendingApprovals,
      type: "approvals"
    },
    {},
    {}
  )}</div>  ${validate_component(ChartCard, "ChartCard").$$render(
    $$result,
    {
      title: "Regularization Requests (Last 7 days)",
      icon: Shield_check,
      chartType: "bar",
      data: data.charts.regularizationData
    },
    {},
    {}
  )}  <div class="pb-6 text-center text-xs text-zinc-500">© ${escape((/* @__PURE__ */ new Date()).getFullYear())} National Consulting India • Zoho People Dashboard • Gold &amp; Off‑White theme</div></main></div></div>`;
});
export {
  Page as default
};
