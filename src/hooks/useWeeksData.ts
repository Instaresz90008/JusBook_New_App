
import { useState, useMemo } from 'react';
import { format, addDays, addWeeks, startOfWeek } from 'date-fns';
import { WeekData } from '@/components/slot-broadcast/types/weekTypes';

export const useWeeksData = () => {
  const [weeks, setWeeks] = useState<WeekData[]>(() => {
    const now = new Date();
    const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 }); // Start from Monday
    
    const generateWeekDays = (weekStartDate: Date) => {
      return Array.from({ length: 7 }, (_, i) => {
        const day = addDays(weekStartDate, i);
        return {
          date: day,
          dayName: format(day, "EEE"),
          dayMonth: format(day, "dd/MM/yy"),
          selected: false
        };
      });
    };
    
    return [
      {
        label: "Current week",
        days: generateWeekDays(startOfCurrentWeek),
        selectAll: false
      },
      {
        label: "Next week",
        days: generateWeekDays(addWeeks(startOfCurrentWeek, 1)),
        selectAll: false
      },
      {
        label: "Third week",
        days: generateWeekDays(addWeeks(startOfCurrentWeek, 2)),
        selectAll: false
      },
      {
        label: "Fourth week",
        days: generateWeekDays(addWeeks(startOfCurrentWeek, 3)),
        selectAll: false
      }
    ];
  });
  
  // Extract selected dates as strings in yyyy-MM-dd format
  const selectedDates = useMemo(() => {
    const dates: string[] = [];
    for (const week of weeks) {
      for (const day of week.days) {
        if (day.selected) {
          dates.push(format(day.date, "yyyy-MM-dd"));
        }
      }
    }
    return dates;
  }, [weeks]);
  
  return { weeks, setWeeks, selectedDates };
};
