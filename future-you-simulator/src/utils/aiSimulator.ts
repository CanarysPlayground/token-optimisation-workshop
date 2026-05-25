import type { Decision, UserProfile, ChatMessage } from '../types';

// ─── Decision engine ──────────────────────────────────────────────────────

const DECISION_TEMPLATES: Omit<Decision, 'id'>[] = [
  {
    question: "What if I don't study for 2 months?",
    shortTermImpact: {
      career: -3, health: +1, wealth: 0, happiness: +2,
      summary: 'Short-term relief — more free time, but skills stagnate.',
    },
    longTermImpact: {
      career: -8, health: 0, wealth: -5, happiness: -6,
      summary: 'Missed opportunities compound. Peers overtake you in 6–12 months.',
    },
    probability: 72,
    lifePath: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      event: i < 2 ? 'Enjoying break' : i < 5 ? 'Falling behind peers' : i < 9 ? 'Struggling to catch up' : 'Significant skill gap',
      score: Math.max(20, 80 - i * 7),
    })),
  },
  {
    question: "What if I switch jobs right now?",
    shortTermImpact: {
      career: -2, health: -3, wealth: -4, happiness: +4,
      summary: 'Exciting change but stressful transition and temporary income dip.',
    },
    longTermImpact: {
      career: +8, health: +2, wealth: +7, happiness: +9,
      summary: 'New skills, higher ceiling, and renewed motivation pay off by year 2.',
    },
    probability: 65,
    lifePath: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      event: i < 2 ? 'Job search / interviews' : i < 4 ? 'First month at new job' : i < 7 ? 'Building credibility' : i < 10 ? 'Delivering impact' : 'Thriving in new role',
      score: Math.max(30, 45 + i * 5),
    })),
  },
  {
    question: "What if I start exercising daily?",
    shortTermImpact: {
      career: +1, health: +5, wealth: -1, happiness: +4,
      summary: 'Energy boost in weeks 2–3. Slight time investment.',
    },
    longTermImpact: {
      career: +5, health: +9, wealth: +3, happiness: +8,
      summary: 'Compound health dividends: better focus, lower medical costs, longer life.',
    },
    probability: 58,
    lifePath: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      event: i < 1 ? 'Building the habit' : i < 3 ? 'Consistency kicks in' : i < 6 ? 'Visible physical changes' : i < 9 ? 'Peak energy levels' : 'New athletic benchmark',
      score: Math.min(95, 45 + i * 5),
    })),
  },
  {
    question: "What if I start saving 20% of my income?",
    shortTermImpact: {
      career: 0, health: 0, wealth: +6, happiness: -2,
      summary: 'Tighter monthly budget, but emergency fund starts forming.',
    },
    longTermImpact: {
      career: +3, health: +1, wealth: +10, happiness: +7,
      summary: 'Financial security removes stress, unlocks options: investment, travel, career risk-taking.',
    },
    probability: 61,
    lifePath: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      event: i < 2 ? 'Adjusting lifestyle' : i < 4 ? 'First buffer saved' : i < 7 ? 'Emergency fund complete' : i < 10 ? 'Investment started' : 'Compounding begins',
      score: Math.min(90, 40 + i * 6),
    })),
  },
  {
    question: "What if I spend 4+ hours daily on social media?",
    shortTermImpact: {
      career: -2, health: -3, wealth: -1, happiness: +1,
      summary: 'Dopamine hits short-term. Gradually hollows out focus and ambition.',
    },
    longTermImpact: {
      career: -7, health: -6, wealth: -4, happiness: -8,
      summary: 'Attention span shrinks, sleep suffers, real relationships weaken.',
    },
    probability: 80,
    lifePath: Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      event: i < 2 ? 'Mindless scrolling feels good' : i < 5 ? 'Productivity declining' : i < 8 ? 'Sleep disrupted' : 'Relationships suffering',
      score: Math.max(15, 75 - i * 7),
    })),
  },
];

export function analyzeDecision(question: string): Decision {
  const lower = question.toLowerCase();
  let template = DECISION_TEMPLATES[0];

  if (lower.includes('job') || lower.includes('switch') || lower.includes('career')) {
    template = DECISION_TEMPLATES[1];
  } else if (lower.includes('exercise') || lower.includes('gym') || lower.includes('workout') || lower.includes('fit')) {
    template = DECISION_TEMPLATES[2];
  } else if (lower.includes('save') || lower.includes('money') || lower.includes('invest') || lower.includes('finance')) {
    template = DECISION_TEMPLATES[3];
  } else if (lower.includes('social media') || lower.includes('scroll') || lower.includes('tiktok') || lower.includes('instagram')) {
    template = DECISION_TEMPLATES[4];
  }

  return { ...template, id: crypto.randomUUID(), question };
}

// ─── Future-self chat engine ───────────────────────────────────────────────

