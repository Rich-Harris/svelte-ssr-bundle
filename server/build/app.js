'use strict';

var Nested = {};

Nested.filename = "/www/SVELTE/misc/ssr-bundle/shared/Nested.html";

Nested.render = function ( root, options ) {
	root = root || {};
	
	return `<div class="pagination" svelte-3548289220><p svelte-3548289220>this is a nested component</p>
		${ root.page > 1 ? `<a class="prev" href="/page/${root.page - 1}" svelte-3548289220>page ${__escape$1( root.page - 1 )}</a>` : `` }
	
		<a class="next" href="/page/${root.page + 1}" svelte-3548289220>page ${__escape$1( root.page + 1 )}</a></div>`;
};

Nested.renderCss = function () {
	var components = [];
	
	components.push({
		filename: Nested.filename,
		css: "\n\t.pagination[svelte-3548289220], [svelte-3548289220] .pagination {\n\t\twidth: 100%;\n\t}\n\n\tp[svelte-3548289220], [svelte-3548289220] p {\n\t\tcolor: red;\n\t\tfont-family: 'Comic Sans MS';\n\t\tfont-size: 2em;\n\t}\n\n\ta[svelte-3548289220], [svelte-3548289220] a {\n\t\tfont-family: 'Helvetica Neue';\n\t\tdisplay: block;\n\t\ttext-color: #999;\n\t\ttext-decoration: none;\n\t}\n\n\ta[svelte-3548289220]:hover, [svelte-3548289220] a:hover {\n\t\ttext-color: #333;\n\t}\n\n\t.prev[svelte-3548289220], [svelte-3548289220] .prev {\n\t\tfloat: left;\n\t}\n\n\t.next[svelte-3548289220], [svelte-3548289220] .next {\n\t\tfloat: right;\n\t}\n",
		map: null // TODO
	});
	
	return {
		css: components.map( x => x.css ).join( '\n' ),
		map: null,
		components
	};
};

var escaped$1 = {
	'"': '&quot;',
	"'": '&39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape$1 ( html ) {
	return String( html ).replace( /["'&<>]/g, match => escaped$1[ match ] );
}

var template = (function () {
	return {
		data () {
			return {
				query: '???',
				loading: true
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

var App = {};

App.filename = "/www/SVELTE/misc/ssr-bundle/shared/App.html";

App.render = function ( root, options ) {
	root = Object.assign( template.data(), root || {} );
	
	return `<h1 svelte-3293511188>Page ${__escape( root.page )}</h1>
	
	<p svelte-3293511188>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	
	<p svelte-3293511188>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
	
	<div class="interactive" svelte-3293511188>${ root.loading ? `<p svelte-3293511188>loading...</p>` : `<button svelte-3293511188>click me</button>` }</div>
	
	${template.components.Nested.render({page: root.page})}`;
};

App.renderCss = function () {
	var components = [];
	
	components.push({
		filename: App.filename,
		css: "\n\th1[svelte-3293511188], [svelte-3293511188] h1 {\n\t\tfont-family: 'Helvetica Neue';\n\t\tfont-size: 2em;\n\t\tfont-weight: 200;\n\t}\n\n\tp[svelte-3293511188], [svelte-3293511188] p {\n\t\tmax-width: 40em;\n\t\tfont-family: 'Helvetica Neue';\n\t}\n\n\t.interactive[svelte-3293511188], [svelte-3293511188] .interactive {\n\t\tbackground-color: #eee;\n\t\theight: 4em;\n\t\tpadding: 1em;\n\t\tbox-sizing: border-box;\n\t\ttext-align: center;\n\t\tfont-family: 'Helvetica Neue';\n\t\tfont-weight: 900;\n\t}\n\n\t.interactive  p[svelte-3293511188], .interactive  [svelte-3293511188] p, .interactive[svelte-3293511188]  p, [svelte-3293511188] .interactive  p {\n\t\tmargin: 0;\n\t}\n\n\tbutton[svelte-3293511188], [svelte-3293511188] button {\n\t\tfont-family: inherit;\n\t\tfont-size: inherit;\n\t}\n",
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
	return String( html ).replace( /["'&<>]/g, match => escaped[ match ] );
}

module.exports = App;
