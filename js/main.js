// Pengendali utama aplikasi: alur layar
// (nama → tema → kelas → ujian → hasil → toko hadiah).
import { themes, applyTheme } from "./themes.js";
import { kelas2 } from "./data/kelas2.js";
import { kelas3 } from "./data/kelas3.js";
import { Quiz } from "./quiz.js";
import { rewards } from "./rewards.js";
import { DETIK_PER_SOAL } from "./config.js";
import * as store from "./storage.js";
import * as sfx from "./sound.js";
import { confetti, pop } from "./effects.js";

const app = document.getElementById("app");
const bankSoal = { 2: kelas2, 3: kelas3 };

const state = {
  nama: "",
  profil: "", // kunci penyimpanan poin (berdasarkan nama)
  theme: null,
  kelas: null,
  quiz: null,
  mulaiWaktu: 0,
  totalDetik: 0,
};

let timerId = null; // id interval timer soal aktif

/* ---------- util kecil ---------- */
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function ganti(node) {
  hentikanTimer();
  app.innerHTML = "";
  app.appendChild(node);
  node.classList.add("masuk");
}

function hentikanTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function namaTampil() {
  return state.nama || "Adik";
}

function badgePoin() {
  if (!state.profil) return "";
  return `<span class="poin-badge">⭐ ${store.getPoin(state.profil)} poin</span>`;
}

/* ---------- Layar 0: Input Nama ---------- */
function layarNama() {
  const node = el(`
    <section class="screen">
      <div class="hero">
        <div class="logo-emoji">🌸📖✨</div>
        <h1>Simulasi Ujian PAI &amp; BP</h1>
        <p class="sub">Latihan ujian yang seru sambil mengumpulkan poin hadiah!</p>
      </div>
      <div class="kartu-nama">
        <label for="inputNama" class="tanya">Siapa nama kamu? 😊</label>
        <input id="inputNama" class="input-nama" type="text" maxlength="16"
               placeholder="Tulis namamu di sini" autocomplete="off" />
        <button class="btn-utama" id="mulaiBtn">Mulai ➡</button>
      </div>
    </section>
  `);

  const input = node.querySelector("#inputNama");
  const lanjut = () => {
    const nama = input.value.trim();
    state.nama = nama;
    state.profil = (nama || "tamu").toLowerCase();
    sfx.suaraKlik();
    layarTema();
  };
  node.querySelector("#mulaiBtn").addEventListener("click", lanjut);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") lanjut();
  });

  ganti(node);
  setTimeout(() => input.focus(), 100);
}

/* ---------- Layar 1: Pilih Tema ---------- */
function layarTema() {
  const kartu = Object.entries(themes)
    .map(
      ([key, t]) => `
      <button class="tema-card" data-key="${key}">
        <span class="tema-emoji">${t.emoji}</span>
        <span class="tema-nama">${t.nama}</span>
        <span class="tema-desc">${t.teman}</span>
      </button>`
    )
    .join("");

  const node = el(`
    <section class="screen">
      <div class="topbar">
        <button class="link-btn" id="kembali">⬅ Ganti nama</button>
        ${badgePoin()}
      </div>
      <h2 class="tanya">Halo ${namaTampil()}! Pilih teman belajarmu 💕</h2>
      <div class="tema-grid">${kartu}</div>
      <p class="hint">Pilih karakter kesukaanmu, warnanya akan berubah ✨</p>
    </section>
  `);

  node.querySelector("#kembali").addEventListener("click", () => {
    sfx.suaraKlik();
    layarNama();
  });
  node.querySelectorAll(".tema-card").forEach((btn) => {
    btn.addEventListener("mouseenter", () => applyTheme(btn.dataset.key));
    btn.addEventListener("focus", () => applyTheme(btn.dataset.key));
    btn.addEventListener("click", () => {
      sfx.suaraKlik();
      state.theme = btn.dataset.key;
      applyTheme(state.theme);
      layarKelas();
    });
  });

  ganti(node);
}

