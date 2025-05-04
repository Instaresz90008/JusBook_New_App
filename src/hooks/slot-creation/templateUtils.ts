
import { SelectedDaysRecord } from "./types";
import { toast } from "sonner";

// Apply template (weekdays, weekend, etc)
export const applyTemplate = (
  templateId: string, 
  selectedDays: SelectedDaysRecord
): SelectedDaysRecord => {
  const newSelectedDays = { ...selectedDays };
  
  if (templateId === 'weekdays') {
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(day => {
      newSelectedDays.currentWeek[day] = true;
      newSelectedDays.nextWeek[day] = true;
    });
    ['Saturday', 'Sunday'].forEach(day => {
      newSelectedDays.currentWeek[day] = false;
      newSelectedDays.nextWeek[day] = false;
    });
  } else if (templateId === 'weekends') {
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].forEach(day => {
      newSelectedDays.currentWeek[day] = false;
      newSelectedDays.nextWeek[day] = false;
    });
    ['Saturday', 'Sunday'].forEach(day => {
      newSelectedDays.currentWeek[day] = true;
      newSelectedDays.nextWeek[day] = true;
    });
  } else if (templateId === 'all-days') {
    Object.keys(newSelectedDays.currentWeek).forEach(day => {
      newSelectedDays.currentWeek[day] = true;
      newSelectedDays.nextWeek[day] = true;
    });
  }
  
  toast.success(`${templateId} template applied successfully`);
  return newSelectedDays;
};

// Create empty days selection
export const createEmptyDaysSelection = (): SelectedDaysRecord => {
  return {
    currentWeek: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
    },
    nextWeek: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
    }
  };
};
