"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Market } from "@/data";
import { getDayName, getDayCardColor } from "@/data/days";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Calendar, Navigation, Share2, Heart } from "lucide-react";

interface MarketPageProps {
  market: Market;
  day: string;
  relatedMarkets: Market[];
}

const MarketPage: React.FC<MarketPageProps> = ({ market, day, relatedMarkets }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  // Safety check for market data
  if (!market) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="space-y-2">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold">Mercado no encontrado</h1>
            <p className="text-muted-foreground">
              No se pudo cargar la información del mercado.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button onClick={() => router.back()} className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </div>
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

  const handleBackClick = () => {
    router.back();
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: market.name,
        text: `Mira este mercado en ${market.location}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could add a toast notification here
    }
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    // You could implement actual favorite functionality here
  };

  const handleDirectionsClick = () => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${market.lat},${market.lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-lg font-semibold">Detalles del Mercado</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFavoriteClick}
                className={isFavorite ? "text-red-500" : ""}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShareClick}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Main Market Information */}
          <Card className="mb-8">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl sm:text-3xl leading-tight mb-2">
                    {market.name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{market.location}</span>
                  </div>
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
                    <h3 className="font-semibold text-foreground mb-2">Coordenadas</h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      {market.lat.toFixed(6)}, {market.lng.toFixed(6)}
                    </p>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Información del Mercado</h3>
                    <p className="text-sm text-muted-foreground">
                      Este es un mercado callejero tradicional de Montevideo. 
                      Los horarios pueden variar según las condiciones climáticas y eventos especiales.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Markets */}
          {relatedMarkets && relatedMarkets.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Mercados Relacionados</h2>
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
        </div>
      </div>
    </div>
  );
};

export default MarketPage;
