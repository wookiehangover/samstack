---
name: architect
description: Design or compare caller-facing interfaces, state ownership, and module boundaries before a substantial API or cross-module change. Use when asked for an architecture proposal, an interface design, or a choice between ownership models. Not for routine local edits or for explaining code that already exists.
---

# Architect

Produce a design that a caller can use correctly without learning its internals. A design request asks for a proposal, so leave source unchanged unless implementation is also part of the request. Do not add throwing stubs or placeholder scaffolds to real code paths to illustrate a sketch; sketches belong in the proposal.

1. **Ground the problem in current code.** Trace representative callers, state changes, and failure paths in the systems the change touches. When redrawing a boundary, use code and history to distinguish documented constraints from inferred ones.
2. **Write caller usage first.** Sketch normal usage and at least one failure or lifecycle case, then derive types and signatures from those examples. An interface designed from its internals outward tends to leak them.
3. **Sketch two viable designs.** Set the comparison criteria before sketching. The designs should differ in ownership, representation, or interface, not only in naming.
4. **Stress each design.** Follow the common access paths through it and check:
   - Each mutable invariant has one owner, or coordination is enforced where sharing is required.
   - There is one clear way to perform each task.
   - The interface is small and handles internal ordering and storage on the caller's behalf.
   - Which invalid states the design prevents, and which failures it must still handle at runtime. Types do not establish concurrency safety, freshness, or authorization.
   - Retries, partial failures, and migration of existing callers, where relevant.
5. **Recommend one.** Say what was kept or rejected from the alternative and why.

Return, scaled to the task: the problem and its constraints; caller examples; types or module boundaries with the owner of each piece of state; the decision and its tradeoffs; and any open assumption that could change the decision, with the check that would settle it.

For a large or contested design, seek an independent sketch if the host supports delegation. If implementation is in scope, honor any requested checkpoint, work in verifiable units, and revisit the design when independent callers need the same workaround.

Adapted from Lauren Tan's PStack under the MIT license. [License](LICENSE) · [Upstream design brief](https://github.com/cursor/plugins/blob/0b46ec399d55f2829e88822998f53b84944837d3/pstack/skills/architect/SKILL.md)
