# Arion Trader

Arion Trader is a React Native application built with Expo and Expo Router. It is designed to help traders improve discipline and risk management through a gamified dashboard, trading journal, position size calculator, e-course modules, and a backtest mockup experience.

## Features

- ✅ Home dashboard with winstreak, XP progress, daily quiz prompt, and trading stats
- ✅ Risk calculator with stop-loss / take-profit support and position size recommendations
- ✅ Trade journal for recording, editing, and deleting trade entries
- ✅ AI review placeholder for journal analysis
- ✅ Gamified e-course experience with progress tracking and locked advanced modules
- ✅ Backtest screen mockup for future TradingView Lightweight Charts integration
- ✅ Local persistent storage with AsyncStorage for journal and course progress
- ✅ Expo Router-based navigation for mobile and web

## Tech Stack

- Expo
- React Native
- Expo Router
- TypeScript
- NativeWind / Tailwind CSS
- AsyncStorage
- React Context for state management
- Expo Vector Icons

## Getting Started

### Prerequisites

- Node.js
- npm
- Expo CLI (optional, or use `npx expo`)

### Install dependencies

```bash
npm install
```

### Run the app

```bash
npm start
```

Then use one of the following commands or the Expo developer tools:

```bash
npm run android
npm run ios
npm run web
```

## Project Structure

- `App.tsx` - app entry point
- `app/` - Expo Router pages and navigation layout
- `context/` - React Context providers for journal and course progress state
- `services/` - AsyncStorage abstraction and storage helpers
- `utils/` - calculator logic and helper functions
- `types/` - shared TypeScript type definitions
- `assets/` - static assets used by the app

## Current Screens

- `Home` - dashboard UI for trading habits
- `Risk Calculator` - position size and risk metrics
- `Trade Journal` - record and review trades with notes
- `E-Course` - module progress and gamified learning
- `Backtest` - visual mockup and strategy parameter preview

## Notes

This project is currently a work in progress and contains a functional UI prototype with local storage. The backtest screen is a placeholder for future integration with actual charting components and market data.

## License

This repository does not specify a license. Add one if you want to share it publicly.
