//@ts-nocheck
import { Button } from "@/components/ui/button";
import SlotCreation from "@/components/slot-broadcast/SlotCreation";
import SimpleWeekSelection from "@/components/slot-broadcast/simple-booking/SimpleWeekSelection";
import ViewModeToggle from "./ViewModeToggle";
import { useToast } from "@/hooks/use-toast";
import { useSlotStore } from "@/store/slotStore";
import { logger } from "@/utils/logger";
import { calculateSimpleSlotSummary } from "@/components/slot-broadcast/utils/slotCalculations";
import { useState } from "react";
import slotService from "@/services/slotService";
import { format } from "date-fns";

const WeekSelectionSection = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  
  const { 
    viewMode,
    selectedDates, setSelectedDates,
    startTime, setStartTime,
    endTime, setEndTime,
    duration, setDuration,
    service, serviceCost,
    setShowSummaryDialog, setSlotSummary,
    serviceId
  } = useSlotStore();

  logger.debug('WeekSelectionSection rendered', { 
    module: 'components',
    data: { viewMode, selectedDatesCount: selectedDates.length }
  });

  const handleSaveAndApply = async () => {
    if (selectedDates.length === 0) {
      logger.warn('No days selected for availability', { module: 'slots' });
      toast({
        title: "No days selected",
        description: "Please select at least one day to set availability.",
        variant: "destructive"
      });
      return;
    }

    if (!serviceId) {
      toast({
        title: "No service selected",
        description: "Please select a service to set availability for.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsSaving(true);
      
      // Convert duration string to minutes
      const durationMinutes = parseInt(duration.split(' ')[0]);
      console.log(durationMinutes);
      
      // Generate slots for each selected date
      const slotData = selectedDates.map(dateStr => {
        const date = new Date(dateStr);
        return {
          service_id: serviceId,
          slot_date: format(date, 'yyyy-MM-dd'),
          start_time: startTime,
          end_time: endTime,
          durationMinutes:durationMinutes,
          is_available: true
        };
      });
      
      // Make the API call to create slots
      await slotService.createSlots({
        service_id: serviceId,
        slots: slotData
      });
      
      // Calculate slot summary and ensure totalSlots is a number
      const summary = calculateSimpleSlotSummary(
        service,
        selectedDates,
        startTime,
        endTime,
        duration,
        serviceCost
      );
      
      logger.info('Availability saved', { 
        module: 'slots', 
        data: { totalSlots: summary.totalSlots }
      });
      
      setSlotSummary(summary);
      setShowSummaryDialog(true);
      
      toast({
        title: "Availability Set",
        description: "Your availability has been saved successfully.",
      });
    } catch (err) {
      logger.error('Failed to save availability', { 
        module: 'slots',
        data: { errorMessage: err instanceof Error ? err.message : String(err) }
      });
      
      toast({
        title: "Error",
        description: "Failed to save availability. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="border-t pt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Week Selection</h3>
        <ViewModeToggle />
      </div>
      
      {viewMode === "advanced" ? (
        <SlotCreation hideServiceSelection={true} />
      ) : (
        <div className="bg-white border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Week Selection</h3>
          <SimpleWeekSelection 
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            duration={duration}
          />
          <div className="pt-4 flex justify-end">
            <Button 
              onClick={handleSaveAndApply}
              className="bg-blue-600 text-white hover:bg-blue-700"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save & Apply"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekSelectionSection;