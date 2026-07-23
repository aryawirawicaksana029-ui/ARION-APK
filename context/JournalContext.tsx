// =============================================
// Arion Trader — Journal State Management (React Context)
// =============================================
import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { Trade, TradeFormData } from '../types/types';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

// ---- State Shape ----
interface JournalState {
  trades: Trade[];
  isLoading: boolean;
}

// ---- Actions ----
type JournalAction =
  | { type: 'LOAD_TRADES'; payload: Trade[] }
  | { type: 'ADD_TRADE'; payload: Trade }
  | { type: 'UPDATE_TRADE'; payload: { id: number; data: Partial<Trade> } }
  | { type: 'DELETE_TRADE'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean };

// ---- Reducer ----
function journalReducer(state: JournalState, action: JournalAction): JournalState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOAD_TRADES':
      return { ...state, trades: action.payload, isLoading: false };
    case 'ADD_TRADE':
      return { ...state, trades: [action.payload, ...state.trades] };
    case 'UPDATE_TRADE':
      return {
        ...state,
        trades: state.trades.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload.data } : t
        ),
      };
    case 'DELETE_TRADE':
      return {
        ...state,
        trades: state.trades.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
}

// ---- Context ----
interface JournalContextType {
  trades: Trade[];
  isLoading: boolean;
  addTrade: (formData: TradeFormData) => void;
  updateTrade: (id: number, data: Partial<Trade>) => void;
  deleteTrade: (id: number) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

// ---- Provider ----
export function JournalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(journalReducer, {
    trades: [],
    isLoading: true,
  });

  // Track whether initial load has completed to avoid saving default empty array
  const hasLoaded = useRef(false);

  // Load trades from storage on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const stored = await getData<Trade[]>(STORAGE_KEYS.TRADES);
      if (isMounted) {
        dispatch({ type: 'LOAD_TRADES', payload: stored ?? [] });
        hasLoaded.current = true;
      }
    })();
    return () => { isMounted = false; };
  }, []);

  // Persist trades to storage on every change (after initial load)
  useEffect(() => {
    if (hasLoaded.current) {
      saveData(STORAGE_KEYS.TRADES, state.trades);
    }
  }, [state.trades]);

  const addTrade = useCallback((formData: TradeFormData) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
    });
    const newTrade: Trade = {
      id: Date.now(), // unique timestamp-based ID
      pair: formData.pair || 'Pair',
      direction: formData.direction,
      entryPrice: formData.entryPrice,
      stopLossPrice: formData.stopLossPrice,
      takeProfitPrice: formData.takeProfitPrice,
      pnl: formData.pnl,
      status: formData.status,
      date: dateStr,
      note: formData.note,
      capitalAtRisk: formData.capitalAtRisk,
      riskRewardRatio: formData.riskRewardRatio,
    };
    dispatch({ type: 'ADD_TRADE', payload: newTrade });
  }, []);

  const updateTrade = useCallback((id: number, data: Partial<Trade>) => {
    dispatch({ type: 'UPDATE_TRADE', payload: { id, data } });
  }, []);

  const deleteTrade = useCallback((id: number) => {
    dispatch({ type: 'DELETE_TRADE', payload: id });
  }, []);

  return (
    <JournalContext.Provider value={{
      trades: state.trades,
      isLoading: state.isLoading,
      addTrade,
      updateTrade,
      deleteTrade,
    }}>
      {children}
    </JournalContext.Provider>
  );
}

// ---- Hook ----
export function useJournal(): JournalContextType {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
