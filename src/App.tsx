/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { AgeGate } from './components/AgeGate';
import { IdentityQuiz } from './components/IdentityQuiz';
import { StallingVault } from './components/StallingVault';
import { GalleryExhibition } from './components/GalleryExhibition';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { playTrumpetFanfare, stopTrumpetFanfare } from './utils/fanfare';
import type { Stage } from './utils/verification';

function getInitialAutostart(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const params = new URLSearchParams(window.location.search);
  return params.get('autostart') === '1';
}

export default function App() {
  const autostart = getInitialAutostart();

  const [currentStage, setCurrentStage] = useState<Stage>(
    autostart ? 'reveal' : 'age-gate',
  );
  const [unlockedStages, setUnlockedStages] = useState<Stage[]>(
    autostart
      ? ['age-gate', 'identity', 'stalling', 'reveal']
      : ['age-gate'],
  );
  const [confettiBurstKey, setConfettiBurstKey] = useState(autostart ? 1 : 0);
  const [soundMuted, setSoundMuted] = useState(false);

  const unlockAndVisit = (stage: Stage) => {
    setUnlockedStages((prev) =>
      prev.includes(stage) ? prev : [...prev, stage],
    );
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGrandReveal = () => {
    if (!soundMuted) {
      playTrumpetFanfare();
    }
    setConfettiBurstKey((prev) => prev + 1);
    unlockAndVisit('reveal');
  };

  const handleReplayFanfare = () => {
    setSoundMuted(false);
    playTrumpetFanfare();
    setConfettiBurstKey((prev) => prev + 1);
  };

  const handleToggleMute = () => {
    setSoundMuted((prev) => {
      const nextMuted = !prev;
      if (nextMuted) {
        stopTrumpetFanfare();
      } else {
        playTrumpetFanfare();
      }
      return nextMuted;
    });
  };

  const handleResetTour = () => {
    stopTrumpetFanfare();
    setUnlockedStages(['age-gate']);
    setCurrentStage('age-gate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    return () => stopTrumpetFanfare();
  }, []);

  return (
    <div
      data-stage={currentStage}
      className="min-h-screen bg-vellum text-espresso flex flex-col"
    >
      <ConfettiCanvas burstKey={confettiBurstKey} />

      <Header
        currentStage={currentStage}
        unlockedStages={unlockedStages}
        onNavigateStage={(stage) => setCurrentStage(stage)}
        onResetTour={handleResetTour}
        soundMuted={soundMuted}
        onToggleMute={handleToggleMute}
      />

      <main className="flex-1">
        {currentStage === 'age-gate' && (
          <AgeGate onConfirmAdult={() => unlockAndVisit('identity')} />
        )}

        {currentStage === 'identity' && (
          <IdentityQuiz
            onVerified={() => unlockAndVisit('stalling')}
            onBack={() => setCurrentStage('age-gate')}
          />
        )}

        {currentStage === 'stalling' && (
          <StallingVault onRevealUnlocked={handleGrandReveal} />
        )}

        {currentStage === 'reveal' && (
          <GalleryExhibition
            onReplayFanfare={handleReplayFanfare}
            skipCurtain={autostart}
          />
        )}
      </main>
    </div>
  );
}
