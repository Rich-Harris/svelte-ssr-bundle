(function () {
'use strict';

function renderMainFragment$1 ( root, component ) {
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-3548289220', '' );
	div.className = "pagination";
	
	var p = document.createElement( 'p' );
	p.setAttribute( 'svelte-3548289220', '' );
	
	div.appendChild( p );
	p.appendChild( document.createTextNode( "this is a nested component" ) );
	div.appendChild( document.createTextNode( "\n\t" ) );
	var ifBlock_anchor = document.createComment( "#if page > 1" );
	div.appendChild( ifBlock_anchor );
	
	function getBlock ( root ) {
		if ( root.page > 1 ) return renderIfBlock_0$1;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
	div.appendChild( document.createTextNode( "\n\n\t" ) );
	
	var a = document.createElement( 'a' );
	a.setAttribute( 'svelte-3548289220', '' );
	a.className = "next";
	a.href = "/page/" + ( root.page + 1 );
	
	div.appendChild( a );
	a.appendChild( document.createTextNode( "page " ) );
	var text4 = document.createTextNode( root.page + 1 );
	a.appendChild( text4 );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( div, anchor );
		},

		update: function ( changed, root ) {
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
			
			a.href = "/page/" + ( root.page + 1 );
			
			text4.data = root.page + 1;
		},

		teardown: function ( detach ) {
			if ( ifBlock ) ifBlock.teardown( false );
			
			if ( detach ) {
				div.parentNode.removeChild( div );
			}
		}
	};
}

function renderIfBlock_0$1 ( root, component ) {
	var a = document.createElement( 'a' );
	a.setAttribute( 'svelte-3548289220', '' );
	a.className = "prev";
	a.href = "/page/" + ( root.page - 1 );
	
	a.appendChild( document.createTextNode( "page " ) );
	var text1 = document.createTextNode( root.page - 1 );
	a.appendChild( text1 );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( a, anchor );
		},

		update: function ( changed, root ) {
			a.href = "/page/" + ( root.page - 1 );
			
			text1.data = root.page - 1;
		},

		teardown: function ( detach ) {
			if ( detach ) {
				a.parentNode.removeChild( a );
			}
		}
	};
}

function Nested ( options ) {
	options = options || {};

	var component = this;
	var state = options.data || {};

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this._mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	var mainFragment = renderMainFragment$1( state, this );
	if ( options.target ) this._mount( options.target );
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

function renderMainFragment ( root, component ) {
	var h1 = document.createElement( 'h1' );
	h1.setAttribute( 'svelte-3293511188', '' );
	
	h1.appendChild( document.createTextNode( "Page " ) );
	var text1 = document.createTextNode( root.page );
	h1.appendChild( text1 );
	var text2 = document.createTextNode( "\n\n" );
	
	var p = document.createElement( 'p' );
	p.setAttribute( 'svelte-3293511188', '' );
	
	p.appendChild( document.createTextNode( "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." ) );
	var text4 = document.createTextNode( "\n\n" );
	
	var p1 = document.createElement( 'p' );
	p1.setAttribute( 'svelte-3293511188', '' );
	
	p1.appendChild( document.createTextNode( "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." ) );
	var text6 = document.createTextNode( "\n\n" );
	
	var div = document.createElement( 'div' );
	div.setAttribute( 'svelte-3293511188', '' );
	div.className = "interactive";
	
	var ifBlock_anchor = document.createComment( "#if loading" );
	div.appendChild( ifBlock_anchor );
	
	function getBlock ( root ) {
		if ( root.loading ) return renderIfBlock_0;
		return renderIfBlock_1;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );
	
	if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
	var text7 = document.createTextNode( "\n\n" );
	
	var nested_initialData = {
		page: root.page
	};
	var nested = new template.components.Nested({
		target: null,
		root: component.root || component,
		data: nested_initialData
	});

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( h1, anchor );
			target.insertBefore( text2, anchor );
			target.insertBefore( p, anchor );
			target.insertBefore( text4, anchor );
			target.insertBefore( p1, anchor );
			target.insertBefore( text6, anchor );
			target.insertBefore( div, anchor );
			target.insertBefore( text7, anchor );
			nested._mount( target, anchor );
		},

		update: function ( changed, root ) {
			text1.data = root.page;
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
			
			var nested_changes = {};
			
			if ( 'page' in changed ) nested_changes.page = root.page;
			
			if ( Object.keys( nested_changes ).length ) nested.set( nested_changes );
		},

		teardown: function ( detach ) {
			if ( ifBlock ) ifBlock.teardown( false );
			nested.teardown( detach );
			
			if ( detach ) {
				h1.parentNode.removeChild( h1 );
				text2.parentNode.removeChild( text2 );
				p.parentNode.removeChild( p );
				text4.parentNode.removeChild( text4 );
				p1.parentNode.removeChild( p1 );
				text6.parentNode.removeChild( text6 );
				div.parentNode.removeChild( div );
				text7.parentNode.removeChild( text7 );
			}
		}
	};
}

function renderIfBlock_1 ( root, component ) {
	var button = document.createElement( 'button' );
	button.setAttribute( 'svelte-3293511188', '' );
	
	function clickHandler ( event ) {
		component.showAlert();
	}
	
	button.addEventListener( 'click', clickHandler, false );
	
	button.appendChild( document.createTextNode( "click me" ) );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( button, anchor );
		},

		update: function ( changed, root ) {
			
		},

		teardown: function ( detach ) {
			button.removeEventListener( 'click', clickHandler, false );
			
			if ( detach ) {
				button.parentNode.removeChild( button );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var p = document.createElement( 'p' );
	p.setAttribute( 'svelte-3293511188', '' );
	
	p.appendChild( document.createTextNode( "loading..." ) );

	return {
		mount: function ( target, anchor ) {
			target.insertBefore( p, anchor );
		},

		update: function ( changed, root ) {
			
		},

		teardown: function ( detach ) {
			if ( detach ) {
				p.parentNode.removeChild( p );
			}
		}
	};
}

function App ( options ) {
	options = options || {};

	var component = this;
	var state = Object.assign( template.data(), options.data );

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( var key in group ) {
			if ( !( key in newState ) ) continue;

			var newValue = newState[ key ];
			var oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			var callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( var i = 0; i < callbacks.length; i += 1 ) {
				var callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return key ? state[ key ] : state;
	};

	this.set = function set ( newState ) {
		var oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
		
		while ( this.__renderHooks.length ) {
			var hook = this.__renderHooks.pop();
			hook.fn.call( hook.context );
		}
	};

	this._mount = function mount ( target, anchor ) {
		mainFragment.mount( target, anchor );
	};

	this.observe = function ( key, callback, options ) {
		var group = ( options && options.defer ) ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( !options || options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel: function () {
				var index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		var handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				var index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	this.root = options.root;
	this.yield = options.yield;

	this.__renderHooks = [];
	
	var mainFragment = renderMainFragment( state, this );
	if ( options.target ) this._mount( options.target );
	
	while ( this.__renderHooks.length ) {
		var hook = this.__renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

App.prototype = template.methods;

const match = /\/page\/(\d+)/.exec( window.location.pathname );

const target = document.querySelector( 'main' );

// simulate a loading delay before app becomes interactive
setTimeout( () => {
	// Right now, we need to clear the target element. This is obviously
	// sub-optimal – we want to reuse the existing elements
	target.innerHTML = '';

	window.app = new App({
		target,
		data: {
			page: +match[1],
			loading: false
		}
	});
}, 1000 );

}());
