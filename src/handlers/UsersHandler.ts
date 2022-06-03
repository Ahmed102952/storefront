import express, { Request, Response } from "express";
import { UsersModel } from "../models/users";
import authToken from "../util/authToken";
import dotenv from "dotenv";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";

const { Index, Show, Create, Delete } = new UsersModel();

const users_routes = (app: express.Router) => {
    app.get(
        "/",
        authToken,
        async (req: Request, res: Response): Promise<void> => {
            try {
                const result = await Index();
                res.json(result);
            } catch (err) {
                res.status(404).send(`Could not get users. ${err}`);
            }
        }
    );
    app.get(
        "/:userID",
        authToken,
        async (req: Request, res: Response): Promise<void> => {
            try {
                const result = await Show(req.params.userID);
                res.json(result);
            } catch (err) {
                res.status(404).send(
                    `Could not get user with id: ${req.params.userID}. ${err}`
                );
            }
        }
    );
    app.post(
        "/",
        async (req: Request, res: Response): Promise<void> => {
            try {
                const first_name = req.body.first_name;
                const last_name = req.body.last_name;
                const password = req.body.passed;
                dotenv.config();
                const papper = process.env.bycrpt_password;
                const saltRounds = process.env.salt_rounds as string;
                const hash = await bycrpt.hash(
                    password + papper,
                    parseInt(saltRounds)
                );
                const result = await Create(first_name, last_name, hash);
                const payload = {
                    first_name: result.first_name,
                    last_name: result.last_name,
                };
                const jwt_token = jwt.sign(
                    payload,
                    process.env.token_secret as string
                );
                res.json({ result, jwt_token });
            } catch (err) {
                res.status(404).send(`Could not add user. ${err}`);
            }
        }
    );
    app.delete(
        "/:userID",
        authToken,
        async (req: Request, res: Response): Promise<void> => {
            try {
                const result = await Delete(req.params.userID);
                res.json(result);
            } catch (err) {
                res.status(404).send(
                    `Could not delete user with id: ${req.params.userID}. ${err}`
                );
            }
        }
    );
};

export default users_routes;
