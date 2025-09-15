"use client";

import { useState } from "react";
import Header from "@/components/Header";
import MarketsSection from "@/components/MarketsSection";
import DynamicMarketsMap from "@/components/DynamicMarketsMap";
import type { Market } from "@/data";

export default function Home() {
  const [selectedDay, setSelectedDay] = useState<string>("monday");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");

  const handleDayChange = (day: string, markets: Market[]) => {
    setSelectedDay(day);
    console.log(`Selected day: ${day}`, markets);
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
    console.log(`Selected neighborhood: ${neighborhood}`);
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
          />
        </div>

        {/* Map Area */}
        <div className="flex-1 p-6">
          <div className="h-full bg-white rounded-xl overflow-hidden">
            <DynamicMarketsMap 
              selectedDay={selectedDay} 
              selectedNeighborhood={selectedNeighborhood}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
