
import { format } from "date-fns";
import { SelectedDaysRecord } from "./types";

// Calculate the number of selected days
export const calculateSelectedDays = (selectedDays: SelectedDaysRecord): string[] => {
  const selected: string[] = [];
  
  Object.entries(selectedDays.currentWeek).forEach(([day, isSelected]) => {
    if (isSelected) {
      selected.push(`${day} (Current Week)`);
    }
  });
  
  Object.entries(selectedDays.nextWeek).forEach(([day, isSelected]) => {
    if (isSelected) {
      selected.push(`${day} (Next Week)`);
    }
  });
  
  return selected;
};

// Calculate total available slots based on time range, duration, etc.
export const calculateTotalSlots = (
  startTime: string, 
  endTime: string, 
  duration: string, 
  buffer: number, 
  selectedDays: SelectedDaysRecord
): number => {
  const durationInMins = parseInt(duration.split(' ')[0]);
  const startHour = parseInt(startTime.split(':')[0]);
  const startMinute = parseInt(startTime.split(':')[1].split(' ')[0]);
  const isPmStart = startTime.includes('PM');
  
  const endHour = parseInt(endTime.split(':')[0]);
  const endMinute = parseInt(endTime.split(':')[1].split(' ')[0]);
  const isPmEnd = endTime.includes('PM');
  
  let startTimeInMins = startHour * 60 + startMinute;
  if (isPmStart && startHour !== 12) startTimeInMins += 12 * 60;
  if (!isPmStart && startHour === 12) startTimeInMins -= 12 * 60;
  
  let endTimeInMins = endHour * 60 + endMinute;
  if (isPmEnd && endHour !== 12) endTimeInMins += 12 * 60;
  if (!isPmEnd && endHour === 12) endTimeInMins -= 12 * 60;
  
  const totalMinsPerDay = endTimeInMins - startTimeInMins;
  const slotsPerDay = Math.floor(totalMinsPerDay / (durationInMins + buffer));
  
  const totalDaysSelected = Object.values(selectedDays.currentWeek).filter(Boolean).length + 
    Object.values(selectedDays.nextWeek).filter(Boolean).length;
  
  return slotsPerDay * totalDaysSelected;
};

// Generate slot data from selected days
export const generateSlotsFromSelection = (
  selectedDays: SelectedDaysRecord,
  startTime: string,
  endTime: string,
  duration: string,
  buffer: number,
  service: string
) => {
  const slots = [];
  const currentDate = new Date();
  const nextWeekDate = new Date();
  nextWeekDate.setDate(currentDate.getDate() + 7);
  
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentWeekDay = currentDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
  
  // Process current week slots
  Object.entries(selectedDays.currentWeek).forEach(([day, isSelected]) => {
    if (isSelected) {
      const dayIndex = days.indexOf(day);
      const targetDate = new Date(currentDate);
      let daysToAdd = dayIndex - currentWeekDay;
      if (daysToAdd < 0) daysToAdd += 7;
      targetDate.setDate(currentDate.getDate() + daysToAdd);
      
      slots.push({
        date: format(targetDate, 'yyyy-MM-dd'),
        day,
        startTime,
        endTime,
        duration,
        buffer,
        service,
        isCurrentWeek: true
      });
    }
  });
  
  // Process next week slots
  Object.entries(selectedDays.nextWeek).forEach(([day, isSelected]) => {
    if (isSelected) {
      const dayIndex = days.indexOf(day);
      const targetDate = new Date(nextWeekDate);
      let daysToAdd = dayIndex - nextWeekDate.getDay();
      if (daysToAdd < 0) daysToAdd += 7;
      targetDate.setDate(nextWeekDate.getDate() + daysToAdd);
      
      slots.push({
        date: format(targetDate, 'yyyy-MM-dd'),
        day,
        startTime,
        endTime,
        duration,
        buffer,
        service,
        isCurrentWeek: false
      });
    }
  });
  
  return slots;
};