/* ---------- Layar 2: Pilih Kelas ---------- */
function layarKelas() {
  const t = themes[state.theme];
  const node = el(`
    <section class="screen">
      <div class="topbar">
        <button class="link-btn" id="kembali">⬅ Ganti teman</button>
        ${badgePoin()}
      </div>
      <div class="hero kecil">
        <span class="maskot">${t.emoji}</span>
        <h1>${t.sapaan}</h1>
      </div>
      <h2 class="tanya">${namaTampil()}, mau latihan ujian kelas berapa?</h2>
      <div class="kelas-grid">
        <button class="kelas-card" data-kelas="2">
          <span class="kelas-no">2</span>
          <span class="kelas-judul">Kelas 2 SD</span>
          <span class="kelas-materi">${kelas2.materi}</span>
          <span class="kelas-jml">Ujian: ${kelas2.jumlahSoalUjian} soal pilihan ganda</span>
        </button>
        <button class="kelas-card" data-kelas="3">
          <span class="kelas-no">3</span>
          <span class="kelas-judul">Kelas 3 SD</span>
          <span class="kelas-materi">${kelas3.materi}</span>
          <span class="kelas-jml">Ujian: ${kelas3.jumlahSoalUjian} soal pilihan ganda</span>
        </button>
      </div>
      <button class="toko-link" id="bukaToko">🎁 Lihat Toko Hadiah</button>
    </section>
  `);

  node.querySelector("#kembali").addEventListener("click", () => {
    sfx.suaraKlik();
    layarTema();
  });
  node.querySelector("#bukaToko").addEventListener("click", () => {
    sfx.suaraKlik();
    layarToko(layarKelas);
  });
  node.querySelectorAll(".kelas-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      sfx.suaraKlik();
      state.kelas = btn.dataset.kelas;
      layarMode();
    });
  });

  ganti(node);
}

/* ---------- Layar 2b: Pilih Aktivitas (Ujian / Belajar) ---------- */
function layarMode() {
  const t = themes[state.theme];
  const bank = bankSoal[state.kelas];
  const node = el(`
    <section class="screen">
      <div class="topbar">
        <button class="link-btn" id="kembali">⬅ Ganti kelas</button>
        ${badgePoin()}
      </div>
      <div class="hero kecil">
        <span class="maskot">${t.emoji}</span>
        <h1>Kelas ${state.kelas} SD</h1>
      </div>
      <h2 class="tanya">${namaTampil()}, mau ngapain dulu?</h2>
      <div class="kelas-grid">
        <button class="kelas-card" id="modeBelajar">
          <span class="mode-emoji">📖</span>
          <span class="kelas-judul">Mode Belajar</span>
          <span class="kelas-materi">Baca soal, jawaban benar, dan penjelasannya. Santai, tanpa skor & tanpa waktu.</span>
        </button>
        <button class="kelas-card" id="modeUjian">
          <span class="mode-emoji">📝</span>
          <span class="kelas-judul">Mulai Ujian</span>
          <span class="kelas-materi">Latihan ujian ${bank.jumlahSoalUjian} soal, ada waktu, skor, dan poin hadiah.</span>
        </button>
      </div>
      <button class="toko-link" id="bukaToko">🎁 Lihat Toko Hadiah</button>
    </section>
  `);

  node.querySelector("#kembali").addEventListener("click", () => { sfx.suaraKlik(); layarKelas(); });
  node.querySelector("#bukaToko").addEventListener("click", () => { sfx.suaraKlik(); layarToko(layarMode); });
  node.querySelector("#modeUjian").addEventListener("click", () => { sfx.suaraKlik(); mulaiUjian(); });
  node.querySelector("#modeBelajar").addEventListener("click", () => { sfx.suaraKlik(); mulaiBelajar(); });

  ganti(node);
}

function instruksiBentuk(bentuk) {
  if (bentuk === "Isian")
    return `<p class="instruksi">✏️ Soal isian — pilih kata yang tepat untuk mengisi titik-titik <b>(____)</b>.</p>`;
  if (bentuk === "Uraian")
    return `<p class="instruksi">📝 Soal uraian — pilih penjelasan/jawaban yang paling <b>tepat dan lengkap</b>.</p>`;
  return "";
}

function mulaiUjian() {
  state.quiz = new Quiz(bankSoal[state.kelas]);
  state.mulaiWaktu = Date.now();
  layarSoal();
}

/* ---------- Mode Belajar ---------- */
function mulaiBelajar() {
  const bank = bankSoal[state.kelas];
  // kelompokkan soal per nomor (urut), simpan semua varian
  const perNomor = new Map();
  for (const s of bank.soal) {
    if (!perNomor.has(s.nomor)) perNomor.set(s.nomor, []);
    perNomor.get(s.nomor).push(s);
  }
  const nomorUrut = [...perNomor.keys()].sort((a, b) => a - b);
  state.belajar = {
    perNomor,
    nomorUrut,
    idx: 0, // posisi nomor saat ini
    varian: Object.fromEntries(nomorUrut.map((n) => [n, 0])), // varian aktif tiap nomor
  };
  layarBelajar();
}

