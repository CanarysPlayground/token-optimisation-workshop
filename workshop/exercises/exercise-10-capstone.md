# Exercise 10 — Capstone: Build a Full Feature Under Budget

**Duration:** 30 minutes  
**Levers:** All 10  
**Token budget:** ≤ 1,350 total tokens across all steps  
**App focus:** `src/types/index.ts`, `src/store/useStore.ts`, new `DailyIntentions.tsx`, `src/components/Dashboard/Dashboard.tsx`

---

## The challenge

Build the **Daily Intentions** micro-journal feature — a new section where users set three intentions for the day, mark them complete, and see a motivational streak counter — using every lever you've learned.

You must complete all five steps within a combined token budget of **≤ 1,350 tokens**.

---

## Token budget scorecard

| Step | Task | Budget | Actual | Pass? |
|------|------|--------|--------|-------|
| 1 | Plan the feature | 200 | | |
| 2 | Add types | 150 | | |
| 3 | Extend store | 300 | | |
| 4 | Build component | 500 | | |
| 5 | Wire to Dashboard | 200 | | |
| **TOTAL** | | **1,350** | | |

> **Baseline (Exercise 00 approach):** The same feature built without any optimisations typically costs 8,000–12,000 tokens. Your target is a **~90% reduction.**

---

## Pre-flight checklist (complete before starting the timer)

Before Step 1, verify every lever:

| Lever | Check | Done? |
|-------|-------|-------|
| 1. Prompt compression | Every prompt is under 20 words unless spec needed | |
| 2. Language tax | All prompts in English | |
| 3. Context management | Attach only the one relevant file per step | |
| 4. Output control | `Code only, no explanation` in every code prompt | |
| 5. Workflow mode | Ask mode for planning, direct prompts for coding (no agent) | |
| 6. Agent configs | `copilot-instructions.md` is active and under 100 tokens | |
| 7. Model routing | Use Sonnet for planning, mini for implementation | |
| 8. AGENTS.md | `AGENTS.md` is lean (signal only, no noise) | |
| 9. MCP tools | Disable all tools not needed for this task | |
| 10. Budget cap | Know your session token limit | |

---

## Step 1 — Plan (budget: 200 tokens)

**Model: Claude Sonnet 4.6** (or mid-tier)  
**Mode: Ask**  
**Context: none (planning only)**

```
Plan only — no code:
Daily Intentions feature: 3 intentions per day, each with text + completed bool.
List: 1) type shape, 2) store fields, 3) component structure, 4) Dashboard integration.
4 bullets. One line each.
```

Record (from Agent Debug Logs → Summary):
- Tokens used: ___________
- Copy the 4-bullet plan here: ___________

---

## Step 2 — Add types (budget: 150 tokens)

**Model: GPT-5 mini** (cheap, deterministic type work)  
**Mode: Ask**  
**Context: `#file:src/types/index.ts` only**

Paste Step 1, bullet 1 as your prompt:
```
Add to src/types/index.ts:
interface DailyIntention { id: string; text: string; completed: boolean; createdAt: string }
Code only.
```

Record (from Agent Debug Logs → Summary): ___________

Apply the generated change to `src/types/index.ts`.

---

## Step 3 — Extend store (budget: 300 tokens)

**Model: GPT-5 mini**  
**Mode: Ask**  
**Context: `#file:src/store/useStore.ts` only**

```
Add to useStore.ts:
- intentions: DailyIntention[] (default [])
- addIntention(text: string): void — pushes { id: Date.now().toString(), text, completed: false, createdAt: new Date().toISOString() }
- toggleIntention(id: string): void — flips completed bool
- clearIntentions(): void — sets intentions to []
Import DailyIntention from '../types'. Code only.
```

Record (from Agent Debug Logs → Summary): ___________

Apply the generated changes to `src/store/useStore.ts`.

---

## Step 4 — Build DailyIntentions component (budget: 500 tokens)

