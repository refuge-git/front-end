import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let connection = null;

export async function getConnection() {
  if (connection) return connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "Rosquinha",
      database: process.env.DB_NAME || "refuge",
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    });

    console.log('✅ Conectado ao banco de dados');
    return connection;
  } catch (err) {
    console.error('❌ Falha ao conectar ao banco de dados:', err.message || err);
    throw err;
  }
}

