import mysql from 'mysql2/promise';

let cachedConnection: mysql.Pool | null = null;

export async function getDatabaseConnection() {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'lab_project',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    idleTimeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

  cachedConnection = connection;
  connection.on('connection', (conn) => {
    console.log('Database connection established');
  });

  return connection;
}
