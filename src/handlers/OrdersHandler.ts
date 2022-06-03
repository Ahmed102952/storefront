import express, { Request, Response } from "express";
import { OrdersModel } from "../models/orders";
import authToken from "../util/authToken";

const { Index, Show, Create, Delete, Addproduct } = new OrdersModel();

const orders_routes = (app: express.Router) => {
    app.get("/", authToken, async (req: Request, res: Response) => {
        try {
            const result = await Index();
            res.json(result);
        } catch (err) {
            res.status(404).send(`Could not get orders. ${err}`);
        }
    });
    app.get("/:orderID", authToken, async (req: Request, res: Response) => {
        try {
            const result = await Show(req.params.orderID);
            res.json(result);
        } catch (err) {
            res.status(404).send(
                `Could not get order with id: ${req.params.orderID}. ${err}`
            );
        }
    });
    app.post("/", authToken, async (req: Request, res: Response) => {
        try {
            const result = await Create(req.body);
            res.json(result);
        } catch (err) {
            res.status(400).send(`Could not add order. ${err}`);
        }
    });
    app.delete("/:orderID", authToken, async (req: Request, res: Response) => {
        try {
            const result = await Delete(req.params.orderID);
            res.send(result);
        } catch (err) {
            res.status(400).send(
                `Could not delete order with id: ${req.params.orderID}. ${err}`
            );
        }
    });
    app.post(
        "/:orderID/product",
        authToken,
        async (req: Request, res: Response) => {
            try {
                const result = await Addproduct(
                    req.body.quantity,
                    parseInt(req.params.orderID),
                    req.body.product_id
                );
                res.send(result);
            } catch (err) {
                res.status(400).send(
                    `Could not add product to the order with id: ${req.params.orderID}. ${err}`
                );
            }
        }
    );
};

export default orders_routes;
