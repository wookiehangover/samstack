# Representative local skill trials

Date: 2026-11-04 UTC. Session-reported model: `gpt-6-astra` via Codex (workspace agent metadata); no independent verification of the serving model. Node: `v24.22.1`. Checkout HEAD: `1109d6990fd5d1c3e666506c230458d27a6f2270`.

## Method and limits

Three sequential reasoning passes, each beginning with its own named skill(s) and fixture. Responses were recorded before opening the next trial's inputs. These are separate task passes in one agent context, **not three fresh model sessions**; no delegation was authorized. The explicit old/new functions select the cache comparison; the untracked fixture content, rather than committed HEAD, is what was executed. No remote, install, fixture change, skill change, commit, or PR operation was performed. Only this report was written in the checkout; executable probes were written under the agent's private `$TMPDIR`.

`EVALUATION.md`, upstream assessments, and other agents' conversations were not opened. The required conflict-check agent listing unexpectedly included brief unrelated assessment conclusions and the coordinator's short description of the planned benchmark trial. This weakens strict blindness; no results of these three trials were supplied. The spec was not opened because the task explicitly restricted trial inputs. Acceptance criteria were read from the assigned task note. The active agents' named work concerned assessment documents, with no indicated overlap on this report.

## Trial 1 — blast-radius + interrogate

Inputs read: `skills/blast-radius/SKILL.md`, `skills/interrogate/SKILL.md`, `evals/fixtures/cache.mjs`. Attribution links were not fetched; they were not needed for the local behavioral check.

### Actual trial response

Do not replace `previousRelease` with `proposedRelease` under the stated shared-client contract without addressing resource ownership. **One conditional regression is reproduced:** when the cache's supported disposal callback closes the resource, releasing one client makes another client sharing the key throw `resource closed`.

The change is `previousRelease` (line 25, no action) to `proposedRelease` (line 26, calls `cache.delete`). The load-bearing assumption is: releasing one client must leave the shared resource readable for every remaining client. `Cache.delete` calls the supplied disposer at lines 6–9, while `acquire` returns a closure over the resource at line 22. Deleting the map entry therefore does not detach the other client from the disposed object. The independent lifecycle attack is a two-client acquire, release, remaining-client read; the default-disposer case tests whether deletion alone causes the failure.

Evidence level: executed actual fixture classes/functions with a synthetic, explicitly closing disposer. This is not an application-level reproduction: the fixture's default disposer does nothing, and no production wiring was provided. The repro succeeded twice. With the same closing disposer, the old release returned `payload`; the proposed release threw `resource closed`, so this failure does not predate the change.

Cleared cases: with the default no-op disposer, both old and new releases leave the existing client's read working. With either release, a newly acquired unrelated key reads successfully. Thus the hypothesis “map deletion alone invalidates the captured resource” is rejected. The failure requires a disposer that closes or otherwise invalidates the shared resource; no probability is assigned.

Impact: one client's cleanup can interrupt another client's work. The smallest regression check is to construct a closing-disposer cache, acquire two handles for one key, release one, and assert that the second still returns `payload`. Unresolved: actual application disposer wiring, shutdown ownership, reacquisition and repeated-release ordering, asynchronous callers, and broader integration coverage. No fixes were made.

### Commands and actual output

Read/identity commands: `cat skills/blast-radius/SKILL.md skills/interrogate/SKILL.md evals/fixtures/cache.mjs`, `git rev-parse HEAD`, `node --version`, `nl -ba evals/fixtures/cache.mjs`, and `sha256sum` on those three inputs.

The following scratch probe was saved as `$TMPDIR/cache-trial.mjs`:

