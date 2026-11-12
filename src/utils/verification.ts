export type Stage = 'age-gate' | 'identity' | 'stalling' | 'reveal';

export interface IdentityQuestion {
  id: string;
  label: string;
  formatNote?: string;
  placeholder: string;
  acceptedAnswers: string[];
  hint: string;
  wrongFeedback: string;
}

export interface VerificationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Normalizes user input for forgiving yet accurate personal-quiz matching.
 * Strips diacritics, English ordinal suffixes (25th -> 25), punctuation, and extra whitespace.
 */
export function normalizeAnswer(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/(\d+)(st|nd|rd|th)\b/g, '$1')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Checks whether a user's response matches any accepted answer variation.
 */
export function isAnswerMatch(
  input: string,
  acceptedAnswers: string[],
): boolean {
  const normalizedInput = normalizeAnswer(input);
  if (!normalizedInput) {
    return false;
  }

  return acceptedAnswers.some((candidate) => {
    const normalizedCandidate = normalizeAnswer(candidate);
    if (!normalizedCandidate) {
      return false;
    }
    if (normalizedInput === normalizedCandidate) {
      return true;
    }
    // Allow containment when the user writes a full sentence around the key phrase
    // (e.g., "Our first trip was in Paris together" matching "paris")
    if (
      normalizedCandidate.length >= 3 &&
      normalizedInput.includes(normalizedCandidate)
    ) {
      return true;
    }
    return false;
  });
}

/**
 * Validates all identity questions submitted by Alisa.
 */
export function verifyIdentitySubmission(
  answers: Record<string, string>,
  questions: IdentityQuestion[],
): VerificationResult {
  const errors: Record<string, string> = {};

  for (const question of questions) {
    const raw = answers[question.id] ?? '';
    if (!raw.trim()) {
      errors[question.id] =
        'Madame, an empty parchment will not appease the concierge.';
      continue;
    }
    if (!isAnswerMatch(raw, question.acceptedAnswers)) {
      errors[question.id] = question.wrongFeedback;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Clamps the Before/After comparison slider percentage between 0 and 100.
 */
export function clampSliderPercent(value: number): number {
  if (!Number.isFinite(value)) {
    return 50;
  }
  return Math.min(100, Math.max(0, Math.round(value * 10) / 10));
}

/**
 * Computes the next gallery slide index with clean wrap-around.
 */
export function getNextSlideIndex(
  current: number,
  direction: 'prev' | 'next',
  total: number,
): number {
  if (total <= 0) {
    return 0;
  }
  const safeCurrent = ((current % total) + total) % total;
  if (direction === 'next') {
    return (safeCurrent + 1) % total;
  }
  return (safeCurrent - 1 + total) % total;
}

/**
 * Determines whether the final wax seal can break based on stalling progress,
 * mandatory luxury terms acceptance, and playful click count.
 */
export function isReadyToBreakSeal(params: {
  inspectionComplete: boolean;
  termsAccepted: boolean[];
  teaseClicks: number;
  requiredTeases: number;
}): boolean {
  const allTermsChecked =
    params.termsAccepted.length > 0 && params.termsAccepted.every(Boolean);
  return (
    params.inspectionComplete &&
    allTermsChecked &&
    params.teaseClicks >= params.requiredTeases
  );
}
