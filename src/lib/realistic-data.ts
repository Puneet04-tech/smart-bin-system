/**
 * Utility functions to generate realistic, dynamic data for the app
 * Makes the application feel more authentic with varied and time-based values
 */

/**
 * Generate a realistic timestamp based on time ago
 */
export function getRealisticTimestamp(minutesAgo: number): string {
  const now = new Date();
  const past = new Date(now.getTime() - minutesAgo * 60 * 1000);
  
  const diffMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m`;
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  
  return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Add realistic variance to a number (±5%)
 */
export function addVariance(value: number, maxPercent: number = 5): number {
  const variance = (Math.random() - 0.5) * 2 * (maxPercent / 100);
  return Math.round(value * (1 + variance));
}

/**
 * Generate realistic capacity percentage (never perfectly round)
 */
export function getRealisticCapacity(baseCapacity: number): number {
  return Math.min(100, Math.max(0, baseCapacity + Math.floor(Math.random() * 7) - 3));
}

/**
 * Generate realistic metrics that change slightly over time
 */
export function getRealisticMetrics() {
  const baseTime = Date.now();
  
  return {
    totalBins: 47,
    activeBins: 38 + (Math.floor(baseTime / 300000) % 3), // Changes every 5 min
    maintenanceBins: 6 + (Math.floor(baseTime / 600000) % 3), // Changes every 10 min
    offlineBins: 2 + (Math.floor(baseTime / 900000) % 2), // Changes every 15 min
    totalWasteCollected: 16234 + Math.floor((baseTime % 86400000) / 1000), // Increases throughout day
    co2Saved: 4127 + Math.floor((baseTime % 86400000) / 3000),
    activeUsers: 2568 + Math.floor(Math.random() * 15),
    todayTransactions: 143 + Math.floor((baseTime % 86400000) / 600000),
  };
}

/**
 * Generate realistic last update time
 */
export function getRealisticUpdateTime(): string {
  const options = ["Just now", "1m", "2m", "3m", "5m", "8m"];
  const index = Math.floor(Date.now() / 30000) % options.length;
  return options[index];
}

/**
 * Generate realistic user engagement numbers
 */
export function getRealisticEngagement(baseLikes: number) {
  const timeVariance = Math.floor(Date.now() / 60000) % 10;
  return {
    likes: baseLikes + timeVariance,
    comments: Math.floor(baseLikes * 0.15) + Math.floor(timeVariance / 2),
    shares: Math.floor(baseLikes * 0.05) + Math.floor(timeVariance / 3),
  };
}

/**
 * Generate realistic temperature with slight variations
 */
export function getRealisticTemperature(baseTemp: number = 24): number {
  const hourOfDay = new Date().getHours();
  const timeAdjustment = hourOfDay > 12 && hourOfDay < 18 ? 2 : 0; // Warmer in afternoon
  return baseTemp + timeAdjustment + (Math.random() > 0.5 ? 1 : 0);
}

/**
 * Simulate realistic loading time (800-1500ms)
 */
export function getRealisticLoadingTime(): number {
  return 800 + Math.floor(Math.random() * 700);
}

/**
 * Generate realistic point values with natural variance
 */
export function getRealisticPoints(basePoints: number): number {
  const multipliers = [0.95, 0.98, 1.0, 1.02, 1.05];
  const multiplier = multipliers[Math.floor(Math.random() * multipliers.length)];
  return Math.floor(basePoints * multiplier);
}

/**
 * Format currency in a realistic way
 */
export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toFixed(0)}`;
}
