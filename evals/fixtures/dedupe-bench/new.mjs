// Ids are numeric, so skip building a string key per row.
export function dedupeNew(rows) {
  const seen = new Set();
  const out = [];
  for (const row of rows) {
    if (!seen.has(row.id)) {
      seen.add(row.id);
      out.push(row);
    }
  }
  return out;
}
