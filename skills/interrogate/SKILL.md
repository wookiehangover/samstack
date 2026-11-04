---
name: interrogate
description: Conduct an adversarial review of a code change or design, reproduce suspected failures, and separate verified defects from unresolved concerns. Use when asked to challenge a diff, find blind spots, or stress-test a design.
---

# Interrogate

Try to falsify the intended behavior. Report findings; do not apply fixes unless the user also requests them. Preserve the user's repository and working changes. A clean report is valid, but means only that the examined cases produced no verified defects.

1. State intent and scope from the user and artifacts. Identify the exact repository, base/head, and any uncommitted changes. Resolve ambiguous review selection before remote operations; local work remains possible without a remote.
2. Choose independent attack angles appropriate to the change: lifecycle ordering, boundary inputs, stale state, compatibility, failure recovery, or permissions. Review broad/high-risk work with independent specialists when useful and available. Give reviewers raw code and intent, not a proposed verdict.
3. Ask each reviewer to exercise a plausible failure against real code and return the command, environment, actual output, expected behavior, and relevant location. Keep scratch repros isolated. For a design, probe the current implementation or a clearly labeled prototype; prototype results do not prove unimplemented code is broken.
4. Re-run candidate repros when permitted, check that they exercise the reviewed revision, and verify the failure violates the intended contract. Check whether it predates the change. Deduplicate by root cause, retaining every independent verified defect rather than selecting one reviewer's whole report.
5. Do not promote style preferences, imagined future changes, or unexecuted claims to verified defects. Do not silently discard consequential static evidence when execution is impossible: list it separately as an unverified concern with evidence, impact, execution limit, and next check.

Return intent and reviewed revision; verified findings with reproducible evidence and impact; rejected hypotheses with reasons; unresolved concerns and coverage gaps. Avoid a forced finding count or a claim of exhaustive safety.

For real-app reproduction, identify the exact running instance, revision, fixture data, readiness, and observed entry point. Compare baseline and changed behavior under the same conditions; corroborate visible success with an independent read of persisted effects when relevant. Reset owned fixtures between attempts and retain evidence after cleanup. An unavailable prerequisite, driver failure, stale verification contract, and product defect are different outcomes. Do not silently change expected behavior to obtain a pass. These checks preserve the useful verification methods from upstream's overlapping verification and Benny workflows without importing their automation.

Use native Intent task delegation/messaging and completion watches if available, after reading live signatures and existing task IDs. Use saved scripts for long checks. If these facilities are absent, review sequentially and disclose the narrower independence. Do not install an agent panel, copy worktrees, change models, or start polling loops. No other skill is required.

Adapted from Lauren Tan's pstack, MIT; see [license](LICENSE) and [source](https://github.com/cursor/plugins/blob/bb68f2365eceafa0cb2d253112f675acf5f144cc/pstack/skills/interrogate/SKILL.md).
