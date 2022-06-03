import Clint from "../database";

export interface Iuser {
    id?: number;
    first_name: string;
    last_name: string;
    password: string;
}

export class UsersModel {
    async Index(): Promise<Iuser[]> {
        try {
            const sql = `SELECT * FROM users;`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw err;
        }
    }
    async Show(userID: string): Promise<Iuser> {
        try {
            const sql = `SELECT * FROM users WHERE id=(${userID});`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            if (result.rows.length === 0) {
                throw `Could not find user with id: ${userID}`;
            }
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
    async Create(
        first_name: string,
        last_name: string,
        hashedPassword: string
    ): Promise<Iuser> {
        try {
            const sql = `INSERT INTO users (first_name, last_name, password) VALUES('${first_name}', '${last_name}', '${hashedPassword}') RETURNING *;`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
    async Delete(userID: string): Promise<Iuser> {
        try {
            const sql = `DELETE FROM users WHERE id=(${userID}) RETURNING *`;
            const conn = await Clint.connect();
            const result = await conn.query(sql);
            conn.release();
            if (result.rows.length === 0) {
                throw `Could not find user with id: ${userID}`;
            }
            return result.rows[0];
        } catch (err) {
            throw err;
        }
    }
}
