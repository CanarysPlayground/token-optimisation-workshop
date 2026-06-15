import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend
} from 'recharts';
import { useStore } from '../../store/useStore';

function buildTimelineData(profile: { age: number }, proj1: { skillScore: number; healthScore: number; wealthScore: number; happinessScore: number }, proj5: { skillScore: number; healthScore: number; wealthScore: number; happinessScore: number }) {
  const now = {
    label: 'Now', year: profile.age,
    career: Math.max(10, proj1.skillScore - 30),
    health: Math.max(10, proj1.healthScore - 25),
    wealth: Math.max(10, proj1.wealthScore - 35),
    happiness: Math.max(10, proj1.happinessScore - 20),
  };
  const y1 = {
    label: '+1 Year', year: profile.age + 1,
    career: proj1.skillScore, health: proj1.healthScore,
    wealth: proj1.wealthScore, happiness: proj1.happinessScore,
  };
  const y3 = {
    label: '+3 Years', year: profile.age + 3,
    career: Math.min(100, Math.round((proj1.skillScore + proj5.skillScore) / 2 + 5)),
    health: Math.min(100, Math.round((proj1.healthScore + proj5.healthScore) / 2 + 3)),
    wealth: Math.min(100, Math.round((proj1.wealthScore + proj5.wealthScore) / 2 + 4)),
    happiness: Math.min(100, Math.round((proj1.happinessScore + proj5.happinessScore) / 2 + 3)),
  };
  const y5 = {
    label: '+5 Years', year: profile.age + 5,
    career: proj5.skillScore, health: proj5.healthScore,
    wealth: proj5.wealthScore, happiness: proj5.happinessScore,
  };
  return [now, y1, y3, y5];
}

export function LifeTimeline() {
  const { profile, projection1Year, projection5Year, unlockBadge } = useStore();
  const [activeView, setActiveView] = useState<'area' | 'radar'>('area');

  useEffect(() => { unlockBadge('visionary'); }, []);

  if (!profile || !projection1Year || !projection5Year) return null;

  const data = buildTimelineData(profile, projection1Year, projection5Year);

  const radarData = [
    { subject: 'Career', now: data[0].career, y1: data[1].career, y5: data[3].career },
    { subject: 'Health', now: data[0].health, y1: data[1].health, y5: data[3].health },
    { subject: 'Wealth', now: data[0].wealth, y1: data[1].wealth, y5: data[3].wealth },
    { subject: 'Happiness', now: data[0].happiness, y1: data[1].happiness, y5: data[3].happiness },
  ];

  const tooltipStyle = {
    contentStyle: { background: '#141428', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12 },
    labelStyle: { color: 'rgba(255,255,255,0.6)' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-orbitron text-2xl font-bold text-white flex items-center gap-2">
            <BarChart2 className="text-neon-green" size={24} /> Life Timeline
          </h1>
          <p className="text-white/40 text-sm mt-0.5">Your projected growth across all life areas</p>
        </div>
        <div className="flex gap-2">
          {(['area', 'radar'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={`px-4 py-2 text-xs rounded-lg border transition-all ${activeView === v ? 'border-neon-green/40 bg-neon-green/10 text-neon-green' : 'border-white/10 text-white/40 hover:border-white/20'}`}
            >
              {v === 'area' ? '📈 Area' : '🕸️ Radar'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Career Growth', now: data[0].career, future: data[3].career, color: '#a855f7' },
          { label: 'Health Gain', now: data[0].health, future: data[3].health, color: '#10b981' },
          { label: 'Wealth Build', now: data[0].wealth, future: data[3].wealth, color: '#f59e0b' },
          { label: 'Happiness +', now: data[0].happiness, future: data[3].happiness, color: '#06b6d4' },
        ].map((item) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-xl bg-dark-800/80 border border-white/10 rounded-xl p-4"
          >
            <div className="text-white/40 text-xs mb-2">{item.label}</div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold" style={{ color: item.color }}>{item.future}</span>
              <span className="text-xs text-white/30 mb-0.5">from {item.now}</span>
            </div>
            <div className="mt-2 text-xs" style={{ color: item.color }}>
              +{item.future - item.now} pts over 5 years
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        className="backdrop-blur-xl bg-dark-800/80 border border-white/10 rounded-2xl p-6"
      >
        {activeView === 'area' ? (
          <>
            <h3 className="font-orbitron text-sm font-bold text-white mb-5">Progress Over Time</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={data}>
                <defs>
                  {[['career', '#a855f7'], ['health', '#10b981'], ['wealth', '#f59e0b'], ['happiness', '#06b6d4']].map(([key, color]) => (
                    <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="label" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                <Tooltip {...tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
                <Area type="monotone" dataKey="career" name="Career" stroke="#a855f7" fill="url(#grad-career)" strokeWidth={2} />
                <Area type="monotone" dataKey="health" name="Health" stroke="#10b981" fill="url(#grad-health)" strokeWidth={2} />
                <Area type="monotone" dataKey="wealth" name="Wealth" stroke="#f59e0b" fill="url(#grad-wealth)" strokeWidth={2} />
                <Area type="monotone" dataKey="happiness" name="Happiness" stroke="#06b6d4" fill="url(#grad-happiness)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </>
        ) : (
          <>
            <h3 className="font-orbitron text-sm font-bold text-white mb-5">Life Balance Radar</h3>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }} />
                <Radar name="Now" dataKey="now" stroke="#ffffff40" fill="#ffffff" fillOpacity={0.05} />
                <Radar name="+1 Year" dataKey="y1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} />
                <Radar name="+5 Years" dataKey="y5" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
                <Tooltip {...tooltipStyle} />
              </RadarChart>
            </ResponsiveContainer>
          </>
        )}
      </motion.div>

      {/* Achievements timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="backdrop-blur-xl bg-dark-800/80 border border-white/10 rounded-2xl p-5"
      >
        <h3 className="font-orbitron text-sm font-bold text-white mb-4">🏆 Achievement Milestones</h3>
        <div className="relative pl-4">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-neon-purple via-neon-cyan to-transparent" />
          {[
            { year: '+3mo', text: 'Habit momentum established', color: 'neon-purple' },
            { year: '+6mo', text: projection1Year.achievements[0] ?? 'Midpoint progress milestone', color: 'neon-cyan' },
            { year: '+1yr', text: projection1Year.achievements[1] ?? 'First-year benchmark hit', color: 'neon-green' },
            { year: '+3yr', text: 'Skills compound — leadership potential visible', color: 'neon-yellow' },
            { year: '+5yr', text: projection5Year.achievements[0] ?? 'Long-range vision achieved', color: 'neon-pink' },
          ].map((item) => (
            <div key={item.year} className="relative flex items-start gap-3 mb-4 pl-3">
              <div className={`absolute -left-[3px] top-1.5 w-2 h-2 rounded-full bg-${item.color} shadow-neon-purple`} />
              <span className={`text-xs font-bold text-${item.color} w-10 shrink-0`}>{item.year}</span>
              <span className="text-sm text-white/70">{item.text}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
