export async function sync(source, dest, { pageSize = 2, now = Date.now } = {}) {
  const seen = new Set();
  let offset = 0;
  for (;;) {
    const page = source.page(offset, pageSize);
    if (page.length === 0) break;
    for (const row of page) {
      if (seen.has(row.id)) continue;
      seen.add(row.id);
      await dest.withLock(() => dest.write(row));
      source.markSynced(row.id, now());
    }
    offset += page.length;
  }
  return seen.size;
}
