# Exercise 11 — MCP Token Optimisation

> **OPTIONAL** — This exercise is outside the 90-minute core agenda. Complete it if you have extra time or as take-home practice.

**Duration:** 20 minutes  
**Habit:** MCP-aware prompting  
**Potential saving:** ~15–40% in agent mode  
**Goal:** Understand how MCP servers inflate every agent request, and learn three techniques to cut that overhead without losing capability.

---

## Why MCP costs more than you think

When Copilot runs in **agent mode**, it reads your `mcp.json` and injects a tool definition for **every tool from every enabled MCP server** into the model context on **every single request** — even if you never call those tools.

```
1 MCP server  × 10 tools × ~80 tokens/tool =    800 tokens overhead
5 MCP servers × 12 tools × ~80 tokens/tool =  4,800 tokens overhead   ← typical dev setup
10 MCP servers × 15 tools × ~80 tokens/tool = 12,000 tokens overhead  ← power user
```

That overhead is billed on **every agent turn**, regardless of whether any tool is invoked.

---

## Part A — Measure your current MCP overhead

### Step 1 — See what's loaded

Open VS Code. In Copilot agent mode, click **"Select tools"** (the tools icon in the chat input bar). Count how many tools are listed across all MCP servers.

**Total MCP tools currently enabled: ___________**

Estimate overhead: `tools × 80 = _____ tokens per agent request`

### Step 2 — Baseline agent prompt (all MCP servers on)

Ensure all your MCP servers are enabled. Open a **fresh agent chat** and run:

```
Using agent mode, look at src/store/useStore.ts and tell me what 
actions are defined in the store.
```

Open **Show Agent Debug Logs** (click "**···**" → **Show Agent Debug Logs** in the chat pane) and record:

| Metric | Value |
|--------|-------|
| `prompt_tokens` | |
| `cached_tokens` | |
| `completion_tokens` | |
| `total_tokens` | |

**Baseline (all MCP on): ___________**

---

## Part B — Disable unused MCP servers

For a code-reading task on a local React app, you only need file access tools. You do **not** need: Azure, Jira, Confluence, GitHub remote, database, browser, or cloud tools.

### Step 1 — Edit `mcp.json`

Open your MCP configuration file:

- **VS Code global:** `Ctrl+Shift+P` → `MCP: Open User Configuration`  
  or navigate to `%APPDATA%\Code\User\mcp.json`
- **Workspace-level:** `.vscode/mcp.json` in the repo root

Disable every server that is not needed for local file work. You can disable without deleting by adding `"disabled": true` to each server entry:

```jsonc
{
  "servers": {
    "azure": {
      "disabled": true,          // ← add this line
      "command": "...",
      ...
    },
    "github": {
      "disabled": true,
      "command": "...",
      ...
    }
    // keep only what you need for this task
  }
}
```

### Step 2 — Re-run the same prompt

Open a **fresh agent chat** and run the exact same prompt:

```
Using agent mode, look at src/store/useStore.ts and tell me what 
actions are defined in the store.
```

Record from the debug log:

| Metric | Value |
|--------|-------|
| `prompt_tokens` | |
| `cached_tokens` | |
| `completion_tokens` | |
| `total_tokens` | |

**With minimal MCP: ___________**

**Token saving from disabling unused servers: ___________**

---

## Part C — Use targeted MCP tool calls instead of broad prompts

When you do need an MCP tool, how you invoke it matters. A vague prompt forces the model to call tools speculatively; a precise prompt calls the right tool once.

### ❌ Vague (triggers multiple tool calls)

```
Check if there are any open GitHub issues related to the dashboard 
and also look at the code and tell me what's missing.
```

This may trigger: `search_issues` + `list_issues` + `read_file` + `file_search` — 4 tool calls, 4× the overhead.

### ✅ Targeted (one tool call, attached file)

Open a fresh chat, attach `src/components/Dashboard/Dashboard.tsx`, then:

```
List any TODO comments in the attached file.
```

No MCP tools needed — file is already in context. Zero tool-call overhead.

**Rule:** attach the file or resource directly whenever possible. Only use MCP tools when the data truly lives outside the workspace (remote GitHub, databases, cloud APIs).

---

## Part D — Control MCP tool response size

Some MCP tools return large payloads by default. Use tool parameters to limit output.

| Instead of | Use |
|-----------|-----|
| `list_issues` (returns all fields for 30 issues) | `list_issues(state="open", per_page=5, fields=["title","number"])` |
| `search_code` (full file contents) | `search_code(query="...", per_page=3)` |
| `get_file_contents` (entire large file) | Attach the file in VS Code instead |

When writing agent prompts, instruct the model to limit results:

```
Search GitHub issues for "dashboard". Return only the title and number 
of the 3 most recent open issues.
```

---

## The MCP optimisation checklist

| Check | Action |
|-------|--------|
| How many MCP servers are enabled? | Disable anything not needed for this task |
| Is the data in the workspace? | Attach the file — don't use an MCP tool |
| Is the prompt vague? | Make it specific so the model calls one tool, not five |
| Are tool responses large? | Add `per_page`, `limit`, or field filters to your prompt |
| Finished the task? | Re-enable servers you disabled — or use workspace `.vscode/mcp.json` to scope by project |

---

## Token saving summary

| Optimisation | Typical saving |
|--------------|---------------|
| Disable 5 unused MCP servers (50 tools) | ~4,000 tokens/request |
| Replace vague MCP calls with file attachment | ~2,000–6,000 tokens |
| Limit tool response size | ~500–3,000 tokens |
| **Combined** | **~15–40% per agent session** |

---

## Checkpoint ✓

- [ ] Measured token difference with all vs minimal MCP servers
- [ ] `mcp.json` updated to disable unused servers for local work
- [ ] Can explain why attaching a file beats an MCP tool call for local data
- [ ] Saving recorded: ___________

---

**Back to:** [Workshop README](../README.md)
