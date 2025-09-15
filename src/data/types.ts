export interface Market {
  name: string;
  location: string;
  lat: number;
  lng: number;
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
