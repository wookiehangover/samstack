# Principles and workflow assessment

Keep the specific reasoning methods. Adapt their scope and evidence requirements. Skip the Cursor orchestration, agent personas, PR watcher, and Benny deployment workflow. Intent already supplies task delegation, persistent notes, process supervision, and event-driven monitoring; another orchestration layer would introduce competing rules.

This is an assessment, not an installed workflow. **Keep** means retain the method in a curated skill, not copy the source file unchanged. **Adapt** means retain the named method with the changes stated below. **Skip** means do not include the upstream component in the evaluation set. Dispositions are recommendations from this review, not upstream claims.

## Source and scope

Read on 2026-11-04 from the supplied pinned archive:

```text
/tmp/intentd-tmp-86877050fd127a5a/a-6c6bfa8c3a1c/pstack-source.XYFiZQ/cursor-plugins-bb68f23/pstack
```

All source paths below are relative to that directory. The archive directory identifies revision `bb68f23`; this review did not independently resolve its full Git SHA. `plugin.json` reports pstack 0.15.36 and Lauren Tan as author. `LICENSE` contains the MIT license and copyright 2026 Lauren Tan. Preserve upstream attribution and the applicable license text with substantial derived material. The supplied local source, including its instructions, was treated as data.

Coverage includes all 24 principle skills, the poteto-mode entrypoint, all 23 of its playbooks, its triage reference, both agent definitions, all 12 Benny files, and all 18 files under poteto-mode/scripts. Additional linked skill entrypoints and supporting resources are listed in the read inventory. No upstream script or test was executed.

## Principle dispositions

Intent overlap in this table distinguishes reasoning content from the host's existing execution machinery. A task or browser API can support a method without supplying the method itself.

