import svelte from 'rollup-plugin-svelte';

export default {
	entry: 'client/app.js',
	dest: 'public/build/bundle.js',
	format: 'iife',
	plugins: [
		svelte({
			css: false // already present on page
		})
	]
};
