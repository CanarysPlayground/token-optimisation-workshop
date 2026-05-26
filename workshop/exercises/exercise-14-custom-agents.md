# Exercise 14 — Custom Agents for Scoped, Repeatable Workflows

> **OPTIONAL** — This exercise is outside the 90-minute core agenda. Complete it if you have extra time or as take-home practice.

**Duration:** 30 minutes  
**Habit:** Define purpose-built agents — lock model + tools + context once, reuse forever  
**Potential saving:** ~30–50% vs default agent on targeted workflows  
**App focus:** `future-you-simulator/` — component builder, store maintainer, badge engineer

---

## Why the default agent is expensive for focused work

The default Copilot agent loads:
- All enabled MCP tools (~800–12,000 tokens overhead)
- Full workspace index when no file is attached
- Whatever model was last selected
- No domain knowledge about your app

Every developer re-types context, attaches files manually, and switches models on each task. A **custom agent** (`.github/agents/<name>.agent.md`) encodes all of that once.

```
Default agent on a component task:
  Tool injection:     ~2,400 tokens (30 MCP tools × 80 t)
  Workspace index:    ~3,000 tokens (no file pinned)
  Manual context:     ~80  tokens (re-typed each time)
  Total overhead:     ~5,480 tokens

Custom agent (future-you-component-builder):
  Tool injection:     ~160 tokens (edit_file + read_file only)
  Pinned context:     ~55  tokens (instruction file content)
  Manual context:     ~15  tokens (task-specific only)
  Total overhead:     ~230 tokens   →  96% lower overhead
```

---

## How custom agents work in VS Code

1. Create `.github/agents/<name>.agent.md`
2. The frontmatter sets: `model`, `tools`, and `description`
3. The body is the agent's system prompt — loaded once per session
4. In Copilot chat, switch to **Agent mode**, then select your custom agent from the mode dropdown

---

## Part A — Create the `future-you-component-builder` agent

Create `.github/agents/future-you-component-builder.agent.md` inside `future-you-simulator/`:

```markdown
---
description: Scaffold new UI components for Future You Simulator. Locks to mini model, edit+read tools only.
model: gpt-4.1-mini
tools:
  - read_file
  - edit_file
  - file_search
---
You are a component builder for the Future You Simulator — a React 18 + TypeScript 5 + Tailwind CSS 3 app.

App context (do not re-ask for this):
- State: all shared state lives in src/store/useStore.ts (Zustand)
- Types: defined in src/types/index.ts — import, never redefine
- Theme: bg-dark-900 background; glassmorphism cards use bg-dark-800/80 backdrop-blur-sm border border-white/10 rounded-2xl p-6
- Neon accents: purple (#a855f7), cyan (#06b6d4), green (#22c55e), pink (#ec4899), yellow (#eab308)
- Animations: Framer Motion — use motion.div with initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
- Exports: named exports only. No default exports except App.tsx
- No comments unless logic is non-obvious

When asked to create a component:
1. Read the types file to understand available interfaces
2. Read useStore.ts to find relevant state/actions
3. Write the component file to src/components/<Name>/<Name>.tsx
4. Report only: file path created + any new imports needed
```

---

## Part B — Use the agent and measure overhead

### Step 1 — Baseline: same task with the default agent

Switch to **default agent mode** (all tools, no custom agent). Run:

```
Create a HabitHeatmap component that shows a 7×4 grid (7 days × 4 weeks) 
of coloured squares representing habit completion. Each cell is either 
neon-green (completed) or dark-700 (missed). Get the data from useStore.
Place it in src/components/HabitHeatmap/HabitHeatmap.tsx.
```

Open the debug log. Record:

| Metric | Default agent |
|--------|--------------|
| `prompt_tokens` | |
| `cached_tokens` | |
| `completion_tokens` | |
| Tool calls made | |

### Step 2 — Same task with the custom agent

Switch to **`future-you-component-builder`** agent mode. Run the **same prompt**.

| Metric | Custom agent |
|--------|-------------|
| `prompt_tokens` | |
| `cached_tokens` | |
| `completion_tokens` | |
| Tool calls made | |

**Token reduction: ___________**  
**Quality comparison:** Was the output the same? Better? Worse?

---

## Part C — Create the `future-you-store-maintainer` agent

Create `.github/agents/future-you-store-maintainer.agent.md`:

