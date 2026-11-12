import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clampSliderPercent,
  getNextSlideIndex,
  isAnswerMatch,
  isReadyToBreakSeal,
  normalizeAnswer,
  verifyIdentitySubmission,
  type IdentityQuestion,
} from './verification';

const SAMPLE_QUESTIONS: IdentityQuestion[] = [
  {
    id: 'first-kiss',
    label: 'When was our first kiss?',
    placeholder: 'Month & day',
    acceptedAnswers: ['june 14', '14 june', '06 14'],
    hint: 'A warm evening in June.',
    wrongFeedback: 'Hmm, check your romantic memory vault.',
  },
  {
    id: 'first-travel',
    label: 'What was the venue of our first travel together?',
    placeholder: 'City or venue',
    acceptedAnswers: ['paris', 'paris france'],
    hint: 'Croissants and velvet evenings.',
    wrongFeedback: 'Wrong passport stamp, Madame.',
  },
];

test('normalizeAnswer strips punctuation, accents, ordinals, and collapses spaces', () => {
  assert.equal(normalizeAnswer('  Oct 25th, 2024! '), 'oct 25 2024');
  assert.equal(normalizeAnswer('Café  de   Flore'), 'cafe de flore');
});

test('isAnswerMatch accepts exact, date-format, and Cyrillic variations', () => {
  assert.equal(isAnswerMatch('Oct 25', ['oct 25', '25 10']), true);
  assert.equal(isAnswerMatch('Oct 25th', ['oct 25', '25 10']), true);
  assert.equal(isAnswerMatch('25.10', ['oct 25', '25 10']), true);
  assert.equal(isAnswerMatch('10/25', ['oct 25', '10 25']), true);
  assert.equal(
    isAnswerMatch('Zelenogorsk, SPb', ['zelenogorsk', 'зеленогорск']),
    true,
  );
  assert.equal(
    isAnswerMatch('Зеленогорск', ['zelenogorsk', 'зеленогорск']),
    true,
  );
  assert.equal(
    isAnswerMatch('в Зеленогорске!', ['zelenogorsk', 'зеленогорск']),
    true,
  );
  assert.equal(isAnswerMatch('Alemmbom', ['alemmbom']), true);
  assert.equal(isAnswerMatch('Alembom', ['alemmbom']), false);
  assert.equal(isAnswerMatch('London', ['zelenogorsk', 'зеленогорск']), false);
  assert.equal(isAnswerMatch('   ', ['zelenogorsk']), false);
});

test('verifyIdentitySubmission validates all fields and returns specific errors', () => {
  const emptyResult = verifyIdentitySubmission(
    { 'first-kiss': '', 'first-travel': 'Paris' },
    SAMPLE_QUESTIONS,
  );
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors['first-kiss']);
  assert.equal(emptyResult.errors['first-travel'], undefined);

  const wrongResult = verifyIdentitySubmission(
    { 'first-kiss': 'December 1', 'first-travel': 'Rome' },
    SAMPLE_QUESTIONS,
  );
  assert.equal(wrongResult.valid, false);
  assert.equal(
    wrongResult.errors['first-kiss'],
    'Hmm, check your romantic memory vault.',
  );
  assert.equal(
    wrongResult.errors['first-travel'],
    'Wrong passport stamp, Madame.',
  );

  const validResult = verifyIdentitySubmission(
    { 'first-kiss': '14 June', 'first-travel': 'Paris, France' },
    SAMPLE_QUESTIONS,
  );
  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('clampSliderPercent bounds values cleanly between 0 and 100', () => {
  assert.equal(clampSliderPercent(-25), 0);
  assert.equal(clampSliderPercent(145), 100);
  assert.equal(clampSliderPercent(48.66), 48.7);
  assert.equal(clampSliderPercent(Number.NaN), 50);
});

test('getNextSlideIndex wraps cleanly forward and backward', () => {
  assert.equal(getNextSlideIndex(0, 'next', 3), 1);
  assert.equal(getNextSlideIndex(2, 'next', 3), 0);
  assert.equal(getNextSlideIndex(0, 'prev', 3), 2);
  assert.equal(getNextSlideIndex(1, 'prev', 3), 0);
  assert.equal(getNextSlideIndex(0, 'next', 0), 0);
});

test('isReadyToBreakSeal enforces inspection, all terms, and tease clicks', () => {
  assert.equal(
    isReadyToBreakSeal({
      inspectionComplete: false,
      termsAccepted: [true, true, true],
      teaseClicks: 3,
      requiredTeases: 3,
    }),
    false,
  );
  assert.equal(
    isReadyToBreakSeal({
      inspectionComplete: true,
      termsAccepted: [true, false, true],
      teaseClicks: 3,
      requiredTeases: 3,
    }),
    false,
  );
  assert.equal(
    isReadyToBreakSeal({
      inspectionComplete: true,
      termsAccepted: [true, true, true],
      teaseClicks: 2,
      requiredTeases: 3,
    }),
    false,
  );
  assert.equal(
    isReadyToBreakSeal({
      inspectionComplete: true,
      termsAccepted: [true, true, true],
      teaseClicks: 3,
      requiredTeases: 3,
    }),
    true,
  );
});
