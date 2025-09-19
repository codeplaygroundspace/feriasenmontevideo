import { notFound } from "next/navigation";
import { getMarketWithDay, getRelatedMarkets } from "@/lib/market-utils";
import MarketPage from "@/components/MarketPage";
import StructuredData from "@/components/StructuredData";

interface MarketPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const { getAllMarketSlugs } = await import("@/lib/market-utils");
  const slugs = getAllMarketSlugs();
  
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: MarketPageProps) {
  const { slug } = await params;
  const marketWithDay = getMarketWithDay(slug);
  
  if (!marketWithDay) {
    return {
      title: "Mercado no encontrado - Ferias en Montevideo",
      description: "El mercado que buscas no existe.",
    };
  }
  
  const neighborhoodName = marketWithDay.neighborhood.replace(/-/g, " ");
  const dayName = marketWithDay.day ? marketWithDay.day.charAt(0).toUpperCase() + marketWithDay.day.slice(1) : "";
  
  return {
    title: `${marketWithDay.name} - ${neighborhoodName} | Ferias en Montevideo`,
    description: `Información completa sobre ${marketWithDay.name} en ${marketWithDay.location}, barrio ${neighborhoodName}, Montevideo. Horario: ${marketWithDay.beginningTime} - ${marketWithDay.endTime}. Mercado callejero tradicional.`,
    keywords: `${marketWithDay.name}, feria ${neighborhoodName}, mercado ${neighborhoodName}, ferias montevideo, ${dayName} montevideo, productos locales`,
    alternates: {
      canonical: `/feria/${slug}`,
    },
    openGraph: {
      title: `${marketWithDay.name} - ${neighborhoodName} | Ferias en Montevideo`,
      description: `Ubicado en ${marketWithDay.location}, barrio ${neighborhoodName}. Horario: ${marketWithDay.beginningTime} - ${marketWithDay.endTime}`,
      type: "website",
      url: `https://feriasdemontevideo.com/feria/${slug}`,
      siteName: "Ferias en Montevideo",
      locale: "es_UY",
      images: marketWithDay.imageUrl ? [
        {
          url: marketWithDay.imageUrl,
          width: 1200,
          height: 630,
          alt: `Imagen de ${marketWithDay.name}`,
        },
      ] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${marketWithDay.name} - ${neighborhoodName} | Ferias en Montevideo`,
      description: `Ubicado en ${marketWithDay.location}, barrio ${neighborhoodName}. Horario: ${marketWithDay.beginningTime} - ${marketWithDay.endTime}`,
      images: marketWithDay.imageUrl ? [marketWithDay.imageUrl] : undefined,
    },
  };
}

export default async function MarketPageRoute({ params }: MarketPageProps) {
  const { slug } = await params;
  const marketWithDay = getMarketWithDay(slug);
  
  if (!marketWithDay) {
    notFound();
  }
  
  const relatedMarkets = getRelatedMarkets(marketWithDay, marketWithDay.day);

  return (
    <>
      <StructuredData market={marketWithDay} day={marketWithDay.day} />
      <MarketPage 
        market={marketWithDay} 
        day={marketWithDay.day} 
        relatedMarkets={relatedMarkets}
      />
    </>
  );
}
