"use client";

import { useState } from "react";
import { markets, dayNames, dayColors, type Market } from "@/data";
import NeighborhoodDropdown from "./NeighborhoodDropdown";

interface MarketsSectionProps {
  onDayChange?: (day: string, markets: Market[]) => void;
  onNeighborhoodChange?: (neighborhood: string) => void;
}

const MarketsSection: React.FC<MarketsSectionProps> = ({ onDayChange, onNeighborhoodChange }) => {
  const [activeDay, setActiveDay] = useState<string>("all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");

  const handleDayClick = (day: string) => {
    setActiveDay(day);
    // Pass the day selection to the parent component
    // The map will handle the filtering internally
    onDayChange?.(day, []);
  };

  const handleNeighborhoodChange = (neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
    onNeighborhoodChange?.(neighborhood);
  };


  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        {/* Neighborhood Dropdown */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Barrio</h3>
          <NeighborhoodDropdown
            selectedNeighborhood={selectedNeighborhood}
            onNeighborhoodChange={handleNeighborhoodChange}
          />
        </div>

        {/* Day Pills */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Día</h3>
          <div className="flex flex-col gap-2">
            {Object.keys(dayNames).map((day) => (
              <div
                key={day}
                className="cursor-pointer transition-all duration-200 ease-out"
                onClick={() => handleDayClick(day)}
              >
                <div className={`text-sm font-bold border border-stone-200 rounded-md px-4 py-3 hover:text-stone-500 ${
                  activeDay === day ? "text-gray-900 bg-stone-200" : "text-gray-600"
                }`}>
                  {dayNames[day as keyof typeof dayNames]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketsSection;
