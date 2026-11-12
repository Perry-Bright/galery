import { useEffect, useState } from 'react';
import { Check, CheckCircle2, AlertTriangle } from 'lucide-react';
import { STALLING_TERMS } from '../config/revealConfig';
import { isReadyToBreakSeal } from '../utils/verification';

interface StallingVaultProps {
  onRevealUnlocked: () => void;
}

interface InspectionPhase {
  progress: number;
  message: string;
  alert?: boolean;
}

const INSPECTION_TIMELINE: InspectionPhase[] = [
  { progress: 18, message: 'Summoning the private vault butler...' },
  { progress: 52, message: 'Measuring satin-smoothness in Geneva...' },
  { progress: 98, message: 'Finalizing champagne glass temperature...' },
  {
    progress: 42,
    message:
      'Wait—emergency! Laser inspector spotted one stray hair near the left ankle. Dispatching Swiss tweezers...',
    alert: true,
  },
  {
    progress: 79,
    message: 'Stray hair neutralized. Applying ceremonial moisturizer...',
  },
  {
    progress: 100,
    message: 'Smoothness certified. Proceed to the Appreciation Accord below.',
  },
];

const TEASE_BUTTON_LABELS = [
  'Break the Wax Seal',
  'Too Eager, Madame — Click Again',
  'Say "Davai!" Out Loud & Click Once More',
];

const TEASE_SUBTEXTS = [
  'The vault awaits your royal permission.',
  'Old money never rushes. Patience makes the reveal 12% more dramatic.',
  'Final warning: prepare for extreme aerodynamic perfection.',
];

