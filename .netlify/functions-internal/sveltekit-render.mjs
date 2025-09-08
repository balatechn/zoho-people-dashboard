import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","national-logo.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DJB7qDgM.js",app:"_app/immutable/entry/app.BB2wvHPU.js",imports:["_app/immutable/entry/start.DJB7qDgM.js","_app/immutable/chunks/BOw-gFo2.js","_app/immutable/chunks/Hwbxprs-.js","_app/immutable/chunks/BXJlbnAZ.js","_app/immutable/entry/app.BB2wvHPU.js","_app/immutable/chunks/Hwbxprs-.js","_app/immutable/chunks/yA2zqden.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api",
				pattern: /^\/api\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/_server.js'))
			},
			{
				id: "/api/attendance",
				pattern: /^\/api\/attendance\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/attendance/_server.js'))
			},
			{
				id: "/api/auth/token",
				pattern: /^\/api\/auth\/token\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/auth/token/_server.js'))
			},
			{
				id: "/api/dashboard",
				pattern: /^\/api\/dashboard\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/dashboard/_server.js'))
			},
			{
				id: "/api/employees",
				pattern: /^\/api\/employees\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/employees/_server.js'))
			},
			{
				id: "/api/employees/upload",
				pattern: /^\/api\/employees\/upload\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/employees/upload/_server.js'))
			},
			{
				id: "/api/leave",
				pattern: /^\/api\/leave\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/leave/_server.js'))
			},
			{
				id: "/api/offboarding",
				pattern: /^\/api\/offboarding\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/offboarding/_server.js'))
			},
			{
				id: "/api/onboarding",
				pattern: /^\/api\/onboarding\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/onboarding/_server.js'))
			},
			{
				id: "/api/organization",
				pattern: /^\/api\/organization\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/organization/_server.js'))
			},
			{
				id: "/api/settings/config",
				pattern: /^\/api\/settings\/config\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/settings/config/_server.js'))
			},
			{
				id: "/api/settings/test",
				pattern: /^\/api\/settings\/test\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/settings/test/_server.js'))
			},
			{
				id: "/api/timetracker",
				pattern: /^\/api\/timetracker\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/api/timetracker/_server.js'))
			},
			{
				id: "/attendance",
				pattern: /^\/attendance\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/auth/callback",
				pattern: /^\/auth\/callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/employees",
				pattern: /^\/employees\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
