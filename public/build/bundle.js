(function () {
'use strict';

function noop() {}

function assign(target) {
	var k,
		source,
		i = 1,
		len = arguments.length;
	for (; i < len; i++) {
		source = arguments[i];
		for (k in source) target[k] = source[k];
	}

	return target;
}

function appendNode(node, target) {
	target.appendChild(node);
}

function insertNode(node, target, anchor) {
	target.insertBefore(node, anchor);
}

function detachNode(node) {
	node.parentNode.removeChild(node);
}

function createElement(name) {
	return document.createElement(name);
}

function createSvgElement(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

function createText(data) {
	return document.createTextNode(data);
}

function addListener(node, event, handler) {
	node.addEventListener(event, handler, false);
}

function removeListener(node, event, handler) {
	node.removeEventListener(event, handler, false);
}

function setAttribute(node, attribute, value) {
	node.setAttribute(attribute, value);
}

function children (element) {
	return Array.from(element.childNodes);
}

function claimElement (nodes, name, attributes, svg) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeName === name) {
			for (var j = 0; j < node.attributes.length; j += 1) {
				var attribute = node.attributes[j];
				if (!attributes[attribute.name]) node.removeAttribute(attribute.name);
			}
			return nodes.splice(i, 1)[0]; // TODO strip unwanted attributes
		}
	}

	return svg ? createSvgElement(name) : createElement(name);
}

function claimText (nodes, data) {
	for (var i = 0; i < nodes.length; i += 1) {
		var node = nodes[i];
		if (node.nodeType === 3) {
			node.data = data;
			return nodes.splice(i, 1)[0];
		}
	}

	return createText(data);
}

function blankObject() {
	return Object.create(null);
}

function destroy(detach) {
	this.destroy = noop;
	this.fire('destroy');
	this.set = this.get = noop;

	if (detach !== false) this._fragment.u();
	this._fragment.d();
	this._fragment = this._state = null;
}

function differs(a, b) {
	return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}

function dispatchObservers(component, group, changed, newState, oldState) {
	for (var key in group) {
		if (!changed[key]) continue;

		var newValue = newState[key];
		var oldValue = oldState[key];

		var callbacks = group[key];
		if (!callbacks) continue;

		for (var i = 0; i < callbacks.length; i += 1) {
			var callback = callbacks[i];
			if (callback.__calling) continue;

			callback.__calling = true;
			callback.call(component, newValue, oldValue);
			callback.__calling = false;
		}
	}
}

function fire(eventName, data) {
	var handlers =
		eventName in this._handlers && this._handlers[eventName].slice();
	if (!handlers) return;

	for (var i = 0; i < handlers.length; i += 1) {
		handlers[i].call(this, data);
	}
}

function get(key) {
	return key ? this._state[key] : this._state;
}

function init(component, options) {
	component._observers = { pre: blankObject(), post: blankObject() };
	component._handlers = blankObject();
	component._root = options._root || component;
	component._bind = options._bind;

	component.options = options;
	component.store = component._root.options.store;
}

function observe(key, callback, options) {
	var group = options && options.defer
		? this._observers.post
		: this._observers.pre;

	(group[key] || (group[key] = [])).push(callback);

	if (!options || options.init !== false) {
		callback.__calling = true;
		callback.call(this, this._state[key]);
		callback.__calling = false;
	}

	return {
		cancel: function() {
			var index = group[key].indexOf(callback);
			if (~index) group[key].splice(index, 1);
		}
	};
}

function on(eventName, handler) {
	if (eventName === 'teardown') return this.on('destroy', handler);

	var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
	handlers.push(handler);

	return {
		cancel: function() {
			var index = handlers.indexOf(handler);
			if (~index) handlers.splice(index, 1);
		}
	};
}

function set(newState) {
	this._set(assign({}, newState));
	if (this._root._lock) return;
	this._root._lock = true;
	callAll(this._root._beforecreate);
	callAll(this._root._oncreate);
	callAll(this._root._aftercreate);
	this._root._lock = false;
}

