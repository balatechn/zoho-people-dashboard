import { c as create_ssr_component, v as validate_component, h as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { H as Header, S as Sidebar, b as Settings } from "../../../chunks/app.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { U as Upload } from "../../../chunks/upload.js";
const Test_tube = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2"
      }
    ],
    ["path", { "d": "M8.5 2h7" }],
    ["path", { "d": "M14.5 16h-5" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "test-tube" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Wifi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M5 13a10 10 0 0 1 14 0" }],
    ["path", { "d": "M8.5 16.5a5 5 0 0 1 7 0" }],
    ["path", { "d": "M2 8.82a15 15 0 0 1 20 0" }],
    [
      "line",
      {
        "x1": "12",
        "x2": "12.01",
        "y1": "20",
        "y2": "20"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "wifi" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let config = {};
  return `${$$result.head += `<!-- HEAD_svelte-r246lb_START -->${$$result.title = `<title>Settings - Zoho People Dashboard</title>`, ""}<meta name="description" content="Configure Zoho People API integration and test connectivity"><!-- HEAD_svelte-r246lb_END -->`, ""} <div class="min-h-screen bg-gradient-to-br from-offwhite-50 via-gold-50 to-offwhite-100 text-zinc-800"> ${validate_component(Header, "Header").$$render($$result, {}, {}, {})}  <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-12"> <aside class="lg:col-span-2">${validate_component(Sidebar, "Sidebar").$$render($$result, { currentPath: "/settings" }, {}, {})}</aside>  <main class="lg:col-span-10 space-y-6"> <div class="card"><div class="card-content"><div class="flex items-center gap-3 mb-2">${validate_component(Settings, "Settings").$$render($$result, { class: "w-8 h-8 text-gold-600" }, {}, {})} <h1 class="text-3xl font-bold text-zinc-900" data-svelte-h="svelte-1flkbv4">Settings</h1></div> <p class="text-zinc-600" data-svelte-h="svelte-142wfo1">Configure Zoho People API integration and test connectivity</p></div></div>  <div class="flex space-x-1"><button class="${"px-6 py-3 rounded-lg font-medium transition-all duration-200 " + escape(
    "bg-gradient-to-r from-gold-400 to-gold-600 text-white shadow-lg",
    true
  )}">${validate_component(Wifi, "Wifi").$$render($$result, { class: "w-4 h-4 inline mr-2" }, {}, {})}
					API Configuration</button> <button class="${"px-6 py-3 rounded-lg font-medium transition-all duration-200 " + escape(
    "card hover:bg-gold-50",
    true
  )}">${validate_component(Test_tube, "TestTube").$$render($$result, { class: "w-4 h-4 inline mr-2" }, {}, {})}
					Testing &amp; Status</button> <button class="${"px-6 py-3 rounded-lg font-medium transition-all duration-200 " + escape(
    "card hover:bg-gold-50",
    true
  )}">${validate_component(Upload, "Upload").$$render($$result, { class: "w-4 h-4 inline mr-2" }, {}, {})}
					Data Management</button></div>  ${`<div class="space-y-6"> <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8"><h2 class="text-2xl font-bold text-gray-900 mb-6" data-svelte-h="svelte-1x91g7g">Zoho People API Credentials</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-l7csee">Client ID</label> <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="1000.XXXXXXXXXXXXXXX"${add_attribute("value", config.clientId, 0)}></div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-c3cgh5">Client Secret</label> <input type="password" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="Enter your client secret"${add_attribute("value", config.clientSecret, 0)}></div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-1yas3gg">Redirect URI</label> <input type="url" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="https://zohopeople.netlify.app/auth/callback"${add_attribute("value", config.redirectUri, 0)}></div> <div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-fmzh5u">Domain</label> <select class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent"><option value="people.zoho.com" data-svelte-h="svelte-5702ui">people.zoho.com (Global)</option><option value="people.zoho.in" data-svelte-h="svelte-z005ao">people.zoho.in (India)</option><option value="people.zoho.eu" data-svelte-h="svelte-fa62s9">people.zoho.eu (Europe)</option><option value="people.zoho.com.cn" data-svelte-h="svelte-syzaxc">people.zoho.com.cn (China)</option></select></div></div> <div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"><h3 class="font-semibold text-blue-900 mb-2" data-svelte-h="svelte-o3ir7y">🔐 OAuth Authorization Required</h3> <div class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"><h4 class="font-semibold text-yellow-900 mb-2" data-svelte-h="svelte-2t6v4i">⚠️ Before Authorization - Configure Your Zoho App</h4> <p class="text-yellow-800 text-sm mb-2" data-svelte-h="svelte-1ogickb">You need to add this exact Redirect URI in your Zoho Developer Console:</p> <div class="bg-white p-2 rounded border font-mono text-sm break-all">${escape(config.redirectUri)}</div> <div class="mt-2 text-sm text-yellow-700"><strong data-svelte-h="svelte-1scxnpf">Steps:</strong> <ol class="list-decimal list-inside space-y-1 mt-1"><li>Go to <a href="https://api-console.zoho.in/" target="_blank" class="text-blue-600 underline" data-svelte-h="svelte-12adqbr">Zoho API Console</a></li> <li>Find your application with Client ID: <code class="bg-gray-100 px-1 rounded">${escape(config.clientId)}</code></li> <li data-svelte-h="svelte-1dxqyfi">Edit the app and add the redirect URI above</li> <li data-svelte-h="svelte-jdrik7">Save the changes</li> <li data-svelte-h="svelte-ekzfyg">Then come back and click &quot;Generate Authorization URL&quot;</li></ol></div></div> <p class="text-blue-700 text-sm mb-4" data-svelte-h="svelte-dms5x">After configuring the redirect URI in your Zoho app, complete the OAuth authorization to give the dashboard permission to access your Zoho People data.</p> <div class="space-y-3"><div class="text-sm"><strong class="text-blue-900" data-svelte-h="svelte-14hp7f6">Step 1:</strong> <span class="text-blue-700" data-svelte-h="svelte-s2lpx2">Configure redirect URI in Zoho API Console (see above)</span></div> <div class="text-sm"><strong class="text-blue-900" data-svelte-h="svelte-1mtz61v">Step 2:</strong> <span class="text-blue-700" data-svelte-h="svelte-phq8s4">Click the button below to open Zoho&#39;s authorization page</span></div> <div class="text-sm"><strong class="text-blue-900" data-svelte-h="svelte-137sxic">Step 3:</strong> <span class="text-blue-700" data-svelte-h="svelte-simofx">Sign in to your Zoho account and grant permissions</span></div> <div class="text-sm"><strong class="text-blue-900" data-svelte-h="svelte-r1wuv9">Step 4:</strong> <span class="text-blue-700" data-svelte-h="svelte-7ow8jw">You&#39;ll be redirected back with access tokens</span></div></div> <button class="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium" data-svelte-h="svelte-1auogv">🚀 Generate Authorization URL</button> ${!config.accessToken ? `<div class="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"><p class="text-yellow-800 text-sm">⚠️ <strong data-svelte-h="svelte-36ky94">No access token found.</strong> Please complete OAuth authorization to test API connections.</p></div>` : ``}</div> <div class="flex gap-4 mt-8"><button class="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg" data-svelte-h="svelte-xni7fh">Save Configuration</button> <button class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-lg" data-svelte-h="svelte-1khzoui">🔄 Reset to Production</button> <button ${""} class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg disabled:opacity-50">${`${validate_component(Test_tube, "TestTube").$$render($$result, { class: "w-4 h-4 inline mr-2" }, {}, {})}
                  Test Connection`}</button></div></div>  <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8"><h2 class="text-2xl font-bold text-gray-900 mb-6" data-svelte-h="svelte-wmsmvd">Token Management</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-1l3frqh">Access Token</label> <textarea rows="3" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="Access token will appear here after authorization">${escape(config.accessToken || "")}</textarea></div> <div><label for="refresh-token" class="block text-sm font-medium text-gray-700 mb-2" data-svelte-h="svelte-cid88r">Refresh Token</label> <textarea id="refresh-token" rows="3" class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent" placeholder="Refresh token will appear here after authorization">${escape(config.refreshToken || "")}</textarea></div></div></div></div>`}  ${``}  ${``}</main></div></div>`;
});
export {
  Page as default
};
