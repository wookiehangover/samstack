---
name: interrogate
description: Adversarially review a code change or design by trying to break its intended behavior, reproducing suspected failures against real code, and separating verified defects from unresolved concerns. Use when asked to challenge a diff, find blind spots, or stress-test a design. Not for style review, and not for tracing what else a change affects downstream.
---

# Interrogate

Try to falsify the intended behavior. Report findings; do not apply fixes unless the user also requests them. Preserve the user's repository and working changes. A clean report is valid, but means only that the examined cases produced no verified defects.

1. State intent and scope from the user and artifacts. Identify the exact repository, base/head, and any uncommitted changes. If it is unclear which change is under review, settle that first; local work does not need a remote.
2. Choose independent attack angles appropriate to the change: lifecycle ordering, boundary inputs, stale state, compatibility, failure recovery, or permissions. For broad or high-risk work, use independent reviewers when delegation is available, and give them raw code and intent, not a proposed verdict. Without delegation, work through the angles in sequence and say the review had one perspective.
3. Exercise each plausible failure against real code and record the command, environment, actual output, expected behavior, and relevant location. Ask the same of any reviewer. Keep scratch repros isolated. For a design, probe the current implementation or a clearly labeled prototype; prototype results do not prove unimplemented code is broken.
4. Re-run candidate repros when permitted, check that they exercise the reviewed revision, and verify the failure violates the intended contract. Check whether it predates the change. Deduplicate by root cause, retaining every independent verified defect rather than selecting one reviewer's whole report.
5. Do not promote style preferences, imagined future changes, or unexecuted claims to verified defects. Do not silently discard consequential static evidence when execution is impossible: list it separately as an unverified concern with evidence, impact, execution limit, and next check.

Return intent and reviewed revision; verified findings with reproducible evidence and impact; rejected hypotheses with reasons; unresolved concerns and coverage gaps. Avoid a forced finding count or a claim of exhaustive safety.

When reproducing against a running application, identify the exact instance, revision, fixture data, readiness, and observed entry point. Compare baseline and changed behavior under the same conditions, and corroborate visible success with an independent read of persisted effects when relevant. Reset fixtures you own between attempts and retain evidence after cleanup. An unavailable prerequisite, a driver failure, a stale verification contract, and a product defect are different outcomes. Do not change the expected behavior to obtain a pass.

Keep the review proportionate. Run long checks through the host's job or script facility if it has one; the review needs no new tooling, copied worktrees, or polling loops.

Adapted from Lauren Tan's PStack under the MIT license. [License](LICENSE) · [Upstream review brief](https://github.com/cursor/plugins/blob/0b46ec399d55f2829e88822998f53b84944837d3/pstack/skills/interrogate/SKILL.md)
