import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(" ")[1];
        jwt.verify(token, process.env.token_secret as string);
        next();
    } catch (err) {
        res.status(401).send("Invalid token");
        return;
    }
};
