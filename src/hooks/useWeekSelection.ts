
import { useState } from "react";
import { addWeeks, startOfWeek, format, addDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export interface DayRecord {
  [day: string]: boolean;
}

export interface SelectedDaysRecord {
  currentWeek: DayRecord;
  nextWeek: DayRecord;
}

export interface Template {
  id: string;
  name: string;
  days: {
    [day: string]: boolean;
  };
  startTime: string;
  endTime: string;
}

const templates = {
  regular: {
    id: "regular",
    name: "Regular Work Hours",
    days: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false
    },
    startTime: "09:00 AM",
    endTime: "05:00 PM"
  },
  weekend: {
    id: "weekend",
    name: "Weekend Hours",
    days: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: true,
      Sunday: true
    },
    startTime: "10:00 AM",
    endTime: "04:00 PM"
  },
  evening: {
    id: "evening",
    name: "Evening Sessions",
    days: {
      Monday: true,
      Tuesday: true,
      Wednesday: true,
      Thursday: true,
      Friday: true,
      Saturday: false,
      Sunday: false
    },
    startTime: "06:00 PM",
    endTime: "09:00 PM"
  }
};

export const useWeekSelection = (
  initialSelectedDays: SelectedDaysRecord,
  onSelectedDaysChange: (days: SelectedDaysRecord) => void,
  initialStartTime?: string,
  onStartTimeChange?: (time: string) => void,
  initialEndTime?: string,
  onEndTimeChange?: (time: string) => void
) => {
  const { toast } = useToast();
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(() => {
    // Start week from Monday (1) instead of Sunday (0)
    return startOfWeek(new Date(), { weekStartsOn: 1 });
  });
  const [showCurrentWeek, setShowCurrentWeek] = useState(true);
  const [showNextWeek, setShowNextWeek] = useState(true);
  
  const handleDayToggle = (week: 'currentWeek' | 'nextWeek', day: string) => {
    onSelectedDaysChange({
      ...initialSelectedDays,
      [week]: {
        ...initialSelectedDays[week],
        [day]: !initialSelectedDays[week][day],
      }
    });
  };
  
  const handleBothToggle = (day: string) => {
    const currentState = initialSelectedDays.currentWeek[day] && initialSelectedDays.nextWeek[day];
    onSelectedDaysChange({
      currentWeek: { ...initialSelectedDays.currentWeek, [day]: !currentState },
      nextWeek: { ...initialSelectedDays.nextWeek, [day]: !currentState },
    });
  };

  const toggleWeekVisibility = (week: 'currentWeek' | 'nextWeek') => {
    if (week === 'currentWeek') {
      setShowCurrentWeek(!showCurrentWeek);
    } else {
      setShowNextWeek(!showNextWeek);
    }
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentWeekStartDate(prev => 
      direction === 'next' ? addWeeks(prev, 1) : addWeeks(prev, -1)
    );
  };

  const applyTemplate = (templateId: string) => {
    const template = templates[templateId as keyof typeof templates];
    if (!template) return;
    
    onSelectedDaysChange({
      currentWeek: { ...template.days },
      nextWeek: { ...template.days }
    });
    
    // Update times if the hooks are provided
    if (onStartTimeChange && template.startTime) {
      onStartTimeChange(template.startTime);
    }
    
    if (onEndTimeChange && template.endTime) {
      onEndTimeChange(template.endTime);
    }
    
    toast({
      title: "Template Applied",
      description: `Applied the ${template.name} template successfully.`
    });
  };

  const clearAllSelections = () => {
    onSelectedDaysChange({
      currentWeek: {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
      },
      nextWeek: {
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
      }
    });

    toast({
      description: "All day selections have been cleared.",
    });
  };

  // Format the current week date display
  const formatCurrentWeekDisplay = () => {
    return `(${format(currentWeekStartDate, "MMM d")} - ${format(addDays(currentWeekStartDate, 6), "MMM d")})`;
  };

  // Format the next week date display
  const formatNextWeekDisplay = () => {
    const nextWeekStart = addWeeks(currentWeekStartDate, 1);
    return `(${format(nextWeekStart, "MMM d")} - ${format(addDays(nextWeekStart, 6), "MMM d")})`;
  };

  return {
    currentWeekStartDate,
    showCurrentWeek,
    showNextWeek,
    handleDayToggle,
    handleBothToggle,
    toggleWeekVisibility,
    navigateWeek,
    clearAllSelections,
    applyTemplate,
    formatCurrentWeekDisplay,
    formatNextWeekDisplay
  };
};