```js
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
const {Cache, acquire, previousRelease, proposedRelease} = await import(pathToFileURL(resolve('evals/fixtures/cache.mjs')));
for (const release of [previousRelease, proposedRelease]) {
  for (const closeOnDispose of [false, true]) {
    const disposed = [];
    const cache = closeOnDispose ? new Cache(r => { disposed.push(r); r.closed = true; }) : new Cache();
    const a = acquire(cache, 'shared');
    const b = acquire(cache, 'shared');
    assert.equal(a.read(), 'payload');
    assert.equal(b.read(), 'payload');
    release(cache, 'shared');
    let remaining;
    try { remaining = b.read(); } catch (e) { remaining = e.message; }
    const other = acquire(cache, 'other');
    const result = {release:release.name, closeOnDispose, remaining, retained:!!cache.get('shared'), disposed:disposed.length, unrelated:other.read()};
    assert.equal(remaining, release === proposedRelease && closeOnDispose ? 'resource closed' : 'payload');
    assert.equal(other.read(), 'payload');
    console.log(JSON.stringify(result));
  }
}
```

Command: `node "$TMPDIR/cache-trial.mjs"` (run twice, exit 0 both times; identical output):

```jsonl
{"release":"previousRelease","closeOnDispose":false,"remaining":"payload","retained":true,"disposed":0,"unrelated":"payload"}
{"release":"previousRelease","closeOnDispose":true,"remaining":"payload","retained":true,"disposed":0,"unrelated":"payload"}
{"release":"proposedRelease","closeOnDispose":false,"remaining":"payload","retained":false,"disposed":0,"unrelated":"payload"}
{"release":"proposedRelease","closeOnDispose":true,"remaining":"resource closed","retained":false,"disposed":1,"unrelated":"payload"}
```

The probe exits successfully because it asserts the observed differential, including the expected throw in the new implementation. That exit code does **not** mean the new implementation satisfies the user's contract.

Instruction outcome: review-only boundary preserved; a real-code differential was executed and rerun; old behavior and negative controls were checked; failure preconditions and evidence limits are explicit. No dependency packages or production callers were present in the permitted fixture scope, so no broader caller search was claimed.

## Trial 2 — benchmark-checklist

Inputs read: `skills/benchmark-checklist/SKILL.md`, `evals/fixtures/benchmark.mjs` (also with line numbers). Separate performance reasoning pass; no cache conclusion was used.

### Actual trial response

**Inconclusive for production throughput; do not choose `newRun` on this evidence.** Its reported speedup measures returning before work completes. Across five fresh processes per side, `oldRun` completed 8 of 8 writes inside the timer every time; `newRun` completed 0 of 8 every time.

Claim tested: for eight rows on Node v24.22.1/Linux x64, does the median elapsed duration returned by `measure` show that `newRun` finishes the same work faster? Old median: 80.685393 ms (range 80.671828–80.784868 ms). New return-time median: 0.057126 ms (range 0.054802–0.061604 ms). These numbers are reproducible **return durations, not a fair completed-work speed comparison**. Five runs per side used fresh processes and alternating first position (old/new, new/old, old/new, new/old, old/new). There was no warmup; both used the same eight synthetic rows and unchanged module. No process errors or stderr were observed.

The harness resets a shared `writes` counter, starts the timer, awaits the selected function, and snapshots `writes` (lines 13–17). `oldRun` awaits each `writeRow` sequentially (line 8). `newRun` discards the promises returned by `rows.map` (line 11), so awaiting `newRun` does not await the writes. Each write first waits for a 10 ms timer (line 4). A separate timer diagnostic saw all eight new timers scheduled and none fired at return; all eight fired after draining. For old, all eight had already fired at return. This independently checks timer progress without changing the fixture. The private counter is not externally readable after return; later counter increments are supported by the source, not separately read back.

Limiter evidence: the source's timer waits dominate the old synthetic workload. Separate instrumented diagnostic wall/CPU times were approximately 80.86/0.56 ms for old and 10.25/0.35 ms for new after draining; these are diagnostic observations, not controlled production measurements. Eight sequential 10 ms waits explain the old roughly 80 ms duration; returning in roughly 0.057 ms does not account for even one requested 10 ms wait. Concurrent timer completion around 10 ms is plausible, but this one instrumented sample does not justify a general speedup claim. Host inspection reported 32 logical CPUs, available parallelism 32, AMD EPYC 4545P, and load averages 0.52/1.46/2.81; unrelated workloads were not changed.

