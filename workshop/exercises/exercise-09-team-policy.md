# Exercise 09 — Write a Team Token Budget Policy

**Duration:** 25 minutes  
**Goal:** Draft a reusable team policy document that embeds all 6 habits into your team's Copilot workflow.

---

## Why a written policy matters

Individual habits save tokens. A **team policy** ensures everyone saves tokens consistently — especially new joiners who haven't attended this workshop.

A policy has three outputs:
1. **copilot-instructions.md** — the technical contract Copilot receives on every request
2. **Team handbook entry** — the human-readable norms developers follow
3. **PR checklist** — a lightweight gate so habits stay enforced over time

---

## Part A — Write your team's `copilot-instructions.md`

Use the template below and customise for your team's stack. Keep it under **100 tokens**.

```markdown
---
applyTo: "**"
---
Stack: [your stack here, e.g. React 18, TypeScript 5, Node 20, PostgreSQL]
Style: [3–5 style rules, e.g. functional components, named exports, no any]
State: [state management rule, e.g. Redux slices — no local state for shared data]
Types: [type rule, e.g. all types in src/types — never inline]
[One rule about comments/docs, e.g. no JSDoc unless public API]
```

**Your version:**

```markdown
---
applyTo: "**"
---
Stack: 
Style: 
State: 
Types: 
```

Token count (use https://platform.openai.com/tokenizer): ___________

If > 100: cut until you get under 100. Every word must earn its place.

---

## Part B — Handbook entry (fill in the blanks)

Copy this into your team wiki / README:

```markdown
## GitHub Copilot — Team Token Habits

We are on the [Pro / Business / Enterprise] plan. Monthly budget: $[X].

### The 6 habits every developer must follow

1. **Attach the file you're editing** before asking Copilot anything about it.
2. **Use [MINI_MODEL] for** [list 3 task types]. Use [LARGE_MODEL] only for [list 2 task types].
3. **Never edit copilot-instructions.md** without a team discussion — it affects everyone.
4. **Disable reasoning mode** (o1/extended thinking) for deterministic tasks.
5. **In agent mode, enable only**: edit_file, read_file, [list any others you routinely need].
6. **One task = one chat.** New feature? New chat. Different file? New chat.

### Measuring

Token usage is visible at: github.com/settings/billing (personal) or github.com/orgs/ORG/settings/copilot (org).
We review monthly spend on the [1st / 15th] of each month.
Budget alert set at: [80% of included credits].
```

---

## Part C — PR checklist entry

Add to your team's `.github/pull_request_template.md`:

```markdown
## Copilot token hygiene (if Copilot was used)
- [ ] `copilot-instructions.md` was NOT modified (or change was discussed in issue)
- [ ] No large model was used for a task a mini model could handle
- [ ] No agent tool calls with the full default tool set (unused tools were disabled)
```

---

## Part D — Present to the group

Each attendee has 3 minutes to share:
1. Their `copilot-instructions.md` content and token count
2. The one habit they'll struggle most to adopt and why
3. Their team's estimated monthly saving if all 6 habits are adopted

---

## Checkpoint ✓

- [ ] `copilot-instructions.md` written and under 100 tokens
- [ ] Handbook entry personalised for your team
- [ ] PR checklist entry ready
- [ ] Presented to the group (or reviewed by facilitator)

---

**Next:** [Exercise 10 — Capstone](exercise-10-capstone.md)
