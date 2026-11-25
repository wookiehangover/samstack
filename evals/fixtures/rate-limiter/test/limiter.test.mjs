import assert from 'node:assert/strict';
import { Limiter } from '../src/limiter.mjs';

let clock = 0;
const limiter = new Limiter({ capacity: 3, refillPerSec: 1, now: () => clock });

assert.equal(limiter.take('a'), true);
assert.equal(limiter.take('a'), true);
assert.equal(limiter.take('a'), true);
assert.equal(limiter.take('a'), false, 'bucket is empty after the burst');

clock += 1000;
assert.equal(limiter.take('a'), true, 'one token after one second');
assert.equal(limiter.take('a'), false);

clock += 60_000;
assert.equal(limiter.take('a', 3), true, 'refill stops at capacity');
assert.equal(limiter.take('a'), false);

assert.equal(limiter.take('b'), true, 'clients have separate buckets');
console.log('ok');
