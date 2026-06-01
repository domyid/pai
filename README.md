# pai
PAI dan Budi Pekerti

## 🌸 Aplikasi Simulasi Ujian PAI & BP (Kelas 2 & 3 SD)

Web latihan ujian pilihan ganda yang seru untuk anak: tulis nama, pilih tema karakter
favorit (Kuromi, Keroppi, Cinnamoroll, Pochacco), pilih kelas (2 atau 3), kerjakan soal
dengan timer, dapat skor + poin, lalu tukar poin dengan hadiah (snack / screen time / dll).

**Fitur:** input nama • 4 tema karakter • timer per soal • bank soal besar (acak tiap main) •
skor & predikat • poin + bonus streak • toko hadiah • efek suara & konfeti.

### ▶️ Cara Menjalankan (paling mudah)

1. **Klik dua kali file `mulai.bat`**.
2. Browser akan terbuka otomatis di `http://localhost:8123`.
3. Jendela hitam (server) **jangan ditutup** selama mengerjakan ujian.
4. Kalau sudah selesai, tutup jendela hitam itu.

> Aplikasi memakai **ES6 module** sehingga harus dibuka lewat server kecil
> (tidak bisa langsung membuka `index.html`). `mulai.bat` menjalankan server
> bawaan Python secara otomatis.

Alternatif lewat terminal di folder ini:

```powershell
py -m http.server 8123
# lalu buka http://localhost:8123 di browser
```

### ⚙️ Pengaturan (untuk Ayah/Bunda)

Buka `js/config.js` untuk mengubah:
- `DETIK_PER_SOAL` — lama timer tiap soal (default **30** detik; isi **0** untuk mematikan timer).

Jumlah soal tiap ujian mengikuti kisi-kisi resmi secara otomatis (lihat di bawah).

Hadiah & poin:
- Daftar hadiah dan harga poin ada di `js/rewards.js` — silakan diubah sesuai kesepakatan.
- Poin per jawaban benar = 10 (ada bonus +5 kalau benar 3x berturut-turut).
- Poin tersimpan otomatis di browser **per nama anak** (lewat `localStorage`), jadi poin kakak
  dan adik terpisah selama memakai nama yang berbeda.

### 📚 Materi Soal

Ujian disusun **persis mengikuti komposisi kisi-kisi** (kolom *No. Soal*):

| | Jumlah soal ujian | Rincian bentuk asli |
|---|---|---|
| **Kelas 2** | **25 soal** | No. 1–15 PG, 16–20 Isian, 21–25 Uraian |
| **Kelas 3** | **30 soal** | No. 1–20 PG, 21–25 Isian, 26–30 Uraian |

Sesuai permintaan, **semua bentuk soal dibuat menjadi pilihan ganda**, namun tampilannya dibedakan:
- **PG** → pilihan ganda biasa (opsi singkat).
- **Isian** → "melengkapi titik-titik" `(____)` dengan opsi kata/angka singkat.
- **Uraian** → "pilih penjelasan/jawaban yang paling tepat & lengkap" (opsi berupa kalimat).

Setiap soal diberi label bentuknya. Tiap nomor resmi punya **3–4 varian** soal, dan tiap ujian
mengambil **satu varian untuk tiap nomor (urut 1→25 / 1→30)** — jadi panjang & cakupan ujian
selalu sama persis dengan kisi-kisi, tetapi saat diulang soalnya berganti-ganti.
Total bank: **±79 soal kelas 2** dan **±91 soal kelas 3**.

- **Kelas 2**: Q.S. Al-Falaq, Q.S. Al-Kautsar, Tajwid (Mad), Iman kepada Malaikat.
- **Kelas 3**: Hadis Shalat Berjamaah & Penulisan Arab, Iman kepada Kitab-Kitab Allah, Kalimat Tayyibah.

Isi soal diverifikasi dari sumber rujukan (NU Online, Quran NU, Rumaysho, Tirto, Detik).
File soal ada di `js/data/`.

---


### KISI-KISI PAI & BP KELAS 2 SEMESTER 2

