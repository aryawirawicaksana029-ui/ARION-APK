// =============================================
// Arion Trader — Trading Calculator Engine
// =============================================
import { CalculatorInput, CalculationResult } from '../types/types';

/**
 * Pure function: calculates position size, risk metrics, and leverage recommendations.
 *
 * @param input - CalculatorInput with totalCapital, riskPercentage, entryPrice, and optional SL/TP
 * @returns CalculationResult with all computed metrics
 */
export function calculatePositionSize(input: CalculatorInput): CalculationResult {
  const { totalCapital, riskPercentage, entryPrice, stopLossPrice, takeProfitPrice } = input;

  // --- Capital at Risk ---
  const capitalAtRisk = (totalCapital * riskPercentage) / 100;

  // --- Distance to SL (%) ---
  let distanceToSL: number | null = null;
  if (stopLossPrice !== undefined && stopLossPrice > 0 && entryPrice > 0) {
    distanceToSL = Math.abs(entryPrice - stopLossPrice) / entryPrice * 100;
  }

  // --- Distance to TP (%) ---
  let distanceToTP: number | null = null;
  if (takeProfitPrice !== undefined && takeProfitPrice > 0 && entryPrice > 0) {
    distanceToTP = Math.abs(takeProfitPrice - entryPrice) / entryPrice * 100;
  }

  // --- Risk-to-Reward Ratio ---
  let riskRewardRatio: number | null = null;
  if (distanceToSL !== null && distanceToSL > 0 && distanceToTP !== null) {
    riskRewardRatio = distanceToTP / distanceToSL;
  }

  // --- Position Size (Conservative = 1x leverage) ---
  let positionSizeConservative = 0;
  if (stopLossPrice !== undefined && stopLossPrice > 0 && entryPrice > 0) {
    const priceDifference = Math.abs(entryPrice - stopLossPrice);
    if (priceDifference > 0) {
      positionSizeConservative = capitalAtRisk / priceDifference;
    }
  } else if (entryPrice > 0) {
    // Fallback: use 10% of entry price as assumed risk distance
    positionSizeConservative = capitalAtRisk / (entryPrice * 0.1);
  }

  // --- Position Size (Aggressive = 5x leverage) ---
  const positionSizeAggressive = positionSizeConservative * 5;

  // --- Leverage recommendations ---
  const leverageConservative = 1;
  const leverageAggressive = 5;

  return {
    capitalAtRisk,
    distanceToSL,
    distanceToTP,
    riskRewardRatio,
    positionSizeConservative,
    positionSizeAggressive,
    leverageConservative,
    leverageAggressive,
  };
}
