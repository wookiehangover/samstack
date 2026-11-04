# Design rationale outline

Use only the sections needed to make the choice reviewable.

- **Problem and constraints:** observed behavior, desired outcome, constraints supported by source/history, and unresolved assumptions.
- **Caller usage:** imports, normal call, failure/lifecycle call, and returned data. Write this before the types.
- **Shape:** types, signatures, module map, ownership, and invariant boundaries. Explain the complexity hidden by the public interface.
- **Decision:** chosen candidate; contributions retained from other candidates and why others lost.
- **Tradeoffs:** costs accepted for a specific benefit, including migration and compatibility requirements.
- **Evidence and open questions:** what was checked, what remains hypothetical, and which observation would change the decision.
- **Next step:** next authorized implementation or investigation unit and its observable completion check.

Derived from pstack architect rationale-template.md. This outline requires no arena or other skill.
