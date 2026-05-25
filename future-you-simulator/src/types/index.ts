// ─── Core User Profile ────────────────────────────────────────────────────
export interface UserProfile {
  name: string;
  age: number;
  goals: Goal[];
  habits: Habit[];
  createdAt: Date;
}

export interface Goal {
  id: string;
  category: GoalCategory;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
}

export interface Habit {
  id: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  isPositive: boolean;
  hoursPerWeek: number;
}

export type GoalCategory = 'career' | 'fitness' | 'finance' | 'education' | 'relationships' | 'mindfulness';

// ─── Future Self Projection ────────────────────────────────────────────────
export interface FutureProjection {
  timeframe: '1year' | '5year';
  skillScore: number;       // 0–100
  healthScore: number;      // 0–100
  wealthScore: number;      // 0–100
  happinessScore: number;   // 0–100
  achievements: string[];
  warnings: string[];
  level: number;
  xp: number;
}

// ─── Chat ──────────────────────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'user' | 'future';
  content: string;
  timestamp: Date;
}

// ─── Decision Simulator ────────────────────────────────────────────────────
export interface Decision {
  id: string;
  question: string;
  shortTermImpact: ImpactArea;
  longTermImpact: ImpactArea;
  probability: number; // 0–100
  lifePath: LifePathStep[];
}

export interface ImpactArea {
  career: number;   // -10 to +10
  health: number;
  wealth: number;
  happiness: number;
  summary: string;
}

export interface LifePathStep {
  month: number;
  event: string;
  score: number;
}

// ─── Alternate Reality ─────────────────────────────────────────────────────
export interface RealityPath {
  id: 'A' | 'B';
  label: string;
  decision: string;
  outcomes: PathOutcome[];
  finalScore: number;
  color: string;
}

export interface PathOutcome {
  month: number;
  career: number;
  health: number;
  wealth: number;
  happiness: number;
}

// ─── Gamification ─────────────────────────────────────────────────────────
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: GoalCategory;
  completed: boolean;
  daysLeft: number;
}

// ─── App View ─────────────────────────────────────────────────────────────
export type AppView = 'onboarding' | 'dashboard' | 'decision' | 'chat' | 'timeline' | 'alternate' | 'gamified';
