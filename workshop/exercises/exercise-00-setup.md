# Exercise 00 — Environment Setup & Baseline Measurement

**Duration:** 10 minutes  
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

Open the app and complete the onboarding (name, age, one goal, one habit).

---

## 2. Enable Copilot token visibility

1. Open the **Output** panel (`Ctrl+Shift+U`) → select **GitHub Copilot** channel
2. You will see token counts per request here throughout the workshop

> **Tip:** The Copilot status bar item (bottom-right) shows session totals on hover.

---

## 3. Record your baseline

Open Copilot chat (`Ctrl+Shift+I`) and run this prompt **as-is**:

```
I am working on a React TypeScript application. Can you look through all 
the files in my project and help me understand how the whole app works, 
give me a full summary of every component, every utility, the state management 
approach, and then suggest 5 new features I could add?
```



**Baseline tokens: ___________**

This prompt is intentionally wasteful — you'll cut it by ~50% across exercises 01–03.

| What's wasteful | Why |
|-----------------|-----|
| "look through all the files" | Sends full workspace index to the model |
| "every component, every utility" | Forces an unnecessarily long completion |
| No file attached | Model guesses which files matter |

---

## Checkpoint ✓

- [ ] App runs at localhost:5173
- [ ] Output panel showing Copilot token data
- [ ] Baseline token count recorded

---

**Next:** [Exercise 01 — File Context](exercise-01-file-context.md)
