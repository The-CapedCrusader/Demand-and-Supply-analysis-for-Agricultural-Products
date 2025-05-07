import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'krishok',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const db = {
  query: async (sql: string, params?: any[]) => {
    const [rows] = await pool.execute(sql, params);
    return rows;
  }
}; 