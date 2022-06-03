"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ProductsHandler_1 = __importDefault(require("../../handlers/ProductsHandler"));
var productsAPI = express_1.default.Router();
(0, ProductsHandler_1.default)(productsAPI);
exports.default = productsAPI;
