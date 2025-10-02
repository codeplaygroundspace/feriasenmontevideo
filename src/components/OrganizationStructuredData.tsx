const OrganizationStructuredData = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ferias en Montevideo",
    "alternateName": "Ferias MVD",
    "url": "https://feriasdemontevideo.com",
    "logo": "https://feriasdemontevideo.com/icon-512.svg",
    "description": "Plataforma digital que conecta a los montevideanos con los mercados callejeros y ferias de la ciudad. Información completa sobre ubicaciones, horarios y productos locales.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Montevideo",
      "addressRegion": "Montevideo",
      "addressCountry": "UY"
    },
    "areaServed": {
      "@type": "City",
      "name": "Montevideo",
      "addressCountry": "UY"
    },
    "sameAs": [
      "https://github.com/codeplaygroundspace/feriasdemontevideo"
    ]
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ferias en Montevideo",
    "url": "https://feriasdemontevideo.com",
    "description": "Descubre los mercados callejeros y ferias de Montevideo, Uruguay. Información completa sobre ubicaciones, horarios y productos locales.",
    "inLanguage": "es-UY",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://feriasdemontevideo.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData)
        }}
      />
    </>
  );
};

export default OrganizationStructuredData;

