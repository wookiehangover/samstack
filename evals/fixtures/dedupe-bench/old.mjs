export function dedupeOld(rows) {
  const seen = new Set();
  const out = [];
  for (const row of rows) {
    const key = `${row.tenant}:${row.id}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(row);
    }
  }
  return out;
}
