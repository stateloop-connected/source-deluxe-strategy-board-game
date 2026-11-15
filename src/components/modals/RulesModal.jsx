import React from 'react';
import { X, CheckCircle2, Shield, Play, Sparkles } from 'lucide-react';

export default function RulesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const rules = [
    {
      title: 'Roll a 6 to Release Pawn',
      desc: 'Pawns start in your base yard. You must roll a 6 on the dice to move a pawn onto your starting track position.',
    },
    {
      title: 'Bonus Roll on 6 or Capture',
      desc: 'Rolling a 6 grants an immediate extra roll! Capturing an opponent or moving a pawn into Home also gives a bonus turn.',
    },
    {
      title: 'Safe Star Squares',
      desc: 'Cells marked with a star (including colored starting cells) are safe zones where multiple pawns can co-exist without being captured.',
    },
    {
      title: 'Capturing Opponents',
      desc: 'If your pawn lands on a square occupied by an opponent pawn on a normal track square, the opponent pawn is captured and sent back to base!',
    },
    {
      title: 'Winning the Match',
      desc: 'Navigate all 4 of your colored pawns around the perimeter track and through your home straight into the center triangle to claim victory!',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#0E1726] border-2 border-yellow-400 rounded-3xl p-6 shadow-2xl space-y-5 animate-scale-in max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Play size={18} className="text-yellow-400 fill-current" />
            <h3 className="font-heading text-xl font-bold text-white tracking-wide">
              How to Play Ludo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Rules Content */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
          {rules.map((r, i) => (
            <div key={i} className="bg-[#152033] rounded-2xl p-3.5 border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm">
                <CheckCircle2 size={16} />
                <span>{r.title}</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-light pl-6">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Got It Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 btn-3d-yellow rounded-2xl font-heading font-black text-sm text-slate-900 cursor-pointer shadow-lg"
        >
          Got It, Let's Play!
        </button>
      </div>
    </div>
  );
}
