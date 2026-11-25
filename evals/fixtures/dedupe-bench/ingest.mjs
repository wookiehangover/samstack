import { dedupeOld as dedupe } from './old.mjs';

// Nightly ingest: parse the upload, validate, drop repeated rows, write the batch.
export async function ingest(upload, { parse, validate, write }) {
  const rows = dedupe(validate(parse(upload)));
  await write(rows);
  return rows.length;
}
