import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { Decision } from '../../types';
import { analyzeDecision } from '../../utils/aiSimulator';
import { useStore } from '../../store/useStore';

const PRESET_QUESTIONS = [
  "What if I don't study for 2 months?",
  "What if I switch jobs right now?",
  "What if I start exercising daily?",
  "What if I start saving 20% of my income?",
  "What if I spend 4+ hours daily on social media?",
];

function ImpactBar({ label, value, emoji }: { label: string; value: number; emoji: string }) {
  const pct = Math.abs(value) * 10;
  const positive = value >= 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="w-20 text-white/50 text-xs">{emoji} {label}</span>
      <div className="flex-1 flex items-center gap-1">
        <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${positive ? 'bg-green-500' : 'bg-red-500'}`}
          />
        </div>
        <span className={`text-xs font-bold w-8 text-right ${positive ? 'text-green-400' : 'text-red-400'}`}>
          {positive ? '+' : ''}{value}
        </span>
      </div>
    </div>
  );
}

export function DecisionSimulator() {
  const { addXp, unlockBadge } = useStore();
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState<Decision | null>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<'short' | 'long'>('short');

  const simulate = (q: string) => {
    setLoading(true);
    setQuestion(q);
    setTimeout(() => {
      const decision = analyzeDecision(q);
      setResult(decision);
      setLoading(false);
      addXp(50);
      unlockBadge('decision-maker');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-orbitron text-2xl font-bold text-white flex items-center gap-2">
          <Zap className="text-neon-yellow" size={24} /> Decision Simulator
        </h1>
        <p className="text-white/50 text-sm mt-1">Ask "What if…" — see where your life goes.</p>
      </div>

      {/* Input */}
      <div className="backdrop-blur-xl bg-dark-800/80 border border-white/10 rounded-2xl p-5 space-y-3">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-neon-yellow/60 transition-colors"
            placeholder='Try: "What if I quit my job?"'
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && question.trim() && simulate(question)}
          />
          <button
            onClick={() => question.trim() && simulate(question)}
            disabled={loading}
            className="px-5 py-3 bg-gradient-to-r from-neon-yellow/80 to-neon-yellow rounded-xl font-bold text-black hover:opacity-90 transition-all disabled:opacity-40"
          >
            {loading ? '...' : <ChevronRight size={20} />}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => simulate(q)}
              className="text-xs px-3 py-1.5 border border-white/10 rounded-full text-white/50 hover:border-neon-yellow/40 hover:text-neon-yellow transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-2 border-neon-yellow/50 border-t-neon-yellow rounded-full animate-spin mx-auto" />
              <p className="text-white/50 text-sm">Simulating your future…</p>
            </div>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
            {/* Impact comparison */}
            <div className="backdrop-blur-xl bg-dark-800/80 border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex border-b border-white/10">
                <button
                  onClick={() => setTab('short')}
                  className={`flex-1 py-3 text-sm font-medium transition-all ${tab === 'short' ? 'bg-neon-yellow/10 text-neon-yellow border-b-2 border-neon-yellow' : 'text-white/40 hover:text-white/60'}`}
                >
                  Short-Term Impact
                </button>
                <button
                  onClick={() => setTab('long')}
                  className={`flex-1 py-3 text-sm font-medium transition-all ${tab === 'long' ? 'bg-neon-purple/10 text-neon-purple border-b-2 border-neon-purple' : 'text-white/40 hover:text-white/60'}`}
                >
                  Long-Term Impact
                </button>
              </div>
              <div className="p-5 space-y-4">
                <p className="text-white/70 text-sm italic border-l-2 border-neon-yellow/50 pl-3">
                  "{tab === 'short' ? result.shortTermImpact.summary : result.longTermImpact.summary}"
                </p>
                <div className="space-y-3">
                  {([['Career', '💼', tab === 'short' ? result.shortTermImpact.career : result.longTermImpact.career],
                    ['Health', '🏃', tab === 'short' ? result.shortTermImpact.health : result.longTermImpact.health],
                    ['Wealth', '💰', tab === 'short' ? result.shortTermImpact.wealth : result.longTermImpact.wealth],
                    ['Happiness', '😊', tab === 'short' ? result.shortTermImpact.happiness : result.longTermImpact.happiness],
                  ] as [string, string, number][]).map(([label, emoji, val]) => (
                    <ImpactBar key={label} label={label} value={val} emoji={emoji} />
                  ))}
                </div>
                <div className={`flex items-center gap-2 text-sm mt-3 px-3 py-2 rounded-lg border ${tab === 'long' && (result.longTermImpact.career + result.longTermImpact.health + result.longTermImpact.wealth) > 0 ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-red-500/30 bg-red-500/10 text-red-400'}`}>
                  {(tab === 'long' ? (result.longTermImpact.career + result.longTermImpact.health) : (result.shortTermImpact.career)) >= 0
                    ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {tab === 'long' ? 'Long-term' : 'Short-term'} trajectory: {result.probability}% likelihood this plays out as simulated
                </div>
              </div>
            </div>

            {/* Life path chart */}
            <div className="backdrop-blur-xl bg-dark-800/80 border border-white/10 rounded-2xl p-5">
              <h3 className="font-orbitron text-sm font-bold text-white mb-4">📈 12-Month Life Path</h3>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={result.lifePath}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
                    tickFormatter={(v) => `M${v}`} />
                  <YAxis domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: '#141428', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                    labelStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                    itemStyle={{ color: '#f59e0b' }}
                    formatter={(val, _name, item) => [val, item.payload.event]}
                  />
                  <Line type="monotone" dataKey="score" stroke="#f59e0b" strokeWidth={2.5}
                    dot={{ fill: '#f59e0b', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-3 space-y-1">
                {result.lifePath.filter((_, i) => i % 3 === 0).map((step) => (
                  <div key={step.month} className="flex items-center gap-2 text-xs text-white/40">
                    <span className="text-neon-yellow/60 w-6">M{step.month}</span>
                    <span>{step.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
