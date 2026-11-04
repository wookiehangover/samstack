---
name: architect
description: Design caller usage, types, ownership, and module boundaries before a substantial API or cross-module change. Use for architecture proposals or interface design, not routine local edits.
---

# Architect

Produce a design that a caller can use correctly without learning its internals. A design request authorizes a proposal; implement only when implementation is within the user's request. Honor any requested checkpoint. Do not put throwing scaffolds into production paths just to demonstrate a sketch.

1. Ground the problem in current code: trace representative callers, inputs, outputs, ownership, and failure paths. When changing an existing boundary, inspect its history and state which constraints are documented and which are inferred.
2. Write two or three realistic caller examples first, including a failure or lifecycle case. Derive types and signatures from those examples. Put sketches in the existing spec/task note or the requested artifact.
3. Compare at least two structurally different viable shapes for a consequential design. Set the comparison criteria before seeing candidates. Alternatives should differ in ownership, representation, or interface, not just naming. Sequential exploration is sufficient; use native delegation only when independent perspectives justify it.
4. Trace dominant access patterns through each shape. Identify the owner of mutable state, validation boundaries, retry behavior, and what remains visible to callers. Prefer substantial capability behind a small public interface. Read [design checks](references/design-checks.md) when comparing candidates.
5. Choose a base and name what was retained or rejected from alternatives. Record the rationale using [the outline](references/rationale.md), scaled to the task.
6. If implementation is authorized, implement in verifiable units. When several independent changes require the same workaround, revisit the design assumption. Investigate whether the model, missing requirement, or implementation is wrong before expanding the API. Preserve user work while revising your own design.

The design should say what invalid states it prevents and which failure modes remain runtime concerns. Type safety does not prove concurrency safety, freshness, or correct authorization. Separate independent writers where possible; when one shared object is required, make its ownership or serialization explicit.

In Intent, keep decisions in shared notes and use the available specialists without hardcoded models. Inspect tool signatures before delegation. No companion skill, Cursor command, or global configuration is required.

Adapted from Lauren Tan's pstack, MIT; see [license](LICENSE) and [source](https://github.com/cursor/plugins/blob/bb68f2365eceafa0cb2d253112f675acf5f144cc/pstack/skills/architect/SKILL.md).
