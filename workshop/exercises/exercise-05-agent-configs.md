# Exercise 05 — Agent Configs: Custom Agents, Skills & Subagents

**Duration:** 25 minutes  
**Lever:** 6 (Agent Configs)  
**Potential saving:** 15–25% per turn; 10× saving on deep sub-tasks  
**App focus:** `.github/copilot-instructions.md`, `.github/`, `src/`

---

## What agent configs control

| Config type | File location | Loads when | Token cost |
|-------------|--------------|-----------|-----------|
| Persistent instructions | `.github/copilot-instructions.md` | Every request | Low if < 100t |
| Scoped instructions | `.github/instructions/*.instructions.md` | Matching `applyTo` path | Zero when not matched |
| Custom agent | `.github/agents/*.agent.md` | User selects agent | Replaces default system |
| Skill | `.github/skills/*.skill.md` | Explicitly invoked | On-demand |

> **Goal:** Replace bloated default context with lean, targeted configs. Every token in a persistent instruction is paid on every single request.

---

## Part A — Measure and trim `copilot-instructions.md`

Your instructions file from Exercise 03 should already be optimised. Confirm it is under **100 tokens**.

1. Open `.github/copilot-instructions.md` (inside `future-you-simulator/`)
2. Copy the contents to the tokenizer: https://platform.openai.com/tokenizer
3. Count: **Current instructions tokens: ___________**

If over 100 tokens, identify what to cut:

| Section | Keep? | Reason |
|---------|-------|--------|
| Stack (React, TS, Tailwind, Zustand) | ✅ Only if Copilot doesn't auto-detect | Low token, high precision |
| Architectural rules (no prop-drilling, named exports) | ✅ Yes | Copilot doesn't infer this |
| Type import convention | ✅ Yes | Precise, never inferred |
| Output constraint ("Code only") | ✅ Yes | Highest ROI line in the file |
| "Always write clean code" | ❌ Remove | Zero information — model ignores |
| "You are a helpful expert" | ❌ Remove | Role-playing adds no value |
| File structure description | ❌ Remove | Copilot reads the tree itself |

---

## Part B — Create a scoped instruction for components

Create `.github/instructions/components.instructions.md` inside `future-you-simulator/`:

```markdown
---
applyTo: "src/components/**"
---
All components: use Framer Motion for enter animations (initial opacity 0, animate opacity 1, duration 0.4).
Export as: export function ComponentName() — no default exports.
Import Framer Motion as: import { motion } from 'framer-motion'.
```

Test it:
1. Open `src/components/AlternateReality/AlternateReality.tsx` — ask a question
2. Check the Output panel: do you see the components instruction loaded?
3. Open `src/utils/aiSimulator.ts` — ask a question
4. Confirm the components instruction is NOT loaded

Test the following implementation request:
```
#.github/instructions/components.instructions.md Create a neon glassmorphism ProfilePopup component (fixed top-right, w-80) showing profile name/age, XP bar, top 3 goals, 1yr projection scores, 5yr delta, and badges from useStore. Dismiss on outside click, Escape, or ✕. Wire it to the navbar avatar button.

**Count tokens: ___________**
---

## Part C — Create a custom agent for TDD red-green workflow

Create `.github/agents/tdd-red.agent.md` inside `future-you-simulator/`:

```markdown
---
name: tdd-red
description: Write failing tests first. Do NOT write implementation code.
tools:
  - read_file
  - create_file
---
You are a TDD test author. Your only job is to write failing tests.
Rules:
- Write the test file only. Never write the implementation.
- Use Vitest and React Testing Library.
- Each test should fail because the feature doesn't exist yet.
- Test file goes in src/components/__tests__/ or src/utils/__tests__/.
- Output: test file code only. No explanation.
```

Use this agent to write a failing test for `addMotivationKeyword` (from Exercise 01):

Open a new chat, select the **tdd-red** agent, and run:
```
Write failing tests for: addMotivationKeyword(keyword: string): void
File: src/utils/aiSimulator.ts
```

Record (from Agent Debug Logs → Summary): **Custom agent (tdd-red): ___________**

Record (from Agent Debug Logs → Summary) with default agent: **Default agent: ___________**

> Custom agents reduce token cost by replacing the full default system prompt with a minimal, task-specific one.

---

## Part D — Understand subagent context isolation

Subagents (invoked via `runSubagent` in agent configs) allow you to offload a sub-task to a fresh context window.

**Without subagents (30-turn session, 5 files each turn):**
```
30 turns × 5 file reads × ~1,000t each = 150,000 tokens
```

**With subagents (main agent delegates sub-task):**
```
Main agent (light context) + Subagent starts fresh
= ~5 file reads × 1,000t each = 5,000 tokens
= 10× saving on that portion
```

Create `.github/agents/component-builder.agent.md` inside `future-you-simulator/`:

```markdown
---
name: component-builder
description: Builds a single new React component from a spec. Isolated context.
tools: [read_file,create_file]
---
You build one React component per invocation. Context is scoped to that component only.
Rules:
- Read only the files listed in the task.
- Create the component in the specified file path.
- Use the project's Tailwind dark-theme classes.
- Output: component code only. No explanation.
```

---

## Part E — Audit your agent configs

Run a fresh chat and ask:

```
List all files in .github/ recursively. One path per line.
```

For each config file found:

| File | Purpose | Token count | Keep / Trim / Delete |
|------|---------|------------|----------------------|
| | | | |
| | | | |

> **Principle:** If a config file is loaded on every request but only relevant 10% of the time, it is pure waste 90% of the time. Move it to a scoped instruction or on-demand skill.

---

## Checkpoint ✓

- [ ] `copilot-instructions.md` is under 100 tokens
- [ ] Created `components.instructions.md` with `applyTo` scoping
- [ ] Created `tdd-red.agent.md` custom agent
- [ ] Measured custom agent vs default agent token cost
- [ ] Understand subagent context isolation (30-turn → 5-turn example)
- [ ] Audited all `.github/` config files

---

**Next:** [Exercise 06 — Model Routing & Reasoning Budget](exercise-06-model-routing.md)
