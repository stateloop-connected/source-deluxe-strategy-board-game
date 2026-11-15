import React from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Vibrate,
  MessageCircle,
  Share2,
  ShieldCheck,
  FileText,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
  vibrationEnabled,
  onToggleVibration,
  chatEnabled,
  onToggleChat,
  onAddBonusCoins,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#0E1726] border-2 border-yellow-400 rounded-3xl p-6 shadow-2xl space-y-4 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h3 className="font-heading text-xl font-bold text-white tracking-wide">
            Settings
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Setting Options List */}
        <div className="space-y-3">
          {/* Sound */}
          <div className="bg-[#152033] rounded-2xl p-3.5 border border-white/10 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Sound</span>
            <button
              onClick={onToggleSound}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-[#22C55E] text-white shadow-md'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
          </div>

          {/* Vibration */}
          <div className="bg-[#152033] rounded-2xl p-3.5 border border-white/10 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Vibration</span>
            <button
              onClick={onToggleVibration}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                vibrationEnabled
                  ? 'bg-[#22C55E] text-white shadow-md'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              <Vibrate size={20} />
            </button>
          </div>

          {/* Game Chat */}
          <div className="bg-[#152033] rounded-2xl p-3.5 border border-white/10 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Game Chat</span>
            <button
              onClick={onToggleChat}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                chatEnabled
                  ? 'bg-[#22C55E] text-white shadow-md'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              <MessageCircle size={20} />
            </button>
          </div>

          {/* Share */}
          <div className="bg-[#152033] rounded-2xl p-3.5 border border-white/10 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Share Game</span>
            <button
              onClick={() => alert('Game link copied to clipboard!')}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Share
            </button>
          </div>

          {/* Claim Bonus Coins */}
          <div className="bg-[#152033] rounded-2xl p-3.5 border border-white/10 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-yellow-400 block">Developer Coins</span>
              <span className="text-[10px] text-white/50">Reload +50 coins for testing</span>
            </div>
            <button
              onClick={() => {
                onAddBonusCoins(50);
                alert('+50 coins added to your wallet!');
              }}
              className="px-3.5 py-2 rounded-xl bg-yellow-400 text-slate-900 text-xs font-black transition-transform active:scale-95 cursor-pointer flex items-center gap-1 shadow"
            >
              <Sparkles size={13} />
              <span>+50 Coins</span>
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          Back to Game
        </button>
      </div>
    </div>
  );
}
