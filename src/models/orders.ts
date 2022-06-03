import Clint from "../database";

export interface Iorder {
    id?: number;
    user_id: number;
    status: string;
}

export interface Iorder_products {
    id?: number;
    quantity: number;
    order_id: number;
    product_id: number;
}
export class OrdersModel {
    async Index(): Promise<Iorder[]> {
        // ts
        try {
            const sql = `SELECT * FROM orders;`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    async Show(id: string): Promise<Iorder[]> {
        //takes id of the user
        try {
            const sql = `SELECT * FROM orders WHERE user_id=(${id});`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            if (result.rows.length === 0) {
                throw `Could not find order with id: ${id}`;
            }
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    async Create(o: Iorder): Promise<Iorder> {
        try {
            const sql = `INSERT INTO orders (user_id, status) VALUES(${o.user_id}, '${o.status}') RETURNING *`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
    async Delete(id: string): Promise<Iorder> {
        //takes id of the order
        try {
            const sql = `DELETE FROM orders WHERE id=(${id}) RETURNING *`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            if (result.rows.length === 0) {
                throw `Could not find order with id: ${id}`;
            }
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
    async Addproduct(
        quantity: number,
        orderID: number,
        productID: number
    ): Promise<Iorder_products> {
        try {
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES(${quantity}, ${orderID}, ${productID}) RETURNING *`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
}
