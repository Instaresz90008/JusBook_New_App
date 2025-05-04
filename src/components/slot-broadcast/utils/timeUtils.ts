
import { addDays, format, addWeeks, startOfWeek } from 'date-fns';

// Generate time slots in 15-minute increments
export const TIME_SLOTS = [
  "12:00 AM", "12:15 AM", "12:30 AM", "12:45 AM",
  "01:00 AM", "01:15 AM", "01:30 AM", "01:45 AM",
  "02:00 AM", "02:15 AM", "02:30 AM", "02:45 AM",
  "03:00 AM", "03:15 AM", "03:30 AM", "03:45 AM",
  "04:00 AM", "04:15 AM", "04:30 AM", "04:45 AM",
  "05:00 AM", "05:15 AM", "05:30 AM", "05:45 AM",
  "06:00 AM", "06:15 AM", "06:30 AM", "06:45 AM",
  "07:00 AM", "07:15 AM", "07:30 AM", "07:45 AM",
  "08:00 AM", "08:15 AM", "08:30 AM", "08:45 AM",
  "09:00 AM", "09:15 AM", "09:30 AM", "09:45 AM",
  "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM",
  "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
  "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM",
  "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM",
  "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM",
  "03:00 PM", "03:15 PM", "03:30 PM", "03:45 PM",
  "04:00 PM", "04:15 PM", "04:30 PM", "04:45 PM",
  "05:00 PM", "05:15 PM", "05:30 PM", "05:45 PM",
  "06:00 PM", "06:15 PM", "06:30 PM", "06:45 PM",
  "07:00 PM", "07:15 PM", "07:30 PM", "07:45 PM",
  "08:00 PM", "08:15 PM", "08:30 PM", "08:45 PM",
  "09:00 PM", "09:15 PM", "09:30 PM", "09:45 PM",
  "10:00 PM", "10:15 PM", "10:30 PM", "10:45 PM",
  "11:00 PM", "11:15 PM", "11:30 PM", "11:45 PM",
];

export const DURATION_OPTIONS = [
  "5 mins",
  "15 mins",
  "30 mins",
  "45 mins",
  "60 mins",
  "90 mins",
  "120 mins"
];

export interface Day {
  name: string;
  date: Date;
  selected: boolean;
}

export interface Week {
  id: number;
  days: Day[];
  selectAll?: boolean;
  label?: string;
}

// Format day name (e.g., "Monday")
export const getDayName = (date: Date): string => {
  return format(date, 'EEEE');
};

// Format date (e.g., "Jan 15")
export const getFormattedDate = (date: Date): string => {
  return format(date, 'MMM d');
};

export const generateWeeks = (numWeeks = 2): Week[] => {
  const weeks: Week[] = [];
  const today = new Date();
  
  // Start from the beginning of the current week (Monday)
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  
  for (let i = 0; i < numWeeks; i++) {
    const currentWeekStart = i === 0 ? weekStart : addWeeks(weekStart, i);
    const days: Day[] = [];
    
    // Generate days for the week
    for (let j = 0; j < 7; j++) {
      const date = addDays(currentWeekStart, j);
      const name = format(date, 'EEEE');
      // By default, select weekdays in the first week
      const isWeekday = j < 5; // Monday to Friday
      const isFirstWeek = i === 0;
      const selected = isFirstWeek && isWeekday;
      
      days.push({
        name,
        date,
        selected
      });
    }
    
    weeks.push({
      id: i + 1,
      days,
      selectAll: i === 0, // Default first week as selected
      label: `Week ${i + 1} (${format(currentWeekStart, 'MMM d')} - ${format(addDays(currentWeekStart, 6), 'MMM d')})`
    });
  }
  
  return weeks;
};

export function addDurationToTime(startTime: string, duration: string): string {
  const durationMins = parseInt(duration); // Extract numeric value from "15 mins"

  // Parse 12-hour format (e.g., "02:15 PM")
  const [time, period] = startTime.split(" ");
  const [hourStr, minuteStr] = time.split(":");
  let hour = parseInt(hourStr);
  const minute = parseInt(minuteStr);

  // Convert to 24-hour format for easier calculation
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  // Total minutes since midnight
  const totalMinutes = hour * 60 + minute + durationMins;

  // Convert back to 12-hour format
  let endHour = Math.floor((totalMinutes / 60) % 24);
  let endMinute = totalMinutes % 60;
  const endPeriod = endHour >= 12 ? "PM" : "AM";

  // Convert 24-hour to 12-hour
  if (endHour === 0) endHour = 12;
  else if (endHour > 12) endHour -= 12;

  const formattedHour = String(endHour).padStart(2, "0");
  const formattedMinute = String(endMinute).padStart(2, "0");

  return `${formattedHour}:${formattedMinute} ${endPeriod}`;
}

