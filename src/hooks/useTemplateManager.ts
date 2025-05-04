
import { useToast } from "@/hooks/use-toast";
import { WeekData } from "@/components/slot-broadcast/types/weekTypes";
import { format } from "date-fns";

interface UseTemplateManagerProps {
  weeks: WeekData[];
  setWeeks: React.Dispatch<React.SetStateAction<WeekData[]>>;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setSelectedDates: (dates: string[]) => void;
}

export const useTemplateManager = ({
  weeks,
  setWeeks,
  setStartTime,
  setEndTime,
  setSelectedDates
}: UseTemplateManagerProps) => {
  const { toast } = useToast();
  
  const applyTemplate = (templateId: string) => {
    let newWeeks = [...weeks];
    
    switch (templateId) {
      case "regular":
        // Monday to Friday (index 0-4 in each week)
        newWeeks = newWeeks.map(week => ({
          ...week,
          days: week.days.map((day, index) => ({
            ...day,
            selected: index < 5 // Monday to Friday (0-4)
          })),
          selectAll: false
        }));
        break;
      case "weekend":
        // Saturday and Sunday (index 5-6 in each week)
        newWeeks = newWeeks.map(week => ({
          ...week,
          days: week.days.map((day, index) => ({
            ...day,
            selected: index >= 5 // Saturday and Sunday (5-6)
          })),
          selectAll: false
        }));
        break;
      case "evening":
        // Set all days to false first
        newWeeks = newWeeks.map(week => ({
          ...week,
          days: week.days.map(day => ({
            ...day,
            selected: false
          })),
          selectAll: false
        }));
        
        // Then select Monday to Friday in first two weeks
        newWeeks[0].days = newWeeks[0].days.map((day, index) => ({
          ...day,
          selected: index < 5
        }));
        newWeeks[1].days = newWeeks[1].days.map((day, index) => ({
          ...day,
          selected: index < 5
        }));
        
        // Set time range for evening
        setStartTime("06:00 PM");
        setEndTime("09:00 PM");
        break;
      case "morning":
        // Set all days to false first
        newWeeks = newWeeks.map(week => ({
          ...week,
          days: week.days.map(day => ({
            ...day,
            selected: false
          })),
          selectAll: false
        }));
        
        // Then select Monday to Friday in all weeks
        newWeeks = newWeeks.map(week => ({
          ...week,
          days: week.days.map((day, index) => ({
            ...day,
            selected: index < 5
          })),
          selectAll: false
        }));
        
        // Set time range for morning
        setStartTime("07:00 AM");
        setEndTime("12:00 PM");
        break;
    }
    
    // Update weeks state
    setWeeks(newWeeks);
    
    // Update selectedDates
    const updatedDates: string[] = [];
    for (const week of newWeeks) {
      for (const day of week.days) {
        if (day.selected) {
          updatedDates.push(format(day.date, "yyyy-MM-dd"));
        }
      }
    }
    setSelectedDates(updatedDates);
  };
  
  const clearAllSelections = () => {
    // Create a new array with all selections cleared
    const clearedWeeks = weeks.map(week => ({
      ...week,
      selectAll: false,
      days: week.days.map(day => ({
        ...day,
        selected: false
      }))
    }));
    
    // Update the state with the new array
    setWeeks(clearedWeeks);
    setSelectedDates([]);
    
    toast({
      description: "All day selections have been cleared.",
    });
  };
  
  return { applyTemplate, clearAllSelections };
};
