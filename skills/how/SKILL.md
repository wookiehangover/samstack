---
name: how
description: Explain how existing code works by tracing its runtime flow, state ownership, and failure paths, with file and symbol citations. Use for code walkthroughs, getting oriented in a subsystem, and questions about where a behavior lives. Not for why a decision was made, which needs history rather than code, and not for reviewing a change.
---

# How

Build a working mental model from the code as it runs. This is a read-only investigation: do not modify source or external state. If the scope is mildly ambiguous, state the interpretation you used. Split the trace when independent paths would benefit from separate investigation.

1. Start at a real entry point. Read definitions and callers through a representative input, decisions, effects, and return. Identify who owns state, who changes it, and when it is cleaned up. Follow relevant process and async boundaries, including failure, cancellation, or teardown.
2. Read actual definitions and callers instead of inferring behavior from symbol names, comments, or documentation. When one of those conflicts with the implementation, say so and follow the implementation. Label runtime behavior you inferred from source rather than observed, and note any untraced path that could change the answer.
3. Explain for an engineer who has to work in the subsystem.

Answer the question first. Then give the mechanism, the flow, the few files and symbols to open next, and the constraints that matter in practice. Cite a file and symbol for each non-obvious claim so the reader can check it; avoid an annotated list of every function. Use a small diagram if it clarifies the flow. Code shows the mechanism, not the author's motive: historical motivation needs its own evidence.

Adapted from Lauren Tan's PStack under the MIT license. [License](LICENSE) · [Upstream walkthrough brief](https://github.com/cursor/plugins/blob/0b46ec399d55f2829e88822998f53b84944837d3/pstack/skills/how/SKILL.md)
