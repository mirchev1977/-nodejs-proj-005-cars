import fs  from 'fs';
import Car from './Car'; 


const arrCars: Car[]= [
    new Car( 'Audi',   'A3',        300000, 2013, 'https://tinyurl.com/yxqfy4g7' ),
    new Car( 'Mazda',  '6',         1000,   2018, 'https://tinyurl.com/yxmplpsc' ),
    new Car( 'Toyota', 'Corolla',   2000,   2015, 'https://tinyurl.com/y3hbxsdt' ),
    new Car( 'Lada',   'Niva',      52000,  2015, 'https://tinyurl.com/yy4bf9k9' ),
    new Car( 'Kia',    'Stonic',    12000,  2019, 'https://tinyurl.com/y4vklxm3' ),
];
export function seedCar () {
    const json: string = JSON.stringify( arrCars ); 

    fs.writeFile( './src/data/cars.data', json, err => {
        if ( err ) {
            console.log( err );
        } 
    } );
}