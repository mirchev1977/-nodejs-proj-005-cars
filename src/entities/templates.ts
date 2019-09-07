import fs  from 'fs';
import Car from './Car'; 


const arrCars: Car[]= [
    new Car( 'Audi', 'A3', 300000, 2018, 'https://tinyurl.com/yxqfy4g7' ),
];
export function seedCar () {
    const json: string = JSON.stringify( arrCars ); 

    fs.writeFile( './src/data/cars.data', json, err => {
        if ( err ) {
            console.log( err );
        } 
    } );
}