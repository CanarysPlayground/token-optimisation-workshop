# Exercise 02 — Use the Right Model

**Duration:** 15 minutes  
**Habit:** #2 — Use a smaller / cheaper model when power isn't needed  
**Potential saving:** ~9%  
**App focus:** `src/types/index.ts`

---

## The model cost ladder (GitHub Copilot, 2025–2026)

| Model | Best for | Relative cost |
|-------|----------|--------------|
| GPT-4.1 mini / o4-mini | Simple edits, completions, type fixes | Low |
| GPT-4.1 | Standard features, explanations | Medium |
| GPT-4o / Claude Sonnet | Complex reasoning, multi-file refactors | High |
| o1 / Claude Opus | Deep research, novel algorithm design | Very high |

> **Rule of thumb:** If a junior dev could answer the question in 10 seconds, a mini model can too.

---

## Part B — Simple edit, small model

1. In VS Code, switch Copilot chat model to **GPT-4.1 mini** (dropdown in the chat header)
2. Attach `src/types/index.ts`
3. Run:

```
Add a createdAt: Date field to the Goal interface. Show only the changed interface.
```

Record tokens: **Mini model: ___________**

4. Switch to **GPT-4o**
5. Run the same prompt again

Record tokens: **Large model: ___________**

**Difference: ___________**

---

## Decision framework

```
Is the task deterministic / syntactic? (type add, rename, import fix)
  → Use mini model + file attachment

Does it require reasoning across trade-offs?
  → Use mid model (GPT-4.1 / Sonnet)

Does it require novel design or research?
  → Use large model, but ONLY after the smaller ones failed
```

---

## Checkpoint ✓

- [ ] Measured token difference between mini and large on a simple task
- [ ] Can articulate when NOT to use a large model

---

**Next:** [Exercise 03 — Stable Instructions](exercise-03-stable-instructions.md)
