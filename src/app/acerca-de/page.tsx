import { Metadata } from "next";
import { Info, MapPin, Calendar, Search, Heart, MessageSquare } from "lucide-react";
import FeedbackButton from "./FeedbackButton";
import BreadcrumbStructuredData from "@/components/BreadcrumbStructuredData";

export const metadata: Metadata = {
  title: "Acerca de Ferias en Montevideo - Plataforma de Mercados Callejeros",
  description: "Descubre la historia y propósito de Ferias en Montevideo. Una plataforma digital gratuita que conecta a los montevideanos con los productores locales y facilita el acceso a productos frescos y artesanales. Información actualizada sobre más de 100 ferias vecinales.",
  keywords: [
    "acerca de ferias montevideo",
    "plataforma mercados callejeros",
    "productores locales uruguay",
    "cultura montevideana",
    "ferias vecinales",
    "mercados de barrio",
    "productos frescos montevideo"
  ],
  alternates: {
    canonical: "/acerca-de",
  },
  openGraph: {
    title: "Acerca de Ferias en Montevideo - Conectando con Productores Locales",
    description: "Plataforma digital gratuita con información actualizada sobre más de 100 ferias y mercados callejeros en Montevideo. Encuentra productos frescos y artesanales en tu barrio.",
    type: "website",
    url: "https://feriasdemontevideo.com/acerca-de",
    siteName: "Ferias en Montevideo",
    locale: "es_UY",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Acerca de Ferias en Montevideo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acerca de Ferias en Montevideo",
    description: "Plataforma digital gratuita con información actualizada sobre ferias y mercados callejeros en Montevideo.",
    images: ['/og-image.jpg'],
  },
};

export default function AboutPage() {
  const breadcrumbItems = [
    { name: "Inicio", url: "https://feriasdemontevideo.com" },
    { name: "Acerca de", url: "https://feriasdemontevideo.com/acerca-de" }
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es Ferias en Montevideo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ferias en Montevideo es una plataforma digital que te ayuda a descubrir y explorar todas las ferias y mercados callejeros de la ciudad. Nuestro objetivo es conectar a los montevideanos con los productores locales y facilitar el acceso a productos frescos y artesanales."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo funciona la plataforma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Utilizamos datos oficiales y actualizados de las ferias de Montevideo para brindarte información precisa sobre ubicaciones, horarios y días de funcionamiento. Puedes filtrar por día para planificar tus visitas o explorar por barrio para encontrar ferias cerca de ti."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué crearon esta plataforma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Creemos que las ferias son una parte fundamental de la cultura montevideana y una excelente manera de apoyar a los productores locales. Queremos hacer que sea más fácil para todos descubrir y disfrutar de estos espacios únicos de la ciudad."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué puedo hacer en la plataforma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Puedes explorar todas las ferias disponibles en Montevideo, filtrar por día de la semana y barrio, ver la ubicación exacta de cada feria en el mapa, encontrar ferias cerca de tu ubicación, conocer horarios y detalles de cada mercado, y obtener direcciones para llegar fácilmente."
        }
      }
    ]
  };

  return (
    <>
      <BreadcrumbStructuredData items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />
      <div className="space-y-8">
      {/* Main About Information */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
          ¿Qué es Ferias en Montevideo?
          </h1>
        </div>          
          
          {/* Main Description */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Ferias en Montevideo es una plataforma digital que te ayuda a descubrir y explorar 
              todas las ferias y mercados callejeros de la ciudad. Nuestro objetivo es conectar 
              a los montevideanos con los productores locales y facilitar el acceso a productos 
              frescos y artesanales.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Explore Markets */}
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Explorar Ferias</h3>
              <p className="text-muted-foreground text-sm">
                Descubre todas las ferias disponibles en Montevideo con información detallada sobre ubicación, horarios y días de funcionamiento.
              </p>
            </div>

            {/* Filter by Location */}
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Filtrar por Ubicación</h3>
              <p className="text-muted-foreground text-sm">
                Encuentra ferias cerca de ti filtrando por barrio o día de la semana. Planifica tus visitas de manera fácil y eficiente.
              </p>
            </div>

            {/* View on Map */}
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ver en Mapa</h3>
              <p className="text-muted-foreground text-sm">
                Visualiza la ubicación exacta de cada feria en el mapa interactivo y obtén direcciones para llegar fácilmente.
              </p>
            </div>
          </div>

          {/* Why We Created This */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold mb-4">¿Por qué creamos esta plataforma?</h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Creemos que las ferias son una parte fundamental de la cultura montevideana y 
                una excelente manera de apoyar a los productores locales. Queremos hacer que 
                sea más fácil para todos descubrir y disfrutar de estos espacios únicos de la ciudad.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">¿Cómo funciona?</h2>
            <div className="bg-muted/30 rounded-lg p-6">
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos datos oficiales y actualizados de las ferias de Montevideo para 
                brindarte información precisa sobre ubicaciones, horarios y días de funcionamiento. 
                Puedes filtrar por día para planificar tus visitas o explorar por barrio para 
                encontrar ferias cerca de ti.
              </p>
            </div>
          </div>

          {/* What You Can Do */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">¿Qué puedes hacer aquí?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Explorar todas las ferias disponibles en Montevideo</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Filtrar por día de la semana y barrio</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Ver la ubicación exacta de cada feria en el mapa</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Encontrar ferias cerca de tu ubicación</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Conocer horarios y detalles de cada mercado</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">Obtener direcciones para llegar fácilmente</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      {/* Call to Action */}
      <div className="text-center space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold">¿Tienes sugerencias o encontraste algún error?</h3>
        <p className="text-muted-foreground">
          Tu feedback es importante para nosotros. Ayúdanos a mejorar la plataforma.
        </p>
        <FeedbackButton />
      </div>
      </div>
    </>
  );
}
