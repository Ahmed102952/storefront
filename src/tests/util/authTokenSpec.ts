import supertest from "supertest";
import { app } from "../../server";
import dotenv from "dotenv";

describe("test token authentication function", () => {
    dotenv.config();
    const token = process.env.test_token as string;
    console.log(token)

    it("should Not give access", async () => {
        const res = await supertest(app)
            .post("/products")
            .send({ name: "name", price: 100 })
            .set("Authorization", "wrong token");
        expect(res.status).toBe(401);
    });
    it("should give access", async () => {
        const res = await supertest(app)
            .get("/orders")
            .set("Authorization", token);
        expect(res.status).toBe(200);
    });
});
