"use client";

import type { Market } from "@/data";
import { getDayName, getDayCardColor } from "@/data/days";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MarketCardProps {
  market: Market;
}

const MarketCard: React.FC<MarketCardProps> = ({ market }) => {
  const formatDistance = (distance?: number) => {
    if (!distance) return null;
    return distance < 1 
      ? `${Math.round(distance * 1000)}m` 
      : `${distance.toFixed(1)}km`;
  };


  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-tight">
            {market.name}
          </CardTitle>
          {market.day && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDayCardColor(market.day)}`}>
              {getDayName(market.day)}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Location */}
        <div className="flex items-start gap-2">
          <svg 
            className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <div>
            <p className="text-sm text-gray-600 font-medium">Ubicación</p>
            <p className="text-sm text-gray-800">{market.location}</p>
          </div>
        </div>

        {/* Neighborhood */}
        <div className="flex items-start gap-2">
          <svg 
            className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
            />
          </svg>
          <div>
            <p className="text-sm text-gray-600 font-medium">Barrio</p>
            <p className="text-sm text-gray-800 capitalize">
              {market.neighborhood.replace(/-/g, " ")}
            </p>
          </div>
        </div>

        {/* Distance (if available) */}
        {market.distance && (
          <div className="flex items-start gap-2">
            <svg 
              className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
              />
            </svg>
            <div>
              <p className="text-sm text-gray-600 font-medium">Distancia</p>
              <p className="text-sm text-gray-800">{formatDistance(market.distance)}</p>
            </div>
          </div>
        )}

        {/* Coordinates (for debugging/development) */}
        <div className="text-xs text-gray-400 pt-3 border-t border-gray-100">
          <span className="font-mono">
            {market.lat.toFixed(4)}, {market.lng.toFixed(4)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketCard;