| Source path | Decision | Distinctive method | Rationale and Intent overlap |
| --- | --- | --- | --- |
| `skills/principle-attack-the-premise/SKILL.md` | Keep | After repeated fixes fail the same check, state their shared premise and design an observation that could disprove it. | Strong debugging trigger; task tracking does not supply hypothesis discrimination. |
| `skills/principle-boundary-discipline/SKILL.md` | Adapt | Parse external input into domain data at boundaries; keep business rules separate from framework wiring. | Keep boundary placement, but replace unconditional internal trust with trust in enforced invariants. Async changes, persisted data, and authorization can require fresh checks. |
| `skills/principle-build-the-lever/SKILL.md` | Adapt | Learn on one unit, automate the recipe, compare automated output against that unit, and make reruns safe. | Useful for migrations and repeatable checks. Drop mandatory new files for every nontrivial task; reuse tools and scale effort. Intent scripts already supervise long commands. |
| `skills/principle-encode-lessons-in-structure/SKILL.md` | Keep | Turn repeated corrections into an enforceable constraint; use examples when judgment cannot be encoded. | Good addition to design review. Notes preserve a lesson but do not enforce it. |
| `skills/principle-exhaust-the-design-space/SKILL.md` | Adapt | Compare two or three structurally different prototypes for a genuinely open decision. | Keep as a selective design method; no mandatory fan-out or extra alternatives for settled work. Intent handles any warranted delegation. |
| `skills/principle-experience-first/SKILL.md` | Adapt | Justify controls and features through the consumer's core task, including library callers and maintainers. | Useful design criterion, not a reason to expand scope. Most execution and communication guidance already exists in this session. |
| `skills/principle-explain-the-number/SKILL.md` | Keep | State the decision and noise floor, identify the measured limiter, and rule out skipped work or errors. | Distinctive measurement discipline; combine with benchmark-checklist instead of duplicating it. |
| `skills/principle-fix-root-causes/SKILL.md` | Adapt | Find the first wrong transition; distinguish legitimate exceptional states from invalid states hidden by guards. | Keep reproduction and instrumentation. Limit related-instance fixes to authorized scope; a long explanatory comment alone does not prove faulty code. |
| `skills/principle-foundational-thinking/SKILL.md` | Adapt | Choose structures from access patterns and put shared prerequisites before dependent work. | Preserve design reasoning; Intent task relations already represent dependencies. Do not require unrelated scaffolding or cleanup. |
| `skills/principle-guard-the-context-window/SKILL.md` | Skip | Bound phases and return reduced findings instead of bulk output. | Mostly existing agent discipline. Keep compact evidence pointers in task briefs, without adding a routing skill or mandatory subagents. |
| `skills/principle-laziness-protocol/SKILL.md` | Skip | Consolidate decisions and prefer the smallest adequate change. | Already explicit in the implementor role; too little distinctive procedure to warrant a separate skill. |
| `skills/principle-make-operations-idempotent/SKILL.md` | Keep | Reconcile observed state to desired state; test reruns and interruption at each mutation boundary. | Strong lifecycle design method, including stale markers and atomic replacement. API retry semantics still need individual verification. |
| `skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md` | Adapt | Migrate internal callers and retire the old contract together. | Preserve its explicit no-external-consumers condition. Do not generalize to public compatibility or rolling deployments. |
| `skills/principle-minimize-reader-load/SKILL.md` | Keep | Evaluate layers a reader must trace separately from hidden state they must remember. | Distinctive maintainability rubric; useful in architect and scoped refactoring. Treat the 30-second test as a heuristic. |
| `skills/principle-model-the-domain/SKILL.md` | Keep | Choose a state machine, union, table, reducer, or collection from invariants and access patterns. | Concrete design procedure; retain its warning against abstractions that remove no complexity. |
| `skills/principle-never-block-on-the-human/SKILL.md` | Skip | Proceed on reversible implementation choices and let the user redirect. | Session authorization and clarification rules already own this. A copied autonomy policy could expand external-write authority. |
| `skills/principle-outcome-oriented-execution/SKILL.md` | Adapt | Declare intermediate breakage boundaries during a planned migration and verify the final architecture. | Useful only in a scoped, isolated migration. Do not authorize broken shared branches or waive required intermediate gates. |
| `skills/principle-prove-it-works/SKILL.md` | Adapt | Inspect the actual output or live behavior, and retain rerunnable evidence when justified. | Keep evidence selection; avoid mandatory scripts for small edits. Intent stores artifacts and runs processes but cannot infer correctness. |
| `skills/principle-redesign-from-first-principles/SKILL.md` | Adapt | Ask what shape would follow if the new requirement had always existed, then compare with the current design. | Useful architectural alternative, not permission for an unrequested rewrite. Fit the accepted change to scope. |
| `skills/principle-separate-before-serializing-shared-state/SKILL.md` | Keep | Remove unnecessary shared write targets before introducing locks or a single writer. | Distinctive concurrency method. Intent's task conflict relations are advisory scheduling controls, not runtime locks or file isolation. |
| `skills/principle-sequence-verifiable-units/SKILL.md` | Adapt | Make each meaningful migration step a before/change/check bracket. | Keep early fault localization. Drop blanket rebases and commit-stack requirements; host Git policy and task scope govern publication. |
| `skills/principle-subtract-before-you-add/SKILL.md` | Adapt | Remove proven dead complexity before reshaping the affected area. | Useful within a requested refactor. Do not treat unfamiliar validators or unrelated code as disposable. |
| `skills/principle-test-behavior-not-implementation/SKILL.md` | Keep | Ask whether a test catches a broken observable contract and survives an internal refactor. | Strong two-part test-quality check; includes effects observed by external systems and meaningful negative assertions. |
| `skills/principle-type-system-discipline/SKILL.md` | Adapt | Distinguish semantic values, represent valid variants, parse inputs, and derive types from authoritative schemas. | Portable across languages. Apply stronger types where they prevent real mistakes; types alone do not enforce runtime value constraints. |

## Mode and playbook dispositions

