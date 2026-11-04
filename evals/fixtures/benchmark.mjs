import { performance } from 'node:perf_hooks';
let writes = 0;
async function writeRow() {
  await new Promise(resolve => setTimeout(resolve, 10));
  writes += 1;
}
export async function oldRun(rows) {
  for (const row of rows) await writeRow(row);
}
export async function newRun(rows) {
  rows.map(row => writeRow(row));
}
export async function measure(run, rows) {
  writes = 0;
  const start = performance.now();
  await run(rows);
  return { ms: performance.now() - start, writes };
}
