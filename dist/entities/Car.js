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
                resolve(this.sortBy(arrCars, sortBy));
            });
        });
        return promise;
    }
    static sortBy(arrCars, sortBy = 'brand-asc') {
        const _arrCars = [...arrCars];
        _arrCars.sort((a, b) => {
            let result = 0;
            switch (sortBy) {
                case 'brand-asc':
                    result = a.brand.localeCompare(b.brand);
                    break;
                case 'brand-desc':
                    result = b.brand.localeCompare(a.brand);
                    break;
                case 'model-asc':
                    result = a.model.localeCompare(b.model);
                    break;
                case 'model-desc':
                    result = b.model.localeCompare(a.model);
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
                    result = b.producedIn - a.producedIn;
                    break;
                default:
                    result = a.brand.localeCompare(b.brand);
            }
            return result;
        });
        return _arrCars;
    }
}
exports.default = Car;
//# sourceMappingURL=Car.js.map