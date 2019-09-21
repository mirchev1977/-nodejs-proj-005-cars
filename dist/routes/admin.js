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
const contrAdmin = __importStar(require("../controllers/admin"));
const templ = __importStar(require("../entities/templates"));
const router = express_1.default.Router();
router.get('/admin', contrAdmin.getCarsAll);
router.get('/admin/new', contrAdmin.getCarsNew);
router.post('/admin/new', contrAdmin.postCarsNew);
router.get('/admin/delete/:id', contrAdmin.getCarDelete);
router.get('/admin/edit/:id', contrAdmin.getCarsEdit);
router.post('/admin/edit', contrAdmin.postCarsEdit);
router.get('/admin/restore', (req, res, next) => {
    templ.seedCar();
    res.write('restore');
    res.send();
});
exports.default = router;
//# sourceMappingURL=admin.js.map