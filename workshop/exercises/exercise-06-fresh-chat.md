# Exercise 06 — Open a New Chat per Task

> **OPTIONAL** — This exercise is outside the 90-minute core agenda. Complete it if you have extra time or as take-home practice.

**Duration:** 15 minutes  
**Habit:** #6 — Start a fresh chat for each new task  
**Potential saving:** ~8%  
**App focus:** `src/components/ChatWithFuture/ChatWithFuture.tsx`

---

## The hidden cost of long chat histories

Every Copilot message sends the **entire conversation history** to the model as context. A chat that started discussing authentication and drifted to UI components now carries ~4,000 tokens of irrelevant history on every new question.

```
Turn 1:   50-token question   → model sees   50 tokens
Turn 5:   50-token question   → model sees  450 tokens (4× overhead)
Turn 20:  50-token question   → model sees 2,200 tokens (44× overhead)
```

---

## Part A — Measure the drift

1. Open Copilot chat. Have a **long conversation** — run these prompts in sequence in the **same chat**:

```
Explain how the useStore hook works.
```
```
What is Zustand persist middleware doing?
```
```
Now attach src/components/ChatWithFuture/ChatWithFuture.tsx and explain the typing delay logic.
```
```
How does the MessageBubble component decide which side to render on?
```
```
Now add a timestamp below each message bubble showing the time it was sent.
```

Record tokens on the **last prompt**: **Accumulated history: ___________**

---

## Part B — Same task, fresh chat

1. Open a **new chat** (`+` button or `Ctrl+Shift+I` then "New Conversation")
2. Attach `src/components/ChatWithFuture/ChatWithFuture.tsx` (only this file)
3. Ask directly:

```
Add a timestamp below each message bubble showing the time it was sent. 
Use the existing ChatMessage type's timestamp field.
```

Record tokens: **Fresh chat: ___________**

**Difference: ___________**

---

## Part C — Apply the change

Apply the timestamp display. It should:
- Show below each bubble
- Format as `HH:MM` (hours and minutes only)
- Use `text-white/30 text-xs` Tailwind styling to keep it subtle

Run `npm run dev` and send a test message in the Chat view.

---

## When NOT to start a new chat

| Situation | Use same chat | Open new chat |
|-----------|:---:|:---:|
| Multi-step refactor where earlier answers inform later ones | ✅ | |
| Fixing a bug found in a previous response | ✅ | |
| Switching to a completely different file / feature | | ✅ |
| The chat has grown > 10 turns | | ✅ |
| Topic has drifted from the original question | | ✅ |
| Starting a new day / new sprint task | | ✅ |

---

## The summary rule

> **One task = one chat.**
> If you can't describe the chat in a single sentence, it's too long.

---

## Checkpoint ✓

- [ ] Measured token difference between long chat and fresh chat
- [ ] Timestamps added to message bubbles and visible in browser
- [ ] Understand the "one task = one chat" rule

---

**Next:** [Exercise 07 — Compound Savings](exercise-07-compound-savings.md)
