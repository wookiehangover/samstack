import assert from 'node:assert/strict';
import { Source } from '../src/source.mjs';
import { Dest } from '../src/dest.mjs';
import { sync } from '../src/sync.mjs';

const source = new Source([
  { id: 1, syncedAt: 10 },
  { id: 2, syncedAt: 20 },
  { id: 3, syncedAt: 30 },
  { id: 4, syncedAt: 40 },
  { id: 5, syncedAt: 50 },
]);
const dest = new Dest();
let clock = 1000;

await sync(source, dest, { now: () => clock++ });

assert.deepEqual([...dest.writes].sort(), [1, 2, 3, 4, 5], 'every row is written exactly once');
console.log('ok');