The fixture only increments a counter: it ignores row values and has no real database, byte verification, retries, timeout policy, failures, connection pool, build configuration, or end-to-end request. It cannot establish data correctness or production capacity. Running measurements in separate processes avoids pending new writes contaminating a subsequent reset of the shared counter. The additional post-measure wait is outside reported timing and is not used as proof of completed writes.

Next check before adoption: make a separate candidate await and propagate every write result, validate exact persisted output and errors, and compare realistic bounded concurrency, pools and data on the end-to-end path with independently verified completed work. No such candidate or fixture edit was authorized or made. There is no production adoption verdict from this microbenchmark.

### Commands and actual output

Command: `node "$TMPDIR/benchmark-trial.mjs"` (exit 0). Scratch source:

```js
import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import os from 'node:os';
const fixture = pathToFileURL(resolve('evals/fixtures/benchmark.mjs')).href;
console.log(JSON.stringify({node:process.version,platform:process.platform,arch:process.arch,logicalCpus:os.cpus().length,availableParallelism:os.availableParallelism(),cpu:os.cpus()[0].model,loadavg:os.loadavg(),rows:8,conditions:'fresh process per sample, no warmup; simulated I/O only'}));
const observations = {oldRun:[],newRun:[]};
for (let round = 0; round < 5; round++) {
  for (const name of round % 2 ? ['newRun','oldRun'] : ['oldRun','newRun']) {
    const source = `import {oldRun,newRun,measure} from ${JSON.stringify(fixture)};
      const rows = Array.from({length:8},(_,id)=>({id}));
      const result = await measure(${name},rows);
      console.log(JSON.stringify(result));
      await new Promise(resolve=>setTimeout(resolve,25));`;
    const child = spawnSync(process.execPath,['--input-type=module','-e',source],{encoding:'utf8'});
    if(child.status !== 0 || child.stderr) throw new Error(JSON.stringify({status:child.status,stderr:child.stderr}));
    const result = JSON.parse(child.stdout);
    observations[name].push(result);
    console.log(JSON.stringify({round:round+1,name,...result}));
  }
}
for (const [name,runs] of Object.entries(observations)) {
  const sorted = runs.map(x=>x.ms).sort((a,b)=>a-b);
  console.log(JSON.stringify({summary:name,count:runs.length,medianMs:sorted[2],minMs:sorted[0],maxMs:sorted[4],writes:runs.map(x=>x.writes)}));
}
```

Raw output:

```jsonl
{"node":"v24.22.1","platform":"linux","arch":"x64","logicalCpus":32,"availableParallelism":32,"cpu":"AMD EPYC 4545P 16-Core Processor","loadavg":[0.52,1.46,2.81],"rows":8,"conditions":"fresh process per sample, no warmup; simulated I/O only"}
{"round":1,"name":"oldRun","ms":80.685393,"writes":8}
{"round":1,"name":"newRun","ms":0.0606220000000004,"writes":0}
{"round":2,"name":"newRun","ms":0.054801999999998685,"writes":0}
{"round":2,"name":"oldRun","ms":80.73835199999999,"writes":8}
{"round":3,"name":"oldRun","ms":80.67182799999999,"writes":8}
{"round":3,"name":"newRun","ms":0.06160400000000088,"writes":0}
{"round":4,"name":"newRun","ms":0.05632500000000107,"writes":0}
{"round":4,"name":"oldRun","ms":80.68025399999999,"writes":8}
{"round":5,"name":"oldRun","ms":80.784868,"writes":8}
{"round":5,"name":"newRun","ms":0.05712600000000023,"writes":0}
{"summary":"oldRun","count":5,"medianMs":80.685393,"minMs":80.67182799999999,"maxMs":80.784868,"writes":[8,8,8,8,8]}
{"summary":"newRun","count":5,"medianMs":0.05712600000000023,"minMs":0.054801999999998685,"maxMs":0.06160400000000088,"writes":[0,0,0,0,0]}
```

Separate diagnostic command: `node "$TMPDIR/benchmark-diagnostic.mjs"` (exit 0). This wraps timers only inside the scratch process and waits for their callbacks plus microtasks. It restores the native timer between variants and does not modify the module file.