export function generateFutureResponse(
  userMessage: string,
  profile: UserProfile,
  history: ChatMessage[]
): string {
  const lower = userMessage.toLowerCase();
  const name = profile.name;
  const topGoal = profile.goals[0]?.description ?? 'your main goal';
  const posHabits = profile.habits.filter((h) => h.isPositive).map((h) => h.description);
  const negHabits = profile.habits.filter((h) => !h.isPositive).map((h) => h.description);
  const isFirst = history.filter((m) => m.role === 'future').length === 0;

  if (isFirst) {
    return `Hey ${name} — it's you, from the future. I know you have questions. Ask me anything about the choices you're facing. I've lived through them. The version of you standing here today is determined by decisions you make in the next 365 days. Starting with how you use the next hour. What's on your mind?`;
  }

  if (lower.includes('motivation') || lower.includes('motivated') || lower.includes('inspire')) {
    return `${name}, I won't sugarcoat it — there were weeks I almost gave up on ${topGoal}. What kept me going? I stopped waiting to *feel* motivated and just started. Motivation follows action, not the other way around. Book 15 minutes today. That's all future you asks.`;
  }

  if (lower.includes('fail') || lower.includes('scared') || lower.includes('afraid') || lower.includes('fear')) {
    return `Every fear you have right now? I had them too. The difference between where you are and where I am is that I chose to move *despite* the fear. Failure isn't what you think it is — it's just feedback at a faster speed. Act, then adjust.`;
  }

  if (lower.includes('habit') || lower.includes('routine') || lower.includes('daily')) {
    if (negHabits.length > 0) {
      return `Honestly, ${name}? The biggest thing holding you back right now is "${negHabits[0]}". I know you know it. I spent 3 months convincing myself it was fine. Replace just 30 minutes of that with one of your positive habits — it snowballs faster than you expect.`;
    }
    return `Your daily habits are your compound interest. ${posHabits.length > 0 ? `You already have "${posHabits[0]}" — keep it sacred.` : 'Pick one positive habit and protect it like a meeting you can\'t cancel.'} Stack one more small win each week.`;
  }

  if (lower.includes('money') || lower.includes('finance') || lower.includes('salary') || lower.includes('invest')) {
    return `I wish you had started investing six months earlier. You don't need a lot — you need consistency. Automate 10% of every paycheck first. Future you thanks present you every single month for that one choice.`;
  }

  if (lower.includes('job') || lower.includes('career') || lower.includes('work') || lower.includes('promotion')) {
    return `The career path branches hard in the next 18 months. The people who got ahead were the ones who volunteered for the projects nobody else wanted. Don't wait to be chosen — put your hand up. Visibility is half the battle.`;
  }

  if (lower.includes('health') || lower.includes('fit') || lower.includes('exercise') || lower.includes('weight')) {
    return `I'll be blunt: your body is the machine that runs everything else. I started with just 20 minutes of walking. It compounded into something I'm genuinely proud of. Your future self can sprint up stairs without thinking about it. Start with a walk today.`;
  }

  if (lower.includes('happy') || lower.includes('happiness') || lower.includes('joy') || lower.includes('sad')) {
    return `Happiness isn't a destination — I learned that the hard way. It's a practice. Three things changed my baseline: gratitude journaling (2 minutes, morning), digital detox after 9pm, and being ruthless about who I spent energy on. Try one this week.`;
  }

  if (lower.includes('regret') || lower.includes('mistake') || lower.includes('wrong')) {
    return `My biggest regret wasn't the things I tried and failed. It was the things I didn't try because I was afraid of what people would think. Stop curating yourself for an audience. Live the life you'd be proud to look back on.`;
  }

  if (lower.includes('study') || lower.includes('learn') || lower.includes('skill') || lower.includes('course')) {
    return `I put off learning ${topGoal.includes('career') ? 'that technical skill' : 'the new domain'} for almost a year. The day I started, it took 30 minutes a day. In six months I was ahead of people who'd been in the field for years. Time-in doesn't beat intensity-of-focus. Start today.`;
  }

  // Default thoughtful response
  const defaults = [
    `${name}, the you standing where I am made a decision around where you are right now. I chose to show up consistently even when I didn't feel ready. That's the whole secret. What's one thing you can do in the next 24 hours toward ${topGoal}?`,
    `Looking back from here, the compounding effect of your daily choices is breathtaking. Small decisions — made consistently — build the life you actually want. What feels like an obstacle right now?`,
    `The version of you asking this question already has the answer somewhere inside. I know because I was you. Trust that instinct you keep second-guessing. What's really stopping you?`,
    `Every meaningful thing in my life right now traces back to a decision you haven't made yet. That's simultaneously terrifying and empowering. What are you waiting for?`,
  ];

  return defaults[history.length % defaults.length];
}
