const path       = require( 'path'        );
const express    = require( 'express'     );
const bodyParser = require( 'body-parser' );

const rootDir = require( './utils/rootDir' );

const app = express();

app.set( 'view engine', 'pug' );
app.set( 'views', 'views'     );

app.use( express.static( path.join( rootDir, 'public' ) ) ); 
app.use( bodyParser.urlencoded( { extended: false } ) );

app.use( ( req, res, next ) => {
    res.render( '404' );
} );

app.listen( process.env.PORT || 3000 );