import path       from 'path';
import express    from 'express';
import bodyParser from 'body-parser';

import rootDir from './utils/rootDir';
import * as templ from  './entities/templates';

import shopRoutes from './routes/shop';

const app = express();

app.set( 'view engine', 'pug'       );
app.set( 'views',       'src/views' );

app.use( express.static( path.join( rootDir, 'public' ) ) ); 
app.use( bodyParser.urlencoded( { extended: false } ) );

//templ.seedCar()

app.use( shopRoutes );

app.use( ( req, res, next ) => {
    res.render( '404' );
} );

app.listen( process.env.PORT || 3000, () => {
    console.log( 'listening on port 3000' );
} );