import type { Market } from '@/data'

interface StructuredDataProps {
  market: Market
  day: string
}

const StructuredData: React.FC<StructuredDataProps> = ({ market, day }) => {
  const marketStructuredData = {
    "@context": "https://schema.org",
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
    "openingHours": `Mo,Tu,We,Th,Fr,Sa,Su ${market.beginningTime}-${market.endTime}`,
    "priceRange": "$$",
    "url": `https://feriasdemontevideo.com/feria/${market.id}`,
    "image": market.imageUrl,
    "sameAs": [
      ...(market.instagramUrl ? [market.instagramUrl] : []),
      ...(market.tripAdvisorUrl ? [market.tripAdvisorUrl] : [])
    ]
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://feriasdemontevideo.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Mercados",
        "item": "https://feriasdemontevideo.com"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": market.name,
        "item": `https://feriasdemontevideo.com/feria/${market.id}`
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(marketStructuredData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
    </>
  )
}

export default StructuredData
