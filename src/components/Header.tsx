import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { REVEAL_COPY } from '../config/revealConfig';
import type { Stage } from '../utils/verification';

interface HeaderProps {
  currentStage: Stage;
  unlockedStages: Stage[];
  onNavigateStage: (stage: Stage) => void;
  onResetTour: () => void;
  soundMuted: boolean;
  onToggleMute: () => void;
}

const NAV_STAGES: { id: Stage; label: string }[] = [
  { id: 'age-gate', label: 'Age Gate' },
  { id: 'identity', label: 'Identity' },
  { id: 'stalling', label: 'Clearance' },
  { id: 'reveal', label: 'Exhibition' },
];

export function Header({
  currentStage,
  unlockedStages,
  onNavigateStage,
  onResetTour,
  soundMuted,
  onToggleMute,
}: HeaderProps) {
  return (
    <header className="w-full border-b border-hairline bg-vellum/95 backdrop-blur-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => onNavigateStage('age-gate')}
          className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-espresso whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-heritage"
        >
          {REVEAL_COPY.brandName}
        </button>

        {/* Zone 2: 4 clean single-line stage links */}
        <nav
          aria-label="Exhibition stages"
          className="hidden md:flex items-center gap-6 text-sm"
        >
          {NAV_STAGES.map((item) => {
            const isActive = currentStage === item.id;
            const isUnlocked = unlockedStages.includes(item.id);

            return (
              <button
                key={item.id}
                type="button"
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onNavigateStage(item.id)}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors border-b focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-heritage ${
                  isActive
                    ? 'border-espresso text-espresso font-medium'
                    : isUnlocked
                      ? 'border-transparent text-espresso-muted hover:text-espresso cursor-pointer'
                      : 'border-transparent text-espresso-muted/40 cursor-not-allowed'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          {currentStage === 'reveal' ? (
            <button
              type="button"
              onClick={onToggleMute}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-medium border border-espresso/25 text-espresso hover:bg-limestone transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
            >
              {soundMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Sound Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Sound On</span>
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={onResetTour}
              className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] text-xs font-medium border border-espresso/25 text-espresso hover:bg-limestone transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Restart</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
