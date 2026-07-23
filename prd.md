# 📄 Product Requirements Document (PRD) — Arion Trader

**Nama Produk:** Arion Trader

**Platform:** Mobile (Android) & Web

**Model Bisnis:** Freemium (Aplikasi Berlangganan: Bulanan & Tahunan)

**Value Proposition:** Membentuk disiplin *trader* melalui gamifikasi edukasi harian, kalkulator risiko presisi, jurnal cerdas berbasis AI, serta modul *backtest* interaktif.

---

## 1. Matrix Fitur: Gratis vs Premium

Tujuan dari versi **Gratis** adalah *user acquisition* dan membangun kebiasaan (*habit loop* lewat *winstreak*). Versi **Premium** dikunci untuk fitur-fitur bertipe *power-tools* yang dibutuhkan *trader* aktif untuk analisis mendalam.

| Fitur | Versi Gratis (Free) | Versi Premium (Pro) | Trigger Upgrade (Mengapa User Bayar?) |
| --- | --- | --- | --- |
| **E-Course & Gamifikasi** | Akses Modul Dasar (Level 1–5), *Streak* harian standard | Akses **Semua Level**, *Streak Repair/Freeze* (agar tidak hangus jika lupa 1 hari) | *User* tidak ingin kehilangan *winstreak* panjangnya & ingin modul *advanced*. |
| **Kalkulator Risiko** | Kalkulator *Lot Size* standar (1 *pair* dalam satu waktu) | Advanced Risk Manager (Multi-pair, Risk-to-Reward ratio matrix, Compound Calculator) | *Trader* profesional butuh menghitung beberapa posisi sekaligus. |
| **Jurnal Trading** | Maksimal 15 entri jurnal/bulan, input manual | **Unlimited entri**, import via CSV, grafik performa win-rate, tag strategi | *User* kehabisan jatah jurnal dan butuh historis trading lengkap. |
| **AI Trading Assistant** | 3 kuota pertanyaan/hari (Asisten dasar) | **Unlimited query**, AI Review Jurnal (AI menganalisis kesalahan psikologi dari jurnalmu) | Fitur personal coaching yang hemat biaya dibanding bayar mentor. |
| **Backtesting Engine** | Akses Mode Demo (*Historical Data* terbatas 30 hari terakhir) | **Full Real-time & Custom Backtest** (TradingView Lightweight Charts + Data Realtime) | *Tool* utama untuk menguji strategi sebelum terjun dengan uang asli. |

---

## 2. Spesifikasi Detail Fitur Utama

### A. Gamifikasi E-Course (Modul Duolingo-style)

* **Winstreak System:** Ikon Api 🔥 yang menyala jika *user* menyelesaikan minimal 1 kuis/materi per hari.
* **Level & XP:** Menyelesaikan materi memberikan XP untuk naik level (misal: *Novice Trader* ➔ *Chartist* ➔ *Risk Master*).
* **Daily Quizzes:** Kuis pilihan ganda & tebak pola *candlestick* interaktif.

### B. Backtesting Engine (Fitur Premium Utama)

* **UI Chart:** Menggunakan *TradingView Lightweight Charts* (Cepat, responsif di HP/Web).
* **Data Feed:** Integrasi API gratis (Binance API untuk Crypto / Yahoo Finance untuk Forex/Saham).
* **Metrik Backtest:** Menampilkan otomatis *Win Rate*, *Profit Factor*, *Max Drawdown*, dan *Total Trades* setelah sesi *backtest* selesai.

### C. Jurnal Trading & AI Review

* **Input Form:** Pair, Direction (Long/Short), Entry, Stop Loss, Take Profit, Screenshots Chart, & Catatan Emosi.
* **AI Integration (Gemini API):** Tombol *"Evaluasi Jurnal Saya"*. AI membaca 10 *trade* terakhir dan memberi feedback: *"Kamu sering FOMO di hari Jumat"* atau *"RR-mu di bawah 1:1, perbaiki eksekusi."*

