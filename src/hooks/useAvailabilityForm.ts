
import { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import slotService from '@/services/slotService';
import { SlotData } from '@/types/slot';

export const useAvailabilityForm = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [service, setService] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [showWeekend, setShowWeekend] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleReset = useCallback(() => {
    setDate(null);
    setService('');
    setStartTime('');
    setEndTime('');
    setShowWeekend(false);
    toast.info("Form has been reset");
  }, []);

  const handleSaveSlots = useCallback(async () => {
    if (!date || !service || !startTime || !endTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSaving(true);
      
      // Parse duration from the service (this would come from service details in a real app)
      const duration = 0; // Default to 30 mins
      
      // Create slot data correctly according to API expectations
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Create the properly formatted slot data
      const slotData: SlotData = {
        slot_date: formattedDate,
        start_time: startTime,
        end_time: endTime,
        is_available: true
      };
      
      // Call the API with the correct format
      await slotService.createSlots({
        service_id: service,
        slots: [slotData]
      });
      
      toast.success("Slots have been successfully saved");
      
      // Optional: Reset form after successful save
      // handleReset();
    } catch (error) {
      console.error("Failed to save slots:", error);
      toast.error("Failed to save slots. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }, [date, service, startTime, endTime]);

  return {
    date,
    setDate,
    service,
    setService,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    showWeekend,
    setShowWeekend,
    handleReset,
    handleSaveSlots,
    isSaving
  };
};

export default useAvailabilityForm;