function _set(newState) {
	var oldState = this._state,
		changed = {},
		dirty = false;

	for (var key in newState) {
		if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
	}
	if (!dirty) return;

	this._state = assign({}, oldState, newState);
	this._recompute(changed, this._state);
	if (this._bind) this._bind(changed, this._state);

	if (this._fragment) {
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}
}

function callAll(fns) {
	while (fns && fns.length) fns.pop()();
}

function _mount(target, anchor) {
	this._fragment.m(target, anchor);
}

function _unmount() {
	this._fragment.u();
}

var proto = {
	destroy: destroy,
	get: get,
	fire: fire,
	observe: observe,
	on: on,
	set: set,
	teardown: destroy,
	_recompute: noop,
	_set: _set,
	_mount: _mount,
	_unmount: _unmount
};

/* shared\Nested.html generated by Svelte v1.43.1 */
function encapsulateStyles$1(node) {
	setAttribute(node, "svelte-971150694", "");
}

function create_main_fragment$1(state, component) {
	var div, p, text, text_1, text_2, a, text_3, text_4_value = state.page + 1, text_4, a_href_value;

	var if_block = (state.page > 1) && create_if_block$1(state, component);

	return {
		c: function create() {
			div = createElement("div");
			p = createElement("p");
			text = createText("this is a nested component");
			text_1 = createText("\r\n\t");
			if (if_block) if_block.c();
			text_2 = createText("\r\n\r\n\t");
			a = createElement("a");
			text_3 = createText("page ");
			text_4 = createText(text_4_value);
			this.h();
		},

		l: function claim(nodes) {
			div = claimElement(nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			p = claimElement(div_nodes, "P", {}, false);
			var p_nodes = children(p);

			text = claimText(p_nodes, "this is a nested component");
			p_nodes.forEach(detachNode);
			text_1 = claimText(div_nodes, "\r\n\t");
			if (if_block) if_block.l(div_nodes);
			text_2 = claimText(div_nodes, "\r\n\r\n\t");

			a = claimElement(div_nodes, "A", { class: true, href: true }, false);
			var a_nodes = children(a);

			text_3 = claimText(a_nodes, "page ");
			text_4 = claimText(a_nodes, text_4_value);
			a_nodes.forEach(detachNode);
			div_nodes.forEach(detachNode);
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles$1(div);
			a.className = "next";
			a.href = a_href_value = "/page/" + (state.page + 1);
			div.className = "pagination";
		},

		m: function mount(target, anchor) {
			insertNode(div, target, anchor);
			appendNode(p, div);
			appendNode(text, p);
			appendNode(text_1, div);
			if (if_block) if_block.m(div, null);
			appendNode(text_2, div);
			appendNode(a, div);
			appendNode(text_3, a);
			appendNode(text_4, a);
		},

		p: function update(changed, state) {
			if (state.page > 1) {
				if (if_block) {
					if_block.p(changed, state);
				} else {
					if_block = create_if_block$1(state, component);
					if_block.c();
					if_block.m(div, text_2);
				}
			} else if (if_block) {
				if_block.u();
				if_block.d();
				if_block = null;
			}

			if ((changed.page) && text_4_value !== (text_4_value = state.page + 1)) {
				text_4.data = text_4_value;
			}

			if ((changed.page) && a_href_value !== (a_href_value = "/page/" + (state.page + 1))) {
				a.href = a_href_value;
			}
		},

		u: function unmount() {
			detachNode(div);
			if (if_block) if_block.u();
		},

		d: function destroy$$1() {
			if (if_block) if_block.d();
		}
	};
}

// (3:1) {{#if page > 1}}
function create_if_block$1(state, component) {
	var a, text, text_1_value = state.page - 1, text_1, a_href_value;

	return {
		c: function create() {
			a = createElement("a");
			text = createText("page ");
			text_1 = createText(text_1_value);
			this.h();
		},

		l: function claim(nodes) {
			a = claimElement(nodes, "A", { class: true, href: true }, false);
			var a_nodes = children(a);

			text = claimText(a_nodes, "page ");
			text_1 = claimText(a_nodes, text_1_value);
			a_nodes.forEach(detachNode);
			this.h();
		},

		h: function hydrate() {
			a.className = "prev";
			a.href = a_href_value = "/page/" + (state.page - 1);
		},

		m: function mount(target, anchor) {
			insertNode(a, target, anchor);
			appendNode(text, a);
			appendNode(text_1, a);
		},

		p: function update(changed, state) {
			if ((changed.page) && text_1_value !== (text_1_value = state.page - 1)) {
				text_1.data = text_1_value;
			}

			if ((changed.page) && a_href_value !== (a_href_value = "/page/" + (state.page - 1))) {
				a.href = a_href_value;
			}
		},

		u: function unmount() {
			detachNode(a);
		},

		d: noop
	};
}

function Nested(options) {
	init(this, options);
	this._state = assign({}, options.data);

	this._fragment = create_main_fragment$1(this._state, this);

	if (options.target) {
		var nodes = children(options.target);
		options.hydrate ? this._fragment.l(nodes) : this._fragment.c();
		nodes.forEach(detachNode);
		this._fragment.m(options.target, options.anchor || null);
	}
}

assign(Nested.prototype, proto);

/* shared\App.html generated by Svelte v1.43.1 */
function data() {
	return {
		query: '???',
		loading: true
	};
}

var methods = {
	showAlert () {
		alert( 'the page is now interactive' );
	}
};

function encapsulateStyles(node) {
	setAttribute(node, "svelte-2816211527", "");
}

function create_main_fragment(state, component) {
	var h1, text, text_1, text_2, p, text_3, text_4, p_1, text_5, text_6, div, text_8;

	var current_block_type = select_block_type(state);
	var if_block = current_block_type(state, component);

	var nested = new Nested({
		_root: component._root,
		data: { page: state.page }
	});

	return {
		c: function create() {
			h1 = createElement("h1");
			text = createText("Page ");
			text_1 = createText(state.page);
			text_2 = createText("\r\n\r\n");
			p = createElement("p");
			text_3 = createText("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
			text_4 = createText("\r\n\r\n");
			p_1 = createElement("p");
			text_5 = createText("Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
			text_6 = createText("\r\n\r\n");
			div = createElement("div");
			if_block.c();
			text_8 = createText("\r\n\r\n");
			nested._fragment.c();
			this.h();
		},

		l: function claim(nodes) {
			h1 = claimElement(nodes, "H1", {}, false);
			var h1_nodes = children(h1);

			text = claimText(h1_nodes, "Page ");
			text_1 = claimText(h1_nodes, state.page);
			h1_nodes.forEach(detachNode);
			text_2 = claimText(nodes, "\r\n\r\n");

			p = claimElement(nodes, "P", {}, false);
			var p_nodes = children(p);

			text_3 = claimText(p_nodes, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
			p_nodes.forEach(detachNode);
			text_4 = claimText(nodes, "\r\n\r\n");

			p_1 = claimElement(nodes, "P", {}, false);
			var p_1_nodes = children(p_1);

			text_5 = claimText(p_1_nodes, "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
			p_1_nodes.forEach(detachNode);
			text_6 = claimText(nodes, "\r\n\r\n");

			div = claimElement(nodes, "DIV", { class: true }, false);
			var div_nodes = children(div);

			if_block.l(div_nodes);
			div_nodes.forEach(detachNode);
			text_8 = claimText(nodes, "\r\n\r\n");
			nested._fragment.l(nodes);
			this.h();
		},

		h: function hydrate() {
			encapsulateStyles(h1);
			encapsulateStyles(p);
			encapsulateStyles(p_1);
			encapsulateStyles(div);
			div.className = "interactive";
		},

		m: function mount(target, anchor) {
			insertNode(h1, target, anchor);
			appendNode(text, h1);
			appendNode(text_1, h1);
			insertNode(text_2, target, anchor);
			insertNode(p, target, anchor);
			appendNode(text_3, p);
			insertNode(text_4, target, anchor);
			insertNode(p_1, target, anchor);
			appendNode(text_5, p_1);
			insertNode(text_6, target, anchor);
			insertNode(div, target, anchor);
			if_block.m(div, null);
			insertNode(text_8, target, anchor);
			nested._mount(target, anchor);
		},

		p: function update(changed, state) {
			if (changed.page) {
				text_1.data = state.page;
			}

			if (current_block_type !== (current_block_type = select_block_type(state))) {
				if_block.u();
				if_block.d();
				if_block = current_block_type(state, component);
				if_block.c();
				if_block.m(div, null);
			}

			var nested_changes = {};
			if (changed.page) nested_changes.page = state.page;
			nested._set(nested_changes);
		},

		u: function unmount() {
			detachNode(h1);
			detachNode(text_2);
			detachNode(p);
			detachNode(text_4);
			detachNode(p_1);
			detachNode(text_6);
			detachNode(div);
			if_block.u();
			detachNode(text_8);
			nested._unmount();
		},

		d: function destroy$$1() {
			if_block.d();
			nested.destroy(false);
		}
	};
}

// (8:1) {{#if loading}}
function create_if_block(state, component) {
	var p, text;

	return {
		c: function create() {
			p = createElement("p");
			text = createText("loading...");
		},

		l: function claim(nodes) {
			p = claimElement(nodes, "P", {}, false);
			var p_nodes = children(p);

			text = claimText(p_nodes, "loading...");
			p_nodes.forEach(detachNode);
		},

		m: function mount(target, anchor) {
			insertNode(p, target, anchor);
			appendNode(text, p);
		},

		u: function unmount() {
			detachNode(p);
		},

		d: noop
	};
}

// (10:1) {{else}}
function create_if_block_1(state, component) {
	var button, text;

	function click_handler(event) {
		component.showAlert();
	}

	return {
		c: function create() {
			button = createElement("button");
			text = createText("click me");
			this.h();
		},

		l: function claim(nodes) {
			button = claimElement(nodes, "BUTTON", {}, false);
			var button_nodes = children(button);

			text = claimText(button_nodes, "click me");
			button_nodes.forEach(detachNode);
			this.h();
		},

		h: function hydrate() {
			addListener(button, "click", click_handler);
		},

		m: function mount(target, anchor) {
			insertNode(button, target, anchor);
			appendNode(text, button);
		},

		u: function unmount() {
			detachNode(button);
		},

		d: function destroy$$1() {
			removeListener(button, "click", click_handler);
		}
	};
}

function select_block_type(state) {
	if (state.loading) return create_if_block;
	return create_if_block_1;
}

function App(options) {
	init(this, options);
	this._state = assign(data(), options.data);

	if (!options._root) {
		this._oncreate = [];
		this._beforecreate = [];
		this._aftercreate = [];
	}

	this._fragment = create_main_fragment(this._state, this);

	if (options.target) {
		var nodes = children(options.target);
		options.hydrate ? this._fragment.l(nodes) : this._fragment.c();
		nodes.forEach(detachNode);
		this._fragment.m(options.target, options.anchor || null);

		this._lock = true;
		callAll(this._beforecreate);
		callAll(this._oncreate);
		callAll(this._aftercreate);
		this._lock = false;
	}
}

assign(App.prototype, methods, proto);

const match = /\/page\/(\d+)/.exec( window.location.pathname );

const target = document.querySelector( 'main' );

// simulate a loading delay before app becomes interactive
setTimeout( () => {

	window.app = new App({
		target,
        hydrate: true,
		data: {
			page: +match[1],
			loading: false
		}
	});
}, 1000 );

}());
//# sourceMappingURL=bundle.js.map
