export interface Market {
  id: string; // Required - each market has a unique ID
  name: string;
  location: string;
  neighborhood: string;
  lat: number;
  lng: number;
  beginningTime: string; // Market opening time (e.g., "08:00")
  endTime: string; // Market closing time (e.g., "14:00")
  day?: string;
  distance?: number; // Distance from user's location in kilometers
  imageUrl?: string; // Optional - URL to market image
  instagramUrl?: string; // Optional - Instagram profile URL
  tripAdvisorUrl?: string; // Optional - TripAdvisor page URL
  googleMapURL?: string; // Optional - Direct link to Google Maps location
}

export interface MarketsData {
  [key: string]: Market[];
}

export interface DayNames {
  [key: string]: string;
}

export interface DayColors {
  [key: string]: string;
}
