import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-2">
          <MapPin className="h-16 w-16 text-muted-foreground mx-auto" />
          <h1 className="text-2xl font-bold">Mercado no encontrado</h1>
          <p className="text-muted-foreground">
            El mercado que buscas no existe o ha sido movido.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a las Ferias
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground">
            ¿Buscas un mercado específico?{" "}
            <Link href="/" className="text-primary hover:underline">
              Explora todos los mercados disponibles
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
