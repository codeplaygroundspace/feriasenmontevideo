import { markets, type Market } from "@/data";

/**
 * Custom hook for market-related operations
 */
export const useMarkets = () => {
  /**
   * Check if a specific day has any markets
   */
  const hasMarketsForDay = (day: string): boolean => {
    return markets[day] && markets[day].length > 0;
  };

  /**
   * Get all markets for a specific day
   */
  const getMarketsForDay = (day: string): Market[] => {
    return markets[day] || [];
  };

  /**
   * Get all days that have markets
   */
  const getAllDaysWithMarkets = (): string[] => {
    return Object.keys(markets).filter(day => hasMarketsForDay(day));
  };

  /**
   * Get all days that have no markets
   */
  const getAllDaysWithoutMarkets = (): string[] => {
    return Object.keys(markets).filter(day => !hasMarketsForDay(day));
  };

  /**
   * Get total count of markets for a specific day
   */
  const getMarketCountForDay = (day: string): number => {
    return markets[day]?.length || 0;
  };

  /**
   * Get total count of all markets across all days
   */
  const getTotalMarketCount = (): number => {
    return Object.values(markets).reduce((total, dayMarkets) => total + dayMarkets.length, 0);
  };

  /**
   * Check if a specific day has markets in a specific neighborhood
   */
  const hasMarketsForDayInNeighborhood = (day: string, neighborhood: string): boolean => {
    if (neighborhood === 'all') {
      return hasMarketsForDay(day);
    }
    
    const dayMarkets = markets[day] || [];
    return dayMarkets.some(market => market.neighborhood === neighborhood);
  };

  return {
    hasMarketsForDay,
    getMarketsForDay,
    getAllDaysWithMarkets,
    getAllDaysWithoutMarkets,
    getMarketCountForDay,
    getTotalMarketCount,
    hasMarketsForDayInNeighborhood,
  };
};
