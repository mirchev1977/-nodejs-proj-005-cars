"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Car {
    constructor(brand, model, mileage, producedIn, imgUrl) {
        this.brand = brand;
        this.model = model;
        this.mileage = mileage;
        this.producedIn = producedIn;
        this.imgUrl = imgUrl;
    }
    static fetchAll(sortBy = 'brand-asc') {
        console.log(sortBy);
        let jsonCars = '';
        const promise = new Promise((resolve, reject) => {
            fs_1.default.readFile('./src/data/cars.data', (err, buffCars) => {
                let arrCars;
                if (err) {
                    arrCars = [];
                    resolve(arrCars);
                }
                jsonCars += buffCars;
                arrCars = JSON.parse(jsonCars);
                resolve(arrCars);
            });
        });
        return promise;
    }
}
exports.default = Car;
//# sourceMappingURL=Car.js.map