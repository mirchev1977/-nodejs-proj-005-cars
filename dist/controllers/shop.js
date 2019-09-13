"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = __importDefault(require("../entities/Car"));
function getAllCars(req, res, next) {
    Car_1.default.fetchAll().then(_arrCars => {
        res.render('shop/all-cars', { _arrCars: _arrCars });
    });
}
exports.getAllCars = getAllCars;
//# sourceMappingURL=shop.js.map