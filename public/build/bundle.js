(function () {
    'use strict';

    function noop() { }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function claim_element(nodes, name, attributes, svg) {
        for (let i = 0; i < nodes.length; i += 1) {
            const node = nodes[i];
            if (node.nodeName === name) {
                let j = 0;
                while (j < node.attributes.length) {
                    const attribute = node.attributes[j];
                    if (attributes[attribute.name]) {
                        j++;
                    }
                    else {
                        node.removeAttribute(attribute.name);
                    }
                }
                return nodes.splice(i, 1)[0];
            }
        }
        return svg ? svg_element(name) : element(name);
    }
    function claim_text(nodes, data) {
        for (let i = 0; i < nodes.length; i += 1) {
            const node = nodes[i];
            if (node.nodeType === 3) {
                node.data = '' + data;
                return nodes.splice(i, 1)[0];
            }
        }
        return text(data);
    }
    function claim_space(nodes) {
        return claim_text(nodes, ' ');
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function claim_component(block, parent_nodes) {
        block && block.l(parent_nodes);
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    /* shared/Nested.html generated by Svelte v3.19.1 */

    function create_if_block(ctx) {
    	let a;
    	let t0;
    	let t1_value = /*page*/ ctx[0] - 1 + "";
    	let t1;
    	let a_href_value;

    	return {
    		c() {
    			a = element("a");
    			t0 = text("page ");
    			t1 = text(t1_value);
    			this.h();
    		},
    		l(nodes) {
    			a = claim_element(nodes, "A", { class: true, href: true });
    			var a_nodes = children(a);
    			t0 = claim_text(a_nodes, "page ");
    			t1 = claim_text(a_nodes, t1_value);
    			a_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(a, "class", "prev svelte-1hn1wkl");
    			attr(a, "href", a_href_value = "/page/" + (/*page*/ ctx[0] - 1));
    		},
    		m(target, anchor) {
    			insert(target, a, anchor);
    			append(a, t0);
    			append(a, t1);
    		},
    		p(ctx, dirty) {
    			if (dirty & /*page*/ 1 && t1_value !== (t1_value = /*page*/ ctx[0] - 1 + "")) set_data(t1, t1_value);

    			if (dirty & /*page*/ 1 && a_href_value !== (a_href_value = "/page/" + (/*page*/ ctx[0] - 1))) {
    				attr(a, "href", a_href_value);
    			}
    		},
    		d(detaching) {
    			if (detaching) detach(a);
    		}
    	};
    }

    function create_fragment(ctx) {
    	let div;
    	let p;
    	let t0;
    	let t1;
    	let t2;
    	let a;
    	let t3;
    	let t4_value = /*page*/ ctx[0] + 1 + "";
    	let t4;
    	let a_href_value;
    	let if_block = /*page*/ ctx[0] > 1 && create_if_block(ctx);

    	return {
    		c() {
    			div = element("div");
    			p = element("p");
    			t0 = text("this is a nested component");
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			a = element("a");
    			t3 = text("page ");
    			t4 = text(t4_value);
    			this.h();
    		},
    		l(nodes) {
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			p = claim_element(div_nodes, "P", { class: true });
    			var p_nodes = children(p);
    			t0 = claim_text(p_nodes, "this is a nested component");
    			p_nodes.forEach(detach);
    			t1 = claim_space(div_nodes);
    			if (if_block) if_block.l(div_nodes);
    			t2 = claim_space(div_nodes);
    			a = claim_element(div_nodes, "A", { class: true, href: true });
    			var a_nodes = children(a);
    			t3 = claim_text(a_nodes, "page ");
    			t4 = claim_text(a_nodes, t4_value);
    			a_nodes.forEach(detach);
    			div_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(p, "class", "svelte-1hn1wkl");
    			attr(a, "class", "next svelte-1hn1wkl");
    			attr(a, "href", a_href_value = "/page/" + (/*page*/ ctx[0] + 1));
    			attr(div, "class", "pagination svelte-1hn1wkl");
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, p);
    			append(p, t0);
    			append(div, t1);
    			if (if_block) if_block.m(div, null);
    			append(div, t2);
    			append(div, a);
    			append(a, t3);
    			append(a, t4);
    		},
    		p(ctx, [dirty]) {
    			if (/*page*/ ctx[0] > 1) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(div, t2);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*page*/ 1 && t4_value !== (t4_value = /*page*/ ctx[0] + 1 + "")) set_data(t4, t4_value);

    			if (dirty & /*page*/ 1 && a_href_value !== (a_href_value = "/page/" + (/*page*/ ctx[0] + 1))) {
    				attr(a, "href", a_href_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    			if (if_block) if_block.d();
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { page = 1 } = $$props;

    	$$self.$set = $$props => {
    		if ("page" in $$props) $$invalidate(0, page = $$props.page);
    	};

    	return [page];
    }

    class Nested extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, { page: 0 });
    	}
    }

    /* shared/App.html generated by Svelte v3.19.1 */

    function create_else_block(ctx) {
    	let button;
    	let t;
    	let dispose;

    	return {
    		c() {
    			button = element("button");
    			t = text("click me");
    			this.h();
    		},
    		l(nodes) {
    			button = claim_element(nodes, "BUTTON", { class: true });
    			var button_nodes = children(button);
    			t = claim_text(button_nodes, "click me");
    			button_nodes.forEach(detach);
    			this.h();
    		},
    		h() {
    			attr(button, "class", "svelte-1528l92");
    		},
    		m(target, anchor) {
    			insert(target, button, anchor);
    			append(button, t);
    			dispose = listen(button, "click", showAlert());
    		},
    		p: noop,
    		d(detaching) {
    			if (detaching) detach(button);
    			dispose();
    		}
    	};
    }

    function create_fragment$1(ctx) {
    	let h1;
    	let t0;
    	let t1;
    	let t2;
    	let p0;
    	let t3;
    	let t4;
    	let p1;
    	let t5;
    	let t6;
    	let div;
    	let t7;
    	let current;

    	function select_block_type(ctx, dirty) {
    		return create_else_block;
    	}

    	let current_block_type = select_block_type();
    	let if_block = current_block_type(ctx);
    	const nested = new Nested({ props: { page } });

    	return {
    		c() {
    			h1 = element("h1");
    			t0 = text("Page ");
    			t1 = text(page);
    			t2 = space();
    			p0 = element("p");
    			t3 = text("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
    			t4 = space();
    			p1 = element("p");
    			t5 = text("Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    			t6 = space();
    			div = element("div");
    			if_block.c();
    			t7 = space();
    			create_component(nested.$$.fragment);
    			this.h();
    		},
    		l(nodes) {
    			h1 = claim_element(nodes, "H1", { class: true });
    			var h1_nodes = children(h1);
    			t0 = claim_text(h1_nodes, "Page ");
    			t1 = claim_text(h1_nodes, page);
    			h1_nodes.forEach(detach);
    			t2 = claim_space(nodes);
    			p0 = claim_element(nodes, "P", { class: true });
    			var p0_nodes = children(p0);
    			t3 = claim_text(p0_nodes, "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
    			p0_nodes.forEach(detach);
    			t4 = claim_space(nodes);
    			p1 = claim_element(nodes, "P", { class: true });
    			var p1_nodes = children(p1);
    			t5 = claim_text(p1_nodes, "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
    			p1_nodes.forEach(detach);
    			t6 = claim_space(nodes);
    			div = claim_element(nodes, "DIV", { class: true });
    			var div_nodes = children(div);
    			if_block.l(div_nodes);
    			div_nodes.forEach(detach);
    			t7 = claim_space(nodes);
    			claim_component(nested.$$.fragment, nodes);
    			this.h();
    		},
    		h() {
    			attr(h1, "class", "svelte-1528l92");
    			attr(p0, "class", "svelte-1528l92");
    			attr(p1, "class", "svelte-1528l92");
    			attr(div, "class", "interactive svelte-1528l92");
    		},
    		m(target, anchor) {
    			insert(target, h1, anchor);
    			append(h1, t0);
    			append(h1, t1);
    			insert(target, t2, anchor);
    			insert(target, p0, anchor);
    			append(p0, t3);
    			insert(target, t4, anchor);
    			insert(target, p1, anchor);
    			append(p1, t5);
    			insert(target, t6, anchor);
    			insert(target, div, anchor);
    			if_block.m(div, null);
    			insert(target, t7, anchor);
    			mount_component(nested, target, anchor);
    			current = true;
    		},
    		p(ctx, [dirty]) {
    			if_block.p(ctx, dirty);
    		},
    		i(local) {
    			if (current) return;
    			transition_in(nested.$$.fragment, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(nested.$$.fragment, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(h1);
    			if (detaching) detach(t2);
    			if (detaching) detach(p0);
    			if (detaching) detach(t4);
    			if (detaching) detach(p1);
    			if (detaching) detach(t6);
    			if (detaching) detach(div);
    			if_block.d();
    			if (detaching) detach(t7);
    			destroy_component(nested, detaching);
    		}
    	};
    }
    let page = 1;

    function showAlert() {
    	alert("the page is now interactive");
    }

    class App extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$1, safe_not_equal, {});
    	}
    }

    const match = /\/page\/(\d+)/.exec( window.location.pathname );

    const target = document.querySelector( 'main' );

    // simulate a loading delay before app becomes interactive
    setTimeout( () => {
    	// Right now, we need to clear the target element. This is obviously
    	// sub-optimal – we want to reuse the existing elements
    	target.innerHTML = '';

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
