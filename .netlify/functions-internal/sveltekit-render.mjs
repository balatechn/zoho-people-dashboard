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
		client: {start:"_app/immutable/entry/start.RkIdIVGl.js",app:"_app/immutable/entry/app.DrcF1jJ1.js",imports:["_app/immutable/entry/start.RkIdIVGl.js","_app/immutable/chunks/BPsa7TAR.js","_app/immutable/chunks/B-GFLjmK.js","_app/immutable/chunks/fyVP4H57.js","_app/immutable/entry/app.DrcF1jJ1.js","_app/immutable/chunks/B-GFLjmK.js","_app/immutable/chunks/0ChlnYTn.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/4.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js'))
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
				id: "/auth/callback",
				pattern: /^\/auth\/callback\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/employees",
				pattern: /^\/employees\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/settings",
				pattern: /^\/settings\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/upload",
				pattern: /^\/upload\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/validation",
				pattern: /^\/validation\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
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
