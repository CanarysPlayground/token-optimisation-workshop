# Exercise 12 — Scoped Instruction Files for UBB Savings

> **OPTIONAL** — This exercise is outside the 90-minute core agenda. Complete it if you have extra time or as take-home practice.

**Duration:** 20 minutes  
**Habit:** Write short, stable instruction files scoped to your codebase  
**Potential saving:** ~7–12% per request (multiplied across the whole team)  
**App focus:** `future-you-simulator/` — the full repo

---

## What instruction files do to your token bill

Every time you send a Copilot request, VS Code prepends your `copilot-instructions.md` to the model context. That file is injected **on every single request** — completions, chat, agent mode — for every developer on the team.

```
100 tokens of instructions × 200 requests/day × 5 developers = 100,000 tokens/day
```

Cutting your instructions from 300 tokens to 50 tokens saves **50,000 tokens/day** at zero cost to quality.

---

## Part A — Audit what you have now

Open `.github/copilot-instructions.md` in `future-you-simulator/` (or check if it exists).

If it doesn't exist yet, Copilot is inferring context from the workspace on every request — even more expensive.

**Current instruction token count (estimate or measure): ___________**

> **How to count:** Paste your instructions into [platform.openai.com/tokenizer](https://platform.openai.com/tokenizer) or ask Copilot: `How many tokens is this text?`

---

## Part B — Anti-pattern vs optimised pattern

### ❌ Anti-pattern (found in many real teams)

```markdown
You are a senior React developer helping our team. Always write clean, 
readable, well-commented code. Make sure to follow best practices for 
React hooks. Always add PropTypes or TypeScript types. Think carefully 
before answering and ask clarifying questions if anything is unclear. 
Our app uses React, TypeScript, Tailwind CSS, Zustand for state management, 
Framer Motion for animations, and Recharts for data visualisation. 
Please ensure all components are accessible and follow WCAG guidelines.
Always add error boundaries where appropriate.
```

Token count: **~130 tokens** — injected on every request.

### ✅ Optimised version for Future You Simulator

```markdown
---
applyTo: "**"
---
Stack: React 18, TypeScript 5, Tailwind CSS 3, Zustand, Framer Motion, Recharts.
Style: functional components, named exports only (except App.tsx).
State: all state via useStore (src/store/useStore.ts). No local state for shared data.
Types: always import from src/types/index.ts — never redefine inline.
Theme: bg-dark-900, accents neon-purple / cyan / green / pink / yellow.
No comments unless logic is non-obvious. No PropTypes.
```

Token count: **~55 tokens** — a **58% reduction** with identical guidance.

---

## Part C — Create / update the instruction file

1. Create or open `future-you-simulator/.github/copilot-instructions.md`
2. Replace any existing content with the optimised version above
3. Count the tokens: **New count: ___________**

---

## Part D — Measure the per-request saving

### Without the instruction file (or with the verbose one):

Open a fresh Copilot chat, attach `src/components/GamifiedGrowth/GamifiedGrowth.tsx`, and ask:

```
Add a new badge called "Streak Starter" that is awarded when streakDays 
reaches 3. Show only the changed code.
```

Open the debug log (Ctrl+Shift+P → `GitHub Copilot: Open Debug Log`) and record:

**`prompt_tokens` without optimised instructions: ___________**

### With the optimised instruction file:

Ensure `.github/copilot-instructions.md` has the optimised content. Run the **same prompt** again in a fresh chat.

**`prompt_tokens` with optimised instructions: ___________**

**Delta per request: ___________**  
**Projected daily saving (×200 requests): ___________**

---

## Part E — Scope instructions to file type with `applyTo`

For a larger project you can have **different instruction files for different file types**, each loaded only when relevant:

```markdown
<!-- .github/copilot-instructions.md — applies to all files -->
Stack: React 18, TypeScript 5, Tailwind 3, Zustand, Framer Motion.

<!-- .github/instructions/tests.instructions.md — applyTo: **/*.test.ts -->
Testing: Vitest + React Testing Library. No enzyme. Prefer userEvent over fireEvent.
Mocks: vi.mock() only at module level. No inline jest.fn().

<!-- .github/instructions/styles.instructions.md — applyTo: **/*.css -->
Tailwind only. No custom CSS unless animating with @keyframes.
```

**Task:** Create `future-you-simulator/.github/instructions/store.instructions.md` scoped to `src/store/**`:

```markdown
---
applyTo: "src/store/**"
---
Zustand store pattern: all actions inside the set() callback.
Always use immer-style updates for nested objects.
Never expose raw setState — wrap in named action functions.
Persist key: "future-you-store". Do not add new persist keys.
```

Verify it loads by attaching `src/store/useStore.ts` and asking Copilot to add an action — check that it follows the store pattern.

---

## Key rules

| Rule | Why |
|------|-----|
| Keep root instructions under 60 tokens | Multiplied by every request, every developer |
| Only facts — no adjectives or style advice | "clean code" wastes tokens; linting enforces it |
| Use `applyTo` to scope large projects | Avoids sending test instructions on component edits |
| Treat the file like code — review it in PRs | Unreviewed bloat creeps in silently |

---

## Checkpoint ✓

- [ ] `.github/copilot-instructions.md` exists and is under 60 tokens
- [ ] `prompt_tokens` delta measured and recorded
- [ ] Scoped `store.instructions.md` created
- [ ] Copilot completions still match app style (Zustand, named exports, dark theme)

---

**Related:** [Exercise 03 — Stable Instructions](exercise-03-stable-instructions.md) | [Exercise 13 — Prompt Files](exercise-13-prompt-files.md)
