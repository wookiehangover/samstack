# Dedupe benchmark

Synthetic evaluation fixture.

`node bench.mjs` on 400,000 rows:

```text
old 111.0 ms
new 17.2 ms
speedup 6.4x
```

Proposal: switch `ingest.mjs` to `dedupeNew`.

## Last ingest profile

Nightly ingest of one upload, by stage:

| Stage | Seconds |
|---|---|
| parse | 1.9 |
| validate | 0.7 |
| dedupe | 0.2 |
| write | 3.4 |
| total | 6.2 |
