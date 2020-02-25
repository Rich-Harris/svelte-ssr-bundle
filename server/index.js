const http = require( 'http' );
const path = require( 'path' );
const fs = require( 'fs' );

const App = require( './build/app.js' );
const template = fs.readFileSync( path.join( __dirname, 'templates/index.html' ), 'utf-8' );

const server = http.createServer( ( req, res ) => {
	const match = /\/page\/(\d+)/.exec( req.url );

	if ( match ) {
		const { html, css, head } = App.render({ page: +match[1] });

		res.end( template.replace( '/* CSS */', css.code ).replace( '<!-- HTML -->', html ) );
	}

	else if ( req.url === '/' ) {
		res.writeHead( 301, {
			Location: '/page/1'
		});
		res.end();
	}

	else {
		const filename = path.resolve( __dirname, '../public', req.url.slice( 1 ) )
		const rs = fs.createReadStream( filename );
		rs.on( 'error', err => {
			res.statusCode = 404;
			res.end( 'not found' );
		});
		rs.pipe( res );
	}
});


server.listen( 3000, () => {
	console.log( 'listening on localhost:3000' );
});
