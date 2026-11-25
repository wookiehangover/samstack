import { appendFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

export const handlers = {
  async email(payload, workerId) {
    await sleep(payload.ms ?? 50);
    if (payload.log) appendFileSync(payload.log, `${workerId} sent ${payload.to}\n`);
  },
  async resize(payload) {
    if (!payload.width) throw new Error('width is required');
    await sleep(payload.ms ?? 50);
  },
};
