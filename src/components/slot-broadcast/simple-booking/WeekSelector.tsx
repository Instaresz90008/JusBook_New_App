
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { format } from "date-fns";
import { WeekData } from "../types/weekTypes";

interface WeekSelectorProps {
  weeks: WeekData[];
  setWeeks: React.Dispatch<React.SetStateAction<WeekData[]>>;
  showWeekend: boolean;
  onSelectedDatesChange: (dates: string[]) => void;
}

const WeekSelector = ({ 
  weeks, 
  setWeeks, 
  showWeekend,
  onSelectedDatesChange
}: WeekSelectorProps) => {
  const toggleDaySelection = (weekIndex: number, dayIndex: number) => {
    setWeeks(prevWeeks => {
      const newWeeks = [...prevWeeks];
      newWeeks[weekIndex].days[dayIndex].selected = !newWeeks[weekIndex].days[dayIndex].selected;
      
      // Update selectAll based on all days selected
      newWeeks[weekIndex].selectAll = newWeeks[weekIndex].days.every(day => day.selected);
      
      // Update selectedDates
      const updatedDates = extractSelectedDates(newWeeks);
      onSelectedDatesChange(updatedDates);
      
      return newWeeks;
    });
  };
  
  const toggleSelectAll = (weekIndex: number) => {
    setWeeks(prevWeeks => {
      const newWeeks = [...prevWeeks];
      const newSelectAll = !newWeeks[weekIndex].selectAll;
      newWeeks[weekIndex].selectAll = newSelectAll;
      
      // Update all days in this week
      newWeeks[weekIndex].days = newWeeks[weekIndex].days.map(day => ({
        ...day,
        selected: newSelectAll,
      }));
      
      // Update selectedDates
      const updatedDates = extractSelectedDates(newWeeks);
      onSelectedDatesChange(updatedDates);
      
      return newWeeks;
    });
  };

  // Helper function to extract selected dates from weeks data
  const extractSelectedDates = (weeksData: WeekData[]): string[] => {
    const dates: string[] = [];
    for (const week of weeksData) {
      for (const day of week.days) {
        if (day.selected) {
          dates.push(format(day.date, "yyyy-MM-dd"));
        }
      }
    }
    return dates;
  };

  return (
    <div className="space-y-6">
      {/* Week by week selection */}
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{week.label}</span>
            <label className="flex items-center space-x-2">
              <span className="text-sm">Select all</span>
              <Checkbox 
                checked={week.selectAll}
                onCheckedChange={() => toggleSelectAll(weekIndex)}
              />
            </label>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {week.days.map((day, dayIndex) => {
              // Skip weekend days if showWeekend is false
              if (!showWeekend && (dayIndex === 5 || dayIndex === 6)) {
                return null;
              }
              
              return (
                <Button 
                  key={dayIndex}
                  type="button"
                  onClick={() => toggleDaySelection(weekIndex, dayIndex)}
                  variant={day.selected ? "default" : "outline"}
                  className={`p-2 h-auto flex flex-col items-center ${
                    day.selected ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border border-indigo-300" : ""
                  }`}
                >
                  <span className="text-sm font-medium">{day.dayName}</span>
                  <span className="text-xs">{day.dayMonth}</span>
                  {day.selected && <Check className="h-3 w-3 mt-1 text-indigo-600" />}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekSelector;
