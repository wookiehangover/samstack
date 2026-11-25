import { Limiter } from './limiter.mjs';

const COST = { read: 1, write: 5 };

export function costFor(route) {
  return COST[route.kind] ?? 1;
}

export function guard(limiter, clientId, route) {
  return limiter.take(clientId, costFor(route)) ? 200 : 429;
}

export const limiter = new Limiter({ capacity: 10, refillPerSec: 1 });
