# Exercise 09 — Enterprise Guardrails & Budget Policy

**Duration:** 25 minutes  
**Lever:** 10 (Enterprise Guardrails)  
**Potential impact:** Prevents runaway spend; enables team-wide optimisation  
**App focus:** Team policy documents, `.github/copilot-instructions.md`

---

## Why guardrails matter under UBB

Under the flat-seat model, no individual developer could "overspend" — the bill was fixed. Under UBB, a single runaway agent session or an untrimmed tool config can generate 5× the expected cost.

> **GitHub's default is uncapped.** If you don't configure a Usage-Limit Budget (ULB), token spend has no ceiling.

---

## Part A — Understanding the budget hierarchy

GitHub Copilot UBB has a four-level budget structure:

```
Pool (subscription total)
  └── Enterprise (org-level cap)
        └── Team (team-level cap)  
              └── User (per-seat cap)
```

| Level | Who sets it | Key setting |
|-------|------------|------------|
| Pool | Billing admin | Total monthly token allowance |
| Enterprise | Enterprise admin | % of pool for this org |
| Team | Team manager / policy | % of enterprise for this team |
| User | Manager | Per-developer monthly cap |

### The 150% rule

When setting budget caps, use **150% of expected usage** — not 100%.

| Cap at... | Risk |
|-----------|------|
| 100% | Developers hit cap mid-sprint; productivity drop |
| 150% | Catches genuine runaway spend (5×+ spike); allows normal variance |
| Uncapped | One bad agent session = unbounded cost |

---

## Part B — Measure your current baseline spend

This exercise is about understanding your usage data before setting caps.

### Step 1: Locate VS Code Copilot usage data

Open the **Agent Debug Logs** panel. In a fresh Copilot Chat, run:
```
List the 5 files I work in most in this project. One path per line.
```

After the response completes, check the **Summary** section in Agent Debug Logs and record:

| Field | Value |
|-------|-------|
| Total Output Tokens | |
| Total Cached | |
| Copilot Usage (AIC) | |
| Model | |

---

### Step 2: Estimate monthly cost

Use your baseline AIC from Exercise 00. Assume **50 coding prompts per day, 22 working days per month**.

```
Monthly requests = 50 × 22 = 1,100 requests

Example (Exercise 00 baseline = 8,000 tokens per request):
  Monthly tokens = 1,100 × 8,000 = 8,800,000 tokens

  Cost (Claude Sonnet 4.6):
    Input  (70%): 6,160,000 × $3.00/1M  = $18.48
    Output (30%): 2,640,000 × $15.00/1M = $39.60
    Total = $58.08/month per developer

  10 developers = $580/month
  50 developers = $2,900/month

After all optimisations (target 70–90% reduction):
  Optimised monthly cost per developer = $5.80–$17.42
```

Now fill in **your actual baseline** from Exercise 00:

```
Your baseline tokens per request: ___________
Monthly tokens = 1,100 × ___________ = ___________

Input cost:  (monthly tokens × 0.7) × $3.00/1,000,000  = $___________
Output cost: (monthly tokens × 0.3) × $15.00/1,000,000 = $___________
Total/month per developer: $___________

Team size: ___  Total team cost today: $___________/month
Target (after optimisations): $___________/month
Potential saving: $___________/month
```

Set your **recommended ULB** at 150% of the unoptimised estimate for the first month, then reduce as the team adopts optimisations.

---

## Part C — Premium model policy

For teams with more than 100 developers, the playbook recommends an **explicit allow-list** for premium models.

### Recommended policy structure:

| Developer profile | Allowed models | Reason |
|------------------|----------------|--------|
| All developers | GPT-5 mini, GPT-4.1 | Routine work |
| Senior / TL | + Claude Sonnet 4.6 | Day-to-day complex tasks |
| Architect, security | + Claude Opus 4.7 | Architecture, security review |
| No one by default | All reasoning MAX mode | Requires per-request opt-in |

