// Procedural WebAudio sfx (no external files)
const ctx = typeof window !== 'undefined' ? new (window.AudioContext || window.webkitAudioContext)() : null;

function beep({ freq = 440, duration = 0.08, type = 'sine', gain = 0.05, glideTo, glideTime = 0.05 }) {
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = gain;
  o.connect(g);
  g.connect(ctx.destination);
  if (glideTo) {
    o.frequency.linearRampToValueAtTime(glideTo, ctx.currentTime + glideTime);
  }
  o.start();
  o.stop(ctx.currentTime + duration);
}

export function sfxAdd() { beep({ freq: 660, glideTo: 990, type: 'triangle' }); }
export function sfxDelete() { beep({ freq: 200, type: 'sawtooth', duration: 0.12 }); }
export function sfxComplete() { beep({ freq: 520, glideTo: 780, type: 'square' }); }
export function sfxError() { beep({ freq: 120, type: 'square', duration: 0.2 }); }