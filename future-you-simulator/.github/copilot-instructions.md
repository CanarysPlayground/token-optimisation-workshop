---
applyTo: "**"
---
Stack: React 18, TypeScript 5, Tailwind CSS 3, Zustand, Framer Motion, Recharts, Lucide React.
Style: functional components, named exports, no default exports except App.tsx.
State: all state via useStore (Zustand persist). No prop-drilling or local state for shared data.
Types: defined in src/types/index.ts — import from there, never redefine inline.
Theme: dark-900 bg, neon-purple/cyan/green/pink/yellow accents, glassmorphism cards (bg-dark-800/80 + border-white/10 + backdrop-blur-xl).
No comments unless logic is non-obvious. No JSDoc.
