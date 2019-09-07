import Car from './Car'; 


export function seedCar () {
    const arrCars: Car[]= [
        new Car( 'Audi', 'A3', 300000, 2018, 'https://tinyurl.com/yxqfy4g7' ),
    ];

    console.log( arrCars );
}