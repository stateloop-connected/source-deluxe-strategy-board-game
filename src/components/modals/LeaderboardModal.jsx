import React, { useState } from 'react';
import { X, Trophy, Medal, Award } from 'lucide-react';
import Avatar from '../common/Avatar';

export default function LeaderboardModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('current');

  if (!isOpen) return null;

  const currentLeaders = [
    { rank: 1, name: 'Zeeshan Ansari', score: '9,421', color: '#E53935' },
    { rank: 2, name: 'Bhaskar Swami (You)', score: '8,850', color: '#F9B208' },
    { rank: 3, name: 'Elena Rostova', score: '7,920', color: '#1B86FF' },
    { rank: 4, name: 'Marcus Vance', score: '6,450', color: '#22A349' },
    { rank: 5, name: 'Aoi Takahashi', score: '5,910', color: '#9333EA' },
  ];

  const pastLeaders = [
    { rank: 1, name: 'Liam Davies', score: '12,500', color: '#1B86FF' },
    { rank: 2, name: 'Zeeshan Ansari', score: '11,210', color: '#E53935' },
    { rank: 3, name: 'Chloe Laurent', score: '9,840', color: '#F9B208' },
    { rank: 4, name: 'Kavita Patel', score: '8,130', color: '#22A349' },
    { rank: 5, name: 'Arjun Verma', score: '7,700', color: '#9333EA' },
  ];

  const data = activeTab === 'current' ? currentLeaders : pastLeaders;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#0E1726] border-2 border-yellow-400 rounded-3xl p-6 shadow-2xl space-y-5 animate-scale-in max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Trophy size={20} className="text-yellow-400 fill-yellow-400" />
            <h3 className="font-heading text-xl font-bold text-white tracking-wide">
              Global LeaderBoard
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Month Filter Tabs */}
        <div className="flex gap-2 p-1 bg-[#152033] rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('last')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'last'
                ? 'bg-yellow-400 text-slate-900 shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Last Month
          </button>
          <button
            onClick={() => setActiveTab('current')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'current'
                ? 'bg-yellow-400 text-slate-900 shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Current Month
          </button>
        </div>

        {/* Leaders List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {data.map((item) => (
            <div
              key={item.rank}
              className={`p-3 rounded-2xl flex items-center justify-between gap-3 border transition-all ${
                item.rank === 1
                  ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border-yellow-400'
                  : 'bg-[#152033] border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Rank Badge */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-heading font-black text-sm shrink-0 ${
                    item.rank === 1
                      ? 'bg-yellow-400 text-slate-900 shadow'
                      : item.rank === 2
                      ? 'bg-slate-300 text-slate-900'
                      : item.rank === 3
                      ? 'bg-amber-700 text-white'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {item.rank}
                </div>

                <Avatar size={36} name={item.name} bgColor={item.color} />

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate max-w-[120px]">
                    {item.name}
                  </h4>
                  <span className="text-[10px] text-white/40 block font-mono">
                    Tier Diamond
                  </span>
                </div>
              </div>

              {/* Bonus / Score */}
              <div className="text-right">
                <span className="font-heading font-black text-sm text-yellow-400 font-mono">
                  {item.score}
                </span>
                <span className="text-[9px] text-white/40 block uppercase">PTS</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors"
        >
          Close Leaderboard
        </button>
      </div>
    </div>
  );
}
