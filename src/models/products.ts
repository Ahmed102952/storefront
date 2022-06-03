import Clint from "../database";

export interface Iproduct {
    id?: number;
    name: string;
    price: number;
    category?: string;
}

export class ProductsModel {
    async Index(): Promise<Iproduct[]> {
        try {
            const sql = `SELECT * FROM products;`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    async Show(productID: string): Promise<Iproduct> {
        try {
            const sql = `SELECT * FROM products WHERE id=(${productID});`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            if (result.rows.length === 0) {
                throw `Could not find product with id: ${productID}`;
            }
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
    async Create(p: Iproduct): Promise<Iproduct> {
        try {
            const sql = `INSERT INTO products (name, price, category) VALUES('${
                p.name
            }', ${p.price}, '${p.category ? p.category : ""}') RETURNING *;`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
    async Delete(productID: string): Promise<Iproduct> {
        try {
            const sql = `DELETE FROM products WHERE id=(${productID}) RETURNING *`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            if (result.rows.length === 0) {
                throw `Could not find product with id: ${productID}`;
            }
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
}
