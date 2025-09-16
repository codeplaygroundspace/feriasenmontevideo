import { notFound } from "next/navigation";
import { markets } from "@/data";
import { dayNames } from "@/data/days";
import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";

interface DayPageProps {
  params: Promise<{
    day: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(dayNames).map((day) => ({
    day,
  }));
}

export async function generateMetadata({ params }: DayPageProps): Promise<Metadata> {
  const { day } = await params;
  const dayName = dayNames[day as keyof typeof dayNames];
  const dayMarkets = markets[day as keyof typeof markets] || [];
  
  if (!dayName || dayMarkets.length === 0) {
    return {
      title: "Día no encontrado - Ferias de Montevideo",
      description: "No hay ferias disponibles para este día.",
    };
  }
  
  const neighborhoods = Array.from(new Set(dayMarkets.map(market => market.neighborhood)));
  
  return {
    title: `Ferias los ${dayName} - Montevideo | Ferias de Montevideo`,
    description: `Descubre todas las ferias y mercados callejeros que funcionan los ${dayName} en Montevideo. ${dayMarkets.length} ferias en ${neighborhoods.length} barrios diferentes.`,
    keywords: `ferias ${dayName}, mercados ${dayName}, ferias montevideo ${dayName}, productos locales ${dayName}`,
    alternates: {
      canonical: `/dia/${day}`,
    },
    openGraph: {
      title: `Ferias los ${dayName} - Montevideo`,
      description: `${dayMarkets.length} ferias y mercados callejeros los ${dayName} en Montevideo.`,
      type: "website",
      url: `https://feriasdemontevideo.com/dia/${day}`,
      siteName: "Ferias de Montevideo",
      locale: "es_UY",
    },
  };
}

export default async function DayPage({ params }: DayPageProps) {
  const { day } = await params;
  const dayName = dayNames[day as keyof typeof dayNames];
  const dayMarkets = markets[day as keyof typeof markets] || [];
  
  if (!dayName || dayMarkets.length === 0) {
    notFound();
  }
  
  const neighborhoods = Array.from(new Set(dayMarkets.map(market => market.neighborhood)));

  const breadcrumbItems = [
    { label: "Feria", href: "/" },
    { label: dayName }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          Ferias los {dayName}
        </h1>
        <p className="text-muted-foreground text-lg">
          {dayMarkets.length} ferias y mercados callejeros los {dayName} en Montevideo.
        </p>
        <p className="text-muted-foreground">
          Ferias en {neighborhoods.length} barrios: {neighborhoods.map(neighborhood => neighborhood.replace(/-/g, " ")).join(", ")}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {neighborhoods.map(neighborhood => {
          const neighborhoodMarkets = dayMarkets.filter(market => market.neighborhood === neighborhood);
          return (
            <div key={neighborhood} className="space-y-4">
              <h2 className="text-xl font-semibold capitalize">
                {neighborhood.replace(/-/g, " ")}
              </h2>
              <div className="space-y-3">
                {neighborhoodMarkets.map(market => (
                  <div key={market.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-medium mb-2">{market.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{market.location}</p>
                    <p className="text-sm font-mono text-muted-foreground">
                      {market.beginningTime} - {market.endTime}
                    </p>
                    <a 
                      href={`/feria/${market.id}`}
                      className="text-primary text-sm hover:underline"
                    >
                      Ver detalles →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
