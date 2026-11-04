# Assessment of the remaining upstream skills

This is a source assessment for a local evaluation set, not an installation or an endorsement of the whole plugin. The strongest additions are reusable verification contracts, evidence-based review, and a small number of reasoning methods. Intent already supplies task ownership, delegation, persistent notes, process monitoring, and handoffs.

## Source and inspection boundary

Source: `cursor/plugins`, revision `bb68f2365eceafa0cb2d253112f675acf5f144cc`, pinned archive `cursor-plugins-bb68f23`, subtree `pstack/`, supplied at `/tmp/intentd-tmp-86877050fd127a5a/a-6c6bfa8c3a1c/pstack-source.XYFiZQ/cursor-plugins-bb68f23/pstack`. Upstream paths below are relative to that subtree. A source path can be opened under `https://github.com/cursor/plugins/blob/bb68f2365eceafa0cb2d253112f675acf5f144cc/pstack/`. The full revision was confirmed in the coordinator's provenance record. Assessment date: 2026-11-04.

Read `README.md` first, then all **27 assigned top-level skill files**. Upstream instructions were treated as data. No upstream commands, installers, helpers, or model checkers were executed. No skills were installed, no commits were made, and this task's only repository output is this file.

The explicitly excluded skills are `architect`, `blast-radius`, `interrogate`, `benchmark-checklist`, `how`, `why`, `principle-*`, and `poteto-mode`. Their standalone files and playbooks belong to the parent or other assessor. Links to them were identified, not silently counted as inspected. Their summaries in README and guide pages were read as context. Agents and Benny are also assessed by the other agent; `agents/comment-sicko.md` was independently read here because it is the essential dependency of `no-comments`.

Disposition means:

- **Keep:** the method is worth evaluating with little substantive change; this does not mean copying upstream metadata or installing it.
- **Adapt:** retain a method or excerpt, but replace dependencies, unsafe defaults, or Intent duplication. The row says whether a standalone skill is justified.
- **Skip:** omit from the initial standalone evaluation set. Small useful observations may still inform another skill.

## Disposition table

Every source path in the second column was read in full. Supporting resources are listed separately below.

