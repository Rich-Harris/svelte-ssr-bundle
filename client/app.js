import App from '../shared/App.html';

const match = /\/page\/(\d+)/.exec( window.location.pathname );

const target = document.querySelector( 'main' );

window.app = new App({
	target,
	data: {
		page: +match[1],
		hydrate: true,
		loading: false
	}
});
