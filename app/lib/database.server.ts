import mysql from 'mysql2/promise';
import { BASE_CONNECTION_CONFIG, CONNECTION_CONFIG_WITH_DB } from './constants';

let cachedConnection: mysql.Pool | null = null;

type Props = {
  init?: boolean;
};

export async function getDatabaseConnection({ init = false }: Props) {
  if (cachedConnection) {
    return cachedConnection;
  }

  const connection = mysql.createPool(
    init ? BASE_CONNECTION_CONFIG : CONNECTION_CONFIG_WITH_DB
  );

  cachedConnection = connection;
  connection.on('connection', (conn) => {
    console.log('Database connection established');
  });

  return connection;
}
