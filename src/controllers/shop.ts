import fs  from 'fs';
import Car from '../entities/Car';

export function getAllCars (  req, res, next  ) {
    Car.fetchAll().then( _arrCars => {
        res.render( 'shop/all-cars', { _arrCars: _arrCars } );
        //res.write( JSON.stringify( _arrCars ) );
        //res.end();
    } ); 
}