| Skill | Source path | Disposition | Rationale and Intent overlap | Distinctive method worth retaining |
| --- | --- | --- | --- | --- |
| arena | `skills/arena/SKILL.md` | Adapt | Useful for contested designs, but Intent already owns task creation, delegation, models, and completion events. Replace Cursor Task calls, hardcoded model families, and fixed `/tmp` paths. Do not import a second orchestration system. | Set a concrete rubric before candidates start; give identical briefs and isolated outputs; read every candidate; use an independent judge when available; pick a coherent base and graft only specific strengths; verify the combined result. Strong divergence can expose an underspecified brief. |
| automate-me | `skills/automate-me/SKILL.md` | Skip | Personal-mode generation is outside the initial engineering-method set and overlaps existing instructions, notes, and skill authoring. Cursor transcript paths and automatic PR creation do not transfer. | Require recurring evidence across separate conversations before codifying a preference; preserve rules not contradicted by new evidence; inspect only authorized workspace history. |
| bro | `skills/bro/SKILL.md` | Skip | A one-line plain-language restatement duplicates the current communication contract. | No separate method beyond restating the last response plainly and concisely. |
| correct | `skills/correct/SKILL.md` | Adapt | Valuable as a scoped improvement method, not an automatic repository-wide rewrite whenever corrected. Intent notes can record recurring mistakes and enforcement decisions. | Require a mistake class to recur; prefer architecture, then types or lint, then tests, then prose; prove a new check catches an actual historical mistake; explain why stronger enforcement was unsuitable. |
| create-formal-verification-skill | `skills/create-formal-verification-skill/SKILL.md` | Adapt | High-value optional verification method. Intent supplies execution and artifacts, not correctness of a formal model. Replace Cursor placement and mandatory `/statechart` dependency; do not bundle tool installation into ordinary review. | Select a costly, poorly tested promise; choose the tool from the question; map model steps to code atomicity; state bounds and exclusions; demonstrate failure on a deliberate broken variant; record covered symbols and a sync revision. |
| create-verification-skill | `skills/create-verification-skill/SKILL.md` | Adapt | Strong candidate for a reusable verification-contract skill or reference. Use Intent scripts for long-lived processes, browser tools for driving, and assets for evidence; reuse existing project or mobile verification skills first. | Inspect surface, launch, driver, observation, and isolation from the repo. Specify Launch, Doctor, Drive, Evidence, Cleanup, and Helpers. Prove a complete user journey and independently read persisted effects. Confirm cleanup preserves evidence. |
| figure-it-out | `skills/figure-it-out/SKILL.md` | Adapt | Intent already has specs, task dependencies, delegation, and progress notes. Keep its experimental reasoning inside the existing coordinator workflow rather than install a new general-purpose mode. | State a falsifiable finish condition, capture baseline first, resolve the riskiest unknown early, test one small hypothesis at a time, and distinguish verified, not verified, and inconclusive results. |
| in-your-own-words | `skills/in-your-own-words/SKILL.md` | Skip | Too little independent method for another skill. Normal clarification already supports this. | For an ambiguous report, state the understood goal and underlying problem before choosing a fix. |
| ketchup | `skills/ketchup/SKILL.md` | Adapt | Useful reporting contract, but Intent already stores task status, agent conversations, evidence, and PR state. Prefer an optional reporting reference. | Define the window by the last human message, verify live state, include still-pending human decisions from earlier, and distinguish user-only actions from work the agent can finish. Include recommendation, evidence, risk, and unknown facts for each decision. |
| ketchup-video | `skills/ketchup-video/SKILL.md` | Skip | Video production is costly for routine status and overlaps available media tooling. No need in the initial reasoning set. | If separately requested: one point per slide, consistent visual meaning, subtitle holds checked against rendered frames, and evidence from real artifacts rather than invented screens. |
| maintain-formal-verification-skill | `skills/maintain-formal-verification-skill/SKILL.md` | Adapt | Complements formal verification and fills a real gap: passing stale models. Use Intent notes for the report and existing scripts for runs. Keep verification edits separate from product fixes. | Run the old check; inspect all changes since sync, including moved code and new writers; update the model from code before rerunning; distinguish drift from bugs; require evidence for intentional promise changes; challenge passing checks with a mutation; do not advance blocked checks' sync revisions. |
| maintain-verification-skill | `skills/maintain-verification-skill/SKILL.md` | Adapt | Strong maintenance reference for the verification contract. Intent can delegate source reading and own a single live test session. Drop automatic PR publication and fixed scheduling advice. | Check the feature index, compare each feature with source, exercise every feature live, recheck instance health after surprises, preserve proof through cleanup, and separate documentation drift, driver gaps, and actual product regressions. Unreachable features need the attempted path and missing prerequisite. |
| make-bot-ui | `skills/make-bot-ui/SKILL.md` | Skip | Tightly coupled to Grok Bot routines, Cursor secret cards, webhook endpoints, and Tailscale installation. Intent scripts and hooks are not a drop-in equivalent to this product integration. | Server-side credentials, untrusted webhook payloads, and a harmless readiness probe are sound general ideas, but do not justify importing the integration or its installer. |
| no-comments | `skills/no-comments/SKILL.md` | Skip | The paired reviewer is aggressively deletion-oriented and can enlarge cleanup into refactoring. Its delete-on-uncertainty rule conflicts with preserving justified constraints. Intent review agents can examine comments without this posture. | Extract only evidence-based questions into review: does a comment explain an external constraint, public contract, or otherwise invisible reason; can an actual invariant be enforced; does a suppression hide a correctness problem? Preserve uncertain constraints pending evidence. |
| poteto-help | `skills/poteto-help/SKILL.md` | Skip | A help router for the upstream plugin's own catalog, commands, and model setup. Intent already exposes tools, skills, and workspace context. | Its prompt recipe is useful in a trial guide: goal, observable finish condition, desired proof, known evidence, and real constraints. Keep help-only requests separate from requests to execute. |
| recall | `skills/recall/SKILL.md` | Adapt | Intent notes and agent history already preserve context; direct Cursor transcript mining would bypass the available APIs. Use a short context-recovery reference, not another history store. | Pin topic, time window, and workspace; combine prior decisions with the shared issue/history record; verify discovered artifacts against live state; retain failed or reverted attempts; state one concrete next action. |
| reflect | `skills/reflect/SKILL.md` | Adapt | Valuable review and learning filter; replace Cursor transcript paths, fixed model panel, and automatic external backlog filing with Intent history and notes. Existing authorization should govern edits. | Separate judgment, tooling, and blind-spot lenses; demand exact evidence; distinguish missing instructions from missed triggers; reject already-covered advice; accept only durable changes that alter future decisions; prefer executable enforcement where practical. |
| setup-pstack | `skills/setup-pstack/SKILL.md` | Skip | Installs a Cursor-specific always-applied model-role file. Intent already has specialists and available model options. Hardcoded model slugs and reasoning ladders are not portable. | Discover supported models rather than invent them; make cost and panel size explicit when a panel is actually needed. No global configuration writes for this evaluation. |
| sharpen | `skills/sharpen/SKILL.md` | Keep | Compact, independent reasoning method with little orchestration overlap. Use only for prompt refinement so it does not replace a request to perform the task. | Ask what expert work is missing, which primary material matters, which methods apply, and what independent observation would show correctness; rewrite the prompt without expanding scope or choosing for the user. |
| show-me-your-work | `skills/show-me-your-work/SKILL.md` | Adapt | Intent notes, task histories, and evidence links already provide durable records. Avoid a mandatory duplicate TSV, forced commits, or mandatory model-family availability. | Record consequential decisions with reason, evidence, and result; append corrections instead of rewriting history; distinguish runs; audit claims against actual tool history; have a fresh reviewer inspect missing evidence and skipped verification. |
| statechart | `skills/statechart/SKILL.md` | Adapt | Retain its model-to-behavior reporting discipline as an optional formal-verification reference. Do not import its substantial TypeScript/TLC pipeline or forced Pele renderer. Intent renders Mermaid already, but that alone does not model-check anything. | Label states and shortest counterexample paths in the reader's terms; disclose bounds and unchecked properties; preserve distinctions between states that always violate and may violate an invariant; replay model failures against real code. |
| swarm | `skills/swarm/SKILL.md` | Adapt | Intent already implements parallel task ownership, dependencies, conflict holds, and completion wakes. Extract the worker contract into existing delegation guidance. | Declare slice coverage or a race selection rule before starting; bind results to exact revisions and measurement methods; reject results missing those identifiers; record gaps and dropouts explicitly rather than count them as passes. |
| tdd | `skills/tdd/SKILL.md` | Keep | Narrow, practical verification method that fits current testing guidance. No platform dependency. It is conditional, not an instruction to create infrastructure for every change. | Run the smallest behavioral regression check before fixing and confirm it fails for the right reason; make the minimal fix; rerun; use a stronger practical executable check when a test would require brittle mocks or unrelated setup. |
| teach | `skills/teach/SKILL.md` | Adapt | Most voice guidance already exists. Its dependencies on `how` and `why` should compose with the parent's adapted investigation skills, not require the upstream mode. | Combine current mechanism with historical rationale, retain uncertainty from source evidence, start at the reader's question, and add a visual only when it clarifies. Drop compulsory multiple diagrams and mandatory image generation. |
| technical-writing | `skills/technical-writing/SKILL.md` | Adapt | Much sentence-level advice overlaps Intent's plain-language instructions. A compact document-design reference can add value without a second prose regime. | Choose tutorial, how-to, reference, or explanation before drafting; tutorials need observable results; put conditions before actions; use real repository terminology; keep a PR description a concise reviewer briefing. Relax rigid sentence lengths, punctuation bans, and tab-only snippets. |
| typescript-best-practices | `skills/typescript-best-practices/SKILL.md` | Adapt | Useful language-specific examples for architecture or review, but not a universal style policy. Respect the target repository's schemas, brands, discriminants, and lint conventions. | Use discriminated unions, validate unknown data at boundaries, derive types from authoritative schemas, and choose the simplest total API. Correct the flawed range example and qualify absolute cast and argument-shape rules before reuse. |
| unslop | `skills/unslop/SKILL.md` | Skip | Most of its catalog repeats the current plain-language contract. A standalone skill adds instruction load and prescriptive punctuation without a new engineering method. | Preserve concrete actors, mechanisms, measurements, and consistent terms; remove filler while retaining evidence-backed uncertainty and meaning. |

