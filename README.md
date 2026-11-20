# samstack

Seven standalone engineering skills adapted from Lauren Tan's PStack and packaged for Agent Plugins 1.0.0. The package includes evaluation prompts, evidence, and upstream attribution. [PStack](https://github.com/cursor/plugins/tree/0b46ec399d55f2829e88822998f53b84944837d3/pstack) · [Agent Plugins specification](https://agent-plugins.org/specification)

## Install

In an Agent Plugins-compatible client that supports skills, use its plugin installer with this repository URL if Git installation is supported:

```text
https://github.com/wookiehangover/samstack
```

Select the repository root as the plugin directory, and `main` if the installer asks for a branch. Samstack 0.2.0 supplies seven skills through the standard `skills/` directory. [Plugin manifest](plugin.json)

For a client that loads local plugin directories, clone the repository and select the resulting `samstack` directory. Sam's existing checkout at `~/Developer/samstack` can be used directly; do not clone over it.

```sh
git clone https://github.com/wookiehangover/samstack.git
```

Installation, enablement, and invocation syntax belong to the client, not the portable format. See the standard's [compatible clients and setup links](https://agent-plugins.org/compatible-clients). A client that only accepts its own marketplace format needs a separate adapter; this package does not claim universal marketplace compatibility. The package has been validated locally; an end-to-end client installation has not been tested.

## Included skills

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

Each skill folder includes its MIT license and a self-contained `SKILL.md`. The optional repository checker (`python3 scripts/validate.py`) needs Python 3 with PyYAML. It checks plugin metadata, package boundaries, skills, licenses, and local links offline. Fixture runs need Node.js.
