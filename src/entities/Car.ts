import fs from 'fs';

class Car {
    constructor (
        public id:          number,
        public brand:       string,
        public model:       string,
        public mileage:     number,
        public producedIn:  number,
        public imgUrl:      string,
        public favSelected: boolean = false
    ) {
    }

    static fetchAll ( sortBy: string = 'brand-asc' ): Promise<Car[]> {
        let jsonCars = '';
        const promise: Promise<Car[]> = new Promise( ( resolve, reject ) => {
            fs.readFile( './src/data/cars.data', ( err, buffCars ) => {
                let arrCars: Car[];
                if ( err ) {
                    arrCars = [];

                    resolve( arrCars );
                }
                jsonCars += buffCars;

                arrCars = JSON.parse( jsonCars );
                resolve( this.sortBy( arrCars, sortBy ) );
            } );
        } );

        return promise;
    }

    static sortBy ( 
        arrCars: Car[],
        sortBy: string = 'brand-asc'
    ) {
        const _arrCars = [ ...arrCars ];
        _arrCars.sort( ( a, b ) => {
            let result: number = 0;
            switch( sortBy ) {
                case 'brand-asc':
                    result = a.brand.localeCompare( b.brand );
                    break;
                case 'brand-desc':
                    result = b.brand.localeCompare( a.brand );
                    break;
                case 'model-asc':
                    result = a.model.localeCompare( b.model );
                    break;
                case 'model-desc':
                    result = b.model.localeCompare( a.model );
                    break;
                case 'mileage-asc':
                    result = a.mileage - b.mileage;
                    break;
                case 'mileage-desc':
                    result = b.mileage - a.mileage;
                    break;
                case 'year-asc':
                    result = a.producedIn - b.producedIn;
                    break;
                case 'year-desc':
                    result =  b.producedIn - a.producedIn;
                    break;
                default:
                    result = a.brand.localeCompare( b.brand );
            }

            return result;
        } );
        return _arrCars;
    }
}

export default Car;