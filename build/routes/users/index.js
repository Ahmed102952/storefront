"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UsersHandler_1 = __importDefault(require("../../handlers/UsersHandler"));
var usersAPI = express_1.default.Router();
(0, UsersHandler_1.default)(usersAPI);
exports.default = usersAPI;
