import { notFound } from "next/navigation";
import { markets } from "@/data";
import { dayNames } from "@/data/days";
import MarketCard from "@/components/MarketCard";
import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";

interface NeighborhoodPageProps {
  params: Promise<{
    neighborhood: string;
  }>;
}

export async function generateStaticParams() {
  const neighborhoods = Array.from(new Set(
    Object.values(markets).flat().map(market => market.neighborhood)
  ));
  
  return neighborhoods.map((neighborhood) => ({
    neighborhood,
  }));
}

export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  const { neighborhood } = await params;
  const neighborhoodName = neighborhood.replace(/-/g, " ");
  const neighborhoodMarkets = Object.values(markets).flat().filter(
    market => market.neighborhood === neighborhood
  );
  
  if (neighborhoodMarkets.length === 0) {
    return {
      title: "Barrio no encontrado - Ferias en Montevideo",
      description: "El barrio que buscas no tiene ferias registradas.",
    };
  }
  
  const daysWithMarkets = Object.keys(dayNames).filter(day => 
    markets[day as keyof typeof markets]?.some(market => market.neighborhood === neighborhood)
  );
  
  return {
    title: `Ferias en ${neighborhoodName} - Barrio de Montevideo | Ferias en Montevideo`,
    description: `Descubre todas las ferias y mercados callejeros en el barrio ${neighborhoodName}, Montevideo. ${neighborhoodMarkets.length} ferias disponibles los ${daysWithMarkets.map(day => dayNames[day as keyof typeof dayNames]).join(", ")}.`,
    keywords: `ferias ${neighborhoodName}, mercados ${neighborhoodName}, barrio ${neighborhoodName}, ferias montevideo, productos locales ${neighborhoodName}`,
    alternates: {
      canonical: `/barrio/${neighborhood}`,
    },
    openGraph: {
      title: `Ferias en ${neighborhoodName} - Barrio de Montevideo`,
      description: `${neighborhoodMarkets.length} ferias y mercados callejeros en ${neighborhoodName}, Montevideo.`,
      type: "website",
      url: `https://feriasdemontevideo.com/barrio/${neighborhood}`,
      siteName: "Ferias en Montevideo",
      locale: "es_UY",
    },
  };
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const { neighborhood } = await params;
  const neighborhoodName = neighborhood.replace(/-/g, " ");
  const neighborhoodMarkets = Object.values(markets).flat().filter(
    market => market.neighborhood === neighborhood
  );
  
  if (neighborhoodMarkets.length === 0) {
    notFound();
  }
  
  const daysWithMarkets = Object.keys(dayNames).filter(day => 
    markets[day as keyof typeof markets]?.some(market => market.neighborhood === neighborhood)
  );

  const breadcrumbItems = [
    { label: "Feria", href: "/" },
    { label: neighborhoodName }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Ferias en {neighborhoodName}
        </h1>
        <p className="text-muted-foreground text-lg">
          {neighborhoodMarkets.length} ferias y mercados callejeros en el barrio {neighborhoodName}, Montevideo.
        </p>
        <p className="text-muted-foreground">
          Ferias disponibles los: {daysWithMarkets.map(day => dayNames[day as keyof typeof dayNames]).join(", ")}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoodMarkets.map((market, index) => {
          // Find which day this market belongs to
          const marketDay = Object.keys(markets).find(day => 
            markets[day as keyof typeof markets]?.some(m => m.id === market.id)
          ) || 'all';
          
          // Create market object with day property
          const marketWithDay = {
            ...market,
            day: marketDay
          };
          
          return (
            <MarketCard 
              key={`${market.name}-${market.location}-${index}`} 
              market={marketWithDay} 
              day={marketDay} 
            />
          );
        })}
      </div>
    </div>
  );
}
