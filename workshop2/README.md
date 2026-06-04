# Workshop 2 — GitHub Copilot Token Optimization
## Usage-Based Billing (UBB) Deep Dive

**Total duration:** ~3.5 hours  
**All exercises are mandatory.**  
**App:** `future-you-simulator/` (same app as Workshop 1)

---

## Why this workshop exists

Starting **June 1, 2026**, GitHub Copilot bills per token. Every prompt, every agent step, every tool call is a measurable line item. This workshop maps directly to the [10 levers](../GitHub-Copilot-Token-Optimization-Asia-Software-GBB.md) that cut cost without cutting quality.

> **Hidden, structural overhead is typically 90%+ of a request.** Most cost is invisible — not in what you type.

---

## Economics at a glance

| Token type | Relative cost |
|------------|--------------|
| Input | 1× |
| Cached (KV-cache hit) | ~0.1× |
| Output | **4×–8×** |

Output is the most expensive lane. One output-constraint instruction in `copilot-instructions.md` permanently cuts 60–80% of output cost per task.

---

## Exercise map

| # | Exercise | Lever | Duration | Saving potential |
|---|----------|-------|----------|-----------------|
| 00 | [Setup & UBB Foundations](exercises/exercise-00-setup-and-ubb-foundations.md) | All | 15 min | Baseline |
| 01 | [Prompt Compression & Language Tax](exercises/exercise-01-prompt-compression.md) | 1, 2 | 20 min | ~35–50% input |
| 02 | [Context Management & Escalation Ladder](exercises/exercise-02-context-management.md) | 3 | 20 min | ~30–50% input |
| 03 | [Output Control](exercises/exercise-03-output-control.md) | 4 | 15 min | ~60–80% output |
| 04 | [Workflow Modes — Ask, Plan, Agent](exercises/exercise-04-workflow-modes.md) | 5 | 20 min | ~5–25× per task |
| 05 | [Agent Configs & Persistent Instructions](exercises/exercise-05-agent-configs.md) | 6 | 25 min | ~15–25% per turn |
| 06 | [Model Routing & Reasoning Budget](exercises/exercise-06-model-routing.md) | 7 | 20 min | ~25–55% |
| 07 | [AGENTS.md Hygiene & Subagents](exercises/exercise-07-agents-md-and-subagents.md) | 8 | 20 min | ~10–20%+ |
| 08 | [MCP Tool Pruning](exercises/exercise-08-mcp-tool-pruning.md) | 9 | 20 min | ~9–72% schema |
| 09 | [Enterprise Guardrails & Team Policy](exercises/exercise-09-enterprise-guardrails.md) | 10 | 25 min | Org-wide control |
| 10 | [Capstone — Full Optimised Feature Build](exercises/exercise-10-capstone.md) | All | 30 min | Scorecard |

---

## Scoreboard

Track your tokens across all exercises:

| Exercise | Your tokens | Baseline estimate | Saving |
|----------|------------|-------------------|--------|
| 00 — Baseline | | 8,000 | — |
| 01 — Compression | | 4,000 | |
| 02 — Context | | 3,500 | |
| 03 — Output | | 2,800 | |
| 04 — Modes | | 30,000 (agent) | |
| 05 — Configs | | 2,000/turn × N | |
| 06 — Routing | | — | |
| 07 — AGENTS.md | | — | |
| 08 — MCP | | 165K (15 steps) | |
| 10 — Capstone | | 6,800 | |

---

## Setup

```bash
cd future-you-simulator
npm install
npm run dev
# → http://localhost:5173
```

Enable token visibility: **Output panel** (`Ctrl+Shift+U`) → **GitHub Copilot** channel.

---

**Start here:** [Exercise 00 — Setup & UBB Foundations](exercises/exercise-00-setup-and-ubb-foundations.md)
