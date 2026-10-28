export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.BY9HEKF5.js",app:"_app/immutable/entry/app.CR4vNWWr.js",imports:["_app/immutable/entry/start.BY9HEKF5.js","_app/immutable/chunks/LD2oI0rc.js","_app/immutable/chunks/Bgl5aCbp.js","_app/immutable/chunks/CqIE_bcL.js","_app/immutable/entry/app.CR4vNWWr.js","_app/immutable/chunks/LD2oI0rc.js","_app/immutable/chunks/B22YfI2g.js","_app/immutable/chunks/BHhmJ8T_.js","_app/immutable/chunks/CqIE_bcL.js","_app/immutable/chunks/BruKSiLX.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