function layarBelajar() {
  const b = state.belajar;
  const nomor = b.nomorUrut[b.idx];
  const variants = b.perNomor.get(nomor);
  const s = variants[b.varian[nomor] % variants.length];
  const total = b.nomorUrut.length;

  const opsiHtml = s.opsi
    .map((teks, i) => {
      const benar = i === s.jawaban;
      return `<div class="opsi statis ${benar ? "benar" : ""}">
        <span class="opsi-label">${benar ? "✓" : String.fromCharCode(65 + i)}</span>
        <span class="opsi-teks">${teks}</span>
      </div>`;
    })
    .join("");

  const node = el(`
    <section class="screen belajar">
      <div class="topbar">
        <button class="link-btn" id="kembali">⬅ Selesai belajar</button>
        <span class="chip">📖 Belajar • Kelas ${state.kelas}</span>
        <span class="chip">Materi ${b.idx + 1}/${total}</span>
      </div>
      <div class="progress"><div class="progress-bar" style="width:${((b.idx + 1) / total) * 100}%"></div></div>

      <div class="kartu-soal">
        <div class="tag-baris">
          <span class="no-badge">No. ${nomor}</span>
          <span class="kategori">${s.kategori}</span>
          <span class="bentuk bentuk-${(s.bentuk || "PG").toLowerCase()}">${s.bentuk || "PG"}</span>
          ${variants.length > 1 ? `<span class="varian-info">varian ${(b.varian[nomor] % variants.length) + 1}/${variants.length}</span>` : ""}
        </div>
        ${s.arab ? `<div class="arab">${s.arab}</div>` : ""}
        <p class="pertanyaan">${s.soal}</p>
      </div>

      <div class="opsi-list">${opsiHtml}</div>

      <div class="feedback belajar-jawab">
        <strong class="f-benar">✓ Jawaban benar: ${String.fromCharCode(65 + s.jawaban)}</strong>
        <p class="penjelasan">💡 ${s.penjelasan}</p>
      </div>

      <div class="nav-belajar">
        <button class="btn-sekunder" id="prev" ${b.idx === 0 ? "disabled" : ""}>⬅ Sebelumnya</button>
        ${variants.length > 1 ? `<button class="btn-sekunder" id="varian">🔀 Soal lain</button>` : ""}
        <button class="btn-utama" id="next">${b.idx + 1 < total ? "Berikutnya ➡" : "Selesai 🎉"}</button>
      </div>
    </section>
  `);

  node.querySelector("#kembali").addEventListener("click", () => { sfx.suaraKlik(); layarMode(); });
  node.querySelector("#prev").addEventListener("click", () => {
    if (b.idx === 0) return;
    sfx.suaraKlik(); b.idx--; layarBelajar();
  });
  node.querySelector("#next").addEventListener("click", () => {
    sfx.suaraKlik();
    if (b.idx + 1 < total) { b.idx++; layarBelajar(); }
    else layarMode();
  });
  const vBtn = node.querySelector("#varian");
  if (vBtn) vBtn.addEventListener("click", () => {
    sfx.suaraKlik();
    b.varian[nomor] = (b.varian[nomor] + 1) % variants.length;
    layarBelajar();
  });

  ganti(node);
}

