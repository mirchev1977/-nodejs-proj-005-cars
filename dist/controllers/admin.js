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
    Car_1.default.fetchAll(req.query['sort']).then(_arrCars => {
        res.render('admin/cars-new', {
            _arrCars: _arrCars,
            sortBy: req.query['sort'] || 'brand-asc'
        });
    });
}
exports.getCarsNew = getCarsNew;
function postCarsNew(req, res, next) {
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
//# sourceMappingURL=admin.js.map