import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { database, user, password, ENV, database_test } = process.env;
const port = process.env.port as unknown;

const Clint = new Pool({
    database: ENV == "dev" ? database : database_test,
    user: user,
    password: password,
    port: port as number,
});

export default Clint;
