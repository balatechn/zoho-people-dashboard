import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.CMge15Iu.js","_app/immutable/chunks/Hwbxprs-.js","_app/immutable/chunks/yA2zqden.js","_app/immutable/chunks/C5kJDFmn.js","_app/immutable/chunks/Bi9gly7X.js"];
export const stylesheets = ["_app/immutable/assets/Header.DXUaweVI.css","_app/immutable/assets/app.DSjVOgdT.css"];
export const fonts = [];
