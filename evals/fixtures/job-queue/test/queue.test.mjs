import assert from 'node:assert/strict';
import { Queue } from '../src/queue.mjs';

let clock = 0;
const queue = new Queue({ leaseMs: 1000, now: () => clock });

const id = queue.enqueue({ type: 'email', to: 'a@example.test' });
const job = queue.claim('w0');
assert.equal(job.id, id);
assert.equal(queue.claim('w1'), null, 'a leased job is not handed out twice');

clock += 500;
assert.equal(queue.heartbeat('w0', id), true);
assert.equal(queue.ack('w0', id), true);
assert.equal(queue.jobs.size, 0);
console.log('ok');
