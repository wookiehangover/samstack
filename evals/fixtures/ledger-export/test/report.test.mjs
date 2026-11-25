import assert from 'node:assert/strict';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { exportTxns } from '../src/export.mjs';
import { monthTotal } from '../src/report.mjs';

const file = join(mkdtempSync(join(tmpdir(), 'ledger-')), 'ledger.jsonl');
exportTxns(file, [
  { id: 't-1', account: 'acme', amount: 12.5, ts: '2026-11-01T00:00:00Z' },
  { id: 't-2', account: 'acme', amount: 0.75, ts: '2026-11-02T00:00:00Z' },
]);
assert.equal(monthTotal(file), 13.25);
console.log('ok');
