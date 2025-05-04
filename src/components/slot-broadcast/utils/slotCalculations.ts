
import { TIME_SLOTS } from "./timeUtils";

interface SelectedDays {
  currentWeek: Record<string, boolean>;
  nextWeek: Record<string, boolean>;
}

export interface SlotSummary {
  service: string;
  selectedDays: number;
  timeRange: string;
  duration: string;
  totalSlots: number;
  serviceCost: number;
  sharableLink: string;
}

// Helper function to calculate slots based on time and duration
const calculateSlotsPerDay = (startTime: string, endTime: string, durationMinutes: number): number => {
  const startIndex = TIME_SLOTS.findIndex(t => t === startTime);
  const endIndex = TIME_SLOTS.findIndex(t => t === endTime);
  
  // If time slots aren't found or invalid, use sensible defaults
  const validStartIndex = startIndex >= 0 ? startIndex : 0;
  const validEndIndex = endIndex >= 0 ? endIndex : TIME_SLOTS.length - 1;
  
  // Calculate time slots (each TIME_SLOT is 15 minutes apart)
  const timeSlotDiff = validEndIndex - validStartIndex;
  const totalMinutesPerDay = timeSlotDiff * 15;
  
  return Math.floor(totalMinutesPerDay / durationMinutes);
};

// Helper function to generate a sharable link
const generateSharableLink = (service: string): string => {
  return `book-${service.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 8)}`;
};

// Parse duration string to get minutes
const parseDurationToMinutes = (duration: string): number => {
  return parseInt(duration.split(' ')[0]);
};

// Calculate slot summary for advanced view with current/next week selection
export const calculateSlotSummary = (
  service: string, 
  selectedDays: SelectedDays,
  startTime: string, 
  endTime: string,
  duration: string,
  serviceCost: number
): SlotSummary => {
  // Calculate selected days count
  const dayCount = Object.values(selectedDays.currentWeek).filter(Boolean).length + 
                  Object.values(selectedDays.nextWeek).filter(Boolean).length;
  
  // Parse duration to minutes
  const durationMinutes = parseDurationToMinutes(duration);
  
  // Calculate slots per day
  const slotsPerDay = calculateSlotsPerDay(startTime, endTime, durationMinutes);
  
  // Calculate total slots - ensure it's a number
  const totalSlots = dayCount * slotsPerDay;
  
  // Generate sharable link
  const sharableLink = generateSharableLink(service);
  
  return {
    service,
    selectedDays: dayCount,
    timeRange: `${startTime} - ${endTime}`,
    duration,
    totalSlots,
    serviceCost,
    sharableLink
  };
};

// Calculate slot summary for simple view with array of selected dates
export const calculateSimpleSlotSummary = (
  service: string,
  selectedDates: string[],
  startTime: string,
  endTime: string,
  duration: string,
  serviceCost: number
): SlotSummary => {
  const dayCount = selectedDates.length;
  
  // Parse duration to minutes
  const durationMinutes = parseDurationToMinutes(duration);
  
  // Calculate slots per day
  const slotsPerDay = calculateSlotsPerDay(startTime, endTime, durationMinutes);
  
  // Calculate total slots - ensure it's a number
  const totalSlots = dayCount * slotsPerDay;
  
  // Generate sharable link
  const sharableLink = generateSharableLink(service);
  
  return {
    service,
    selectedDays: dayCount,
    timeRange: `${startTime} - ${endTime}`,
    duration,
    totalSlots,
    serviceCost,
    sharableLink
  };
};
