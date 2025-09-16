"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Map, List } from "lucide-react";

interface ViewToggleProps {
  currentView: "map" | "cards";
  onViewChange: (view: "map" | "cards") => void;
  className?: string;
  fullWidth?: boolean;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ 
  currentView, 
  onViewChange, 
  className = "",
  fullWidth = false 
}) => {
  const handleViewChange = (value: string) => {
    if (value) {
      onViewChange(value as "map" | "cards");
    }
  };

  const baseClasses = fullWidth ? "flex gap-2 w-full" : "flex gap-2";
  const itemClasses = fullWidth ? "flex-1" : "";

  return (
    <ToggleGroup 
      type="single" 
      value={currentView} 
      onValueChange={handleViewChange}
      className={`${baseClasses} ${className}`}
    >
      <ToggleGroupItem 
        value="map" 
        aria-label="Toggle map view"
        className={`
          flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${itemClasses}
          ${currentView === "map" 
            ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm ring-1 ring-blue-200' 
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
          }
        `}
      >
        <Map className={`h-4 w-4 ${currentView === "map" ? 'text-blue-600' : 'text-gray-500'}`} />
        <span className="text-sm font-medium">Mapa</span>
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="cards" 
        aria-label="Toggle list view"
        className={`
          flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200 ${itemClasses}
          ${currentView === "cards" 
            ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm ring-1 ring-blue-200' 
            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
          }
        `}
      >
        <List className={`h-4 w-4 ${currentView === "cards" ? 'text-blue-600' : 'text-gray-500'}`} />
        <span className="text-sm font-medium">Lista</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default ViewToggle;
