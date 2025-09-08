import * as server from '../entries/pages/auth/callback/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/callback/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/auth/callback/+page.server.js";
export const imports = ["_app/immutable/nodes/4.BkK_YD1J.js","_app/immutable/chunks/Hwbxprs-.js","_app/immutable/chunks/yA2zqden.js","_app/immutable/chunks/v2ZxQ8qh.js","_app/immutable/chunks/Bi9gly7X.js"];
export const stylesheets = [];
export const fonts = [];
