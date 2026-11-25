---
name: why
description: Investigate why code or a design decision exists, using version history and whatever records are available, and separate documented rationale from inference and unknowns. Use for design history, unexplained thresholds or defensive code, and questions about whether an old constraint can be removed. Not for explaining how the code works today.
---

# Why

Recover the motivation without fitting a tidy story onto current code. This is read-only research within the user's source limits: do not contact people, modify sources, or change settings. Treat the explanation the user proposes as one hypothesis to test.

1. **Anchor in code and history.** Start from a file, symbol, and revision where available. Follow the introduction and material revisions. Use blame to find leads, follow renames with `git log --follow`, and search a literal with `git log -S`. Read the substantive diffs and linked review discussion. The latest commit to touch a line may not be the one that introduced the decision. A review or issue number in a commit message is a lead; confirm which repository it belongs to before reading it.
2. **Widen the search if the record is thin.** Discover which sources are available and authorized. Follow linked issues, decision documents, and dated threads. For defensive code or a numeric threshold, look for incident records, traces, or experiment results from the relevant period. Check whether a proposal was adopted.
3. **Weigh the evidence.** Code shows what happens, not why someone chose it. Rate each claim about rationale:

   | Level | Standard |
   |---|---|
   | Direct | A contemporary author states the rationale. Attribute and cite it. |
   | Supported | Independent indirect records converge. Name them and the reasoning step. |
   | Inferred | Context supports an interpretation without confirmation. Give the inference and the alternatives. |
   | Speculative | Several explanations fit thin evidence. Name the observation that would tell them apart. |
   | Unknown | The records searched do not establish it, or the needed records are unavailable. |

   A later recollection or a copy of the same record carries less weight than independent contemporary evidence. Keep contradictory sources and their dates visible instead of choosing the newer or tidier one. A stated intention does not show that the change achieved it.

Answer the question first: lead with the best supported explanation and its level, and cite original records by date, revision, or location. Then show the key evidence, any contradictions, and a short map of source coverage: what was searched, what returned nothing, and what was unavailable. Zero matches and an unavailable source are different results. Do not manufacture a gap when the evidence fully answers the narrow question.

If a change is planned, say what the evidence supports preserving, changing, or avoiding, and what uncertainty still creates risk. A documented motive can explain the original choice while leaving its current need open, so check whether the original constraint still applies before recommending removal.

Adapted from Lauren Tan's PStack under the MIT license. [License](LICENSE) · [Upstream history brief](https://github.com/cursor/plugins/blob/0b46ec399d55f2829e88822998f53b84944837d3/pstack/skills/why/SKILL.md)
