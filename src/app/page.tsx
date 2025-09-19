"use client";

import { Suspense } from "react";
import Link from "next/link";
import ErrorBoundary from "@/components/ErrorBoundary";
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
import { MessageSquare, Info } from "lucide-react";
import NeighborhoodDropdown from "@/components/NeighborhoodDropdown";
import AddressInput from "@/components/AddressInput";
import DynamicMarketsMap from "@/components/DynamicMarketsMap";
import MarketsCardGrid from "@/components/MarketsCardGrid";
import { markets } from "@/data";
import { dayNames, type Market } from "@/data";
import { useMarkets } from "@/hooks/useMarkets";
import { useFilters } from "@/hooks/useFilters";

function HomeContent() {
  // Use the markets hook
  const { hasMarketsForDay, hasMarketsForDayInNeighborhood } = useMarkets();
  
  // Use the filters hook
  const {
    selectedDay,
    selectedNeighborhood,
    userAddress,
    userCoordinates,
    currentView,
    handleDayChange,
    handleNeighborhoodChange,
    handleAddressChange,
    handleClearAddress,
    handleViewChange,
  } = useFilters(hasMarketsForDayInNeighborhood);

  return (
    <SidebarProvider>
      {/* Main shadcn/ui Sidebar with all functionality */}
      <Sidebar>
        {/* <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
          </div>
        </SidebarHeader> */}

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

          {/* Feedback and About */}
          <SidebarGroup>
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
                <SidebarMenuItem>
                  <div className="px-2 py-1 text-xs text-muted-foreground">
                    Última actualización: 19/10/2025
                  </div>
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
          <h1 className="text-lg font-semibold">Ferias en Montevideo</h1>
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

export default function Home() {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando ferias...</p>
          </div>
        </div>
      }>
        <HomeContent />
      </Suspense>
    </ErrorBoundary>
  );
}