---

## 3. Alur Pengembangan & Ekosistem Tools Gratis

Berikut adalah tahapan pengerjaan sistematis beserta integrasi teknisnya:

1. **1. Setup Database & Autentikasi:** Supabase.
Buat skema PostgreSQL di Supabase untuk tabel `users`, `journals`, `ecourse_progress`, dan `subscriptions`. Aktifkan Row Level Security (RLS) agar data antar *user* aman.


2. **2. Frontend Architecture:** React Native + Expo.
Inisialisasi proyek Expo dengan NativeWind (Tailwind CSS). Buat navigasi dasar untuk Web dan Mobile secara simultan.


3. **3. Integrasi Core Tools (Gratis):** Logic Front-end.
Bangun Kalkulator Risiko dan Modul E-Course terlebih dahulu di *front-end* untuk memastikan UX berjalan mulus.


4. **4. Integrasi AI & Backtesting (Premium):** Gemini API & Lightweight Charts.
Hubungkan Gemini API untuk analisis jurnal. Integrasikan *TradingView Lightweight Charts* dengan API data pasar untuk modul *backtest*.


5. **5. Paywall & Payment Gateways:** Sistem Berlangganan.
Implementasikan pembatasan akses (*paywall logic*) untuk pengguna gratis vs premium. Integrasikan *payment gateway* lokal (seperti Midtrans/Xendit untuk Web atau In-App Purchase untuk Android).


---

## 4. Rencana Harga (Monetization Strategy)

* **Paket Bulanan:** Rp 49.000 / bulan *(Harga psikologis terjangkau untuk trader pemula)*.
* **Paket Tahunan:** Rp 399.000 / tahun *(Hemat ~30%, memberikan cash flow upfront untuk pengembang)*.


---

## 5. Target User Persona & Ukuran Pasar

### Ukuran Pasar

Basis kripto Indonesia adalah titik masuk paling kuat secara data: jumlah akun investor aset kripto nasional sudah mencapai **22,4 juta akun per Mei 2026** (Sumber: OJK), tumbuh lebih dari 50% dibanding periode yang sama tahun sebelumnya yang baru 14,16 juta. Catatan: ini angka akun, bukan pasti individu unik (satu orang bisa punya akun di beberapa exchange), tapi tetap jadi sinyal kuat pertumbuhan minat & basis pengguna potensial untuk modul e-course dan backtest crypto.

Untuk forex, data jumlah trader aktif jauh kurang solid dibanding kripto — kebanyakan angka yang beredar berasal dari blog broker, bukan rilis resmi regulator. Untuk sizing forex, lebih aman pakai proxy tidak langsung (jumlah broker berizin, volume Bursa Berjangka Jakarta/ICDX) atau riset primer sendiri, daripada angka pihak ketiga yang belum terverifikasi.

### Persona 1 — "Trader Pemula Ambisius" (akuisisi utama, free tier)

*Asumsi awal, sebaiknya divalidasi lewat 10–15 wawancara user sebelum development penuh:*

- Usia kira-kira 20–32 tahun — konsisten dengan riset yang menunjukkan mayoritas trader Indonesia didominasi generasi milenial dan trader pemula, mayoritas laki-laki dengan tren partisipasi perempuan yang meningkat
- Kenal trading dari media sosial/YouTube/grup sinyal Telegram, belum pernah profit konsisten
- Motivasi: cari struktur & disiplin, waspada terhadap mentor/signal group yang tidak kredibel
- Sensitif harga → masuk lewat gamifikasi gratis, upgrade begitu kehabisan kuota (jurnal 15 entri, AI 3 query/hari)

### Persona 2 — "Trader Aktif Butuh Tools" (target konversi utama, premium)

