import React, { useState } from 'react';
import { X, Users, ArrowRight, Coins, Trophy } from 'lucide-react';
import Pawn from '../common/Pawn';

export default function SelectGameModal({
  isOpen,
  onClose,
  onStartMatch,
  userCoins = 10,
}) {
  const [selectedColor, setSelectedColor] = useState('yellow');
  const [playerCount, setPlayerCount] = useState(2);
  const [selectedBet, setSelectedBet] = useState(1);

  if (!isOpen) return null;

  const colors = [
    { id: 'yellow', label: 'Yellow', bg: '#F9B208' },
    { id: 'red', label: 'Red', bg: '#E53935' },
    { id: 'green', label: 'Green', bg: '#22A349' },
    { id: 'blue', label: 'Blue', bg: '#1B86FF' },
  ];

  const tables = [
    { entry: 1, win: 2 },
    { entry: 5, win: 10 },
    { entry: 10, win: 20 },
    { entry: 25, win: 50 },
    { entry: 50, win: 100 },
    { entry: 100, win: 200 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-sm bg-[#0E1726] border-2 border-[#F9B208] rounded-3xl p-6 shadow-2xl space-y-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="font-heading text-xl font-bold text-white tracking-wide">
            Match Setup
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Section 1: Select Your Color */}
        <div className="bg-[#152033] rounded-2xl p-4 border border-white/10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 block text-center">
            Select Your Color
          </span>
          <div className="flex items-center justify-around">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedColor(c.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl transition-all cursor-pointer ${
                  selectedColor === c.id
                    ? 'ring-2 ring-white scale-110 bg-white/10 shadow-lg'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Pawn color={c.id} size={28} />
                <span
                  className="w-4 h-4 rounded-full border-2 border-white"
                  style={{ backgroundColor: c.bg }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Section 2: Player Count (2 vs 4 Players) */}
        <div className="bg-[#152033] rounded-2xl p-3 border border-white/10 flex items-center justify-between">
          <span className="text-xs font-bold uppercase text-white/70 pl-2">Format</span>
          <div className="flex gap-2">
            {[2, 4].map((num) => (
              <button
                key={num}
                onClick={() => setPlayerCount(num)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  playerCount === num
                    ? 'bg-yellow-400 text-slate-900 shadow-md font-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Users size={13} />
                <span>{num} Players</span>
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Select Bet Table */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-white/70 block">
            Select Table Pool
          </span>
          <div className="grid grid-cols-3 gap-2.5">
            {tables.map((t) => (
              <button
                key={t.entry}
                onClick={() => setSelectedBet(t.entry)}
                className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                  selectedBet === t.entry
                    ? 'border-yellow-400 bg-yellow-400/20 text-white shadow-lg'
                    : 'border-white/10 bg-[#152033] text-white/70 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[#22C55E] text-xs font-bold">
                  <Coins size={12} />
                  <span>Win ${t.win}</span>
                </div>
                <span className="text-[10px] text-white/40 block mt-0.5">
                  Entry: ${t.entry}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Start Game CTA Button */}
        <button
          onClick={() => {
            onStartMatch({
              color: selectedColor,
              players: playerCount,
              bet: selectedBet,
            });
            onClose();
          }}
          className="w-full py-4 btn-3d-yellow rounded-2xl font-heading font-black text-base text-slate-900 flex items-center justify-center gap-2 cursor-pointer shadow-xl"
        >
          <span>Start Match (${selectedBet} Coins)</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
