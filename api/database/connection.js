import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Rosquinha",
  database: process.env.DB_NAME || "refuge",
  port: process.env.DB_PORT || 3306,
});

