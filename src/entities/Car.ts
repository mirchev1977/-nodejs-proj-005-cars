import fs from 'fs';

export default class Car {
    private static _fileStore = './src/data/cars.data';

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
            fs.readFile( Car._fileStore, ( err, buffCars ) => {
                let arrCars: Car[];
                if ( err ) {
                    arrCars = [];

                    resolve( arrCars );
                }
                jsonCars += buffCars;

                arrCars = JSON.parse( jsonCars );
                resolve( Car.sortBy( arrCars, sortBy ) );
            } );
        } );

        return promise;
    }

    static fetchOneById ( id: number ): Promise<Car> {
        const promise: Promise<Car> = new Promise( ( resolve, reject ) => {
            Car.fetchAll( 'id' ).then( arrCars => {
                resolve(
                    arrCars.filter( car => {
                        return ( car.id === id );
                    } )[0] 
                );
            } ).catch( err => {
                reject( 'No car found' );
            } );
        } );
        return promise;
    }

    static fetchOnlySelected ( sortBy: string = 'brand-asc' ): Promise<Car[]> {
        const promise: Promise<Car[]> = new Promise( ( resolve, reject ) => {
            Car.fetchAll( 'id' ).then( carsAll => {
                const _carsSelectedOnly = carsAll.filter( car => {
                    if ( car.favSelected ) return true;
                } );

                resolve( Car.sortBy( _carsSelectedOnly, sortBy ) );
            } );
        } );

        return promise;
    }

    favSelectDeselect ( sortBy: string = 'brand-asc' ): Promise<string> {
        const promise: Promise<string> = new Promise( ( resolve, reject ) => {
            this.favSelected = !this.favSelected;
            this.save( sortBy ).then( msgSuccess => {
                resolve( msgSuccess );
            } ).catch( msgErr => {
                reject( msgErr );
            } );
        } );

        return promise;
    }

    save ( sortBy: string = 'brand-asc' ): Promise<string> {
        const promise: Promise<string> = new Promise( ( resolve, reject ) => {
            this.update( sortBy ).then( arrCarsUpdated => {
                const json: string = JSON.stringify( arrCarsUpdated ); 

                fs.writeFile( Car._fileStore, json, err => {
                    if ( err ) {
                        reject( err );
                    } 

                    resolve( 'Saved' );
                } ); 
            } ); 
        } );

        return promise;
    }

    private update ( sortBy: string = 'brand-asc' ): Promise<Car[]> {
        const promise: Promise<Car[]> = new Promise( ( resolve, reject) => {
            Car.fetchAll( sortBy ).then( arrCars => {
                if ( arrCars.length <= 0 ) {
                    reject( [] );
                    return;
                } 

                arrCars.forEach( ( car, i ) => {
                    if ( car.id === this.id ) {
                        arrCars[ i ] = this;
                        return false;
                    }
                } );

                resolve( arrCars );
            } );
        });

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
                    result = a.id - b.id;
            }

            return result;
        } );
        return _arrCars;
    }
}