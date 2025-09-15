import { notFound } from "next/navigation";
import { getMarketWithDay, getRelatedMarkets } from "@/lib/market-utils";
import MarketPage from "@/components/MarketPage";

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
      title: "Mercado no encontrado",
      description: "El mercado que buscas no existe.",
    };
  }
  
  return {
    title: `${marketWithDay.name} - Ferias de Montevideo`,
    description: `Información completa sobre ${marketWithDay.name} en ${marketWithDay.location}, barrio ${marketWithDay.neighborhood.replace(/-/g, " ")}. Mercado callejero de Montevideo.`,
    openGraph: {
      title: `${marketWithDay.name} - Ferias de Montevideo`,
      description: `Ubicado en ${marketWithDay.location}, barrio ${marketWithDay.neighborhood.replace(/-/g, " ")}`,
      type: "website",
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
    <MarketPage 
      market={marketWithDay} 
      day={marketWithDay.day} 
      relatedMarkets={relatedMarkets}
    />
  );
}
