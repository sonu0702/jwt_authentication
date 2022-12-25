import * as CRC32 from 'crc-32';
import { Connection, ConnectionManager, EntityManager } from 'typeorm';

export async function withAdvisoryLock(
  entityManager: EntityManager,
  lockName: number,
  callback: () => Promise<void>,
): Promise<boolean> {
  let lock = false;
  try {
    // try to acquire a lock
    const [{ pg_try_advisory_lock: locked }]: [{ pg_try_advisory_lock: boolean }] = await entityManager.query(
      `SELECT pg_try_advisory_lock(${lockName})`,
    );
    lock = locked;

    // if already locked, print a warning an exit
    if (!lock) {
      console.warn(`Failed to get advisory lock: ${lockName}`);
      return false;
    }

    console.warn(`Successful to get advisory lock: ${lockName}`);

    // execute our code inside the lock
    await callback();

    return true;
  } finally {
    // if we acquired a lock, we need to unlock it
    if (lock) {
      const [{ pg_advisory_unlock: wasLocked }]: [{ pg_advisory_unlock: boolean }] = await entityManager.query(
        `SELECT pg_advisory_unlock(${lockName})`,
      );

      if (!wasLocked) {
        console.warn(`Advisory lock was not locked: ${lockName}`);
      } else {
        console.log(`Advisory lock unlocked: ${lockName}`);
      }
    }
  }
}
/**
 * return <number>
 * lockname : <NftTxn_{wallet_uuid}_{order_uuid}>
 */
export function nftTxnAdvisoryLockName(wallet_uuid: string, order_uuid: string) {
  return Math.abs(CRC32.buf(Buffer.from(`NftTxn_${wallet_uuid}_${order_uuid}`, 'binary'), 0));
}
