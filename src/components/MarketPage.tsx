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
import { MapPin, Calendar, Navigation, Instagram, ExternalLink, Map } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import MarketCard from "./MarketCard";

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

  const breadcrumbItems = [
    { label: "Feria", href: "/" },
    { 
      label: market.neighborhood.replace(/-/g, " "), 
      href: `/barrio/${market.neighborhood}` 
    },
    { label: market.name }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Main Market Information */}
      <Card className="mb-8">
            <CardHeader className="pb-6">
              {/* Market Title and Day - Desktop Layout */}
              <div className="hidden md:flex md:items-start md:justify-between md:gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-2xl sm:text-3xl leading-tight">
                    {market.name}
                  </CardTitle>
                  {day && (
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDayCardColor(day)} opacity-75`}>
                      {getDayName(day)}
                    </span>
                  )}
                </div>
                
                {/* Action Button - Desktop (Right Side) */}
                <Button
                  onClick={handleDirectionsClick}
                  className="flex items-center gap-2 flex-shrink-0"
                  size="sm"
                >
                  <Navigation className="h-4 w-4" />
                  Cómo llegar
                </Button>
              </div>

              {/* Market Title and Day - Mobile Layout */}
              <div className="md:hidden mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <CardTitle className="text-2xl sm:text-3xl leading-tight">
                    {market.name}
                  </CardTitle>
                  {day && (
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDayCardColor(day)} opacity-75`}>
                      {getDayName(day)}
                    </span>
                  )}
                </div>
                
                {/* Action Button - Mobile (Below) */}
                <div className="flex justify-start">
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
            
            <CardContent className="space-y-8">
              {/* Market Image */}
              {market.imageUrl && (
                <div className="w-full">
                  <img
                    src={market.imageUrl}
                    alt={`Imagen de ${market.name} - Mercado callejero en ${market.location}, barrio ${market.neighborhood.replace(/-/g, " ")}, Montevideo`}
                    className="w-full h-72 object-cover rounded-xl shadow-sm"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              {/* Essential Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Neighborhood */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-primary mt-0.5 flex-shrink-0">
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
                      <p className="text-muted-foreground text-sm capitalize">
                        {market.neighborhood.replace(/-/g, " ")}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Location */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{market.location}</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-primary mt-0.5 flex-shrink-0">
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
                      <p className="text-muted-foreground text-sm font-mono">
                        {market.beginningTime} - {market.endTime}
                      </p>
                      {market.distance && (
                        <p className="text-xs text-muted-foreground mt-1">
                          A {formatDistance(market.distance)} de tu ubicación
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                

              </div>
              
              {/* Market Description and Social Links */}
              <div className="space-y-6">
                {/* Market Description */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3 text-lg">Sobre este mercado</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Este es un mercado callejero tradicional de Montevideo ubicado en el barrio{" "}
                    <Link 
                      href={`/barrio/${market.neighborhood}`}
                      className="text-primary hover:underline"
                    >
                      {market.neighborhood.replace(/-/g, " ")}
                    </Link>
                    . Los horarios pueden variar según las condiciones climáticas y eventos especiales.
                    {" "}Descubre más{" "}
                    <Link 
                      href={`/dia/${day}`}
                      className="text-primary hover:underline"
                    >
                      ferias los {getDayName(day)}
                    </Link>
                    {" "}en Montevideo.
                  </p>
                </div>
                
                {/* Social Media Links */}
                {(market.instagramUrl || market.tripAdvisorUrl || market.googleMapURL) && (
                  <div className="flex flex-wrap gap-3">
                    {market.googleMapURL && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => window.open(market.googleMapURL, '_blank')}
                      >
                        <Map className="h-4 w-4" />
                        Ver en Google Maps
                      </Button>
                    )}
                    {market.instagramUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => window.open(market.instagramUrl, '_blank')}
                      >
                        <Instagram className="h-4 w-4" />
                        Ver en Instagram
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
                        Ver en TripAdvisor
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Related Markets */}
          {relatedMarkets && relatedMarkets.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Otras ferias</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedMarkets.map((relatedMarket) => (
                  <MarketCard
                    key={relatedMarket.id}
                    market={relatedMarket}
                    day={day}
                  />
                ))}
              </div>
            </div>
          )}
    </div>
  );
};

export default MarketPage;
