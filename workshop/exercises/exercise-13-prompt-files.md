# Exercise 13 — Reusable Prompt Files for Recurring Tasks

> **OPTIONAL** — This exercise is outside the 90-minute core agenda. Complete it if you have extra time or as take-home practice.

**Duration:** 25 minutes  
**Habit:** Encode recurring task context once — reference it instead of retyping  
**Potential saving:** ~20–40% on repeated task types (prompt files eliminate re-typed context)  
**App focus:** `future-you-simulator/` — adding components, badges, store actions, and challenges

---

## The problem: copy-paste context is expensive

Every time a developer adds a new component to the Future You Simulator, they type (or forget) the same context:

```
"Use the glassmorphism card style with bg-dark-800/80, add a neon accent, 
import state from useStore, use named exports, no PropTypes..."
```

That's ~60 tokens of context typed manually, often inconsistently, on every similar task. Multiply by a team of 5 doing 3 tasks each per day = **900 wasted context tokens/day**.

**Prompt files** (`.github/prompts/*.prompt.md`) let you encode that context once, then reference it with a single `#` mention — VS Code injects the whole file as structured context.

---

## How prompt files work in VS Code

1. Create a file at `.github/prompts/<name>.prompt.md`
2. In Copilot chat, type `#` and select the prompt file from the dropdown
3. VS Code inserts its full content as a structured context block before your message
4. The model receives rich, consistent context — you type only the task-specific part

```
Without prompt file:   "Add a component that shows X. Use glassmorphism style, Zustand, 
                         named export, neon-cyan, dark-800/80 background..." (80 tokens)

With prompt file:      #add-component  Add a component that shows X.  (12 tokens)
                        ↑ VS Code injects the full context automatically
```

---

## Part A — Create the `add-component` prompt file

Create `.github/prompts/add-component.prompt.md` inside `future-you-simulator/`:

```markdown
---
mode: ask
description: Scaffold a new UI component for Future You Simulator
---
Create a new React functional component for the Future You Simulator app.

Requirements:
- Named export (not default)
- Props typed with a TypeScript interface defined in the same file
- State from `useStore` (src/store/useStore.ts) — no local state for shared data
- Tailwind styling: card uses `bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6`
- Neon accent colour: specify in the task (purple | cyan | green | pink | yellow)
- Framer Motion: wrap the card in `<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- No comments unless logic is non-obvious
- Place file in: src/components/<ComponentName>/<ComponentName>.tsx

Respond with only the component file. No explanation.
```

---

## Part B — Use the prompt file (measure token saving)

### Without the prompt file:

Open a fresh Copilot chat. Type the full request manually:

```
Create a new React component for the Future You Simulator. It should be a 
named export, use Zustand from useStore, have a glassmorphism card style with 
bg-dark-800/80 and neon-purple, use Framer Motion fade-in animation, TypeScript 
props interface, and be placed in src/components/MoodTracker/MoodTracker.tsx. 
The component should show today's mood selected from 5 emoji options.
```

Open the debug log and record:

**`prompt_tokens` without prompt file: ___________**

### With the prompt file:

Open a **fresh chat**. In the input box type `#` and select `add-component`. Then type only:

```
MoodTracker — shows today's mood selected from 5 emoji options. Neon-purple accent. 
Place in src/components/MoodTracker/MoodTracker.tsx
```

**`prompt_tokens` with prompt file: ___________**  
**Delta: ___________**

---

## Part C — Create the `add-badge` prompt file

Create `.github/prompts/add-badge.prompt.md`:

```markdown
---
mode: ask
description: Add a new achievement badge to the Future You Simulator
---
Add a new badge to the Future You Simulator.

Context:
- Badges are defined in `src/utils/progressCalculator.ts` inside `generateBadges()`
- Badge shape: `{ id: string, name: string, description: string, icon: string (emoji), earned: boolean }`
- Badges are stored in `useStore` under `badges: Badge[]`
- A badge is earned when its condition (based on `profile` fields) evaluates to true
- Do not modify any existing badge logic

Respond with only the new badge object and the condition check block to add to `generateBadges()`.
Attach `src/utils/progressCalculator.ts` before using this prompt.
```

**Task:** Use `#add-badge` to add a badge called **"Consistent"** — awarded when the user has 3 or more habits defined.

1. Attach `src/utils/progressCalculator.ts`
2. Type `#add-badge` then: `"Consistent" — awarded when the user has 3 or more habits`
3. Apply the change. Record `prompt_tokens`: ___________

---

## Part D — Create the `update-store` prompt file

Create `.github/prompts/update-store.prompt.md`:

```markdown
---
mode: ask
description: Add new state or actions to the Zustand store
---
Update the Zustand store in `src/store/useStore.ts`.

Rules:
- All actions go inside the `set()` callback — never call `set()` outside a method
- For nested object updates, spread the parent: `...state.profile, newField: value`
- New state fields must also be added to the TypeScript interface in `src/types/index.ts`
- Persist key is "future-you-store" — do not change it
- Do not remove or rename any existing state fields or actions
- Show only the changed lines (not the full file)

Always attach both `src/store/useStore.ts` and `src/types/index.ts` before using this prompt.
```

**Task:** Use `#update-store` to add a `lastVisitedView: string` field that tracks which view the user last visited.

---

## Part E — Measure cumulative team impact

If your team runs **10 recurring tasks/day** (adding components, badges, store updates):

| Scenario | Tokens/task | Daily (×10) | Monthly (×20 days) |
|----------|-------------|-------------|-------------------|
| Manual context re-typing | ~80 tokens | 800 | 16,000 |
| With prompt files | ~15 tokens | 150 | 3,000 |
| **Saving** | **~81%** | **650** | **13,000** |

At $0.04 / 1k tokens (Pro overage): **~$0.52 saved per developer per month** — free with the prompt file one-time setup.

---

## Prompt file best practices

| Rule | Why |
|------|-----|
| Keep each prompt file under 200 tokens | It's injected on every use — the same rule as instructions |
| Use `mode: ask` for code generation, `mode: agent` for multi-step tasks | Avoids unnecessary agent overhead for simple edits |
| Include `Respond with only...` | Prevents verbose explanations in the completion |
| Reference file paths explicitly | Prevents the model guessing wrong locations |
| Store in `.github/prompts/` | VS Code picks them up automatically — no config needed |

---

## Checkpoint ✓

- [ ] `add-component.prompt.md` created and tested
- [ ] `add-badge.prompt.md` created and "Consistent" badge added
- [ ] `update-store.prompt.md` created and `lastVisitedView` added
- [ ] Token delta measured and recorded
- [ ] All three changes compile (`npm run build` passes)

---

**Related:** [Exercise 12 — Instruction Files](exercise-12-instruction-files.md) | [Exercise 14 — Custom Agents](exercise-14-custom-agents.md)
