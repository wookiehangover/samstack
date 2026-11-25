import { appendFileSync } from 'node:fs';

export function toRecord(txn) {
  return {
    id: txn.id,
    account: txn.account,
    amount_cents: Math.round(txn.amount * 100),
    ts: txn.ts,
  };
}

export function exportTxns(file, txns) {
  for (const txn of txns) appendFileSync(file, JSON.stringify(toRecord(txn)) + '\n');
}
