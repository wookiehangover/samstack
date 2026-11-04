# Native Intent integration

The selected methods run without an orchestration dependency. The following signatures were inspected through the available workspace API in this session on 2026-11-04. They are examples of the current contract, not a promise of availability in another session: inspect `ws.help(namespace)` first.

| Need | Native facility inspected | Important constraint |
|---|---|---|
| Shared decisions | `ws.note.read('spec')`, `ws.note.add(id, {content})`, `ws.note.edit(id, {old, new})` | Add or edit; do not replace an entire note for an addition. |
| Existing task IDs | `ws.note.listTasks('spec')` | Reuse IDs instead of creating duplicate work. |
| Review perspectives | `ws.agent.listSpecialists()`, `ws.agent.delegate({taskNoteId, specialist, waitMode})` | Use current catalog; no fixed provider/model defaults. Batch delegation supports relations; inspect held/error dispositions. |
| Coordination | `ws.agent.send(agentId, message, 'queue')`, `ws.agent.watch(agentId)` | Watches provide completion wakes; do not poll agent status in a loop. |
| Long checks | `ws.script.listPage()`, `ws.script.create(name, command, 'command', {purpose:'saved'})`, `ws.script.start(id)` | Inspect and reuse definitions. A command launch is not completion; rely on successful `autoMonitor` or read a finished result. |
| Service readiness | `ws.script.monitor(id, {ttlMs, runId, outputPattern})` | Only successful monitor registration promises a wake. |
| File/task events | `ws.event.subscribe(['file:*','task:*'], {excludeSelf:true})` | Native subscriptions replace custom file polling. |
| Other external waits | `ws.hook.schedule({name, code, delayMs, ttlMs})` | Last resort; self-checking, bounded, meaningful changes only. Do not duplicate script/agent/PR watchers. |
| PR observation | `ws.pr.snapshot(number, {repo})`, `ws.pr.monitor(number, {repo})` | Legacy `repo` is GitHub.com owner/name. Qualified monitoring is production-disabled in this session; never invent supported targets. Unknown checks are not merge permission. |
| Local commits | `ws.git.commit(message, {files})` | Plain Git for inspection. No remote is needed; no publishing implied. |
| Existing local checkout | `ws.git.registerRoot(path)` | Requires an existing repository; does not initialize one. This destination already existed through supported workspace setup. |
| Workspace lifecycle | `ws.workspace.archive()` | User-requested only. No imported purge, cleanup, or worktree-removal scripts. |

The harvest itself creates no monitors, hooks, services, global settings, or model rules. GitHub source reads used `gh` against the user-specified public project. Future forge writes require the actual authorized repository/instance, branch, and action. Native observation aliases do not grant write access or choose a forge.

Preserved reasoning from overlapping workflows includes independent hypotheses, witnessed repros, per-revision evidence, state ownership, and tests of observable behavior. Intent handles where agents run, how they coordinate, and when they wake.
