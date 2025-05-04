
import { format, addDays, addWeeks } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

interface WeekVisibilityToggleProps {
  showCurrentWeek: boolean;
  showNextWeek: boolean;
  currentWeekStartDate: Date;
  onToggleWeekVisibility: (week: 'currentWeek' | 'nextWeek') => void;
}

const WeekVisibilityToggle = ({ 
  showCurrentWeek, 
  showNextWeek, 
  currentWeekStartDate, 
  onToggleWeekVisibility 
}: WeekVisibilityToggleProps) => {
  return (
    <div className="flex space-x-6 mb-4">
      <label className="flex items-center space-x-2">
        <Checkbox 
          id="current-week" 
          checked={showCurrentWeek}
          onCheckedChange={() => onToggleWeekVisibility('currentWeek')}
        />
        <span className="whitespace-nowrap">
          Current Week ({format(currentWeekStartDate, "MMM d")} - {format(addDays(currentWeekStartDate, 6), "MMM d")})
        </span>
      </label>
      
      <label className="flex items-center space-x-2">
        <Checkbox 
          id="next-week" 
          checked={showNextWeek}
          onCheckedChange={() => onToggleWeekVisibility('nextWeek')}
        />
        <span className="whitespace-nowrap">
          Next Week ({format(addWeeks(currentWeekStartDate, 1), "MMM d")} - {format(addDays(addWeeks(currentWeekStartDate, 1), 6), "MMM d")})
        </span>
      </label>
    </div>
  );
};

export default WeekVisibilityToggle;
