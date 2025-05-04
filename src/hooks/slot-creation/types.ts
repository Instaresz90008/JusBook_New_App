
import { SlotSummary } from "@/components/slot-broadcast/types/slotSummary";

// Define types for the hook
export interface SelectedDaysRecord {
  currentWeek: Record<string, boolean>;
  nextWeek: Record<string, boolean>;
}

export interface SlotCreationState {
  // Service settings
  service: string;
  setService: (service: string) => void;
  serviceCost: number;
  setServiceCost: (cost: number) => void;
  
  // Time settings
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
  buffer: number;
  setBuffer: (buffer: number) => void;
  
  // Day selection
  selectedDays: SelectedDaysRecord;
  setSelectedDays: (days: SelectedDaysRecord) => void;
  
  // Dialog control
  showSummary: boolean;
  setShowSummary: (show: boolean) => void;
  slotSummary: SlotSummary;
  
  // Actions
  clearAllSelections: () => void;
  applyTemplate: (templateId: string) => void;
  saveSlot: () => Promise<void>;
  isSaving: boolean;
}
