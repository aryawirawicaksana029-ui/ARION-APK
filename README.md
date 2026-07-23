# 🚀 Arion Trader — Risk-First Trading Companion & Journaling App

![Uploading ezgif.com-video-to-gif-converter (2).gif…]()

<p align="center">
  <img src="./assets/icon.png" alt="Arion Trader Logo" width="120" style="border-radius: 20px;"/>
</p>

<p align="center">
  <b>A modern, beginner-friendly trading companion built with React Native & Expo SDK 51.</b><br/>
  Featuring a Claude AI-inspired warm minimalist aesthetic, interactive risk management calculator, dynamic persistent trade journaling, and structured e-course modules.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React_Native-0.74.5-61DAFB?style=flat-square&logo=react" alt="React Native"/>
  <img src="https://img.shields.io/badge/Expo_SDK-51.0.14-000000?style=flat-square&logo=expo" alt="Expo SDK 51"/>
  <img src="https://img.shields.io/badge/TypeScript-5.3.3-3178C6?style=flat-square&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.4-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Architecture-Clean%20%26%20Modular-success?style=flat-square" alt="Architecture"/>
</p>

---

## 💡 Background & Problem Statement

In capital markets, many beginner traders fail not due to poor technical analysis, but due to **uncontrolled risk management** and **disorganized trade psychology**. 

**Arion Trader** solves this problem by providing an integrated workflow: calculate your position size based on capital risk *before* entering a trade, and instantly commit it to a psychological journal with a single click.

---

## ✨ Key Features

### 🧮 1. Position Sizing & Risk Calculator Engine
* **Capital & Risk Inputs:** Input total capital ($ / Rp), risk percentage, entry price, Stop Loss (SL), and Take Profit (TP).
* **Automated Risk Metrics:** Real-time feedback on total Capital at Risk, Risk-to-Reward Ratio (RRR), and percentage distance to SL/TP.
* **Leverage Recommendations:** Offers dual options (Conservative vs. Aggressive) to help prevent over-leveraging.
* **1-Click Journal Sync:** Automatically formats and saves calculation results directly into the trading journal.

### 📓 2. Persistent Trade Journaling
* **Standardized Log Cards:** Formatted header display showing `Trade #X`, `Pair` (editable), and `Date`.
* **Full CRUD Support:** Add, view, edit, and delete trade entries seamlessly.
* **Psychology & Analysis Notes:** Dedicated text area inside each trade detail modal for tracking trade setups and emotional discipline.
* **Offline-First Storage:** Local persistence powered by `AsyncStorage` for zero-latency loading.

### 🎓 3. Modern E-Course Hub
* Clean, minimal learning portal designed for beginner traders.
* Progress tracking per module stored in persistent local state.

### 🎨 4. Claude AI-Inspired UI/UX
* **Warm Minimalist Palette:** Charcoal/Slate dark backgrounds (`#0F172A`), subtle borders, and warm clay/terracotta accent highlights (`#D97757`).
* **Clean Typography:** Bold, simple, and legible sans-serif hierarchy for quick glanceability.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** [React Native](https://reactnative.dev/) with [Expo SDK 51](https://expo.dev/)
* **Routing:** [Expo Router v3](https://docs.expo.dev/router/introduction/) (File-based routing)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing)
* **Styling:** [NativeWind v4](https://www.nativewind.dev/) / [Tailwind CSS](https://tailwindcss.com/)
* **State Management & Persistence:** Context API + `@react-native-async-storage/async-storage`

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/ARION-APK.git](https://github.com/YOUR_USERNAME/ARION-APK.git)
   cd ARION-APK

```

2. **Install dependencies:**
```bash
npm install --legacy-peer-deps

```


3. **Start the development server:**
* **Web:**
```bash
npx expo start --web -c

```


* **Mobile (Expo Go / Emulator):**
```bash
npx expo start -c

```





---

## 📁 Project Structure

```text
ARION-APK/
├── app/                  # Expo Router file-based pages
│   ├── _layout.tsx       # Main layout configuration & providers
│   ├── index.tsx         # Dashboard / Home screen
│   ├── calculator.tsx    # Risk & Position Sizing Calculator
│   ├── journal.tsx       # Trade Journaling screen
│   └── course.tsx        # E-Course hub screen
├── components/           # Reusable UI components
├── context/              # State management (Journal & Course Context)
├── services/             # Local storage helper & CRUD logic
├── utils/                # Mathematical calculation engine
├── assets/               # Image assets & icons
├── app.json              # Expo configuration file
└── tailwind.config.js    # NativeWind design system configuration

```

---

## 🤝 Contributing & Discussion

Feedback, issues, and feature requests are welcome! Feel free to check the [issues page](https://www.google.com/search?q=../../issues) if you'd like to contribute.
