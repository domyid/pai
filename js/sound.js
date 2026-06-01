// Efek suara sederhana memakai Web Audio API (tanpa file audio).
// Bisa dimatikan lewat toggle.

let ctx = null;
let enabled = true;

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) ctx = new AC();
  }
  return ctx;
}

export function setEnabled(on) {
  enabled = on;
}

export function isEnabled() {
  return enabled;
}

function beep(freq, durasi, tipe = "sine", volume = 0.15, delay = 0) {
  const c = ac();
  if (!c || !enabled) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = tipe;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain).connect(c.destination);
  const t = c.currentTime + delay;
  osc.start(t);
  gain.gain.setValueAtTime(volume, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + durasi);
  osc.stop(t + durasi);
}

export function suaraBenar() {
  // melodi naik ceria
  beep(523, 0.12, "triangle", 0.18, 0);
  beep(659, 0.12, "triangle", 0.18, 0.1);
  beep(784, 0.2, "triangle", 0.18, 0.2);
}

export function suaraSalah() {
  beep(220, 0.25, "sawtooth", 0.12, 0);
  beep(160, 0.3, "sawtooth", 0.12, 0.12);
}

export function suaraKlik() {
  beep(440, 0.06, "square", 0.08, 0);
}

export function suaraMenang() {
  const notes = [523, 659, 784, 1046];
  notes.forEach((f, i) => beep(f, 0.25, "triangle", 0.18, i * 0.14));
}
