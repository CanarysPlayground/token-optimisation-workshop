# Exercise 06 — Model Routing & Reasoning Budget

**Duration:** 20 minutes  
**Lever:** 7 (Model Routing & Reasoning)  
**Potential saving:** 25–55% on mixed workloads  
**App focus:** `src/utils/progressCalculator.ts`

---

## The model routing principle

**Not every task needs your most expensive model.** Using a heavy model for routine tasks wastes 2×–20× budget.

### Model routing table

| Task type | Recommended model | Why |
|-----------|------------------|-----|
| Syntax fix, rename, simple refactor | GPT-5 mini / Auto | Fast, 8× cheaper output |
| Day-to-day feature work, Q&A | Claude Sonnet 4.6 | Balanced capability:cost |
| Architecture design, complex multi-file | Claude Sonnet 4.6+ | Reasoning quality matters |
| Critical security review, novel algorithm | Claude Opus 4.7 | Max quality, accept cost |

---

## UBB pricing at a glance

| Model | Input /1M | Output /1M | Relative cost |
|-------|-----------|-----------|--------------|
| GPT-5 mini | $0.25 | $2.00 | **Baseline** |
| GPT-4.1 | $2.00 | $8.00 | ~4× |
| Claude Sonnet 4.6 | $3.00 | $15.00 | ~7× |
| Claude Opus 4.7 | $5.00 | $25.00 | ~12× |

> **The real saving:** routing 70% of daily tasks to a smaller model saves 50–80% of total model cost, with no quality loss on those tasks.

---

## Part A — Route by task type

### Step 1: Syntax fix (→ cheapest model)

In VS Code, select all of `progressCalculator.ts`. Switch the Copilot inline chat model to **GPT-5 mini** (if available) or note your current model. Run:

```
Rename scoreMultiplier → scoreWeight throughout this file. Code only.
```

Record (from Agent Debug Logs → Summary): **Rename on mini: ___________**  
Did it get the rename right? ___________

---

### Step 2: Same rename — expensive model

Switch to **Claude Opus 4.7** or the heaviest available. Run the same prompt.

Record (from Agent Debug Logs → Summary): **Rename on Opus: ___________**

| Task | Mini tokens | Opus tokens | Ratio | Quality difference |
|------|------------|------------|-------|-------------------|
| Rename variable | | | | |

> For a deterministic rename like this, the Opus model gives zero quality improvement over mini. You are paying a **12× premium for identical output**. The rename is either correct or it is not — reasoning depth does not matter.

---

### Step 3: Complex logic — where the heavy model earns it

Attach `src/utils/progressCalculator.ts` and `src/types/index.ts`. Switch to Claude Sonnet 4.6 or Opus. Run:

```
Analyse the progress calculation logic for edge cases: goals with no milestones,
goals past deadline, goals with 0 completedCount. List risks + one-line fix for each.
3 bullets max.
```

Record (from Agent Debug Logs → Summary): **Analysis on heavy model: ___________**

Switch to GPT-5 mini and run the same prompt.

Record (from Agent Debug Logs → Summary): **Analysis on mini: ___________**

Did the mini miss any risks? ___________

> This is where routing decisions matter: don't downgrade tasks that require reasoning.

---

## Part B — Two-stage routing workflow

**Plan heavy → Execute light saves 25–55%.**

**Realistic 10-task day — three routing strategies:**

| Strategy | Token estimate | Cost (Sonnet rates) |
|----------|---------------|---------------------|
| All tasks on Opus | ~100,000 t | ~$1.50 |
| All tasks on Sonnet | ~100,000 t | ~$0.60 |
| 70% mini + 30% Sonnet (mixed) | ~100,000 t | ~$0.27 |

The mixed strategy is **55% cheaper than all-Sonnet** and **82% cheaper than all-Opus**.

### Step 4: Plan with Sonnet, execute with mini

**Plan call (Sonnet) — Attach `src/utils/progressCalculator.ts`:**
```
Plan only — no code:
What 3 changes would make calculateStreak() more accurate for partial-day completions?
Steps only. One line each.
```

Record (from Agent Debug Logs → Summary) — plan call: ___________

**Execute call (mini):**
Switch model to GPT-5 mini. Attach the same file. Paste step 1 from the plan:
```
Implement step 1: [paste step from plan]. Code only, no tests.
```

Record (from Agent Debug Logs → Summary) — execute call: ___________

**Two-stage total vs single all-Opus call: ___________**

---

## Part C — The reasoning depth multiplier

Reasoning models (o1, o3, Claude Sonnet thinking) multiply their effective token cost by the reasoning depth level:

| Reasoning depth | Context multiplier | Use for |
|----------------|-------------------|---------|
| LOW / minimal | 1× | Routine coding, renames, formatting |
| MEDIUM / default | 3×–8× | Day-to-day features, debugging |
| HIGH | 10×–20× | Complex algorithms, design tradeoffs |
| MAX / full reasoning | 50×–80× | Research-grade problems — rare |

### Step 5: Override reasoning depth to "think briefly"

In a chat with a reasoning model (if available), run:

```
Think briefly. Rename calculateStreak → computeStreak in progressCalculator.ts. Code only.
```

vs

```
Calculate an optimal streaking algorithm for irregular time zones, considering DST changes and leap seconds.
```

The first task does not need deep reasoning — "think briefly" saves 60–90% of the reasoning budget for that call.

---

## Part D — Routing decision flowchart

Apply this before every significant request:

```
Is this deterministic? (rename, format, extract)
    ↓ Yes → Use cheapest model
    ↓ No
Is this isolated to one file?
    ↓ Yes → Use mid-tier (Sonnet)
    ↓ No
Does it require design judgement or security review?
    ↓ Yes → Use heavy model (Opus) — justified
    ↓ No → Use mid-tier
```

---

## Checkpoint ✓

- [ ] Measured rename task: mini vs Opus (target 4×–12× ratio)
- [ ] Measured analysis task: did mini miss risks vs heavy model?
- [ ] Calculated two-stage routing saving (25–55% target)
- [ ] Understand reasoning depth multipliers (1× to 80×)
- [ ] Can apply the routing decision flowchart to any task

---

**Next:** [Exercise 07 — AGENTS.md Hygiene & Subagents](exercise-07-agents-md-and-subagents.md)
