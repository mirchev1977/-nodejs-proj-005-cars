import fs from 'fs';

class Car {
    constructor (
        public brand:      string,
        public model:      string,
        public mileage:    number,
        public producedIn: number,
        public imgUrl:     string
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
                resolve( arrCars );
            } );
        } );

        return promise;
    }
}

export default Car;