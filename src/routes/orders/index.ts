import express from "express";
import orders_routes from "../../handlers/OrdersHandler";

const ordersApi = express.Router();

orders_routes(ordersApi);

export default ordersApi;
