# Exercise 07 — Compound Savings

**Duration:** 25 minutes  
**Habits:** All 6  
**Goal:** Apply all 6 habits simultaneously to a real feature and calculate the combined saving.

---

## The challenge

Add a **"Weekly Streak" counter** to the Gamified Growth view.

Rules: the counter shows how many consecutive days the user has logged in or completed a challenge.  
You must implement this using all 6 habits — the facilitator will observe your approach.

---

## The 6-habit checklist (fill in BEFORE you start)

| # | Habit | Your plan |
|---|-------|----------|
| 1 | Point at exact files | Which files will you attach? |
| 2 | Right model | Which model for which step? |
| 3 | Short instructions | Does your `.github/copilot-instructions.md` exist and is it < 100 tokens? |
| 4 | No extended thinking | Is reasoning mode off for the implementation step? |
| 5 | Minimal tools | Which tools will you enable? |
| 6 | Fresh chat | Will you open a new chat for this task? |

---

## Implementation steps

### Step 1 — Plan (new chat, mini model, no file attachment needed)

Open a **fresh chat**, use **GPT-4.1 mini**, and ask:

```
I need to add a weekly streak counter to a Zustand store. 
What fields do I need to add to the state? Answer in 3 bullet points.
```

Record tokens: **Step 1: ___________**

---

### Step 2 — Update the types (new chat, mini model, attach types file)

Open another **fresh chat**, attach `src/types/index.ts`, ask:

```
Add streakDays: number and lastActiveDate: string (ISO date) to UserProfile.
Show only the changed interface.
```

Apply the change. Record tokens: **Step 2: ___________**

---

### Step 3 — Update the store (new chat, mini model, attach store file)

Fresh chat, attach `src/store/useStore.ts`, ask:

```
Add streakDays and lastActiveDate to the store initial state and add an 
updateStreak() action that: checks if lastActiveDate was yesterday, 
increments streakDays if yes, resets to 1 if more than a day has passed, 
and updates lastActiveDate to today.
```

Apply and record tokens: **Step 3: ___________**

---

### Step 4 — Add UI (new chat, mid model, attach Gamification component)

Fresh chat, attach `src/components/GamifiedGrowth/GamifiedGrowth.tsx`, ask:

```
Add a streak card showing the current streakDays from the store, 
using the same glassmorphism card style as the level card. 
Use a 🔥 emoji and neon-orange colour. Place it below the level card.
```

Apply and record tokens: **Step 4: ___________**

---

## Measure your total cost

| Step | Tokens | What would it have been without habits? |
|------|--------|-----------------------------------------|
| 1 | | ~800 (large model + no fresh chat) |
| 2 | | ~2,000 (full workspace scan) |
| 3 | | ~3,500 (accumulated history) |
| 4 | | ~4,000 (all tools + reasoning) |
| **Total** | | **~10,300 estimated** |

Calculate your saving: `(10,300 − your total) / 10,300 × 100 = ____ %`

---

## Checkpoint ✓

- [ ] Weekly streak counter visible in the Growth view
- [ ] `npm run build` passes
- [ ] Total token saving calculated and > 40%
- [ ] All 6 habits applied (facilitator sign-off)

---

**Next:** [Exercise 08 — Measuring Impact](exercise-08-measuring-impact.md)