| No | Elemen / Materi Pokok                  | Indikator Pencapaian Kompetensi / Indikator Soal | Bentuk Soal | No. Soal |
|----|----------------------------------------|--------------------------------------------------|-------------|----------|
| 1  | Al-Qur'an dan Hadis<br>(Q.S. Al-Falaq, Q.S. Al-Kautsar, & Tajwid) | Disajikan potongan ayat Q.S. Al-Falaq, siswa dapat mengidentifikasi kalimah terakhirnya dengan benar | Pilihan Ganda (PG) | 1 |
|    |                                        | Disajikan kata bergaris bawah, siswa dapat mengidentifikasi hukum bacaan tajwid (Mad) dengan tepat | PG | 2 |
|    |                                        | Disajikan lafal ayat, siswa dapat menentukan nomor urut ayat tersebut dalam Q.S. Al-Falaq | PG | 3 |
|    |                                        | Siswa dapat menyebutkan pesan pokok atau perintah utama dalam Q.S. Al-Kautsar | PG | 4 |
|    |                                        | Siswa dapat mengidentifikasi arti dari nama surat Al-Falaq | PG | 7 |
|    |                                        | Siswa dapat memilih huruf yang termasuk ke dalam huruf mad | PG | 8 |
|    |                                        | Siswa dapat menentukan nomor urut surat Al-Kautsar di dalam Al-Qur'an | PG | 9 |
|    |                                        | Siswa dapat mengidentifikasi dua bentuk ibadah utama yang diperintahkan dalam Q.S. Al-Kautsar | PG | 14 |
|    |                                        | Disajikan lafal ayat, siswa dapat melengkapi nomor urut ayat tersebut pada Q.S. Al-Falaq | Isian | 16 |
|    |                                        | Siswa dapat melengkapi pernyataan tentang tujuan memohon perlindungan berdasarkan isi Q.S. Al-Falaq | Isian | 17 |
|    |                                        | Siswa dapat menentukan golongan tempat turunnya surat (Makkiyah) berdasarkan ciri ringkas Q.S. Al-Falaq | Isian | 18 |
|    |                                        | Siswa dapat menjelaskan arti kata dari nama surat Al-Kautsar | Uraian | 21 |
|    |                                        | Siswa dapat menjelaskan isi perintah pokok yang terkandung di dalam Q.S. Al-Falaq | Uraian | 24 |
|    |                                        | Siswa dapat menuliskan kembali lafal ayat ke-3 dari Q.S. Al-Kautsar secara lengkap | Uraian | 25 |
| 2  | Akidah<br>(Rukun Iman: Iman kepada Malaikat) | Siswa dapat menentukan asal penciptaan makhluk malaikat | PG | 5 |
|    |                                        | Disajikan narasi perilaku taat, siswa dapat mengidentifikasi contoh perilaku meneladani sifat malaikat | PG | 6 |
|    |                                        | Siswa dapat menentukan urutan iman kepada malaikat dalam rukun iman | PG | 10 |
|    |                                        | Siswa dapat mengidentifikasi nama malaikat yang bertugas menyampaikan wahyu | PG | 11 |
|    |                                        | Siswa dapat mengidentifikasi tugas utama dari Malaikat Raqib | PG | 12 |
|    |                                        | Siswa dapat menentukan jenis perilaku buruk yang harus dihindari sebagai bukti iman kepada malaikat | PG | 13 |
|    |                                        | Siswa dapat mengidentifikasi perilaku positif sehari-hari yang mencerminkan keimanan kepada malaikat | PG | 15 |
|    |                                        | Siswa dapat melengkapi pernyataan mengenai waktu pelaksanaan tugas Malaikat Israfil | Isian | 19 |
|    |                                        | Siswa dapat menyebutkan nama makhluk gaib Allah yang memiliki sifat mutlak selalu taat | Isian | 20 |
|    |                                        | Siswa dapat menyebutkan nama malaikat yang memiliki julukan istimewa Ruhulkudus | Uraian | 22 |
|    |                                        | Siswa dapat menuliskan dua nama malaikat beserta masing-masing tugasnya secara tepat | Uraian | 23 |


### KISI-KISI PAI & BP KELAS 3 SEMESTER 2

