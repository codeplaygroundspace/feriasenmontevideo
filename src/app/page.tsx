"use client";

import Header from "@/components/Header";
import MarketsSection from "@/components/MarketsSection";
import type { Market } from "@/data";

export default function Home() {
  const handleDayChange = (day: string, markets: Market[]) => {
    console.log(`Selected day: ${day}`, markets);
    // Here you can add logic to update a map or other components
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MarketsSection onDayChange={handleDayChange} />

      {/* Main content area - you can add your map or other components here */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Explore the Markets
          </h2>
          <p className="text-gray-600">
            Select a day above to see which markets are open. This is where you can add your map component or other content to display the market locations.
          </p>
        </div>
      </div>
    </div>
  );
}
