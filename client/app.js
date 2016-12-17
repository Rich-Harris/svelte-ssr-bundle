import App from '../shared/App.html';

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
