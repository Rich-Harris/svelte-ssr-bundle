import svelte from 'rollup-plugin-svelte';

export default {
	input: 'shared/App.html',
	output: {
		file: 'server/build/app.js',
		format: 'cjs'
	},
	plugins: [
		svelte({
			generate: 'ssr'
		})
	]
};