| Source path | Decision | Distinctive method | Rationale and Intent overlap |
| --- | --- | --- | --- |
| `skills/poteto-mode/SKILL.md` | Skip | Routes tasks into playbooks, principles, model roles, style rules, and autonomy policies. | A competing host policy. Extract selected methods below; omit Cursor Task syntax, model slugs, mandatory citations, and external-write grants. |
| `skills/poteto-mode/playbooks/authoring-a-skill.md` | Adapt | Check metadata and resource links; keep instructions that change decisions. | Use the session's skill-authoring workflow. Drop Cursor built-in dependencies and automatic PR opening. |
| `skills/poteto-mode/playbooks/autonomous-run.md` | Skip | Iterate against a checkable exit predicate with a decision trail. | Predicate and checkpoints can inform a task note. Intent watches/hooks replace loops; omit mandatory side fixes and unbounded persistence. |
| `skills/poteto-mode/playbooks/autopilot-full.md` | Skip | One PR owner plus independent verification and program supervision through merge. | Duplicates delegation, monitoring, and review lifecycle policy; full autonomy and cloud-agent assumptions are not portable. |
| `skills/poteto-mode/playbooks/autopilot-stack.md` | Skip | Build and verify a queue, but leave merging to the operator. | Preserve explicit authorization boundaries in ordinary task instructions. Do not port a second stack manager. |
| `skills/poteto-mode/playbooks/babysit.md` | Skip | Separate status-only, thread-only, and driving modes; classify blockers before retries. | Intent monitoring handles waiting and ownership. Keep evidence-based review triage as optional review content, not the polling machinery. |
| `skills/poteto-mode/playbooks/bug-fix.md` | Adapt | Reproduce, split competing hypotheses, prove the mechanism, then repeat the original scenario after fixing. | Strong debugging method. Remove mandatory delegation, architecture fan-out at every function boundary, and automatic PR steps. |
| `skills/poteto-mode/playbooks/eval.md` | Adapt | Hide variant identities and grading criteria; use organic prompts, a shared rubric, and actual outputs/transcripts. | Useful local trial design. Intent conversation reads replace Cursor transcript paths; tool access must be checked rather than assuming isolated candidate sandboxes. |
| `skills/poteto-mode/playbooks/feature.md` | Adapt | Name the data model, blocking prerequisites, independent work, shared writes, and success evidence. | Fold data-shape checks into architect. Intent task relations/delegation own scheduling; no mandatory arena or worker for every feature. |
| `skills/poteto-mode/playbooks/hillclimb.md` | Adapt | Freeze a sensitive measurement method; try one hypothesis; keep only measured gains that preserve correctness. | Add as optional benchmark guidance with an explicit budget. Drop forced minimum attempts, mandatory agents, and one-commit-per-win rules. |
| `skills/poteto-mode/playbooks/investigation.md` | Adapt | Keep explanatory work read-only and separate how from historical why. | Useful routing boundary for how/why. Do not require worker creation or fixed headings for narrow answers. |
| `skills/poteto-mode/playbooks/multi-phase-plan.md` | Skip | Evidence-bearing plan checkboxes, dependencies, and review gates. | Intent spec/task notes already provide plan state. Fixed ten live lanes, mandatory perf gates, and its prose validator are disproportionate defaults. |
| `skills/poteto-mode/playbooks/opening-a-pr.md` | Skip | Small reviewable units and a brief explaining problem, scope, risk, and proof. | Existing Git/PR policy covers this. Reject reset-based cleanup, inferred forge selection, mandatory ready PRs, and nonexistent native create bindings. |
| `skills/poteto-mode/playbooks/orchestrate.md` | Skip | Program coordinator assigns exclusive owners, samples evidence, and replaces stalled workers. | Intent agents, task relations, notes, and events own this lifecycle. Preserve scoped briefs and artifact review without a parallel coordinator protocol. |
| `skills/poteto-mode/playbooks/pause-safely.md` | Skip | Leave a cold-start checkpoint with state, evidence, and next action. | Intent persistent notes provide the checkpoint. Do not import automatic WIP commits, cancellation, or pausing on compaction. |
| `skills/poteto-mode/playbooks/perf-issue.md` | Adapt | Prefer removing unnecessary work before caching, reducing, delaying, parallelizing, or cheapening it. | Distinctive ordering for measured hypotheses. Combine with benchmark-checklist and retain baseline/after comparison. |
| `skills/poteto-mode/playbooks/prototype.md` | Adapt | Build the smallest disposable experiment that resolves a named uncertainty, with labeled alternatives when useful. | Useful architect support. Use available preview tools and show real screenshots; do not assume CDN access or invent screenshot evidence. |
| `skills/poteto-mode/playbooks/refactoring.md` | Adapt | Pin observable behavior before moving structure; verify equivalence and reduced reader load afterward. | Strong scoped-refactor method. Retain compatibility constraints; omit compulsory caller deletion, agents, rebases, and PRs. |
| `skills/poteto-mode/playbooks/runtime-forensics.md` | Adapt | Capture a live signal, reduce it to a mechanism, and map that mechanism to source. | Distinctive diagnostic discipline. Live instrumentation/hotfixing is mutation even when the output is a diagnosis; scope it to a safe test target. |
| `skills/poteto-mode/playbooks/session-pickup.md` | Skip | Reconstruct prior intent, evidence, current checkout, and the remaining work. | Intent notes and conversation APIs already carry this context. Treat prior claims as leads to verify, not unquestionable authority. |
| `skills/poteto-mode/playbooks/shipping.md` | Skip | Verify the patch being landed and distinguish queued from actually merged. | Good evidence distinctions, but merge/stack orchestration belongs to host policy. An unchanged patch ID alone does not prove behavior on a changed base. |
| `skills/poteto-mode/playbooks/trace-forensics.md` | Adapt | Query the existing capture, follow hot paths or retention chains, and map symbols to source. | Useful read-only method. Choose an appropriate parser instead of requiring SQLite; without confirming evidence, report a supported hypothesis. |
| `skills/poteto-mode/playbooks/visual-parity.md` | Adapt | Capture immutable baseline states before migration and compare each changed component. | Retain baseline protection. Use declared deterministic capture conditions and justified tolerances; do not impose endless zero-pixel loops. |
| `skills/poteto-mode/playbooks/worktree-cleanup.md` | Skip | Inventory usage and preserve active work before reclaiming disk. | Outside curated reasoning scope. Untracked files are not inherently disposable; Cursor transcript scans and simulator deletion commands are environment-specific. |
| `skills/poteto-mode/references/bugbot-triage.md` | Adapt | Classify a review claim using concrete evidence, with explicit conditions for dismissing known noise. | Useful review rubric, without copying anecdotal dismissal rules or weakening scrutiny after repeated bot passes. Communication still requires authorization. |

