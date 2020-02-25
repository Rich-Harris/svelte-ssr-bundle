import internal from 'svelte/internal';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';

global.internal = internal;

export default {
	input: 'client/app.js',
	output: {
		file: 'public/build/bundle.js',
		format: 'iife',
		sourcemap: true
	},
	plugins: [
		resolve(),
		svelte({
			hydratable: true,
			css: false // already present on page
		})
	],
	external: ['internal']
};
