

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.Bf-bC3mO.js","_app/immutable/chunks/B-GFLjmK.js","_app/immutable/chunks/0ChlnYTn.js"];
export const stylesheets = [];
export const fonts = [];
