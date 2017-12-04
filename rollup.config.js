import svelte from 'rollup-plugin-svelte';

export default {
	input: 'client/app.js',
	output: {
        file: 'public/build/bundle.js',
        format: 'iife',
		sourcemap: true
    },
	plugins: [
		svelte({
			hydratable: true,
			css: false // already present on page
		})
	]
};
