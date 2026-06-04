# Exercise 04 — Workflow Modes: Ask vs Plan vs Agent

**Duration:** 20 minutes  
**Lever:** 5 (Workflow Modes)  
**Potential saving:** 5×–25× per multi-file task  
**App focus:** `src/components/GamifiedGrowth/GamifiedGrowth.tsx`

---

## The three modes and their actual token costs

| Mode | Calls per task | Typical token range | When to use |
|------|---------------|---------------------|-------------|
| **Ask** | 1 | 500–2,000 | Questions, single-file changes, explanations |
| **Plan** | 1–2 | 1,000–4,000 | Multi-file design, review, PR descriptions |
| **Agent** | 5–25 | 15,000–50,000 | Full feature build, automated test runs |

> **Most expensive anti-pattern:** A vague agent prompt like "improve the app" triggers 20+ exploration turns, reads dozens of files, and can spend 100K+ tokens before writing a single line.

---

## Part A — The same task in three modes

You will add a "Streak Freeze" power-up display to `GamifiedGrowth.tsx` using all three modes. Record tokens for each.

### Step 1: Ask mode

Open a fresh chat (not agent mode). Attach `src/components/GamifiedGrowth/GamifiedGrowth.tsx`. Run:

```
Where should I add a streak-freeze power-up display in this component? 
Give me the JSX snippet to insert. One sentence on why that location.
```

Record (from Agent Debug Logs → Summary): **Ask mode: ___________**

This is Ask mode — one call, targeted answer.

---

### Step 2: Plan mode (manual "think first" pattern)

Open a fresh chat. Attach `src/components/GamifiedGrowth/GamifiedGrowth.tsx` AND `src/types/index.ts`. Run:

```
Plan only — no code:
1. What type changes are needed to support a streakFreeze count on a user?
2. Where in GamifiedGrowth should the display go?
3. What styling classes to use (dark theme, neon-purple accent)?
Reply in 3 bullets.
```

Record (from Agent Debug Logs → Summary) — plan call: ___________

Now implement step 2 (the display) using Ask mode with the specific lines from the plan:

```
Add a streak-freeze badge to GamifiedGrowth.tsx after the streak counter. 
Badge shows: "❄️ {streakFreeze}× Freeze". Use neon-purple/20 bg, neon-purple text.
Code only.
```

Record (from Agent Debug Logs → Summary) — execute call: ___________

**Plan + Execute total: ___________**

---

### Step 3: Agent mode — optimised start

Switch to **Agent mode** (the sparkle icon). Run a **scoped** agent prompt:

```
In src/components/GamifiedGrowth/GamifiedGrowth.tsx:
- Add streakFreeze?: number prop (default 0) to the component props
- Render a "❄️ {streakFreeze}× Freeze" badge below the streak counter
- Badge style: bg-neon-purple/20 rounded px-2 py-0.5 text-neon-purple text-sm
- No other files touched
Run: no tests
```

Record (from Agent Debug Logs → Summary): **Agent mode (scoped): ___________**

---

### Comparison table

| Mode | Tokens | Code quality | When justified |
|------|--------|-------------|----------------|
| Ask | | | Single-file / clarification |
| Plan + Execute | | | Multi-file feature |
| Agent (scoped) | | | Automated multi-step sequence |

> **Rule:** Agent mode should only be used when you need tool use (file writes, terminal, tests). For code review or Q&A, Ask mode is always cheaper.

---

## Part B — The anti-pattern that destroys budgets

Run this (then **stop it immediately after the FIRST response** by pressing the stop button):

```
Look at the entire codebase and improve the app. Add missing features.
```

Observe and record:
- Files the agent opened before you stopped it: ___________
- Tool calls made: ___________

> **What you should see:** The agent will typically open 10–20 files (each ~1,000–3,000 tokens) before writing a single line of code. At 15 files = ~30,000 tokens wasted on exploration alone — at Claude Sonnet rates that is ~$0.45 before any code is produced. A scoped prompt for the same feature costs ~2,000 tokens (~$0.03).

> **The fix:** Never use natural language to start an agent task. Always scope it: name the file, name the function, name the acceptance criterion.

---

## Part C — The Research → Plan → Implement workflow

For any multi-file feature, use this three-turn pattern:

**Turn 1 — Research (Ask mode):**
```
#codebase List all files that reference user.streak or streakFreeze. 
One file path per line. No description.
```

**Turn 2 — Plan (Ask mode):**
```
Based on those files, give me a 5-step implementation plan for adding streak-freeze to GamifiedGrowth. 
Steps only, no code.
```

**Turn 3 — Implement (scoped Agent mode):**
```
Implement step 3 from the plan: [paste step 3]. 
Touch only [specific file]. No tests.
```

Compare this total to the all-at-once agent prompt:

| Approach | Token estimate | Quality |
|----------|---------------|---------|
| Vague all-at-once agent | ~50,000 | Unpredictable |
| Research → Plan → Implement | ~8,000 | Controlled |

---

## Part D — Add deterministic gates

Every agent run should have an early-stop condition:

```markdown
# In your agent prompt — always include:
Stop after writing the code. Do not run any other tools.
Acceptance criteria: component renders badge when streakFreeze > 0.
```

This prevents the agent from continuing to "improve" the file after the task is done, which would cost thousands of extra tokens.

---

## Checkpoint ✓

- [ ] Measured Ask vs Plan+Execute vs Agent (scoped) for same task
- [ ] Observed vague agent prompt explosion (and stopped it)
- [ ] Understand Research → Plan → Implement 3-turn pattern
- [ ] Added streak-freeze badge to GamifiedGrowth
- [ ] Can articulate when agent mode is and isn't justified

---

**Next:** [Exercise 05 — Agent Configs & Custom Instructions](exercise-05-agent-configs.md)
