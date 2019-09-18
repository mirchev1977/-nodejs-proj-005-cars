"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const rootDir_1 = __importDefault(require("./utils/rootDir"));
const shop_1 = __importDefault(require("./routes/shop"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = express_1.default();
app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use(express_1.default.static(path_1.default.join(rootDir_1.default, 'public')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
//templ.seedCar()
app.use(shop_1.default);
app.use(admin_1.default);
app.use((req, res, next) => {
    res.render('404');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000');
});
//# sourceMappingURL=app.js.map