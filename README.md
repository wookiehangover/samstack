# samstack: local skill evaluation

Seven small, independently usable skills adapted from [Lauren Tan's pstack](https://github.com/cursor/plugins/tree/bb68f2365eceafa0cb2d253112f675acf5f144cc/pstack). This is an evaluation repository, not an installed plugin. Nothing here changes global instructions, model selection, or Intent settings.

| Skill | Use it to |
|---|---|
| [blast-radius](skills/blast-radius/SKILL.md) | Find nonlocal breakage and test the assumption a change relies on. |
| [architect](skills/architect/SKILL.md) | Compare caller-first interface and ownership designs. |
| [interrogate](skills/interrogate/SKILL.md) | Challenge a change and reproduce defects without applying fixes. |
| [benchmark-checklist](skills/benchmark-checklist/SKILL.md) | Check whether a performance claim measured correct, completed work fairly. |
| [how](skills/how/SKILL.md) | Trace runtime behavior into a concise, cited mental model. |
| [why](skills/why/SKILL.md) | Recover rationale without confusing code behavior with historical intent. |
| [engineering-principles](skills/engineering-principles/SKILL.md) | Diagnose failed premises, shared state, retries, and recurring mistakes. |

Start with **blast-radius**, **benchmark-checklist**, and **why**: their evidence requirements are easy to assess on real work. Try **architect** and **interrogate** on consequential changes. Use **how** as a lightweight walkthrough and **engineering-principles** only when a specific check helps.

To try one without installing it, ask your current agent: “Read `~/Developer/samstack/skills/blast-radius/SKILL.md` and apply it to this local diff. Review only; do not change source.” This loads the file for that task; it does not register a slash command or prove automatic discovery works.

Read the [evaluation guide](EVALUATION.md), [disposition index](docs/disposition.md), [Intent adaptation notes](docs/intent-adaptation.md), and [provenance](PROVENANCE.md). [Validation results](evals/RESULTS.md) distinguish completed checks from trials still for Sam to run.

Each skill folder includes its MIT license and required references so it can be evaluated on its own. No dependency installation is required for the skills. The optional repository checker needs Python 3 with PyYAML; this session used an existing cached copy without installing it. Fixture runs need Node.js. Do not run setup or copy these into a global skill directory until you decide to adopt them.
