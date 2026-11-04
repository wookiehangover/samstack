# Compare the design shapes

Read when evaluating architecture candidates. These are diagnostic questions, not unconditional deletion rules.

| Signal | Question and possible improvement |
|---|---|
| Shallow interface | Must callers coordinate internal stages? Hide meaningful policy behind a smaller operation. |
| Leaked representation | Do callers depend on private storage or wire formats? Parse into domain values at the boundary, unless exposing the protocol is the actual contract. |
| Temporal decomposition | Do load/validate/save modules repeat one domain invariant? Group by the knowledge owned, not merely execution order. |
| Pass-through layers | Does forwarding add policy or adaptation? Remove a layer only if it has no useful boundary role. |
| Split ownership | Can several modules mutate one invariant independently? Establish one owner, or separate independent state and combine at read time. |
| Parallel legacy APIs | Can all consumers migrate together? If yes, migrate and delete in one scoped unit. Otherwise name the compatibility period and retirement condition. |
| Importable internals | Can a nearby caller bypass the intended interface? Use module exports or build rules to enforce it where the toolchain supports this. |
| Hand-synchronized lists | Can one authoritative representation derive the others? If not, validate their agreement at the correct boundary. |

Sketch replay and partial failure explicitly. A retry after an external side effect requires a durable identity or reconciliation strategy; a local flag alone is not evidence of exactly-once delivery.

Judge reader effort on two separate axes: how many layers must someone trace, and how much hidden mutable state must they remember? Fewer lines do not help if they increase either burden. When combining candidates, recheck the combined usage and invariants; individually sound parts can form an inconsistent whole.

Derived from pstack architect design-red-flags.md and runner-prompt.md at the revision linked in the skill entrypoint.
