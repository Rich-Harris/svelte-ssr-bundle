import internal from 'svelte/internal';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';

global.internal = internal;

export default {
	input: 'shared/App.html',
	output: {
		file: 'server/build/app.js',
		format: 'cjs'
	},
	plugins: [
		resolve(),
		svelte({
			generate: 'ssr',
		})
	],
	external: ['internal']
};
