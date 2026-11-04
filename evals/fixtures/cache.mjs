export class Cache {
  #entries = new Map();
  constructor(dispose = () => {}) { this.dispose = dispose; }
  set(key, value) { this.#entries.set(key, value); }
  get(key) { return this.#entries.get(key); }
  delete(key) {
    const value = this.#entries.get(key);
    this.#entries.delete(key);
    if (value) this.dispose(value);
  }
}

export function acquire(cache, key) {
  let resource = cache.get(key);
  if (!resource) {
    resource = { closed: false, read() {
      if (this.closed) throw new Error('resource closed');
      return 'payload';
    } };
    cache.set(key, resource);
  }
  return { read: () => resource.read() };
}

export function previousRelease(cache, key) { /* Ownership retained until shutdown. */ }
export function proposedRelease(cache, key) { cache.delete(key); }
