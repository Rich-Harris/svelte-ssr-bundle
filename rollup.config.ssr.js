import svelte from 'rollup-plugin-svelte';

export default {
	entry: 'shared/App.html',
	dest: 'server/app.js',
	format: 'cjs',
	plugins: [
		svelte({
			generate: 'ssr'
		})
	]
};
