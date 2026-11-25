# Fix attempts so far

Synthetic evaluation fixture. `node test/sync.test.mjs` fails.

Original symptom: after a sync run, some rows were written twice and some were missing.

1. Added the `seen` set in `src/sync.mjs` to drop repeated rows. Double writes stopped. Rows are still missing.
2. Suspected writes were clobbering each other in the destination, so wrapped each write in `dest.withLock`. No change.
3. Wrapped the whole `sync` call in a loop that re-runs it until the written count matches the source count. The count matched on the second pass, but rows were written twice again, so the test still failed. Reverted.
