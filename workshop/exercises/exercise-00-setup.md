# Exercise 00 — Environment Setup & Baseline Measurement

**Duration:** 15 minutes  
**Habits covered:** All (baseline)  
**Goal:** Get the app running, open Copilot, and record your baseline token spend before applying any optimisations.

---

## 1. Start the app

```bash
cd future-you-simulator
npm install
npm run dev
# → http://localhost:5173
```

Open the app, complete the onboarding (enter your name, age, one goal, one habit), and explore all 6 views.

---

## 2. Enable Copilot token visibility

1. Open VS Code **Settings** (`Ctrl+,`)
2. Search for `copilot usage`
3. Ensure **GitHub Copilot: Show Usage** is enabled
4. Open the **Output** panel → select **GitHub Copilot** channel — you will see token counts per request

> **Tip:** The Copilot status bar item in the bottom-right also shows session totals on hover.

---

## 3. Measure your first "expensive" prompt (baseline)

Open the Copilot chat sidebar (`Ctrl+Shift+I`).

Run **exactly** this prompt as-is — don't optimise it yet:

```
I am working on a React TypeScript application. Can you look through all 
the files in my project and help me understand how the whole app works, 
give me a full summary of every component, every utility, the state management 
approach, and then suggest 5 new features I could add?
```

Record the token count from the Output panel: **Baseline tokens: ___________**

---

## 4. What just happened?

| Issue | Why it wastes tokens |
|-------|---------------------|
| "look through all the files" | Copilot sends the full workspace index to the model |
| "every component, every utility" | Forces a long completion |
| "suggest 5 new features" | A separate unrelated task in the same prompt |
| No file context attached | Model guesses which files matter |

---

## 5. What you'll fix across exercises 01–06

By the end of exercise 06 you'll run an equivalent prompt for **~50 % fewer tokens**.

---

## Checkpoint ✓

- [ ] App runs at localhost:5173
- [ ] Onboarding completed
- [ ] Baseline token count recorded
- [ ] Output panel showing Copilot token data

---

**Next:** [Exercise 01 — File Context](exercise-01-file-context.md)
