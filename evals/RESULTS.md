# Evaluation results

This record distinguishes structural validation from behavioral evidence. No production adoption or automatic skill discovery has been tested.

## Plugin packaging — 2026-11-06

Added root `plugin.json` for `samstack` 0.1.0 targeting [Agent Plugins 1.0.0](https://agent-plugins.org/specification). The seven skills remain in the standard immediate-child discovery layout; no skill instructions changed. No MCP configuration or client extensions are shipped.

The updated offline validator passed the manifest constraints, package containment, all seven skills, bundled licenses, and 32 local links. Its manifest rules were compared with the [published JSON schema](https://agent-plugins.org/schemas/1.0.0/plugin.schema.json). Three valid and twelve invalid manifest cases passed a contract smoke check, including required fields, name syntax, unknown fields, and metadata types. Command-level checks in a temporary package also rejected malformed JSON and a symlink to a resource outside the plugin root. Whitespace checks passed.

Validation used the same cached PyYAML described below and installed no dependencies. This establishes package-format checks, not an end-to-end client installation or marketplace listing. Client setup links and repository/local-directory installation guidance are in the README. The original behavioral trials below were not repeated for packaging-only changes.

## Structural checks

Completed on 2026-11-04:

- All seven skills passed the host skill-creator `quick_validate.py` checks.
- `scripts/validate.py` passed metadata, bundled-license, and 31 local Markdown target checks, including standalone resource boundaries.
- All 58 upstream top-level skill names are covered by the disposition documents. Reviewers separately checked their assigned inventory rows and source paths.
- All 141 source-file digests in the manifest match the pinned extracted source. The repository and bundled licenses preserve the upstream text verbatim.
- Package whitespace checks passed.

System Python initially lacked PyYAML. Validation used the already cached PyYAML 6.0.2 with the command below; no package was installed and no global setting changed. The cache path is specific to this machine and may expire. Another environment needs an interpreter with PyYAML available.

```sh
PYTHONPATH=/home/sam/.cache/uv/archive-v0/Jzv-HrTAKpwD2U1_ python3 scripts/validate.py
```

## Behavioral trials

One evaluator exercised three scenarios in sequential passes, without reading the evaluation guide. Raw responses, probes, output, input fingerprints, and caveats are retained in [trial-results.md](trial-results.md).

| Scenario | Observed outcome | Assessment |
|---|---|---|
| blast-radius + interrogate: shared cache release | Closing disposer plus proposed release breaks the remaining client's read; old release and no-op-disposer controls work. | Found a reproducible conditional regression and stated the missing production wiring. No fix applied. |
| benchmark-checklist: async writes | Old timing includes 8/8 writes; new timing includes 0/8 across five samples per side. | Rejected the misleading completed-work comparison and withheld a production adoption claim. |
| why: batch threshold history | Distinguished draft performance reasoning from the documented partner limit and unknown migration status. | Challenged the leading assumption, cited the supplied record, and declined to infer that removal is safe. |

These outcomes meet the narrow fixture expectations. Architect, how, and engineering-principles received metadata/resource and author review only; their behavioral prompts remain for evaluation. A supplemental interrogate paragraph changed during the run. The evaluator reread the final version and repeated the affected cache check with the same result; its new real-app guidance remains untested on an actual application. The trial report preserves original hashes, current hashes, and the follow-up's limits.

## Limits

These are small synthetic scenarios, not a benchmark demonstrating superiority over a baseline. The evaluator used one model context, and coordination output exposed a hint about the benchmark, so this was not strictly blinded. The trials do not establish reliability on production repositories, model diversity, connector access, automatic routing, or statistical improvement. The evaluation guide includes real-work and negative trials for Sam's adoption decision. No global skill installation, remote repository, PR, PR merge, UI, or screenshots were produced.
