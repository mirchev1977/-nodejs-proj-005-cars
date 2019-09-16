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
//# sourceMappingURL=admin.js.map