## Supporting resources actually inspected

These are reads, not executions. The guide pages were followed as the help skill's local text references. They do not substitute for a read of an excluded skill.

| Resource | What the inspection adds |
| --- | --- |
| `README.md` | Plugin scope, full catalog, external dependencies, harness distinction, dormant Benny pack, and stated MIT license. |
| `skills/create-verification-skill/references/feature-map-example/README.md` | Feature contract, owned-instance checks, evidence identity, independent persistence confirmation, and entry-point-specific skip reporting. |
| `skills/create-verification-skill/references/feature-map-example/create-note.md` | Toolbar, keyboard, and CLI journeys; reopen saved data rather than trust a success notification; cancellation and fixture cleanup. |
| `skills/create-verification-skill/references/feature-map-example/search.md` | Matching, empty, and cleared results; keyboard-focus preconditions; observable completion rather than fixed sleeps; CLI and browser evidence. |
| `skills/reflect/references/judgment-reviewer.md` | Durable lessons tied to exact transcript evidence and actual skill use. |
| `skills/reflect/references/tooling-reviewer.md` | Identify avoidable user context handoffs; retain durable tool conventions, not incident-specific versions or paths. |
| `skills/reflect/references/divergent-reviewer.md` | Look for lucky passes, missing verification, second-order effects, and assumptions the main narrative overlooked. |
| `skills/reflect/references/synthesizer.md` | Durability, specificity, convergence, decision impact, existing-skill-first, structural enforcement, actual use, and already-covered filters; separate accepted, rejected, and backlog findings. |
| `skills/show-me-your-work/references/decision-log-template.tsv` | The six-column decision schema: timestamp, phase, decision, reason, evidence, result. |
| `skills/show-me-your-work/scripts/log.sh` | Read as text only. Append-only logging, single-line cell normalization, and formula-prefix escaping if a TSV is exported to a spreadsheet. No need to copy this helper for Intent notes. |
| `skills/statechart/references/render.md` | Upstream's pinned Pele dependency and mark styling; confirms that renderer details are packaging, separate from the reasoning method. |
| `skills/typescript-best-practices/references/patterns.md` | Concrete type examples and their limits, including the invalid negative-range guarantee discussed below. |
| `skills/poteto-help/references/prompting.md` | Goal, proof, constraints, context, and falsifiable completion; avoid prescribing a long chain of tools. |
| `skills/poteto-help/references/recipes.md` | Representative tasks for trials: duplicate writes, migration parity, focused reproduction, skeptical review, and context recovery. |
| `agents/comment-sicko.md` | Essential `no-comments` dependency. Confirms the destructive ambiguity policy and the mismatch between a claimed read-only role and comment-editing instructions. |
| `docs/guide/README.md` and all ten pages, `01-setup.md` through `10-recipes-and-pitfalls.md` | Read in full. Setup and routing context, mechanisms/history, design comparisons, testing, verification, unattended work, principle summaries, personalization, and trial recipes. Chapter 06 is especially useful for real-app and formal-proof distinctions. |
| `docs/harness/claude-code.md` | Read in full as README/help's adapter reference. Shows that portable prose still contains harness-specific tools, paths, model fields, and unavailable features; its adapter is not an Intent adapter. |

