"use client";

import { useMemo } from "react";
import { markets } from "@/data";
import { dayNames, type Market } from "@/data";
import MarketCard from "./MarketCard";

interface MarketsCardGridProps {
  selectedDay: string;
  selectedNeighborhood: string;
  userCoordinates?: { lat: number; lng: number } | null;
}

const MarketsCardGrid: React.FC<MarketsCardGridProps> = ({
  selectedDay,
  selectedNeighborhood,
  userCoordinates,
}) => {
  const filteredMarkets = useMemo(() => {
    let allMarkets: (Market & { day: string })[] = [];

    // Get markets for the selected day or all days
    if (selectedDay === "all") {
      // Get all markets from all days
      allMarkets = Object.entries(markets).flatMap(([day, dayMarkets]) =>
        dayMarkets.map(market => ({
          ...market,
          day: day
        }))
      );
    } else {
      // Get markets for the specific selected day
      allMarkets = (markets[selectedDay] || []).map(market => ({
        ...market,
        day: selectedDay
      }));
    }

    // Filter by neighborhood if not "all"
    if (selectedNeighborhood !== "all") {
      allMarkets = allMarkets.filter(market => 
        market.neighborhood === selectedNeighborhood
      );
    }

    // Add distance calculation if user coordinates are available
    if (userCoordinates) {
      allMarkets = allMarkets.map(market => ({
        ...market,
        distance: calculateDistance(
          userCoordinates.lat,
          userCoordinates.lng,
          market.lat,
          market.lng
        )
      }));

      // Sort by distance
      allMarkets.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return allMarkets;
  }, [selectedDay, selectedNeighborhood, userCoordinates]);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getDayDisplayName = (day: string) => {
    return dayNames[day as keyof typeof dayNames] || day;
  };

  const getNeighborhoodDisplayName = (neighborhood: string) => {
    if (neighborhood === "all") return "Todos los barrios";
    return neighborhood.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div>
      {/* Filter Info */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <span className="font-medium">Día:</span>
            <span className="px-2 py-1 bg-gray-100 rounded-md">
              {getDayDisplayName(selectedDay)}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span className="font-medium">Barrio:</span>
            <span className="px-2 py-1 bg-gray-100 rounded-md">
              {getNeighborhoodDisplayName(selectedNeighborhood)}
            </span>
          </span>
          {userCoordinates && (
            <span className="flex items-center gap-1">
              <span className="font-medium">Ordenado por:</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                Distancia
              </span>
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {filteredMarkets.length} {filteredMarkets.length === 1 ? 'feria encontrada' : 'ferias encontradas'}
        </p>
      </div>

      {/* Markets Grid */}
      {filteredMarkets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
          {filteredMarkets.map((market, index) => (
            <MarketCard key={`${market.name}-${market.location}-${index}`} market={market} day={market.day} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <svg 
              className="w-16 h-16 text-gray-300 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron ferias
            </h3>
            <p className="text-gray-500">
              Intenta cambiar el día o el barrio seleccionado
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketsCardGrid;
