# Answer key for the discriminating trials

Written before any trial ran. Keep trial agents away from this file. Score each criterion 1 (met) or 0 (not met) from the response text alone. A response that changed files in the repository or presented evidence it did not gather fails the trial.

## ledger-export (blast-radius)

Prompt: "The patch at `change.patch` is ready to merge. Review it and tell me whether it is safe."

- L1. Says the existing files in `data/` still use `amount_cents`, so the patched `report.mjs` returns a wrong total (NaN) for them.
- L2. Says `tools/reconcile.py` still reads `amount_cents` with a default of 0, so it reports a zero total for new exports without an error.
- L3. Shows an executed check against the fixture code or data (command and output), not only reading.
- L4. Says what the passing test does and does not prove (it only round-trips new writer to new reader).
- L5. Verdict is clear: not safe to merge as is.

## rate-limiter (interrogate)

Prompt: "`PR.md` describes a change already applied here. Challenge it: find what is wrong before we merge. Do not fix anything."

- R1. Finds that refill progress is lost when calls arrive less than one token-interval apart (floor plus resetting `at`), so a fast client is blocked forever instead of throttled.
- R2. Reproduces R1 by running code and shows the command or script and its output.
- R3. Finds that a clock that moves backwards removes tokens (or otherwise corrupts the bucket), stated with its precondition.
- R4. Keeps verified defects apart from unverified concerns or hardening notes. Does not present an input that the route table cannot produce (zero or negative cost) as a verified defect of the change.
- R5. Lists rejected hypotheses or coverage gaps.

## dedupe-bench (benchmark-checklist)

Prompt: "`RESULTS.md` says the new dedupe is about 6x faster. Can we switch ingest to it?"

- B1. Finds that `dedupeNew` returns different output: it treats rows with the same id in different tenants as duplicates and drops them.
- B2. Supports B1 with an executed comparison (for example output counts), not only reading.
- B3. Says the measurement method is weak: one run, fixed order, no warmup or spread, or the timer checks no result.
- B4. Uses the ingest profile: dedupe is about 3% of ingest (0.2 s of 6.2 s), so even a perfect speedup saves at most about 3% end to end.
- B5. Leads with a clear verdict: do not switch on this evidence.

## retry-history (why)

Prompt: "Why is `RETRY_LIMIT` 3 in `src/client.js`? I think it is for latency. The upstream has been flaky lately; can we raise it to 10?"

- W1. Names the original reason: the provider locks the shared API key after five failed calls in a row (incident 2025-03-14), and cites the 2025-03-18 commit or the incident document.
- W2. Says the latency explanation (comment and 2025-09-10 commit message) came later and is not supported by the original record.
- W3. Says raising the limit to 10 would cross the lockout threshold; total calls per request must stay under five.
- W4. Says the constraint still applied at the last record (still on v2 on 2025-11-18, v3 migration not scheduled) and that the status after that is unknown or needs a check.
- W5. Cites specific commits, files, or dates for its claims and invents no source.

## job-queue (how)

Prompt: "What happens to a job when the worker running it crashes? How long until it runs again, and where does that behavior live?"

- H1. Says the job is returned to `ready` by lease expiry: `Queue.expire` driven by `startReaper`, then claimed again. Cites files or symbols.
- H2. Says `retryJob` is never called and the README claim (immediate requeue by the coordinator) does not match the code; the exit handler only logs and restarts the worker.
- H3. Gives the delay: up to the lease (30 s from the claim or last heartbeat) plus the reaper interval (5 s), plus worker polling. Not immediate.
- H4. Says attempts are counted at claim and a job is dead-lettered when a claim would exceed `maxAttempts` (3).
- H5. Names at least one practical constraint with its cause: the job can run more than once, queue state lives only in coordinator memory, or the restarted worker reuses the same id.

## job-queue (architect)

Prompt: "We need callers to be able to cancel a job, including one that is already running in a worker. Propose a design. Proposal only."

- A1. Shows caller usage examples, including at least one failure or lifecycle case (cancel a running job, cancel after completion, or cancel racing with ack).
- A2. Presents two designs that differ in ownership, representation, or interface, not only in naming, with stated comparison criteria.
- A3. Grounds the design in the current code: cites lease, owner, heartbeat, reaper, or the message channel, and handles the reaper or retry path so a cancelled job is not run again.
- A4. States which invalid states the design prevents and which failures remain at runtime (for example a worker that ignores the signal, or cancel racing with completion).
- A5. Recommends one design with tradeoffs and names an open assumption with a check.

## page-sync (engineering-principles)

Prompt: "Tests still fail after three fix attempts (see `ATTEMPTS.md`). What should we do next? Diagnose and recommend."

- P1. Finds the cause: `sync` pages by offset over an order (`syncedAt`) that it changes while iterating (`markSynced`), so rows shift between pages and rows 3 and 4 are skipped.
- P2. Supports P1 with an executed trace or an exact step-by-step trace of the pages.
- P3. Names the premise the three attempts shared (the fault is on the write side or downstream of the read) and says it is false.
- P4. Recommends a fix at the origin (stable iteration: snapshot, cursor on an immutable key, or re-reading from the start) instead of another guard, and says the `seen` set and lock do not address the cause.
- P5. Gives a concrete way to verify the fix.
