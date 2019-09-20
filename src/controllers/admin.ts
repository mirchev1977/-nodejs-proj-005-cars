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
        res.render( 'admin/cars-new' );
}

export function postCarsNew (  req, res, next  ) {
    try {
        Car.createNewCar(
            new Car( 
                0, 
                req.body[ 'brand'      ],   
                req.body[ 'model'      ],   
                req.body[ 'mileage'    ],   
                req.body[ 'producedIn' ],   
                req.body[ 'imgUrl'     ]
                )
        ).then( msgSuccess => {
            Car.fetchAll( 'brand-asc' ).then( _arrCars => {
                res.render( 'admin/cars-all', { 
                    _arrCars: _arrCars,
                    sortBy:   req.query[ 'sort' ] || 'brand-asc' 
                } );
            } ); 
        } ).catch( msgErr => {
            console.log( msgErr );
            debugger;
        } );
    } catch( err ) {
        res.render( 'admin/cars-new', {
            ERR: err
        } );
    }
}

export function getCarDelete ( req, res, next ) {
    const _carId  = req.params[ 'id'   ] * 1;
    const _sortBy = req.query[  'sort' ];

    Car.deleteById( _carId ).then( OK => {
        Car.fetchAll( _sortBy ).then( _arrCars => {
            res.render( 'admin/cars-all', { 
                _arrCars: _arrCars,
                sortBy:   _sortBy || 'brand-asc' 
            } );
        } ); 
    } ).catch( ERR => {
        Car.fetchAll( _sortBy ).then( _arrCars => {
            res.render( 'admin/cars-all', { 
                _arrCars: _arrCars,
                sortBy:   _sortBy || 'brand-asc' 
            } );
        } ); 
    } );
}

export function getCarsEdit (  req, res, next  ) {
    const _carId  = req.params[ 'id'   ] * 1;
    const _sortBy = req.query[  'sort' ];

    Car.fetchOneById( _carId ).then( car => {
        res.render( 'admin/car-edit', {
            car: car, 
            sortBy: _sortBy
        } );
    } );
}

export function postCarsEdit (  req, res, next  ) {
    try {
        const _car = new Car( 
                req.body[ 'id'         ],   
                req.body[ 'brand'      ],   
                req.body[ 'model'      ],   
                req.body[ 'mileage'    ],   
                req.body[ 'producedIn' ],   
                req.body[ 'imgUrl'     ]
            );

        _car.save().then( msgSuccess => {
            Car.fetchAll( 'brand-asc' ).then( _arrCars => {
                res.render( 'admin/cars-all', { 
                    _arrCars: _arrCars,
                    sortBy:   req.query[ 'sort' ] || 'brand-asc' 
                } );
            } ); 

        } ).catch( msgErr => {
            Car.fetchAll( 'brand-asc' ).then( _arrCars => {
                res.render( 'admin/cars-all', { 
                    _arrCars: _arrCars,
                    sortBy:   req.query[ 'sort' ] || 'brand-asc' 
                } );
            } ); 
        } );
    } catch ( err ) {
        const _carId  = Number( req.body[ 'id' ] );
        const _sortBy = req.body[  'sort' ];

        Car.fetchOneById( _carId ).then( car => {
            res.render( 'admin/car-edit', {
                car: car, 
                sortBy: _sortBy,
                ERR: err
            } );
        } );
    }
}