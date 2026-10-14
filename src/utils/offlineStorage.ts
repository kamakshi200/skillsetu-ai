/**
 * Offline Memory Storage Utility for SkillSetu AI
 * Manages reliable browser localStorage caching for uninterrupted offline usage.
 */

export const STORAGE_KEYS = {
  THEME: 'skillsetu_theme_pref',
  LANGUAGE: 'skillsetu_lang_pref',
  FILTERS: 'skillsetu_filters_cache',
  ACTIVE_MODULE: 'skillsetu_active_module',
  CHAT_MESSAGES: 'skillsetu_chat_history',
  CUSTOM_ALERTS: 'skillsetu_custom_alerts',
  POLICY_SIM_STATE: 'skillsetu_policy_sim',
  CUSTOM_JOB_POSTINGS: 'skillsetu_custom_postings',
  USER_PROFILE: 'skillsetu_user_profile',
} as const;

export function getStoredItem<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined') return fallback;
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[OfflineStorage] Failed to read ${key}:`, err);
    return fallback;
  }
}

export function setStoredItem<T>(key: string, value: T): boolean {
  try {
    if (typeof window === 'undefined') return false;
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[OfflineStorage] Failed to save ${key}:`, err);
    return false;
  }
}

export function removeStoredItem(key: string): void {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[OfflineStorage] Failed to remove ${key}:`, err);
  }
}

export function getOfflineStorageStats() {
  try {
    if (typeof window === 'undefined') return { totalItems: 0, estimatedKb: 0 };
    let totalBytes = 0;
    let itemCount = 0;
    for (const key of Object.values(STORAGE_KEYS)) {
      const val = localStorage.getItem(key);
      if (val) {
        totalBytes += (key.length + val.length) * 2;
        itemCount++;
      }
    }
    return {
      totalItems: itemCount,
      estimatedKb: Math.round((totalBytes / 1024) * 10) / 10,
    };
  } catch {
    return { totalItems: 0, estimatedKb: 0 };
  }
}

export function clearOfflineCache(): void {
  try {
    if (typeof window === 'undefined') return;
    for (const key of Object.values(STORAGE_KEYS)) {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.warn('[OfflineStorage] Error clearing cache:', err);
  }
}
