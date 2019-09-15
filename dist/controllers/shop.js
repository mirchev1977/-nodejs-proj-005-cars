"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Car_1 = __importDefault(require("../entities/Car"));
function getCarsAll(req, res, next) {
    Car_1.default.fetchAll(req.query['sort']).then(_arrCars => {
        res.render('shop/cars-all', {
            _arrCars: _arrCars,
            sortBy: req.query['sort']
        });
    });
}
exports.getCarsAll = getCarsAll;
function getCarsSelected(req, res, next) {
    Car_1.default.fetchOnlySelected(req.query['sort']).then(_arrCars => {
        res.render('shop/cars-selected', {
            _arrCars: _arrCars,
            sortBy: req.query['sort']
        });
    });
}
exports.getCarsSelected = getCarsSelected;
function getCarSelectFav(req, res, next) {
    const idCar = req.params['id'] * 1;
    const sortBy = req.query['sort'];
    const favorites = req.query['favorites'];
    Car_1.default.fetchOneById(idCar).then(carSelected => {
        const _carSelected = new Car_1.default(carSelected.id, carSelected.brand, carSelected.model, carSelected.mileage, carSelected.producedIn, carSelected.imgUrl, carSelected.favSelected);
        return _carSelected.favSelectDeselect(sortBy);
    }).then(successMessage => {
        if (favorites) {
            res.redirect(`/favorites?sort=${sortBy}&favorites=1`);
        }
        else {
            res.redirect(`/?sort=${sortBy}`);
        }
    }).catch(err => {
        console.log('err', err);
        debugger;
        res.redirect('/?sort=${sortBy}');
    });
}
exports.getCarSelectFav = getCarSelectFav;
//# sourceMappingURL=shop.js.map