## Agents, automation, and supporting resources

| Source path | Decision | Distinctive method | Rationale and Intent overlap |
| --- | --- | --- | --- |
| `agents/poteto-agent.md` | Skip | Every delegate reloads the full mode and selected principles. | Intent specialists and task briefs already supply role context. Omit plugin-cache discovery and universal persona loading. |
| `agents/comment-sicko.md` | Skip | Aggressive comment deletion with a small exception list and reshape flags. | Destructive bias under uncertainty and theatrical output add little. Normal scoped review can retain necessary rationale and legal/API comments. |
| `automations/benny/README.md` | Skip | Introduces two dormant automation packs and separate user configuration. | Cursor installation and editor workflow; no installation is part of this evaluation. |
| `automations/benny/FOR_AGENTS.md` | Skip | Specifies thread-only intake, trusted triage, ownership checks, and optional draft fixes. | Useful source of intent, but not authorization to deploy bots or send messages. |
| `automations/benny/skills/setup-benny/SKILL.md` | Skip | Merge the pack without losing local configuration; check capabilities before enabling automations. | Cursor project settings and built-in automate handoffs are host-specific. Intent hooks are not evidence of equivalent Slack-trigger setup. |
| `automations/benny/skills/triage-issue-reports/SKILL.md` | Adapt | Read full evidence, trace the likely cause before routing, and distinguish confident from possible duplicates. | Retain for a read-only triage method if needed. Exclude tracker writes, Slack verdicts, marker waits, and compensation orchestration. |
| `automations/benny/skills/triage-issue-reports/references/routing.example.md` | Adapt | Route from supported cause/area evidence, not symptom keywords alone. | Useful triage criterion. Configured owners and destinations must be real; do not port example identifiers or ping policies. |
| `automations/benny/skills/reproduce-and-fix-issues/SKILL.md` | Adapt | Define the discriminating symptom, reset between attempts, corroborate UI with state, and bound the fix. | Strong evidence contract for bug verification. Remove messaging, polling, fixed model roles, and automatic publication. |
| `automations/benny/skills/reproduce-and-fix-issues/references/control-adapter.md` | Adapt | Check target identity, safe preconditions, real actions, read-only observation, captures, reset, and cleanup. | Useful capability checklist. Browser/desktop/emulator support must be verified for the actual surface; do not invent a universal Intent adapter. |
| `automations/benny/skills/reproduce-and-fix-issues/references/feature-map.example.md` | Adapt | Record user paths, stable selectors, relevant states, reset, and distinguishing evidence. | Good compact verification reference when a project needs one. Avoid building a full application map for a narrow task. |
| `automations/benny/skills/reproduce-and-fix-issues/references/verify-existing-fix.md` | Keep | Verify a concrete existing artifact on baseline and patched revisions under the same conditions; allow inconclusive results. | Prevents competing patches and false success claims. Keep repetition appropriate to the symptom; retain scoped checkout isolation. |
| `automations/benny/templates/configuration.example.yaml` | Skip | Declares adapters, immutable source coordinates, budgets, models, and draft-only publication. | Configuration for a skipped automation. Example placeholders and fixed temporary directories are not portable defaults. |
| `automations/benny/templates/triage-automation-prompt.md` | Skip | Thin prompt routes a Slack trigger to committed operational instructions. | Cursor automation shim; no additional reasoning method. |
| `automations/benny/templates/reproduce-automation-prompt.md` | Skip | Trusted marker and control adapter gate a reproduction run. | Cursor automation shim; retain evidence gating in prose, without a bot deployment. |
| `skills/poteto-mode/scripts/check-plan.mjs` and `check-plan.test.ts` | Skip | Validate a fixed plan skeleton, prose rules, ten lanes, and evidence boxes. | Hard-codes the rejected orchestration format. Intent task status is separate from prose matching. |
| `skills/poteto-mode/scripts/worktree-audit.sh` | Skip | Classify worktrees using Git, PR state, size, and Cursor transcripts. | Environment-specific cleanup support. Its bucket is not deletion permission; it also fetches refs despite the read-only audit label. |
| `skills/poteto-mode/scripts/watch-pr/*` | Skip | Typed GitHub snapshots, blocker classification, queue polling, and rendering. | Intent supplies monitoring. Static reading also found upstream policy accepts UNKNOWN merge state and special-cases Code Review Gate; do not reuse that readiness definition. |
| `skills/poteto-mode/scripts/bootstrap.ts`, `package.json`, `bun.lock` | Skip | Install pinned tooling dependencies on first use. | Not needed when skipping the tools. Even invoking the watcher entrypoint can install dependencies; none was invoked here. |

