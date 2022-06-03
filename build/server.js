"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var products_1 = __importDefault(require("./routes/products"));
var users_1 = __importDefault(require("./routes/users"));
var orders_1 = __importDefault(require("./routes/orders"));
exports.app = (0, express_1.default)();
var port = 3000;
exports.app.use(body_parser_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.get("/", function (req, res) {
    res.send("Connected");
});
exports.app.use("/products", products_1.default);
exports.app.use("/users", users_1.default);
exports.app.use("/orders", orders_1.default);
exports.app.listen(port, function () {
    console.log("server running on ".concat(port, "."));
});
