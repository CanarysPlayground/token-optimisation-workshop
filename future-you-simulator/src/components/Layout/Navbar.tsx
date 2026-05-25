import { Brain, Zap, MessageCircle, GitBranch, BarChart2, Trophy, RotateCcw } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { AppView } from '../../types';
import { clsx } from 'clsx';

const NAV_ITEMS: { id: AppView; icon: React.ReactNode; label: string; color: string }[] = [
  { id: 'dashboard',  icon: <Brain size={18} />,         label: 'Dashboard',     color: 'neon-purple' },
  { id: 'decision',   icon: <Zap size={18} />,           label: 'Decision Sim',  color: 'neon-yellow' },
  { id: 'chat',       icon: <MessageCircle size={18} />, label: 'Chat Future Me',color: 'neon-cyan' },
  { id: 'timeline',   icon: <BarChart2 size={18} />,     label: 'Life Timeline', color: 'neon-green' },
  { id: 'alternate',  icon: <GitBranch size={18} />,     label: 'Alt Reality',   color: 'neon-pink' },
  { id: 'gamified',   icon: <Trophy size={18} />,        label: 'Growth',        color: 'neon-yellow' },
];

const COLOR_MAP: Record<string, string> = {
  'neon-purple': 'text-neon-purple border-neon-purple/40 bg-neon-purple/10 shadow-neon-purple',
  'neon-yellow': 'text-neon-yellow border-neon-yellow/40 bg-neon-yellow/10',
  'neon-cyan':   'text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10 shadow-neon-cyan',
  'neon-green':  'text-neon-green border-neon-green/40 bg-neon-green/10 shadow-neon-green',
  'neon-pink':   'text-neon-pink border-neon-pink/40 bg-neon-pink/10',
};

export function Navbar() {
  const { view, setView, profile, level, totalXp, reset } = useStore();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-dark-800/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-4 shrink-0">
          <span className="text-2xl">🔮</span>
          <span className="font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan text-sm hidden sm:block">
            FUTURE YOU
          </span>
        </div>

        {/* Nav items */}
        <div className="flex items-center gap-1 overflow-x-auto flex-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={clsx(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all whitespace-nowrap',
                view === item.id
                  ? COLOR_MAP[item.color]
                  : 'text-white/40 border-transparent hover:text-white/70 hover:border-white/10'
              )}
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-xs font-medium text-white">{profile?.name}</span>
            <span className="text-xs text-neon-purple">Lv.{level} · {totalXp} XP</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white text-sm font-bold">
            {profile?.name?.[0]?.toUpperCase()}
          </div>
          <button
            onClick={() => { reset(); }}
            title="Reset simulation"
            className="p-2 text-white/30 hover:text-white/60 transition-colors"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>
    </nav>
  );
}