### Create `COPILOT-POLICY.md` in the project root:

Create `future-you-simulator/COPILOT-POLICY.md`:

```markdown
# Copilot Usage Policy — future-you-simulator

## Model routing defaults
| Task | Default model | Escalation trigger |
|------|--------------|-------------------|
| Rename, format, simple fix | GPT-5 mini | Never |
| Feature implementation | Claude Sonnet 4.6 | Default |
| Architecture, security | Claude Opus 4.7 | Explicit justification required |

## Budget limits (ULB)
- Per developer: [set at 150% of measured baseline]
- Alert threshold: 80% of monthly budget consumed
- Hard cap: 150% of expected monthly usage

## Required before every agent task
- [ ] Only files needed for this task are attached
- [ ] MCP tools not needed are disabled
- [ ] copilot-instructions.md is under 100 tokens
- [ ] `maxTurns` is set in agent config
- [ ] Output constraint is in the prompt

## Prohibited patterns
- `#codebase` for single-file questions
- Vague agent prompts ("improve the app")
- Leaving premium models enabled for all tasks by default
- Global MCP tool configuration (must be per-workspace)
```

---

## Part D — Team `copilot-instructions.md` baseline

Your shared `.github/copilot-instructions.md` is the highest-ROI file in the entire codebase. Every developer benefits from every improvement.

### Criteria for a good team instructions file:

| Criterion | Your file | Pass/Fail |
|-----------|-----------|-----------|
| Under 100 tokens total | | |
| Every line is non-obvious (not inferrable from code) | | |
| Contains output constraint ("Code only") | | |
| Contains type import convention | | |
| Contains export convention | | |
| Zero "be a good developer" boilerplate | | |
| No file structure description | | |

---

## Part E — Budget alerts and dashboard

### Configure alerts in GitHub Enterprise settings:

1. Go to **GitHub Enterprise** → **Settings** → **Copilot** → **Usage**
2. Set alert at **80%** of monthly budget consumed
3. Configure weekly usage digest email to team lead
4. Set hard cap (ULB) at 150% of baseline

### Weekly review cadence:

| Metric | Where to find | Action threshold |
|--------|--------------|-----------------|
| Top 3 cost drivers | GitHub Copilot usage dashboard | Investigate if 3× baseline |
| Average AIC per request | Agent Debug Logs → Summary | Investigate if >10K tokens equivalent |
| Agent mode share (%) | Usage dashboard | Review if >50% of requests |
| Model mix | Usage dashboard | Alert if Opus > 20% of requests |

---

## Part F — PR checklist entry

Add this to your team's PR template (`.github/pull_request_template.md`):

```markdown
## Copilot usage (UBB)
- [ ] copilot-instructions.md unchanged or improved (token count ≤ previous)
- [ ] No new MCP tools added globally (workspace-scoped only)
- [ ] AGENTS.md changes are signal only (no noise added)
- [ ] No new default-on agent configs with missing `maxTurns`
```

Create `.github/pull_request_template.md` (in `future-you-simulator/`):

```markdown
## Summary
[What this PR does in one sentence]

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Refactor

## Copilot usage (UBB)
- [ ] copilot-instructions.md unchanged or improved (token count ≤ previous)
- [ ] No new MCP tools added globally (workspace-scoped only)
- [ ] AGENTS.md changes are signal only (no noise added)
- [ ] No new agent configs with missing `maxTurns`
```

---

## Checkpoint ✓

- [ ] Understand the 4-level budget hierarchy (Pool → Enterprise → Team → User)
- [ ] Know why 150% cap, not 100%
- [ ] Calculated your personal monthly cost estimate
- [ ] Created `COPILOT-POLICY.md` with model routing table
- [ ] Verified team `copilot-instructions.md` against all 7 criteria
- [ ] Created PR template with UBB checklist
- [ ] Know where to find usage dashboards and set alert thresholds

---

**Next:** [Exercise 10 — Capstone: Full Feature Under Budget](exercise-10-capstone.md)
