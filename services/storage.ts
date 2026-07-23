// =============================================
// Arion Trader — AsyncStorage Service Abstraction
// =============================================
import AsyncStorage from '@react-native-async-storage/async-storage';

/** Centralized storage keys to prevent typos */
export const STORAGE_KEYS = {
  TRADES: '@arion_trades',
  COURSE_PROGRESS: '@arion_course_progress',
  SETTINGS: '@arion_settings',
} as const;

/**
 * Get parsed JSON data from AsyncStorage.
 * Returns null if key doesn't exist or parsing fails.
 */
export async function getData<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.error(`[Storage] Failed to get data for key "${key}":`, error);
    return null;
  }
}

/**
 * Save (overwrite) JSON data to AsyncStorage.
 */
export async function saveData<T>(key: string, value: T): Promise<void> {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (error) {
    console.error(`[Storage] Failed to save data for key "${key}":`, error);
  }
}

/**
 * Remove a key from AsyncStorage.
 */
export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Failed to remove key "${key}":`, error);
  }
}
