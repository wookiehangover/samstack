# Gather a coherent trace

For the question or delegated slice, collect:

- Components: key types/services and their owning file and responsibility.
- Flow: trigger, function calls, data transformations, decisions, effects, and return path.
- State: creator, readers, writers, lifetime, cleanup, and what crosses process or async boundaries.
- Contracts: inputs/outputs, failure behavior, and consumers outside the immediate call graph.
- Evidence: files actually read and precise locations supporting each non-obvious statement.
- Gaps: unresolved dispatch, generated code, unavailable dependency source, or behavior requiring a runtime check.

During synthesis, resolve conflicting claims by reading the relevant implementation. Explain concepts before using them, keep names concrete, and omit sections that do not help answer the question. Historical statements need historical evidence, even when a design looks sensible today.

Derived from pstack how explorer-prompt.md and explainer-prompt.md.
