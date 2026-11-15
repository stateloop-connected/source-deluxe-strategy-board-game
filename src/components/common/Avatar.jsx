import React from 'react';

export default function Avatar({
  size = 56,
  src,
  name = 'Player',
  borderColor = '#FFFFFF',
  bgColor = '#E53935',
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden shrink-0 shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      style={{
        width: size,
        height: size,
        border: `3px solid ${borderColor}`,
        backgroundColor: bgColor,
      }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        /* Vector SVG Avatar matching Figma bearded avatar */
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head & Neck */}
          <circle cx="50" cy="50" r="48" fill={bgColor} />
          {/* Body/Shirt */}
          <path
            d="M20 95 C20 75 35 70 50 70 C65 70 80 75 80 95 Z"
            fill="#F8FAFC"
          />
          {/* Neck */}
          <rect x="42" y="60" width="16" height="16" fill="#FBCFE8" rx="4" />
          {/* Face */}
          <ellipse cx="50" cy="46" rx="20" ry="24" fill="#FBCFE8" />
          {/* Hair */}
          <path
            d="M30 38 C30 22 40 18 50 18 C60 18 70 22 70 38 C70 32 60 26 50 26 C40 26 30 32 30 38 Z"
            fill="#1E293B"
          />
          {/* Beard */}
          <path
            d="M32 46 C32 68 40 76 50 76 C60 76 68 68 68 46 C64 54 58 58 50 58 C42 58 36 54 32 46 Z"
            fill="#1E293B"
          />
          {/* Mustache */}
          <path
            d="M38 52 C44 54 48 50 50 49 C52 50 56 54 62 52 C58 57 52 56 50 54 C48 56 42 57 38 52 Z"
            fill="#0F172A"
          />
          {/* Eyes */}
          <circle cx="43" cy="42" r="2.5" fill="#0F172A" />
          <circle cx="57" cy="42" r="2.5" fill="#0F172A" />
          {/* Eyebrows */}
          <path d="M39 37 Q43 35 47 37" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <path d="M53 37 Q57 35 61 37" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}
