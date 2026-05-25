# Exercise 01 — Point at the Exact File

**Duration:** 15 minutes  
**Habit:** #1 — Point Copilot at the exact file(s)  
**Potential saving:** ~11%  
**App focus:** `src/utils/aiSimulator.ts`

---

## The problem

When you ask Copilot a question without attaching a file, it must infer context from the entire workspace index. That index costs tokens **every single request**.

---

## Part A — Expensive prompt (no file context)

Open Copilot chat. Run:

```
Explain how the AI simulation works in this app and suggest how to add 
a new keyword to the motivation detection.
```

Record tokens: **Without file: ___________**

---

## Part B — Cheap prompt (explicit file context)

1. In VS Code, open `src/utils/aiSimulator.ts`
2. In Copilot chat, click the **paperclip / attach** icon and attach this file
3. Run the **same question** again:

```
Explain how the AI simulation works in this app and suggest how to add 
a new keyword to the motivation detection.
```

Record tokens: **With file: ___________**

**Difference: ___________**

---

## Why this works

When you attach a specific file, Copilot **replaces** the broad workspace scan with a precise, smaller context. The model sees exactly what it needs — nothing more.

```
❌ Broad:  [workspace index 8,000 tokens] + question (50 t) = 8,050 t
✅ Precise: [one file  700 tokens]         + question (50 t) =   750 t
```

---

## Key rules

| Do | Don't |
|----|-------|
| Attach the file you're editing | Say "look through my project" |
| Use `#file:` mentions in VS Code | Open Copilot without any context |
| Ask one thing per file | Dump multiple unrelated files |

---

## Checkpoint ✓

- [ ] Measured token difference with/without file context
- [ ] Token saving recorded

---

**Next:** [Exercise 02 — Model Selection](exercise-02-model-selection.md)
