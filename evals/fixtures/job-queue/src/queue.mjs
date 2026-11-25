export class Queue {
  constructor({ leaseMs = 30_000, maxAttempts = 3, now = Date.now } = {}) {
    this.leaseMs = leaseMs;
    this.maxAttempts = maxAttempts;
    this.now = now;
    this.jobs = new Map();
    this.dead = [];
    this.nextId = 1;
  }

  enqueue(payload) {
    const job = { id: this.nextId++, payload, state: 'ready', attempts: 0, owner: null, leaseUntil: 0 };
    this.jobs.set(job.id, job);
    return job.id;
  }

  claim(workerId) {
    for (const job of this.jobs.values()) {
      if (job.state !== 'ready') continue;
      job.attempts += 1;
      if (job.attempts > this.maxAttempts) {
        job.state = 'dead';
        this.dead.push(job.id);
        continue;
      }
      job.state = 'leased';
      job.owner = workerId;
      job.leaseUntil = this.now() + this.leaseMs;
      return { id: job.id, payload: job.payload };
    }
    return null;
  }

  heartbeat(workerId, jobId) {
    const job = this.jobs.get(jobId);
    if (!job || job.state !== 'leased' || job.owner !== workerId) return false;
    job.leaseUntil = this.now() + this.leaseMs;
    return true;
  }

  ack(workerId, jobId) {
    const job = this.jobs.get(jobId);
    if (!job || job.owner !== workerId) return false;
    this.jobs.delete(jobId);
    return true;
  }

  fail(workerId, jobId) {
    const job = this.jobs.get(jobId);
    if (!job || job.owner !== workerId) return false;
    job.state = 'ready';
    job.owner = null;
    return true;
  }

  expire() {
    const t = this.now();
    let released = 0;
    for (const job of this.jobs.values()) {
      if (job.state === 'leased' && job.leaseUntil <= t) {
        job.state = 'ready';
        job.owner = null;
        released += 1;
      }
    }
    return released;
  }
}
