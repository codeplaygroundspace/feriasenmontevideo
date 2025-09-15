"use client";

import { useState } from "react";
import { markets, dayNames, dayColors, type Market } from "@/data";
import NeighborhoodDropdown from "./NeighborhoodDropdown";
import AddressInput from "./AddressInput";
import { Switch } from "@/components/ui/switch";
import type { Coordinates } from "@/hooks/useAddressGeocoding";

interface MarketsSectionProps {
  onDayChange?: (day: string, markets: Market[]) => void;
  onNeighborhoodChange?: (neighborhood: string) => void;
  onAddressChange?: (address: string, coordinates: Coordinates) => void;
  onClearAddress?: () => void;
  onViewChange?: (view: "map" | "cards") => void;
  currentAddress?: string;
  currentView?: "map" | "cards";
}

const MarketsSection: React.FC<MarketsSectionProps> = ({ 
  onDayChange, 
  onNeighborhoodChange, 
  onAddressChange, 
  onClearAddress,
  onViewChange,
  currentAddress,
  currentView = "cards"
}) => {
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

  const handleViewToggle = (checked: boolean) => {
    const newView = checked ? "cards" : "map";
    onViewChange?.(newView);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        {/* View Toggle */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Vista</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${currentView === "map" ? "text-gray-900" : "text-gray-500"}`}>
                Mapa
              </span>
              <Switch
                checked={currentView === "cards"}
                onCheckedChange={handleViewToggle}
                size="md"
              />
              <span className={`text-sm font-medium ${currentView === "cards" ? "text-gray-900" : "text-gray-500"}`}>
                Lista
              </span>
            </div>
          </div>
        </div>
        {/* Address Input */}
        <AddressInput
          onAddressSubmit={onAddressChange || (() => {})}
          onClearAddress={onClearAddress || (() => {})}
          currentAddress={currentAddress}
        />

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
