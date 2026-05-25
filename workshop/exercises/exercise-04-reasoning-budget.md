# Exercise 04 — Limit Reasoning Effort

**Duration:** 15 minutes  
**Habit:** #4 — Limit reasoning effort (disable extended thinking for simple tasks)  
**Potential saving:** ~6%  
**App focus:** `src/utils/progressCalculator.ts`

---

## What is "extended thinking"?

Models like **o1**, **o3**, and **Claude 3.7 Sonnet** have a reasoning mode where they "think step-by-step" internally before responding. This produces a hidden reasoning chain that costs **additional tokens** — sometimes 10–50× the response tokens.

In GitHub Copilot:
- The **o1** model always reasons
- **Claude 3.7 Sonnet** has an explicit "extended thinking" toggle
- **GPT-4.1** does not reason internally — safer default for most tasks

---

## Part A — Classify tasks by reasoning need

| Task | Reasoning needed? |
|------|------------------|
| "Rename `skillScore` to `careerScore` throughout the file" | ❌ No |
| "Design a new multi-dimensional scoring model that accounts for personality type" | ✅ Yes |
| "Add a null check before accessing `profile.goals[0]`" | ❌ No |
| "Explain why my algorithm produces scores above 100 for edge cases and fix it" | ✅ Yes |
| "Convert this `for` loop to `Array.reduce`" | ❌ No |

---

## Part B — The rename test

### With o1 / reasoning model:
1. Switch chat model to **o1** (if available) or note this is the expensive path
2. Attach `src/utils/progressCalculator.ts`
3. Run:

```
Rename skillScore to careerScore everywhere in this file.
```

Record tokens: **Reasoning model: ___________**  
Note: observe the "thinking…" delay — this represents billed reasoning tokens

### With GPT-4.1 mini (no reasoning):
1. Switch to **GPT-4.1 mini**
2. Same file, same prompt
3. Record tokens: **No-reasoning model: ___________**

**The result should be identical. The cost should be dramatically lower.**

---

## Part C — Apply the rename

Apply the rename from Part B. Run `npm run build` to verify the app still compiles.

---

## Part D — When reasoning IS worth it

Still in `progressCalculator.ts`, switch to a capable reasoning model and ask:

```
The current scoring formula caps at 100 but users with many goals and positive habits 
can exceed it. Suggest a mathematically sound normalisation approach that preserves 
relative differences between users while keeping all scores in [0, 100].
```

This is a genuine reasoning task — the extra cost is justified.

---

## The framework

```
Does the task have a single deterministic correct answer?
  → No reasoning. Use mini.

Does the task require trade-off analysis or novel design?
  → Reasoning justified. Use o1/Sonnet.

Are you running this in a CI/agent loop?
  → Almost always no-reasoning. Loops multiply cost.
```

---

## Checkpoint ✓

- [ ] Measured token difference for a rename task (reasoning vs no-reasoning)
- [ ] `skillScore` renamed to `careerScore`, build passes
- [ ] Can identify which tasks justify extended thinking

---

**Next:** [Exercise 05 — Tool Pruning](exercise-05-tool-pruning.md)
