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
import { MapPin, Calendar, Map, List, MessageSquare } from "lucide-react";
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
            <SidebarGroupLabel>Día de la semana</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {Object.keys(dayNames).map((day) => {
                  const hasMarkets = hasMarketsForDayInNeighborhood(day, selectedNeighborhood);
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
                        {!hasMarkets && (
                          <span className="ml-auto text-xs text-muted-foreground">Sin ferias</span>
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
    </SidebarProvider>
  );
}
