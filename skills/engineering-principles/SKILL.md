---
name: engineering-principles
description: Diagnose failed fixes, shared-state and retry failures, weak boundaries, and recurring mistakes during an engineering review.
---

# Engineering principles

Choose the check that changes the next decision.

| Situation | Method |
|---|---|
| Several fixes fail the same check | Write their shared premise and test what would differ if it were false. Find what the failures have in common. If the bad state should be impossible, trace what first created it. |
| Flags or branches encode coupled state | Name valid states and transitions first. Choose a representation that fits the common access paths and makes invalid combinations hard to express. |
| Writers overwrite each other's changes | Separate independent facts and combine them on read. Give a shared invariant one owner or coordinate changes atomically. |
| Retries or crashes leave partial results | Derive the next step from current state and use a stable operation ID. Test replay after interruption, including a successful external action whose acknowledgement was lost. |
| Guards spread through business logic | Parse external input into domain values at the boundary. Keep checks where state, freshness, or access can change at runtime. |
| A correction keeps recurring | Encode the demonstrated invariant in a type, ownership boundary, lint rule, or contract check. Use a focused example when judgment is required. |
| A test mirrors the implementation | Use the observable contract for expected results. The test should fail when behavior breaks and pass when internals change without affecting behavior. |

For a proposed change, record the symptom, evidence, smallest intervention, and how to verify it. Preserve compatibility while affected callers migrate.

Adapted from Lauren Tan's PStack under the MIT license. [License](LICENSE) · [Upstream principle skills](https://github.com/cursor/plugins/tree/0b46ec399d55f2829e88822998f53b84944837d3/pstack/skills)
