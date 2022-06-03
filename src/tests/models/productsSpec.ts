import { ProductsModel } from "../../models/products";
import Clint from "../../database";

const { Index, Show, Create, Delete } = new ProductsModel();

describe("Products Model test", () => {
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

    it("it should return all rows", async () => {
        const result = await Index();
        expect(result).toEqual([
            {
                id: 1,
                name: "product-name",
                price: 100,
                category: "",
            },
        ]);
    });

    it("should return product with id 1", async () => {
        const result = await Show("1");
        expect(result).toEqual({
            id: 1,
            name: "product-name",
            price: 100,
            category: "",
        });
    });
    it("should create product and return it", async () => {
        const result = await Create({ name: "product-name", price: 50 });
        expect(result).toEqual({
            id: 2,
            name: "product-name",
            price: 50,
            category: "",
        });
    });
    it("should delete product and return it", async () => {
        const result = await Delete("1");
        expect(result).toEqual({
            id: 1,
            name: "product-name",
            price: 100,
            category: "",
        });
    });
});
