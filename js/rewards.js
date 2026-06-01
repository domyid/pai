// Daftar hadiah yang bisa ditukar dengan poin.
// Orang tua bisa menyesuaikan daftar ini sesuai kesepakatan dengan anak.

export const rewards = [
  { id: "snack-kecil", nama: "Snack Kecil 🍪", biaya: 50, emoji: "🍪" },
  { id: "stiker", nama: "1 Lembar Stiker ✨", biaya: 60, emoji: "✨" },
  { id: "screen-15", nama: "Screen Time 15 Menit 📱", biaya: 80, emoji: "📱" },
  { id: "es-krim", nama: "Es Krim 🍦", biaya: 100, emoji: "🍦" },
  { id: "screen-30", nama: "Screen Time 30 Menit 🎮", biaya: 150, emoji: "🎮" },
  { id: "pilih-film", nama: "Pilih Film Nonton 🎬", biaya: 200, emoji: "🎬" },
  { id: "main-keluar", nama: "Main ke Taman / Jalan-jalan 🛝", biaya: 250, emoji: "🛝" },
];

// Poin yang didapat per jawaban benar.
export const POIN_PER_BENAR = 10;
// Bonus jika menjawab benar berturut-turut (streak).
export const BONUS_STREAK = 5;
