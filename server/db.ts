import mysql from 'mysql2/promise';

let pool: mysql.Pool | undefined;

export function getPool() {
  if (!pool) {
    const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
    if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_PASSWORD || !MYSQL_DATABASE) {
      throw new Error('MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, and MYSQL_DATABASE must be configured');
    }

    pool = mysql.createPool({
      host: MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 5,
      ssl: process.env.MYSQL_SSL === 'true' ? { rejectUnauthorized: true } : undefined,
    });
  }

  return pool;
}
