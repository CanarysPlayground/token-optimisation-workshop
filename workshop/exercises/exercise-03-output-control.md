# Exercise 03 — Output Control: The Highest-ROI Instruction

**Duration:** 15 minutes  
**Lever:** 4 (Output Control)  
**Potential saving:** 40–90% output tokens — the highest-ROI lever in the entire playbook  
**App focus:** `src/components/Dashboard/Dashboard.tsx`, `.github/copilot-instructions.md`

---

## Why output is the most expensive lane

Output is billed **4×–8× more** than input depending on the model.

```
Claude Sonnet 4.6:  input = $3.00/1M   output = $15.00/1M  → 5× ratio
GPT-5 mini:         input = $0.25/1M   output = $2.00/1M   → 8× ratio
```

**Real cost of leaving output unconstrained:**

| Scenario | Output tokens | Cost per request | 1,100 req/month (50/day) |
|----------|--------------|-----------------|-------------------------|
| Verbose default response | ~500 t | ~$0.0075 | ~$8.25/dev |
| Constrained: one sentence | ~50 t | ~$0.00075 | ~$0.83/dev |
| **Saving per developer** | | **~$7.40/month** | **× team size** |

**One constraint instruction placed in `copilot-instructions.md` permanently cuts 40–70% of output cost per task — for every developer, forever.**

---

## Part A — Measure default output verbosity

### Step 1: No output constraint

Open a fresh chat. Attach `src/components/Dashboard/Dashboard.tsx`. Run:

```
Explain what this component does.
```

Record (from Agent Debug Logs → Summary):
- Total Output Tokens: ___________
- Note how many sentences / paragraphs the response is

---

### Step 2: Same task, output-constrained

Same fresh chat. Attach the same file. Run:

```
Explain what this component does. Answer in one sentence.
```

Record (from Agent Debug Logs → Summary):
- Total Output Tokens: ___________

**Output reduction: ___________% (target: 60–80%)**

---

## Part B — The output constraint instruction table

Test each of these constraints on a small task. Attach `src/types/index.ts` each time.

| Instruction | Prompt | Completion tokens | Use case |
|-------------|--------|-----------------|---------|
| *(none — baseline)* | `Describe the Goal interface.` | | |
| `"Answer in one sentence."` | `Describe the Goal interface. Answer in one sentence.` | | Cap verbosity |
| `"3 bullet points max."` | `List what fields Goal has. 3 bullet points max.` | | Hard item limit |
| `"Reply as JSON."` | `Describe the Goal interface fields. Reply as JSON.` | | Structured output |
| `"Yes or no, then one line why."` | `Does Goal have an id field? Yes or no, then one line why.` | | Quick decisions |
| `"Code only, no explanation."` | `Add a completedAt?: Date field to Goal. Code only.` | | Implementation |

---

## Part C — Write your optimised `copilot-instructions.md`

Create (or update) `.github/copilot-instructions.md` inside `future-you-simulator/`:

```markdown
---
applyTo: "**"
---
Stack: React 18, TypeScript 5, Tailwind CSS 3, Zustand, Framer Motion, Recharts.
Style: functional components, named exports, no default exports except App.tsx.
State: all state via useStore (Zustand + persist). Never prop-drill.
Types: defined in src/types/index.ts — import from there, never redefine inline.
Theme: dark-900 bg, neon-purple/cyan/green/pink/yellow accents.
Code only. No explanation unless asked. No comments unless logic is non-obvious.
```

**Count your tokens** (use https://platform.openai.com/tokenizer): ___________

Target: under **60 tokens**. Every token here is multiplied by every request, every developer, every day.

> **Why these specific lines:** Stack detection (React, TS) is worth keeping because Copilot sometimes misidentifies projects. The Zustand + no-prop-drilling rule saves incorrect code generation. "Code only" is the highest-ROI line — it alone cuts 40–70% of output tokens.

---

### Anti-pattern to avoid

```markdown
<!-- ❌ 130+ tokens — vague adjectives waste money -->
You are a helpful senior engineer. Always write clean code, always add comments,
always check for edge cases, always follow best practices, always think about
performance and accessibility. We use React, TypeScript, and Tailwind CSS.
```

| Version | Tokens | Effect |
|---------|--------|--------|
| Anti-pattern above | ~130 | Vague, ignored by model |
| Your optimised version | | Precise, enforced |

---

## Part D — Measure the instruction overhead

### Without instructions file:

Temporarily delete or rename `.github/copilot-instructions.md`. Attach `src/types/index.ts` and run:

```
Add a priority: 'low' | 'medium' | 'high' field to the Goal interface. Code only.
```

Record (from Agent Debug Logs → Summary): **Without instructions: ___________**

### With optimised instructions file:

Restore the file. Run the same prompt.

Record (from Agent Debug Logs → Summary): **With instructions: ___________**

> The delta shows the **per-request overhead** of your instructions file. Multiply by daily requests to see the monthly impact.

---

## Part E — The trade-off to watch

Output constraints save money but suppress explanation. Apply them selectively:

| Situation | Constraint to use |
|-----------|------------------|
| Implementing known patterns | `"Code only, no explanation."` |
| Debugging unfamiliar code | Ask for explanation explicitly: `"Explain why approach X is better than Y."` |
| Comparing options | `"Table format."` or `"3 bullets max per option."` |
| Quick yes/no decisions | `"Yes or no, then one line why."` |

> **Rule:** Never leave explanation ON by default. Ask for it when you genuinely need it.

---

## Checkpoint ✓

- [ ] Measured baseline vs constrained output (target ≥60% reduction)
- [ ] Tested all 6 constraint instructions
- [ ] `copilot-instructions.md` created and under 60 tokens
- [ ] Measured instruction file overhead
- [ ] Can explain when to override output constraints

---

**Next:** [Exercise 04 — Workflow Modes](exercise-04-workflow-modes.md)
