import svelte from 'rollup-plugin-svelte';

export default {
	input: 'client/app.js',
	output: {
		file: 'public/build/bundle.js',
		format: 'iife'
	},
	plugins: [
		svelte({
			css: false // already present on page
		})
	]
};
