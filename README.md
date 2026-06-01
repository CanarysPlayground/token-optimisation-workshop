# Token Optimisation Workshop
### GitHub Copilot Usage-Based Billing (UBB) — 90-Minute Hands-On Guide
**App context:** [Future You Simulator](future-you-simulator/) — a React/TypeScript app used throughout this workshop.

---

## Why this workshop exists

From **June 1, 2026** GitHub Copilot moves to **Usage-Based Billing**:

| Plan | Monthly seat price | Included credits | Overage rate |
|------|-------------------|-----------------|--------------|
| Pro | $10 / month | $10 credits | $0.04 per 1k tokens (approx.) |
| Business | $19 / user | $19 credits | Pay-as-you-go |
| Enterprise | $39 / user | $39 credits | Pay-as-you-go |

**Every prompt, completion, and agentic tool call consumes tokens — and tokens cost money.**
The 3 habits below can reduce your team's monthly bill by **~27 %** in under 90 minutes.

---

## The 6 Token Optimisation Habits (full list)

| # | Habit | Approx. saving |
|---|-------|---------------|
| 1 | **Point Copilot at the exact file(s)** | ~11% |
| 2 | **Use a smaller / cheaper model** when power isn't needed | ~9% |
| 3 | **Write short, stable instructions** (avoid verbose, chatty prompts) | ~7% |
| 4 | Limit reasoning effort (disable extended thinking for simple tasks) | ~6% |
| 5 | Turn off unused tools in agent mode | ~9% |
| 6 | Open a new chat per task (don't drag irrelevant history) | ~8% |

---

## Mandatory Exercises (90-Minute Core)

> Habits 1, 2, and 3 deliver the highest return for the least effort. This session covers them in depth, then combines all six in a timed challenge.

| # | Exercise | Path | Time | Habit | Saving |
|---|----------|------|------|-------|--------|
| 00 | Setup & Baseline | [exercise-00-setup.md](workshop/exercises/exercise-00-setup.md) | 10 min | All | — |
| 01 | File Context | [exercise-01-file-context.md](workshop/exercises/exercise-01-file-context.md) | 15 min | Habit 1 | ~11% |
| 02 | Model Selection | [exercise-02-model-selection.md](workshop/exercises/exercise-02-model-selection.md) | 15 min | Habit 2 | ~9% |
| 03 | Stable Instructions | [exercise-03-stable-instructions.md](workshop/exercises/exercise-03-stable-instructions.md) | 15 min | Habit 3 | ~7% |
| 07 | Compound Savings | [exercise-07-compound-savings.md](workshop/exercises/exercise-07-compound-savings.md) | 25 min | All 6 | ~50% |
| — | Debrief & Q&A | — | 10 min | — | — |
| **Total** |  |  | **90 min** |  |  |

---

## Optional / Extended Exercises

If you have more time or want to explore the remaining habits individually:

| # | Exercise | Path | Time | Habit | Theme |
|---|----------|------|------|-------|-------|
| 04 | Reasoning Budget | [exercise-04-reasoning-budget.md](workshop/exercises/exercise-04-reasoning-budget.md) | Self-paced | Habit 4 | Disable extended thinking |
| 05 | Tool Pruning | [exercise-05-tool-pruning.md](workshop/exercises/exercise-05-tool-pruning.md) | Self-paced | Habit 5 | Turn off unused agent tools |
| 06 | Fresh Chat | [exercise-06-fresh-chat.md](workshop/exercises/exercise-06-fresh-chat.md) | Self-paced | Habit 6 | New chat, clean context |
| 08 | Measuring Impact | [exercise-08-measuring-impact.md](workshop/exercises/exercise-08-measuring-impact.md) | Self-paced | Metrics | Reading the UBB dashboard |
| 09 | Team Policy | [exercise-09-team-policy.md](workshop/exercises/exercise-09-team-policy.md) | Self-paced | Process | Writing a team token budget policy |
| 10 | Capstone | [exercise-10-capstone.md](workshop/exercises/exercise-10-capstone.md) | Self-paced | All | Full end-to-end optimised feature build |

---

## Prerequisites
- VS Code with the **GitHub Copilot** extension (v1.250+)
- GitHub account on a Copilot Pro, Business, or Enterprise plan
- Node.js 18+ and npm
- Clone this repo and run `npm install` inside `future-you-simulator/`

---

<!--## Facilitator Notes
- **Keep energy up:** exercises 01–03 are ~15 min each; move on even if attendees haven't finished — they can catch up later
- **Timebox exercise 07** strictly at 25 min — it's the payoff moment
- Token counts are recorded manually; ask attendees to have the Output panel open (`View → Output → GitHub Copilot`) before each exercise
- Exercises 04–06 can be assigned as take-home practice
-->

**Next:** [Exercise 00 — Environment Setup & Baseline Measurement](workshop/exercises/exercise-00-setup.md)


