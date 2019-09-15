"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contrShop = __importStar(require("../controllers/shop"));
const router = express_1.default.Router();
router.get('/', contrShop.getAllCars);
router.get('/select-fav/:id', contrShop.getCarSelectFav);
exports.default = router;
//# sourceMappingURL=shop.js.map