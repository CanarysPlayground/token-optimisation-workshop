import { motion } from 'framer-motion';
import { Trophy, Star, Zap } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Badge, Challenge } from '../../types';
import { clsx } from 'clsx';

function BadgeCard({ badge }: { badge: Badge }) {
  return (
    <motion.div
      whileHover={badge.unlocked ? { scale: 1.05, y: -2 } : {}}
      className={clsx(
        'relative p-4 rounded-2xl border text-center transition-all',
        badge.unlocked
          ? 'border-neon-yellow/30 bg-neon-yellow/5 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
          : 'border-white/5 bg-dark-700/50 opacity-40 grayscale'
      )}
    >
      <div className="text-3xl mb-2">{badge.icon}</div>
      <div className={`font-bold text-xs ${badge.unlocked ? 'text-neon-yellow' : 'text-white/40'}`}>{badge.name}</div>
      <div className="text-white/40 text-xs mt-0.5 leading-tight">{badge.description}</div>
      {badge.unlocked && (
        <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <Star size={8} className="text-white" fill="white" />
        </div>
      )}
    </motion.div>
  );
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const { completeChallenge } = useStore();
  const pct = challenge.completed ? 100 : 30;

  const catColors: Record<string, string> = {
    career: 'text-neon-purple border-neon-purple/30 bg-neon-purple/10',
    fitness: 'text-neon-green border-neon-green/30 bg-neon-green/10',
    finance: 'text-neon-yellow border-neon-yellow/30 bg-neon-yellow/10',
    education: 'text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10',
    relationships: 'text-neon-pink border-neon-pink/30 bg-neon-pink/10',
    mindfulness: 'text-purple-300 border-purple-300/30 bg-purple-300/10',
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={clsx(
        'p-4 rounded-2xl border transition-all',
        challenge.completed ? 'border-green-500/20 bg-green-500/5' : 'border-white/10 bg-dark-800/80'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className={clsx('text-xs px-2 py-0.5 rounded-full border font-medium', catColors[challenge.category] ?? 'text-white/50 border-white/20')}>
            {challenge.category}
          </span>
          <h3 className="font-bold text-white text-sm mt-2">{challenge.title}</h3>
          <p className="text-white/50 text-xs mt-0.5">{challenge.description}</p>
        </div>
        <div className="text-right shrink-0 ml-3">
          <div className="text-neon-yellow font-bold text-sm">+{challenge.xpReward} XP</div>
          {!challenge.completed && (
            <div className="text-white/30 text-xs mt-0.5">{challenge.daysLeft}d left</div>
          )}
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-white/30">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${challenge.completed ? 'bg-green-500' : 'bg-gradient-to-r from-neon-purple to-neon-cyan'}`}
          />
        </div>
      </div>

      {!challenge.completed && (
        <button
          onClick={() => completeChallenge(challenge.id)}
          className="mt-3 w-full py-2 text-xs border border-neon-purple/30 text-neon-purple rounded-lg hover:bg-neon-purple/10 transition-all font-medium"
        >
          ✓ Mark Complete
        </button>
      )}
      {challenge.completed && (
        <div className="mt-3 text-xs text-green-400 flex items-center gap-1 justify-center">
          <Star size={10} fill="currentColor" /> Completed — XP awarded
        </div>
      )}
    </motion.div>
  );
}

export function GamifiedGrowth() {
  const { profile, level, totalXp, badges, challenges } = useStore();

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const completedCount = challenges.filter((c) => c.completed).length;
  const xpToNext = level * 500 - totalXp;
  const xpPct = ((500 - xpToNext) / 500) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-orbitron text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="text-neon-yellow" size={24} /> Growth System
        </h1>
        <p className="text-white/40 text-sm mt-0.5">Level up your future self · earn badges · complete challenges</p>
      </div>

      {/* Level card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="backdrop-blur-xl bg-dark-800/80 border border-neon-yellow/20 rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-white/50 text-xs uppercase tracking-widest">Current Level</div>
            <div className="font-orbitron text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-yellow to-neon-pink mt-1">
              {level}
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/50 text-xs">Total XP</div>
            <div className="font-orbitron text-2xl font-bold text-neon-yellow">{totalXp.toLocaleString()}</div>
            <div className="text-white/30 text-xs mt-1">{xpToNext} XP to Level {level + 1}</div>
          </div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-yellow to-neon-pink flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">
            {profile?.name?.[0]?.toUpperCase()}
          </div>
        </div>

        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPct}%` }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-neon-yellow to-neon-pink rounded-full"
          />
        </div>

        {/* Stats row */}
        <div className="flex justify-around mt-4">
          {[
            { label: 'Badges', value: `${unlockedCount}/${badges.length}`, icon: <Trophy size={14} /> },
            { label: 'Challenges Done', value: `${completedCount}/${challenges.length}`, icon: <Zap size={14} /> },
            { label: 'XP This Level', value: `${500 - xpToNext}`, icon: <Star size={14} /> },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1 text-neon-yellow mb-1">{stat.icon}</div>
              <div className="font-bold text-white text-sm">{stat.value}</div>
              <div className="text-white/30 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Badges */}
      <div>
        <h2 className="font-orbitron text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Trophy size={14} className="text-neon-yellow" /> Badges
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {badges.map((b) => <BadgeCard key={b.id} badge={b} />)}
        </div>
      </div>

      {/* Challenges */}
      <div>
        <h2 className="font-orbitron text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Zap size={14} className="text-neon-cyan" /> Active Challenges
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {challenges.map((c) => <ChallengeCard key={c.id} challenge={c} />)}
        </div>
      </div>
    </div>
  );
}
