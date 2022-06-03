import express from "express";
import products_routes from "../../handlers/ProductsHandler";

const productsAPI = express.Router();

products_routes(productsAPI);

export default productsAPI;
