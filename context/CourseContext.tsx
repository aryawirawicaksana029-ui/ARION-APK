// =============================================
// Arion Trader — E-Course Progress State Management
// =============================================
import React, { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { CourseModule } from '../types/types';
import { getData, saveData, STORAGE_KEYS } from '../services/storage';

// ---- Default Course Data ----
const DEFAULT_COURSES: CourseModule[] = [
  { id: 1, title: 'Candlestick Basics', category: 'Technical', time: '5 Min Read', progress: 0, unlocked: true },
  { id: 2, title: 'Support & Resistance', category: 'Technical', time: '10 Min Video', progress: 0, unlocked: true },
  { id: 3, title: 'Trading Psychology', category: 'Mindset', time: '8 Min Read', progress: 0, unlocked: true },
  { id: 4, title: 'Risk Management', category: 'Strategy', time: '15 Min Video', progress: 0, unlocked: true },
  { id: 5, title: 'Fibonacci Masterclass', category: 'Advanced', time: '20 Min Video', progress: 0, unlocked: false },
  { id: 6, title: 'Smart Money Concepts', category: 'Advanced', time: '30 Min Video', progress: 0, unlocked: false },
];

// ---- State Shape ----
interface CourseState {
  modules: CourseModule[];
  isLoading: boolean;
}

// ---- Actions ----
type CourseAction =
  | { type: 'LOAD_PROGRESS'; payload: CourseModule[] }
  | { type: 'COMPLETE_MODULE'; payload: number }
  | { type: 'RESET_PROGRESS' }
  | { type: 'SET_LOADING'; payload: boolean };

// ---- Reducer ----
function courseReducer(state: CourseState, action: CourseAction): CourseState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'LOAD_PROGRESS':
      return { ...state, modules: action.payload, isLoading: false };
    case 'COMPLETE_MODULE':
      return {
        ...state,
        modules: state.modules.map((m) =>
          m.id === action.payload ? { ...m, progress: 100 } : m
        ),
      };
    case 'RESET_PROGRESS':
      return {
        ...state,
        modules: state.modules.map((m) => ({ ...m, progress: 0 })),
      };
    default:
      return state;
  }
}

// ---- Context ----
interface CourseContextType {
  modules: CourseModule[];
  isLoading: boolean;
  completeModule: (id: number) => void;
  resetProgress: () => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// ---- Provider ----
export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(courseReducer, {
    modules: DEFAULT_COURSES,
    isLoading: true,
  });

  const hasLoaded = useRef(false);

  // Load progress from storage on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const stored = await getData<CourseModule[]>(STORAGE_KEYS.COURSE_PROGRESS);
      if (isMounted) {
        dispatch({ type: 'LOAD_PROGRESS', payload: stored ?? DEFAULT_COURSES });
        hasLoaded.current = true;
      }
    })();
    return () => { isMounted = false; };
  }, []);

  // Persist modules to storage on every change (after initial load)
  useEffect(() => {
    if (hasLoaded.current) {
      saveData(STORAGE_KEYS.COURSE_PROGRESS, state.modules);
    }
  }, [state.modules]);

  const completeModule = useCallback((id: number) => {
    dispatch({ type: 'COMPLETE_MODULE', payload: id });
  }, []);

  const resetProgress = useCallback(() => {
    dispatch({ type: 'RESET_PROGRESS' });
  }, []);

  return (
    <CourseContext.Provider value={{
      modules: state.modules,
      isLoading: state.isLoading,
      completeModule,
      resetProgress,
    }}>
      {children}
    </CourseContext.Provider>
  );
}

// ---- Hook ----
export function useCourse(): CourseContextType {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}
