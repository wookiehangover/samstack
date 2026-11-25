import { setTimeout as sleep } from 'node:timers/promises';
import { handlers } from './handlers.mjs';

const workerId = process.argv[2];
const HEARTBEAT_MS = 10_000;
const IDLE_MS = 250;

let nextSeq = 0;
const pending = new Map();

process.on('message', ({ seq, result }) => {
  pending.get(seq)?.(result);
  pending.delete(seq);
});

function call(op, jobId) {
  return new Promise(resolve => {
    const seq = ++nextSeq;
    pending.set(seq, resolve);
    process.send({ seq, op, jobId });
  });
}

for (;;) {
  const job = await call('claim');
  if (!job) {
    await sleep(IDLE_MS);
    continue;
  }
  const beat = setInterval(() => call('heartbeat', job.id), HEARTBEAT_MS);
  try {
    await handlers[job.payload.type](job.payload, workerId);
    await call('ack', job.id);
  } catch {
    await call('fail', job.id);
  } finally {
    clearInterval(beat);
  }
}