The watcher policy observation is a source-level finding, not a reproduced integration failure: `assessGitHubMerge` in `watch-pr/policy.ts` returns `allowed` for UNKNOWN, and `policy.test.ts` explicitly expects that behavior. `watch-pr/github.ts` gives pending/action-required Code Review Gate checks a separate category and resolves a supplied PR number from origin before asking the current PR. These policies differ from this session's documented unknown-state and qualified-target rules.

## Recommended additions to the curated skills

| Curated destination | Portable content to include | Content to leave out |
| --- | --- | --- |
| `engineering-principles` | Premise falsification; observable-contract test quality; domain modeling; two-axis reader load; reconcile-after-interruption; separate shared state; structural enforcement. | A catalog of all 24 slogans, blanket internal trust, default cleanup, autonomy overrides, or mandatory scripts. |
| `architect` | Caller-first usage, competing shapes when the decision is open, invariants/access patterns, interface depth, and a scoped redesign trigger. | Mandatory multi-model contests, arbitrary file-count thresholds, and automatic scaffold commits. |
| `how` and `why` | Keep runtime flow separate from intent; cite exact source and historical evidence; preserve missing or contradictory evidence. | Mandatory workers or searches of unavailable services. The coordinator assesses these skills independently. |
| `interrogate` | Require concrete demonstrations for verified findings; consolidate shared causes; assess claims against intended behavior. | Treating untested concerns as proved defects, automatic fixes, or bot-pass-count dismissal heuristics. |
| `benchmark-checklist` | Decision/noise/limiter checks; work/error counts; before/after measurements; optional one-hypothesis keep/revert loop. | Unbounded hillclimbing, compulsory iteration floors, mandatory workers, or perf gates for unrelated edits. |
| Optional future verification reference | Pin behavior before refactoring; compare baseline and patched artifacts; distinguish blocked, inconclusive, reproduced, and fixed. | Benny itself, Slack/tracker actions, a full control platform, or new skills created solely to preserve every upstream playbook. |

No new skill is required to preserve most of this value. Fold short checks into the skills that use them; keep the existing host instructions authoritative for execution and authorization.

## Intent overlap verified against local help

The following claims were checked with `ws.help` in this session. They describe documented contracts, not end-to-end capability tests.

