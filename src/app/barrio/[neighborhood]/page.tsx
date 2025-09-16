import { notFound } from "next/navigation";
import Link from "next/link";
import { markets } from "@/data";
import { dayNames } from "@/data/days";
import MarketsCardGrid from "@/components/MarketsCardGrid";
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
      title: "Barrio no encontrado - Ferias de Montevideo",
      description: "El barrio que buscas no tiene ferias registradas.",
    };
  }
  
  const daysWithMarkets = Object.keys(dayNames).filter(day => 
    markets[day as keyof typeof markets]?.some(market => market.neighborhood === neighborhood)
  );
  
  return {
    title: `Ferias en ${neighborhoodName} - Barrio de Montevideo | Ferias de Montevideo`,
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
      siteName: "Ferias de Montevideo",
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
        {daysWithMarkets.map(day => {
          const dayMarkets = markets[day as keyof typeof markets]?.filter(market => market.neighborhood === neighborhood) || [];
          return (
            <div key={day} className="space-y-4">
              <h2 className="text-xl font-semibold">{dayNames[day as keyof typeof dayNames]}</h2>
              <div className="space-y-3">
                {dayMarkets.map(market => (
                  <Link
                    key={market.id}
                    href={`/feria/${market.id}`}
                    className="block"
                  >
                    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <h3 className="font-medium mb-2">{market.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{market.location}</p>
                      <p className="text-sm font-mono text-muted-foreground">
                        {market.beginningTime} - {market.endTime}
                      </p>
                      <span className="text-primary text-sm hover:underline">
                        Ver detalles →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
