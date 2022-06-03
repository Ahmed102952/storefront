import supertest from "supertest";
import { app } from "../../../server";
import Clint from "../../../database";
import dotenv from "dotenv"

describe("test orders endpoit", () => {
    dotenv.config()
    const token = process.env.test_token as string

    const route = "/orders";

    beforeEach(async () => {
        const sql = `
        ALTER SEQUENCE users_id_seq RESTART WITH 1;
        ALTER SEQUENCE orders_id_seq RESTART WITH 1;
        ALTER SEQUENCE products_id_seq RESTART WITH 1;
        ALTER SEQUENCE order_products_id_seq RESTART WITH 1;
        INSERT INTO products (name, price, category) VALUES('product-name', 100, '');
        INSERT INTO users (first_name, last_name, password) VALUES('first-name', 'last-name', 'password');
        INSERT INTO orders (user_id, status) VALUES(1, 'active');`;
        const conn = await Clint.connect();
        await conn.query(sql);
        conn.release();
    });

    afterEach(async () => {
        const sql = `DELETE FROM users *;DELETE FROM orders *;DELETE FROM products *;DELETE FROM order_products *;`;
        const conn = await Clint.connect();
        await conn.query(sql);
        conn.release();
    });

    it("Status Should be 200 when getting all orders", async () => {
        const res = await supertest(app).get(route).set("Authorization", token);
        expect(res.status).toBe(200);
    });
    it("Status Should be 200 when getting order with valid user id", async () => {
        const res = await supertest(app)
            .get(route + "/1")
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
    it("Status Should be 404 when getting order with invalid id", async () => {
        const res = await supertest(app)
            .get(route + "/5")
            .set("Authorization", token);
        expect(res.status).toBe(404);
    });
    it("Status Should be 404 when getting product with invalid id", async () => {
        const res = await supertest(app)
            .get(route + "/a")
            .set("Authorization", token);
        expect(res.status).toBe(404);
    });
    it("Status Should be 200 when create order", async () => {
        const res = await supertest(app)
            .post(route)
            .send({ user_id: 1, status: "active" })
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
    it("Status Should be 200 when delete order", async () => {
        const res = await supertest(app)
            .delete(route + "/1")
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
    it("Status Should be 200 when add product to order", async () => {
        const res = await supertest(app)
            .post(route + "/1/product")
            .send({ quantity: 10, product_id: 1 })
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
});
