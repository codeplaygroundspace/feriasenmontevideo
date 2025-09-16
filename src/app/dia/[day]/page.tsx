import { notFound } from "next/navigation";
import { markets } from "@/data";
import { dayNames } from "@/data/days";
import Breadcrumb from "@/components/Breadcrumb";
import MarketCard from "@/components/MarketCard";
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
        {dayMarkets.map((market, index) => {
          // Create market object with day property
          const marketWithDay = {
            ...market,
            day: day
          };
          
          return (
            <MarketCard 
              key={`${market.name}-${market.location}-${index}`} 
              market={marketWithDay} 
              day={day} 
            />
          );
        })}
      </div>
    </div>
  );
}
