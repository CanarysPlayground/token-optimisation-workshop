import { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, BarChart, Bar
} from 'recharts';
import type { RealityPath } from '../../types';
import { useStore } from '../../store/useStore';

const REALITY_PAIRS: { title: string; pathA: Omit<RealityPath, 'id'>; pathB: Omit<RealityPath, 'id'> }[] = [
  {
    title: 'Study vs Skip',
    pathA: {
      label: '📚 Study consistently',
      decision: 'Dedicate 1h/day to skill development',
      color: '#a855f7',
      finalScore: 82,
      outcomes: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        career: Math.min(95, 45 + i * 5),
        health: 60 + i,
        wealth: 50 + i * 3,
        happiness: 55 + i * 3,
      })),
    },
    pathB: {
      label: '😴 Skip learning',
      decision: 'No structured learning for 1 year',
      color: '#ef4444',
      finalScore: 31,
      outcomes: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        career: Math.max(20, 70 - i * 5),
        health: 60 - i,
        wealth: 50 - i * 2,
        happiness: 55 - i * 3,
      })),
    },
  },
  {
    title: 'Exercise vs Sedentary',
    pathA: {
      label: '🏃 Daily exercise',
      decision: 'Exercise 30 mins every day',
      color: '#10b981',
      finalScore: 88,
      outcomes: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        career: 55 + i * 2,
        health: Math.min(95, 40 + i * 6),
        wealth: 55 + i,
        happiness: Math.min(90, 45 + i * 5),
      })),
    },
    pathB: {
      label: '🛋️ No exercise',
      decision: 'Remain sedentary, skip workouts',
      color: '#f97316',
      finalScore: 28,
      outcomes: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        career: 55 - i,
        health: Math.max(15, 65 - i * 5),
        wealth: 55 - i,
        happiness: Math.max(20, 60 - i * 4),
      })),
    },
  },
  {
    title: 'Save vs Spend',
    pathA: {
      label: '💰 Save & invest',
      decision: 'Save 20% monthly, auto-invest',
      color: '#f59e0b',
      finalScore: 79,
      outcomes: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        career: 55 + i * 2,
        health: 60 + i,
        wealth: Math.min(95, 35 + i * 7),
        happiness: 55 + i * 2,
      })),
    },
    pathB: {
      label: '💸 Spend freely',
      decision: 'No savings discipline, lifestyle inflation',
      color: '#ec4899',
      finalScore: 34,
      outcomes: Array.from({ length: 12 }, (_, i) => ({
        month: i + 1,
        career: 55,
        health: 60,
        wealth: Math.max(10, 60 - i * 5),
        happiness: Math.max(25, 65 - i * 3),
      })),
    },
  },
];

export function AlternateReality() {
  const { addXp, unlockBadge } = useStore();
  const [selected, setSelected] = useState(0);
  const [metric, setMetric] = useState<'career' | 'health' | 'wealth' | 'happiness'>('career');
  const [viewed, setViewed] = useState(false);

  const pair = REALITY_PAIRS[selected];

  const handleSelect = (i: number) => {
    setSelected(i);
    if (!viewed) {
      addXp(75);
      unlockBadge('reality-bender');
      setViewed(true);
    }
  };

  const combined = pair.pathA.outcomes.map((a, i) => ({
    month: a.month,
    [pair.pathA.label]: a[metric],
    [pair.pathB.label]: pair.pathB.outcomes[i][metric],
  }));

  const barData = [
    { name: 'Career', A: pair.pathA.outcomes[11].career, B: pair.pathB.outcomes[11].career },
    { name: 'Health', A: pair.pathA.outcomes[11].health, B: pair.pathB.outcomes[11].health },
    { name: 'Wealth', A: pair.pathA.outcomes[11].wealth, B: pair.pathB.outcomes[11].wealth },
    { name: 'Happiness', A: pair.pathA.outcomes[11].happiness, B: pair.pathB.outcomes[11].happiness },
  ];

  const tooltipStyle = {
    contentStyle: { background: '#141428', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 },
    labelStyle: { color: 'rgba(255,255,255,0.6)' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-orbitron text-2xl font-bold text-white flex items-center gap-2">
          <GitBranch className="text-neon-pink" size={24} /> Alternate Reality
        </h1>
        <p className="text-white/40 text-sm mt-0.5">Compare two life paths side by side</p>
      </div>

      {/* Scenario selector */}
      <div className="flex gap-3 flex-wrap">
        {REALITY_PAIRS.map((p, i) => (
          <button
            key={p.title}
            onClick={() => handleSelect(i)}
            className={`px-4 py-2 rounded-xl text-sm border transition-all ${selected === i ? 'border-neon-pink/40 bg-neon-pink/10 text-neon-pink' : 'border-white/10 text-white/50 hover:border-white/20 hover:text-white/70'}`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* Path A vs B cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[pair.pathA, pair.pathB].map((path, i) => (
          <motion.div
            key={path.label}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-xl bg-dark-800/80 rounded-2xl p-5 border"
            style={{ borderColor: `${path.color}40` }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: path.color, boxShadow: `0 0 8px ${path.color}` }} />
              <span className="font-bold text-white text-sm">{path.label}</span>
            </div>
            <p className="text-white/50 text-xs mb-4 italic">&ldquo;{path.decision}&rdquo;</p>
            <div className="flex items-end gap-2">
              <div
                className="text-5xl font-orbitron font-black"
                style={{ color: path.color, textShadow: `0 0 20px ${path.color}50` }}
              >
                {path.finalScore}
              </div>
              <div className="text-white/40 text-xs mb-1.5">/ 100 life score at 12 months</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Metric tabs */}
      <div className="flex gap-2">
        {(['career', 'health', 'wealth', 'happiness'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMetric(m)}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-all capitalize ${metric === m ? 'border-neon-pink/40 bg-neon-pink/10 text-neon-pink' : 'border-white/10 text-white/40 hover:border-white/20'}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Line chart */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="backdrop-blur-xl bg-dark-800/80 border border-white/10 rounded-2xl p-5"
      >
        <h3 className="font-orbitron text-sm font-bold text-white mb-4 capitalize">{metric} — Path A vs B</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={combined}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tickFormatter={(v) => `M${v}`} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
            <Line type="monotone" dataKey={pair.pathA.label} stroke={pair.pathA.color} strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey={pair.pathB.label} stroke={pair.pathB.color} strokeWidth={2.5} dot={false} strokeDasharray="5 3" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bar comparison at month 12 */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="backdrop-blur-xl bg-dark-800/80 border border-white/10 rounded-2xl p-5"
      >
        <h3 className="font-orbitron text-sm font-bold text-white mb-4">📊 All Areas — End of Year 1</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={barData} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
            <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
            <Tooltip {...tooltipStyle} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
            <Bar dataKey="A" name={pair.pathA.label} fill={pair.pathA.color} radius={[4, 4, 0, 0]} fillOpacity={0.85} />
            <Bar dataKey="B" name={pair.pathB.label} fill={pair.pathB.color} radius={[4, 4, 0, 0]} fillOpacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
