"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { dayNames } from "@/data";
import type { Coordinates } from "./useAddressGeocoding";

interface UseFiltersReturn {
  selectedDay: string;
  selectedNeighborhood: string;
  userAddress: string;
  userCoordinates: Coordinates | null;
  currentView: "map" | "cards";
  handleDayChange: (day: string) => void;
  handleNeighborhoodChange: (neighborhood: string) => void;
  handleAddressChange: (address: string, coordinates: Coordinates) => void;
  handleClearAddress: () => void;
  handleViewChange: (view: "map" | "cards") => void;
}

export const useFilters = (hasMarketsForDayInNeighborhood: (day: string, neighborhood: string) => boolean): UseFiltersReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("all");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userCoordinates, setUserCoordinates] = useState<Coordinates | null>(null);
  const [currentView, setCurrentView] = useState<"map" | "cards">("cards");

  // Initialize state from URL parameters
  useEffect(() => {
    const day = searchParams.get('day') || 'all';
    const neighborhood = searchParams.get('barrio') || 'all';
    const view = (searchParams.get('view') as 'map' | 'cards') || 'cards';
    
    setSelectedDay(day);
    setSelectedNeighborhood(neighborhood);
    setCurrentView(view);
  }, [searchParams]);

  const updateURL = useCallback((params: { day?: string; neighborhood?: string; view?: string }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    if (params.day !== undefined) {
      if (params.day === 'all') {
        newSearchParams.delete('day');
      } else {
        newSearchParams.set('day', params.day);
      }
    }
    
    if (params.neighborhood !== undefined) {
      if (params.neighborhood === 'all') {
        newSearchParams.delete('barrio');
      } else {
        newSearchParams.set('barrio', params.neighborhood);
      }
    }
    
    if (params.view !== undefined) {
      if (params.view === 'cards') {
        newSearchParams.delete('view');
      } else {
        newSearchParams.set('view', params.view);
      }
    }
    
    const newURL = newSearchParams.toString() ? `/?${newSearchParams.toString()}` : '/';
    router.replace(newURL, { scroll: false });
  }, [router, searchParams]);

  const handleDayChange = useCallback((day: string) => {
    setSelectedDay(day);
    updateURL({ day });
  }, [updateURL]);

  const handleNeighborhoodChange = useCallback((neighborhood: string) => {
    setSelectedNeighborhood(neighborhood);
    
    // If the current selected day doesn't have markets in the new neighborhood,
    // automatically select the first available day
    if (!hasMarketsForDayInNeighborhood(selectedDay, neighborhood)) {
      const availableDays = Object.keys(dayNames).filter(day => 
        hasMarketsForDayInNeighborhood(day, neighborhood)
      );
      if (availableDays.length > 0) {
        setSelectedDay(availableDays[0]);
        updateURL({ day: availableDays[0], neighborhood });
      } else {
        updateURL({ neighborhood });
      }
    } else {
      updateURL({ neighborhood });
    }
  }, [selectedDay, hasMarketsForDayInNeighborhood, updateURL]);

  const handleAddressChange = useCallback((address: string, coordinates: Coordinates) => {
    setUserAddress(address);
    setUserCoordinates(coordinates);
  }, []);

  const handleClearAddress = useCallback(() => {
    setUserAddress("");
    setUserCoordinates(null);
  }, []);

  const handleViewChange = useCallback((view: "map" | "cards") => {
    setCurrentView(view);
    updateURL({ view });
  }, [updateURL]);

  return {
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
  };
};
