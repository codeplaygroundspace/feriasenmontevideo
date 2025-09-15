"use client";

import { useState } from "react";
import { SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
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
import { MapPin, Settings, Calendar, Map, List, Search, Heart } from "lucide-react";
import NeighborhoodDropdown from "@/components/NeighborhoodDropdown";
import AddressInput from "@/components/AddressInput";
import DynamicMarketsMap from "@/components/DynamicMarketsMap";
import MarketsCardGrid from "@/components/MarketsCardGrid";
import { markets } from "@/data";
import { dayNames, type Market } from "@/data";
import type { Coordinates } from "@/hooks/useAddressGeocoding";
import { useMarkets } from "@/hooks/useMarkets";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<string>("tuesday");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);
  const [currentView, setCurrentView] = useState<"map" | "cards">("cards");

  // Use the markets hook
  const { hasMarketsForDay, getMarketCountForDay } = useMarkets();

  const handleDayChange = (day: string, markets: Market[]) => {
    setSelectedDay(day);
    console.log(`Selected day: ${day}`, markets);
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
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
    <>
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

          {/* Address Input Section */}
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
            <SidebarGroupLabel>Día de la semana</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Object.keys(dayNames).map((day) => {
                  const hasMarkets = hasMarketsForDay(day);
                  const marketCount = getMarketCountForDay(day);
                  return (
                    <SidebarMenuItem key={day}>
                      <SidebarMenuButton
                        onClick={() => hasMarkets && handleDayChange(day, [])}
                        isActive={selectedDay === day}
                        disabled={!hasMarkets}
                        className={`w-full justify-start ${!hasMarkets ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <Calendar className="h-4 w-4" />
                        <span>{dayNames[day as keyof typeof dayNames]}</span>
                        {!hasMarkets ? (
                          <span className="ml-auto text-xs text-muted-foreground">0</span>
                        ) : (
                          <span className="ml-auto text-xs text-muted-foreground">{marketCount}</span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          {/* Quick Actions */}
          <SidebarGroup>
            <SidebarGroupLabel>Acciones Rápidas</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full justify-start">
                    <Search className="h-4 w-4" />
                    <span>Buscar Ferias</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton className="w-full justify-start">
                    <Heart className="h-4 w-4" />
                    <span>Favoritos</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start">
                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content Area with Map/Grid */}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-sidebar-border" />
          <h1 className="text-lg font-semibold">Ferias de Montevideo</h1>
        </header>

        {/* Main Content with Rounded Borders */}
        <div className="flex-1 p-6">
          <div className="h-full bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            {currentView === "map" ? (
              <DynamicMarketsMap 
                selectedDay={selectedDay} 
                selectedNeighborhood={selectedNeighborhood}
                userCoordinates={userCoordinates}
              />
            ) : (
              <div className="h-full overflow-y-auto">
                <div className="p-6">
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
    </>
  );
}
