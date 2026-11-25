import { fork } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { Queue } from './queue.mjs';
import { startReaper } from './reaper.mjs';

const WORKER = fileURLToPath(new URL('./worker.mjs', import.meta.url));

export function start({ workers = 2, workerPath = WORKER, reaper, ...queueOptions } = {}) {
  const queue = new Queue(queueOptions);
  const stopReaper = startReaper(queue, reaper);
  const children = new Map();
  let stopping = false;

  const ops = {
    claim: workerId => queue.claim(workerId),
    heartbeat: (workerId, jobId) => queue.heartbeat(workerId, jobId),
    ack: (workerId, jobId) => queue.ack(workerId, jobId),
    fail: (workerId, jobId) => queue.fail(workerId, jobId),
  };

  function spawn(workerId) {
    const child = fork(workerPath, [workerId]);
    children.set(workerId, child);
    child.on('message', ({ seq, op, jobId }) => {
      const result = ops[op] ? ops[op](workerId, jobId) : null;
      if (child.connected) child.send({ seq, result });
    });
    child.on('exit', code => {
      children.delete(workerId);
      if (stopping) return;
      console.error(`worker ${workerId} exited with ${code}; restarting`);
      spawn(workerId);
    });
  }

  for (let i = 0; i < workers; i++) spawn(`w${i}`);

  return {
    queue,
    stop() {
      stopping = true;
      stopReaper();
      for (const child of children.values()) child.kill();
    },
  };
}

// Put a crashed worker's job back on the queue.
export function retryJob(queue, workerId) {
  for (const job of queue.jobs.values()) {
    if (job.owner === workerId) queue.fail(workerId, job.id);
  }
}
