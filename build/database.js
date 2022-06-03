"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1.default.config();
var _a = process.env, database = _a.database, user = _a.user, password = _a.password, ENV = _a.ENV, database_test = _a.database_test;
var port = process.env.port;
var Clint = new pg_1.Pool({
    database: ENV == "dev" ? database : database_test,
    user: user,
    password: password,
    port: port,
});
exports.default = Clint;
