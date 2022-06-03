import express, { Request, Response } from "express";
import { ProductsModel } from "../models/products";
import authToken from "../util/authToken";

const { Index, Show, Create, Delete } = new ProductsModel();

const products_routes = (app: express.Router) => {
    app.get("/", async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await Index();
            res.json(result);
        } catch (err) {
            res.status(404).send(`Could not get products. ${err}`);
        }
    });
    app.get(
        "/:productID",
        async (req: Request, res: Response): Promise<void> => {
            try {
                const result = await Show(req.params.productID);
                res.json(result);
            } catch (err) {
                res.status(404).send(
                    `Could not get product with id: ${req.params.productID}. ${err}`
                );
            }
        }
    );
    app.post(
        "/",
        authToken,
        async (req: Request, res: Response): Promise<void> => {
            try {
                const result = await Create(req.body);
                res.json(result);
            } catch (err) {
                res.status(404).send(`Could not add product. ${err}`);
            }
        }
    );
    app.delete(
        "/:productID",
        authToken,
        async (req: Request, res: Response): Promise<void> => {
            try {
                const result = await Delete(req.params.productID);
                res.json(result);
            } catch (err) {
                res.status(404).send(
                    `Could not delete product with id: ${req.params.product_id}. ${err}`
                );
            }
        }
    );
};

export default products_routes;
