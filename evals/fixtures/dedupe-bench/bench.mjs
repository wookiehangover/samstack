import { performance } from 'node:perf_hooks';
import { dedupeOld } from './old.mjs';
import { dedupeNew } from './new.mjs';

export function makeRows(count, seed = 42) {
  let state = seed;
  const next = () => {
    let t = (state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return (t ^ (t >>> 14)) >>> 0;
  };
  const rows = [];
  for (let i = 0; i < count; i++) {
    rows.push({ tenant: `tenant-${next() % 8}`, id: next() % (count / 4), body: `row ${i}` });
  }
  return rows;
}

function time(fn, rows) {
  const start = performance.now();
  fn(rows);
  return performance.now() - start;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = makeRows(400_000);
  const oldMs = time(dedupeOld, rows);
  const newMs = time(dedupeNew, rows);
  console.log(`old ${oldMs.toFixed(1)} ms`);
  console.log(`new ${newMs.toFixed(1)} ms`);
  console.log(`speedup ${(oldMs / newMs).toFixed(1)}x`);
}
