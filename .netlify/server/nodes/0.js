

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.A1FsuPjC.js","_app/immutable/chunks/Hwbxprs-.js","_app/immutable/chunks/yA2zqden.js"];
export const stylesheets = [];
export const fonts = [];
