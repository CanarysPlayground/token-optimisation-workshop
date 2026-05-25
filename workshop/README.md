# Token Optimisation Workshop
### GitHub Copilot Usage-Based Billing (UBB) — Hands-On Guide
**App context:** [Future You Simulator](../future-you-simulator/) — a React/TypeScript app built during this very workshop.

---

## Why this workshop exists

From **June 1, 2026** GitHub Copilot moves to **Usage-Based Billing**:

| Plan | Monthly seat price | Included credits | Overage rate |
|------|-------------------|-----------------|--------------|
| Pro | $10 / month | $10 credits | $0.04 per 1k tokens (approx.) |
| Business | $19 / user | $19 credits | Pay-as-you-go |
| Enterprise | $39 / user | $39 credits | Pay-as-you-go |

**Every prompt, completion, and agentic tool call consumes tokens — and tokens cost money.**
The 6 habits below can reduce your team's monthly bill by **~50 %** with no loss of quality.

---

## The 6 Token Optimisation Habits

| # | Habit | Approx. saving |
|---|-------|---------------|
| 1 | **Point Copilot at the exact file(s)** | ~11% |
| 2 | **Use a smaller / cheaper model** when power isn't needed | ~9% |
| 3 | **Write short, stable instructions** (avoid verbose, chatty prompts) | ~7% |
| 4 | **Limit reasoning effort** (disable extended thinking for simple tasks) | ~6% |
| 5 | **Turn off unused tools** in agent mode | ~9% |
| 6 | **Open a new chat per task** (don't drag irrelevant history) | ~8% |

---

## Workshop Structure

| Exercise | Habit | Theme |
|----------|-------|-------|
| [00 — Setup](exercises/exercise-00-setup.md) | All | Environment & baseline measurement |
| [01 — File Context](exercises/exercise-01-file-context.md) | Habit 1 | Point at the right file |
| [02 — Model Selection](exercises/exercise-02-model-selection.md) | Habit 2 | Choose the cheapest model that works |
| [03 — Stable Instructions](exercises/exercise-03-stable-instructions.md) | Habit 3 | copilot-instructions.md + short prompts |
| [04 — Reasoning Budget](exercises/exercise-04-reasoning-budget.md) | Habit 4 | Disable extended thinking |
| [05 — Tool Pruning](exercises/exercise-05-tool-pruning.md) | Habit 5 | Turn off unused agent tools |
| [06 — Fresh Chat](exercises/exercise-06-fresh-chat.md) | Habit 6 | New chat, clean context |
| [07 — Compound Savings](exercises/exercise-07-compound-savings.md) | All 6 | Apply all habits at once |
| [08 — Measuring Impact](exercises/exercise-08-measuring-impact.md) | Metrics | Reading the UBB dashboard |
| [09 — Team Policy](exercises/exercise-09-team-policy.md) | Process | Writing a team token budget policy |
| [10 — Capstone](exercises/exercise-10-capstone.md) | All | End-to-end optimised feature build |

---

## Prerequisites
- VS Code with the **GitHub Copilot** extension (v1.250+)
- GitHub account on a Copilot Pro, Business, or Enterprise plan
- Node.js 18+ and npm
- Clone this repo and run `npm install` inside `future-you-simulator/`

---

## Facilitator notes
- Allow ~20 minutes per exercise for a full-day session
- Exercises 00–06 are independent; 07–10 build on each other
- Exercises include a **token counter** column — ask attendees to screenshot VS Code's token usage panel (Settings → Copilot → Usage) before and after each exercise

---

*Reference slides: https://aka.ms/ghcp-tkn-opt*
*Live demo app: https://ashy-dune-0b4215a0f.7.azurestaticapps.net/index.html*
