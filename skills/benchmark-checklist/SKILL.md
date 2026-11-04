---
name: benchmark-checklist
description: Audit measured speedups, regressions, or performance comparisons for correctness, completed work, tuning, repeatability, bottlenecks, and end-to-end relevance before using the numbers to choose an option.
---

# Benchmark checklist

Write the exact claim being tested, including workload, unit, statistic, and environment. Read the harness: what does its timer include, count, and omit? Inspect platform-appropriate load and core information; never stop unrelated workloads without authorization.

For a requested rough ballpark, one run may suffice: still verify errors, output correctness, and completed work, and label it a single run. Choosing between alternatives requires a fair comparison.

1. **Find the limiter.** Profile separately from reported timing runs. Check the client/load generator as well as the target, CPU, I/O, waits, and source hot path. A saturated generator measures its own ceiling.
2. **Compare realistic configurations.** Use production builds, matching versions/data, realistic pools/batches/transactions, and explicit warm/cold cache conditions. If one side is untuned, fix the comparison or withhold an adoption verdict. Narrowing the claim cannot make an unfair comparison fair.
3. **Check physical and mathematical limits.** Compare bytes/time with bandwidth and work/core cost with capacity. If an optimized component accounts for fraction f of original time, deleting its entire cost saves at most f of latency; maximum speedup is 1/(1-f). An impossible result points to omitted work, caching, changed semantics, or a measurement bug.
4. **Count failures and verify results.** Include non-success responses, retries, timeouts, and output correctness. Fast rejection is not fast completion.
5. **Check repeatability.** For a comparison, aim for at least five independent runs per side, interleaved or with balanced randomized order and controlled warmup. Report run count, median, range, and the raw observations. If noise overlaps the claimed gain, report no measurable difference or inconclusive; avoid overstating significance from small samples.
6. **Measure user relevance.** Pair a microbenchmark with the end-to-end path and realistic data/concurrency. Do not apply a helper's speedup to the entire request.
7. **Prove work completed inside the timer.** Await promises, consume lazy iterators, use results, and verify writes/bytes/requests independently. A timeout or successful enqueue does not establish completion.

Lead with faster, slower, no measurable difference, or inconclusive. Include units, counts, distribution, limiter evidence, versions, and what the result supports. Withhold a comparative conclusion when the limiter, fairness, errors, or completed work cannot be checked. A measured duration can still be reported with that limitation.

Use existing Intent saved scripts for long runs after inspecting their definitions and live API signatures. Keep raw results in the requested artifact or task note. Never create a perpetual tuning loop or change a production configuration merely to complete this checklist. No companion skill is required.

If optimization is also requested, first consider eliminating measured unnecessary work, then reducing, caching, deferring, parallelizing, or cheapening it as the workload permits. Fix the measurement method and correctness gates before comparing hypotheses. Change one hypothesis at a time within the agreed effort budget; retain a gain only when the same workload improves without violating those gates. This is optional experimentation, not permission for an unattended hillclimb.

Adapted from Lauren Tan's pstack, MIT; see [license](LICENSE) and [source](https://github.com/cursor/plugins/blob/bb68f2365eceafa0cb2d253112f675acf5f144cc/pstack/skills/benchmark-checklist/SKILL.md).