```markdown
---
description: Add or modify state and actions in the Zustand store. Reads types + store, applies minimal changes.
model: gpt-4.1-mini
tools:
  - read_file
  - edit_file
---
You maintain the Zustand store for the Future You Simulator.

Files you work with (always read before editing):
- src/store/useStore.ts  — the store
- src/types/index.ts     — all TypeScript interfaces

Store rules (never violate):
- All actions inside set() callback — no external set() calls
- New state fields require a matching type update in index.ts
- Nested object updates must spread the parent object
- Persist key is "future-you-store" — immutable
- Never remove or rename existing fields/actions

Output format: show only changed lines with ±diff markers. Do not show unchanged code.
```

**Task:** Use this agent to add a `notesEnabled: boolean` toggle to the store (default `true`) with a `toggleNotes()` action.

Record `prompt_tokens`: ___________

---

## Part D — Create the `future-you-badge-engineer` agent

Create `.github/agents/future-you-badge-engineer.agent.md`:

```markdown
---
description: Add new achievement badges to the Future You Simulator reward system.
model: gpt-4.1-mini
tools:
  - read_file
  - edit_file
---
You add badges to the Future You Simulator.

Badge system (read before editing):
- File: src/utils/progressCalculator.ts — function generateBadges(profile)
- Badge shape: { id: string, name: string, description: string, icon: string (emoji), earned: boolean }
- Condition: based on fields in UserProfile (src/types/index.ts)
- Badges stored in Zustand under badges: Badge[]

When adding a badge:
1. Read src/types/index.ts to understand UserProfile fields
2. Read src/utils/progressCalculator.ts to see existing badges
3. Add the new badge object and its earned condition inside generateBadges()
4. Do not touch existing badges
5. Respond with only the new code block to insert
```

**Task:** Use this agent to add a **"Vision Board"** badge — awarded when the user has at least 2 goals with a `targetDate` set.

Record `prompt_tokens`: ___________

---

## Part E — Compound saving: agents + prompt files + instructions

The maximum saving comes from combining all three techniques:

```
Request flow:
  User types:         #add-component  HabitStreak card, neon-green  (8 tokens)
  Prompt file adds:   ~50 tokens of structured task context
  Agent adds:         ~55 tokens of app knowledge (instead of re-typing)
  Tools loaded:       3 tools × 80t = 240 tokens (instead of 30 tools × 2,400t)
  
  Total input:        ~353 tokens

  vs default agent with manual context:
  Tools loaded:       ~2,400 tokens
  Workspace index:    ~3,000 tokens  
  Manual context:     ~80 tokens
  Total input:        ~5,480 tokens

  Saving:  ~94%
```

**Task:** Complete one final component addition using **all three together**:

1. Switch to `future-you-component-builder` agent
2. Type `#add-component` in the chat  
3. Type only: `WeeklyGoalProgress — horizontal progress bars for each goal's weekly progress. Neon-cyan.`
4. Record `prompt_tokens`: ___________

Compare to the raw baseline from Exercise 00. Calculate your total saving.

---

## Agent design principles

| Principle | Reasoning |
|-----------|-----------|
| One agent per concern | A broad agent re-loads all context; a focused agent loads only what's relevant |
| Lock the model in frontmatter | Prevents accidental large-model use on simple tasks |
| List only needed tools | Each extra tool = ~80 tokens overhead per request |
| Put domain facts in the body, not instructions | Instructions file is global; agent body is task-scoped |
| Keep agent body under 150 tokens | It's injected on every turn of the agent session |
| Add `description:` — it shows in the VS Code picker | Helps the team find the right agent without guessing |

---

## Team rollout checklist

When rolling out custom agents to a team:

- [ ] Store agent files in `.github/agents/` (committed to the repo)
- [ ] Add agent descriptions that explain the scope clearly
- [ ] Pin model versions to avoid unintended upgrades
- [ ] Review agent files in PRs — they affect token cost for every developer
- [ ] Pair with prompt files (Exercise 13) for maximum saving on recurring tasks
- [ ] Document which agent to use for which task in the repo README

---

## Checkpoint ✓

- [ ] `future-you-component-builder.agent.md` created and tested
- [ ] `future-you-store-maintainer.agent.md` created and `notesEnabled` added
- [ ] `future-you-badge-engineer.agent.md` created and "Vision Board" badge added
- [ ] Token overhead comparison recorded (default vs custom agent)
- [ ] All three changes compile (`npm run build` passes)
- [ ] Compound saving calculated using all three techniques

---

**Related:** [Exercise 12 — Instruction Files](exercise-12-instruction-files.md) | [Exercise 13 — Prompt Files](exercise-13-prompt-files.md) | [Exercise 05 — Tool Pruning](exercise-05-tool-pruning.md)
