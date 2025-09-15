import { MarketsData, DayNames, DayColors } from "./types";

export const markets: MarketsData = {
  monday: [
    {
      name: "Feria de Villa Biarritz",
      location: "Av. Montevideo y 26 de Marzo",
      lat: -34.9176,
      lng: -56.1528,
    },
    {
      name: "Mercado del Puerto",
      location: "Piedras y Maciel",
      lat: -34.9059,
      lng: -56.2081,
    },
    {
      name: "Feria de Pocitos",
      location: "Av. Brasil y 21 de Setiembre",
      lat: -34.9089,
      lng: -56.1631,
    },
  ],
  tuesday: [
    {
      name: "Feria de Cordón",
      location: "18 de Julio y Canelones",
      lat: -34.9037,
      lng: -56.1869,
    },
    {
      name: "Mercado Agrícola",
      location: "José L. Terra y Camino Castro",
      lat: -34.8847,
      lng: -56.1558,
    },
  ],
  wednesday: [
    {
      name: "Feria de Villa Biarritz",
      location: "Av. Montevideo y 26 de Marzo",
      lat: -34.9176,
      lng: -56.1528,
    },
    {
      name: "Feria de Carrasco",
      location: "Av. Arocena y Bolivia",
      lat: -34.8889,
      lng: -56.0444,
    },
    {
      name: "Mercado del Buceo",
      location: "Av. Rivera y Monte Caseros",
      lat: -34.9097,
      lng: -56.1319,
    },
  ],
  thursday: [
    {
      name: "Feria de Cordón",
      location: "18 de Julio y Canelones",
      lat: -34.9037,
      lng: -56.1869,
    },
    {
      name: "Mercado del Puerto",
      location: "Piedras y Maciel",
      lat: -34.9059,
      lng: -56.2081,
    },
  ],
  friday: [
    {
      name: "Feria de Villa Biarritz",
      location: "Av. Montevideo y 26 de Marzo",
      lat: -34.9176,
      lng: -56.1528,
    },
    {
      name: "Feria de Pocitos",
      location: "Av. Brasil y 21 de Setiembre",
      lat: -34.9089,
      lng: -56.1631,
    },
    {
      name: "Mercado Agrícola",
      location: "José L. Terra y Camino Castro",
      lat: -34.8847,
      lng: -56.1558,
    },
  ],
  saturday: [
    {
      name: "Feria de Tristán Narvaja",
      location: "Tristán Narvaja",
      lat: -34.9011,
      lng: -56.1881,
    },
    {
      name: "Mercado del Puerto",
      location: "Piedras y Maciel",
      lat: -34.9059,
      lng: -56.2081,
    },
    {
      name: "Feria de Carrasco",
      location: "Av. Arocena y Bolivia",
      lat: -34.8889,
      lng: -56.0444,
    },
    {
      name: "Feria de Pocitos",
      location: "Av. Brasil y 21 de Setiembre",
      lat: -34.9089,
      lng: -56.1631,
    },
  ],
  sunday: [
    {
      name: "Feria de Tristán Narvaja",
      location: "Tristán Narvaja",
      lat: -34.9011,
      lng: -56.1881,
    },
    {
      name: "Mercado del Puerto",
      location: "Piedras y Maciel",
      lat: -34.9059,
      lng: -56.2081,
    },
    {
      name: "Mercado del Buceo",
      location: "Av. Rivera y Monte Caseros",
      lat: -34.9097,
      lng: -56.1319,
    },
  ],
};

export const dayNames: DayNames = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

export const dayColors: DayColors = {
  monday: "bg-red-400",
  tuesday: "bg-teal-400",
  wednesday: "bg-blue-400",
  thursday: "bg-green-400",
  friday: "bg-yellow-400",
  saturday: "bg-pink-400",
  sunday: "bg-indigo-400",
};
