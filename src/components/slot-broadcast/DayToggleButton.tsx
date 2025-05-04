
import { Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DayToggleButtonProps {
  day: string;
  checked: boolean;
  onToggle: () => void;
  showCurrentWeek: boolean;
  showNextWeek: boolean;
  nextWeekChecked?: boolean;
  onBothToggle?: () => void;
}

const DayToggleButton = ({ 
  day, 
  checked, 
  onToggle, 
  showCurrentWeek, 
  showNextWeek, 
  nextWeekChecked, 
  onBothToggle 
}: DayToggleButtonProps) => {
  return (
    <div className="flex items-center py-2 border-b border-gray-100 last:border-0">
      <div className="w-32 font-medium">{day}</div>
      
      {showCurrentWeek && (
        <div className="flex-1 flex justify-center">
          <label className="flex items-center justify-center w-full">
            <Checkbox 
              checked={checked}
              onCheckedChange={onToggle}
            />
          </label>
        </div>
      )}
      
      {showNextWeek && (
        <div className="flex-1 flex justify-center">
          <label className="flex items-center justify-center w-full">
            <Checkbox 
              checked={nextWeekChecked}
              onCheckedChange={onToggle}
            />
          </label>
        </div>
      )}
      
      {showCurrentWeek && showNextWeek && onBothToggle && (
        <div className="flex-1 flex justify-center">
          <label className="flex items-center justify-center w-full">
            <Checkbox 
              checked={checked && nextWeekChecked}
              onCheckedChange={onBothToggle}
            />
          </label>
        </div>
      )}
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="ml-2 text-gray-400 hover:text-gray-600">
              <Info className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to toggle availability for {day}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DayToggleButton;
