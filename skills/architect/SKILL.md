---
name: architect
description: Compare caller-facing interfaces, state ownership, and module boundaries for a substantial API or architecture change.
---

# Architect

1. Trace representative callers, state changes, and failure paths in the systems the change touches. When redrawing a boundary, use code and history to distinguish documented constraints from inferred ones.
2. Sketch normal caller usage and a failure or lifecycle case before deriving types and signatures. Set comparison criteria and sketch two viable designs that differ in ownership, representation, or interface.
3. Follow the common access paths in each design. Give each mutable invariant one owner or enforce coordination where sharing is required. Prefer one clear way to perform each task. Favor a small interface that handles internal ordering and storage on the caller's behalf. Identify the invalid states the design prevents and the failures it must handle at runtime. Check retries, partial failures, and migration needs when relevant.
4. Recommend a design. Include caller examples, types or module boundaries, tradeoffs, and a check for any open assumption that could change the decision. For a large or contested design, seek an independent sketch if the host supports delegation.

Keep a proposal read-only. If implementation is in scope, honor any requested checkpoint, work in verifiable units, and revisit the design when independent callers need the same workaround.

Adapted from Lauren Tan's PStack under the MIT license. [License](LICENSE) · [Upstream design brief](https://github.com/cursor/plugins/blob/0b46ec399d55f2829e88822998f53b84944837d3/pstack/skills/architect/SKILL.md)
