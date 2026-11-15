import React from 'react';

export default function Dice({
  value = 1,
  isRolling = false,
  canRoll = false,
  onRoll,
  size = 54,
  color = '#FFFFFF',
}) {
  // Dot coordinates for 1 to 6
  const renderDots = () => {
    switch (value) {
      case 1:
        return <circle cx="27" cy="27" r="5" fill="#0F172A" />;
      case 2:
        return (
          <>
            <circle cx="16" cy="16" r="4.5" fill="#0F172A" />
            <circle cx="38" cy="38" r="4.5" fill="#0F172A" />
          </>
        );
      case 3:
        return (
          <>
            <circle cx="15" cy="15" r="4" fill="#0F172A" />
            <circle cx="27" cy="27" r="4" fill="#0F172A" />
            <circle cx="39" cy="39" r="4" fill="#0F172A" />
          </>
        );
      case 4:
        return (
          <>
            <circle cx="16" cy="16" r="4" fill="#0F172A" />
            <circle cx="38" cy="16" r="4" fill="#0F172A" />
            <circle cx="16" cy="38" r="4" fill="#0F172A" />
            <circle cx="38" cy="38" r="4" fill="#0F172A" />
          </>
        );
      case 5:
        return (
          <>
            <circle cx="15" cy="15" r="4" fill="#0F172A" />
            <circle cx="39" cy="15" r="4" fill="#0F172A" />
            <circle cx="27" cy="27" r="4" fill="#0F172A" />
            <circle cx="15" cy="39" r="4" fill="#0F172A" />
            <circle cx="39" cy="39" r="4" fill="#0F172A" />
          </>
        );
      case 6:
      default:
        return (
          <>
            <circle cx="17" cy="14" r="3.8" fill="#0F172A" />
            <circle cx="37" cy="14" r="3.8" fill="#0F172A" />
            <circle cx="17" cy="27" r="3.8" fill="#0F172A" />
            <circle cx="37" cy="27" r="3.8" fill="#0F172A" />
            <circle cx="17" cy="40" r="3.8" fill="#0F172A" />
            <circle cx="37" cy="40" r="3.8" fill="#0F172A" />
          </>
        );
    }
  };

  return (
    <button
      type="button"
      onClick={canRoll ? onRoll : undefined}
      disabled={!canRoll || isRolling}
      className={`relative rounded-2xl p-1 bg-white shadow-xl transition-all select-none cursor-pointer ${
        canRoll
          ? 'ring-4 ring-[#22C55E] ring-offset-2 ring-offset-black scale-105 animate-pulse'
          : 'opacity-90'
      } ${isRolling ? 'animate-dice-roll pointer-events-none' : ''}`}
      style={{
        width: size,
        height: size,
      }}
      title={canRoll ? 'Click to Roll Dice!' : `Dice: ${value}`}
    >
      <svg
        viewBox="0 0 54 54"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Dice face */}
        <rect
          x="2"
          y="2"
          width="50"
          height="50"
          rx="12"
          fill="#F8FAFC"
          stroke="#CBD5E1"
          strokeWidth="3"
        />
        {/* Shadow inner */}
        <rect x="5" y="5" width="44" height="44" rx="9" fill="#FFFFFF" />
        {/* Dots */}
        {renderDots()}
      </svg>
    </button>
  );
}