/* ---------- Layar 3: Soal ---------- */
function layarSoal() {
  const q = state.quiz;
  const s = q.current;
  const nomor = q.index + 1;
  const persen = Math.round((q.index / q.total) * 100);
  const pakaiTimer = DETIK_PER_SOAL > 0;

  const opsiHtml = s.opsiAcak
    .map(
      (o, i) => `
      <button class="opsi" data-i="${i}">
        <span class="opsi-label">${String.fromCharCode(65 + i)}</span>
        <span class="opsi-teks">${o.teks}</span>
      </button>`
    )
    .join("");

  const node = el(`
    <section class="screen quiz">
      <div class="topbar">
        <span class="chip">${themes[state.theme].emoji} Kelas ${state.kelas}</span>
        <span class="chip">Soal ${nomor}/${q.total}</span>
        <span class="poin-badge live">⭐ ${q.poin}</span>
      </div>
      <div class="progress"><div class="progress-bar" style="width:${persen}%"></div></div>

      ${
        pakaiTimer
          ? `<div class="timer">
               <span class="timer-teks">⏱ <b id="timerDetik">${DETIK_PER_SOAL}</b> detik</span>
               <div class="timer-bar"><div class="timer-fill" id="timerFill"></div></div>
             </div>`
          : ""
      }

      <div class="kartu-soal">
        <div class="tag-baris">
          <span class="kategori">${s.kategori}</span>
          <span class="bentuk bentuk-${(s.bentuk || "PG").toLowerCase()}">${s.bentuk || "PG"}</span>
        </div>
        ${instruksiBentuk(s.bentuk)}
        ${s.arab ? `<div class="arab">${s.arab}</div>` : ""}
        <p class="pertanyaan">${s.soal}</p>
      </div>

      <div class="opsi-list">${opsiHtml}</div>

      <div class="feedback" hidden></div>
    </section>
  `);

  const feedback = node.querySelector(".feedback");
  const semua = node.querySelectorAll(".opsi");
  let terkunci = false;

  function proses(pilihIdx, habisWaktu = false) {
    if (terkunci) return;
    terkunci = true;
    hentikanTimer();

    const hasil = q.jawab(pilihIdx);
    semua.forEach((b) => (b.disabled = true));
    semua[hasil.indexBenar].classList.add("benar");
    if (!habisWaktu && !hasil.benar && pilihIdx >= 0) semua[pilihIdx].classList.add("salah");

    node.querySelector(".poin-badge.live").textContent = `⭐ ${q.poin}`;

    let pesan;
    if (hasil.benar) {
      sfx.suaraBenar();
      pop(semua[pilihIdx]);
      const bonus = hasil.poinDidapat > 10 ? " (+bonus streak!)" : "";
      const semangat = ["Hebat! 🎉", "Pintar! 🌟", "Keren! 💖", "Mantap! ✨", "Yeay! 🥳"];
      pesan = `<strong class="f-benar">${semangat[Math.floor(Math.random() * semangat.length)]}</strong>
               <span>+${hasil.poinDidapat} poin${bonus}</span>`;
      if (hasil.streak >= 3) confetti({ jumlah: 40, durasi: 1000 });
    } else {
      sfx.suaraSalah();
      const judul = habisWaktu ? "Waktu habis ⏰" : "Belum tepat, tidak apa-apa 💪";
      pesan = `<strong class="f-salah">${judul}</strong>
               <span>Jawaban benar: <b>${String.fromCharCode(65 + hasil.indexBenar)}</b></span>`;
    }

    feedback.innerHTML = `
      ${pesan}
      <p class="penjelasan">💡 ${s.penjelasan}</p>
      <button class="btn-lanjut">${q.index + 1 < q.total ? "Soal Berikutnya ➡" : "Lihat Hasil 🏁"}</button>
    `;
    feedback.hidden = false;
    feedback.scrollIntoView({ behavior: "smooth", block: "center" });
    feedback.querySelector(".btn-lanjut").addEventListener("click", () => {
      sfx.suaraKlik();
      q.lanjut();
      if (q.selesai) layarHasil();
      else layarSoal();
    });
  }

  semua.forEach((btn) => {
    btn.addEventListener("click", () => proses(Number(btn.dataset.i)));
  });

  ganti(node);

  // timer per soal
  if (pakaiTimer) {
    let sisa = DETIK_PER_SOAL;
    const elDetik = node.querySelector("#timerDetik");
    const elFill = node.querySelector("#timerFill");
    elFill.style.width = "100%";
    timerId = setInterval(() => {
      sisa--;
      elDetik.textContent = Math.max(0, sisa);
      elFill.style.width = (Math.max(0, sisa) / DETIK_PER_SOAL) * 100 + "%";
      if (sisa <= 5) elFill.classList.add("bahaya");
      if (sisa <= 0) {
        hentikanTimer();
        proses(-1, true);
      }
    }, 1000);
  }
}

