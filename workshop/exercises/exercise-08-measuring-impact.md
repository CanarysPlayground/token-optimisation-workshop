# Exercise 08 — Measuring Impact

> **OPTIONAL** — This exercise is outside the 90-minute core agenda. Complete it if you have extra time or as take-home practice.

**Duration:** 20 minutes  
**Habits:** Metrics & dashboards  
**Goal:** Learn where to find token usage data, interpret it, and forecast team costs.

---

## Where to find your usage data

### 1. VS Code Output panel (real-time)
- Open **View → Output** → select **GitHub Copilot** from the dropdown
- Every request logs: model used, prompt tokens, completion tokens, total tokens

### 2. GitHub.com Usage Dashboard
- Go to **github.com → Settings → Billing → Usage**
- Filter by: date range, model, user, feature (chat, completions, agent)
- Export CSV for spreadsheet analysis

### 3. GitHub Admin Console (Business / Enterprise)
- **Organisation → Settings → Copilot → Usage**
- Shows per-seat, per-model, per-day breakdown
- Alert thresholds can trigger email notifications

---

## Part A — Read the VS Code logs

1. Open the Output panel → GitHub Copilot
2. Run any Copilot prompt
3. Find the log entry and identify:
   - `promptTokens`: ___________
   - `completionTokens`: ___________
   - `model`: ___________

---

## Part B — Cost estimation worksheet

Using the approximate rates (adjust for your plan's actual rates):

| Model tier | Per 1k input tokens | Per 1k output tokens |
|------------|--------------------|--------------------|
| GPT-4.1 mini | $0.0004 | $0.0016 |
| GPT-4.1 | $0.002 | $0.008 |
| GPT-4o | $0.005 | $0.015 |
| o1 | $0.015 | $0.060 |

**Fill in for your team:**

```
Team size:          ___ developers
Requests/dev/day:   ___ (typical: 80–150 for active Copilot users)
Avg prompt tokens:  ___ (measure from logs — typical without habits: 2,000)
Avg completion tokens: ___ (typical: 500)

Daily input cost:   team × requests × avg_prompt_tokens / 1000 × price_per_1k
Daily output cost:  team × requests × avg_completion_tokens / 1000 × price_per_1k
Monthly total:      (daily_input + daily_output) × 22 working days
```

| | Without habits | With habits (-50%) |
|-|---------------|-------------------|
| Avg prompt tokens | 2,000 | 1,000 |
| Monthly cost (10 devs, GPT-4o) | **$330** | **$165** |
| Monthly cost (50 devs, GPT-4o) | **$1,650** | **$825** |

> These numbers assume 100 requests/dev/day and 22 working days/month.

---

## Part C — Set a team budget alert

If your org is on Business or Enterprise:

1. Go to **github.com/organisations/YOUR_ORG/settings/copilot**
2. Find **Spend management** → set a monthly budget alert at 80% of your included credits
3. Add a notification email (team lead or finance)

---

## Part D — Identify your biggest cost driver

From the logs you collected across exercises 01–07:

| Exercise | Tokens used | Main cost driver |
|----------|------------|-----------------|
| 00 (baseline) | | |
| 01 (file context) | | |
| 02 (model select) | | |
| 03 (instructions) | | |
| 04 (reasoning) | | |
| 05 (tool pruning) | | |
| 06 (fresh chat) | | |
| 07 (compound) | | |

Which habit gave you the **biggest single saving**? ___________

---

## Checkpoint ✓

- [ ] Read token data from VS Code Output panel
- [ ] Completed cost estimation worksheet for your team size
- [ ] Identified the top cost driver from your exercise logs

---

**Next:** [Exercise 09 — Team Policy](exercise-09-team-policy.md)
