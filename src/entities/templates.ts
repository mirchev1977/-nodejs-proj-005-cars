import fs  from 'fs';
import Car from './Car'; 


const arrCars: Car[]= [
    new Car( 1, 'Audi',   'A3',        300000, 2013, 'https://tinyurl.com/yxqfy4g7'
        ),
    new Car( 2, 'Mazda',  '6',         1000,   2018, 'https://tinyurl.com/yxmplpsc' 
        ),
    new Car( 3, 'Toyota', 'Corolla',   2000,   2015, 'https://tinyurl.com/y3ahq94w' 
        ),
    new Car( 4, 'Lada',   'Niva',      52000,  2015, 'https://tinyurl.com/yy4bf9k9' 
        ),
    new Car( 5, 'Kia',    'Stonic',    12000,  2019, 'https://tinyurl.com/y4vklxm3' 
        ),
];
export function seedCar () {
    const json: string = JSON.stringify( arrCars ); 

    fs.writeFile( './src/data/cars.data', json, err => {
        if ( err ) {
            console.log( err );
        } 
    } );

    fs.writeFile( './src/data/cars.counter.data', '5', err => {
        if ( err ) {
            console.log( err );
        } 
    } );
}