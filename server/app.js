'use strict';

var Nested = require( './Nested.html' );
Nested = ( Nested && Nested.__esModule ) ? Nested['default'] : Nested;

var template = (function () {
	return {
		data () {
			return {
				query: '???'
			};
		},

		components: {
			Nested
		},

		methods: {
			showAlert () {
				alert( 'the page is now interactive' );
			}
		}
	}
}());

exports.filename = "/Users/rharris/Documents/www/SVELTE/misc/ssr-bundle/shared/App.html";

exports.render = function ( data, options ) {
	data = Object.assign( template.data(), data || {} );
	
	var rendered = '';
	
	rendered += `<h1 svelte-1089874807>Page ${__escape( String( data.page) )}</h1>`;
	
	rendered += `
	 
	 `;
	
	rendered += `<p svelte-1089874807>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`;
	
	rendered += `
	 
	 `;
	
	rendered += `<p svelte-1089874807>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`;
	
	rendered += `
	 
	 `;
	
	rendered += template.components.Nested.render({page: data.page});
	
	rendered += `
	 
	 `;
	
	rendered +=  data.loading ? `<p svelte-1089874807>loading...</p>` : `<button svelte-1089874807>click me</button>` ;
	
	return rendered;
};

exports.renderCss = function () {
	var components = [];
	
	components.push({
		filename: exports.filename,
		css: "                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                \n\th1[svelte-1089874807], [svelte-1089874807] h1 {\n\t\tfont-family: 'Helvetica Neue';\n\t\tfont-size: 2em;\n\t\tfont-weight: 200;\n\t}\n\n\tp[svelte-1089874807], [svelte-1089874807] p {\n\t\tmax-width: 40em;\n\t}\n",
		map: null // TODO
	});
	
	var seen = {};
	
	function addComponent ( component ) {
		var result = component.renderCss();
		result.components.forEach( x => {
			if ( seen[ x.filename ] ) return;
			seen[ x.filename ] = true;
			components.push( x );
		});
	}
	
	addComponent( template.components.Nested );
	
	return {
		css: components.map( x => x.css ).join( '\n' ),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape ( html ) {
	return html.replace( /["'&<>]/g, match => escaped[ match ] );
}
