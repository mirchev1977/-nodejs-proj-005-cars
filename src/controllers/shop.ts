import Car from '../entities/Car';

export function getAllCars (  req, res, next  ) {
    Car.fetchAll( req.query[ 'sort' ] ).then( _arrCars => {
        res.render( 'shop/all-cars', { 
            _arrCars: _arrCars,
            sortBy:   req.query[ 'sort' ] 
        } );
    } ); 
}

export function getCarSelectFav( req, res, next ) {
    const idCar:  number = req.params[ 'id'   ] * 1;
    const sortBy: string = req.query[  'sort' ];

    Car.fetchOneById( idCar ).then( carSelected => {
        const _carSelected = new Car(
            carSelected.id, carSelected.brand, carSelected.model,
            carSelected.mileage, carSelected.producedIn, carSelected.imgUrl,
            carSelected.favSelected
        );
        return _carSelected.favSelectDeselect( sortBy );
    } ).then( successMessage => {
        res.redirect( `/?sort=${sortBy}` );
    } ).catch( err => {
        console.log( 'err', err );
        debugger;
        res.redirect( '/?sort=${sortBy}' );
    } );
}