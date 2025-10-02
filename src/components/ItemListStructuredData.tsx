interface Market {
  id: string;
  name: string;
  location: string;
  neighborhood: string;
  lat: number;
  lng: number;
  beginningTime: string;
  endTime: string;
}

interface ItemListStructuredDataProps {
  markets: Market[];
  title: string;
  description: string;
  url: string;
}

const ItemListStructuredData = ({ markets, title, description, url }: ItemListStructuredDataProps) => {
  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "description": description,
    "url": url,
    "numberOfItems": markets.length,
    "itemListElement": markets.map((market, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "LocalBusiness",
        "name": market.name,
        "description": `Mercado callejero en ${market.location}, barrio ${market.neighborhood.replace(/-/g, " ")}, Montevideo.`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": market.location,
          "addressLocality": "Montevideo",
          "addressRegion": "Montevideo",
          "addressCountry": "UY"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": market.lat,
          "longitude": market.lng
        },
        "url": `https://feriasdemontevideo.com/feria/${market.id}`,
        "openingHours": `${market.beginningTime}-${market.endTime}`
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(itemListData)
      }}
    />
  );
};

export default ItemListStructuredData;

