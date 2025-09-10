import * as universal from '../entries/pages/_page.js';
import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.b9S9SOVZ.js","_app/immutable/chunks/B-GFLjmK.js","_app/immutable/chunks/XyxeuzVr.js","_app/immutable/chunks/0ChlnYTn.js","_app/immutable/chunks/bCCW0xkE.js"];
export const stylesheets = ["_app/immutable/assets/app.LRfnEm97.css","_app/immutable/assets/2.BUF4Zhd3.css"];
export const fonts = [];