- Sudah trading 1–3 tahun (forex dan/atau kripto), paham analisis teknikal dasar
- Sudah pernah jurnal manual di Excel/Google Sheets, capek dan tidak konsisten dipakai
- Motivasi: data historis lengkap + review AI yang jauh lebih murah dibanding mentor pribadi
- Persona ini yang paling cepat "ngerti value" backtesting & AI review — prioritaskan di funnel onboarding & upgrade

---

## 6. Analisis Kompetitor

Kompetitor Arion Trader tidak datang dari satu kategori tunggal — produk ini menggabungkan 4 kategori tools yang biasanya berdiri sendiri-sendiri:

| Kategori | Contoh Pemain | Kekuatan Mereka | Celah yang Bisa Diisi Arion Trader |
| --- | --- | --- | --- |
| Trading journal internasional | TradeZella, TraderSync, Edgewonk, TradesViz, Tradervue | Analitik dalam, integrasi broker luas, sebagian sudah punya AI review (TraderSync Cypher AI, TradesViz AI Q&A) | Harga mereka dalam USD (kisaran $15–80/bulan) — jauh di atas Rp49rb Arion Trader; UI & konten mereka tidak lokal (bahasa Inggris, tanpa konteks broker/pair lokal) |
| Charting & backtest engine | TradingView (platform native, bukan cuma library Lightweight Charts) | Strategy Tester berbasis Pine Script yang matang, komunitas & data besar | Arion Trader lebih approachable buat pemula (tidak perlu belajar Pine Script) — tapi ini juga berarti effort membangun backtest engine sendiri tidak boleh diremehkan |
| Broker & exchange lokal (app bawaan) | Aplikasi broker forex berizin, exchange kripto seperti INDODAX/Tokocrypto | Eksekusi transaksi riil, data real-time resmi | Fokus mereka jualan transaksi, bukan edukasi/disiplin — jarang ada gamifikasi atau AI coaching psikologi |
| Edukasi trading (kelas/mentor) | Kelas berbayar, grup sinyal Telegram/Instagram | Personal, komunitas kuat | Kualitas & kredibilitas sangat bervariasi (termasuk beberapa kasus dugaan penipuan berkedok mentor yang sempat jadi sorotan publik) — Arion Trader bisa positioning sebagai alternatif yang lebih terstruktur & terukur |

**Positioning yang jelas:** satu-satunya yang menggabungkan gamifikasi habit-building + jurnal + AI review + backtest dalam satu app, harga lokal (Rupiah), berbahasa Indonesia. Kompetitor internasional kuat di analitik tapi mahal & tidak lokal; kompetitor lokal kuat di harga & bahasa tapi tidak ada tools terintegrasi.

---

## 7. Success Metrics / KPI

Kerangka standar SaaS freemium yang disesuaikan ke fitur spesifik Arion Trader. Target angka aktual sebaiknya diisi setelah ada baseline data dari closed beta, bukan ditentukan dari angka kosong.

**Akuisisi**
- Cost per install (CPI), install-to-signup rate

**Aktivasi**
- % user yang selesai kuis pertama dalam 24 jam pertama
- % user yang mencapai Level 2 dalam minggu pertama

**Engagement**
- DAU/MAU ratio
- Distribusi panjang winstreak (% user yang tembus 7 hari, 30 hari)
- Rata-rata jumlah entri jurnal per user per bulan (free vs premium)

**Monetisasi**
- Free-to-premium conversion rate
- ARPU & rasio LTV:CAC
- Fitur mana yang paling sering jadi trigger upgrade (limit AI 3x/hari vs limit 15 entri jurnal) — actionable untuk prioritas roadmap berikutnya

**Retensi**
- D1/D7/D30 retention, khususnya churn rate subscriber bulanan vs tahunan

**Kualitas produk** (proxy "apakah user benar-benar jadi trader lebih disiplin")
- Rata-rata risk-reward ratio user dari waktu ke waktu
- % user yang submit sesi backtest sebelum eksekusi live (self-report di jurnal)

