import { Connection, createConnection } from 'typeorm';
import Logger from '../logger';
// import config from './config/ormconfig';
import { getConfig } from './config/ormconfig';


export let databaseConnection: Connection;

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const config = getConfig();
    databaseConnection = await createConnection(config);
    Logger.info(
      `Database connection success. Connection name: '${databaseConnection.name}' Database: '${databaseConnection.options.database}'`,
    );
    return databaseConnection;
  } catch (err) {
    Logger.error('error', err);
    throw err;

  }
  return null;
};
