# Exercise 01 — Prompt Compression & The Language Tax

**Duration:** 20 minutes  
**Levers:** 1 (Prompt Compression) + 2 (Language Tax)  
**Potential saving:** 30–75% input tokens  
**App focus:** `src/utils/aiSimulator.ts`

---

## Lever 1: Prompt Compression

**Remove zero-information language. Keep technical substance exact.**

### The three compression tiers

| Level | Style | Input saved | Output saved | Quality impact |
|-------|-------|------------|-------------|----------------|
| Lite | Professional but concise | 15–25% | 15–25% | None |
| **Full (default)** | Caveman-speak | 30–50% | 40–55% | Negligible |
| Ultra | Maximum compression | 55–70% | 55–70% | Risk of ambiguity |

> **Key insight:** Input savings come from your prompts. Output savings come from system instructions. These are two separate dials.

---

## Part A — Expensive vs compressed prompts

### Step 1: Run the polite prompt (no file attached)

Open Copilot Chat. Run:

```
Hey, could you please help me understand how the AI simulation works 
in this app? I think it might have some interesting logic for detecting 
user motivation and I'm curious about how to add new keywords to it.
```

Record (from Agent Debug Logs → Summary): **Polite + no file: ___________**

---

### Step 2: Run the same request, compressed + file attached

1. Open `src/utils/aiSimulator.ts`
2. In Copilot Chat, attach the file (`paperclip` icon or `#file:src/utils/aiSimulator.ts`)
3. Run:

```
Explain motivation detection. How to add new keyword?
```

Record (from Agent Debug Logs → Summary): **Compressed + file: ___________**

**Difference: ___________ (target: >50% reduction)**

---

## Part B — Four phrasing styles for the same task

Test each phrasing for the same request. Attach `src/utils/aiSimulator.ts` each time. The goal is identical output (a working `detectKeyword` function) at minimum token cost.

| Phrasing | Prompt | Tokens |
|---------|--------|--------|
| Natural language (verbose) | `I need you to write a function that takes a user message string as input and checks whether it contains any of the existing motivation keywords in the simulation. If it finds a match, it should return the matched keyword as a string. If no match is found, it should return null.` | |
| Pseudo-code | `fn(msg) → scan motivationKeywords → return match\|null` | |
| Type signature | `function detectKeyword(msg: string): string \| null // scan motivationKeywords` | |
| Like X but Y | `Like analyzeDecision but scans motivationKeywords, returns first match or null` | |

> **Goal:** All four produce equivalent code. The token difference is pure overhead you are paying for nothing.

---

## Part C — Apply code-native structured phrasing

**PROSE request (~55 tokens):**
```
I need you to create a new API function that will be used to add a new 
motivation keyword to the simulation. It should accept the keyword as a 
parameter and add it to the list. Can you also make sure it handles the 
case where the keyword already exists?
```

**STRUCTURED request (~20 tokens):**
```
Add to aiSimulator.ts:
addMotivationKeyword(keyword: string): void
- push to motivationKeywords if not already present
```

Run both (with `src/utils/aiSimulator.ts` attached each time).

| Version | Tokens | Code quality | Notes |
|---------|--------|-------------|-------|
| Prose | | | |
| Structured | | | |

> The structured version costs ~60% fewer tokens. At 50 requests/day, that is hundreds of thousands of tokens saved per developer per month — before any other optimisation.

Apply the `addMotivationKeyword` function from the cheaper prompt.

---

## Lever 2: The Language Tax

**English is the cheapest language for all major LLMs in GitHub Copilot.**

| Provider | Non-English average multiplier |
|----------|-------------------------------|
| Gemini 3.1 | 1.22× |
| OpenAI | 1.33× |
| DeepSeek V4 | 1.49× |
| Anthropic (Claude) | **2.07×** |

> **Anthropic's tokenizer is the most expensive for non-English text.** A prompt in Hindi or Arabic costs 1.6×–2.0× the same prompt in English — with Claude models.

### Part D — Observe the language tax (informational)

Run the same prompt in English and in another language you're comfortable with (or use the examples below). Attach `src/utils/aiSimulator.ts`.

**English:**
```
Add a new motivation keyword: "focus". Return updated array.
```

**Hindi (if applicable):**
```
एक नया प्रेरणा कीवर्ड जोड़ें: "focus". अपडेट की गई सरणी वापस करें।
```

| Language | Tokens |
|----------|--------|
| English | |
| Other | |
| Multiplier | |

> **Rule:** Always write prompts in English, even if your team communicates in another language. Use English for all Copilot interactions — it is the cheapest lane by design.

---

## Compression summary

| Technique | Saving | How |
|-----------|--------|-----|
| Drop polite scaffolding | 30–50% input | Remove "please", "could you", "I think" |
| Use code-native phrasing | 30–60% input | Pseudo-code, type signatures, "like X but Y" |
| Attach the exact file | Up to 90% input | Replaces workspace scan with one file |
| Write in English | Up to 2× saving (Anthropic) | Language tax is real and billed |

---

## Checkpoint ✓

- [ ] Measured polite vs compressed prompt (target >50% reduction)
- [ ] Tested all four phrasing styles
- [ ] Applied `addMotivationKeyword` using structured phrasing
- [ ] Observed language tax multiplier
- [ ] Can articulate: input savings vs output savings are separate dials

---

**Next:** [Exercise 02 — Context Management & Escalation Ladder](exercise-02-context-management.md)