---

## 8. Non-Functional Requirements (NFR)

**Performa**
- Chart candlestick render < 2 detik, scroll/zoom tanpa patah-patah, di HP Android kelas menengah-bawah (RAM 3–4GB) — basis user gamifikasi biasanya jauh lebih luas & lebih price-sensitive dibanding user premium tools

**Keamanan & Kepatuhan Data**
- Enkripsi in-transit (TLS) dan at-rest untuk data jurnal & screenshot chart (berpotensi berisi info finansial personal)
- API key pihak ketiga (Gemini, Binance, payment gateway) disimpan server-side, tidak pernah di-expose ke client
- UU PDP (UU No. 27/2022) sudah berlaku penuh dengan sanksinya, tapi lembaga pengawas independen yang diamanatkan undang-undang itu — Badan PDP — masih dalam proses pembentukan; sementara ini pengawasan dijalankan Direktorat Jenderal Pengawasan Ruang Digital di Kementerian Komunikasi dan Digital (Sumber: Recording Law, Mei 2026). Implikasi praktis: kewajiban seperti notifikasi kebocoran data, batas retensi data, dan mekanisme consent tetap wajib dipenuhi walau badan pengawas dedikasinya belum berdiri — "belum ada lembaganya" bukan berarti "belum wajib patuh"

**Ketersediaan & Skalabilitas**
- Target uptime (mis. 99.5%), terutama saat jam trading aktif (overlap sesi London/New York untuk forex)
- Rencana kapasitas untuk lonjakan concurrent user saat fitur backtest premium diluncurkan (computationally lebih berat dibanding kalkulator/jurnal)

**Lokalisasi & Aksesibilitas**
- Bahasa Indonesia sebagai default, bukan hasil translate mentah — perlu glosarium istilah internal (sebagian istilah trading punya padanan Indonesia yang familiar, sebagian tetap dipakai dalam bahasa Inggris)
- Toleransi koneksi lambat/terputus — minimal jurnal manual & progres e-course tetap bisa diakses/di-cache saat koneksi tidak stabil

---

## 9. Timeline & Milestone Pengembangan

Estimasi kasar berdasarkan urutan yang sudah ada di Section 3, asumsi tim kecil (2–4 engineer):

| Fase | Estimasi Durasi | Output |
| --- | --- | --- |
| 1. Setup DB & Auth (Supabase) | 1–2 minggu | Skema tabel + RLS aktif, auth flow jalan |
| 2. Frontend architecture (Expo + NativeWind) | 2–3 minggu | Navigasi dasar web + mobile, design system |
| 3. Core tools gratis (Kalkulator + E-course) | 4–6 minggu | Free tier lengkap, siap closed beta |
| 3.5 Spike teknis Backtesting *(baru, paralel dgn fase 3)* | 1–2 minggu | Validasi Lightweight Charts di Expo web + keputusan arsitektur backtest engine |
| 4. AI & Backtesting (Premium) | 6–10 minggu | AI review jurnal jalan, backtest engine fungsional dengan minimal 1 sumber data stabil |
| 5. Paywall & Payment | 2–3 minggu | Integrasi Midtrans/Xendit + Play Billing, logic akses free/premium |
| 6. QA, closed beta, submission app store *(baru)* | 2–4 minggu | Siap public launch |

**Total kasar: ~5–6 bulan dari nol ke launch.** Fase 4 (AI & Backtesting) paling berisiko molor karena bergantung pada keputusan arsitektur backtest yang masih perlu difinalisasi (lihat catatan di review sebelumnya).

---

*Catatan sumber data: statistik investor kripto dari rilis OJK (Mei 2026); perbandingan produk trading journal dari riset pasar Juli 2026; status Badan PDP dari Recording Law (Mei 2026) dan siaran pers bersama OJK/Bappebti (Januari 2026).*