/**
 * Shared progression logic for HackMas gamification.
 * These formulas MUST match the backend routes.py logic.
 */

/**
 * Calculates the XP required to reach the next level from the current level.
 * Formula: round(100 * (level ^ 1.5))
 */
export function calculateNextLevelXP(level: number): number {
  return Math.round(100 * Math.pow(level, 1.5));
}

/**
 * Calculates the streak multiplier based on the current streak.
 * Formula: 1 + (min(streak, 10) * 0.05)
 * Max bonus: +50% (at 10 day streak)
 */
export function getStreakMultiplier(streak: number): number {
  const cappedStreak = Math.min(streak, 10);
  return 1 + (cappedStreak * 0.05);
}

/**
 * Gets the base XP for a task based on its priority.
 */
export function getTaskBaseXP(priority: string): number {
  const weights: Record<string, number> = {
    high: 50,
    medium: 20,
    low: 10
  };
  return weights[priority.toLowerCase()] || 20;
}
