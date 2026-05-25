import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useStore } from './store/useStore';
import { OnboardingForm } from './components/Onboarding/OnboardingForm';
import { Navbar } from './components/Layout/Navbar';
import { Dashboard } from './components/Dashboard/Dashboard';
import { DecisionSimulator } from './components/DecisionSimulator/DecisionSimulator';
import { ChatWithFuture } from './components/ChatWithFuture/ChatWithFuture';
import { LifeTimeline } from './components/LifeTimeline/LifeTimeline';
import { AlternateReality } from './components/AlternateReality/AlternateReality';
import { GamifiedGrowth } from './components/GamifiedGrowth/GamifiedGrowth';

const PAGE_MAP = {
  onboarding: null,
  dashboard: Dashboard,
  decision: DecisionSimulator,
  chat: ChatWithFuture,
  timeline: LifeTimeline,
  alternate: AlternateReality,
  gamified: GamifiedGrowth,
} as const;

export default function App() {
  const { view, profile, setView } = useStore();

  // If there's a stored profile but we're on onboarding, go to dashboard
  useEffect(() => {
    if (profile && view === 'onboarding') {
      setView('dashboard');
    }
  }, []);

  if (view === 'onboarding' || !profile) {
    return <OnboardingForm />;
  }

  const PageComponent = PAGE_MAP[view] ?? Dashboard;

  return (
    <div className="min-h-screen bg-dark-900 bg-particles">
      {/* Static grid overlay */}
      <div className="fixed inset-0 bg-grid opacity-100 pointer-events-none" />

      <Navbar />

      <main className="relative z-10 pt-20 pb-10 px-4 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <PageComponent />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