### Deferred or owned elsewhere

- `skills/statechart/scripts/**`: inventoried only, **405 files and 2,865,435 bytes** at the supplied snapshot, including its TypeScript implementation, launcher, configuration, tests, TLA+ fixtures, and captured checker outputs. No implementation file was read or run. Its advertised output behavior is assessed from `SKILL.md` and `references/render.md`, not verified against code. A future decision to vendor it needs a separate dependency, correctness, and runtime review.
- Excluded skill files, all `poteto-mode/playbooks/**`, `agents/poteto-agent.md`, and `automations/benny/**`: parent/other-assessor ownership, not inspected here. `agents/comment-sicko.md` is the explicit dependency exception above.
- Guide images were not viewed; their Markdown context was read. No generated harness mirror was audited.
- External links, Cursor built-ins, `cursor-team-kit` skills, and Pele documentation were not fetched. They are upstream dependencies, not necessary evidence for this pinned-text disposition. This assessment makes no claim about their current APIs or availability.

The deferred-tree count can be reproduced by enumerating regular files recursively under `skills/statechart/scripts` and summing `stat().st_size`. It is an inventory count, not a claim that these files were reviewed.

## Recommended extracts for the parent's skills

### Highest-value verification contract

Combine `create-verification-skill`, its three feature-map examples, `maintain-verification-skill`, and `tdd` into a concise contract that the parent's review, bug-fix, and verification skills can reference:

1. Name the user behavior, entry points, prerequisites, and observable success condition before changing code.
2. Confirm the actual instance, revision, data directory, authentication, and readiness. A process answering a health request is not proof the application is usable.
3. Capture the failing-before behavior where practical. Prove the changed path using real interaction, stable handles, and a second view of persisted effects.
4. Keep missing prerequisites and untested entry points visible. One working path does not prove another path.
5. After an unexpected result, recheck health and reset unusable UI state before trusting another drive.
6. Clean only owned processes and fixtures. Keep evidence and verify that it remains available after cleanup.
7. Classify a failed audit as documentation drift, a driver gap, or a product regression. Do not redefine expected behavior merely to make the audit pass.

In Intent, store launch commands as scripts, use script completion or readiness monitoring, drive through the available browser/mobile tools, and store evidence as assets. Use a task note for coverage and findings. Source readers may run in parallel; driving a shared app instance needs one owner. These are adaptations to the current session's documented Intent APIs, not assertions about upstream support.

### Optional formal-proof maintenance

Combine the create/maintain formal-verification pair with statechart's reporting rules. This deserves separate opt-in evaluation because tool choice and model fidelity require judgment:

