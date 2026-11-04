---
name: how
description: Explain how a code subsystem works by tracing runtime flow, state ownership, boundaries, and failure paths with source citations. Use for code walkthroughs or placement and layering questions; historical motivation is a separate investigation.
---

# How

Build a useful mental model from the actual code. Default to read-only investigation: do not modify source or external state. Interpret a mildly vague question from available context, state that interpretation, and investigate; clarify if choosing the wrong target would waste substantial work.

For a narrow question, trace and explain it directly. For a broad subsystem, divide it into a few distinct angles such as entrypoints, persistence, and cancellation. Native Intent delegation is optional; inspect available specialists, task notes, and signatures before use. Give each explorer a distinct slice and request evidence, not a polished narrative. Do not require particular models or a separate explainer agent.

Use [the tracing checklist](references/tracing.md) to gather and reconcile evidence. Read actual definitions and callers instead of inferring behavior from symbol names. Follow at least one representative path through inputs, state changes, async boundaries, and outputs. Include relevant error, cancellation, and teardown paths. Mark runtime claims that were inferred from source rather than observed in execution.

Explain purpose and key concepts, then the flow, the few files someone should open next, and non-obvious constraints. Scale the structure to the question. Use a small diagram when multiple components make prose harder to follow. Cite symbols and file locations; avoid an annotated dump of every function.

Check contradictions against code before merging explorer findings. Say which paths remain untraced. Code establishes mechanisms, not the author's original motivation; do not invent a historical rationale. This skill is standalone and requires no other skills or services.

Adapted from Lauren Tan's pstack, MIT; see [license](LICENSE) and [source](https://github.com/cursor/plugins/blob/bb68f2365eceafa0cb2d253112f675acf5f144cc/pstack/skills/how/SKILL.md).
