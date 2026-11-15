import React, { useState, useEffect, useCallback, useRef } from 'react';
import LudoBoard from '../board/LudoBoard';
import Dice from '../common/Dice';
import Avatar from '../common/Avatar';
import confetti from 'canvas-confetti';
import {
  Menu,
  Info,
  Trophy,
  MessageCircle,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowLeft,
  Crown,
  Sparkles,
} from 'lucide-react';
import {
  PLAYERS,
  PLAYER_CONFIG,
  canPawnMove,
  isPawnSafe,
  getPawnCoordinate,
} from '../../utils/ludoRules';
import {
  playDiceSound,
  playMoveSound,
  playCaptureSound,
  playHomeSound,
  playStarSound,
  playWinSound,
  playButtonSound,
} from '../../utils/audio';

export default function GameScreen({
  gameMode = 'bot',
  playerColor = 'yellow',
  playerCount = 2,
  betAmount = 1,
  onExitGame,
  soundEnabled = true,
  onToggleSound,
}) {
  // Active players in this match
  const activePlayers =
    playerCount === 2 ? ['yellow', 'red'] : ['yellow', 'blue', 'red', 'green'];

  // State: pawns position (0..57) for each color
  const [pawns, setPawns] = useState({
    yellow: [0, 0, 0, 0],
    blue: [0, 0, 0, 0],
    red: [0, 0, 0, 0],
    green: [0, 0, 0, 0],
  });

  const [currentTurn, setCurrentTurn] = useState('yellow');
  const [diceValue, setDiceValue] = useState(6);
  const [isRolling, setIsRolling] = useState(false);
  const [hasRolled, setHasRolled] = useState(false);
  const [consecutiveSixes, setConsecutiveSixes] = useState(0);
  const [autoMode, setAutoMode] = useState(false);
  const [winner, setWinner] = useState(null);
  const [chatReaction, setChatReaction] = useState(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [timerLeft, setTimerLeft] = useState(300); // 5 minutes for blitz

  const timerRef = useRef(null);

  // Speed blitz timer
  useEffect(() => {
    if (gameMode === 'timer' && !winner) {
      timerRef.current = setInterval(() => {
        setTimerLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // End game by highest progressed score
            calculateTimeoutWinner();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [gameMode, winner]);

  // Calculate winner if timer expires
  const calculateTimeoutWinner = () => {
    let bestColor = activePlayers[0];
    let maxSteps = -1;
    activePlayers.forEach((color) => {
      const sum = pawns[color].reduce((a, b) => a + b, 0);
      if (sum > maxSteps) {
        maxSteps = sum;
        bestColor = color;
      }
    });
    setWinner(bestColor);
    triggerVictory(bestColor);
  };

  // Trigger celebration
  const triggerVictory = (winningColor) => {
    playWinSound(soundEnabled);
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // fallback
    }
  };

  // Check which pawns can move with current dice
  const getSelectablePawns = useCallback(() => {
    if (!hasRolled) return [];
    const list = pawns[currentTurn] || [];
    const indices = [];
    list.forEach((step, idx) => {
      if (canPawnMove(step, diceValue)) {
        indices.push(idx);
      }
    });
    return indices;
  }, [hasRolled, currentTurn, diceValue, pawns]);

  // Advance turn to next active player
  const nextTurn = useCallback(() => {
    setHasRolled(false);
    setConsecutiveSixes(0);
    const currIdx = activePlayers.indexOf(currentTurn);
    const nextIdx = (currIdx + 1) % activePlayers.length;
    setCurrentTurn(activePlayers[nextIdx]);
  }, [activePlayers, currentTurn]);

  // Handle dice roll
  const handleRollDice = useCallback(() => {
    if (isRolling || hasRolled || winner) return;

    setIsRolling(true);
    playDiceSound(soundEnabled);

    setTimeout(() => {
      const rolled = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rolled);
      setIsRolling(false);
      setHasRolled(true);

      const sixCount = rolled === 6 ? consecutiveSixes + 1 : 0;
      setConsecutiveSixes(sixCount);

      // Check if 3 consecutive sixes (skip turn penalty)
      if (sixCount >= 3) {
        setTimeout(() => {
          nextTurn();
        }, 800);
        return;
      }

      // Check if any pawn can move
      const currentPawns = pawns[currentTurn];
      const movable = currentPawns.some((step) => canPawnMove(step, rolled));

      if (!movable) {
        // No valid moves, pass turn
        setTimeout(() => {
          nextTurn();
        }, 900);
      }
    }, 500);
  }, [isRolling, hasRolled, winner, soundEnabled, consecutiveSixes, pawns, currentTurn, nextTurn]);

  // Move selected pawn
  const handleMovePawn = useCallback(
    (pawnIndex) => {
      if (!hasRolled || isRolling || winner) return;
      const currentPawns = [...pawns[currentTurn]];
      const currentStep = currentPawns[pawnIndex];

      if (!canPawnMove(currentStep, diceValue)) return;

      const newStep = currentStep === 0 ? 1 : currentStep + diceValue;
      currentPawns[pawnIndex] = newStep;

      playMoveSound(soundEnabled);

      let bonusTurn = diceValue === 6;
      let capturedEnemy = false;

      // Check if pawn reached Home (step 57)
      if (newStep === 57) {
        playHomeSound(soundEnabled);
        bonusTurn = true; // Bonus roll for getting home
      } else if (!isPawnSafe(currentTurn, newStep)) {
        // Check for opponent pawn collision/capture on track
        const newCoord = getPawnCoordinate(currentTurn, newStep, pawnIndex);
        const updatedPawns = { ...pawns, [currentTurn]: currentPawns };

        activePlayers.forEach((otherColor) => {
          if (otherColor !== currentTurn) {
            const enemyPawns = [...updatedPawns[otherColor]];
            enemyPawns.forEach((enemyStep, eIdx) => {
              if (enemyStep > 0 && enemyStep <= 51) {
                const enemyCoord = getPawnCoordinate(otherColor, enemyStep, eIdx);
                if (enemyCoord.r === newCoord.r && enemyCoord.c === newCoord.c) {
                  // Capture! Send enemy back to yard (step 0)
                  enemyPawns[eIdx] = 0;
                  capturedEnemy = true;
                  bonusTurn = true;
                  playCaptureSound(soundEnabled);
                }
              }
            });
            updatedPawns[otherColor] = enemyPawns;
          }
        });

        setPawsStateDirect(updatedPawns);
      }

      // Apply pawn position
      setPawns((prev) => ({
        ...prev,
        [currentTurn]: currentPawns,
      }));

      // Check if current player has all 4 pawns home (step 57)
      if (currentPawns.every((s) => s === 57)) {
        setWinner(currentTurn);
        triggerVictory(currentTurn);
        return;
      }

      // If safe star landed, play chime
      if (isPawnSafe(currentTurn, newStep)) {
        playStarSound(soundEnabled);
      }

      // Handle next action
      if (bonusTurn) {
        setHasRolled(false);
      } else {
        setTimeout(() => {
          nextTurn();
        }, 400);
      }
    },
    [hasRolled, isRolling, winner, pawns, currentTurn, diceValue, soundEnabled, activePlayers, nextTurn]
  );

  // Helper to update pawns during capture
  const setPawsStateDirect = (updated) => {
    setPawns(updated);
  };

  // AI Bot Turn logic
  useEffect(() => {
    const isHumanTurn =
      currentTurn === playerColor && !autoMode && gameMode !== 'local';

    if (!isHumanTurn && !winner) {
      if (!hasRolled && !isRolling) {
        // Roll dice after delay
        const timer = setTimeout(() => {
          handleRollDice();
        }, 700);
        return () => clearTimeout(timer);
      }

      if (hasRolled && !isRolling) {
        // Pick best pawn move
        const movable = [];
        pawns[currentTurn].forEach((step, idx) => {
          if (canPawnMove(step, diceValue)) movable.push(idx);
        });

        if (movable.length > 0) {
          const moveTimer = setTimeout(() => {
            // Heuristic 1: If 6 and any pawn in yard, prioritize opening!
            const yardPawn = movable.find((idx) => pawns[currentTurn][idx] === 0);
            if (diceValue === 6 && yardPawn !== undefined) {
              handleMovePawn(yardPawn);
              return;
            }

            // Heuristic 2: Check for capture
            let bestPawn = movable[0];
            let foundCapture = false;

            for (const pIdx of movable) {
              const testStep = pawns[currentTurn][pIdx] + diceValue;
              if (testStep <= 51 && !isPawnSafe(currentTurn, testStep)) {
                const targetCoord = getPawnCoordinate(currentTurn, testStep, pIdx);
                for (const otherColor of activePlayers) {
                  if (otherColor !== currentTurn) {
                    const hasEnemy = pawns[otherColor].some((eStep, eIdx) => {
                      if (eStep > 0 && eStep <= 51) {
                        const enemyCoord = getPawnCoordinate(otherColor, eStep, eIdx);
                        return enemyCoord.r === targetCoord.r && enemyCoord.c === targetCoord.c;
                      }
                      return false;
                    });
                    if (hasEnemy) {
                      bestPawn = pIdx;
                      foundCapture = true;
                      break;
                    }
                  }
                }
              }
              if (foundCapture) break;
            }

            // Heuristic 3: Move pawn closest to goal
            if (!foundCapture) {
              bestPawn = movable.reduce((prev, curr) =>
                pawns[currentTurn][curr] > pawns[currentTurn][prev] ? curr : prev
              );
            }

            handleMovePawn(bestPawn);
          }, 600);

          return () => clearTimeout(moveTimer);
        }
      }
    }
  }, [
    currentTurn,
    playerColor,
    autoMode,
    gameMode,
    hasRolled,
    isRolling,
    winner,
    diceValue,
    pawns,
    activePlayers,
    handleRollDice,
    handleMovePawn,
  ]);

  // Format timer MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const isCurrentPlayerHuman =
    currentTurn === playerColor && (gameMode !== 'bot' || !autoMode);

  return (
    <div className="relative min-h-screen max-w-md mx-auto bg-[#070D1E] text-white flex flex-col justify-between p-3 pb-6 shadow-2xl overflow-hidden border-x border-slate-800">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between py-2 px-1 border-b border-white/10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExitConfirm(true)}
            className="w-10 h-10 rounded-2xl bg-[#1E293B] flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
            title="Menu"
          >
            <Menu size={20} />
          </button>

          <button
            onClick={onToggleSound}
            className="w-10 h-10 rounded-2xl bg-[#1E293B] flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
            title="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} className="text-red-400" />}
          </button>
        </div>

        {/* Prize Pool Badge */}
        <div className="flex items-center gap-2 bg-[#1E293B] border-2 border-yellow-400/80 rounded-full px-4 py-1 shadow-lg">
          <Trophy size={18} className="text-yellow-400 fill-yellow-400" />
          <span className="font-heading font-black text-sm text-yellow-300">
            ${betAmount * 2} WIN
          </span>
        </div>

        {/* Speed Timer if mode */}
        {gameMode === 'timer' && (
          <div className="bg-red-500/20 border border-red-500 px-3 py-1 rounded-full text-xs font-mono font-bold text-red-400">
            {formatTime(timerLeft)}
          </div>
        )}
      </header>

      {/* Opponent Profile HUD (Top-Right) */}
      <div className="flex justify-end pt-2 pb-1">
        <div
          className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all ${
            currentTurn === 'red'
              ? 'bg-[#E53935]/20 border-[#E53935] shadow-[0_0_15px_rgba(229,57,53,0.4)]'
              : 'bg-[#1E293B]/70 border-white/10'
          }`}
        >
          <div className="text-right">
            <h4 className="font-heading text-sm font-bold text-white leading-tight">
              {gameMode === 'local' ? 'Red Player' : 'AlphaBot AI'}
            </h4>
            <span className="text-[10px] text-white/50 font-mono">
              {pawns.red.filter((s) => s === 57).length}/4 Home
            </span>
          </div>

          <Avatar size={44} name="Opponent" bgColor="#E53935" />

          {/* Opponent Dice */}
          <div className="scale-90">
            <Dice
              value={currentTurn === 'red' ? diceValue : 6}
              isRolling={currentTurn === 'red' && isRolling}
              canRoll={false}
              size={44}
            />
          </div>
        </div>
      </div>

      {/* Center 15x15 Ludo Board */}
      <div className="my-auto py-2">
        <LudoBoard
          pawnsState={pawns}
          currentTurn={currentTurn}
          currentDice={diceValue}
          hasRolled={hasRolled}
          selectablePawns={getSelectablePawns()}
          onPawnClick={handleMovePawn}
        />
      </div>

      {/* Player Profile HUD (Bottom-Left) */}
      <div className="flex items-center justify-between pt-1 pb-2">
        <div
          className={`flex items-center gap-3 p-2.5 rounded-2xl border transition-all ${
            currentTurn === playerColor
              ? 'bg-[#F9B208]/20 border-[#F9B208] shadow-[0_0_15px_rgba(249,178,8,0.4)]'
              : 'bg-[#1E293B]/70 border-white/10'
          }`}
        >
          <Avatar size={48} name="You" bgColor="#F9B208" />

          <div>
            <h4 className="font-heading text-sm font-bold text-white leading-tight">
              You ({PLAYER_CONFIG[playerColor].name})
            </h4>
            <span className="text-[10px] text-emerald-400 font-mono">
              {pawns[playerColor].filter((s) => s === 57).length}/4 Home
            </span>
          </div>

          {/* Interactive Player Dice */}
          <div className="pl-1">
            <Dice
              value={currentTurn === playerColor ? diceValue : 1}
              isRolling={currentTurn === playerColor && isRolling}
              canRoll={currentTurn === playerColor && !hasRolled && !isRolling && !winner}
              onRoll={handleRollDice}
              size={48}
            />
          </div>
        </div>

        {/* Auto Mode & Chat Action */}
        <div className="flex flex-col items-end gap-2">
          {/* Quick Chat Reaction Trigger */}
          <div className="flex items-center gap-1.5 bg-[#1E293B] p-1 rounded-2xl border border-white/10">
            {['🔥', '😂', '👍', '😡'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  setChatReaction(emoji);
                  setTimeout(() => setChatReaction(null), 2500);
                }}
                className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center text-sm cursor-pointer transition-transform active:scale-90"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Auto Mode Toggle */}
          <div className="flex items-center gap-2 bg-[#1E293B] px-3 py-1.5 rounded-2xl border border-white/10 text-xs">
            <span className="text-white/60 font-bold">Auto</span>
            <button
              onClick={() => setAutoMode(!autoMode)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${
                autoMode ? 'bg-[#22C55E]' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  autoMode ? 'left-5' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Chat Bubble Reaction */}
      {chatReaction && (
        <div className="absolute bottom-28 left-16 z-50 bg-white text-slate-900 px-4 py-2 rounded-2xl shadow-2xl text-2xl font-bold animate-bounce flex items-center gap-1">
          <span>{chatReaction}</span>
          <div className="absolute -bottom-2 left-4 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-white" />
        </div>
      )}

      {/* Victory Celebration Modal */}
      {winner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm bg-[#0E1726] border-2 border-yellow-400 rounded-3xl p-8 text-center space-y-6 shadow-2xl animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 mx-auto animate-bounce">
              <Crown size={40} className="fill-current" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading text-3xl font-black text-yellow-400 uppercase tracking-wide">
                {winner === playerColor ? 'VICTORY!' : 'GAME OVER'}
              </h3>
              <p className="text-sm text-white/70">
                {winner === playerColor
                  ? `Congratulations! You won $${betAmount * 2} coins!`
                  : `${PLAYER_CONFIG[winner].name} Player takes the victory!`}
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setWinner(null);
                  setPawns({
                    yellow: [0, 0, 0, 0],
                    blue: [0, 0, 0, 0],
                    red: [0, 0, 0, 0],
                    green: [0, 0, 0, 0],
                  });
                  setCurrentTurn('yellow');
                  setHasRolled(false);
                }}
                className="w-full py-3.5 btn-3d-yellow rounded-2xl font-heading font-black text-base text-slate-900 cursor-pointer"
              >
                Play Rematch
              </button>

              <button
                onClick={onExitGame}
                className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm cursor-pointer"
              >
                Back to Lobby
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Game Confirmation Dialog */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xs bg-[#1E293B] border border-white/20 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <h4 className="font-heading text-xl font-bold text-white">Leave Game?</h4>
            <p className="text-xs text-white/60">
              Your match progress will be forfeited if you return to the main menu.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={onExitGame}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold cursor-pointer"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
