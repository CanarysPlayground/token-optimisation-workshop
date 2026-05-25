import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  UserProfile, FutureProjection, ChatMessage, Badge, Challenge, AppView
} from '../types';
import { computeProjection, generateBadges, generateChallenges } from '../utils/progressCalculator';

interface AppState {
  // Navigation
  view: AppView;
  setView: (v: AppView) => void;

  // User
  profile: UserProfile | null;
  setProfile: (p: UserProfile) => void;

  // Projections
  projection1Year: FutureProjection | null;
  projection5Year: FutureProjection | null;

  // Chat
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;

  // Gamification
  badges: Badge[];
  challenges: Challenge[];
  totalXp: number;
  level: number;
  addXp: (amount: number) => void;
  unlockBadge: (id: string) => void;
  completeChallenge: (id: string) => void;

  // Reset
  reset: () => void;
}

const initialState = {
  view: 'onboarding' as AppView,
  profile: null,
  projection1Year: null,
  projection5Year: null,
  messages: [],
  badges: [],
  challenges: [],
  totalXp: 0,
  level: 1,
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,

      setView: (view) => set({ view }),

      setProfile: (profile) => {
        const projection1Year = computeProjection(profile, '1year');
        const projection5Year = computeProjection(profile, '5year');
        const badges = generateBadges(profile);
        const challenges = generateChallenges(profile);
        const totalXp = projection1Year.xp;
        const level = projection1Year.level;
        set({ profile, projection1Year, projection5Year, badges, challenges, totalXp, level });
      },

      addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      clearMessages: () => set({ messages: [] }),

      addXp: (amount) =>
        set((s) => {
          const totalXp = s.totalXp + amount;
          const level = Math.floor(totalXp / 500) + 1;
          return { totalXp, level };
        }),

      unlockBadge: (id) =>
        set((s) => ({
          badges: s.badges.map((b) =>
            b.id === id ? { ...b, unlocked: true, unlockedAt: new Date() } : b
          ),
        })),

      completeChallenge: (id) =>
        set((s) => {
          const challenge = s.challenges.find((c) => c.id === id);
          if (!challenge || challenge.completed) return s;
          return {
            challenges: s.challenges.map((c) =>
              c.id === id ? { ...c, completed: true } : c
            ),
            totalXp: s.totalXp + challenge.xpReward,
            level: Math.floor((s.totalXp + challenge.xpReward) / 500) + 1,
          };
        }),

      reset: () => set(initialState),
    }),
    {
      name: 'future-you-store',
      partialize: (state) => ({
        profile: state.profile,
        projection1Year: state.projection1Year,
        projection5Year: state.projection5Year,
        messages: state.messages,
        badges: state.badges,
        challenges: state.challenges,
        totalXp: state.totalXp,
        level: state.level,
      }),
    }
  )
);
