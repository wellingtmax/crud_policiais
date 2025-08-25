import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Criar connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Testar conexão
try {
  const connection = await db.getConnection();
  console.log('✅ Banco de dados conectado com sucesso!');
  connection.release();
} catch (error) {
  console.error('❌ Erro ao conectar com o banco:', error.message);
}

export { db };
