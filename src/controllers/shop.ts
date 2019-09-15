import Car from '../entities/Car';

export function getCarsAll (  req, res, next  ) {
    Car.fetchAll( req.query[ 'sort' ] ).then( _arrCars => {
        res.render( 'shop/cars-all', { 
            _arrCars: _arrCars,
            sortBy:   req.query[ 'sort' ] 
        } );
    } ); 
}

export function getCarsSelected (  req, res, next  ) {
    Car.fetchOnlySelected( req.query[ 'sort' ] ).then( _arrCars => {
        res.render( 'shop/cars-selected', { 
            _arrCars: _arrCars,
            sortBy:   req.query[ 'sort' ] 
        } );
    } ); 
}

export function getCarSelectFav( req, res, next ) {
    const idCar:  number    = req.params[ 'id'        ] * 1;
    const sortBy: string    = req.query[  'sort'      ];
    const favorites: string = req.query[  'favorites' ];

    Car.fetchOneById( idCar ).then( carSelected => {
        const _carSelected = new Car(
            carSelected.id, carSelected.brand, carSelected.model,
            carSelected.mileage, carSelected.producedIn, carSelected.imgUrl,
            carSelected.favSelected
        );
        return _carSelected.favSelectDeselect( sortBy );
    } ).then( successMessage => {
        if ( favorites ) {
            res.redirect( `/favorites?sort=${sortBy}&favorites=1` ); 
        } else {
            res.redirect( `/?sort=${sortBy}` ); 
        }
    } ).catch( err => {
        console.log( 'err', err );
        debugger;
        res.redirect( '/?sort=${sortBy}' );
    } );
}