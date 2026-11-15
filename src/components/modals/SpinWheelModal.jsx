import React, { useState } from 'react';
import { X, RotateCw, Sparkles, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playStarSound, playWinSound } from '../../utils/audio';

export default function SpinWheelModal({ isOpen, onClose, onRewardCoins, soundEnabled }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);

  if (!isOpen) return null;

  const slices = [
    { label: '10', value: 10, bg: '#F9B208' },
    { label: '25', value: 25, bg: '#1B86FF' },
    { label: '50', value: 50, bg: '#E53935' },
    { label: '100', value: 100, bg: '#22A349' },
    { label: '20', value: 20, bg: '#9333EA' },
    { label: '250', value: 250, bg: '#F97316' },
    { label: '500', value: 500, bg: '#EC4899' },
    { label: '1000', value: 1000, bg: '#EAB308' },
  ];

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWonPrize(null);

    // Pick random prize index
    const prizeIdx = Math.floor(Math.random() * slices.length);
    const sliceAngle = 360 / slices.length;
    // Calculate final rotation (minimum 5 full spins + slice offset)
    const extraRotations = 360 * 6;
    const finalAngle = extraRotations + (360 - (prizeIdx * sliceAngle + sliceAngle / 2));

    setRotation((prev) => prev + finalAngle);

    setTimeout(() => {
      setIsSpinning(false);
      const prize = slices[prizeIdx];
      setWonPrize(prize.value);
      onRewardCoins(prize.value);
      playWinSound(soundEnabled);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {}
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#0E1726] border-2 border-yellow-400 rounded-3xl p-6 shadow-2xl text-center space-y-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-400" />
            <h3 className="font-heading text-xl font-bold text-white tracking-wide">
              Lucky Fortune Wheel
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Wheel Container */}
        <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
          {/* Top Marker Pin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-0 h-0 border-x-8 border-x-transparent border-t-[18px] border-t-yellow-400 filter drop-shadow" />

          {/* Wheel Disc */}
          <div
            className="w-full h-full rounded-full border-4 border-yellow-400 shadow-2xl relative overflow-hidden transition-all duration-[4000ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {slices.map((s, idx) => {
                const angle = 360 / slices.length;
                const startAngle = idx * angle;
                const endAngle = (idx + 1) * angle;

                const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);

                const textAngle = startAngle + angle / 2;
                const tx = 50 + 32 * Math.cos((Math.PI * (textAngle - 90)) / 180);
                const ty = 50 + 32 * Math.sin((Math.PI * (textAngle - 90)) / 180);

                return (
                  <g key={idx}>
                    <path
                      d={`M50,50 L${x1},${y1} A50,50 0 0,1 ${x2},${y2} Z`}
                      fill={s.bg}
                      stroke="#FFFFFF"
                      strokeWidth="1"
                    />
                    <text
                      x={tx}
                      y={ty}
                      fill="#FFFFFF"
                      fontSize="7"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${textAngle + 90}, ${tx}, ${ty})`}
                    >
                      {s.label}
                    </text>
                  </g>
                );
              })}
              {/* Center Cap */}
              <circle cx="50" cy="50" r="10" fill="#1E293B" stroke="#F9B208" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Won Prize Notification */}
        {wonPrize && (
          <div className="p-3 bg-yellow-400/20 border border-yellow-400 rounded-2xl flex items-center justify-center gap-2 text-yellow-400 font-bold text-base animate-bounce">
            <Coins size={20} />
            <span>You won +{wonPrize} Gold Coins!</span>
          </div>
        )}

        {/* Spin CTA Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-4 btn-3d-yellow rounded-2xl font-heading font-black text-lg text-slate-900 cursor-pointer shadow-xl disabled:opacity-50"
        >
          {isSpinning ? 'Spinning...' : 'SPIN TO WIN!'}
        </button>
      </div>
    </div>
  );
}