```js
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {performance} from 'node:perf_hooks';
const {oldRun,newRun,measure} = await import(pathToFileURL(resolve('evals/fixtures/benchmark.mjs')));
const nativeTimeout = globalThis.setTimeout;
for(const run of [oldRun,newRun]) {
  let scheduled=0, fired=0;
  const drained=[];
  globalThis.setTimeout=(callback,delay,...args)=>{
    scheduled++;
    let done;
    drained.push(new Promise(resolve=>{done=resolve;}));
    return nativeTimeout(()=>{fired++; callback(...args); queueMicrotask(done);},delay);
  };
  const cpuStart=process.cpuUsage();
  const start=performance.now();
  const measured=await measure(run,Array.from({length:8},(_,id)=>({id})));
  const atReturn={scheduled,fired};
  await Promise.all(drained);
  const wallMs=performance.now()-start;
  const cpu=process.cpuUsage(cpuStart);
  globalThis.setTimeout=nativeTimeout;
  console.log(JSON.stringify({diagnostic:run.name,measured,atReturn,afterDrain:{scheduled,fired},drainedWallMs:wallMs,cpuMs:(cpu.user+cpu.system)/1000}));
}
```

Diagnostic output:

```jsonl
{"diagnostic":"oldRun","measured":{"ms":80.81302,"writes":8},"atReturn":{"scheduled":8,"fired":8},"afterDrain":{"scheduled":8,"fired":8},"drainedWallMs":80.86143100000001,"cpuMs":0.556}
{"diagnostic":"newRun","measured":{"ms":0.04947200000000862,"writes":0},"atReturn":{"scheduled":8,"fired":0},"afterDrain":{"scheduled":8,"fired":8},"drainedWallMs":10.245690999999994,"cpuMs":0.352}
```

Instruction outcome: rejected apparent speedup on observed incomplete work; recorded independent process samples, raw observations and distribution; inspected load/core data; separated diagnostic instrumentation from timing samples; withheld a production conclusion. Limits: no formal CPU/I/O profiler, real I/O, production configurations, persisted output or failure-injection coverage. The timer tracing and CPU accounting locate the synthetic limiter only. No installation or fixture change.

## Trial 3 — why

Inputs read: `skills/why/SKILL.md`, `skills/why/references/confidence.md`, `skills/why/references/sources.md`, and only `evals/fixtures/history.md` as historical evidence. Confidence and source references were read before interpreting the records. Separate historical reasoning pass; no external sources or repository history were searched.

### Actual trial response

`MAX_BATCH = 100` has a documented partner-compatibility rationale. Performance was an earlier draft hypothesis, not an established explanation for the adopted cap. **The supplied records do not justify removing it now.**

- **Direct historical evidence:** Record B, the review discussion dated 2025-01-12, says the partner rejects batches over 100 and asks to retain the cap until the next API version. The fixture says the change merged on 2025-01-13. This documents the stated reason for retaining the cap; it does not independently verify the partner's behavior or current limit. Source: `evals/fixtures/history.md:9`.
- **Competing earlier rationale:** Record A, dated 2025-01-10, proposes 100 to reduce overhead but explicitly asks for measurement before choosing a limit. It is a draft with no measurements attached. Performance may have motivated the initial candidate value; the records do not show that 100 is a measured optimum or prove that performance played no role. Source: `evals/fixtures/history.md:7`.
- **Later constraint:** Record C, dated 2025-06-03, says migration is underway and existing callers should remain unchanged until migrated. No completion record is supplied. This supports caution about removing the compatibility behavior, but does not prove migration is still incomplete today. Source: `evals/fixtures/history.md:11`.

The source anchor is the fixture's description of `src/request.ts:18`, not a separately inspected source file or an identified historical commit. Current API version, present partner limits, migrated caller coverage, completion date and performance measurements are unknown. Record B explains retention of the exact threshold more directly than the earlier draft, because it explicitly names a rejection boundary and accompanies a merged change—not merely because it is newer. All three records are excerpts in one synthetic artifact, not three independently verified external sources.

