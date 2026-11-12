import salonHeroImg from '../assets/images/editorial_crest_salon_1794507235612.jpg';
import afterMainImg from '../assets/images/after-main.jpg';
import afterOneImg from '../assets/images/after-1.jpg';
import afterTwoImg from '../assets/images/after-2.jpg';
import afterThreeImg from '../assets/images/after-3.jpg';
import type { IdentityQuestion } from '../utils/verification';

/**
 * ============================================================================
 *  MAISON ALISA — PERSONALIZE EVERYTHING RIGHT HERE
 * ============================================================================
 *  1. PHOTOS (AFTER-ONLY EXHIBITION):
 *     Your real photos are bundled directly from `src/assets/images/`:
 *       - `after-main.jpg`  (the large centerpiece photo)
 *       - `after-1.jpg`     (gallery slider plate 1)
 *       - `after-2.jpg`     (gallery slider plate 2)
 *       - `after-3.jpg`     (gallery slider plate 3)
 *
 *  2. QUIZ ANSWERS:
 *     Update `acceptedAnswers` in `IDENTITY_QUESTIONS` below if needed.
 *     Matching ignores capitalization, punctuation, and accents.
 * ============================================================================
 */

export interface GalleryPhoto {
  id: string;
  accessionNumber: string;
  title: string;
  subtitle: string;
  src: string;
  alt: string;
  caption: string;
  specs: string[];
}

export interface StallingTerm {
  text: string;
  note?: string;
}

export const SALON_HERO_IMAGE = salonHeroImg;

/**
 * LARGE FEATURED CENTERPIECE PHOTO (SHOWN FIRST ABOVE THE GALLERY SLIDER)
 */
export const FEATURED_AFTER_PHOTO: GalleryPhoto = {
  id: 'featured-main',
  accessionNumber: 'LOT 000 · CENTERPIECE',
  title: 'The Grand Smooth Portrait',
  subtitle: 'First recorded body smoothness in Perry-Bright history',
  src: afterMainImg,
  alt: 'Main centerpiece freshly smooth photograph of Perry-Bright',
  caption:
    'Centerpiece — Thirty days of lobbying, zero prior body shaves, and one bold decision with some good hair-removing chemical.',
  specs: [
    'Smoothness: 100%',
    'Formula: Hair-Removing Chemical',
    'Subject: Perry-Bright',
  ],
};

/**
 * MULTI-PHOTO EXHIBITION GALLERY SLIDER (SHOWN BELOW THE FEATURED PHOTO)
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'plate-01',
    accessionNumber: 'PLATE 001',
    title: 'The Smooth Era Debut',
    subtitle: 'First archival angle certified for Madame Alisa',
    src: afterOneImg,
    alt: 'Freshly smooth debut photograph of Perry-Bright',
    caption:
      'Fig. 1 — After thirty days of relentless diplomatic negotiations from Russia to the bathroom mirror, history was finally made.',
    specs: [
      'Smoothness: 100%',
      'Formula: Hair-Removing Chemical',
      'Model: Perry-Bright',
    ],
  },
  {
    id: 'plate-02',
    accessionNumber: 'PLATE 002',
    title: 'Velvet Finish Verification',
    subtitle: 'Secondary angle certified for Madame Alisa',
    src: afterTwoImg,
    alt: 'Second freshly smooth verification photograph of Perry-Bright',
    caption:
      'Fig. 2 — Never say your husband does not listen, Alisa. Aerodynamic perfection achieved without a single prior body shave in history.',
    specs: [
      'Finish: Satin Smooth',
      'Lobbying Survived: 30 Days',
      'Approved For: Alisa',
    ],
  },
  {
    id: 'plate-03',
    accessionNumber: 'PLATE 003',
    title: 'Official Smoothness Proof',
    subtitle: 'Final plate of the Post-Shave Peace Treaty',
    src: afterThreeImg,
    alt: 'Third freshly smooth photograph of Perry-Bright',
    caption:
      'Fig. 3 — Zero regrets, mild chemical dedication, and infinite love after taking a whole month. Davai, admire responsibly.',
    specs: [
      'Vintage: Tonight',
      'Verdict: Worth Every Minute',
      'Curated By: Perry-Bright',
    ],
  },
];

/**
 * ALISA'S IDENTITY VERIFICATION QUESTIONS
 */
export const IDENTITY_QUESTIONS: IdentityQuestion[] = [
  {
    id: 'first-kiss',
    label: 'When was our first kiss?',
    formatNote: 'Format: Mon DD (e.g., May 12) or DD.MM',
    placeholder: 'Mon DD or DD.MM',
    acceptedAnswers: [
      'oct 25',
      'october 25',
      '25 oct',
      '25 october',
      '25 10',
      '10 25',
      '25 октября',
      'октябрь 25',
    ],
    hint: 'An unforgettable autumn evening in late October (Mon DD).',
    wrongFeedback:
      'Unacceptable, Madame. Our anniversary committee requires the true date of our first kiss (Mon DD or DD.MM).',
  },
  {
    id: 'first-name-a',
    label:
      'What is the spelling of my first name (the one that starts with A)?',
    formatNote: 'Exact spelling required',
    placeholder: 'Starts with A...',
    acceptedAnswers: ['alemmbom'],
    hint: 'Starts with A, ends with m — pay close attention to the double letter in the middle.',
    wrongFeedback:
      'Spell-check failure, Madame. Double-check every letter of his first name starting with A.',
  },
  {
    id: 'last-travel',
    label: 'Where did we go on our last 1-day travel adventure together?',
    formatNote: 'Russian or Latin letters accepted (resort town near St. Petersburg)',
    placeholder: 'City / resort name',
    acceptedAnswers: [
      'zelenogorsk',
      'zelenagorsk',
      'зеленогорск',
      'зеленогорске',
      'terijoki',
    ],
    hint: 'Think of our 1-day trip to the coastal resort town in Kurortny District, Saint Petersburg (Latin or Russian).',
    wrongFeedback:
      'Invalid passport record, Madame. Think of our 1-day trip near St. Petersburg (English or Russian spelling works).',
  },
];

export const STALLING_TERMS: StallingTerm[] = [
  {
    text: 'I, Alisa, solemnly swear to gasp dramatically and offer immediate compliments.',
  },
  {
    text: 'I acknowledge that for Perry-Bright, who has never shaved his body once in his life, this took Olympic bravery.',
  },
  {
    text: 'I agree that dinner, tea, or pelmeni privileges are hereby permanently upgraded in his favor.',
    note: 'lol just for vibes 😂',
  },
];

export const REVEAL_COPY = {
  brandName: 'Maison Alisa',
  editionLine: 'Edition Privée · Curated Strictly for Alisa · Autumn 2026',
  husbandSignature:
    'With infinite love (and some good hair-removing chemical 😂), Perry-Bright',
};
