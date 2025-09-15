'use client';

import dynamic from 'next/dynamic';
import type { Coordinates } from '@/hooks/useAddressGeocoding';

interface DynamicMarketsMapProps {
  selectedDay?: string;
  selectedNeighborhood?: string;
  userCoordinates?: Coordinates | null;
}

const MarketsMap = dynamic(() => import('./MarketsMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando mapa...</p>
      </div>
    </div>
  ),
});

const DynamicMarketsMap: React.FC<DynamicMarketsMapProps> = ({ selectedDay, selectedNeighborhood, userCoordinates }) => {
  return <MarketsMap selectedDay={selectedDay} selectedNeighborhood={selectedNeighborhood} userCoordinates={userCoordinates} />;
};

export default DynamicMarketsMap;
