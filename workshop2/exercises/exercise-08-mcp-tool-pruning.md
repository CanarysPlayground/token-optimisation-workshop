# Exercise 08 — MCP Tool Pruning

**Duration:** 20 minutes  
**Lever:** 9 (MCP Tool Pruning)  
**Potential saving:** 9–72% schema token overhead  
**App focus:** VS Code MCP settings, agent mode tool selection

---

## The MCP schema tax

Every enabled MCP tool injects its JSON schema into the context of every agent-mode request. This cost scales with both the **number of tools** and the **number of agent turns**.

### Schema accumulation table

| Tools enabled | Tokens per step | 5-step task | 15-step task | 30-step task |
|--------------|----------------|------------|-------------|-------------|
| 10 tools | ~1,800 | 9,000 | 27,000 | 54,000 |
| 52 tools (trimmed) | ~9,200 | 46,000 | 138,000 | 276,000 |
| 188 tools (untrimmed) | ~34,000 | **170,000** | **510,000** | **1,020,000** |

> A 30-step agent task with 188 tools loaded spends **over 1 million tokens** just on tool schemas — before writing a single line of code.

---

## Part A — Audit your enabled MCP tools

In VS Code, open **Settings** (`Ctrl+,`) → search for `mcp` → view enabled servers and tools.

Alternatively, in a chat, run:

```
List all enabled MCP tools and servers you can see. 
Format: server name | tool count | what it connects to
```

Record your current state:

| MCP Server | Tools | Used in last 7 days? | Keep / Disable |
|-----------|-------|---------------------|----------------|
| | | | |
| | | | |
| | | | |
| | | | |
| **TOTAL** | | | |

---

## Part B — The real audit example

From a real enterprise team audit (this is the reference case from the playbook):

| MCP server removed | Tools dropped | Usage before removal | Why removed |
|-------------------|--------------|---------------------|-------------|
| Slack | ~14 tools | 8% of sessions | Chat handled externally |
| Jira | ~22 tools | 2% of sessions | Project management outside coding |
| Confluence | ~18 tools | 5% of sessions | Docs accessed via browser |
| Dev databases | ~82 tools | High but scattered | Kept **prod DB only** |
| **Result** | 188 → 52 tools | | **−72% schema tokens** |

> **Key insight:** 72% schema saving came from removing tools used < 10% of sessions. These tools were available "just in case" — but their cost was paid 100% of the time.

---

## Part C — Scope MCP to workspaces

**Anti-pattern:** MCP servers configured globally in `settings.json` → all tools load everywhere.

**Correct pattern:** Configure per workspace.

### Step 1: Identify globally configured MCP servers

Open `%APPDATA%\Code\User\settings.json` (global):

```bash
# In terminal
code %APPDATA%\Code\User\settings.json
```

Look for any `github.copilot.chat.agent.mcp` or similar keys. Note which servers are globally enabled.

### Step 2: Move relevant tools to workspace settings

In `future-you-simulator/.vscode/settings.json` (create if needed):

```json
{
  "github.copilot.chat.agent.thinkingTools": false,
  "github.copilot.chat.agent.runTasks": false
}
```

> **Rule:** Only enable MCP tools needed for THIS project. Disable them globally and re-enable per workspace.

---

## Part D — Measure schema impact in agent mode

### With all tools enabled:

Switch to agent mode. Attach `src/utils/aiSimulator.ts`. Run:

```
Add addMotivationKeyword function to aiSimulator.ts. Code only.
```

Open Agent Debug Logs → Summary after the request completes.

Record: **Copilot Usage (AIC) with all tools: ___________**

---

### Disable tools not needed:

In VS Code, go to agent mode tool selection (the wrench icon). Disable all tools except:
- `read_file`
- `create_file`  
- `replace_string_in_file`

Run the same prompt again.

Open Agent Debug Logs → Summary after the request completes.

Record: **Copilot Usage (AIC) with minimal tools: ___________**

**Schema reduction: ___________ (expect 15–40%)**

---

## Part E — The VS Code tool disable workflow

For each agent task, apply this pre-flight:

| Task type | Tools to keep | Tools to disable |
|-----------|--------------|-----------------|
| Code review | `read_file` only | Everything else |
| Single-file edit | `read_file`, `replace_string_in_file` | Terminal, browser, external |
| Feature build | `read_file`, `create_file`, `replace_string_in_file`, `run_in_terminal` | Browser, external services |
| Full agentic workflow | All needed | Slack, Jira, Confluence, unrelated DBs |

> **Pro tip:** In VS Code agent mode, you can uncheck tools per-session in the chat input toolbar. This is faster than editing settings.json for one-off tasks.

---

## Part F — Calculate your team's monthly schema waste

Estimate using your baseline:

```
Tools currently enabled: [your count from Part A]
Agent tasks per developer per day: estimate ___
Average steps per task: estimate ___
Developers on team: ___

Tokens per month (schema only) = 
  tools × 183t × steps × tasks × 22 work days × developers

After pruning to [your trimmed count] tools:
Saving % = (original - trimmed) / original
```

| Metric | Before | After | Saving |
|--------|--------|-------|--------|
| Tools enabled | | | |
| Monthly schema tokens | | | |
| Monthly schema cost ($) | | | |

---

## Checkpoint ✓

- [ ] Audited all enabled MCP tools (recorded table)
- [ ] Identified which tools have low usage (< 10% sessions)
- [ ] Moved at least one server from global to workspace scope
- [ ] Measured Copilot Usage (AIC) with all tools vs minimal tools
- [ ] Calculated team monthly schema waste
- [ ] Understand: schema cost is paid 100% of the time, even for tools never called

---

**Next:** [Exercise 09 — Enterprise Guardrails & Budget Policy](exercise-09-enterprise-guardrails.md)
