/**
 * Synthesizes a regal brass trumpet fanfare using the Web Audio API.
 * Plays cleanly in any modern browser on user gesture without external MP3 files.
 */

let activeContext: AudioContext | null = null;

interface FanfareNote {
  freq: number;
  start: number;
  duration: number;
  gain: number;
}

const ROYAL_FANFARE_NOTES: FanfareNote[] = [
  // Opening herald call: C5 - C5 - C5 - G5 - E5 - G5 - C6!
  { freq: 523.25, start: 0.0, duration: 0.14, gain: 0.24 },
  { freq: 523.25, start: 0.17, duration: 0.14, gain: 0.24 },
  { freq: 523.25, start: 0.34, duration: 0.14, gain: 0.26 },
  { freq: 659.25, start: 0.52, duration: 0.28, gain: 0.28 },
  { freq: 587.33, start: 0.84, duration: 0.16, gain: 0.24 },
  { freq: 659.25, start: 1.04, duration: 0.18, gain: 0.28 },
  { freq: 783.99, start: 1.26, duration: 0.48, gain: 0.32 },
  // Triumphant octave resolution
  { freq: 783.99, start: 1.82, duration: 0.16, gain: 0.26 },
  { freq: 1046.5, start: 2.02, duration: 1.15, gain: 0.34 },
  // Warm brass harmony chord underneath the final note
  { freq: 523.25, start: 2.02, duration: 1.15, gain: 0.16 },
  { freq: 659.25, start: 2.02, duration: 1.15, gain: 0.16 },
];

export function stopTrumpetFanfare(): void {
  if (activeContext && activeContext.state !== 'closed') {
    activeContext.close().catch(() => {});
    activeContext = null;
  }
}

export function playTrumpetFanfare(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AudioCtx) {
    return false;
  }

  try {
    stopTrumpetFanfare();
    const ctx = new AudioCtx();
    activeContext = ctx;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.55, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Subtle hall echo for palace acoustics
    const delay = ctx.createDelay(0.5);
    delay.delayTime.setValueAtTime(0.14, ctx.currentTime);
    const delayGain = ctx.createGain();
    delayGain.gain.setValueAtTime(0.18, ctx.currentTime);
    delay.connect(delayGain);
    delayGain.connect(masterGain);

    const now = ctx.currentTime + 0.04;

    for (const note of ROYAL_FANFARE_NOTES) {
      const oscMain = ctx.createOscillator();
      const oscHarmonic = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const env = ctx.createGain();

      oscMain.type = 'sawtooth';
      oscMain.frequency.setValueAtTime(note.freq, now + note.start);

      // Slight brass detune for ensemble richness
      oscHarmonic.type = 'sawtooth';
      oscHarmonic.frequency.setValueAtTime(note.freq * 1.004, now + note.start);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now + note.start);
      filter.frequency.exponentialRampToValueAtTime(
        3400,
        now + note.start + 0.06,
      );
      filter.frequency.exponentialRampToValueAtTime(
        1800,
        now + note.start + note.duration,
      );
      filter.Q.setValueAtTime(2.5, now + note.start);

      env.gain.setValueAtTime(0.0001, now + note.start);
      env.gain.linearRampToValueAtTime(note.gain, now + note.start + 0.035);
      env.gain.setValueAtTime(
        note.gain * 0.85,
        now + note.start + Math.max(0.05, note.duration - 0.08),
      );
      env.gain.exponentialRampToValueAtTime(
        0.0001,
        now + note.start + note.duration + 0.06,
      );

      oscMain.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(env);
      env.connect(masterGain);
      env.connect(delay);

      oscMain.start(now + note.start);
      oscHarmonic.start(now + note.start);
      oscMain.stop(now + note.start + note.duration + 0.1);
      oscHarmonic.stop(now + note.start + note.duration + 0.1);
    }

    return true;
  } catch {
    return false;
  }
}