| No | Elemen / Materi Pokok                          | Indikator Pencapaian Kompetensi / Indikator Soal | Bentuk Soal          | No. Soal |
|----|------------------------------------------------|--------------------------------------------------|----------------------|----------|
| 1  | Al-Qur'an dan Hadis<br>(Hadis Shalat Berjamaah & Penulisan Arab) | Disajikan potongan hadis tentang shalat berjamaah, siswa dapat menentukan arti dari kosakata yang bergaris bawah dengan benar | Pilihan Ganda (PG)   | 1 |
|    |                                                | Disajikan lafal potongan hadis, siswa dapat menentukan cara membaca lafal tersebut dengan tepat | PG                   | 2 |
|    |                                                | Siswa dapat mendefinisikan pengertian dari perkataan, perbuatan, dan ketetapan Nabi Muhammad saw. (hadis) | PG                   | 3 |
|    |                                                | Disajikan gambar visual, siswa dapat menentukan posisi berdiri imam dan makmum yang benar dalam shalat berjamaah | PG                   | 4 |
|    |                                                | Siswa dapat melengkapi kutipan terjemahan hadis mengenai keutamaan derajat shalat berjamaah | PG                   | 5 |
|    |                                                | Disajikan beberapa contoh penulisan Arab kalimah hadis, siswa dapat mengidentifikasi penulisan huruf Arab yang paling tepat dan benar | PG                   | 13 |
|    |                                                | Siswa dapat membandingkan jenis pelaksanaan shalat yang lebih utama (berjamaah dibanding sendiri) | PG                   | 14 |
|    |                                                | Siswa dapat menentukan perbandingan nominal derajat pahala shalat sendiri dengan shalat berjamaah | PG                   | 15 |
|    |                                                | Disajikan beberapa pernyataan, siswa dapat memilih nomor yang termasuk pesan pokok hadis tentang shalat berjamaah | PG                   | 16 |
|    |                                                | Disajikan ilustrasi dua orang anak laki-laki shalat bersama, siswa dapat menentukan posisi makmum yang benar | PG                   | 17 |
|    |                                                | Siswa dapat melengkapi teks terjemahan hadis tentang jumlah keutamaan derajat shalat berjamaah | Isian                | 21 |
|    |                                                | Disajikan beberapa pernyataan, siswa dapat menuliskan nomor-nomor yang termasuk ke dalam pesan pokok hadis shalat berjamaah | Isian                | 22 |
|    |                                                | Siswa dapat menjelaskan arti hukum fikih sunnah muakkadah pada pelaksanaan shalat berjamaah | Isian                | 23 |
|    |                                                | Siswa dapat menguraikan penjelasan atau definisi tentang hakikat shalat berjamaah secara jelas | Uraian               | 29 |
| 2  | Akidah<br>(Rukun Iman: Iman kepada Kitab-Kitab Allah) | Siswa dapat mengidentifikasi arti atau makna esensial dari beriman kepada kitab-kitab Allah | PG                   | 6 |
|    |                                                | Disajikan ilustrasi perilaku, siswa dapat menghubungkan sikap percaya terhadap kitab dengan implementasi rukun iman | PG                   | 7 |
|    |                                                | Siswa dapat mengidentifikasi nama kitab suci yang diturunkan kepada Nabi Musa as. berdasarkan deskripsi kandungannya | PG                   | 8 |
|    |                                                | Siswa dapat mengidentifikasi perilaku yang bukan termasuk cara beriman kepada kitab-kitab Allah Swt | PG                   | 9 |
|    |                                                | Siswa dapat mengidentifikasi nama kitab suci yang diturunkan kepada Nabi Isa as. berdasarkan deskripsi kandungannya | PG                   | 18 |
|    |                                                | Disajikan terjemahan Q.S. Ali Imran ayat 3, siswa dapat menentukan bahwa ayat tersebut merupakan dalil naqli iman kepada kitab Allah | PG                   | 19 |
|    |                                                | Siswa dapat menentukan nama Nabi yang menerima penurunan Kitab Zabur | Isian                | 24 |
|    |                                                | Siswa dapat melengkapi ciri utama perilaku orang yang beriman kepada kitab-kitab Allah (menjalankan perintah-Nya) | Isian                | 25 |
|    |                                                | Siswa dapat menjabarkan 4 nama kitab suci yang wajib diimani beserta nama nabi penerimanya secara berurutan | Uraian               | 30 |
| 3  | Akhlak<br>(Kalimat Tayyibah)                   | Siswa dapat menentukan istilah atau sebutan untuk kata-kata yang baik untuk diucapkan (kalimat tayyibah) | PG                   | 10 |
|    |                                                | Disajikan ilustrasi kekaguman pada keindahan alam pantai, siswa dapat memilih lafal kalimat tayyibah yang tepat diucapkan | PG                   | 11 |
|    |                                                | Siswa dapat menentukan arti atau makna bahasa dari kalimat tayyibah "Allahu Akbar" | PG                   | 12 |
|    |                                                | Disajikan teks visual kalimat tayyibah (Insya Allah), siswa dapat menentukan fungsi penggunaannya untuk rencana masa depan | PG                   | 20 |
|    |                                                | Disajikan tulisan Arab kalimat tayyibah, siswa dapat menuliskan cara membaca/bunyi lafal teks tersebut | Uraian               | 26 |
|    |                                                | Siswa dapat menuliskan lafal kalimat tayyibah "Allahu Akbar" ke dalam bentuk tulisan Arab secara benar | Uraian               | 27 |
|    |                                                | Disajikan ilustrasi pujian prestasi teman, siswa dapat menentukan jenis kalimat tayyibah yang tepat untuk diucapkan sebagai rasa kagum | Uraian               | 28 |