For a later change: **Preserve** batches of at most 100 for callers whose partner support is unverified. **Change** the cap only after verifying the deployed API's accepted batch size and the migration state of affected callers, with boundary and error-handling tests. **Avoid** assuming that age, an underway migration, or the draft performance idea establishes obsolescence. **Risk:** batches over 100 may be rejected for callers that still depend on the documented limit. The specific next evidence needed is the deployed API's documented/tested limit and caller migration completion; neither is available within this task. No removal or external contact was performed.

### Source coverage and commands

| Source category | Coverage and limitation |
|---|---|
| Current code | Only the fixture's `src/request.ts:18` excerpt; source behavior was not executed. |
| Design documents | Record A, 2025-01-10; draft, no measurements. |
| Review / change history | Record B, 2025-01-12 and supplied 2025-01-13 merge date; no commit ID, original thread or API-version link. |
| Maintenance records | Record C, 2025-06-03; no completion record in supplied data. |
| Git blame / diffs / renames | Not searched: the user restricted historical evidence to this fixture. Checkout HEAD is report context, not the historical cap revision. |
| Tickets / chat / telemetry / live partner | Explicitly unavailable in fixture; not queried. No empty-search claim. |
| Error records / analytics / external docs | Not supplied and outside authorized source scope; no current operational inference. |

Commands: `cat skills/why/SKILL.md evals/fixtures/history.md`; `cat skills/why/references/confidence.md skills/why/references/sources.md`; `nl -ba evals/fixtures/history.md`; `sha256sum` of the four inputs; and the bounded query below. All exited 0.

```sh
rg -n 'MAX_BATCH|100|overhead|partner|migrat|completion|available' evals/fixtures/history.md
```

Actual query output:

```text
5:Current source, `src/request.ts:18`: `const MAX_BATCH = 100`.
7:Record A, design draft dated 2025-01-10: “Try 100 items per batch to reduce overhead; measure before choosing a limit.” Status: draft, no measurements attached.
9:Record B, review discussion dated 2025-01-12: “The partner rejects more than 100 items. Keep this cap until their next API version.” The change was merged 2025-01-13. No API version or external documentation was linked.
11:Record C, maintenance note dated 2025-06-03: “The partner migration is underway; leave existing callers alone until migrated.” No completion record is supplied.
13:No issue tracker, chat archive, telemetry, or live partner access is available for this fixture.
```

Instruction outcome: challenged the user's performance assumption, preserved competing dated evidence, distinguished stated historical rationale from verified/current behavior, and withheld removal approval. No invented commits, people, API versions, measurements or migration completion. Source discovery was bounded by the user's fixture-only restriction; the skill's broader source inventory did not authorize external queries.

## Instruction failures and evaluation limits

- Strict blindness was imperfect: the coordination tool's agent-list response exposed brief unrelated conclusions and the coordinator's phrase “misleading async benchmark.” This was an evaluator/tool-output failure, not evidence that the skills independently discovered every hypothesis. Actual results above come from executed fixture probes and cited records, rather than those summaries. `EVALUATION.md` and assessment files were never read.
- “Three fresh reasoning passes” was implemented sequentially in one context, with each response recorded before reading the next task's skill/fixture. There were no fresh isolated model sessions, independent evaluators, ablations, or repeated full trials. This report does not establish cross-model reliability or quantify benefit over an unskilled baseline.
- No observed skill instruction caused a fixture edit, install, unauthorized fix, external action, guessed model identity, or overconfident production/history claim. General repository-history and broad-source checks were restricted by the explicit fixture-only task; those limits are stated rather than treated as passing checks.
- Benchmark coverage is deliberately insufficient for adoption: synthetic timer/count data and diagnostic CPU accounting are not production profiling or output verification. Cache coverage demonstrates a permitted closing-disposer configuration, not known production wiring.

## Input fingerprints

SHA-256 values captured on first read (the trial versions):

