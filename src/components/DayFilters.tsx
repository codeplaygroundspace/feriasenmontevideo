"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Calendar } from "lucide-react";
import { dayNames } from "@/data";

interface DayFiltersProps {
  selectedDay: string;
  selectedNeighborhood: string;
  onDayChange: (day: string) => void;
  hasMarketsForDayInNeighborhood: (day: string, neighborhood: string) => boolean;
}

const DayFilters: React.FC<DayFiltersProps> = ({
  selectedDay,
  selectedNeighborhood,
  onDayChange,
  hasMarketsForDayInNeighborhood
}) => {
  return (
    <SidebarMenu className="space-y-2">
      {Object.keys(dayNames).map((day) => {
        const hasMarkets = hasMarketsForDayInNeighborhood(day, selectedNeighborhood);
        const isActive = selectedDay === day;
        return (
          <SidebarMenuItem key={day}>
            <SidebarMenuButton
              onClick={() => hasMarkets && onDayChange(day)}
              isActive={isActive}
              disabled={!hasMarkets}
              className={`
                w-full justify-start 
                border border-gray-200 
                rounded-lg 
                transition-all duration-200
                min-h-[44px]
                px-3 py-2
                ${isActive 
                  ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-sm ring-1 ring-blue-200' 
                  : hasMarkets 
                    ? 'bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm active:bg-gray-100 active:scale-[0.98]' 
                    : 'opacity-50 cursor-not-allowed bg-gray-50'
                }
                ${hasMarkets ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
            >
              <Calendar className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className="font-medium">{dayNames[day as keyof typeof dayNames]}</span>
              {!hasMarkets && day !== 'all' && (
                <span className="ml-auto text-xs text-muted-foreground">Sin ferias</span>
              )}
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default DayFilters;
