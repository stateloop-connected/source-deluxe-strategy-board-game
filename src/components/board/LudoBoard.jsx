import React from 'react';
import { Star } from 'lucide-react';
import Pawn from '../common/Pawn';
import {
  getPawnCoordinate,
  canPawnMove,
  PLAYER_CONFIG,
  PLAYERS,
} from '../../utils/ludoRules';

export default function LudoBoard({
  pawnsState,
  currentTurn,
  currentDice,
  hasRolled,
  selectablePawns = [],
  onPawnClick,
}) {
  // Check if cell is a star / safe square
  const isStarSquare = (r, c) => {
    return (
      (r === 6 && c === 2) || // Yellow Star
      (r === 2 && c === 8) || // Blue Star
      (r === 8 && c === 12) || // Red Star
      (r === 12 && c === 6) || // Green Star
      (r === 6 && c === 1) || // Yellow start
      (r === 1 && c === 8) || // Blue start
      (r === 8 && c === 13) || // Red start
      (r === 13 && c === 6) // Green start
    );
  };

  // Determine cell background styling
  const getCellClasses = (r, c) => {
    // Top-Left Yellow base
    if (r < 6 && c < 6) return 'bg-[#F9B208]';
    // Top-Right Blue base
    if (r < 6 && c > 8) return 'bg-[#1B86FF]';
    // Bottom-Left Green base
    if (r > 8 && c < 6) return 'bg-[#22A349]';
    // Bottom-Right Red base
    if (r > 8 && c > 8) return 'bg-[#E53935]';

    // Center 3x3
    if (r >= 6 && r <= 8 && c >= 6 && c <= 8) return 'bg-transparent';

    // Colored Start Squares
    if (r === 6 && c === 1) return 'bg-[#F9B208]';
    if (r === 1 && c === 8) return 'bg-[#1B86FF]';
    if (r === 8 && c === 13) return 'bg-[#E53935]';
    if (r === 13 && c === 6) return 'bg-[#22A349]';

    // Home Path Columns
    if (r === 7 && c >= 1 && c <= 5) return 'bg-[#F9B208]';
    if (c === 7 && r >= 1 && r <= 5) return 'bg-[#1B86FF]';
    if (r === 7 && c >= 9 && c <= 13) return 'bg-[#E53935]';
    if (c === 7 && r >= 9 && r <= 13) return 'bg-[#22A349]';

    return 'bg-white';
  };

  // Render pawns grouped by coordinate
  const pawnsOnBoard = [];
  PLAYERS.forEach((color) => {
    const list = pawnsState[color] || [0, 0, 0, 0];
    list.forEach((step, pawnIdx) => {
      const coord = getPawnCoordinate(color, step, pawnIdx);
      const isSelectable =
        color === currentTurn &&
        hasRolled &&
        canPawnMove(step, currentDice) &&
        selectablePawns.includes(pawnIdx);

      pawnsOnBoard.push({
        color,
        pawnIdx,
        step,
        r: coord.r,
        c: coord.c,
        isSelectable,
      });
    });
  });

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto bg-white rounded-2xl shadow-2xl p-1.5 border-4 border-[#0F172A] select-none">
      {/* 15x15 Cell Grid */}
      <div className="grid grid-cols-15 grid-rows-15 w-full h-full border border-black relative">
        {/* Render 225 grid cells */}
        {Array.from({ length: 15 }).map((_, r) =>
          Array.from({ length: 15 }).map((_, c) => {
            const isBaseArea =
              (r < 6 && c < 6) ||
              (r < 6 && c > 8) ||
              (r > 8 && c < 6) ||
              (r > 8 && c > 8);

            const isCenterArea = r >= 6 && r <= 8 && c >= 6 && c <= 8;

            return (
              <div
                key={`${r}-${c}`}
                className={`relative flex items-center justify-center ${
                  !isBaseArea && !isCenterArea ? 'border-[0.5px] border-slate-400' : ''
                } ${getCellClasses(r, c)}`}
              >
                {/* Safe Star Icon */}
                {isStarSquare(r, c) && (
                  <Star
                    size={16}
                    strokeWidth={2}
                    className="text-white fill-white/40 drop-shadow pointer-events-none"
                  />
                )}
              </div>
            );
          })
        )}

        {/* 4 Corner Base Overlays */}
        {/* 1. Yellow Base (Top-Left) */}
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-[#F9B208] p-3 sm:p-4 flex items-center justify-center border-r border-b border-black">
          <div className="w-full h-full bg-white rounded-2xl p-2 grid grid-cols-2 grid-rows-2 gap-2 shadow-inner">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="rounded-full bg-[#F9B208]/30 border-2 border-[#F9B208] flex items-center justify-center shadow-inner"
              />
            ))}
          </div>
        </div>

        {/* 2. Blue Base (Top-Right) */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-[#1B86FF] p-3 sm:p-4 flex items-center justify-center border-l border-b border-black">
          <div className="w-full h-full bg-white rounded-2xl p-2 grid grid-cols-2 grid-rows-2 gap-2 shadow-inner">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="rounded-full bg-[#1B86FF]/30 border-2 border-[#1B86FF] flex items-center justify-center shadow-inner"
              />
            ))}
          </div>
        </div>

        {/* 3. Green Base (Bottom-Left) */}
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-[#22A349] p-3 sm:p-4 flex items-center justify-center border-r border-t border-black">
          <div className="w-full h-full bg-white rounded-2xl p-2 grid grid-cols-2 grid-rows-2 gap-2 shadow-inner">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="rounded-full bg-[#22A349]/30 border-2 border-[#22A349] flex items-center justify-center shadow-inner"
              />
            ))}
          </div>
        </div>

        {/* 4. Red Base (Bottom-Right) */}
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-[#E53935] p-3 sm:p-4 flex items-center justify-center border-l border-t border-black">
          <div className="w-full h-full bg-white rounded-2xl p-2 grid grid-cols-2 grid-rows-2 gap-2 shadow-inner">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="rounded-full bg-[#E53935]/30 border-2 border-[#E53935] flex items-center justify-center shadow-inner"
              />
            ))}
          </div>
        </div>

        {/* Center Triangles Home (3x3 in center) */}
        <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] border border-black overflow-hidden pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Top Blue triangle */}
            <polygon points="0,0 100,0 50,50" fill="#1B86FF" />
            {/* Right Red triangle */}
            <polygon points="100,0 100,100 50,50" fill="#E53935" />
            {/* Bottom Green triangle */}
            <polygon points="100,100 0,100 50,50" fill="#22A349" />
            {/* Left Yellow triangle */}
            <polygon points="0,100 0,0 50,50" fill="#F9B208" />
          </svg>
        </div>

        {/* Dynamic Pawns Layer */}
        {pawnsOnBoard.map((p, idx) => {
          // Calculate percentage position on 15x15 board
          const leftPct = (p.c / 15) * 100;
          const topPct = (p.r / 15) * 100;

          return (
            <div
              key={`${p.color}-${p.pawnIdx}`}
              className="absolute transition-all duration-300 ease-out flex items-center justify-center"
              style={{
                width: '6.666%',
                height: '6.666%',
                left: `${leftPct}%`,
                top: `${topPct}%`,
              }}
            >
              <Pawn
                color={p.color}
                isSelectable={p.isSelectable}
                onClick={() => onPawnClick(p.pawnIdx)}
                size={28}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
