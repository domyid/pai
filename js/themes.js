// Tema karakter Sanrio kesukaan anak.
// Setiap tema mengubah CSS custom properties di <body data-theme="...">.

export const themes = {
  kuromi: {
    nama: "Kuromi",
    emoji: "😈🖤",
    teman: "si nakal yang lucu",
    sapaan: "Yuk, kita kerjakan bareng Kuromi!",
    vars: {
      "--bg-1": "#2a1840",
      "--bg-2": "#4a2d6e",
      "--card": "#3a2557",
      "--card-soft": "#4d3370",
      "--text": "#fdf4ff",
      "--text-dim": "#d9c7ee",
      "--primary": "#b06cff",
      "--primary-dark": "#8a3ffb",
      "--accent": "#ff6fae",
      "--correct": "#7ee787",
      "--wrong": "#ff7b95",
      "--ring": "#ff6fae",
    },
  },
  keroppi: {
    nama: "Keroppi",
    emoji: "🐸💚",
    teman: "si katak ceria",
    sapaan: "Ribbit! Keroppi siap menemanimu!",
    vars: {
      "--bg-1": "#d6f5c8",
      "--bg-2": "#a8e063",
      "--card": "#ffffff",
      "--card-soft": "#eafbe0",
      "--text": "#1f3d18",
      "--text-dim": "#4f7a3f",
      "--primary": "#6cc24a",
      "--primary-dark": "#3f9c2e",
      "--accent": "#ff5a5a",
      "--correct": "#3f9c2e",
      "--wrong": "#e2483f",
      "--ring": "#ff5a5a",
    },
  },
  cinnamoroll: {
    nama: "Cinnamoroll",
    emoji: "🐶☁️",
    teman: "si anjing awan biru",
    sapaan: "Halo! Cinnamoroll terbang menemanimu~",
    vars: {
      "--bg-1": "#e8f6ff",
      "--bg-2": "#bfe6ff",
      "--card": "#ffffff",
      "--card-soft": "#eef9ff",
      "--text": "#234060",
      "--text-dim": "#5d7da0",
      "--primary": "#5cc4f0",
      "--primary-dark": "#2c9fe0",
      "--accent": "#ff9ec4",
      "--correct": "#3bbf8f",
      "--wrong": "#ff7b95",
      "--ring": "#ff9ec4",
    },
  },
  pochacco: {
    nama: "Pochacco",
    emoji: "🐶⚽",
    teman: "si anjing sporty",
    sapaan: "Semangat olahraga otak bareng Pochacco!",
    vars: {
      "--bg-1": "#eef7ff",
      "--bg-2": "#cfe9ff",
      "--card": "#ffffff",
      "--card-soft": "#f0f7ec",
      "--text": "#1f3550",
      "--text-dim": "#5a7491",
      "--primary": "#3fa9f5",
      "--primary-dark": "#1f86d4",
      "--accent": "#8bd24f",
      "--correct": "#4caf50",
      "--wrong": "#ef5b5b",
      "--ring": "#8bd24f",
    },
  },
};

export function applyTheme(key) {
  const t = themes[key];
  if (!t) return;
  const root = document.body;
  root.dataset.theme = key;
  for (const [prop, val] of Object.entries(t.vars)) {
    root.style.setProperty(prop, val);
  }
}