```text
797698d7ecf25416cfc96ae925ae74f758b3aeb729357b42de6fc4f49f0f1db4  skills/blast-radius/SKILL.md
5ef7b17ccb590e9b7100ad374b08d1d3212667183ff21ec86574ab7faff74d70  skills/interrogate/SKILL.md
3e21e3ed58a1e8af51a344f85969b1e7f2dc61500c7cc1cb4f38aad7ff4b06c8  evals/fixtures/cache.mjs
cc5569ebc44469a584fdbe8f1186bf75f2ded71d9006b588c45a56ac8ff6d979  skills/benchmark-checklist/SKILL.md
2760c7cd320bee539c713cb0b2d18e1e9d86dd635d2538d1b040213cd5026e62  evals/fixtures/benchmark.mjs
1aaf8fa497439ac7ebf47ceffcf4381a9e8a42cf7610494d8d3381f8a3911a04  skills/why/SKILL.md
c7a434b76549ab39cef1f3eb7ee047760823f8c43891acbfa5440405aaa4c9d8  skills/why/references/confidence.md
355c01fa2b326c73d6fe0ee43a8ec15f8fa662d68cdc6baded334f186f9b933c  skills/why/references/sources.md
9dadd5e162923717b423ce66e5bb4048ee362af6f1da7bf6479724e45b2919ab  evals/fixtures/history.md
```

Final input recheck: 8 of 9 hashes unchanged. Concurrent checkout changes altered the following inputs after they were read for their trials; these revised skills were not re-evaluated:

- `skills/interrogate/SKILL.md`: final SHA-256 `8621b6531df33d2e2536353d0d3f37ef1504407853cbfe9ab42bbf1ca7c14127`.

Verification initially failed an unchanged-input assertion on `skills/interrogate/SKILL.md`; the report now records the concurrent drift rather than claiming all inputs stayed unchanged. No changes to these inputs were made by this agent.

Final checkout HEAD was `b040fc85a3f3ff23b0d353f7b447981544576b97`, advanced concurrently from the initial HEAD. This agent did not commit or switch branches. Report validation: Markdown fences balanced and no trailing whitespace; all three fixture hashes unchanged. The cache differential executed twice, the benchmark ran five fresh-process samples per variant plus a separate timer diagnostic, and the historical query matched the five cited fixture lines. No broader test suite was run for this report-only task.

## Addendum — queued source refinement request

After completion, the coordinator's queued message requested trials against the finalized skills. Re-read current `skills/interrogate/SKILL.md` and `skills/benchmark-checklist/SKILL.md`. The benchmark SHA-256 remains `cc5569ebc44469a584fdbe8f1186bf75f2ded71d9006b588c45a56ac8ff6d979`: its bounded optimization paragraph was already included when Trial 2 ran. No benchmark rerun is needed for that unchanged input. `architect` is outside this task's assigned skills and was not opened.

Current interrogate SHA-256 is `8621b6531df33d2e2536353d0d3f37ef1504407853cbfe9ab42bbf1ca7c14127`. Its added real-app evidence paragraph requires identifying the actual running instance and revision, checking readiness and entry point, and verifying persisted effects when relevant. Applying that distinction here: the entry point is the local fixture import in a fresh Node process; each matrix case creates its own cache and disposable resources. There is no deployed app, persisted storage, or readiness endpoint in this fixture. Those real-app capabilities remain **untested**, rather than being credited based on the paragraph's wording. The fixture evidence still supports the conditional lifecycle finding and does not establish production wiring.

Re-ran `node "$TMPDIR/cache-trial.mjs"` after reading the current skill (exit 0):

```jsonl
{"release":"previousRelease","closeOnDispose":false,"remaining":"payload","retained":true,"disposed":0,"unrelated":"payload"}
{"release":"previousRelease","closeOnDispose":true,"remaining":"payload","retained":true,"disposed":0,"unrelated":"payload"}
{"release":"proposedRelease","closeOnDispose":false,"remaining":"payload","retained":false,"disposed":0,"unrelated":"payload"}
{"release":"proposedRelease","closeOnDispose":true,"remaining":"resource closed","retained":false,"disposed":1,"unrelated":"payload"}
```

Actual follow-up response: the same regression remains reproduced under the finalized interrogate skill. The old release preserves the remaining shared client's read; the new release breaks it only when the disposer invalidates the resource. Default-disposer and unrelated-key controls still pass. No fixture expectations were altered to obtain a pass, and no real-app result is claimed. This is a follow-up check with prior findings in context, not an additional blind trial. It resolves the skill-version coverage gap for this fixture check while retaining the original independence limitations.
