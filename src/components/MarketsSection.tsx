"use client";

import { useState } from "react";
import { markets, dayNames, dayColors, type Market } from "@/data";

interface MarketsSectionProps {
  onDayChange?: (day: string, markets: Market[]) => void;
}

const MarketsSection: React.FC<MarketsSectionProps> = ({ onDayChange }) => {
  const [activeDay, setActiveDay] = useState<string>("monday");

  const handleDayClick = (day: string) => {
    setActiveDay(day);
    onDayChange?.(day, markets[day]);
  };


  return (
    <section className="bg-white shadow-lg border-b border-stone-200">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex flex-wrap gap-3 flex-1 justify-center">
            {Object.keys(dayNames).map((day) => (
              <div
                key={day}
                className="cursor-pointer transition-all duration-200 ease-out"
                onClick={() => handleDayClick(day)}
              >
                <div className={`text-sm font-bold border border-stone-200 rounded-md px-4 py-4 hover:text-stone-500 ${
                  activeDay === day ? "text-gray-900 bg-stone-200" : "text-gray-600"
                }`}>
                  {dayNames[day as keyof typeof dayNames]}
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default MarketsSection;
