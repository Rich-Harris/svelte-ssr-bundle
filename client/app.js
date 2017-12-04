import App from '../shared/App.html';

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
