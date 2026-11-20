---
name: why
description: Investigate why a code or design decision was made. Use for design history, unexplained thresholds, and historical tradeoffs.
---

# Why

Use read-only research within the user's source limits. Treat the proposed explanation as a hypothesis.

1. Anchor the question in a file, symbol, and revision where available. Follow the introduction and material revisions. Use blame to find leads, follow renames with `git log --follow`, and search a literal with `git log -S`. Read the substantive diffs and linked review discussion. Resolve the authorized project before reading remote reviews. A review number alone cannot identify it.
2. If the record is thin, discover available and authorized sources. Follow linked issues, decision documents, and dated threads. For defensive code or a numeric threshold, look for incident records, traces, or experiment results from the relevant period. Check whether a proposal was adopted. A later recollection or a copy of the same record carries different weight from independent contemporary evidence.
3. Lead with the best supported explanation and cite original records by date, revision, or location. Attribute what authors said, mark inferences and alternatives, and identify unknowns. Distinguish searches with zero matches from unavailable sources. A documented motive can explain the original choice while leaving its effectiveness and current need open.

If a change is planned, say what the evidence supports preserving, changing, or avoiding, and what uncertainty still creates risk. Check whether the original constraint still applies before recommending removal.

Adapted from Lauren Tan's PStack under the MIT license. [License](LICENSE) · [Upstream history brief](https://github.com/cursor/plugins/blob/0b46ec399d55f2829e88822998f53b84944837d3/pstack/skills/why/SKILL.md)
