import * as server from '../entries/pages/auth/callback/_page.server.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/callback/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/callback/+page.server.js";
export const imports = ["_app/immutable/nodes/3.C2xPUa8R.js","_app/immutable/chunks/B-GFLjmK.js","_app/immutable/chunks/0ChlnYTn.js","_app/immutable/chunks/KKoOOqA_.js","_app/immutable/chunks/bCCW0xkE.js"];
export const stylesheets = [];
export const fonts = [];
