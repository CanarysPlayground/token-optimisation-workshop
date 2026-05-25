# Exercise 05 — Turn Off Unused Tools

> **OPTIONAL** — This exercise is outside the 90-minute core agenda. Complete it if you have extra time or as take-home practice.

**Duration:** 20 minutes  
**Habit:** #5 — Turn off unused tools in agent mode  
**Potential saving:** ~9%  
**App focus:** `src/components/DecisionSimulator/DecisionSimulator.tsx`

---

## Why unused tools cost money

When Copilot runs in **agent mode**, it sends a list of available tools (file system, terminal, browser, etc.) to the model as part of every request. Each tool description consumes tokens — even if you never use it.

A typical full agent tool list = **~800 tokens overhead per request**.

---

## Part A — Observe agent mode with all tools

1. Open Copilot chat, switch to **Agent mode** (the mode selector in the chat header)
2. Do **not** disable any tools yet
3. Attach `src/components/DecisionSimulator/DecisionSimulator.tsx`
4. Ask:

```
Add a "Reset" button to the DecisionSimulator that clears the current 
analysis result and returns the input to empty.
```

Record tokens: **All tools enabled: ___________**

---

## Part B — Minimal tool set for a code edit

For a targeted code edit you only need:
- **Edit files** (write the code)
- **Read files** (understand context)

You do NOT need: web search, terminal, browser tools, notebook tools, GitHub PR tools, Azure tools.

1. In agent mode, click **"Configure tools"** (gear icon or tool list)
2. **Disable** everything except: `edit_file`, `read_file`, `file_search`
3. Run the **same prompt** again (first undo your previous change):

```
Add a "Reset" button to the DecisionSimulator that clears the current 
analysis result and returns the input to empty.
```

Record tokens: **Minimal tools: ___________**

**Difference: ___________**

---

## Part C — Apply and test

Apply the Reset button change. The button should:
- Clear `analysis` state to `null`
- Clear the `question` input to `''`
- Appear only when there is an active analysis

Run `npm run dev` and test the Reset button in the browser.

---

## Part D — Tool sets for common tasks

Create a mental "tool loadout" for each scenario:

| Scenario | Tools to keep |
|----------|--------------|
| Pure code edit in one file | `edit_file`, `read_file` |
| Multi-file refactor | `edit_file`, `read_file`, `file_search`, `grep_search` |
| Debug a runtime error | `read_file`, `run_in_terminal`, `get_errors` |
| Deploy to Azure | Azure tools, `run_in_terminal` |
| Generate documentation | `read_file`, `edit_file` |

> **Pro tip:** In VS Code you can save tool configurations as named presets — check Settings → Copilot → Agent Tools.

---

## The bigger picture

In a team of 20 developers each making 50 agent requests/day:

```
20 × 50 × 800 excess tool tokens = 800,000 tokens/day wasted
                                 ≈ $2.40/day at GPT-4o pricing
                                 ≈ $720/year on tool list overhead alone
```

---

## Checkpoint ✓

- [ ] Measured token difference with all tools vs minimal tools
- [ ] Reset button added to DecisionSimulator and working in browser
- [ ] Understand how to configure tool subsets in agent mode

---

**Next:** [Exercise 06 — Fresh Chat](exercise-06-fresh-chat.md)
