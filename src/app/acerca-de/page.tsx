import { Metadata } from "next";
import { Info, MapPin, Calendar, Search, Heart, MessageSquare } from "lucide-react";
import FeedbackButton from "./FeedbackButton";

export const metadata: Metadata = {
  title: "Acerca de - Ferias de Montevideo | Plataforma de Mercados Callejeros",
  description: "Descubre la historia y propósito de Ferias de Montevideo. Una plataforma digital que conecta a los montevideanos con los productores locales y facilita el acceso a productos frescos y artesanales.",
  keywords: "acerca de, ferias montevideo, mercados callejeros, productores locales, cultura montevideana, plataforma digital",
  alternates: {
    canonical: "/acerca-de",
  },
  openGraph: {
    title: "Acerca de Ferias de Montevideo",
    description: "Descubre la historia y propósito de esta plataforma que conecta a los montevideanos con los productores locales.",
    type: "website",
    url: "https://feriasdemontevideo.com/acerca-de",
    siteName: "Ferias de Montevideo",
    locale: "es_UY",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Main About Information */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight">
          ¿Qué es Ferias de Montevideo?
          </h1>
        </div>          
          
          {/* Main Description */}
          <div className="text-center space-y-4">
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Ferias de Montevideo es una plataforma digital que te ayuda a descubrir y explorar 
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
  );
}
