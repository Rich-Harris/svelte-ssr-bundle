'use strict';

var Nested = {};

Nested.filename = "/Users/bahador/dev/svelte-ssr-bundle/shared/Nested.html";

Nested.data = function() {
	return {};
};

Nested.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = Nested._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return html;
		}
	};
};

Nested._render = function(__result, state, options) {
	__result.addComponent(Nested);

	state = Object.assign({}, state);

	return `<div class="pagination" svelte-3543376773>
	<p>this is a nested component</p>
	${ state.page > 1 ? `<a class="prev" href="/page/${__escape(state.page - 1)}">page ${__escape(state.page - 1)}</a>` : `` }

	<a class="next" href="/page/${__escape(state.page + 1)}">page ${__escape(state.page + 1)}</a>
</div>`;
};

Nested.css = {
	code: "[svelte-3543376773].pagination,[svelte-3543376773] .pagination{width:100%}p[svelte-3543376773],[svelte-3543376773] p{color:red;font-family:'Comic Sans MS';font-size:2em}a[svelte-3543376773],[svelte-3543376773] a{font-family:'Helvetica Neue';display:block;text-color:#999;text-decoration:none}a[svelte-3543376773]:hover,[svelte-3543376773] a:hover{text-color:#333}[svelte-3543376773].prev,[svelte-3543376773] .prev{float:left}[svelte-3543376773].next,[svelte-3543376773] .next{float:right}",
	map: "{\"version\":3,\"file\":\"Nested.html\",\"sources\":[\"Nested.html\"],\"sourcesContent\":[\"<div class='pagination'>\\n\\t<p>this is a nested component</p>\\n\\t{{#if page > 1}}\\n\\t\\t<a class='prev' href='/page/{{page - 1}}'>page {{page - 1}}</a>\\n\\t{{/if}}\\n\\n\\t<a class='next' href='/page/{{page + 1}}'>page {{page + 1}}</a>\\n</div>\\n\\n<style>\\n\\t.pagination {\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\tp {\\n\\t\\tcolor: red;\\n\\t\\tfont-family: 'Comic Sans MS';\\n\\t\\tfont-size: 2em;\\n\\t}\\n\\n\\ta {\\n\\t\\tfont-family: 'Helvetica Neue';\\n\\t\\tdisplay: block;\\n\\t\\ttext-color: #999;\\n\\t\\ttext-decoration: none;\\n\\t}\\n\\n\\ta:hover {\\n\\t\\ttext-color: #333;\\n\\t}\\n\\n\\t.prev {\\n\\t\\tfloat: left;\\n\\t}\\n\\n\\t.next {\\n\\t\\tfloat: right;\\n\\t}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAUC,8DAAY,CAAC,AACZ,KAAK,CAAE,IAAI,AACZ,CAAC,AAED,0CAAE,CAAC,AACF,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,eAAe,CAC5B,SAAS,CAAE,GAAG,AACf,CAAC,AAED,0CAAE,CAAC,AACF,WAAW,CAAE,gBAAgB,CAC7B,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,IAAI,CAChB,eAAe,CAAE,IAAI,AACtB,CAAC,AAED,sDAAQ,CAAC,AACR,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,kDAAM,CAAC,AACN,KAAK,CAAE,IAAI,AACZ,CAAC,AAED,kDAAM,CAAC,AACN,KAAK,CAAE,KAAK,AACb,CAAC\"}"
};

