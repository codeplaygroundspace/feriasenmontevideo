import { markets, type Market } from "@/data";

/**
 * Generate a unique ID for a market based on its properties
 * This is now deprecated since markets have their own IDs
 */
export const generateMarketId = (market: Omit<Market, 'id'>, day: string): string => {
  // Markets now have their own IDs, so this function is not needed
  // But keeping it for backward compatibility
  return (market as Market).id || 'unknown';
};

/**
 * Generate a URL-friendly slug from a market ID
 */
export const generateMarketSlug = (marketId: string): string => {
  return marketId;
};

/**
 * Ensure a market has an ID, generating one if needed
 */
export const ensureMarketHasId = (market: Market, day: string): Market & { id: string } => {
  // All markets now have IDs, so just return the market
  return market as Market & { id: string };
};

/**
 * Find a market by its slug (which is the ID)
 */
export const findMarketBySlug = (slug: string): (Market & { id: string; day: string }) | null => {
  for (const [day, dayMarkets] of Object.entries(markets)) {
    for (const market of dayMarkets) {
      const marketWithId = ensureMarketHasId(market, day);
      if (marketWithId.id === slug) {
        return { ...marketWithId, day };
      }
    }
  }
  return null;
};

/**
 * Get all market slugs for static generation
 */
export const getAllMarketSlugs = (): string[] => {
  const slugs: string[] = [];
  for (const [day, dayMarkets] of Object.entries(markets)) {
    for (const market of dayMarkets) {
      const marketWithId = ensureMarketHasId(market, day);
      slugs.push(marketWithId.id);
    }
  }
  return slugs;
};

/**
 * Get market with day information
 */
export const getMarketWithDay = (slug: string): (Market & { id: string; day: string }) | null => {
  return findMarketBySlug(slug);
};

/**
 * Get related markets (same neighborhood or same day)
 */
export const getRelatedMarkets = (currentMarket: Market & { id: string }, currentDay: string): (Market & { id: string })[] => {
  if (!currentMarket) {
    return [];
  }
  
  const relatedMarkets: (Market & { id: string })[] = [];
  
  for (const [day, dayMarkets] of Object.entries(markets)) {
    for (const market of dayMarkets) {
      const marketWithId = ensureMarketHasId(market, day);
      
      // Skip the current market
      if (marketWithId.id === currentMarket.id) {
        continue;
      }
      
      // Check if it's related (same neighborhood or same day)
      if (marketWithId.neighborhood === currentMarket.neighborhood || day === currentDay) {
        relatedMarkets.push(marketWithId);
      }
    }
  }
  
  return relatedMarkets.slice(0, 6); // Limit to 6 related markets
};
