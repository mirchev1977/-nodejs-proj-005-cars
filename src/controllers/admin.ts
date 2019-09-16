import Car from '../entities/Car';

export function getCarsAll (  req, res, next  ) {
    Car.fetchAll( req.query[ 'sort' ] ).then( _arrCars => {
        res.render( 'admin/cars-all', { 
            _arrCars: _arrCars,
            sortBy:   req.query[ 'sort' ] || 'brand-asc' 
        } );
    } ); 
}

export function getCarsNew (  req, res, next  ) {
    Car.fetchAll( req.query[ 'sort' ] ).then( _arrCars => {
        res.render( 'admin/cars-new', { 
            _arrCars: _arrCars,
            sortBy:   req.query[ 'sort' ] || 'brand-asc' 
        } );
    } ); 
}