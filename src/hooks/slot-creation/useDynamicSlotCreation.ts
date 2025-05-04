
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { useSlotSaving } from './useSlotSaving';
import { createEmptyDaysSelection } from './templateUtils';
import { SelectedDaysRecord } from './types';
import serviceService from '@/services/serviceService';
import { Service } from '@/types/service';
import { SlotSummary } from '@/components/slot-broadcast/types/slotSummary';

export const useDynamicSlotCreation = () => {
  // Service and time settings
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [service, setService] = useState('N/A');
  const [serviceCost, setServiceCost] = useState(1.0);
  const [startTime, setStartTime] = useState('9:00 AM');
  const [endTime, setEndTime] = useState('5:00 PM');
  const [duration, setDuration] = useState('30 mins');
  const [buffer, setBuffer] = useState(10);
  const [serviceId, setServiceId] = useState<string | null>(null);

  // Week days selection with initial empty state
  const [selectedDays, setSelectedDays] = useState<SelectedDaysRecord>(createEmptyDaysSelection());

  // Dialog control
  const [showSummary, setShowSummary] = useState(false);
  
  // Slot summary state
  const [slotSummary, setSlotSummary] = useState<SlotSummary>({
    timeRange: `${startTime} - ${endTime}`,
    selectedDays: [],
    totalSlots: 0,
    sharableLink: ''
  });
  
  // Fetch available services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const fetchedServices = await serviceService.getUserServices();
        setServices(fetchedServices);
        
        // Set default service if available
        if (fetchedServices.length > 0) {
          setService(fetchedServices[0].name);
          setServiceCost(fetchedServices[0].cost_factor);
          setServiceId(fetchedServices[0].id);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Update serviceId when service name changes
  useEffect(() => {
    const matchedService = services.find(s => s.name === service);
    if (matchedService) {
      setServiceId(matchedService.id);
      setServiceCost(matchedService.cost_factor);
    }
  }, [service, services]);
  
  // Use the slot saving hook
  const { saveSlot, isSaving } = useSlotSaving(
    service,
    startTime,
    endTime,
    duration,
    buffer,
    selectedDays,
    setShowSummary,
    setSlotSummary,
    serviceId
  );

  // Clear all selections
  const clearAllSelections = () => {
    setSelectedDays(createEmptyDaysSelection());
    toast.success('All selections have been cleared');
  };

  // Apply template function
  const handleApplyTemplate = (templateId: string) => {
    // Implementation remains in templateUtils
    const { applyTemplate } = require('./templateUtils');
    setSelectedDays(applyTemplate(templateId, selectedDays));
    toast.success(`Template "${templateId}" applied successfully`);
  };

  return {
    services,
    loading,
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
    isSaving,
    serviceId
  };
};
