"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddressGeocoding, type Coordinates } from "@/hooks/useAddressGeocoding";

interface AddressInputProps {
  onAddressSubmit: (address: string, coordinates: Coordinates) => void;
  onClearAddress: () => void;
  currentAddress?: string;
}

const AddressInput: React.FC<AddressInputProps> = ({ 
  onAddressSubmit, 
  onClearAddress, 
  currentAddress 
}) => {
  const [address, setAddress] = useState<string>(currentAddress || "");
  const { isLoading, error, geocodeAddress, getCurrentLocation, clearError } = useAddressGeocoding();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await geocodeAddress(address);
    if (result) {
      onAddressSubmit(result.address, result.coordinates);
    }
  };

  const handleClear = () => {
    setAddress("");
    clearError();
    onClearAddress();
  };

  const handleUseCurrentLocation = async () => {
    const result = await getCurrentLocation();
    if (result) {
      setAddress(result.address);
      onAddressSubmit(result.address, result.coordinates);
    }
  };

  return (
    <div className="space-y-4">
      
        <p className="text-sm text-gray-600 mb-4">
          Ingresa tu dirección para ver qué tan lejos estás de cada feria.
        </p>
      

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <Input
            type="text"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
            placeholder="Ej: Av. 18 de Julio 1234, Montevideo"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded-md">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isLoading || !address.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>
          
          <Button
            type="button"
            onClick={handleUseCurrentLocation}
            disabled={isLoading}
            variant="outline"
            className="flex-1"
          >
            {isLoading ? "..." : "📍 Ubicación actual"}
          </Button>
        </div>
      </form>

      {currentAddress && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800">Ubicación actual:</p>
              <p className="text-sm text-green-700">{currentAddress}</p>
            </div>
            <Button
              onClick={handleClear}
              variant="outline"
              size="sm"
              className="text-green-700 border-green-300 hover:bg-green-100"
            >
              Limpiar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressInput;
