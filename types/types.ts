// =============================================
// Arion Trader — Shared Type Definitions
// =============================================

/** Represents a single trade entry in the journal */
export interface Trade {
  id: number;
  pair: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  stopLossPrice: number | null;
  takeProfitPrice: number | null;
  pnl: number;
  status: 'WIN' | 'LOSS' | 'BEP' | 'OPEN';
  date: string;
  note: string;
  capitalAtRisk: number | null;
  riskRewardRatio: number | null;
}

/** Input parameters for the position size calculator */
export interface CalculatorInput {
  totalCapital: number;
  riskPercentage: number;
  entryPrice: number;
  stopLossPrice?: number;
  takeProfitPrice?: number;
}

/** Output result from the position size calculator */
export interface CalculationResult {
  capitalAtRisk: number;
  distanceToSL: number | null;      // percentage
  distanceToTP: number | null;      // percentage
  riskRewardRatio: number | null;   // ratio
  positionSizeConservative: number; // units at 1x
  positionSizeAggressive: number;   // units at 5x
  leverageConservative: number;
  leverageAggressive: number;
}

/** Represents a single e-course module */
export interface CourseModule {
  id: number;
  title: string;
  category: string;
  time: string;
  progress: number; // 0-100
  unlocked: boolean;
}

/** Form data for creating/editing a trade from UI */
export interface TradeFormData {
  pair: string;
  direction: 'LONG' | 'SHORT';
  entryPrice: number;
  stopLossPrice: number | null;
  takeProfitPrice: number | null;
  pnl: number;
  status: 'WIN' | 'LOSS' | 'BEP' | 'OPEN';
  note: string;
  capitalAtRisk: number | null;
  riskRewardRatio: number | null;
}
