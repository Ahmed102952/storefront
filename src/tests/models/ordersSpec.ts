import { OrdersModel } from "../../models/orders";
import Clint from "../../database";

const { Index, Show, Create, Delete, Addproduct } = new OrdersModel();

describe("Orders Model test", () => {
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

    it("it should return all orders", async () => {
        const result = await Index();
        expect(result).toEqual([
            {
                id: 1,
                user_id: 1,
                status: "active",
            },
        ]);
    });

    it("should return order with user id 1", async () => {
        const result = await Show("1");
        expect(result[0]).toEqual({
            id: 1,
            user_id: 1,
            status: "active",
        });
    });
    it("should create order and return it", async () => {
        const result = await Create({ user_id: 1, status: "active" });
        expect(result).toEqual({
            id: 2,
            user_id: 1,
            status: "active",
        });
    });
    it("should delete order and return it", async () => {
        const result = await Delete("1");
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: "active",
        });
    });
    it("should add product and return it", async () => {
        const result = await Addproduct(10, 1, 1);
        expect(result).toEqual({
            id: 1,
            quantity: 10,
            order_id: 1,
            product_id: 1,
        });
    });
});
