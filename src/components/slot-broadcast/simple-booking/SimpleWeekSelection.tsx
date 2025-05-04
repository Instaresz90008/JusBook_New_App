
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useWeeksData } from "@/hooks/useWeeksData";
import { useTemplateManager } from "@/hooks/useTemplateManager";
import WeekSelector from "./WeekSelector";
import WeekControls from "./WeekControls";
import QuickTemplates from "../templates/QuickTemplates";

interface SimpleWeekSelectionProps {
  selectedDates: string[];
  setSelectedDates: (dates: string[]) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  duration: string;
}

const SimpleWeekSelection = ({
  selectedDates,
  setSelectedDates,
  startTime,
  setStartTime,
  endTime, 
  setEndTime,
  duration
}: SimpleWeekSelectionProps) => {
  const { toast } = useToast();
  const [showWeekend, setShowWeekend] = useState(true);
  const { weeks, setWeeks } = useWeeksData();
  
  const { applyTemplate, clearAllSelections } = useTemplateManager({
    weeks,
    setWeeks,
    setStartTime,
    setEndTime,
    setSelectedDates
  });
  
  return (
    <div className="space-y-6">
      <WeekControls 
        showWeekend={showWeekend}
        setShowWeekend={setShowWeekend}
      />
      
      <WeekSelector 
        weeks={weeks} 
        setWeeks={setWeeks} 
        showWeekend={showWeekend}
        onSelectedDatesChange={setSelectedDates}
      />
      
      <QuickTemplates 
        onApplyTemplate={applyTemplate}
        onClearAll={clearAllSelections}
      />
      
      {/* No time/duration settings here - they come from the service panel */}
    </div>
  );
};

export default SimpleWeekSelection;
