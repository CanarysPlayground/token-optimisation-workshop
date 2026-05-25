# Exercise 07 — Compound Savings

**Duration:** 25 minutes  
**Habits:** 1, 2, 3 (+ 4–6 if covered)  
**Goal:** Apply the three habits you've learned simultaneously to a real feature and measure the combined saving.

---

## The challenge

Add a **"Weekly Streak" counter** to the Gamified Growth view.

Rules: the counter shows how many consecutive days the user has logged in or completed a challenge.  
You must implement this using all 6 habits — the facilitator will observe your approach.

---

## Pre-flight checklist (fill in BEFORE you start)

| # | Habit | Your plan |
|---|-------|----------|
| 1 | Point at exact files | Which files will you attach? |
| 2 | Right model | Which model for which step? |
| 3 | Short instructions | Does your `.github/copilot-instructions.md` exist and is it < 100 tokens? |
| 4 *(optional)* | No extended thinking | Is reasoning mode off? |
| 5 *(optional)* | Minimal tools | Which tools will you enable? |
| 6 *(optional)* | Fresh chat | Will you open a new chat for this task? |

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

### Step 3 — Add UI (new chat, mid model, attach Gamification component)

Fresh chat, attach `src/components/GamifiedGrowth/GamifiedGrowth.tsx`, ask:

```
Add a streak card showing the current streakDays from the store, 
using the same glassmorphism card style as the level card. 
Use a 🔥 emoji and neon-orange colour. Place it below the level card.
```

Apply and record tokens: **Step 3: ___________**

---

## Measure your total saving

| Step | Your tokens | Unoptimised estimate |
|------|-------------|---------------------|
| 1 — Plan | | ~800 (large model, no fresh chat) |
| 2 — Types | | ~2,000 (full workspace scan) |
| 3 — UI | | ~4,000 (all tools, accumulated history) |
| **Total** | | **~6,800 estimated** |

Your saving: `(6,800 − your total) / 6,800 × 100 = ____ %`

---

## Checkpoint ✓

- [ ] Streak card visible in the Growth view
- [ ] Token saving calculated (target > 40%)
- [ ] All 3 core habits applied

---

**Done!** Explore the [optional exercises](../README.md#optional--extended-exercises) if time allows.
