import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	
	onwarn: (warning, handler) => {
		// Suppress accessibility warnings temporarily
		if (warning.code.startsWith('a11y-')) return;
		handler(warning);
	},

	kit: {
		adapter: adapter()
	}
};

export default config;
