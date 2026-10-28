

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.r43f-aXs.js","_app/immutable/chunks/BHhmJ8T_.js","_app/immutable/chunks/LD2oI0rc.js"];
export const stylesheets = ["_app/immutable/assets/0.CEK7OnCv.css"];
export const fonts = [];
