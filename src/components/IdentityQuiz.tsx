import { useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, HelpCircle, LockKeyhole } from 'lucide-react';
import { IDENTITY_QUESTIONS } from '../config/revealConfig';
import { verifyIdentitySubmission } from '../utils/verification';

interface IdentityQuizProps {
  onVerified: () => void;
  onBack: () => void;
}

export function IdentityQuiz({ onVerified, onBack }: IdentityQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [attempts, setAttempts] = useState(0);
  const [showHints, setShowHints] = useState(false);

  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (errors[questionId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const result = verifyIdentitySubmission(answers, IDENTITY_QUESTIONS);

    if (result.valid) {
      setErrors({});
      onVerified();
      return;
    }

    setErrors(result.errors);
    setAttempts((prev) => prev + 1);
  };

  return (
    <section
      aria-labelledby="identity-heading"
      className="max-w-5xl mx-auto px-4 sm:px-8 py-12 lg:py-16"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left editorial dossier brief */}
        <div className="lg:col-span-5">
          <p className="text-xs text-espresso-muted flex items-center gap-2">
            <span>02. Diplomatic Dossier</span>
            <span aria-hidden="true">·</span>
            <span>Identity Verification</span>
          </p>

          <h1
            id="identity-heading"
            className="font-serif text-4xl sm:text-5xl font-medium tracking-tight leading-[1.1] text-espresso mt-4 text-balance"
          >
            Prove You Are the Real Alisa
          </h1>

          <p className="text-base text-espresso-muted leading-relaxed mt-5">
            These photographs are far too exclusive for an impostor. Answer the
            private memory ledger below so the concierge may unlock the vault.
          </p>

          <div className="mt-8 pt-6 border-t border-hairline space-y-3 text-sm text-espresso-muted">
            <p className="flex items-center gap-2 text-espresso font-medium">
              <LockKeyhole className="w-4 h-4 text-brass" strokeWidth={1.75} />
              <span>Private Swiss Protocol</span>
            </p>
            <p>
              Punctuation and capitalization are forgiven. Emotional hesitation,
              however, will be judged gently.
            </p>
          </div>

          {attempts >= 1 && (
            <div className="mt-6 pt-5 border-t border-hairline">
              <button
                type="button"
                onClick={() => setShowHints((prev) => !prev)}
                className="inline-flex items-center gap-2 text-sm font-medium text-heritage hover:underline cursor-pointer min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
              >
                <HelpCircle className="w-4 h-4" strokeWidth={1.75} />
                <span>
                  {showHints
                    ? 'Hide Diplomatic Hints'
                    : 'Forgot? Request Diplomatic Hints'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Right clean archival verification form */}
        <div className="lg:col-span-7 border border-hairline bg-limestone/45 p-6 sm:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {IDENTITY_QUESTIONS.map((question, index) => {
              const fieldError = errors[question.id];
              const inputId = `question-${question.id}`;

              return (
                <div key={question.id} className="space-y-2">
                  <label
                    htmlFor={inputId}
                    className="block font-serif text-xl sm:text-2xl font-medium text-espresso"
                  >
                    <span className="text-brass mr-2 tabular-nums">
                      0{index + 1}.
                    </span>
                    {question.label}
                  </label>

                  {question.formatNote && (
                    <p className="text-xs text-espresso-muted">
                      {question.formatNote}
                    </p>
                  )}

                  <input
                    id={inputId}
                    name={question.id}
                    type="text"
                    autoComplete="off"
                    value={answers[question.id] ?? ''}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                    placeholder={question.placeholder}
                    aria-invalid={Boolean(fieldError)}
                    aria-describedby={
                      fieldError ? `${inputId}-error` : undefined
                    }
                    className={`w-full px-4 py-3 min-h-[44px] text-base bg-vellum text-espresso placeholder:text-espresso-muted/55 border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage ${
                      fieldError
                        ? 'border-crimson'
                        : 'border-hairline focus:border-espresso'
                    }`}
                  />

                  {showHints && (
                    <p className="text-xs text-espresso-muted italic">
                      Hint: {question.hint}
                    </p>
                  )}

                  {fieldError && (
                    <p
                      id={`${inputId}-error`}
                      role="alert"
                      className="text-sm text-crimson font-medium"
                    >
                      {fieldError}
                    </p>
                  )}
                </div>
              );
            })}

            <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] text-sm font-medium text-espresso-muted hover:text-espresso transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.75} />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3 min-h-[44px] text-sm font-medium bg-heritage text-vellum hover:bg-heritage-hover transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-heritage"
              >
                <span>Verify Identity</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
