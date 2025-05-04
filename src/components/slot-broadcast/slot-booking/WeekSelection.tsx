
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Week } from "../utils/timeUtils";
import { getDayName, getFormattedDate } from "../utils/timeUtils";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WeekSelectionProps {
  weeks: Week[];
  setWeeks: React.Dispatch<React.SetStateAction<Week[]>>;
  showWeekend: boolean;
}

const WeekSelection = ({ weeks, setWeeks, showWeekend }: WeekSelectionProps) => {
  const toggleSelectAll = (weekIndex: number) => {
    setWeeks(prevWeeks => {
      const newWeeks = [...prevWeeks];
      // Make sure selectAll exists or initialize it
      const currentSelectAll = !newWeeks[weekIndex].selectAll;
      newWeeks[weekIndex].selectAll = currentSelectAll;
      
      // Update all days in this week
      newWeeks[weekIndex].days = newWeeks[weekIndex].days.map(day => ({
        ...day,
        selected: currentSelectAll,
      }));
      
      return newWeeks;
    });
  };

  const toggleDay = (weekIndex: number, dayIndex: number) => {
    setWeeks(prevWeeks => {
      const newWeeks = [...prevWeeks];
      newWeeks[weekIndex].days[dayIndex].selected = !newWeeks[weekIndex].days[dayIndex].selected;
      
      // Update selectAll based on all days selected
      newWeeks[weekIndex].selectAll = newWeeks[weekIndex].days.every(day => day.selected);
      
      return newWeeks;
    });
  };

  return (
    <div className="col-span-2 space-y-6">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-medium">{week.label || `Week ${weekIndex + 1}`}</span>
            <label className="flex items-center space-x-2">
              <span className="text-sm">Select all</span>
              <Checkbox 
                checked={week.selectAll || false}
                onCheckedChange={() => toggleSelectAll(weekIndex)}
              />
            </label>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {week.days.map((day, dayIndex) => {
              // Skip weekend days if showWeekend is false
              if (!showWeekend && (dayIndex === 0 || dayIndex === 6)) {
                return null;
              }
              
              return (
                <Button 
                  key={dayIndex}
                  variant={day.selected ? "default" : "outline"}
                  className={`p-2 h-auto ${day.selected ? 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border border-indigo-300' : 'bg-gray-50 border border-gray-200'}`}
                  onClick={() => toggleDay(weekIndex, dayIndex)}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium">{getDayName(day.date)}</span>
                    <span className="text-xs opacity-70">{getFormattedDate(day.date)}</span>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeekSelection;
