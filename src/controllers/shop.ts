import fs  from 'fs';
import Car from '../entities/Car';

export function getAllCars (  req, res, next  ) {
    Car.fetchAll( req.query[ 'sort' ] ).then( _arrCars => {
        res.render( 'shop/all-cars', { _arrCars: _arrCars } );
    } ); 
}