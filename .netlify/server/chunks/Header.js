import { c as create_ssr_component, v as validate_component, f as each, h as add_attribute, e as escape, m as missing_component } from "./ssr.js";
import { I as Icon } from "./Icon.js";
const Briefcase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "20",
        "height": "14",
        "x": "2",
        "y": "7",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "path",
      {
        "d": "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "briefcase" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Building_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"
      }
    ],
    [
      "path",
      {
        "d": "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"
      }
    ],
    [
      "path",
      {
        "d": "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"
      }
    ],
    ["path", { "d": "M10 6h4" }],
    ["path", { "d": "M10 10h4" }],
    ["path", { "d": "M10 14h4" }],
    ["path", { "d": "M10 18h4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "building-2" }, $$props, { iconNode }), {}, {
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
const Chevron_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "m6 9 6 6 6-6" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "chevron-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Clock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["polyline", { "points": "12 6 12 12 16 14" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "clock" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Download = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      }
    ],
    ["polyline", { "points": "7 10 12 15 17 10" }],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "15",
        "y2": "3"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "download" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Filter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "polygon",
      {
        "points": "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "filter" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Map_pin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
      }
    ],
    ["circle", { "cx": "12", "cy": "10", "r": "3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "map-pin" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
      }
    ],
    ["circle", { "cx": "12", "cy": "12", "r": "3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "settings" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Shield_check = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"
      }
    ],
    ["path", { "d": "m9 12 2 2 4-4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "shield-check" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Users = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "9", "cy": "7", "r": "4" }],
    ["path", { "d": "M22 21v-2a4 4 0 0 0-3-3.87" }],
    ["path", { "d": "M16 3.13a4 4 0 0 1 0 7.75" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "users" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const css = {
  code: "body{--dropdown-z:50}",
  map: `{"version":3,"file":"Sidebar.svelte","sources":["Sidebar.svelte"],"sourcesContent":["<script>\\r\\n\\timport { \\r\\n\\t\\tUsers, CalendarCheck, Clock, ShieldCheck, Briefcase, Building2,\\r\\n\\t\\tChevronDown, MapPin, Settings\\r\\n\\t} from 'lucide-svelte';\\r\\n\\r\\n\\texport let currentPath = '/';\\r\\n\\r\\n\\tconst navigationItems = [\\r\\n\\t\\t{ icon: Users, label: \\"Dashboard\\", href: \\"/\\", key: \\"dashboard\\" },\\r\\n\\t\\t{ icon: Users, label: \\"Employees\\", href: \\"/employees\\", key: \\"employees\\" },\\r\\n\\t\\t{ icon: CalendarCheck, label: \\"Attendance\\", href: \\"/attendance\\", key: \\"attendance\\" },\\r\\n\\t\\t{ icon: Clock, label: \\"Timesheets\\", href: \\"/timesheets\\", key: \\"timesheets\\" },\\r\\n\\t\\t{ icon: ShieldCheck, label: \\"Approvals\\", href: \\"/approvals\\", key: \\"approvals\\" },\\r\\n\\t\\t{ icon: Briefcase, label: \\"HR Files\\", href: \\"/hr-files\\", key: \\"hr-files\\" },\\r\\n\\t\\t{ icon: Building2, label: \\"Org Chart\\", href: \\"/org-chart\\", key: \\"org-chart\\" },\\r\\n\\t\\t{ icon: Settings, label: \\"Settings\\", href: \\"/settings\\", key: \\"settings\\" },\\r\\n\\t];\\r\\n\\r\\n\\tfunction isActive(item) {\\r\\n\\t\\tif (item.href === '/' && currentPath === '/') return true;\\r\\n\\t\\tif (item.href !== '/' && currentPath.startsWith(item.href)) return true;\\r\\n\\t\\treturn false;\\r\\n\\t}\\r\\n\\r\\n\\tlet showDateDropdown = false;\\r\\n\\tlet showLocationDropdown = false;\\r\\n\\tlet showDepartmentDropdown = false;\\r\\n<\/script>\\r\\n\\r\\n<div class=\\"space-y-4\\">\\r\\n\\t<!-- Navigation Card -->\\r\\n\\t<div class=\\"card\\">\\r\\n\\t\\t<div class=\\"card-header\\">\\r\\n\\t\\t\\t<h3 class=\\"text-sm font-semibold text-gold-800\\">Navigation</h3>\\r\\n\\t\\t</div>\\r\\n\\t\\t<div class=\\"card-content space-y-1 text-sm\\">\\r\\n\\t\\t\\t{#each navigationItems as item}\\r\\n\\t\\t\\t\\t<a \\r\\n\\t\\t\\t\\t\\thref={item.href}\\r\\n\\t\\t\\t\\t\\tclass=\\"flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors {isActive(item) ? 'bg-gold-100 text-gold-800 font-medium' : 'hover:bg-gold-50 text-zinc-700'}\\"\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t<svelte:component this={item.icon} class=\\"h-4 w-4\\" />\\r\\n\\t\\t\\t\\t\\t<span>{item.label}</span>\\r\\n\\t\\t\\t\\t</a>\\r\\n\\t\\t\\t{/each}\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n\\r\\n\\t<!-- Quick Filters Card -->\\r\\n\\t<div class=\\"card\\">\\r\\n\\t\\t<div class=\\"card-header\\">\\r\\n\\t\\t\\t<h3 class=\\"text-sm font-semibold text-gold-800\\">Quick Filters</h3>\\r\\n\\t\\t</div>\\r\\n\\t\\t<div class=\\"card-content space-y-3\\">\\r\\n\\t\\t\\t<!-- Date Range Filter -->\\r\\n\\t\\t\\t<div class=\\"relative\\">\\r\\n\\t\\t\\t\\t<button \\r\\n\\t\\t\\t\\t\\tclass=\\"btn-secondary w-full justify-between flex items-center\\"\\r\\n\\t\\t\\t\\t\\ton:click={() => showDateDropdown = !showDateDropdown}\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\tDate Range \\r\\n\\t\\t\\t\\t\\t<ChevronDown class=\\"h-4 w-4\\" />\\r\\n\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t{#if showDateDropdown}\\r\\n\\t\\t\\t\\t\\t<div class=\\"absolute top-full left-0 right-0 mt-1 bg-white border border-gold-200 rounded-lg shadow-lg z-10 py-2\\">\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">Today</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">This Week</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">This Month</button>\\r\\n\\t\\t\\t\\t\\t\\t<hr class=\\"my-1 border-gold-100\\">\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">Custom…</button>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t<!-- Location Filter -->\\r\\n\\t\\t\\t<div class=\\"relative\\">\\r\\n\\t\\t\\t\\t<button \\r\\n\\t\\t\\t\\t\\tclass=\\"btn-secondary w-full justify-between flex items-center\\"\\r\\n\\t\\t\\t\\t\\ton:click={() => showLocationDropdown = !showLocationDropdown}\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t<div class=\\"flex items-center gap-2\\">\\r\\n\\t\\t\\t\\t\\t\\t<MapPin class=\\"h-4 w-4\\" />\\r\\n\\t\\t\\t\\t\\t\\tLocation\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t<ChevronDown class=\\"h-4 w-4\\" />\\r\\n\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t{#if showLocationDropdown}\\r\\n\\t\\t\\t\\t\\t<div class=\\"absolute top-full left-0 right-0 mt-1 bg-white border border-gold-200 rounded-lg shadow-lg z-10 py-2\\">\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">All</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">Bengaluru</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">Mumbai</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">Mangaluru</button>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</div>\\r\\n\\r\\n\\t\\t\\t<!-- Department Filter -->\\r\\n\\t\\t\\t<div class=\\"relative\\">\\r\\n\\t\\t\\t\\t<button \\r\\n\\t\\t\\t\\t\\tclass=\\"btn-secondary w-full justify-between flex items-center\\"\\r\\n\\t\\t\\t\\t\\ton:click={() => showDepartmentDropdown = !showDepartmentDropdown}\\r\\n\\t\\t\\t\\t>\\r\\n\\t\\t\\t\\t\\t<div class=\\"flex items-center gap-2\\">\\r\\n\\t\\t\\t\\t\\t\\t<Briefcase class=\\"h-4 w-4\\" />\\r\\n\\t\\t\\t\\t\\t\\tDepartment\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t\\t<ChevronDown class=\\"h-4 w-4\\" />\\r\\n\\t\\t\\t\\t</button>\\r\\n\\t\\t\\t\\t{#if showDepartmentDropdown}\\r\\n\\t\\t\\t\\t\\t<div class=\\"absolute top-full left-0 right-0 mt-1 bg-white border border-gold-200 rounded-lg shadow-lg z-10 py-2\\">\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">All</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">IT</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">HR</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">Sales</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">Finance</button>\\r\\n\\t\\t\\t\\t\\t\\t<button class=\\"w-full px-3 py-2 text-left text-sm hover:bg-gold-50\\">Projects</button>\\r\\n\\t\\t\\t\\t\\t</div>\\r\\n\\t\\t\\t\\t{/if}\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</div>\\r\\n\\t</div>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t/* Close dropdowns when clicking outside */\\r\\n\\t:global(body) {\\r\\n\\t\\t--dropdown-z: 50;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA8HS,IAAM,CACb,YAAY,CAAE,EACf"}`
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { currentPath = "/" } = $$props;
  const navigationItems = [
    {
      icon: Users,
      label: "Dashboard",
      href: "/",
      key: "dashboard"
    },
    {
      icon: Users,
      label: "Employees",
      href: "/employees",
      key: "employees"
    },
    {
      icon: Calendar_check,
      label: "Attendance",
      href: "/attendance",
      key: "attendance"
    },
    {
      icon: Clock,
      label: "Timesheets",
      href: "/timesheets",
      key: "timesheets"
    },
    {
      icon: Shield_check,
      label: "Approvals",
      href: "/approvals",
      key: "approvals"
    },
    {
      icon: Briefcase,
      label: "HR Files",
      href: "/hr-files",
      key: "hr-files"
    },
    {
      icon: Building_2,
      label: "Org Chart",
      href: "/org-chart",
      key: "org-chart"
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      key: "settings"
    }
  ];
  function isActive(item) {
    if (item.href === "/" && currentPath === "/") return true;
    if (item.href !== "/" && currentPath.startsWith(item.href)) return true;
    return false;
  }
  if ($$props.currentPath === void 0 && $$bindings.currentPath && currentPath !== void 0) $$bindings.currentPath(currentPath);
  $$result.css.add(css);
  return `<div class="space-y-4"> <div class="card"><div class="card-header"><h3 class="text-sm font-semibold text-gold-800" data-svelte-h="svelte-6vmja7">Navigation</h3></div> <div class="card-content space-y-1 text-sm">${each(navigationItems, (item) => {
    return `<a${add_attribute("href", item.href, 0)} class="${"flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors " + escape(
      isActive(item) ? "bg-gold-100 text-gold-800 font-medium" : "hover:bg-gold-50 text-zinc-700",
      true
    )}">${validate_component(item.icon || missing_component, "svelte:component").$$render($$result, { class: "h-4 w-4" }, {}, {})} <span>${escape(item.label)}</span> </a>`;
  })}</div></div>  <div class="card"><div class="card-header"><h3 class="text-sm font-semibold text-gold-800" data-svelte-h="svelte-1wx7jhj">Quick Filters</h3></div> <div class="card-content space-y-3"> <div class="relative"><button class="btn-secondary w-full justify-between flex items-center">Date Range 
					${validate_component(Chevron_down, "ChevronDown").$$render($$result, { class: "h-4 w-4" }, {}, {})}</button> ${``}</div>  <div class="relative"><button class="btn-secondary w-full justify-between flex items-center"><div class="flex items-center gap-2">${validate_component(Map_pin, "MapPin").$$render($$result, { class: "h-4 w-4" }, {}, {})}
						Location</div> ${validate_component(Chevron_down, "ChevronDown").$$render($$result, { class: "h-4 w-4" }, {}, {})}</button> ${``}</div>  <div class="relative"><button class="btn-secondary w-full justify-between flex items-center"><div class="flex items-center gap-2">${validate_component(Briefcase, "Briefcase").$$render($$result, { class: "h-4 w-4" }, {}, {})}
						Department</div> ${validate_component(Chevron_down, "ChevronDown").$$render($$result, { class: "h-4 w-4" }, {}, {})}</button> ${``}</div></div></div> </div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let searchQuery = "";
  return ` <div class="sticky top-0 z-40 border-b border-gold-200/50 bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60"><div class="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4"><div class="flex items-center gap-3"><div class="h-12 w-12 rounded-xl overflow-hidden bg-white shadow-lg border border-gold-200 flex items-center justify-center"><img src="/national-logo.png" alt="National Consulting India Logo" class="h-8 w-auto object-contain"></div> <div class="leading-tight"><p class="text-xs uppercase tracking-wider text-zinc-500 font-medium" data-svelte-h="svelte-1a2merl">National Consulting India</p> <h1 class="text-xl font-bold bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent" data-svelte-h="svelte-mi5l9l">Zoho People — Management Dashboard</h1></div></div> <div class="ml-auto flex items-center gap-3"><input class="input w-64" placeholder="Search employee, request, policy…"${add_attribute("value", searchQuery, 0)}> <button class="btn-secondary gap-2 flex items-center">${validate_component(Filter, "Filter").$$render($$result, { class: "h-4 w-4" }, {}, {})}
				Filters</button> <button class="btn-secondary gap-2 flex items-center">${validate_component(Download, "Download").$$render($$result, { class: "h-4 w-4" }, {}, {})}
				Export</button> <button class="btn-primary gap-2 flex items-center">${validate_component(Plus, "Plus").$$render($$result, { class: "h-4 w-4" }, {}, {})}
				Add Employee</button> <button class="p-2 text-gold-600 hover:bg-gold-100 rounded-lg transition-colors">${validate_component(Settings, "Settings").$$render($$result, { class: "h-5 w-5" }, {}, {})}</button></div></div></div>`;
});
export {
  Clock as C,
  Download as D,
  Filter as F,
  Header as H,
  Sidebar as S,
  Users as U,
  Shield_check as a,
  Calendar_check as b,
  Settings as c
};
