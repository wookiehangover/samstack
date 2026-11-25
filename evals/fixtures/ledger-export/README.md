# Ledger export

Synthetic evaluation fixture. `src/export.mjs` appends one JSON line per transaction to a monthly file in `data/`. `src/report.mjs` totals those files.

Run the test with `node test/report.test.mjs`.
