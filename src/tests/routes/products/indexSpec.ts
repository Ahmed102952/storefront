import supertest from "supertest";
import { app } from "../../../server";
import Clint from "../../../database";
import dotenv from "dotenv";

describe("test products endpoit", () => {
    dotenv.config();
    const token = process.env.test_token as string;

    const route = "/products";

    beforeEach(async () => {
        const sql = `
        ALTER SEQUENCE products_id_seq RESTART WITH 1;
        INSERT INTO products (name, price, category) VALUES('product-name', 100, '');`;
        const conn = await Clint.connect();
        await conn.query(sql);
        conn.release();
    });

    afterEach(async () => {
        const sql = `DELETE FROM products *;`;
        const conn = await Clint.connect();
        await conn.query(sql);
        conn.release();
    });

    it("Status Should be 200 when getting all products", async () => {
        const res = await supertest(app).get(route);
        expect(res.status).toBe(200);
    });
    it("Status Should be 200 when getting product with valid id", async () => {
        const res = await supertest(app).get(route + "/1");
        expect(res.status).toBe(200);
    });
    it("Status Should be 404 when getting product with invalid id", async () => {
        const res = await supertest(app).get(route + "/5");
        expect(res.status).toBe(404);
    });
    it("Status Should be 404 when getting product with invalid id", async () => {
        const res = await supertest(app).get(route + "/a");
        expect(res.status).toBe(404);
    });
    it("Status Should be 200 when create product", async () => {
        const res = await supertest(app)
            .post(route)
            .send({ name: "name", price: 100 })
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
    it("Status Should be 200 when delete product", async () => {
        const res = await supertest(app)
            .delete(route + "/1")
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
});
