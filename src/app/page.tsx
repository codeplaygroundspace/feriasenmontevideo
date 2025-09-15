"use client";

import { useState } from "react";
import Header from "@/components/Header";
import MarketsSection from "@/components/MarketsSection";
import DynamicMarketsMap from "@/components/DynamicMarketsMap";
import MarketsCardGrid from "@/components/MarketsCardGrid";
import type { Market } from "@/data";
import type { Coordinates } from "@/hooks/useAddressGeocoding";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);
  const [currentView, setCurrentView] = useState<"map" | "cards">("map");

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-80 overflow-y-auto">
          <MarketsSection 
            onDayChange={handleDayChange} 
            onNeighborhoodChange={handleNeighborhoodChange}
            onAddressChange={handleAddressChange}
            onClearAddress={handleClearAddress}
            onViewChange={handleViewChange}
            currentAddress={userAddress}
            currentView={currentView}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="h-full bg-white rounded-xl overflow-hidden">
            {currentView === "map" ? (
              <DynamicMarketsMap 
                selectedDay={selectedDay} 
                selectedNeighborhood={selectedNeighborhood}
                userCoordinates={userCoordinates}
              />
            ) : (
              <div className="p-6">
                <MarketsCardGrid
                  selectedDay={selectedDay}
                  selectedNeighborhood={selectedNeighborhood}
                  userCoordinates={userCoordinates}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