var warned = false;
Nested.renderCss = function() {
	if (!warned) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned = true;
	}

	var components = [];

	components.push({
		filename: Nested.filename,
		css: Nested.css && Nested.css.code,
		map: Nested.css && Nested.css.map
	});

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape(html) {
	return String(html).replace(/["'&<>]/g, match => escaped[match]);
}

function data() {
	return {
		query: '???',
		loading: true
	};
}
var App = {};

App.filename = "/Users/bahador/dev/svelte-ssr-bundle/shared/App.html";

App.data = function() {
	return data();
};

App.render = function(state, options = {}) {
	var components = new Set();

	function addComponent(component) {
		components.add(component);
	}

	var result = { head: '', addComponent };
	var html = App._render(result, state, options);

	var cssCode = Array.from(components).map(c => c.css && c.css.code).filter(Boolean).join('\n');

	return {
		html,
		head: result.head,
		css: { code: cssCode, map: null },
		toString() {
			return html;
		}
	};
};

App._render = function(__result, state, options) {
	__result.addComponent(App);

	state = Object.assign(data(), state);

	return `<h1 svelte-2482873238>Page ${__escape$1(state.page)}</h1>

<p svelte-2482873238>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

<p svelte-2482873238>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<div class="interactive" svelte-2482873238>
	${ state.loading ? `<p>loading...</p>` : `<button>click me</button>` }
</div>

${Nested._render(__result, {page: state.page})}`;
};

App.css = {
	code: "h1[svelte-2482873238],[svelte-2482873238] h1{font-family:'Helvetica Neue';font-size:2em;font-weight:200}p[svelte-2482873238],[svelte-2482873238] p{max-width:40em;font-family:'Helvetica Neue'}[svelte-2482873238].interactive,[svelte-2482873238] .interactive{background-color:#eee;height:4em;padding:1em;box-sizing:border-box;text-align:center;font-family:'Helvetica Neue';font-weight:900}[svelte-2482873238].interactive p,[svelte-2482873238] .interactive p{margin:0}button[svelte-2482873238],[svelte-2482873238] button{font-family:inherit;font-size:inherit}",
	map: "{\"version\":3,\"file\":\"App.html\",\"sources\":[\"App.html\"],\"sourcesContent\":[\"<h1>Page {{page}}</h1>\\n\\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\\n\\n<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\\n\\n<div class='interactive'>\\n\\t{{#if loading}}\\n\\t\\t<p>loading...</p>\\n\\t{{else}}\\n\\t\\t<button on:click='showAlert()'>click me</button>\\n\\t{{/if}}\\n</div>\\n\\n<Nested page='{{page}}'/>\\n\\n<style>\\n\\th1 {\\n\\t\\tfont-family: 'Helvetica Neue';\\n\\t\\tfont-size: 2em;\\n\\t\\tfont-weight: 200;\\n\\t}\\n\\n\\tp {\\n\\t\\tmax-width: 40em;\\n\\t\\tfont-family: 'Helvetica Neue';\\n\\t}\\n\\n\\t.interactive {\\n\\t\\tbackground-color: #eee;\\n\\t\\theight: 4em;\\n\\t\\tpadding: 1em;\\n\\t\\tbox-sizing: border-box;\\n\\t\\ttext-align: center;\\n\\t\\tfont-family: 'Helvetica Neue';\\n\\t\\tfont-weight: 900;\\n\\t}\\n\\n\\t.interactive p {\\n\\t\\tmargin: 0;\\n\\t}\\n\\n\\tbutton {\\n\\t\\tfont-family: inherit;\\n\\t\\tfont-size: inherit;\\n\\t}\\n</style>\\n\\n<script>\\n\\timport Nested from './Nested.html';\\n\\n\\texport default {\\n\\t\\tdata () {\\n\\t\\t\\treturn {\\n\\t\\t\\t\\tquery: '???',\\n\\t\\t\\t\\tloading: true\\n\\t\\t\\t};\\n\\t\\t},\\n\\n\\t\\tcomponents: {\\n\\t\\t\\tNested\\n\\t\\t},\\n\\n\\t\\tmethods: {\\n\\t\\t\\tshowAlert () {\\n\\t\\t\\t\\talert( 'the page is now interactive' );\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n</script>\\n\"],\"names\":[],\"mappings\":\"AAiBC,4CAAG,CAAC,AACH,WAAW,CAAE,gBAAgB,CAC7B,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,0CAAE,CAAC,AACF,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,gBAAgB,AAC9B,CAAC,AAED,gEAAa,CAAC,AACb,gBAAgB,CAAE,IAAI,CACtB,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,gBAAgB,CAC7B,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,oEAAe,CAAC,AACf,MAAM,CAAE,CAAC,AACV,CAAC,AAED,oDAAO,CAAC,AACP,WAAW,CAAE,OAAO,CACpB,SAAS,CAAE,OAAO,AACnB,CAAC\"}"
};

var warned$1 = false;
App.renderCss = function() {
	if (!warned$1) {
		console.error('Component.renderCss(...) is deprecated and will be removed in v2 — use Component.render(...).css instead');
		warned$1 = true;
	}

	var components = [];

	components.push({
		filename: App.filename,
		css: App.css && App.css.code,
		map: App.css && App.css.map
	});

	var seen = {};

	function addComponent(component) {
		var result = component.renderCss();
		result.components.forEach(x => {
			if (seen[x.filename]) return;
			seen[x.filename] = true;
			components.push(x);
		});
	}

	addComponent(Nested);

	return {
		css: components.map(x => x.css).join('\n'),
		map: null,
		components
	};
};

var escaped$1 = {
	'"': '&quot;',
	"'": '&#39;',
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;'
};

function __escape$1(html) {
	return String(html).replace(/["'&<>]/g, match => escaped$1[match]);
}

module.exports = App;
