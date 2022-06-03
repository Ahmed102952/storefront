"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var OrdersHandler_1 = __importDefault(require("../../handlers/OrdersHandler"));
var ordersApi = express_1.default.Router();
(0, OrdersHandler_1.default)(ordersApi);
exports.default = ordersApi;