**Model: Claude Sonnet 4.6**  
**Mode: Ask**  
**Context: `#file:src/types/index.ts` and `#file:src/store/useStore.ts` only**

```
Create src/components/DailyIntentions/DailyIntentions.tsx:
- Input + "Add" button (max 3 intentions)
- List of intentions with checkbox to toggle completed
- Completed: line-through text, neon-green checkmark
- Pending: neon-cyan text
- "All done!" message when all 3 completed
- Framer Motion fade-in on mount (opacity 0→1, 0.4s)
- Uses useStore for intentions/addIntention/toggleIntention
- Named export. No default export. Code only.
```

Record (from Agent Debug Logs → Summary): ___________

Apply the generated component — create `src/components/DailyIntentions/DailyIntentions.tsx`.

---

## Step 5 — Wire to Dashboard (budget: 200 tokens)

**Model: GPT-5 mini**  
**Mode: Ask**  
**Context: `#file:src/components/Dashboard/Dashboard.tsx` only**

```
Import and render <DailyIntentions /> in Dashboard.tsx after the first section. 
Show import statement + insertion point. Code only.
```

Record (from Agent Debug Logs → Summary): ___________

Apply the import and JSX addition to `src/components/Dashboard/Dashboard.tsx`.

---

## Verify the feature

Run the app:
```bash
cd future-you-simulator && npm run dev
```

- [ ] App loads without TypeScript errors
- [ ] Can add up to 3 intentions
- [ ] Can mark intentions complete (line-through, green checkmark)
- [ ] "All done!" message appears when all 3 complete
- [ ] Component fades in on mount

---

## Final scorecard

| Step | Budget | Actual | Pass? |
|------|--------|--------|-------|
| 1 — Plan | 200 | | |
| 2 — Types | 150 | | |
| 3 — Store | 300 | | |
| 4 — Component | 500 | | |
| 5 — Wire | 200 | | |
| **TOTAL** | **1,350** | | |

**Baseline (Exercise 00):** ~8,000–12,000 tokens  
**Your total:** ___________  
**Saving:** ___________% reduction

> **What this means in practice:** If your team runs 50 similar feature tasks per month per developer, the difference between unoptimised and optimised is 50 × (~10,000 − 1,350) = **432,500 fewer tokens per developer per month**. At Claude Sonnet output rates, that is approximately **$6.50/developer/month** saved from prompt discipline alone — with zero change to how the code works.

---

## Retrospective

Answer in one sentence each:

1. Which single lever gave you the biggest single saving?
2. Which lever was hardest to apply consistently?
3. What would you add to the team's `copilot-instructions.md` based on today?
4. What is one thing you will change in your daily Copilot workflow starting tomorrow?

---

## Full workshop summary — the 10 levers

| # | Lever | Saving |
|---|-------|--------|
| 1 | Prompt Compression | 30–50% input |
| 2 | Language Tax | Up to 2× (non-EN Anthropic) |
| 3 | Context Management | 30–90% input |
| 4 | Output Control | **60–80% output — highest ROI** |
| 5 | Workflow Modes | 5×–25× per task |
| 6 | Agent Configs | 15–25% per turn |
| 7 | Model Routing | 25–55% |
| 8 | AGENTS.md Hygiene | 10–20% per agent session |
| 9 | MCP Tool Pruning | 9–72% schema |
| 10 | Enterprise Guardrails | Prevents runaway spend |

> **The compounding effect:** Apply all 10 levers on the same task and the saving is multiplicative, not additive. A well-optimised team can reduce token spend by **90%+** vs an unoptimised baseline.

---

## Checkpoint ✓

- [ ] Completed all 5 steps within 1,350 token budget
- [ ] Daily Intentions feature works in the app
- [ ] Completed final scorecard with baseline comparison
- [ ] Answered all 4 retrospective questions
- [ ] Ready to apply all 10 levers in daily work

---

**Workshop complete.** Return to [workshop2 README](../README.md) to review the full exercise map and scoreboard.