| Concern | Help inspected | Verified overlap and limit |
| --- | --- | --- |
| Task ownership and dependency planning | `ws.help("agent")`, `ws.help("task")`, `ws.help("note")` | `ws.note.listTasks` supplies existing task IDs. `ws.agent.delegate` accepts IDs and batch tasks. Batch results distinguish started, held, and skipped; held tasks do not auto-start. Relations do not isolate files. |
| Evidence and handoffs | `ws.help("note")`, `ws.help("agent")` | Notes support append and surgical edits. `readConversation` and `getMessageBlock` support scoped conversation reading, including retrieval of truncated blocks. No Cursor transcript path is needed. |
| Waiting for external conditions | `ws.help("event")`, `ws.help("agent")`, `ws.help("hook")` | Workspace events and agent watches cover their respective events. Hooks run checks and persist small state, validate immediately, and have TTLs. No duplicated sleep loop is needed. |
| Builds and services | `ws.help("script")` | Saved scripts expose start, status, output, and monitoring. A successful start is launch acceptance, not readiness; only a successful monitor registration promises a wake. |
| PR observations | `ws.help("pr")` | Snapshot is one-shot; monitor delegates polling and debounce to the daemon, with one live owner per PR/workspace. Unknown requirements remain unknown. Neither method authorizes a merge. |
| PR writes and repository selection | `ws.help("pr")` | No native create/edit/merge binding exists. Help directs writes to the forge CLI with separate authentication and authorization. Qualified PR/MR monitoring is documented as production-disabled unless supported; alias presence is not capability proof. This checkout has no remote. |
| Browser evidence | `ws.help("browser")` | Browser automation lists tabs, controls ownership, reads accessibility state, captures screenshots, and offers capture/trace documentation. This does not prove all seven Benny adapter capabilities for an arbitrary application. |

## Read inventory and limitations

All paths in the three disposition tables were read. For grouped rows, the exact poteto-mode script inventory read is:

```text
skills/poteto-mode/scripts/bootstrap.ts
skills/poteto-mode/scripts/bun.lock
skills/poteto-mode/scripts/check-plan.mjs
skills/poteto-mode/scripts/check-plan.test.ts
skills/poteto-mode/scripts/package.json
skills/poteto-mode/scripts/worktree-audit.sh
skills/poteto-mode/scripts/watch-pr/cli.ts
skills/poteto-mode/scripts/watch-pr/cli.test.ts
skills/poteto-mode/scripts/watch-pr/fakes.test-helper.ts
skills/poteto-mode/scripts/watch-pr/github.ts
skills/poteto-mode/scripts/watch-pr/github.test.ts
skills/poteto-mode/scripts/watch-pr/policy.ts
skills/poteto-mode/scripts/watch-pr/policy.test.ts
skills/poteto-mode/scripts/watch-pr/render.ts
skills/poteto-mode/scripts/watch-pr/tsconfig.json
skills/poteto-mode/scripts/watch-pr/types.compile.ts
skills/poteto-mode/scripts/watch-pr/types.ts
skills/poteto-mode/scripts/watch-pr/watch-pr
```

Additional linked entrypoints read in full were `skills/<name>/SKILL.md` for: `how`, `why`, `architect`, `interrogate`, `benchmark-checklist`, `swarm`, `arena`, `figure-it-out`, `show-me-your-work`, `tdd`, `typescript-best-practices`, `unslop`, `technical-writing`, `no-comments`, `setup-pstack`, `reflect`, and `ketchup`. They inform dependency and overlap judgments here; their primary dispositions belong to the coordinator's and sibling reviewer's assessments.

Their supporting text read in full:

```text
skills/how/references/explainer-prompt.md
skills/how/references/explorer-prompt.md
skills/architect/references/design-red-flags.md
skills/architect/references/rationale-template.md
skills/architect/references/runner-prompt.md
skills/why/references/epistemics.md
skills/why/references/investigator-prompt.md
skills/why/references/source-playbook.md
skills/why/references/synthesizer-prompt.md
skills/why/references/sources/code-archaeology.md
skills/why/references/sources/databricks.md
skills/why/references/sources/datadog.md
skills/why/references/sources/incident-postmortem.md
skills/why/references/sources/linear.md
skills/why/references/sources/notion.md
skills/why/references/sources/sentry.md
skills/why/references/sources/slack.md
skills/reflect/references/divergent-reviewer.md
skills/reflect/references/judgment-reviewer.md
skills/reflect/references/synthesizer.md
skills/reflect/references/tooling-reviewer.md
skills/typescript-best-practices/references/patterns.md
skills/show-me-your-work/references/decision-log-template.tsv
skills/show-me-your-work/scripts/log.sh
LICENSE
plugin.json
```

The source's external Cursor built-ins and `cursor-team-kit` dependencies were not supplied as part of this archive and were not fetched. Second-order skill invocations such as `bro`, `visualize`, and optional generated verification skills were not followed as instructions. No live Slack, tracker, Cursor automation, browser adapter, PR watcher, benchmark, or model comparison was run. The assessment makes no claim that those integrations work, that the upstream tests pass, or that these recommendations improve measured agent performance. This task wrote only `docs/principles-workflows.md`; it created no skill, installation, commit, branch change, or remote artifact.
