"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Car {
    constructor(id, brand, model, mileage, producedIn, imgUrl, favSelected = false) {
        this.favSelected = false;
        if (!brand)
            throw new Error('Please, enter the Car Brand!');
        if (!model)
            throw new Error('Please, enter the Car Model!');
        if (!mileage)
            throw new Error('Please, enter the Car Mileage!');
        if (mileage < 0)
            throw new Error('Please, enter Mileage >= 0!');
        if (!producedIn)
            throw new Error('Please, enter the Production Year!');
        if (!imgUrl)
            throw new Error('Please, enter the Image Url!');
        if (producedIn < 1900 || producedIn > 2100)
            throw new Error('Please, enter the Production Year > 1900 and < 2100!');
        this.id = Number(id);
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
    delete() {
        const promise = new Promise((resolve, reject) => {
            Car.fetchAll('id').then(arrCars => {
                const _carsFiltered = arrCars.filter(car => {
                    return (car.id !== this.id);
                });
                return Car.writeCars(_carsFiltered);
            }).then(success => {
                resolve('OK');
            }).catch(err => {
                reject('ERR');
            });
        });
        return promise;
    }
    static writeCars(cars) {
        const _cars = [...cars];
        const _carsJson = JSON.stringify(_cars.sort((a, b) => {
            return a.id - b.id;
        }));
        const promise = new Promise((resolve, reject) => {
            fs_1.default.writeFile(Car._fileStore, _carsJson, err => {
                if (err) {
                    reject('ERR');
                }
                resolve('OK');
            });
        });
        return promise;
    }
    static deleteById(id) {
        const promise = new Promise((resolve, reject) => {
            Car.fetchOneById(id).then(carFetched => {
                const _car = new Car(carFetched['id'], carFetched['brand'], carFetched['model'], carFetched['mileage'], carFetched['producedIn'], carFetched['imgUrl']);
                return _car.delete();
            }).then(OK => {
                resolve('OK');
            }).catch(ERR => {
                reject('ERR');
            });
        });
        return promise;
    }
    static fetchOnlySelected(sortBy = 'brand-asc') {
        const promise = new Promise((resolve, reject) => {
            Car.fetchAll('id').then(carsAll => {
                const _carsSelectedOnly = carsAll.filter(car => {
                    if (car.favSelected)
                        return true;
                });
                resolve(Car.sortBy(_carsSelectedOnly, sortBy));
            });
        });
        return promise;
    }
    static fetchCarsCounter() {
        let strCarsCounter = '';
        const promise = new Promise((resolve, reject) => {
            fs_1.default.readFile(Car._fileCarsCounter, (err, buffCarsCounter) => {
                if (err) {
                    reject('err');
                }
                strCarsCounter += buffCarsCounter;
                resolve(Number(strCarsCounter));
            });
        });
        return promise;
    }
    static writeCarsCounter(carCounter) {
        const promise = new Promise((resolve, reject) => {
            fs_1.default.writeFile(Car._fileCarsCounter, carCounter, err => {
                if (err) {
                    reject('err');
                }
                resolve('Success');
            });
        });
        return promise;
    }
    static createNewCar(car) {
        const promise = new Promise((resolve, reject) => {
            Car.fetchCarsCounter().then(carCounter => {
                car.id = ++carCounter;
                return car.save();
            }).then(msgSuccess => {
                return Car.writeCarsCounter(car.id);
            }).then(msgSuccess => {
                resolve(msgSuccess);
            }).catch(errMsg => {
                reject(errMsg);
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
                let updated = false;
                arrCars.forEach((car, i) => {
                    if (car.id === this.id) {
                        updated = true;
                        arrCars[i] = this;
                        return false;
                    }
                });
                if (!updated) {
                    arrCars.push(this);
                }
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
Car._fileCarsCounter = './src/data/cars.counter.data';
//# sourceMappingURL=Car.js.map