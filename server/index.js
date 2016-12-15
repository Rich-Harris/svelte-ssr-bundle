const http = require( 'http' );
const path = require( 'path' );
const fs = require( 'fs' );

const app = require( './app.js' );
const template = fs.readFileSync( path.join( __dirname, 'templates/index.html' ), 'utf-8' );

const server = http.createServer( ( req, res ) => {
	const match = /\/page\/(\d+)/.exec( req.url );

	if ( match ) {
		const html = app.render({ page: match[1] });
		res.end( html );
	}

	else if ( req.url === '/' ) {
		res.writeHead( 301, {
			Location: '/page/1'
		});
		res.end();
	}

	else {
		res.statusCode = 404;
		res.end( 'not found' );
	}
});


server.listen( 3000, () => {
	console.log( 'listening on localhost:3000' );
});
