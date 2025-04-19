export const DBDIR = 'db';

export const BASE_CONNECTION_CONFIG = {
  host: 'localhost',
  user: 'root',
  queueLimit: 0,
  idleTimeout: 60000,
  connectionLimit: 10,
  enableKeepAlive: true,
  waitForConnections: true,
  keepAliveInitialDelay: 0,
};

export const CONNECTION_CONFIG_WITH_DB = {
  ...BASE_CONNECTION_CONFIG,
  database: 'krishok',
};
