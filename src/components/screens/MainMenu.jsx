import React from 'react';
import Avatar from '../common/Avatar';
import {
  Coins,
  Plus,
  Bell,
  FileText,
  Share2,
  Trophy,
  Settings,
  Wallet,
  Play,
  RotateCw,
  Sparkles,
  Users,
  Timer,
  Bot,
  HelpCircle,
} from 'lucide-react';

export default function MainMenu({
  playerName = 'Bhaskar Swami',
  coins = 10,
  onAddCoins,
  onSelectMode,
  onOpenLeaderboard,
  onOpenSettings,
  onOpenSpinWheel,
  onOpenRules,
}) {
  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-[#0A1128] text-white flex flex-col justify-between p-4 pb-24 overflow-hidden shadow-2xl border-x border-slate-800">
      {/* Background Subtle Ludo Board Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#1B86FF_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between pt-2 pb-4">
        {/* Profile Avatar & Name */}
        <div className="flex items-center gap-3">
          <Avatar size={48} name={playerName} />
          <div>
            <h3 className="font-heading text-lg font-bold text-white tracking-wide leading-tight">
              {playerName}
            </h3>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Online Master
            </span>
          </div>
        </div>

        {/* Coins Wallet Badge */}
        <div className="flex items-center gap-1.5 bg-[#1E293B] border-2 border-[#F9B208] rounded-full px-3 py-1 shadow-md">
          <div className="w-5 h-5 rounded-full bg-[#F9B208] flex items-center justify-center text-[#1E293B]">
            <Coins size={13} className="fill-current" />
          </div>
          <span className="font-heading font-black text-base text-[#F9B208] min-w-5 text-center">
            {coins}
          </span>
          <button
            onClick={onAddCoins}
            className="w-5 h-5 rounded-full bg-[#22C55E] hover:bg-emerald-400 flex items-center justify-center text-white transition-transform active:scale-90 cursor-pointer ml-1"
            title="Claim daily bonus coins"
          >
            <Plus size={13} strokeWidth={3} />
          </button>
        </div>
      </header>

      {/* Main Body Content */}
      <main className="relative z-10 space-y-6 my-auto py-2">
        {/* Floating Quick Action Side Badges */}
        <div className="flex items-center justify-between px-1">
          {/* Left: Spin Wheel & Share */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSpinWheel}
              className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 border-2 border-yellow-200 flex flex-col items-center justify-center text-slate-900 shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
              title="Lucky Spin Wheel"
            >
              <RotateCw size={18} className="animate-spin-slow" />
              <span className="text-[9px] font-bold uppercase tracking-tight mt-0.5">Spin</span>
            </button>

            <button
              onClick={() => alert('Invite code copied! Share with friends to get 10 free coins.')}
              className="w-10 h-10 rounded-2xl bg-[#1E293B] border border-slate-700 flex items-center justify-center text-white hover:text-[#1B86FF] transition-colors cursor-pointer"
              title="Share Game"
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* Right: Rules & Notifications */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRules}
              className="w-10 h-10 rounded-2xl bg-[#1E293B] border border-slate-700 flex items-center justify-center text-white hover:text-yellow-400 transition-colors cursor-pointer"
              title="Game Rules"
            >
              <HelpCircle size={18} />
            </button>

            <button
              onClick={() => alert('No new notifications. All servers online!')}
              className="w-10 h-10 rounded-2xl bg-[#1E293B] border border-slate-700 flex items-center justify-center text-white hover:text-emerald-400 transition-colors cursor-pointer relative"
              title="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
          </div>
        </div>

        {/* Central 3D Game Logo */}
        <div className="text-center py-2 relative">
          <div className="relative inline-block">
            {/* Ambient Backlight */}
            <div className="absolute inset-0 bg-[#FFC700]/20 rounded-full blur-2xl" />

            {/* 3D Title Typography */}
            <h1 className="font-heading text-6xl font-black italic tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#FFF275] via-[#FFB703] to-[#FB8500] drop-shadow-[0_6px_0_#9D4E00]">
              LUDO
            </h1>
            <span className="block font-heading text-xl font-bold tracking-widest text-[#46D4F8] drop-shadow-[0_2px_0_#023E8A] -mt-2">
              MASTER DELUXE
            </span>
          </div>
        </div>

        {/* 4 Big Game Mode Cards (Figma 2x2 Layout) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Mode 1: Play with Table / Bot */}
          <button
            onClick={() => onSelectMode('bot')}
            className="btn-3d-yellow rounded-3xl p-4 flex flex-col items-center justify-between text-center min-h-[145px] cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
              <Bot size={28} />
            </div>
            <div>
              <h4 className="font-heading font-black text-lg text-slate-900 leading-tight">
                Play With Bot
              </h4>
              <span className="text-[11px] font-bold text-slate-800">Single Player AI</span>
            </div>
          </button>

          {/* Mode 2: Play with Timer (Speed Ludo) */}
          <button
            onClick={() => onSelectMode('timer')}
            className="btn-3d-cyan rounded-3xl p-4 flex flex-col items-center justify-between text-center min-h-[145px] cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
              <Timer size={28} />
            </div>
            <div>
              <h4 className="font-heading font-black text-lg text-slate-900 leading-tight">
                Speed Ludo
              </h4>
              <span className="text-[11px] font-bold text-slate-800">5-Min Blitz</span>
            </div>
          </button>

          {/* Mode 3: Play with Friends */}
          <button
            onClick={() => onSelectMode('friends')}
            className="btn-3d-pink rounded-3xl p-4 flex flex-col items-center justify-between text-center min-h-[145px] cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <div>
              <h4 className="font-heading font-black text-lg text-white leading-tight">
                Play Friends
              </h4>
              <span className="text-[11px] font-bold text-white/90">Custom Match</span>
            </div>
          </button>

          {/* Mode 4: Pass & Play */}
          <button
            onClick={() => onSelectMode('local')}
            className="btn-3d-orange rounded-3xl p-4 flex flex-col items-center justify-between text-center min-h-[145px] cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <Play size={28} className="fill-current ml-0.5" />
            </div>
            <div>
              <h4 className="font-heading font-black text-lg text-white leading-tight">
                Pass & Play
              </h4>
              <span className="text-[11px] font-bold text-white/90">2-4 Local Players</span>
            </div>
          </button>
        </div>

        {/* Action Banners */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={onOpenRules}
            className="py-2.5 px-3 rounded-2xl bg-[#DC2626] hover:bg-red-500 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Play size={14} className="fill-current" />
            <span>How to Play</span>
          </button>

          <button
            onClick={onOpenSpinWheel}
            className="py-2.5 px-3 rounded-2xl bg-[#4F46E5] hover:bg-indigo-500 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Lucky Spin</span>
          </button>
        </div>
      </main>

      {/* Bottom Curved Dock Navigation Bar (Matching Figma) */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-30 bg-[#070D1E]/95 backdrop-blur-xl border-t-2 border-slate-700/80 px-8 py-3.5 flex items-center justify-between">
        {/* Leaderboard Button */}
        <button
          onClick={onOpenLeaderboard}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-yellow-400 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-yellow-500/20 transition-all">
            <Trophy size={20} />
          </div>
          <span className="text-[10px] font-bold">Ranks</span>
        </button>

        {/* Center Floating Settings Button */}
        <button
          onClick={onOpenSettings}
          className="relative -top-5 w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-400 border-4 border-[#0A1128] shadow-xl flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
          title="Game Settings"
        >
          <Settings size={26} className="animate-spin-slow" />
        </button>

        {/* Wallet / Free Coins Button */}
        <button
          onClick={onAddCoins}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
            <Wallet size={20} />
          </div>
          <span className="text-[10px] font-bold">Wallet</span>
        </button>
      </footer>
    </div>
  );
}
