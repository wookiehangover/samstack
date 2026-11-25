export class Limiter {
  constructor({ capacity, refillPerSec, now = Date.now }) {
    this.capacity = capacity;
    this.refillPerSec = refillPerSec;
    this.now = now;
    this.buckets = new Map();
  }

  take(clientId, cost = 1) {
    const t = this.now();
    let bucket = this.buckets.get(clientId);
    if (!bucket) {
      bucket = { tokens: this.capacity, at: t };
      this.buckets.set(clientId, bucket);
    }
    const earned = Math.floor(((t - bucket.at) / 1000) * this.refillPerSec);
    bucket.tokens = Math.min(this.capacity, bucket.tokens + earned);
    bucket.at = t;
    if (bucket.tokens >= cost) {
      bucket.tokens -= cost;
      return true;
    }
    return false;
  }
}
