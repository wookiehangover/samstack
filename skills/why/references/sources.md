# Source methods

Discover actual tools and inspect their arguments before use. These are investigation patterns, not assumed APIs. Keep access read-only and queries bounded to the task.

| Category | Useful investigation | Limits to record |
|---|---|---|
| Source control | Follow renames with `git log --follow -p -- path`; use `git log -S 'literal' -- path`, blame, and full commit diffs. Read associated review discussion and ADRs in the selected project. | Shallow history, missing remote/auth, squashed commits, unlinked decisions. |
| Tickets | Start with linked IDs; read comments, parent initiatives, duplicate chains, and changing scope. | Templates/labels are weaker than specific rationale; closed tickets can describe abandoned plans. |
| Documents | Search feature names, symbols, error text, authors, and dates. Read alternatives and finalized decisions in context. | Draft versus adopted design, later edits, restricted pages, stale specs. |
| Conversations | Search PR links, author and date window, exact error strings; read whole relevant threads. | Retention, inaccessible DMs, jokes, and single-message context loss. Never message anyone as part of this search. |
| Infrastructure | Match service, time window, dashboard/monitor thresholds, incidents, traces, and log aggregates. | Correlation is not causation; changed instrumentation and retention can mimic behavior changes. |
| Errors | Check representative stack, release, environment, first/last seen, frequency, and resolution notes. | Sampling and release timing; automated root-cause explanations are hypotheses, not primary evidence. |
| Analytics | Inspect real schema before bounded read-only queries; use correct deduplication, units, time windows, and experiment exposure. | Refresh lag, renamed events, schema drift, inaccessible notebooks, and misleading raw duplicates. |

For defensive code, search incident/postmortem records around its introduction using error text, retry/timeout conditions, and linked follow-ups. Correlate the date with changes elsewhere before claiming causation.

Record each query and time scope, the record location, author/date when available, relevant quote or faithful paraphrase, contradictions, and remaining leads. Use aggregate summaries rather than private raw data dumps. If a query is asynchronous, use the connector's supported result retrieval; do not rerun the query or invent a polling API.

Derived from all eight pstack why references/sources files and source-playbook.md. Service-specific tool names and company-specific schemas were deliberately removed.
