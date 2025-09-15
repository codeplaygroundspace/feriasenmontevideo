import { useState, useCallback } from "react";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeocodingResult {
  address: string;
  coordinates: Coordinates;
}

export interface UseAddressGeocodingReturn {
  isLoading: boolean;
  error: string;
  geocodeAddress: (address: string) => Promise<GeocodingResult | null>;
  getCurrentLocation: () => Promise<GeocodingResult | null>;
  clearError: () => void;
}

export const useAddressGeocoding = (): UseAddressGeocodingReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const clearError = useCallback(() => {
    setError("");
  }, []);

  const geocodeAddress = useCallback(async (addressToGeocode: string): Promise<GeocodingResult | null> => {
    if (!addressToGeocode.trim()) {
      setError("Por favor ingresa una dirección");
      return null;
    }

    setIsLoading(true);
    setError("");

    try {
      // Using OpenStreetMap Nominatim API for geocoding (free and no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          addressToGeocode + ", Montevideo, Uruguay"
        )}&limit=1&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error("Error al buscar la dirección");
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error("No se encontró la dirección. Intenta con una dirección más específica.");
      }

      const result = data[0];
      const lat = parseFloat(result.lat);
      const lng = parseFloat(result.lon);

      if (isNaN(lat) || isNaN(lng)) {
        throw new Error("Coordenadas inválidas obtenidas");
      }

      return {
        address: addressToGeocode,
        coordinates: { lat, lng }
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al procesar la dirección";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getCurrentLocation = useCallback(async (): Promise<GeocodingResult | null> => {
    if (!navigator.geolocation) {
      setError("La geolocalización no está disponible en este navegador");
      return null;
    }

    setIsLoading(true);
    setError("");

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocationText = "Mi ubicación actual";
          
          setIsLoading(false);
          resolve({
            address: currentLocationText,
            coordinates: { lat: latitude, lng: longitude }
          });
        },
        (error) => {
          let errorMessage = "Error al obtener la ubicación";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Permiso de ubicación denegado";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Ubicación no disponible";
              break;
            case error.TIMEOUT:
              errorMessage = "Tiempo de espera agotado";
              break;
          }
          setError(errorMessage);
          setIsLoading(false);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }, []);

  return {
    isLoading,
    error,
    geocodeAddress,
    getCurrentLocation,
    clearError
  };
};
