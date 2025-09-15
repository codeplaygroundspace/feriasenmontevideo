/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 Latitude of first point
 * @param lng1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lng2 Longitude of second point
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

/**
 * Convert degrees to radians
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Format distance for display
 * @param distance Distance in kilometers
 * @returns Formatted distance string
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance} km`;
};

/**
 * Get distance color based on distance value
 * @param distance Distance in kilometers
 * @returns Tailwind CSS color class
 */
export const getDistanceColor = (distance: number): string => {
  if (distance <= 1) {
    return "text-green-600 bg-green-50";
  } else if (distance <= 3) {
    return "text-yellow-600 bg-yellow-50";
  } else if (distance <= 5) {
    return "text-orange-600 bg-orange-50";
  } else {
    return "text-red-600 bg-red-50";
  }
};

/**
 * Get distance label based on distance value
 * @param distance Distance in kilometers
 * @returns Distance category label
 */
export const getDistanceLabel = (distance: number): string => {
  if (distance <= 1) {
    return "Muy cerca";
  } else if (distance <= 3) {
    return "Cerca";
  } else if (distance <= 5) {
    return "Moderado";
  } else {
    return "Lejos";
  }
};
