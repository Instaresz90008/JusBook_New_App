
import React from "react";
import DaySelector from "../DaySelector";

interface SelectedDaysState {
  currentWeek: Record<string, boolean>;
  nextWeek: Record<string, boolean>;
}

interface SlotDaySelectorWrapperProps {
  selectedDays: SelectedDaysState;
  setSelectedDays: React.Dispatch<React.SetStateAction<SelectedDaysState>>;
  onApplyTemplate: (templateId: string) => void;
}

const SlotDaySelectorWrapper = ({
  selectedDays,
  setSelectedDays,
  onApplyTemplate
}: SlotDaySelectorWrapperProps) => {
  return (
    <div className="bg-white rounded-lg border p-5">
      <DaySelector 
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
        onApplyTemplate={onApplyTemplate}
      />
    </div>
  );
};

export default SlotDaySelectorWrapper;
