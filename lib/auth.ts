import { supabase } from "./supabase";

/**
 * Gets the current user session if it exists
 */
export const getSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
};

/**
 * Safely access localStorage (handles server-side rendering)
 */
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },
};

/**
 * Create a temporary user ID when not authenticated
 * This allows the app to continue functioning without auth
 */
export const createTemporaryUserId = (): string => {
  // Create a temporary user ID for local-only operation
  const localUserId = safeLocalStorage.getItem("tempUserId");
  if (localUserId) {
    return localUserId;
  }

  // Generate a new ID if none exists
  const newId = "temp-" + Math.random().toString(36).substring(2, 15);
  safeLocalStorage.setItem("tempUserId", newId);
  return newId;
};

/**
 * Ensures there's a user ID for storing workouts
 * First tries to get authenticated user, falls back to temporary ID
 */
export const ensureAuthSession = async (): Promise<string> => {
  try {
    // Check if we already have a session
    const session = await getSession();

    if (session) {
      return session.user.id;
    }

    // If not authenticated, use a temporary ID
    return createTemporaryUserId();
  } catch (error) {
    console.error("Auth error:", error);
    // Fall back to temporary ID
    return createTemporaryUserId();
  }
};

/**
 * Get the current user ID or temporary ID if not authenticated
 */
export const getCurrentUserId = async (): Promise<string> => {
  try {
    const session = await getSession();
    return session?.user.id || createTemporaryUserId();
  } catch (error) {
    console.error("Error getting user ID:", error);
    return createTemporaryUserId();
  }
};
