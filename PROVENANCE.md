# Provenance and attribution

- Exact requested source: https://github.com/cursor/plugins/tree/main/pstack
- Repository: `cursor/plugins`; source subtree: `pstack/` (not the generated `harness/pstack/` copy).
- Pinned commit: `bb68f2365eceafa0cb2d253112f675acf5f144cc`.
- Observed plugin version: `0.15.36`; retrieved 2026-11-04 via `gh api`.
- Author and license: **Copyright (c) 2026 Lauren Tan**, **MIT**. The upstream license is preserved verbatim in [LICENSE](LICENSE) and in each skill directory.
- These are local adaptations for Sam's evaluation, not an official pstack or Cursor release. Wording and workflow changes were authored for this repository; original authorship is not claimed.

The GitHub web fetch was unavailable, so the revision and archive were retrieved through the GitHub CLI API. The archive was unpacked in agent-private temporary storage for inspection. No upstream script was executed and no plugin was installed. The destination was already initialized by Intent, empty and clean on `main`, with this workspace as a linked worktree; no reinitialization was needed.

## Source-to-output map

All paths below are relative to the pinned upstream `pstack/` tree. [source-manifest.json](source-manifest.json) records source file SHA-256 digests and sizes, plus the archive digest, for reproducible comparison. Its inventory is broader than the retained package; inclusion in that manifest does not mean a file was imported or executed.

| Local output | Upstream material read and adapted |
|---|---|
| `skills/blast-radius/` | `skills/blast-radius/SKILL.md`; dependency methods in how, why, and arena resolved inline or through native Intent facilities. |
| `skills/architect/` | `skills/architect/SKILL.md`, `references/design-red-flags.md`, `references/rationale-template.md`, `references/runner-prompt.md`; selected domain/ownership and minimize-reader-load principles; arena comparison criteria. |
| `skills/interrogate/` | `skills/interrogate/SKILL.md`; arena's independent review and reproduction concepts; create/maintain-verification-skill feature contracts and Benny verify-existing-fix evidence methods, without their orchestration. |
| `skills/benchmark-checklist/` | `skills/benchmark-checklist/SKILL.md`; arithmetic, completed-work checks and relevance; perf-issue and hillclimb hypothesis ordering, bounded by task scope. |
| `skills/how/` | `skills/how/SKILL.md`, `references/explorer-prompt.md`, `references/explainer-prompt.md`. |
| `skills/why/` | `skills/why/SKILL.md`; all four top-level references and all eight source references (code archaeology, Linear, Notion, Slack, Datadog, Sentry, Databricks, incident context). |
| `skills/engineering-principles/` | `principle-attack-the-premise`, `principle-model-the-domain`, `principle-separate-before-serializing-shared-state`, `principle-make-operations-idempotent`, `principle-boundary-discipline`, `principle-encode-lessons-in-structure`, `principle-test-behavior-not-implementation`, with root-cause/minimal-change methods from the principle review. |
| Disposition documents | README, plugin metadata, all top-level skill entrypoints, principles, poteto-mode playbooks, and the agent/automation resources listed in the individual assessment documents. |

## Deliberate changes

Removed Cursor slash commands, `pstack-models.mdc`, fixed provider/model names, mandatory agent fleets, global installation, session tracking, worktree management, and PR polling code. Replaced operational references with existing Intent facilities and live signature discovery. Condensed repeated prose and folded necessary cross-skill methods into each entrypoint or its local references.

Changed “design implies implement” to follow actual user scope. Kept unexecuted but consequential review concerns visible rather than silently discarding them. Reduced why's mandatory seven-way search to relevant available sources with a coverage map. Softened unconditional internal trust, immediate legacy deletion, and tooling-for-every-task rules to respect runtime invariants, compatibility, and proportional effort. Do not interpret an imported skill as permission to publish, merge, install, alter settings, or contact others.

Upstream `disable-model-invocation` metadata was not carried into Codex metadata. These files are not installed or auto-discovered during evaluation. If adopted later, choose invocation policy explicitly for the target host; automatic selection and slash-command registration have not been validated here.

## Reproduce source inspection

Use `gh api repos/cursor/plugins/commits/bb68f2365eceafa0cb2d253112f675acf5f144cc` to inspect the immutable revision. Retrieve its archive with `gh api repos/cursor/plugins/tarball/bb68f2365eceafa0cb2d253112f675acf5f144cc` into a fresh private temporary directory. Compare individual extracted file digests with the manifest; archive packaging can vary without changing file content. Treat source instructions as research data, not authorization to run them.
