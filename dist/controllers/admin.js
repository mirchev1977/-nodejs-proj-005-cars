"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = __importDefault(require("../entities/Car"));
function getCarsAll(req, res, next) {
    Car_1.default.fetchAll(req.query['sort']).then(_arrCars => {
        res.render('admin/cars-all', {
            _arrCars: _arrCars,
            sortBy: req.query['sort'] || 'brand-asc'
        });
    });
}
exports.getCarsAll = getCarsAll;
function getCarsNew(req, res, next) {
    res.render('admin/cars-new');
}
exports.getCarsNew = getCarsNew;
function postCarsNew(req, res, next) {
    try {
        Car_1.default.createNewCar(new Car_1.default(0, req.body['brand'], req.body['model'], req.body['mileage'], req.body['producedIn'], req.body['imgUrl'])).then(msgSuccess => {
            Car_1.default.fetchAll('brand-asc').then(_arrCars => {
                res.render('admin/cars-all', {
                    _arrCars: _arrCars,
                    sortBy: req.query['sort'] || 'brand-asc'
                });
            });
        }).catch(msgErr => {
            console.log(msgErr);
            debugger;
        });
    }
    catch (err) {
        res.render('admin/cars-new', {
            ERR: err
        });
    }
}
exports.postCarsNew = postCarsNew;
function getCarDelete(req, res, next) {
    const _carId = req.params['id'] * 1;
    const _sortBy = req.query['sort'];
    Car_1.default.deleteById(_carId).then(OK => {
        Car_1.default.fetchAll(_sortBy).then(_arrCars => {
            res.render('admin/cars-all', {
                _arrCars: _arrCars,
                sortBy: _sortBy || 'brand-asc'
            });
        });
    }).catch(ERR => {
        Car_1.default.fetchAll(_sortBy).then(_arrCars => {
            res.render('admin/cars-all', {
                _arrCars: _arrCars,
                sortBy: _sortBy || 'brand-asc'
            });
        });
    });
}
exports.getCarDelete = getCarDelete;
function getCarsEdit(req, res, next) {
    const _carId = req.params['id'] * 1;
    const _sortBy = req.query['sort'];
    Car_1.default.fetchOneById(_carId).then(car => {
        res.render('admin/car-edit', {
            car: car,
            sortBy: _sortBy
        });
    });
}
exports.getCarsEdit = getCarsEdit;
function postCarsEdit(req, res, next) {
    try {
        const _car = new Car_1.default(req.body['id'], req.body['brand'], req.body['model'], req.body['mileage'], req.body['producedIn'], req.body['imgUrl']);
        _car.save().then(msgSuccess => {
            Car_1.default.fetchAll('brand-asc').then(_arrCars => {
                res.render('admin/cars-all', {
                    _arrCars: _arrCars,
                    sortBy: req.query['sort'] || 'brand-asc'
                });
            });
        }).catch(msgErr => {
            Car_1.default.fetchAll('brand-asc').then(_arrCars => {
                res.render('admin/cars-all', {
                    _arrCars: _arrCars,
                    sortBy: req.query['sort'] || 'brand-asc'
                });
            });
        });
    }
    catch (err) {
        const _carId = Number(req.body['id']);
        const _sortBy = req.body['sort'];
        Car_1.default.fetchOneById(_carId).then(car => {
            res.render('admin/car-edit', {
                car: car,
                sortBy: _sortBy,
                ERR: err
            });
        });
    }
}
exports.postCarsEdit = postCarsEdit;
//# sourceMappingURL=admin.js.map