- Map every modeled action to code and preserve actual atomicity. State the property, harm, bounds, assumptions, and exclusions.
- Challenge each property with a known broken variant. A passing checker that cannot detect the target failure is weak evidence.
- Record coverage and last-confirmed revision. Inspect changes, moves, and new writers since that revision before trusting another pass.
- Update the model from the implementation before consulting the desired result. Change a property only when evidence establishes an intended contract change.
- Replay each counterexample against real code. Report a model mismatch separately from a product defect; do not weaken the model to erase a finding.
- Report unchecked properties and bounded search explicitly. A diagram, a model pass, and a proof of production behavior are different claims.

Do not make statechart's runtime, auto-installation, or renderer mandatory. Plain Mermaid can explain a verified counterexample without claiming to generate or check it.

### Design and review

- From `arena`: fix the rubric before comparing options, give candidates independent writable outputs, judge only completed artifacts, synthesize around one coherent design, and verify again after grafting. Intent handles delegation mechanics. Cross-model review is useful when actually available; report a missing independent judge honestly.
- From `swarm`: include exact source revisions, method, and result schema in a worker brief. Coverage gaps stay gaps. Declare race selection rules in advance so the coordinator cannot pick a convenient winner after seeing results.
- From `reflect` and its four references: independent lenses, evidence pointers, durable decision-changing findings, and the distinction between absent guidance and guidance that was already present but ignored. No automatic external issue filing.
- From `correct`: choose the strongest practical enforcement and test it against a past failure. Apply this only within the authorized change; recurring mistakes are not permission for a repository-wide refactor.
- From `no-comments`: keep questions about stale reasoning, suppressions, and enforceable invariants. Reject its deletion mandate and theatrical reviewer persona.

### Reasoning and explanation

- Keep `sharpen` as a small, explicit prompt-refinement trial. Its independent correctness check is the strongest element.
- Fold `figure-it-out`'s hypothesis loop into existing task planning, using Intent notes for decisions and evidence rather than another mandatory log file.
- Use `teach` with the parent's `how`/`why` adaptations: mechanism and rationale in one explanation, with historical uncertainty preserved.
- Use selected `technical-writing` document-mode rules in authoring guidance; ordinary chat already has its own plain-language rules.
- Fold `recall`, `ketchup`, and `show-me-your-work` into note/handoff conventions rather than install three parallel memory and reporting systems.

## Corrections required before extraction

1. **TypeScript range example is not a proof.** `patterns.md` says `{ start: Date; durationMs: number }` makes a negative range unconstructable. The literal `{ start: new Date(0), durationMs: -1 }` satisfies that shape. Retain the representation idea only with an actual validated nonnegative duration or a correctly stated remaining runtime invariant. Other numeric and date limits still need explicit treatment. This was identified by static reading; no TypeScript compiler was run.
2. **Do not turn style preferences into correctness laws.** Claims such as every `as` being a crash, mandatory brand spellings, object arguments everywhere, or universal unknown-field tolerance need repository-specific judgment. Preserve validated boundaries and total APIs, not the absolute wording.
3. **Comment review must preserve uncertainty.** `no-comments` and its agent direct deletion when an exception is uncertain, including constraint comments whose enforcement was not approved. Replace that with investigation and an explicit unresolved finding. Removing the only written constraint is not proof it no longer matters.
4. **Resolve source inconsistencies in favor of evidence and scope.** README/guide describe Comment Sicko as read-only, while its prompt permits comment edits. The verification guide suggests daily automation, while the maintenance skill says suggest cadence only when asked. Neither grants this evaluation permission to edit, schedule, publish, or install anything.
5. **Portable text still needs a platform rewrite.** Do not carry Cursor `Task`, cloud environments, model-role files, transcript paths, `/loop`, built-in skill names, or secret cards into standalone Intent skills. Use documented native APIs and report unsupported capabilities instead of inventing equivalents.

## Assessment verification

This is a documentation-only change. Verification checks compare the disposition rows against the actual assigned `skills/*/SKILL.md` inventory, confirm referenced upstream paths exist, and check whitespace. Behavioral efficacy, model-checker correctness, and generated-skill execution remain untested; those belong in the parent's trial plan. No application tests or upstream scripts are required or authorized for this assessment.

The inventory check passed: 27 unique rows exactly match the assigned source files, with 2 Keep, 16 Adapt, and 9 Skip recommendations. All 45 distinct explicit upstream file paths checked exist. The initial Git HEAD remained `1109d6990fd5d1c3e666506c230458d27a6f2270`; other agents' new files were left untouched.
