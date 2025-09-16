"use client";

import { useState } from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Calendar, Map, List, MessageSquare, Info } from "lucide-react";
import NeighborhoodDropdown from "@/components/NeighborhoodDropdown";
import AddressInput from "@/components/AddressInput";
import DynamicMarketsMap from "@/components/DynamicMarketsMap";
import MarketsCardGrid from "@/components/MarketsCardGrid";
import { markets } from "@/data";
import { dayNames, type Market } from "@/data";
import type { Coordinates } from "@/hooks/useAddressGeocoding";
import { useMarkets } from "@/hooks/useMarkets";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);
  const [currentView, setCurrentView] = useState<"map" | "cards">("cards");
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  // Use the markets hook
  const { hasMarketsForDay, hasMarketsForDayInNeighborhood } = useMarkets();

  const handleDayChange = (day: string, markets: Market[]) => {
    setSelectedDay(day);
    console.log(`Selected day: ${day}`, markets);
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
    
    // If the current selected day doesn't have markets in the new neighborhood,
    // automatically select the first available day
    if (!hasMarketsForDayInNeighborhood(selectedDay, neighborhood)) {
      const availableDays = Object.keys(dayNames).filter(day => 
        hasMarketsForDayInNeighborhood(day, neighborhood)
      );
      if (availableDays.length > 0) {
        setSelectedDay(availableDays[0]);
      }
    }
    
    console.log(`Selected neighborhood: ${neighborhood}`);
  };

  const handleAddressChange = (address: string, coordinates: Coordinates) => {
    setUserAddress(address);
    setUserCoordinates(coordinates);
    console.log(`User address: ${address}`, coordinates);
  };

  const handleClearAddress = () => {
    setUserAddress("");
    setUserCoordinates(null);
    console.log("Address cleared");
  };

  const handleViewChange = (view: "map" | "cards") => {
    setCurrentView(view);
    console.log(`View changed to: ${view}`);
  };

  return (
    <SidebarProvider>
      {/* Main shadcn/ui Sidebar with all functionality */}
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <MapPin className="h-6 w-6 text-primary" />
          </div>
        </SidebarHeader>

        <SidebarContent>
          {/* View Toggle Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Vista</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex items-center justify-between px-2 py-2">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  <span className="text-sm">Mapa</span>
                </div>
                <Switch
                  checked={currentView === "cards"}
                  onCheckedChange={(checked) => handleViewChange(checked ? "cards" : "map")}
                  size="sm"
                />
                <div className="flex items-center gap-2">
                  <List className="h-4 w-4" />
                  <span className="text-sm">Lista</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Address Input Section - Only show when map view is active */}
          {currentView === "map" && (
            <>
              <SidebarGroup>
                <SidebarGroupLabel>Ubicación</SidebarGroupLabel>
                <SidebarGroupContent>
                  <div className="px-2">
                    <AddressInput
                      onAddressSubmit={handleAddressChange}
                      onClearAddress={handleClearAddress}
                      currentAddress={userAddress}
                    />
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarSeparator />
            </>
          )}

          {/* Neighborhood Section */}
          <SidebarGroup>
            <SidebarGroupLabel>Barrio</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-2">
                <NeighborhoodDropdown
                  selectedNeighborhood={selectedNeighborhood}
                  onNeighborhoodChange={handleNeighborhoodChange}
                />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Days Section */}
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <span>Día de la semana</span>
              <span className="text-xs text-muted-foreground font-normal">(selecciona)</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {Object.keys(dayNames).map((day) => {
                  const hasMarkets = hasMarketsForDayInNeighborhood(day, selectedNeighborhood);
                  const isActive = selectedDay === day;
                  return (
                    <SidebarMenuItem key={day}>
                      <SidebarMenuButton
                        onClick={() => hasMarkets && handleDayChange(day, [])}
                        isActive={isActive}
                        disabled={!hasMarkets}
                        className={`
                          w-full justify-start 
                          border border-gray-200 
                          rounded-lg 
                          transition-all duration-200
                          min-h-[44px]
                          px-3 py-2
                          ${isActive 
                            ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm ring-1 ring-blue-200' 
                            : hasMarkets 
                              ? 'bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:bg-gray-100 active:scale-[0.98]' 
                              : 'opacity-50 cursor-not-allowed bg-gray-50'
                          }
                          ${hasMarkets ? 'cursor-pointer' : 'cursor-not-allowed'}
                        `}
                      >
                        <Calendar className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className="font-medium">{dayNames[day as keyof typeof dayNames]}</span>
                        {!hasMarkets && day !== 'all' && (
                          <span className="ml-auto text-xs text-muted-foreground">Sin ferias</span>
                        )}
                        {isActive && (
                          <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Feedback */}
          <SidebarGroup>
            <SidebarGroupLabel>Feedback</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className="w-full justify-start"
                    onClick={() => window.open('https://github.com/codeplaygroundspace/feriasdemontevideo', '_blank')}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Feedback</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* About */}
          <SidebarGroup>
            <SidebarGroupLabel>Información</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    className="w-full justify-start"
                    onClick={() => setShowAboutModal(true)}
                  >
                    <Info className="h-4 w-4" />
                    <span>Acerca de</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

      </Sidebar>

      {/* Main Content Area with Map/Grid */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-sidebar-border" />
          <h1 className="text-lg font-semibold">Ferias de Montevideo</h1>
        </header>

        {/* Main Content with Rounded Borders */}
        <div className="flex-1">
          <div className="h-full bg-card rounded-xl overflow-hidden m-6">
            {currentView === "map" ? (
              <DynamicMarketsMap 
                selectedDay={selectedDay} 
                selectedNeighborhood={selectedNeighborhood}
                userCoordinates={userCoordinates}
              />
            ) : (
              <div className="h-full overflow-y-auto">
                <div className="p-2">
                  <MarketsCardGrid
                    selectedDay={selectedDay}
                    selectedNeighborhood={selectedNeighborhood}
                    userCoordinates={userCoordinates}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>

      {/* About Modal */}
      <Dialog open={showAboutModal} onOpenChange={setShowAboutModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Acerca de Ferias de Montevideo</DialogTitle>
            <DialogDescription>
              Descubre la historia y propósito de esta plataforma
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-lg mb-2">¿Qué es Ferias de Montevideo?</h3>
              <p>
                Ferias de Montevideo es una plataforma digital que te ayuda a descubrir y explorar 
                todas las ferias y mercados callejeros de la ciudad. Nuestro objetivo es conectar 
                a los montevideanos con los productores locales y facilitar el acceso a productos 
                frescos y artesanales.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">¿Qué puedes hacer aquí?</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Explorar todas las ferias disponibles en Montevideo</li>
                <li>Filtrar por día de la semana y barrio</li>
                <li>Ver la ubicación exacta de cada feria en el mapa</li>
                <li>Encontrar ferias cerca de tu ubicación</li>
                <li>Conocer horarios y detalles de cada mercado</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">¿Por qué creamos esta plataforma?</h3>
              <p>
                Creemos que las ferias son una parte fundamental de la cultura montevideana y 
                una excelente manera de apoyar a los productores locales. Queremos hacer que 
                sea más fácil para todos descubrir y disfrutar de estos espacios únicos de la ciudad.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">¿Cómo funciona?</h3>
              <p>
                Utilizamos datos oficiales y actualizados de las ferias de Montevideo para 
                brindarte información precisa sobre ubicaciones, horarios y días de funcionamiento. 
                Puedes filtrar por día para planificar tus visitas o explorar por barrio para 
                encontrar ferias cerca de ti.
              </p>
            </div>

            <div className="pt-4 border-t">
              <p className="text-muted-foreground text-xs">
                ¿Tienes sugerencias o encontraste algún error? 
                <button 
                  onClick={() => {
                    setShowAboutModal(false);
                    window.open('https://github.com/codeplaygroundspace/feriasdemontevideo', '_blank');
                  }}
                  className="text-blue-600 hover:underline ml-1"
                >
                  Envíanos tu feedback
                </button>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
