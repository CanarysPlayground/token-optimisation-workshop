import type { UserProfile, FutureProjection, GoalCategory } from '../types';

// ─── Score engine ─────────────────────────────────────────────────────────

function positiveHabitWeight(profile: UserProfile): number {
  const pos = profile.habits.filter((h) => h.isPositive).reduce((a, h) => a + h.hoursPerWeek, 0);
  const neg = profile.habits.filter((h) => !h.isPositive).reduce((a, h) => a + h.hoursPerWeek, 0);
  const total = pos + neg;
  return total === 0 ? 0.5 : pos / total;
}

function goalProgress(profile: UserProfile): number {
  if (!profile.goals.length) return 0;
  return (
    profile.goals.reduce((sum, g) => {
      const ratio = Math.min(g.currentValue / Math.max(g.targetValue, 1), 1);
      return sum + ratio;
    }, 0) / profile.goals.length
  );
}

export function computeProjection(profile: UserProfile, timeframe: '1year' | '5year'): FutureProjection {
  const multiplier = timeframe === '1year' ? 1 : 3.5;
  const habitWeight = positiveHabitWeight(profile);
  const progress = goalProgress(profile);

  const base = 40 + habitWeight * 30 + progress * 20;
  const scaled = Math.min(100, base * (1 + (multiplier - 1) * 0.3));

  const careerGoals = profile.goals.filter((g) => g.category === 'career').length;
  const fitnessGoals = profile.goals.filter((g) => g.category === 'fitness').length;
  const financeGoals = profile.goals.filter((g) => g.category === 'finance').length;

  const skillScore = Math.round(Math.min(100, scaled + careerGoals * 5));
  const healthScore = Math.round(Math.min(100, scaled + fitnessGoals * 5));
  const wealthScore = Math.round(Math.min(100, scaled + financeGoals * 5));
  const happinessScore = Math.round(Math.min(100, scaled + habitWeight * 10));

  const xp = Math.round((skillScore + healthScore + wealthScore + happinessScore) * multiplier * 2);
  const level = Math.floor(xp / 500) + 1;

  const achievements: string[] = [];
  const warnings: string[] = [];

  if (skillScore > 70) achievements.push(timeframe === '1year' ? 'Promoted at work' : 'Senior role / leadership position');
  if (healthScore > 70) achievements.push(timeframe === '1year' ? 'Consistent workout routine' : 'Peak physical condition');
  if (wealthScore > 70) achievements.push(timeframe === '1year' ? 'Emergency fund secured' : 'Financial independence on track');
  if (happinessScore > 70) achievements.push('Strong mental well-being');
  if (achievements.length === 0) achievements.push('Baseline stability maintained');

  const negHours = profile.habits.filter((h) => !h.isPositive).reduce((a, h) => a + h.hoursPerWeek, 0);
  if (negHours > 20) warnings.push('High unproductive screen time is slowing progress');
  if (habitWeight < 0.4) warnings.push('More negative habits than positive — course correction needed');
  if (progress < 0.3) warnings.push('Goals are largely unstarted — pick one to focus on');

  return { timeframe, skillScore, healthScore, wealthScore, happinessScore, achievements, warnings, level, xp };
}

// ─── Badges ───────────────────────────────────────────────────────────────

const BADGE_DEFS = [
  { id: 'first-step', name: 'First Step', description: 'Completed onboarding', icon: '🚀', alwaysUnlocked: true },
  { id: 'goal-setter', name: 'Goal Setter', description: 'Added 3+ goals', icon: '🎯', minGoals: 3 },
  { id: 'habit-hero', name: 'Habit Hero', description: 'Added 3+ positive habits', icon: '💪', minPosHabits: 3 },
  { id: 'visionary', name: 'Visionary', description: 'Viewed 5-year projection', icon: '🔮', id5Year: true },
  { id: 'conversationalist', name: 'Conversationalist', description: 'Chatted with Future You', icon: '💬', manual: true },
  { id: 'decision-maker', name: 'Decision Maker', description: 'Ran a Decision Simulation', icon: '⚡', manual: true },
  { id: 'reality-bender', name: 'Reality Bender', description: 'Compared 2 life paths', icon: '🌌', manual: true },
  { id: 'level-5', name: 'Rising Star', description: 'Reached Level 5', icon: '⭐', minLevel: 5 },
];

export function generateBadges(profile: UserProfile): import('../types').Badge[] {
  const posHabits = profile.habits.filter((h) => h.isPositive).length;
  return BADGE_DEFS.map((def) => ({
    id: def.id,
    name: def.name,
    description: def.description,
    icon: def.icon,
    unlocked:
      ('alwaysUnlocked' in def && def.alwaysUnlocked === true) ||
      ('minGoals' in def && typeof def.minGoals === 'number' && profile.goals.length >= def.minGoals) ||
      ('minPosHabits' in def && typeof def.minPosHabits === 'number' && posHabits >= def.minPosHabits),
  }));
}

// ─── Challenges ───────────────────────────────────────────────────────────

export function generateChallenges(profile: UserProfile): import('../types').Challenge[] {
  const cats: GoalCategory[] = ['career', 'fitness', 'finance', 'education', 'relationships', 'mindfulness'];

  return cats.map((cat, i) => ({
    id: `challenge-${cat}`,
    title: challengeTitle(cat),
    description: challengeDesc(cat),
    xpReward: 100 + i * 25,
    category: cat,
    completed: profile.goals.some((g) => g.category === cat && g.currentValue / Math.max(g.targetValue, 1) >= 0.5),
    daysLeft: 7 + i * 3,
  }));
}

function challengeTitle(cat: GoalCategory): string {
  const map: Record<GoalCategory, string> = {
    career: 'Career Accelerator',
    fitness: 'Body Upgrade',
    finance: 'Money Mindset',
    education: 'Knowledge Sprint',
    relationships: 'Connection Builder',
    mindfulness: 'Inner Calm',
  };
  return map[cat];
}

function challengeDesc(cat: GoalCategory): string {
  const map: Record<GoalCategory, string> = {
    career: 'Complete one skill-building task this week',
    fitness: 'Exercise for 30 minutes three times this week',
    finance: 'Track every expense for 7 days',
    education: 'Read or study for 20 minutes each day',
    relationships: 'Reach out to one person you haven\'t spoken to recently',
    mindfulness: 'Meditate or journal for 10 minutes daily',
  };
  return map[cat];
}
