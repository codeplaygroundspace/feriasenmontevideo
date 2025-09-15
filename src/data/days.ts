// Centralized days of the week data
export const DAYS_OF_WEEK = [
  'monday',
  'tuesday', 
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
] as const;

export type DayOfWeek = typeof DAYS_OF_WEEK[number];

// Day names in Spanish
export const dayNames: Record<DayOfWeek, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

// Day colors for different UI contexts
export const dayColors: Record<DayOfWeek, string> = {
  monday: "bg-red-400",
  tuesday: "bg-teal-400",
  wednesday: "bg-blue-400",
  thursday: "bg-green-400",
  friday: "bg-yellow-400",
  saturday: "bg-pink-400",
  sunday: "bg-indigo-400",
};

// Day colors for card badges (lighter variants)
export const dayCardColors: Record<DayOfWeek, string> = {
  monday: "bg-gray-100 text-gray-800",
  tuesday: "bg-blue-100 text-blue-800",
  wednesday: "bg-green-100 text-green-800",
  thursday: "bg-yellow-100 text-yellow-800",
  friday: "bg-orange-100 text-orange-800",
  saturday: "bg-purple-100 text-purple-800",
  sunday: "bg-red-100 text-red-800",
};

// Helper functions
export const getDayName = (day?: string): string => {
  return dayNames[day as keyof typeof dayNames] || "N/A";
};

export const getDayColor = (day?: string): string => {
  return dayColors[day as keyof typeof dayColors] || "bg-gray-400";
};

export const getDayCardColor = (day?: string): string => {
  return dayCardColors[day as keyof typeof dayCardColors] || "bg-gray-100 text-gray-800";
};

export const isValidDay = (day: string): day is DayOfWeek => {
  return DAYS_OF_WEEK.includes(day as DayOfWeek);
};
