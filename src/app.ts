import fs         from 'fs';
import path       from 'path';
import express    from 'express';
import bodyParser from 'body-parser';

import rootDir from './utils/rootDir';
import * as templ from  './entities/templates';

const app = express();

app.set( 'view engine', 'pug'       );
app.set( 'views',       'src/views' );

app.use( express.static( path.join( rootDir, 'public' ) ) ); 
app.use( bodyParser.urlencoded( { extended: false } ) );

templ.seedCar()

app.get( '/', ( req, res, next ) => {
    let dataStr: string = '';
    fs.readFile( './src/data/cars.data', ( err, data ) => {
        if ( err ) {
            console.log( err );
        }

        dataStr += data;

        res.write( dataStr );
        res.end();
    } );
} );

app.use( ( req, res, next ) => {
    res.render( '404' );
} );

app.listen( process.env.PORT || 3000, () => {
    console.log( 'listening on port 3000' );
} );