// Logika satu sesi ujian: acak soal & opsi, hitung skor, streak.
import { POIN_PER_BENAR, BONUS_STREAK } from "./rewards.js";

function acak(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export class Quiz {
  constructor(bank) {
    // Ujian disusun PERSIS seperti kisi-kisi: satu soal untuk tiap nomor resmi,
    // diurutkan dari nomor terkecil ke terbesar (kelas 2 = No.1–25, kelas 3 = No.1–30).
    // Bila satu nomor punya beberapa varian, dipilih satu secara acak (agar
    // latihan ulang menampilkan soal berbeda namun cakupannya tetap lengkap).
    const perNomor = new Map();
    for (const s of bank.soal) {
      if (!perNomor.has(s.nomor)) perNomor.set(s.nomor, []);
      perNomor.get(s.nomor).push(s);
    }
    const nomorUrut = [...perNomor.keys()].sort((a, b) => a - b);
    const dipilih = nomorUrut.map((n) => acak(perNomor.get(n))[0]); // satu varian per nomor

    this.soal = dipilih.map((s) => {
      const opsiBerlabel = s.opsi.map((teks, idx) => ({ teks, benar: idx === s.jawaban }));
      const opsiAcak = acak(opsiBerlabel);
      return {
        ...s,
        opsiAcak,
        indexBenar: opsiAcak.findIndex((o) => o.benar),
      };
    });
    this.index = 0;
    this.benar = 0;
    this.poin = 0;
    this.streak = 0;
    this.streakMaks = 0;
    this.jawabanUser = []; // { dipilih, benar }
  }

  get total() {
    return this.soal.length;
  }

  get current() {
    return this.soal[this.index];
  }

  get selesai() {
    return this.index >= this.soal.length;
  }

  jawab(pilihIdx) {
    const s = this.current;
    const benar = pilihIdx === s.indexBenar;
    let poinDidapat = 0;
    if (benar) {
      this.benar++;
      this.streak++;
      this.streakMaks = Math.max(this.streakMaks, this.streak);
      poinDidapat = POIN_PER_BENAR + (this.streak >= 3 ? BONUS_STREAK : 0);
      this.poin += poinDidapat;
    } else {
      this.streak = 0;
    }
    this.jawabanUser.push({ dipilih: pilihIdx, benar });
    return { benar, poinDidapat, indexBenar: s.indexBenar, streak: this.streak };
  }

  lanjut() {
    this.index++;
  }

  get nilai() {
    return Math.round((this.benar / this.total) * 100);
  }
}
