export interface Market {
  name: string;
  location: string;
  neighborhood: string;
  lat: number;
  lng: number;
  day?: string;
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
