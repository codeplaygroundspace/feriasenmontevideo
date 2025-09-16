"use client";

import { useState } from "react";
import Link from "next/link";
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
import ViewToggle from "@/components/ViewToggle";
import DayFilters from "@/components/DayFilters";
import { MapPin, MessageSquare, Info } from "lucide-react";
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

  // Use the markets hook
  const { hasMarketsForDay, hasMarketsForDayInNeighborhood } = useMarkets();

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    console.log(`Selected day: ${day}`);
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
              <ViewToggle 
                currentView={currentView}
                onViewChange={handleViewChange}
                fullWidth={true}
              />
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
              <DayFilters
                selectedDay={selectedDay}
                selectedNeighborhood={selectedNeighborhood}
                onDayChange={handleDayChange}
                hasMarketsForDayInNeighborhood={hasMarketsForDayInNeighborhood}
              />
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
                    asChild
                    className="w-full justify-start"
                  >
                    <Link href="/acerca-de">
                      <Info className="h-4 w-4" />
                      <span>Acerca de</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

      </Sidebar>

      {/* Main Content Area with Map/Grid */}
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 backdrop-blur supports-[backdrop-filter]:bg-background/95">
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
    </SidebarProvider>
  );
}
