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
const router = express_1.default.Router();
router.get('/admin', contrAdmin.getCarsAll);
router.get('/admin/new', contrAdmin.getCarsNew);
router.post('/admin/new', contrAdmin.postCarsNew);
exports.default = router;
//# sourceMappingURL=admin.js.map