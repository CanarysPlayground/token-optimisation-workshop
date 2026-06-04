# Token Optimization with GitHub Copilot
**Workshop Agenda**

---

## Agenda Overview

| # | Section |
|---|---------|
| 01 | Key scenarios |
| 02 | Best practices — Habits |
| 03 | Tooling & utilities |

---

## 01 · Key Scenarios

### The shift to usage-based billing

**Top Levers that move the needle:**
- Prompt compression techniques
- Context management
- Output control
- Workflow mode selection
- Agent configs and agent management
- Tooling management
- Model routing
- Enterprise guardrails
- Using the right language and semantics

---

### Where tokens leak today

**Context bloat & whole-file reads**
- Repo instructions loaded every turn
- Auto-included file neighbors
- Verbose `copilot-instructions.md`

**Verbose prompts & history compounding**
- Polite scaffolding adds tokens with no value
- Conversation history grows turn-by-turn
- 30-turn sessions can carry 50K+ tokens

**Wrong-model & over-reasoning**
- Using Opus 4.7 for simple lookups (1.67× cost)
- Leaving reasoning at HIGH for trivial tasks
- No model routing strategy

**Agent loops & tool sprawl**
- Vague prompts → 20 exploration steps
- All MCP schemas re-sent on every step
- No `maxTurns` cap → runaway loops

---

### Anatomy of a Copilot Turn

Every request layers multiple input sources before your prompt reaches the model:

```
[System Prompt & Tools] + [Instructions] + [File Context] + [Conversation History] + [YOUR PROMPT]
                                                                                            ↑
                                                                               Usually 5–100 tokens
```

**Input · Cached · Output economics:**

| Token Type | Relative cost |
|------------|--------------|
| Input | 1× |
| Cached (KV-cache hit) | ~0.1× |
| Output | 4×–8× |

**Where the money actually goes:**
- 90%+ of a request is hidden structural overhead
- Output is 4×–8× more expensive than input
- Cached prefixes bill at ~10% — but rearranging breaks the cache

---

## 02 · Best Practices — Habits

### Prompt Compression
- Drop polite scaffolding — keep technical substance
- Use structured / code-native phrasing over prose
- Caveman-speak saves 30–50% input, 40–55% output with negligible quality impact

### Context Management
- Use `#selection` or `#file:Lx-Ly` for 80% of tasks
- Reserve `#codebase` for cross-file architecture work only
- Start a new chat when the topic shifts
- Use `/compact` when history grows long on the same task

### Output Control
- Add `"Code only, no explanation."` to `copilot-instructions.md`
- Use `"3 bullet points max."` or `"Answer in one sentence."` where appropriate
- One output-cap instruction = permanent 60–80% savings per task

### Workflow Mode Selection
- Default to **Ask** (1 call, ~500–2K tokens)
- Use **Plan** for scoped design tasks (~1K–4K tokens)
- Use **Agent** only when you can state acceptance criteria in one sentence (~15K–50K tokens)

### Model Routing
- Default: Auto model for syntax, lookups, one-shot Qs
- Day-to-day: Sonnet 4.6 for implementation and refactors
- Premium: Opus 4.7 only for architecture, security audits, hard novelty

### Agent Config Hygiene
- `copilot-instructions.md`: landmines only (non-obvious constraints the agent can't derive from code)
- Cap `maxTurns` at 10–20
- Use subagents to avoid re-billing the same files across turns
- Configure MCP per workspace, never globally

---

## 03 · Tooling & Utilities

### What we ship with

**Model picker & Auto Mode**
- Select models per task in VS Code Copilot Chat
- Auto model routes to the cheapest capable model

**Cost calculator & playbook**
- Estimate token usage before long Agent runs
- Refer to the [Token Optimization Playbook](./GitHub-Copilot-Token-Optimization-Asia-Software-GBB.md)

**Token Optimization tooling and best practices**
- [caveman](https://github.com/JuliusBrussee/caveman) — prompt compression utility
- [stenographer-mode](https://github.com/AkashAi7/stenographer-mode) — token-efficient response mode
- `applyTo`-scoped instruction files — load context only when relevant
- `/compact` command — compress conversation history in-place

---

## Quick Reference: 7 Actions to Start Tomorrow

| # | Action | Time |
|---|--------|------|
| **1** | **Compress `copilot-instructions.md`** | 10 min |
| 2 | Add an output cap to your prompt tail | 1 min |
| **3** | **Audit and disable unused MCP servers** | 15 min |
| 4 | Default to Ask Mode; switch to Agent only when needed | Habit |
| 5 | Default to Auto model; promote to Premium by hand | 1 min |
| **6** | **Add `applyTo`-scoped instruction files** | 15 min |
| 7 | Run a configuration review every month | Ongoing |

*Steps 1, 3, and 6 deliver the largest wins.*
