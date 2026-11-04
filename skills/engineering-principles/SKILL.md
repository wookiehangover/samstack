---
name: engineering-principles
description: Apply focused reasoning checks to repeated failed fixes, shared-state design, retry recovery, or recurring engineering mistakes. Use for a requested principle-driven diagnosis or design review, not as an always-on rule set.
---

# Engineering principles

Choose the check that changes the next decision. Do not apply a full checklist to every edit, broaden scope, or replace the user's chosen constraints. These methods need no other skills.

| Situation | Method |
|---|---|
| Several fixes fail the same gate | Write the premise they share; identify and run an observation that differs if it is false. Investigate the first incorrect transition before adding another compensating guard. |
| Booleans or branches encode coupled state | Model valid domain states and transitions. Choose a structure from the real access patterns; avoid an abstraction that removes no duplicated rule or invalid state. |
| Concurrent actors overwrite each other's state | First ask whether they need the same mutable object. Separate independent facts and combine on read. If one canonical object is essential, enforce ownership or atomic coordination structurally. Instructions to “be careful” are not concurrency control. |
| Retries or crashes create partial results | Derive the next step from observed state, use stable operation identity, and test replay plus interruption at meaningful boundaries. Account for an external action that succeeded before its acknowledgement was lost. Idempotent local steps do not imply exactly-once external delivery. |
| Guards spread through business logic | Validate untrusted data at real boundaries and pass domain types inward. Retain checks for legitimate dynamic invariants, unsafe callers, freshness, and authorization that static types do not prove. |
| A correction keeps recurring | Prefer a type, ownership boundary, lint rule, or contract check that prevents the demonstrated failure. If judgment cannot be encoded, use a focused example. Do not rewrite global instructions or expand tooling without task authorization. |
| A test mirrors the implementation | Imagine breaking the observable contract: should fail. Imagine changing internals without changing behavior: should pass. Expected results come from requirements, not the code under test. |

For a proposed change, record the symptom, chosen principle, discriminating evidence, minimal intervention, and observable completion check. Prefer removing a demonstrated cause to accumulating workarounds. Preserve necessary compatibility while callers migrate; deletion is not automatically safe or authorized.

Use Intent's notes, isolation, saved scripts, and existing agent facilities where needed. This skill does not install tooling, run indefinite improvement loops, manage sessions, or authorize external actions.

Adapted from Lauren Tan's pstack principle skills, MIT; see [license](LICENSE). Source paths and disposition are recorded in the evaluation repository; the standalone source family is [pinned here](https://github.com/cursor/plugins/tree/bb68f2365eceafa0cb2d253112f675acf5f144cc/pstack/skills).
