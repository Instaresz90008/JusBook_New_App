
import { useState } from "react";
import { Trash, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format, addWeeks, startOfWeek, addDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useWeekSelection, SelectedDaysRecord } from "@/hooks/useWeekSelection";
import WeekNavigation from "./WeekNavigation";
import QuickTemplates from "./templates/QuickTemplates";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DaySelectorProps {
  selectedDays: SelectedDaysRecord;
  setSelectedDays: (days: SelectedDaysRecord) => void;
  onApplyTemplate?: (templateId: string) => void;
}

const DaySelector = ({
  selectedDays,
  setSelectedDays,
  onApplyTemplate
}: DaySelectorProps) => {
  const { toast } = useToast();
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  // Use custom hook for week selection logic
  const {
    currentWeekStartDate,
    showCurrentWeek,
    showNextWeek,
    handleDayToggle,
    handleBothToggle,
    toggleWeekVisibility,
    navigateWeek,
    clearAllSelections,
    formatCurrentWeekDisplay,
    formatNextWeekDisplay
  } = useWeekSelection(selectedDays, setSelectedDays);

  const handleSaveAndApply = () => {
    toast({
      title: "Settings Applied",
      description: "Your slot availability settings have been saved and applied.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Week Selection</h3>
        <WeekNavigation onNavigate={navigateWeek} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <label className="flex items-center space-x-2">
          <Checkbox 
            id="current-week" 
            checked={showCurrentWeek}
            onCheckedChange={() => toggleWeekVisibility('currentWeek')}
          />
          <span className="text-sm">
            Current Week {formatCurrentWeekDisplay()}
          </span>
        </label>
        
        <label className="flex items-center space-x-2">
          <Checkbox 
            id="next-week" 
            checked={showNextWeek}
            onCheckedChange={() => toggleWeekVisibility('nextWeek')}
          />
          <span className="text-sm">
            Next Week {formatNextWeekDisplay()}
          </span>
        </label>
      </div>
      
      <div className="border rounded-lg p-4 bg-slate-50">
        {/* Table Header */}
        <div className="flex items-center border-b pb-2 mb-2">
          <div className="w-28 font-medium">Day</div>
          {showCurrentWeek && <div className="flex-1 text-center font-medium">Current Week</div>}
          {showNextWeek && <div className="flex-1 text-center font-medium">Next Week</div>}
          {showCurrentWeek && showNextWeek && <div className="flex-1 text-center font-medium">Both</div>}
          <div className="w-8"></div> {/* Info column */}
        </div>
        
        {/* Day rows */}
        {days.map((day) => (
          <div key={day} className="flex items-center py-3 border-b border-gray-100 last:border-0">
            <div className="w-28 font-medium">{day}</div>
            
            {showCurrentWeek && (
              <div className="flex-1 flex justify-center">
                <Checkbox 
                  checked={selectedDays.currentWeek[day]}
                  onCheckedChange={() => handleDayToggle('currentWeek', day)}
                />
              </div>
            )}
            
            {showNextWeek && (
              <div className="flex-1 flex justify-center">
                <Checkbox 
                  checked={selectedDays.nextWeek[day]}
                  onCheckedChange={() => handleDayToggle('nextWeek', day)}
                />
              </div>
            )}
            
            {showCurrentWeek && showNextWeek && (
              <div className="flex-1 flex justify-center">
                <Checkbox 
                  checked={selectedDays.currentWeek[day] && selectedDays.nextWeek[day]}
                  onCheckedChange={() => handleBothToggle(day)}
                />
              </div>
            )}
            
            <div className="w-8 flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Info className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to toggle availability for {day}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        ))}
        
        <div className="mt-4 flex justify-end">
          <Button 
            variant="outline"
            size="sm"
            onClick={clearAllSelections}
            className="text-xs"
          >
            <Trash className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Quick Templates */}
      <QuickTemplates 
        onApplyTemplate={onApplyTemplate || (() => {})}
        onClearAll={clearAllSelections}
        onSaveAndApply={handleSaveAndApply}
      />
    </div>
  );
};

export default DaySelector;
