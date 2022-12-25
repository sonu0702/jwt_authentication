import { Secrets } from 'init';
import { Connection } from 'typeorm';

import { dbCreateConnection } from './dbCreateConnection';

const MIGRATOR_LOCK_ID = 2053462845;

async function withAdvisoryLock(connection: Connection, callback: () => Promise<void>): Promise<boolean> {
  // generate a unique lock name, has to be an integer
  // const lockName = CRC32.str('skywallet' as string) * MIGRATOR_SALT;
  const lockName = MIGRATOR_LOCK_ID;
  let lock = false;
  try {
    // try to acquire a lock
    const [{ pg_try_advisory_lock: locked }]: [{ pg_try_advisory_lock: boolean }] = await connection.manager.query(
      `SELECT pg_try_advisory_lock(${lockName})`,
    );
    lock = locked;

    // if already locked, print a warning an exit
    if (!lock) {
      console.warn(`Failed to get advisory lock: ${lockName}`);
      return false;
    }

    // execute our code inside the lock
    await callback();

    return true;
  } finally {
    // if we acquired a lock, we need to unlock it
    if (lock) {
      const [{ pg_advisory_unlock: wasLocked }]: [{ pg_advisory_unlock: boolean }] = await connection.manager.query(
        `SELECT pg_advisory_unlock(${lockName})`,
      );

      if (!wasLocked) {
        console.warn(`Advisory lock was not locked: ${lockName}`);
      }
    }
  }
}

export const migrateDatabase = async () => {
  const connection = await dbCreateConnection(Secrets);
  console.log('connection for migration established');
  await withAdvisoryLock(connection, async () => {
    try {
      console.log('about to run migration in a while');
      await connection.runMigrations({
        transaction: 'all',
      });
      console.log('migration complete');
    } catch (err) {
      console.log('error in migration: ', err.message);
    }
  });
  await connection.close();
};
