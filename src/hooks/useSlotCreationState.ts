
import { useState } from 'react';
import { toast } from "sonner";
import { SlotSummary } from '@/components/slot-broadcast/types/slotSummary';
import { SelectedDaysRecord, SlotCreationState } from './slot-creation/types';
import { applyTemplate, createEmptyDaysSelection } from './slot-creation/templateUtils';
import { useSlotSaving } from './slot-creation/useSlotSaving';

// Use 'export type' for re-exporting types with isolatedModules enabled
export type { SelectedDaysRecord } from './slot-creation/types';

export const useSlotCreationState = (): SlotCreationState => {
  // Service and time settings
  const [service, setService] = useState('');
  const [serviceCost, setServiceCost] = useState(1.0);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [buffer, setBuffer] = useState(10);

  // Week days selection with initial empty state
  const [selectedDays, setSelectedDays] = useState<SelectedDaysRecord>(createEmptyDaysSelection());

  // Dialog control
  const [showSummary, setShowSummary] = useState(false);
  
  // Slot summary state with proper typing
  const [slotSummary, setSlotSummary] = useState<SlotSummary>({
    timeRange: `${startTime} - ${endTime}`,
    selectedDays: [],
    totalSlots: 0,
    sharableLink: ''
  });
  
  // Use the slot saving hook
  const { saveSlot, isSaving } = useSlotSaving(
    service,
    startTime,
    endTime,
    duration,
    buffer,
    selectedDays,
    setShowSummary,
    setSlotSummary
  );

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedDays(createEmptyDaysSelection());
    toast.success('All selections have been cleared');
  };

  // Apply template function that calls the utility function
  const handleApplyTemplate = (templateId: string) => {
    setSelectedDays(applyTemplate(templateId, selectedDays));
  };

  return {
    service,
    setService,
    serviceCost,
    setServiceCost,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    duration,
    setDuration,
    buffer,
    setBuffer,
    selectedDays,
    setSelectedDays,
    showSummary,
    setShowSummary,
    slotSummary,
    clearAllSelections,
    applyTemplate: handleApplyTemplate,
    saveSlot,
    isSaving
  };
};
