import { UsersModel } from "../../models/users";
import Clint from "../../database";

const { Index, Show, Create, Delete } = new UsersModel();

describe("Users Model test", () => {
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

    it("it should return all users", async () => {
        const result = await Index();
        expect(result).toEqual([
            {
                id: 1,
                first_name: "first-name",
                last_name: "last-name",
                password: "password",
            },
        ]);
    });

    it("should return user with id 1", async () => {
        const result = await Show("1");
        expect(result).toEqual({
            id: 1,
            first_name: "first-name",
            last_name: "last-name",
            password: "password",
        });
    });
    it("should create user and return it", async () => {
        const result = await Create("first-name", "last-name", "password");
        expect(result).toEqual({
            id: 2,
            first_name: "first-name",
            last_name: "last-name",
            password: "password",
        });
    });
    it("should delete user and return it", async () => {
        const result = await Delete("1");
        expect(result).toEqual({
            id: 1,
            first_name: "first-name",
            last_name: "last-name",
            password: "password",
        });
    });
});
