
import { useDynamicSlotCreation } from "@/hooks/slot-creation/useDynamicSlotCreation";
import SlotSummaryDialog from "./slot-creation/SlotSummaryDialog";
import SlotServicePanel from "./slot-creation/SlotServicePanel";
import SlotDaySelectorWrapper from "./slot-creation/SlotDaySelectorWrapper";
import SlotActionButtons from "./slot-creation/SlotActionButtons";
import ConditionalSection from "./slot-creation/ConditionalSection";

interface SlotCreationProps {
  hideWeekSelection?: boolean;
  hideServiceSelection?: boolean;
}

const SlotCreation = ({ 
  hideWeekSelection = false,
  hideServiceSelection = false
}: SlotCreationProps) => {
  const {
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    service,
    setService,
    duration,
    setDuration,
    showSummary,
    setShowSummary,
    serviceCost,
    setServiceCost,
    selectedDays,
    setSelectedDays,
    applyTemplate,
    saveSlot,
    clearAllSelections,
    slotSummary,
    isSaving
  } = useDynamicSlotCreation();

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="space-y-6">
        {/* Service and Time Settings */}
        <ConditionalSection show={!hideServiceSelection}>
          <SlotServicePanel
            service={service}
            setService={setService}
            serviceCost={serviceCost}
            setServiceCost={setServiceCost}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            duration={duration}
            setDuration={setDuration}
          />
        </ConditionalSection>
        
        {/* Day Selector - Only shown if not hidden */}
        <ConditionalSection show={!hideWeekSelection}>
          <SlotDaySelectorWrapper
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
            onApplyTemplate={applyTemplate}
          />
        </ConditionalSection>
        
        {/* Actions */}
        <ConditionalSection show={!hideServiceSelection && !hideWeekSelection}>
          <SlotActionButtons 
            onClear={clearAllSelections}
            onSave={saveSlot}
            isSaving={isSaving}
          />
        </ConditionalSection>
      </div>

      {/* Summary Dialog */}
      <SlotSummaryDialog
        open={showSummary}
        onOpenChange={setShowSummary}
        service={service}
        timeRange={slotSummary.timeRange}
        duration={duration}
        serviceCost={serviceCost}
        selectedDays={
          // Fix the type mismatch: convert array to number if it's an array
          Array.isArray(slotSummary.selectedDays) 
            ? slotSummary.selectedDays.length 
            : slotSummary.selectedDays
        }
        totalSlots={slotSummary.totalSlots}
        hideWeekSelection={hideWeekSelection}
        sharableLink={slotSummary.sharableLink}
      />
    </div>
  );
};

export default SlotCreation;
