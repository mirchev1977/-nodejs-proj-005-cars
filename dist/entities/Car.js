"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Car {
    constructor(id, brand, model, mileage, producedIn, imgUrl, favSelected = false) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.mileage = mileage;
        this.producedIn = producedIn;
        this.imgUrl = imgUrl;
        this.favSelected = favSelected;
    }
    static fetchAll(sortBy = 'brand-asc') {
        let jsonCars = '';
        const promise = new Promise((resolve, reject) => {
            fs_1.default.readFile(Car._fileStore, (err, buffCars) => {
                let arrCars;
                if (err) {
                    arrCars = [];
                    resolve(arrCars);
                }
                jsonCars += buffCars;
                arrCars = JSON.parse(jsonCars);
                resolve(Car.sortBy(arrCars, sortBy));
            });
        });
        return promise;
    }
    static fetchOneById(id) {
        const promise = new Promise((resolve, reject) => {
            Car.fetchAll('id').then(arrCars => {
                resolve(arrCars.filter(car => {
                    return (car.id === id);
                })[0]);
            }).catch(err => {
                reject('No car found');
            });
        });
        return promise;
    }
    favSelectDeselect(sortBy = 'brand-asc') {
        const promise = new Promise((resolve, reject) => {
            this.favSelected = !this.favSelected;
            this.save(sortBy).then(msgSuccess => {
                resolve(msgSuccess);
            }).catch(msgErr => {
                reject(msgErr);
            });
        });
        return promise;
    }
    save(sortBy = 'brand-asc') {
        const promise = new Promise((resolve, reject) => {
            this.update(sortBy).then(arrCarsUpdated => {
                const json = JSON.stringify(arrCarsUpdated);
                fs_1.default.writeFile(Car._fileStore, json, err => {
                    if (err) {
                        reject(err);
                    }
                    resolve('Saved');
                });
            });
        });
        return promise;
    }
    update(sortBy = 'brand-asc') {
        const promise = new Promise((resolve, reject) => {
            Car.fetchAll(sortBy).then(arrCars => {
                if (arrCars.length <= 0) {
                    reject([]);
                    return;
                }
                arrCars.forEach((car, i) => {
                    if (car.id === this.id) {
                        arrCars[i] = this;
                        return false;
                    }
                });
                resolve(arrCars);
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
                    result = a.id - b.id;
            }
            return result;
        });
        return _arrCars;
    }
}
exports.default = Car;
Car._fileStore = './src/data/cars.data';
//# sourceMappingURL=Car.js.map