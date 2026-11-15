import React from 'react';

export default function Pawn({
  color = 'red',
  size = 28,
  isSelectable = false,
  onClick,
}) {
  const colorMap = {
    yellow: {
      primary: '#FFC700',
      light: '#FFF59D',
      dark: '#B78103',
      stroke: '#8A5C00',
    },
    blue: {
      primary: '#1B86FF',
      light: '#90CAF9',
      dark: '#0D47A1',
      stroke: '#002984',
    },
    red: {
      primary: '#E53935',
      light: '#FF8A80',
      dark: '#B71C1C',
      stroke: '#7F0000',
    },
    green: {
      primary: '#22A349',
      light: '#A5D6A7',
      dark: '#1B5E20',
      stroke: '#003300',
    },
  };

  const scheme = colorMap[color] || colorMap.red;

  return (
    <div
      onClick={isSelectable ? onClick : undefined}
      className={`relative flex items-center justify-center transition-all ${
        isSelectable
          ? 'cursor-pointer animate-pawn-turn z-30 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] scale-110'
          : 'z-20'
      }`}
      style={{
        width: size,
        height: size * 1.3,
      }}
    >
      <svg
        viewBox="0 0 32 42"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient
            id={`grad-head-${color}`}
            cx="35%"
            cy="35%"
            r="65%"
          >
            <stop offset="0%" stopColor={scheme.light} />
            <stop offset="70%" stopColor={scheme.primary} />
            <stop offset="100%" stopColor={scheme.dark} />
          </radialGradient>

          <linearGradient id={`grad-body-${color}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={scheme.dark} />
            <stop offset="35%" stopColor={scheme.primary} />
            <stop offset="70%" stopColor={scheme.light} />
            <stop offset="100%" stopColor={scheme.dark} />
          </linearGradient>

          <filter id={`shadow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Base shadow */}
        <ellipse cx="16" cy="38" rx="14" ry="4" fill="#000000" opacity="0.35" />

        {/* Bottom pedestal rim */}
        <path
          d="M4 36 C4 33 28 33 28 36 C28 39 4 39 4 36 Z"
          fill={scheme.dark}
        />
        <path
          d="M5 35 C5 33 27 33 27 35 C27 37 5 37 5 35 Z"
          fill={`url(#grad-body-${color})`}
          stroke={scheme.stroke}
          strokeWidth="0.8"
        />

        {/* Conical Neck */}
        <path
          d="M10 34 C12 26 13 22 13 18 L19 18 C19 22 20 26 22 34 Z"
          fill={`url(#grad-body-${color})`}
          stroke={scheme.stroke}
          strokeWidth="0.8"
        />

        {/* Collar ring */}
        <ellipse cx="16" cy="18" rx="5" ry="1.8" fill={scheme.light} stroke={scheme.dark} strokeWidth="0.5" />

        {/* Head Sphere */}
        <circle
          cx="16"
          cy="11"
          r="9"
          fill={`url(#grad-head-${color})`}
          stroke={scheme.stroke}
          strokeWidth="0.8"
          filter={`url(#shadow-${color})`}
        />

        {/* White glossy shine reflection */}
        <ellipse cx="13" cy="8" rx="3.5" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(-25 13 8)" />
      </svg>
    </div>
  );
}
