import supertest from "supertest";
import { app } from "../../../server";
import Clint from "../../../database";
import dotenv from "dotenv";

describe("test users endpoit", () => {
    dotenv.config();
    const token = process.env.test_token as string;

    const route = "/users";

    beforeEach(async () => {
        const sql = `
        ALTER SEQUENCE users_id_seq RESTART WITH 1;
        INSERT INTO users (first_name, last_name, password) VALUES('first-name', 'last-name', 'password');`;
        const conn = await Clint.connect();
        await conn.query(sql);
        conn.release();
    });

    afterEach(async () => {
        const sql = `DELETE FROM users *;`;
        const conn = await Clint.connect();
        await conn.query(sql);
        conn.release();
    });

    it("Status Should be 200 when getting all users", async () => {
        const res = await supertest(app).get(route).set("Authorization", token);
        expect(res.status).toBe(200);
    });
    it("Status Should be 200 when getting user with valid id", async () => {
        const res = await supertest(app)
            .get(route + "/1")
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
    it("Status Should be 404 when getting user with invalid id", async () => {
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
    it("Status Should be 200 when create user", async () => {
        const res = await supertest(app)
            .post(route)
            .send({
                first_name: "first_name3",
                last_name: "last-name3",
                password: "password",
            })
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
    it("Status Should be 200 when delete user", async () => {
        const res = await supertest(app)
            .delete(route + "/1")
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
});
