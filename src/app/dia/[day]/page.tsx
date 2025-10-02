import { notFound } from "next/navigation";
import { markets } from "@/data";
import { dayNames } from "@/data/days";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";
import ItemListStructuredData from "@/components/ItemListStructuredData";
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
  
  let dayMarkets: any[] = [];
  if (day === 'all') {
    // Get all markets from all days
    dayMarkets = Object.values(markets).flat();
  } else {
    dayMarkets = markets[day as keyof typeof markets] || [];
  }
  
  if (!dayName || dayMarkets.length === 0) {
    return {
      title: "Día no encontrado - Ferias en Montevideo",
      description: "No hay ferias disponibles para este día.",
    };
  }
  
  const neighborhoods = Array.from(new Set(dayMarkets.map(market => market.neighborhood)));
  
  const isAllDays = day === 'all';
  const titleText = isAllDays ? 'Todas las Ferias' : `Ferias los ${dayName}`;
  const descriptionText = isAllDays 
    ? `Descubre todas las ferias y mercados callejeros de Montevideo. ${dayMarkets.length} ferias en ${neighborhoods.length} barrios diferentes.`
    : `Descubre todas las ferias y mercados callejeros que funcionan los ${dayName} en Montevideo. ${dayMarkets.length} ferias en ${neighborhoods.length} barrios diferentes.`;
  const keywordsText = isAllDays 
    ? 'ferias montevideo, mercados montevideo, ferias todos los dias, productos locales'
    : `ferias ${dayName}, mercados ${dayName}, ferias montevideo ${dayName}, productos locales ${dayName}`;

  return {
    title: `${titleText} - Montevideo | Ferias en Montevideo`,
    description: descriptionText,
    keywords: keywordsText,
    alternates: {
      canonical: `/dia/${day}`,
    },
    openGraph: {
      title: `${titleText} - Montevideo`,
      description: `${dayMarkets.length} ferias y mercados callejeros ${isAllDays ? 'en Montevideo' : `los ${dayName} en Montevideo`}.`,
      type: "website",
      url: `https://feriasdemontevideo.com/dia/${day}`,
      siteName: "Ferias en Montevideo",
      locale: "es_UY",
    },
  };
}

export default async function DayPage({ params }: DayPageProps) {
  const { day } = await params;
  const dayName = dayNames[day as keyof typeof dayNames];
  
  let dayMarkets: any[] = [];
  if (day === 'all') {
    // Get all markets from all days
    dayMarkets = Object.values(markets).flat();
  } else {
    dayMarkets = markets[day as keyof typeof markets] || [];
  }
  
  if (!dayName || dayMarkets.length === 0) {
    notFound();
  }
  
  const neighborhoods = Array.from(new Set(dayMarkets.map(market => market.neighborhood)));

  const breadcrumbItems = [
    { label: "Feria", href: "/" },
    { label: dayName }
  ];

  const breadcrumbStructuredItems = [
    { name: "Inicio", url: "https://feriasdemontevideo.com" },
    { name: dayName, url: `https://feriasdemontevideo.com/dia/${day}` }
  ];

  const isAllDays = day === 'all';
  const pageTitle = isAllDays ? 'Todas las Ferias' : `Ferias los ${dayName}`;

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbStructuredItems} />
      <ItemListStructuredData 
        markets={dayMarkets}
        title={pageTitle}
        description={`${dayMarkets.length} ferias y mercados callejeros ${isAllDays ? 'en Montevideo' : `los ${dayName} en Montevideo`}.`}
        url={`https://feriasdemontevideo.com/dia/${day}`}
      />
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {day === 'all' ? 'Todas las Ferias' : `Ferias los ${dayName}`}
        </h1>
        <p className="text-muted-foreground text-lg">
          {dayMarkets.length} ferias y mercados callejeros {day === 'all' ? 'en Montevideo' : `los ${dayName} en Montevideo`}.
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
    </>
  );
}