/* ---------- Layar 4: Hasil ---------- */
function layarHasil() {
  hentikanTimer();
  const q = state.quiz;
  const nilai = q.nilai;
  state.totalDetik = Math.round((Date.now() - state.mulaiWaktu) / 1000);
  const menit = Math.floor(state.totalDetik / 60);
  const detik = state.totalDetik % 60;
  const waktuTeks = `${menit}m ${detik}d`;

  store.tambahPoin(state.profil, q.poin);
  store.catatRiwayat(state.profil, {
    kelas: state.kelas,
    benar: q.benar,
    total: q.total,
    nilai,
    poin: q.poin,
  });
  const totalPoin = store.getPoin(state.profil);

  let predikat, emoji, warnaKelas;
  if (nilai >= 90) [predikat, emoji, warnaKelas] = ["Luar Biasa!", "🏆", "emas"];
  else if (nilai >= 75) [predikat, emoji, warnaKelas] = ["Bagus Sekali!", "🌟", "perak"];
  else if (nilai >= 60) [predikat, emoji, warnaKelas] = ["Bagus, Terus Berlatih!", "👍", "perunggu"];
  else [predikat, emoji, warnaKelas] = ["Semangat, Ayo Coba Lagi!", "💪", "biasa"];

  if (nilai >= 75) {
    sfx.suaraMenang();
    confetti({ jumlah: 120, durasi: 2200 });
  }

  // Kumpulkan daftar jawaban yang salah (untuk pembahasan).
  const salah = [];
  q.soal.forEach((s, i) => {
    const ans = q.jawabanUser[i];
    if (ans && !ans.benar) {
      salah.push({
        nomor: s.nomor,
        soal: s.soal,
        benarTeks: s.opsiAcak[s.indexBenar].teks,
        pilihTeks: ans.dipilih >= 0 ? s.opsiAcak[ans.dipilih].teks : null,
        penjelasan: s.penjelasan,
      });
    }
  });
  salah.sort((a, b) => a.nomor - b.nomor);

  const pembahasanHtml = salah.length
    ? salah
        .map(
          (x) => `
        <div class="bahas-item">
          <div class="bahas-no">No. ${x.nomor}</div>
          <p class="bahas-soal">${x.soal}</p>
          <p class="bahas-jwb salah-jwb">❌ Jawabanmu: ${
            x.pilihTeks ? x.pilihTeks : "<i>(tidak dijawab / waktu habis)</i>"
          }</p>
          <p class="bahas-jwb benar-jwb">✅ Jawaban benar: ${x.benarTeks}</p>
          <p class="bahas-penjelasan">💡 ${x.penjelasan}</p>
        </div>`
        )
        .join("")
    : `<p class="bahas-sempurna">🎉 Hebat! Semua jawaban benar, tidak ada yang perlu diperbaiki!</p>`;

  const node = el(`
    <section class="screen hasil">
      <div class="medali ${warnaKelas}">${emoji}</div>
      <h1>${predikat}</h1>
      <p class="sub">Kerja bagus, ${namaTampil()}! 💖</p>
      <div class="skor-besar">${nilai}</div>
      <p class="sub">Kamu menjawab benar <b>${q.benar}</b> dari <b>${q.total}</b> soal</p>

      <div class="stat-grid">
        <div class="stat"><span class="stat-no">${q.benar}</span><span>Benar</span></div>
        <div class="stat"><span class="stat-no">${q.total - q.benar}</span><span>Salah</span></div>
        <div class="stat"><span class="stat-no">🔥 ${q.streakMaks}</span><span>Streak</span></div>
        <div class="stat"><span class="stat-no">⏱ ${waktuTeks}</span><span>Waktu</span></div>
      </div>

      <div class="poin-dapat">
        <span>Poin didapat sesi ini</span>
        <strong>+${q.poin} ⭐</strong>
      </div>
      <div class="poin-total">Total poin ${namaTampil()}: <b>${totalPoin} ⭐</b></div>

      <div class="aksi-hasil">
        <button class="btn-wa" id="shareWa">💬 Bagikan Hasil ke WhatsApp</button>
        <button class="btn-sekunder" id="toggleBahas">📋 Lihat Jawaban yang Salah (${salah.length})</button>
        <div class="pembahasan" id="pembahasan" hidden>
          <h3 class="bahas-judul">Pembahasan Jawaban Salah</h3>
          ${pembahasanHtml}
        </div>
        <button class="btn-utama" id="keToko">🎁 Tukar Poin di Toko Hadiah</button>
        <button class="btn-sekunder" id="ulang">🔁 Ujian Lagi (Kelas ${state.kelas})</button>
        <button class="link-btn" id="ganti">Ganti kelas / teman</button>
      </div>
    </section>
  `);

  node.querySelector("#shareWa").addEventListener("click", () => {
    sfx.suaraKlik();
    bagikanWhatsApp({ nilai, predikat, emoji, totalPoin, salah });
  });
  node.querySelector("#toggleBahas").addEventListener("click", (e) => {
    sfx.suaraKlik();
    const panel = node.querySelector("#pembahasan");
    panel.hidden = !panel.hidden;
    e.currentTarget.textContent = panel.hidden
      ? `📋 Lihat Jawaban yang Salah (${salah.length})`
      : `📋 Sembunyikan Pembahasan`;
    if (!panel.hidden) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  node.querySelector("#keToko").addEventListener("click", () => {
    sfx.suaraKlik();
    layarToko(layarHasil);
  });
  node.querySelector("#ulang").addEventListener("click", () => {
    sfx.suaraKlik();
    mulaiUjian();
  });
  node.querySelector("#ganti").addEventListener("click", () => {
    sfx.suaraKlik();
    layarKelas();
  });

  ganti(node);
}

// Bagikan ringkasan hasil ke WhatsApp (wa.me membuka pilihan kontak/grup).
function bagikanWhatsApp({ nilai, predikat, emoji, totalPoin, salah }) {
  const q = state.quiz;
  const nomorSalah = salah.map((x) => x.nomor).join(", ");
  const baris = [
    "🌸 *Hasil Simulasi Ujian PAI & BP* 🌸",
    "",
    `👤 Nama: ${namaTampil()}`,
    `🏫 Kelas: ${state.kelas} SD`,
    `📊 Nilai: *${nilai}* ${emoji} (${predikat})`,
    `✅ Benar: ${q.benar} dari ${q.total} soal`,
    `⭐ Poin didapat: +${q.poin} (total ${totalPoin})`,
    salah.length ? `📝 Perlu diulang: nomor ${nomorSalah}` : "🎉 Semua jawaban benar!",
    "",
    "Berlatih di aplikasi Simulasi Ujian PAI & BP 💕",
  ];
  const url = "https://wa.me/?text=" + encodeURIComponent(baris.join("\n"));
  window.open(url, "_blank");
}

/* ---------- Layar 5: Toko Hadiah ---------- */
function layarToko(kembaliKe) {
  const poin = store.getPoin(state.profil);

  const daftar = rewards
    .map((r) => {
      const bisa = poin >= r.biaya;
      return `
      <div class="reward ${bisa ? "" : "kurang"}">
        <span class="reward-emoji">${r.emoji}</span>
        <span class="reward-nama">${r.nama}</span>
        <span class="reward-biaya">${r.biaya} ⭐</span>
        <button class="btn-tukar" data-id="${r.id}" ${bisa ? "" : "disabled"}>
          ${bisa ? "Tukar" : "Kurang"}
        </button>
      </div>`;
    })
    .join("");

  const node = el(`
    <section class="screen toko">
      <div class="topbar">
        <button class="link-btn" id="kembali">⬅ Kembali</button>
        <span class="poin-badge">⭐ ${poin} poin</span>
      </div>
      <h1>🎁 Toko Hadiah ${namaTampil()}</h1>
      <p class="sub">Kumpulkan poin dengan menjawab benar, lalu tukar dengan hadiah!<br>
      <small>(Tunjukkan ke Ayah/Bunda untuk menukar hadiahnya 😊)</small></p>
      <div class="reward-list">${daftar}</div>
    </section>
  `);

  node.querySelector("#kembali").addEventListener("click", () => {
    sfx.suaraKlik();
    kembaliKe();
  });

  node.querySelectorAll(".btn-tukar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const r = rewards.find((x) => x.id === btn.dataset.id);
      if (store.getPoin(state.profil) < r.biaya) return;
      const ok = confirm(
        `Tukar ${r.biaya} poin dengan "${r.nama}"?\n\nTunjukkan layar ini ke Ayah/Bunda ya 😊`
      );
      if (!ok) return;
      store.kurangiPoin(state.profil, r.biaya);
      store.catatRiwayat(state.profil, { tukar: r.nama, biaya: r.biaya });
      sfx.suaraMenang();
      confetti({ jumlah: 90, durasi: 1800 });
      alert(`🎉 Yeay! Hadiah "${r.nama}" untuk ${namaTampil()}!\nSelamat menikmati 💖`);
      layarToko(kembaliKe);
    });
  });

  ganti(node);
}

/* ---------- Toggle suara (tombol melayang) ---------- */
function pasangToggleSuara() {
  const btn = document.getElementById("toggle-suara");
  const sync = () => (btn.textContent = sfx.isEnabled() ? "🔊" : "🔇");
  sync();
  btn.addEventListener("click", () => {
    sfx.setEnabled(!sfx.isEnabled());
    sync();
    if (sfx.isEnabled()) sfx.suaraKlik();
  });
}

/* ---------- Mulai ---------- */
pasangToggleSuara();
layarNama();
