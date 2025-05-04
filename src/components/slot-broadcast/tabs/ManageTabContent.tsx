
import React, { useEffect } from "react";
import SlotManagement from "@/components/slot-broadcast/SlotManagement";
import ServiceTimeSettingsPanel from "./ServiceTimeSettingsPanel";
import WeekSelectionSection from "./WeekSelectionSection";
import { useSlotStore } from "@/store/slotStore";
import { logger } from "@/utils/logger";

const ManageTabContent = () => {
  const { 
    viewMode, setViewMode,
    selectedDates, setSelectedDates,
    service, setService,
    startTime, setStartTime,
    endTime, setEndTime,
    duration, setDuration,
    serviceCost, setServiceCost,
    setShowSummaryDialog, setSlotSummary
  } = useSlotStore();

  // Log component mount
  useEffect(() => {
    logger.info('ManageTabContent mounted', { module: 'components' });
    
    // Example of how to clean up (if needed)
    return () => {
      logger.info('ManageTabContent unmounted', { module: 'components' });
    };
  }, []);

  logger.debug('ManageTabContent rendered', {
    module: 'components',
    data: { viewMode, selectedDatesCount: selectedDates.length }
  });

  return (
    <div className="space-y-6">
      <div className="bg-amber-50/30 p-6 rounded-lg border">
        <div className="flex flex-col gap-6">
          {/* Service selection section is always visible */}
          <ServiceTimeSettingsPanel />
          
          {/* Week selection section with view mode toggle */}
          <WeekSelectionSection />
        </div>
      </div>
      <SlotManagement />
    </div>
  );
};

export default ManageTabContent;
