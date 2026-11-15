import React, { useState } from 'react';
import MainMenu from './components/screens/MainMenu';
import GameScreen from './components/screens/GameScreen';
import SelectGameModal from './components/modals/SelectGameModal';
import LeaderboardModal from './components/modals/LeaderboardModal';
import SettingsModal from './components/modals/SettingsModal';
import SpinWheelModal from './components/modals/SpinWheelModal';
import RulesModal from './components/modals/RulesModal';

export default function App() {
  const [screen, setScreen] = useState('menu'); // 'menu' | 'game'
  const [coins, setCoins] = useState(10);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [chatEnabled, setChatEnabled] = useState(true);

  // Selected game config
  const [gameConfig, setGameConfig] = useState({
    mode: 'bot', // 'bot' | 'timer' | 'friends' | 'local'
    color: 'yellow',
    players: 2,
    bet: 1,
  });

  // Modal visibility states
  const [isSelectGameOpen, setIsSelectGameOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  // Mode selection from Main Menu
  const handleSelectMode = (mode) => {
    setGameConfig((prev) => ({ ...prev, mode }));
    setIsSelectGameOpen(true);
  };

  // Start match after setup modal
  const handleStartMatch = (config) => {
    setGameConfig((prev) => ({
      ...prev,
      color: config.color,
      players: config.players,
      bet: config.bet,
    }));
    // Deduct entry bet
    setCoins((prev) => Math.max(0, prev - config.bet));
    setScreen('game');
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-white flex items-center justify-center font-sans">
      {screen === 'menu' ? (
        <MainMenu
          playerName="Bhaskar Swami"
          coins={coins}
          onAddCoins={() => setIsSpinWheelOpen(true)}
          onSelectMode={handleSelectMode}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenSpinWheel={() => setIsSpinWheelOpen(true)}
          onOpenRules={() => setIsRulesOpen(true)}
        />
      ) : (
        <GameScreen
          gameMode={gameConfig.mode}
          playerColor={gameConfig.color}
          playerCount={gameConfig.players}
          betAmount={gameConfig.bet}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onExitGame={() => setScreen('menu')}
        />
      )}

      {/* Global Modals */}
      <SelectGameModal
        isOpen={isSelectGameOpen}
        onClose={() => setIsSelectGameOpen(false)}
        onStartMatch={handleStartMatch}
        userCoins={coins}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        vibrationEnabled={vibrationEnabled}
        onToggleVibration={() => setVibrationEnabled(!vibrationEnabled)}
        chatEnabled={chatEnabled}
        onToggleChat={() => setChatEnabled(!chatEnabled)}
        onAddBonusCoins={(amount) => setCoins((prev) => prev + amount)}
      />

      <SpinWheelModal
        isOpen={isSpinWheelOpen}
        onClose={() => setIsSpinWheelOpen(false)}
        onRewardCoins={(amount) => setCoins((prev) => prev + amount)}
        soundEnabled={soundEnabled}
      />

      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}
