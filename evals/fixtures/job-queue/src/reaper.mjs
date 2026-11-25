export function startReaper(queue, { everyMs = 5_000 } = {}) {
  const timer = setInterval(() => queue.expire(), everyMs);
  timer.unref?.();
  return () => clearInterval(timer);
}
