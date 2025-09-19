"use client";

import Link from "next/link";
import Image from "next/image";
import type { Market } from "@/data";
import { getDayName, getDayCardColor } from "@/data/days";
import { ensureMarketHasId } from "@/lib/market-utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MarketCardProps {
  market: Market;
  day: string;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, day }) => {
  const formatDistance = (distance?: number) => {
    if (!distance) return null;
    return distance < 1 
      ? `${Math.round(distance * 1000)}m` 
      : `${distance.toFixed(1)}km`;
  };

  const marketWithId = ensureMarketHasId(market, day);

  return (
    <Link href={`/feria/${marketWithId.id}`} className="block">
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden">
        {/* Market Image */}
        <div className="relative w-full h-48 bg-gray-100">
          {market.imageUrl ? (
            <Image
              src={market.imageUrl}
              alt={`Imagen de ${market.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) {
                  placeholder.style.display = 'flex';
                }
              }}
            />
          ) : null}
          {/* Fallback placeholder when no image or image fails to load */}
          <div 
            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${market.imageUrl ? 'hidden' : 'flex'}`}
          >
            <div className="text-center">
              <svg 
                className="w-12 h-12 text-gray-400 mx-auto mb-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                />
              </svg>
              <p className="text-sm text-gray-500 font-medium">Feria</p>
            </div>
          </div>
        </div>

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
        
        <CardContent className="space-y-2">
        {/* Neighborhood */}
        <div className="flex items-start gap-1">
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
            <p className="text-sm text-gray-800 capitalize">
              {market.neighborhood.replace(/-/g, " ")}
            </p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-start gap-1">
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
            <p className="text-sm text-gray-800">{market.location}</p>
          </div>
        </div>

        {/* Market Hours */}
        <div className="flex items-start gap-1">
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
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <div>
            <p className="text-sm text-gray-800">
              {market.beginningTime} - {market.endTime}
            </p>
          </div>
        </div>

        {/* Distance (if available) */}
        {market.distance && (
          <div className="flex items-start gap-1">
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

      </CardContent>
    </Card>
    </Link>
  );
};

export default MarketCard;
