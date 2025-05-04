
import { useState, useCallback } from 'react';
import { toast } from "sonner";
import slotService from '@/services/slotService';
import { SlotSummary } from "@/components/slot-broadcast/types/slotSummary";
import { SelectedDaysRecord } from "./types";
import { calculateSelectedDays, calculateTotalSlots, generateSlotsFromSelection } from "./slotCalculationUtils";

export const useSlotSaving = (
  service: string,
  startTime: string,
  endTime: string,
  duration: string,
  buffer: number,
  selectedDays: SelectedDaysRecord,
  setShowSummary: (show: boolean) => void,
  setSlotSummary: (summary: SlotSummary) => void,
  serviceId: string | null = null
) => {
  const [isSaving, setIsSaving] = useState(false);
  
  const saveSlot = useCallback(async () => {
    try {
      if (!serviceId) {
        toast.error('Please select a valid service');
        return;
      }

      setIsSaving(true);
      const selectedDaysArray = calculateSelectedDays(selectedDays);
      
      if (selectedDaysArray.length === 0) {
        toast.error('Please select at least one day');
        return;
      }
      
      const totalSlots = calculateTotalSlots(startTime, endTime, duration, buffer, selectedDays);
      
      if (totalSlots <= 0) {
        toast.error('Invalid time range or duration. Please adjust your settings.');
        return;
      }

      // Generate slots from selected days
      const generatedSlots = generateSlotsFromSelection(
        selectedDays, 
        startTime, 
        endTime, 
        duration, 
        buffer, 
        service
      );
      
      if (generatedSlots.length === 0) {
        toast.error('Failed to generate slots. Please check your selection.');
        return;
      }

      // Convert to API format
      const slotData = generatedSlots.map(slot => ({
        service_id: serviceId,
        slot_date: slot.date,
        start_time: slot.startTime,
        end_time: slot.endTime,
        is_available: true
      }));

      // Call API to create slots
      await slotService.createSlots({
        service_id: serviceId,
        slots: slotData
      });
      
      // Update summary for dialog with properly typed values
      setSlotSummary({
        timeRange: `${startTime} - ${endTime}`,
        selectedDays: selectedDaysArray,
        totalSlots: totalSlots, // Ensure this is always a number
        sharableLink: `${window.location.origin}/book/${service.toLowerCase().replace(/\s+/g, '-')}`
      });

      toast.success(`Successfully created ${totalSlots} slots!`);
      setShowSummary(true);
    } catch (error) {
      console.error('Error saving slots:', error);
      toast.error('Failed to save slots. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }, [
    service,
    serviceId,
    startTime,
    endTime,
    duration,
    buffer,
    selectedDays,
    setShowSummary,
    setSlotSummary
  ]);

  return { saveSlot, isSaving };
};
