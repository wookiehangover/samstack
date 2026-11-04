---
name: blast-radius
description: Assess what a proposed code change could break beyond its diff, identify its load-bearing safety assumptions, and test them against real code. Use for change-impact or downstream-risk review.
---

# Blast radius

Find the nonlocal behavior a change can break. A caller list is a starting point, not the result. Work within the user's scope and existing authorization. This review does not authorize fixes, deployment, or merging.

1. Establish the exact change: repository, base and head revisions, and whether working-tree changes are included. With no clear base, inspect local history and ask only if the selection remains ambiguous. Do not guess a remote project.
2. Read changed behavior and identify the one or two facts its safety depends on. Example: removing a cache entry cannot cancel work still used by another caller. Write a falsifiable statement rather than a reassuring summary.
3. Follow dependencies beyond symbol references: serialized fields, storage readers, other languages, callbacks, feature flags, teardown, async ordering, and downstream consumers. Inspect the installed library version and local patches before relying on library behavior.
4. For each consequential assumption, choose the cheapest discriminating check against actual code. A focused import, integration probe, or existing test often suffices. Use disposable inputs and isolated artifacts; a review is not permission to mutate live data. If execution is unavailable or prohibited, report the assumption as unproven and give the exact next check.
5. Distinguish evidence levels: assertion, cited implementation, traced unreachable failure, executed real-code check, reproduced application behavior. A passing narrow probe only proves the case it exercised.
6. Separate confirmed breakage, cleared scenarios, and unresolved risks. Describe likelihood through concrete preconditions rather than invented percentages. Include practical impact and the smallest regression check.

Return the behavior change, safety assumption and evidence level, findings with file locations and commands/results, cleared cases, and remaining gaps. Do not claim that no findings proves universal safety.

For a broad change, independent review angles can help. Use available Intent specialists and existing task notes when useful; inspect live tool signatures first. Do not create worktrees, model settings, polling loops, or another orchestration layer. The method also works in one agent with no other skills installed.

Adapted from Lauren Tan's pstack, MIT; see [license](LICENSE) and [source](https://github.com/cursor/plugins/blob/bb68f2365eceafa0cb2d253112f675acf5f144cc/pstack/skills/blast-radius/SKILL.md).
