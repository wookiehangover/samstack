---
name: how
description: Explain how code works by tracing runtime flow, state ownership, and failures. Use for code walkthroughs and questions about where behavior lives.
---

# How

Trace and explain the code in one read-only pass. If the scope is mildly ambiguous, state the interpretation you used. Split the trace when independent paths would benefit from separate investigation.

1. Start at a real entry point. Read definitions and callers through a representative input, decisions, effects, and return. Identify who owns state, who changes it, and when it is cleaned up. Follow relevant process and async boundaries, including failure, cancellation, or teardown.
2. Check conflicting claims against the implementation. Label inferred runtime behavior and note any untraced path that could change the answer.
3. Give an engineer enough context to work in the subsystem. Explain the mechanism, name the files and symbols that establish it, and surface the constraints that matter in practice. Use a small diagram if it clarifies the flow. Historical motivation needs its own evidence.

Adapted from Lauren Tan's PStack under the MIT license. [License](LICENSE) · [Upstream walkthrough brief](https://github.com/cursor/plugins/blob/0b46ec399d55f2829e88822998f53b84944837d3/pstack/skills/how/SKILL.md)
