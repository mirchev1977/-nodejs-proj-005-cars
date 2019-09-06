const express    = require( 'express'     );
const bodyParser = require( 'body-parser' );

const app = express();

app.set( 'view engine', 'pug' );
app.set( 'views', 'views'     );

app.use( express.static() );
//process.mainModule.filename
app.use( bodyParser.urlencoded( { extended: false } ) );

app.get( '/', ( req, res, next ) => {
    res.write( 'Hello world!' );
    res.end();
} );

app.listen( process.env.PORT || 3000 );