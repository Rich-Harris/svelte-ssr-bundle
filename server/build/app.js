'use strict';

var Nested = {};

Nested.filename = "D:\\Dokumente\\ws\\svelte\\svelte-ssr-bundle\\shared\\Nested.html";

Nested.data = function() {
	return {};
};

Nested.render = function(state, options = {}) {
	state = Object.assign({}, state);

	return `<div class="pagination" svelte-971150694>
	<p>this is a nested component</p>
	${ state.page > 1 ? `<a class="prev" href="/page/${state.page - 1}">page ${__escape$1(state.page - 1)}</a>` : `` }

	<a class="next" href="/page/${state.page + 1}">page ${__escape$1(state.page + 1)}</a>
</div>

`.trim();
};

Nested.renderCss = function() {
	var components = [];

	components.push({
		filename: Nested.filename,
		css: "[svelte-971150694].pagination,[svelte-971150694] .pagination{width:100%}p[svelte-971150694],[svelte-971150694] p{color:red;font-family:'Comic Sans MS';font-size:2em}a[svelte-971150694],[svelte-971150694] a{font-family:'Helvetica Neue';display:block;text-color:#999;text-decoration:none}a[svelte-971150694]:hover,[svelte-971150694] a:hover{text-color:#333}[svelte-971150694].prev,[svelte-971150694] .prev{float:left}[svelte-971150694].next,[svelte-971150694] .next{float:right}",
		map: "{\"version\":3,\"file\":\"Nested.html\",\"sources\":[\"Nested.html\"],\"sourcesContent\":[\"<div class='pagination'>\\r\\n\\t<p>this is a nested component</p>\\r\\n\\t{{#if page > 1}}\\r\\n\\t\\t<a class='prev' href='/page/{{page - 1}}'>page {{page - 1}}</a>\\r\\n\\t{{/if}}\\r\\n\\r\\n\\t<a class='next' href='/page/{{page + 1}}'>page {{page + 1}}</a>\\r\\n</div>\\r\\n\\r\\n<style>\\r\\n\\t.pagination {\\r\\n\\t\\twidth: 100%;\\r\\n\\t}\\r\\n\\r\\n\\tp {\\r\\n\\t\\tcolor: red;\\r\\n\\t\\tfont-family: 'Comic Sans MS';\\r\\n\\t\\tfont-size: 2em;\\r\\n\\t}\\r\\n\\r\\n\\ta {\\r\\n\\t\\tfont-family: 'Helvetica Neue';\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\ttext-color: #999;\\r\\n\\t\\ttext-decoration: none;\\r\\n\\t}\\r\\n\\r\\n\\ta:hover {\\r\\n\\t\\ttext-color: #333;\\r\\n\\t}\\r\\n\\r\\n\\t.prev {\\r\\n\\t\\tfloat: left;\\r\\n\\t}\\r\\n\\r\\n\\t.next {\\r\\n\\t\\tfloat: right;\\r\\n\\t}\\r\\n</style>\\r\\n\"],\"names\":[],\"mappings\":\"AAUC,4DAAY,CAAC,AACZ,KAAK,CAAE,IAAI,AACZ,CAAC,AAED,wCAAE,CAAC,AACF,KAAK,CAAE,GAAG,CACV,WAAW,CAAE,eAAe,CAC5B,SAAS,CAAE,GAAG,AACf,CAAC,AAED,wCAAE,CAAC,AACF,WAAW,CAAE,gBAAgB,CAC7B,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,IAAI,CAChB,eAAe,CAAE,IAAI,AACtB,CAAC,AAED,oDAAQ,CAAC,AACR,UAAU,CAAE,IAAI,AACjB,CAAC,AAED,gDAAM,CAAC,AACN,KAAK,CAAE,IAAI,AACZ,CAAC,AAED,gDAAM,CAAC,AACN,KAAK,CAAE,KAAK,AACb,CAAC\"}"
	});

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

function data() {
	return {
		query: '???',
		loading: true
	};
}

var App = {};

App.filename = "D:\\Dokumente\\ws\\svelte\\svelte-ssr-bundle\\shared\\App.html";

App.data = function() {
	return data();
};

App.render = function(state, options = {}) {
	state = Object.assign(data(), state);

	return `<h1 svelte-2816211527>Page ${__escape(state.page)}</h1>

<p svelte-2816211527>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

<p svelte-2816211527>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<div class="interactive" svelte-2816211527>
	${ state.loading ? `<p>loading...</p>` : `<button>click me</button>` }
</div>

${Nested.render({page: state.page})}



`.trim();
};

App.renderCss = function() {
	var components = [];

	components.push({
		filename: App.filename,
		css: "h1[svelte-2816211527],[svelte-2816211527] h1{font-family:'Helvetica Neue';font-size:2em;font-weight:200}p[svelte-2816211527],[svelte-2816211527] p{max-width:40em;font-family:'Helvetica Neue'}[svelte-2816211527].interactive,[svelte-2816211527] .interactive{background-color:#eee;height:4em;padding:1em;box-sizing:border-box;text-align:center;font-family:'Helvetica Neue';font-weight:900}[svelte-2816211527].interactive p,[svelte-2816211527] .interactive p{margin:0}button[svelte-2816211527],[svelte-2816211527] button{font-family:inherit;font-size:inherit}",
		map: "{\"version\":3,\"file\":\"App.html\",\"sources\":[\"App.html\"],\"sourcesContent\":[\"<h1>Page {{page}}</h1>\\r\\n\\r\\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>\\r\\n\\r\\n<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\\r\\n\\r\\n<div class='interactive'>\\r\\n\\t{{#if loading}}\\r\\n\\t\\t<p>loading...</p>\\r\\n\\t{{else}}\\r\\n\\t\\t<button on:click='showAlert()'>click me</button>\\r\\n\\t{{/if}}\\r\\n</div>\\r\\n\\r\\n<Nested page='{{page}}'/>\\r\\n\\r\\n<style>\\r\\n\\th1 {\\r\\n\\t\\tfont-family: 'Helvetica Neue';\\r\\n\\t\\tfont-size: 2em;\\r\\n\\t\\tfont-weight: 200;\\r\\n\\t}\\r\\n\\r\\n\\tp {\\r\\n\\t\\tmax-width: 40em;\\r\\n\\t\\tfont-family: 'Helvetica Neue';\\r\\n\\t}\\r\\n\\r\\n\\t.interactive {\\r\\n\\t\\tbackground-color: #eee;\\r\\n\\t\\theight: 4em;\\r\\n\\t\\tpadding: 1em;\\r\\n\\t\\tbox-sizing: border-box;\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tfont-family: 'Helvetica Neue';\\r\\n\\t\\tfont-weight: 900;\\r\\n\\t}\\r\\n\\r\\n\\t.interactive p {\\r\\n\\t\\tmargin: 0;\\r\\n\\t}\\r\\n\\r\\n\\tbutton {\\r\\n\\t\\tfont-family: inherit;\\r\\n\\t\\tfont-size: inherit;\\r\\n\\t}\\r\\n</style>\\r\\n\\r\\n<script>\\r\\n\\timport Nested from './Nested.html';\\r\\n\\r\\n\\texport default {\\r\\n\\t\\tdata () {\\r\\n\\t\\t\\treturn {\\r\\n\\t\\t\\t\\tquery: '???',\\r\\n\\t\\t\\t\\tloading: true\\r\\n\\t\\t\\t};\\r\\n\\t\\t},\\r\\n\\r\\n\\t\\tcomponents: {\\r\\n\\t\\t\\tNested\\r\\n\\t\\t},\\r\\n\\r\\n\\t\\tmethods: {\\r\\n\\t\\t\\tshowAlert () {\\r\\n\\t\\t\\t\\talert( 'the page is now interactive' );\\r\\n\\t\\t\\t}\\r\\n\\t\\t}\\r\\n\\t}\\r\\n</script>\\r\\n\"],\"names\":[],\"mappings\":\"AAiBC,4CAAG,CAAC,AACH,WAAW,CAAE,gBAAgB,CAC7B,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,0CAAE,CAAC,AACF,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,gBAAgB,AAC9B,CAAC,AAED,gEAAa,CAAC,AACb,gBAAgB,CAAE,IAAI,CACtB,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,GAAG,CACZ,UAAU,CAAE,UAAU,CACtB,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,gBAAgB,CAC7B,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,oEAAe,CAAC,AACf,MAAM,CAAE,CAAC,AACV,CAAC,AAED,oDAAO,CAAC,AACP,WAAW,CAAE,OAAO,CACpB,SAAS,CAAE,OAAO,AACnB,CAAC\"}"
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

module.exports = App;
