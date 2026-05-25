import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Brain, Zap, MessageCircle, GitBranch, BarChart2, Trophy, TrendingUp, AlertTriangle } from 'lucide-react';
import type { AppView } from '../../types';

function ScoreRing({ value, color, label }: { value: number; color: string; label: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <svg width="72" height="72" className="-rotate-90">
          <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
          <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">{value}</span>
      </div>
      <span className="text-white/50 text-xs">{label}</span>
    </div>
  );
}

function QuickCard({ title, icon, view, gradient, description }: {
  title: string; icon: React.ReactNode; view: AppView; gradient: string; description: string;
}) {
  const { setView } = useStore();
  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => setView(view)}
      className={`text-left p-5 rounded-2xl bg-gradient-to-br ${gradient} border border-white/10 hover:border-white/20 transition-all`}
    >
      <div className="mb-3 opacity-80">{icon}</div>
      <div className="font-orbitron font-bold text-white text-sm mb-1">{title}</div>
      <div className="text-white/60 text-xs leading-relaxed">{description}</div>
    </motion.button>
  );
}

export function Dashboard() {
  const { profile, projection1Year, projection5Year, level, totalXp } = useStore();
  if (!profile || !projection1Year || !projection5Year) return null;

  const xpToNext = (level * 500) - totalXp;
  const xpPct = ((500 - xpToNext) / 500) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-orbitron text-3xl font-bold text-white">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan">{profile.name}</span>
            </h1>
            <p className="text-white/50 mt-1">Age {profile.age} → {profile.age + 1} · {profile.goals.length} goals · {profile.habits.length} habits tracked</p>
          </div>
          <div className="text-right">
            <div className="font-orbitron text-neon-purple text-xl font-bold">Level {level}</div>
            <div className="text-white/40 text-xs">{totalXp} XP total</div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="mt-4 h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-purple to-neon-cyan rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${xpPct}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <div className="text-xs text-white/30 mt-1">{xpToNext} XP to Level {level + 1}</div>
      </motion.div>

      {/* 1-Year Projection */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="backdrop-blur-xl bg-dark-800/80 border border-neon-purple/20 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <Brain size={18} className="text-neon-purple" />
          <h2 className="font-orbitron font-bold text-white">1-Year Future You</h2>
          <span className="ml-auto text-xs text-neon-purple border border-neon-purple/30 bg-neon-purple/10 px-2 py-0.5 rounded-full">Age {profile.age + 1}</span>
        </div>
        <div className="flex gap-6 justify-around">
          <ScoreRing value={projection1Year.skillScore} color="#a855f7" label="Career" />
          <ScoreRing value={projection1Year.healthScore} color="#10b981" label="Health" />
          <ScoreRing value={projection1Year.wealthScore} color="#f59e0b" label="Wealth" />
          <ScoreRing value={projection1Year.happinessScore} color="#06b6d4" label="Joy" />
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projection1Year.achievements.map((a) => (
            <div key={a} className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2">
              <TrendingUp size={12} /> {a}
            </div>
          ))}
          {projection1Year.warnings.map((w) => (
            <div key={w} className="flex items-center gap-2 text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 rounded-lg px-3 py-2">
              <AlertTriangle size={12} /> {w}
            </div>
          ))}
        </div>
      </motion.div>

      {/* 5-Year Projection */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="backdrop-blur-xl bg-dark-800/80 border border-neon-cyan/20 rounded-2xl p-6"
      >
        <div className="flex items-center gap-2 mb-5">
          <Zap size={18} className="text-neon-cyan" />
          <h2 className="font-orbitron font-bold text-white">5-Year Future You</h2>
          <span className="ml-auto text-xs text-neon-cyan border border-neon-cyan/30 bg-neon-cyan/10 px-2 py-0.5 rounded-full">Age {profile.age + 5}</span>
        </div>
        <div className="flex gap-6 justify-around">
          <ScoreRing value={projection5Year.skillScore} color="#a855f7" label="Career" />
          <ScoreRing value={projection5Year.healthScore} color="#10b981" label="Health" />
          <ScoreRing value={projection5Year.wealthScore} color="#f59e0b" label="Wealth" />
          <ScoreRing value={projection5Year.happinessScore} color="#06b6d4" label="Joy" />
        </div>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projection5Year.achievements.map((a) => (
            <div key={a} className="flex items-center gap-2 text-xs text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20 rounded-lg px-3 py-2">
              <TrendingUp size={12} /> {a}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick-access grid */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <QuickCard title="Decision Sim" icon={<Zap className="text-neon-yellow" size={22} />} view="decision"
          gradient="from-yellow-900/40 to-dark-800"
          description="What happens if I change course?" />
        <QuickCard title="Chat Future Me" icon={<MessageCircle className="text-neon-cyan" size={22} />} view="chat"
          gradient="from-cyan-900/40 to-dark-800"
          description="Talk to who you'll become" />
        <QuickCard title="Life Timeline" icon={<BarChart2 className="text-neon-green" size={22} />} view="timeline"
          gradient="from-green-900/40 to-dark-800"
          description="Your progress graph over time" />
        <QuickCard title="Alt Reality" icon={<GitBranch className="text-neon-pink" size={22} />} view="alternate"
          gradient="from-pink-900/40 to-dark-800"
          description="Path A vs Path B outcomes" />
        <QuickCard title="Growth System" icon={<Trophy className="text-neon-yellow" size={22} />} view="gamified"
          gradient="from-amber-900/40 to-dark-800"
          description="Badges, challenges, XP rewards" />
      </motion.div>
    </div>
  );
}
