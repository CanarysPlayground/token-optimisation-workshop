# Exercise 10 — Capstone: End-to-End Optimised Feature Build

**Duration:** 30 minutes  
**Habits:** All 6  
**Goal:** Build a complete new feature from scratch using every optimisation habit, then present your token scorecard.

---

## The feature: "Daily Intentions" micro-journal

Add a **Daily Intentions** panel to the Dashboard that lets the user type a single intention for the day (e.g., "Spend 30 minutes on my side project"), stores it in Zustand, and shows the last 7 intentions as a timeline.

This is a self-contained feature touching: types → store → a new component → Dashboard integration.

---

## Your token budget

| Step | Max tokens (optimised) | Your actual |
|------|----------------------|------------|
| 1. Plan | 200 | |
| 2. Update types | 150 | |
| 3. Update store | 300 | |
| 4. Create component | 500 | |
| 5. Wire into Dashboard | 200 | |
| **Total target** | **< 1,350** | |

If you stay under 1,350 tokens for the entire feature, you've achieved expert-level optimisation.

---

## Step-by-step guide

### Step 1 — Plan (fresh chat, mini model, no files)

```
In a React/TypeScript app with Zustand, I want to store a list of daily 
intentions (max 7, newest first). What fields do I need in the state?
List only the field names and types, no explanation.
```

---

### Step 2 — Update types (fresh chat, mini model, attach `src/types/index.ts`)

```
Add a DailyIntention interface with id (string), text (string), and 
createdAt (ISO date string). Add dailyIntentions: DailyIntention[] 
to UserProfile. Show only the changed lines.
```

---

### Step 3 — Update store (fresh chat, mini model, attach `src/store/useStore.ts`)

```
Add dailyIntentions: DailyIntention[] to state (default []). 
Add addIntention(text: string) action that prepends a new DailyIntention 
and keeps only the last 7. Import DailyIntention from types.
Show only the new/changed lines.
```

---

### Step 4 — Create component (fresh chat, mid model, attach Dashboard for style reference)

```
Create src/components/Dashboard/DailyIntentions.tsx.
- Textarea (1 row) + "Set Intention" button
- On submit: calls addIntention from useStore, clears input
- Shows last 7 intentions as a vertical timeline (date + text)
- Style: dark-800/80 glassmorphism card, neon-cyan accent, font-inter
- Named export: DailyIntentions
```

---

### Step 5 — Wire into Dashboard (fresh chat, mini model, attach `src/components/Dashboard/Dashboard.tsx`)

```
Import DailyIntentions from './DailyIntentions' and render it after 
the quick-access grid. Show only the changed import and JSX lines.
```

---

## Verification

```bash
npm run build   # must pass with no errors
npm run dev     # open http://localhost:5173, complete onboarding
```

Test:
- [ ] Type an intention and click "Set Intention"
- [ ] Intention appears in the timeline
- [ ] After 8 entries, only the last 7 are shown
- [ ] Page refresh preserves intentions (Zustand persist)

---

## Token scorecard

Fill in your actual tokens and compare:

| Step | Target | Actual | Over/Under |
|------|--------|--------|-----------|
| 1 Plan | 200 | | |
| 2 Types | 150 | | |
| 3 Store | 300 | | |
| 4 Component | 500 | | |
| 5 Wire up | 200 | | |
| **Total** | **1,350** | | |

---

## Retrospective questions (group discussion)

1. Which habit had the highest individual impact on your token count?
2. Where did you struggle most to apply a habit?
3. If you adopted all 6 habits from tomorrow, what is your team's estimated **annual saving** in dollars?
4. What would you add to the team policy from Exercise 09 based on what you learned today?

---

## Congratulations 🎉

You've completed the GitHub Copilot Token Optimisation Workshop.

**What you can do now:**
- Reduce your team's Copilot bill by ~50% with no loss of quality
- Write a `copilot-instructions.md` under 100 tokens
- Choose the right model for every task
- Measure and forecast token spend from the GitHub dashboard
- Present a token savings case to your manager / client

**Reference:**
- Token optimisation guide: https://aka.ms/ghcp-tkn-opt
- Live demo: https://ashy-dune-0b4215a0f.7.azurestaticapps.net/index.html
- This workshop app: `future-you-simulator/` in this repo

---

**Back to:** [Workshop README](../README.md)
