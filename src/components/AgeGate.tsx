import { useState } from 'react';
import { ArrowRight, ShieldAlert } from 'lucide-react';
import { REVEAL_COPY, SALON_HERO_IMAGE } from '../config/revealConfig';
import { LuxuryImage } from './LuxuryImage';

interface AgeGateProps {
  onConfirmAdult: () => void;
}

export function AgeGate({ onConfirmAdult }: AgeGateProps) {
  const [underageDeclined, setUnderageDeclined] = useState(false);

  return (
    <section
      aria-labelledby="age-gate-heading"
      className="max-w-6xl mx-auto px-4 sm:px-8 py-10 lg:py-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left typographic invitation column */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div>
            <p className="text-xs tracking-wide text-espresso-muted flex flex-wrap items-center gap-2">
              <span>01. Private Admission</span>
              <span aria-hidden="true">·</span>
              <span>{REVEAL_COPY.editionLine}</span>
            </p>

            {!underageDeclined ? (
              <>
                <h1
                  id="age-gate-heading"
                  className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] text-espresso mt-5 text-balance"
                >
                  A Strictly Private Unveiling for Alisa
                </h1>

                <p className="text-base sm:text-lg text-espresso-muted leading-relaxed mt-6 max-w-xl">
                  After thirty long days of diplomatic reminders, negotiations,
                  and shameless lobbying, the House presents an unprecedented
                  photographic archive of freshly shaved elegance.
                </p>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <p className="font-serif text-2xl italic text-espresso">
                    Before entering the private salon: are you 18 years of age
                    or older?
                  </p>
                  <p className="text-sm text-espresso-muted mt-2">
                    Viewer discretion is advised for extreme aerodynamic
                    smoothness and mild husband pride.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={onConfirmAdult}
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[44px] text-sm font-medium bg-heritage text-vellum hover:bg-heritage-hover transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
                  >
                    <span>Yes, I am 18+</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setUnderageDeclined(true)}
                    className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-sm font-medium border border-espresso/30 text-espresso hover:bg-limestone transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
                  >
                    <span>No, I am under 18</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-6 border border-hairline bg-limestone/60 p-8">
                <div className="flex items-center gap-3 text-crimson">
                  <ShieldAlert className="w-5 h-5 shrink-0" strokeWidth={1.75} />
                  <h1
                    id="age-gate-heading"
                    className="font-serif text-3xl font-medium text-espresso"
                  >
                    Admission Refused by the Concierge
                  </h1>
                </div>

                <p className="text-base text-espresso-muted leading-relaxed mt-4">
                  Nice try, little one. This level of luxury grooming is
                  classified for mature connoisseurs only. Please finish your
                  warm milk, wait several years, or confess immediately that you
                  were joking.
                </p>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setUnderageDeclined(false)}
                    className="inline-flex items-center justify-center px-6 py-3 min-h-[44px] text-sm font-medium bg-espresso text-vellum hover:bg-espresso/90 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-espresso"
                  >
                    <span>Forgive me, I am 18+</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-espresso-muted mt-10 pt-4 border-t border-hairline">
            By invitation only · Dress code: Evening silk or cozy oversized
            sweater
          </p>
        </div>

        {/* Right matching-height luxury architectural photograph */}
        <div className="lg:col-span-6">
          <div className="h-full min-h-[340px] lg:min-h-[520px] border border-hairline bg-limestone overflow-hidden relative">
            <LuxuryImage
              src={SALON_HERO_IMAGE}
              alt="Old-money European private library salon illuminated by afternoon sunlight"
              className="w-full h-full object-cover"
              fallbackTitle="The Private Salon"
              fallbackSubtitle="Private exhibition chamber awaiting Madame Alisa."
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/85 via-espresso/40 to-transparent p-6">
              <p className="font-serif text-lg italic text-vellum">
                Salon Privé · Room IV
              </p>
              <p className="text-xs text-vellum/80 mt-0.5">
                Reserved exclusively for Madame Alisa · One guest maximum
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width 4-column provenance ribbon below hero split */}
      <div className="mt-12 pt-8 border-t border-hairline grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-xs text-espresso-muted">Sole Guest of Honor</p>
          <p className="font-serif text-2xl font-medium text-espresso mt-1">
            Alisa
          </p>
        </div>
        <div>
          <p className="text-xs text-espresso-muted">Lobbying Period</p>
          <p className="font-serif text-2xl font-medium text-espresso mt-1 tabular-nums">
            30 Days
          </p>
        </div>
        <div>
          <p className="text-xs text-espresso-muted">Prior Body Shaves</p>
          <p className="font-serif text-2xl font-medium text-espresso mt-1 tabular-nums">
            00 Recorded
          </p>
        </div>
        <div>
          <p className="text-xs text-espresso-muted">Clearance Level</p>
          <p className="font-serif text-2xl font-medium text-espresso mt-1">
            Private Vault
          </p>
        </div>
      </div>
    </section>
  );
}
