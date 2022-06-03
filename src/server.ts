import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import productsAPI from "./routes/products";
import usersAPI from "./routes/users";
import ordersApi from "./routes/orders";

export const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
    res.send("Connected");
});

app.use("/products", productsAPI);
app.use("/users", usersAPI);
app.use("/orders", ordersApi);

app.listen(port, () => {
    console.log(`server running on ${port}.`);
});
