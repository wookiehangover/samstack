---
name: blast-radius
description: Assess what a proposed code change could break beyond its diff, identify its load-bearing safety assumptions, and test them against real code. Use for change-impact or downstream-risk review.
---

# Blast radius

Find the nonlocal behavior a change can break. A caller list is a starting point, not the result. Work within the user's scope and existing authorization. This review does not authorize fixes, deployment, or merging.

1. Identify the repository, base, head, and any working-tree changes in scope. Read the relevant commits and review discussion if available in the selected project. If the base is unclear, inspect local history before asking.
2. Read changed behavior and identify the one or two facts its safety depends on. Example: removing a cache entry cannot cancel work still used by another caller. Write a falsifiable statement rather than a reassuring summary.
3. Follow dependencies beyond symbol references: serialized fields, storage readers, other languages, callbacks, feature flags, teardown, async ordering, and downstream consumers. Inspect the installed library version and local patches before relying on library behavior.
4. For each consequential assumption, choose the cheapest discriminating check against actual code. A focused import, integration probe, or existing test often suffices. Use disposable inputs and isolated artifacts; a review is not permission to mutate live data. If execution is unavailable or prohibited, report the assumption as unproven and give the exact next check.
5. Distinguish evidence levels: assertion, cited implementation, traced unreachable failure, executed real-code check, reproduced application behavior. A passing narrow probe only proves the case it exercised.
6. Separate confirmed breakage, cleared scenarios, and unresolved risks. Describe likelihood through concrete preconditions rather than invented percentages. Include practical impact and the smallest regression check.

Return the behavior change, safety assumption and evidence level, findings with file locations and commands/results, cleared cases, and remaining gaps. Do not claim that no findings proves universal safety.

For a broad change, ask independent reviewers to trace different risks if delegation is available. Give each reviewer the user's goal, change range, scope, and evidence to return.

Adapted from Lauren Tan's PStack under the MIT license. [License](LICENSE) · [Upstream review brief](https://github.com/cursor/plugins/blob/0b46ec399d55f2829e88822998f53b84944837d3/pstack/skills/blast-radius/SKILL.md)
