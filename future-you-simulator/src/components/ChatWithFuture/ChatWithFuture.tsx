import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, RefreshCw } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { generateFutureResponse } from '../../utils/aiSimulator';
import { useStore } from '../../store/useStore';

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isFuture = msg.role === 'future';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: isFuture ? -10 : 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      className={`flex ${isFuture ? 'justify-start' : 'justify-end'} mb-4`}
    >
      {isFuture && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0 shadow-neon-purple">
          F
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isFuture
            ? 'bg-dark-700 border border-neon-purple/20 text-white/90 rounded-tl-sm'
            : 'bg-gradient-to-br from-neon-purple/30 to-neon-cyan/20 border border-neon-purple/30 text-white rounded-tr-sm'
        }`}
      >
        {msg.content}
        <div className="text-white/20 text-xs mt-1">
          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}

const STARTER_PROMPTS = [
  "Am I on the right track?",
  "What's your biggest regret?",
  "How do I stay motivated?",
  "What habit changed your life most?",
  "Am I making good use of my time?",
];

export function ChatWithFuture() {
  const { profile, messages, addMessage, clearMessages, addXp, unlockBadge } = useStore();
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim() || !profile) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    addMessage(userMsg);
    setInput('');
    setTyping(true);
    addXp(20);
    unlockBadge('conversationalist');

    // Simulate typing delay (600–1400ms)
    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const response = generateFutureResponse(text, profile, messages);
      addMessage({
        id: crypto.randomUUID(),
        role: 'future',
        content: response,
        timestamp: new Date(),
      });
      setTyping(false);
    }, delay);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-orbitron text-2xl font-bold text-white flex items-center gap-2">
            <MessageCircle className="text-neon-cyan" size={24} /> Chat with Future You
          </h1>
          <p className="text-white/40 text-sm mt-0.5">
            AI-powered conversation with {profile?.name} from the future
          </p>
        </div>
        <button
          onClick={clearMessages}
          className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors px-3 py-2 border border-white/10 rounded-lg hover:border-white/20"
        >
          <RefreshCw size={12} /> New Chat
        </button>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto backdrop-blur-xl bg-dark-800/60 border border-white/10 rounded-2xl p-4 min-h-0">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-6">
            <div className="text-6xl animate-float">🔮</div>
            <div className="text-center">
              <p className="text-white/60 font-medium">Your future self is waiting…</p>
              <p className="text-white/30 text-sm mt-1">Ask anything. No judgment. Pure clarity.</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center max-w-md">
              {STARTER_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => sendMessage(p)}
                  className="text-xs px-4 py-2 border border-neon-cyan/30 text-neon-cyan/80 rounded-full hover:bg-neon-cyan/10 transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}
            <AnimatePresence>
              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start mb-4"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-white text-xs font-bold mr-2 shrink-0 shadow-neon-purple">
                    F
                  </div>
                  <div className="bg-dark-700 border border-neon-purple/20 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-neon-purple rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mt-3">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan/60 transition-colors"
            placeholder="Ask your future self anything…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || typing}
            className="px-5 py-3 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-xl text-white font-bold hover:opacity-90 transition-all disabled:opacity-40"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-xs text-white/20 mt-2 text-center">
          AI responses are simulated · Workshop demo for GitHub Copilot Token Optimization
        </p>
      </div>
    </div>
  );
}