export function StallingVault({ onRevealUnlocked }: StallingVaultProps) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState<boolean[]>(() =>
    STALLING_TERMS.map(() => false),
  );
  const [teaseClicks, setTeaseClicks] = useState(0);

  const currentPhase = INSPECTION_TIMELINE[phaseIndex];
  const inspectionComplete = phaseIndex === INSPECTION_TIMELINE.length - 1;
  const allTermsChecked = termsAccepted.every(Boolean);

  useEffect(() => {
    if (inspectionComplete) {
      return;
    }

    const delays = [650, 750, 800, 1150, 750];
    const timeout = window.setTimeout(() => {
      setPhaseIndex((prev) =>
        Math.min(prev + 1, INSPECTION_TIMELINE.length - 1),
      );
    }, delays[phaseIndex] ?? 750);

    return () => window.clearTimeout(timeout);
  }, [phaseIndex, inspectionComplete]);

  const toggleTerm = (index: number) => {
    setTermsAccepted((prev) =>
      prev.map((val, idx) => (idx === index ? !val : val)),
    );
  };

  const handleSealClick = () => {
    if (!inspectionComplete || !allTermsChecked) {
      return;
    }

    const nextClicks = teaseClicks + 1;
    setTeaseClicks(nextClicks);

    if (
      isReadyToBreakSeal({
        inspectionComplete,
        termsAccepted,
        teaseClicks: nextClicks,
        requiredTeases: 3,
      })
    ) {
      onRevealUnlocked();
    }
  };

  const buttonOffsetClass =
    teaseClicks === 1
      ? 'translate-x-4 sm:translate-x-8'
      : teaseClicks === 2
        ? '-translate-x-4 sm:-translate-x-8'
        : 'translate-x-0';

  return (
    <section
      aria-labelledby="stalling-heading"
      className="max-w-3xl mx-auto px-4 sm:px-8 py-8 lg:py-10"
    >
      <p className="text-xs text-espresso-muted flex items-center gap-2">
        <span>03. Concierge Clearance</span>
        <span aria-hidden="true">·</span>
        <span>Mandatory Stalling Protocol</span>
      </p>

      <h1
        id="stalling-heading"
        className="font-serif text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1] text-espresso mt-3 text-balance"
      >
        Please Hold While We Polish the Evidence
      </h1>

      {/* Phase 1: Dramatic progress bar that drops back at 98% */}
      <div className="mt-6 border border-hairline bg-limestone/45 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-espresso">
            Luxury Quality Inspection
          </span>
          <span className="font-mono text-sm text-espresso tabular-nums">
            {currentPhase.progress}%
          </span>
        </div>

        <div
          className="mt-3 h-2 w-full bg-hairline overflow-hidden"
          role="progressbar"
          aria-valuenow={currentPhase.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Smoothness inspection progress"
        >
          <div
            className={`h-full transition-transform duration-500 ease-out origin-left ${
              currentPhase.alert ? 'bg-brass' : 'bg-heritage'
            }`}
            style={{
              transform: `scaleX(${currentPhase.progress / 100})`,
            }}
          />
        </div>

        <div className="mt-4 flex items-start gap-2.5 text-sm">
          {currentPhase.alert ? (
            <AlertTriangle
              className="w-4 h-4 text-brass shrink-0 mt-0.5"
              strokeWidth={1.75}
            />
          ) : (
            <CheckCircle2
              className="w-4 h-4 text-heritage shrink-0 mt-0.5"
              strokeWidth={1.75}
            />
          )}
          <p
            className={
              currentPhase.alert
                ? 'text-espresso font-medium'
                : 'text-espresso-muted'
            }
          >
            {currentPhase.message}
          </p>
        </div>
      </div>

      {/* Phase 2: Mandatory Terms & Conditions of Admiration */}
      <div className="mt-6 border border-hairline bg-vellum p-5 sm:p-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-espresso">
          Terms &amp; Conditions of Admiration
        </h2>
        <p className="text-sm text-espresso-muted mt-1">
          Confirm all three clauses before Madame may break the wax seal.
        </p>

        <div className="mt-4 space-y-2.5">
          {STALLING_TERMS.map((clause, index) => {
            const checked = termsAccepted[index];
            const checkboxId = `clause-${index}`;

            return (
              <label
                key={clause.text}
                htmlFor={checkboxId}
                className={`flex items-start gap-3.5 p-4 border transition-colors cursor-pointer min-h-[44px] ${
                  checked
                    ? 'border-heritage bg-limestone/60'
                    : 'border-hairline hover:bg-limestone/30'
                } ${!inspectionComplete ? 'opacity-60 pointer-events-none' : ''}`}
              >
                <span className="relative flex items-center justify-center mt-0.5 shrink-0">
                  <input
                    id={checkboxId}
                    type="checkbox"
                    checked={checked}
                    disabled={!inspectionComplete}
                    onChange={() => toggleTerm(index)}
                    className="peer sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`w-5 h-5 border flex items-center justify-center transition-colors ${
                      checked
                        ? 'bg-heritage border-heritage text-vellum'
                        : 'bg-vellum border-espresso/40'
                    }`}
                  >
                    {checked && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  </span>
                </span>
                <span className="text-sm sm:text-base text-espresso leading-relaxed">
                  <span>{clause.text}</span>
                  {clause.note && (
                    <span className="block text-xs text-espresso-muted italic mt-1">
                      {clause.note}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>

        {/* Phase 3: Playfully teasing reveal seal button */}
        <div className="mt-6 pt-5 border-t border-hairline flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-espresso-muted italic">
            {!inspectionComplete
              ? 'Waiting for Swiss laser inspector to finish...'
              : !allTermsChecked
                ? 'Please accept all three clauses to arm the wax seal.'
                : TEASE_SUBTEXTS[Math.min(teaseClicks, 2)]}
          </p>

          <button
            type="button"
            disabled={!inspectionComplete || !allTermsChecked}
            onClick={handleSealClick}
            className={`px-6 py-3 min-h-[44px] text-sm font-medium transition-transform duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage ${buttonOffsetClass} ${
              inspectionComplete && allTermsChecked
                ? 'bg-heritage text-vellum hover:bg-heritage-hover cursor-pointer'
                : 'bg-hairline text-espresso-muted cursor-not-allowed'
            }`}
          >
            {TEASE_BUTTON_LABELS[Math.min(teaseClicks, 2)]}
          </button>
        </div>
      </div>
    </section>
  );
}
