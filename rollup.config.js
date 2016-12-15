import svelte from 'rollup-plugin-svelte';

export default {
	entry: 'client/app.js',
	dest: 'public/app.js',
	format: 'iife',
	plugins: [
		svelte()
	]
};
