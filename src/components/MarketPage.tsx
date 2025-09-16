"use client";

import Link from "next/link";
import type { Market } from "@/data";
import { getDayName, getDayCardColor } from "@/data/days";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Navigation, Instagram, ExternalLink } from "lucide-react";

interface MarketPageProps {
  market: Market;
  day: string;
  relatedMarkets: Market[];
}

const MarketPage: React.FC<MarketPageProps> = ({ market, day, relatedMarkets }) => {
  // Safety check for market data
  if (!market) {
    return (
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Mercado no encontrado</h1>
          <p className="text-muted-foreground">
            No se pudo cargar la información del mercado.
          </p>
        </div>
      </div>
    );
  }

  const formatDistance = (distance?: number) => {
    if (!distance) return null;
    return distance < 1 
      ? `${Math.round(distance * 1000)}m` 
      : `${distance.toFixed(1)}km`;
  };

  const handleDirectionsClick = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${market.lat},${market.lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <>
          {/* Main Market Information */}
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl sm:text-3xl leading-tight mb-2">
                    {market.name}
                  </CardTitle>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {day && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDayCardColor(day)}`}>
                      <Calendar className="h-4 w-4 inline mr-1" />
                      {getDayName(day)}
                    </span>
                  )}
                  <Button
                    onClick={handleDirectionsClick}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Navigation className="h-4 w-4" />
                    Cómo llegar
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Market Image */}
              {market.imageUrl && (
                <div className="w-full">
                  <img
                    src={market.imageUrl}
                    alt={`Imagen de ${market.name}`}
                    className="w-full h-64 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {/* Location Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                      <p className="text-muted-foreground">{market.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0">
                      <svg 
                        className="w-5 h-5" 
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
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Barrio</h3>
                      <p className="text-muted-foreground capitalize">
                        {market.neighborhood.replace(/-/g, " ")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0">
                      <svg 
                        className="w-5 h-5" 
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
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Horario</h3>
                      <p className="text-muted-foreground">
                        {market.beginningTime} - {market.endTime}
                      </p>
                    </div>
                  </div>

                  {market.distance && (
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0">
                        <svg 
                          className="w-5 h-5" 
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
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Distancia</h3>
                        <p className="text-muted-foreground">{formatDistance(market.distance)}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Información del Mercado</h3>
                    <p className="text-sm text-muted-foreground">
                      Este es un mercado callejero tradicional de Montevideo. 
                      Los horarios pueden variar según las condiciones climáticas y eventos especiales.
                    </p>
                  </div>
                  
                  {/* Social Media Links */}
                  {(market.instagramUrl || market.tripAdvisorUrl) && (
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Enlaces útiles</h3>
                      <div className="flex flex-wrap gap-2">
                        {market.instagramUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => window.open(market.instagramUrl, '_blank')}
                          >
                            <Instagram className="h-4 w-4" />
                            Instagram
                          </Button>
                        )}
                        {market.tripAdvisorUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => window.open(market.tripAdvisorUrl, '_blank')}
                          >
                            <ExternalLink className="h-4 w-4" />
                            TripAdvisor
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Markets */}
          {relatedMarkets && relatedMarkets.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Otras ferias</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedMarkets.map((relatedMarket) => (
                  <Link
                    key={relatedMarket.id}
                    href={`/market/${relatedMarket.id}`}
                    className="block"
                  >
                    <Card className="hover:shadow-md transition-shadow duration-200">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base leading-tight">
                          {relatedMarket.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground">
                            {relatedMarket.location}
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <svg 
                            className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" 
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
                          <p className="text-sm text-muted-foreground">
                            {relatedMarket.beginningTime} - {relatedMarket.endTime}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground capitalize">
                          {relatedMarket.neighborhood.replace(/-/g, " ")}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
    </>
  );
};

export default MarketPage;
