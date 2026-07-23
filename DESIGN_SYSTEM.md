# 🎨 Design System — Arion Trader

Dokumen ini mendefinisikan aturan visual, skema warna, tipografi, dan komponen UI untuk aplikasi **Arion Trader** (Web & Mobile Android). Semua kode Front-End yang digenerate harus mematuhi panduan ini.

---

## 1. Core Theme & Mood

* **Primary Theme:** **Dark Mode Only** (Default). Aplikasi trading membutuhkan fokus tinggi, mengurangi radiasi layar saat mata menatap grafik (*chart*) dalam waktu lama, dan memberikan kesan profesional/futuristik.
* **Moodboard:** Sleek, Modern, High-Contrast, Gamified yet Professional.

---

## 2. Color Palette (Tailwind CSS Color Tokens)

Gunakan skema warna berikut untuk konsistensi visual:

### A. Background & Surface (Gelap)

* **Background Utama (`bg-main`):** `#0F172A` (Slate 900)
* **Card / Container (`bg-card`):** `#1E293B` (Slate 800)
* **Card Border / Divider (`border-subtle`):** `#334155` (Slate 700)

### B. Trading Status & Indicators

* **Bullish / Profit / Win (`color-profit`):** `#10B981` (Emerald 500)
* **Bearish / Loss / Risk (`color-loss`):** `#EF4444` (Red 500)
* **Warning / Break Even (`color-neutral`):** `#F59E0B` (Amber 500)

### C. Gamification & Streak (Duolingo Style)

* **Winstreak / Fire (`color-fire`):** `#F97316` (Orange 500) — *Digunakan untuk Ikon Api Winstreak*
* **XP / Gamification Badge (`color-xp`):** `#EAB308` (Yellow 500) — *Digunakan untuk Level/XP*
* **Primary Brand Accent (`color-primary`):** `#6366F1` (Indigo 500) — *Digunakan untuk Tombol Utama & Highlight Active Tab*

### D. Typography / Text Colors

* **Primary Text:** `#F8FAFC` (Slate 50) — *Teks utama yang sangat jelas*
* **Secondary Text:** `#94A3B8` (Slate 400) — *Sub-label, tanggal, penjelasan ringan*
* **Muted Text:** `#64748B` (Slate 500) — *Placeholder form & watermark*

---

## 3. Tipografi & Hirarki Teks

* **Font Family:** `Inter`, `System UI`, atau Font Sans bawaan React Native.
* **Monospace Font (PENTING untuk Angka Trading):** Gunakan `Roboto Mono` atau font Monospace untuk menampilkan **Harga, Lot Size, Stop Loss, Take Profit, PnL**, dan **Kalkulator** agar angka sejajar secara vertikal.

### Hierarchy:

* **H1 (Page Title):** `text-2xl font-bold text-slate-50`
* **H2 (Section Header):** `text-lg font-semibold text-slate-100`
* **Body Text:** `text-sm font-normal text-slate-300`
* **Badge / Label:** `text-xs font-medium`

---

## 4. Aturan Komponen Visual (UI Components)

### A. Cards & Containers

* Semua *card* menggunakan `rounded-2xl`, background `bg-slate-800`, border tipis `border border-slate-700/50`, dan padat dengan *padding* (`p-4` atau `p-5`).

### B. Buttons (Tombol Action)

* **Primary Button:** Background `bg-indigo-600 hover:bg-indigo-500`, teks putih `text-white font-semibold`, `rounded-xl`, `py-3 px-4`.
* **Danger/Loss Button:** Background `bg-red-600/20 text-red-400 border border-red-500/30`.
* **Success/Win Button:** Background `bg-emerald-600/20 text-emerald-400 border border-emerald-500/30`.

### C. Badges & Tags

* Gunakan gaya *pills* (`rounded-full px-3 py-1 text-xs font-semibold`).
* Contoh: Badge **[PRO]** untuk fitur terkunci menggunakan latar belakang gradient emas (`bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900`).

---

## 5. Layout & Navigation Standard

* **Mobile First Layout:** Tampilan harus responsif. Di tampilan layar HP, gunakan **Bottom Navigation Bar** dengan 5 ikon utama:
1. 🏠 **Home** (Streak, XP, Quick Stats)
2. 🎓 **Course** (Path Gamifikasi Level 1-5)
3. 🧮 **Tools** (Kalkulator Risiko)
4. 📓 **Journal** (Daftar Trade & Tombol AI Review)
5. 📈 **Backtest** (TradingView Lightweight Chart + Strategy Panel)



---

### Cara Menggunakannya Sekarang bersama AntiGravity:

Saat kamu nge-prompt AntiGravity, masukkan kedua file tersebut ke dalam konteksnya.

Prompt barumu akan menjadi seperti ini:

> *"Act as a Senior Frontend Developer. Read prd.md and DESIGN_SYSTEM.md thoroughly.*
> *I want to build the **Front-End Application Dashboard** (NOT a marketing landing page) for Arion Trader using React Native Expo with NativeWind (Tailwind CSS).*
> *Please generate the complete, interactive Frontend prototype adhering strictly to the UI rules in `DESIGN_SYSTEM.md` and focusing on the **Core App Features** specified in `prd.md`:*
> 1. **Navigation:** Bottom Tab Bar (Home/Dashboard, E-Course, Risk Calculator, Journal, Backtest).
> 2. **Home / Gamification View:** Display current Winstreak 🔥 counter, XP level, and Daily Task / Quiz entry.
> 3. **Risk Calculator View:** Interactive form for Position Size / Lot Calculation with risk percentage slider and monospace numbers.
> 4. **Trading Journal View:** List of trades with badges (Win/Loss) and a button to trigger 'AI Review'. Include a modal form to add a new trade.
> 5. **E-Course View:** Duolingo-style tree / level path (Level 1-5 accessible, locked icons for higher levels).
> 6. **Backtest View:** Embedded TradingView Lightweight Charts component mockup with strategy control panel.
> 
> 
> *Strictly use dummy/mock state (React useState) for data persistence for now. Do NOT connect to real backend yet. Ensure the layout is responsive for both mobile and web viewports."*
