import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Zap, Activity, DollarSign, BookOpen, Heart, Smile } from 'lucide-react';
import type { Goal, Habit, GoalCategory } from '../../types';
import { useStore } from '../../store/useStore';

const CATEGORY_ICONS: Record<GoalCategory, React.ReactNode> = {
  career: <Zap size={14} />,
  fitness: <Activity size={14} />,
  finance: <DollarSign size={14} />,
  education: <BookOpen size={14} />,
  relationships: <Heart size={14} />,
  mindfulness: <Smile size={14} />,
};

const CATEGORY_COLORS: Record<GoalCategory, string> = {
  career: 'text-neon-purple border-neon-purple/40 bg-neon-purple/10',
  fitness: 'text-neon-green border-neon-green/40 bg-neon-green/10',
  finance: 'text-neon-yellow border-neon-yellow/40 bg-neon-yellow/10',
  education: 'text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10',
  relationships: 'text-neon-pink border-neon-pink/40 bg-neon-pink/10',
  mindfulness: 'text-purple-300 border-purple-300/40 bg-purple-300/10',
};

export function OnboardingForm() {
  const { setProfile, setView } = useStore();

  const [name, setName] = useState('');
  const [age, setAge] = useState(25);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [step, setStep] = useState(0); // 0=intro, 1=identity, 2=goals, 3=habits

  const [newGoal, setNewGoal] = useState<Partial<Goal>>({ category: 'career', currentValue: 0 });
  const [newHabit, setNewHabit] = useState<Partial<Habit>>({ frequency: 'daily', isPositive: true, hoursPerWeek: 1 });

  const addGoal = () => {
    if (!newGoal.description || !newGoal.targetValue) return;
    setGoals((g) => [
      ...g,
      { ...newGoal, id: crypto.randomUUID(), unit: newGoal.unit ?? '' } as Goal,
    ]);
    setNewGoal({ category: 'career', currentValue: 0 });
  };

  const addHabit = () => {
    if (!newHabit.description) return;
    setHabits((h) => [...h, { ...newHabit, id: crypto.randomUUID() } as Habit]);
    setNewHabit({ frequency: 'daily', isPositive: true, hoursPerWeek: 1 });
  };

  const handleFinish = () => {
    if (!name) return;
    setProfile({ name, age, goals, habits, createdAt: new Date() });
    setView('dashboard');
  };

  const steps = [
    { label: 'Intro', icon: '🌌' },
    { label: 'Identity', icon: '👤' },
    { label: 'Goals', icon: '🎯' },
    { label: 'Habits', icon: '🔥' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(168,85,247,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <motion.div
        className="relative z-10 w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Step indicator */}
        <div className="flex justify-center gap-3 mb-8">
          {steps.map((s, i) => (
            <button
              key={s.label}
              onClick={() => i <= step && setStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                i === step
                  ? 'border-neon-purple bg-neon-purple/20 text-neon-purple shadow-neon-purple'
                  : i < step
                  ? 'border-green-500/40 bg-green-500/10 text-green-400'
                  : 'border-white/10 text-white/30'
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        <div className="backdrop-blur-xl bg-dark-800/80 border border-white/10 rounded-2xl p-8 shadow-glass">

          {/* Step 0: Intro */}
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
              <div className="text-8xl mb-4 animate-float inline-block">🔮</div>
              <h1 className="font-orbitron text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">
                Future You Simulator
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
                Talk to the version of yourself 1 year or 5 years from now.<br />
                Simulate decisions. See outcomes. Level up your life.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[['🤖', 'AI Future Self'], ['📊', 'Life Visualization'], ['⚡', 'Decision Sim']].map(([icon, label]) => (
                  <div key={label} className="border border-white/10 rounded-xl p-3 bg-white/5">
                    <div className="text-2xl mb-1">{icon}</div>
                    <div className="text-xs text-white/60">{label}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="w-full py-4 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl font-orbitron font-bold text-white text-lg shadow-neon-purple hover:opacity-90 transition-all mt-4"
              >
                BEGIN YOUR JOURNEY →
              </button>
            </motion.div>
          )}

          {/* Step 1: Identity */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div>
                <h2 className="font-orbitron text-2xl font-bold text-white mb-1">Who Are You?</h2>
                <p className="text-white/50 text-sm">Your future self needs to know where you're starting from.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Your Name</label>
                  <input
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-neon-purple/60 transition-colors"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Current Age: <span className="text-neon-cyan font-bold">{age}</span></label>
                  <input
                    type="range" min={15} max={65} value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <div className="flex justify-between text-white/30 text-xs mt-1">
                    <span>15</span><span>65</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(0)} className="flex-1 py-3 border border-white/10 rounded-xl text-white/60 hover:border-white/30 transition-colors">← Back</button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!name}
                  className="flex-1 py-3 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl font-bold text-white disabled:opacity-40 transition-all hover:opacity-90"
                >
                  Next: Set Goals →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div>
                <h2 className="font-orbitron text-2xl font-bold text-white mb-1">Your Goals</h2>
                <p className="text-white/50 text-sm">What does {name} want to achieve? Add at least one goal.</p>
              </div>

              {goals.map((g) => (
                <div key={g.id} className={`flex items-center gap-3 p-3 rounded-xl border ${CATEGORY_COLORS[g.category]}`}>
                  <span className="text-lg">{CATEGORY_ICONS[g.category]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{g.description}</div>
                    <div className="text-xs text-white/50">{g.category} · target: {g.targetValue} {g.unit}</div>
                  </div>
                  <button onClick={() => setGoals((g2) => g2.filter((x) => x.id !== g.id))} className="text-white/30 hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              <div className="border border-white/10 rounded-xl p-4 space-y-3 bg-white/5">
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(CATEGORY_ICONS) as GoalCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNewGoal((g) => ({ ...g, category: cat }))}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${newGoal.category === cat ? CATEGORY_COLORS[cat] : 'border-white/10 text-white/40 hover:border-white/30'}`}
                    >
                      {CATEGORY_ICONS[cat]} {cat}
                    </button>
                  ))}
                </div>
                <input
                  className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-neon-purple/60"
                  placeholder="Goal description (e.g. Get promoted to senior developer)"
                  value={newGoal.description ?? ''}
                  onChange={(e) => setNewGoal((g) => ({ ...g, description: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    className="bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-neon-purple/60"
                    placeholder="Target value (e.g. 100)"
                    value={newGoal.targetValue ?? ''}
                    onChange={(e) => setNewGoal((g) => ({ ...g, targetValue: Number(e.target.value) }))}
                  />
                  <input
                    className="bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-neon-purple/60"
                    placeholder="Unit (e.g. kg, $, %)"
                    value={newGoal.unit ?? ''}
                    onChange={(e) => setNewGoal((g) => ({ ...g, unit: e.target.value }))}
                  />
                </div>
                <button onClick={addGoal} className="w-full py-2 border border-neon-purple/40 text-neon-purple rounded-lg hover:bg-neon-purple/10 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Plus size={14} /> Add Goal
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-white/10 rounded-xl text-white/60 hover:border-white/30 transition-colors">← Back</button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl font-bold text-white hover:opacity-90 transition-all"
                >
                  Next: Habits →
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Habits */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div>
                <h2 className="font-orbitron text-2xl font-bold text-white mb-1">Your Habits</h2>
                <p className="text-white/50 text-sm">What do you do regularly? Be honest — both good and bad.</p>
              </div>

              {habits.map((h) => (
                <div key={h.id} className={`flex items-center gap-3 p-3 rounded-xl border ${h.isPositive ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-red-500/30 bg-red-500/10 text-red-400'}`}>
                  <span>{h.isPositive ? '✅' : '⚠️'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{h.description}</div>
                    <div className="text-xs text-white/40">{h.frequency} · ~{h.hoursPerWeek}h/week</div>
                  </div>
                  <button onClick={() => setHabits((h2) => h2.filter((x) => x.id !== h.id))} className="text-white/30 hover:text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              <div className="border border-white/10 rounded-xl p-4 space-y-3 bg-white/5">
                <div className="flex gap-2">
                  <button
                    onClick={() => setNewHabit((h) => ({ ...h, isPositive: true }))}
                    className={`flex-1 py-2 rounded-lg text-sm border transition-all ${newHabit.isPositive ? 'border-green-500/40 bg-green-500/10 text-green-400' : 'border-white/10 text-white/40'}`}
                  >
                    ✅ Positive Habit
                  </button>
                  <button
                    onClick={() => setNewHabit((h) => ({ ...h, isPositive: false }))}
                    className={`flex-1 py-2 rounded-lg text-sm border transition-all ${!newHabit.isPositive ? 'border-red-500/40 bg-red-500/10 text-red-400' : 'border-white/10 text-white/40'}`}
                  >
                    ⚠️ Negative Habit
                  </button>
                </div>
                <input
                  className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-neon-purple/60"
                  placeholder="Habit description (e.g. Reading 30 min daily)"
                  value={newHabit.description ?? ''}
                  onChange={(e) => setNewHabit((h) => ({ ...h, description: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-2">
                  <select
                    className="bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple/60"
                    value={newHabit.frequency}
                    onChange={(e) => setNewHabit((h) => ({ ...h, frequency: e.target.value as Habit['frequency'] }))}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <input
                      type="number" min={0.5} max={40} step={0.5}
                      className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neon-purple/60"
                      value={newHabit.hoursPerWeek}
                      onChange={(e) => setNewHabit((h) => ({ ...h, hoursPerWeek: Number(e.target.value) }))}
                    />
                    <span className="text-white/40 text-xs whitespace-nowrap">h/wk</span>
                  </div>
                </div>
                <button onClick={addHabit} className="w-full py-2 border border-neon-cyan/40 text-neon-cyan rounded-lg hover:bg-neon-cyan/10 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Plus size={14} /> Add Habit
                </button>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 border border-white/10 rounded-xl text-white/60 hover:border-white/30 transition-colors">← Back</button>
                <button
                  onClick={handleFinish}
                  className="flex-2 flex-1 py-3 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-cyan rounded-xl font-orbitron font-bold text-white hover:opacity-90 transition-all shadow-neon-purple"
                >
                  🚀 LAUNCH SIMULATION
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
