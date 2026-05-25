# Exercise 03 — Short, Stable Instructions

**Duration:** 15 minutes  
**Habit:** #3 — Write short, stable instructions  
**Potential saving:** ~7%  
**App focus:** `.github/copilot-instructions.md` (create it), `src/components/`

---

## Why instructions cost tokens

Every Copilot request **prepends** your workspace instructions to the model context.  
A 2,000-token instructions file × 100 requests/day = **200,000 extra tokens/day** for one developer.

The fix: keep instructions short, factual, and stable.

---

## Part A — What bad instructions look like

This is a real anti-pattern seen in teams:

```markdown
<!-- ❌ Anti-pattern — 400+ tokens, vague, chatty -->
You are a brilliant and friendly senior software engineer working on our 
amazing app. Please always be helpful, always write clean code, always add 
comments to every function, always think about performance, always consider 
accessibility, always make sure the code is production-ready, always check 
for edge cases, and remember to ask clarifying questions if anything is 
unclear. We value clean code, DRY principles, SOLID principles, and good 
test coverage. The team uses React, TypeScript, and Tailwind CSS.
```

Count the tokens: roughly 130 tokens. Multiply by 1,000 requests = 130,000 wasted tokens.

---

## Part B — Write the optimised instructions file

Create `.github/copilot-instructions.md` in the `future-you-simulator/` folder:

```markdown
---
applyTo: "**"
---
Stack: React 18, TypeScript 5, Tailwind CSS 3, Zustand, Framer Motion, Recharts.
Style: functional components, named exports, no default exports except App.tsx.
State: all state via useStore (Zustand). No prop-drilling.
Types: defined in src/types/index.ts — import from there, never redefine.
Theme: dark-900 bg, neon-purple/cyan/green/pink/yellow accent colours.
No comments unless the logic is non-obvious.
```

This is **43 tokens** vs the 130-token anti-pattern — a **67% reduction** in instruction overhead.

---

## Part C — Measure the overhead

1. **Without** the instructions file, run this in Copilot chat (attach `src/types/index.ts`):

```
Add a `priority: 'low' | 'medium' | 'high'` field to the Goal interface.
```

Record tokens: **Without instructions: ___________**

2. Create the instructions file as shown in Part B  
3. Run the same prompt again

Record tokens: **With optimised instructions: ___________**

> The delta shows the **per-request overhead** of your instructions file.

---

## The golden rules for instructions

| Rule | Reasoning |
|------|-----------|
| Under 100 tokens | Every token is multiplied by request count |
| Only facts, no adjectives | "clean code" wastes tokens, linting enforces it |
| Use `applyTo` patterns | Scope instructions to relevant file types |
| Stable — change < once/month | Unstable instructions break Copilot caching |

---

## Checkpoint ✓

- [ ] `.github/copilot-instructions.md` created (under 100 tokens)
- [ ] Measured overhead difference
- [ ] Copilot suggestions follow the instructions (Tailwind, Zustand, named exports)

---

**Next:** [Exercise 07 — Compound Savings](exercise-07-compound-savings.md)
