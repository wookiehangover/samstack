---
name: why
description: Investigate why code or a design decision exists using history and available records, separating documented rationale from inference and unknowns. Use for design lineage, unexplained thresholds, and historical tradeoffs.
---

# Why

Investigate motivation without retrofitting a tidy story onto current code. Treat the user's hypothesis as one candidate. This is read-only research; do not contact people, modify sources, or change settings. No other skills are required.

1. Anchor the question in files, symbols, and a revision. Read the relevant code, blame, history through renames, and substantive diffs. Search exact constants/error strings and inspect commit messages. The latest touching commit may not introduce the decision.
2. Read [confidence rules](references/confidence.md) before interpreting evidence. Separate what code does from why someone chose it.
3. Inventory relevant available sources using actual tool discovery. Consider source control, tickets, documents, team conversations, infrastructure telemetry, error records, and product analytics. Read [source methods](references/sources.md) for useful queries and pitfalls. Search what is relevant and authorized; report unavailable, deferred, or irrelevant categories with a reason. Do not assume Git history, a remote, credentials, or a particular connector exists.
4. Follow leads across records and dates. For substantial investigations, native Intent specialists can search distinct source categories in parallel. Share the same code anchor and collect source locations, dates, queries, contradictions, and null results. Use actual tool signatures; do not manufacture connector names or copy Cursor paths.
5. Synthesize direct evidence, converging indirect evidence, inferences, competing hypotheses, and unknowns. Spot-check citations against the original record. An empty search does not prove a motive never existed; unavailable access is different from no matches.
6. If this research precedes a code change, turn supported findings into **Preserve / Change / Avoid / Risk** constraints. A historically useful workaround may be obsolete, but age alone does not prove that.

Answer the question first, then show the key evidence and confidence, contradictions, and a compact source-coverage map including gaps. Cite exact commits/files or actual record links, with short quotes only when necessary. Do not flatten uncertainty into a confident summary or silently treat one artifact repeated in several places as independent evidence.

For GitHub history use the authorized, explicitly selected project with `gh`; for GitLab use `glab`. A PR number in a commit message is a lead, not proof of its host/project. Without a remote, investigate local history and state the limit. Existing Intent notes supply current context but are not automatically contemporaneous evidence of an old decision.

Adapted from Lauren Tan's pstack, MIT; see [license](LICENSE) and [source](https://github.com/cursor/plugins/blob/bb68f2365eceafa0cb2d253112f675acf5f144cc/pstack/skills/why/SKILL.md).
