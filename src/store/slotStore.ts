
// import { create } from 'zustand';
// import { logger } from '../utils/logger';

// interface SlotState {
//   // Basic state
//   viewMode: "advanced" | "simple";
//   selectedDates: string[];
//   service: string;
//   startTime: string;
//   endTime: string;
//   duration: string;
//   serviceCost: number;
//   showSummaryDialog: boolean;
//   slotSummary: any | null;
  
//   // Actions
//   setViewMode: (mode: "advanced" | "simple") => void;
//   setSelectedDates: (dates: string[]) => void;
//   setService: (service: string) => void;
//   setStartTime: (time: string) => void;
//   setEndTime: (time: string) => void;
//   setDuration: (duration: string) => void;
//   setServiceCost: (cost: number) => void;
//   setShowSummaryDialog: (show: boolean) => void;
//   setSlotSummary: (summary: any) => void;
  
//   // Additional actions
//   toggleViewMode: () => void;
//   clearSelections: () => void;
// }

// export const useSlotStore = create<SlotState>((set) => ({
//   // Initial state
//   viewMode: "simple",
//   selectedDates: [],
//   service: "Candidate Interview",
//   startTime: "12:00 AM",
//   endTime: "12:00 PM",
//   duration: "15 mins",
//   serviceCost: 1.0,
//   showSummaryDialog: false,
//   slotSummary: null,

//   // Basic setters
//   setViewMode: (mode) => {
//     logger.trackEvent('set_view_mode', { mode });
//     set({ viewMode: mode });
//   },
//   setSelectedDates: (dates) => {
//     logger.trackEvent('set_selected_dates', { count: dates.length });
//     set({ selectedDates: dates });
//   },
//   setService: (service) => {
//     logger.trackEvent('set_service', { service });
//     set({ service });
//   },
//   setStartTime: (time) => {
//     logger.trackEvent('set_start_time', { time });
//     set({ startTime: time });
//   },
//   setEndTime: (time) => {
//     logger.trackEvent('set_end_time', { time });
//     set({ endTime: time });
//   },
//   setDuration: (duration) => {
//     logger.trackEvent('set_duration', { duration });
//     set({ duration });
//   },
//   setServiceCost: (cost) => {
//     logger.trackEvent('set_service_cost', { cost });
//     set({ serviceCost: cost });
//   },
//   setShowSummaryDialog: (show) => {
//     logger.trackEvent('toggle_summary_dialog', { show });
//     set({ showSummaryDialog: show });
//   },
//   setSlotSummary: (summary) => {
//     logger.trackEvent('set_slot_summary', { summary });
//     set({ slotSummary: summary });
//   },

//   // Additional actions
//   toggleViewMode: () => {
//     set((state) => {
//       const newMode = state.viewMode === "advanced" ? "simple" : "advanced";
//       logger.trackEvent('toggle_view_mode', { newMode });
//       return { viewMode: newMode };
//     });
//   },
//   clearSelections: () => {
//     logger.trackEvent('clear_selections');
//     set({ 
//       selectedDates: [],
//       slotSummary: null 
//     });
//   },
// }));



import { create } from 'zustand';
import { logger } from '../utils/logger';

interface SlotState {
  // Basic state
  viewMode: "advanced" | "simple";
  selectedDates: string[];
  service: string;
  serviceId: string; // ✅ NEW
  startTime: string;
  endTime: string;
  duration: string;
  serviceCost: number;
  showSummaryDialog: boolean;
  slotSummary: any | null;

  // Actions
  setViewMode: (mode: "advanced" | "simple") => void;
  setSelectedDates: (dates: string[]) => void;
  setService: (service: string) => void;
  setServiceId: (id: string) => void;
  setStartTime: (time: string) => void;
  setEndTime: (time: string) => void;
  setDuration: (duration: string) => void;
  setServiceCost: (cost: number) => void;
  setShowSummaryDialog: (show: boolean) => void;
  setSlotSummary: (summary: any) => void;

  // Additional actions
  toggleViewMode: () => void;
  clearSelections: () => void;
}

export const useSlotStore = create<SlotState>((set) => ({
  // Initial state
  viewMode: "simple",
  selectedDates: [],
  service: "Select a Service",
  serviceId: "",
  startTime: "",
  endTime: "",
  duration: "",
  serviceCost: 1.0,
  showSummaryDialog: false,
  slotSummary: null,

  // Setters
  setViewMode: (mode) => {
    logger.trackEvent('set_view_mode', { mode });
    set({ viewMode: mode });
  },
  setSelectedDates: (dates) => {
    logger.trackEvent('set_selected_dates', { count: dates.length });
    set({ selectedDates: dates });
  },
  setService: (service) => {
    logger.trackEvent('set_service', { service });
    set({ service });
  },
  setServiceId: (id) => {
    logger.trackEvent('set_service_id', { id }); // ✅ NEW
    set({ serviceId: id });
  },
  setStartTime: (time) => {
    logger.trackEvent('set_start_time', { time });
    set({ startTime: time });
  },
  setEndTime: (time) => {
    logger.trackEvent('set_end_time', { time });
    set({ endTime: time });
  },
  setDuration: (duration) => {
    logger.trackEvent('set_duration', { duration });
    set({ duration });
  },
  setServiceCost: (cost) => {
    logger.trackEvent('set_service_cost', { cost });
    set({ serviceCost: cost });
  },
  setShowSummaryDialog: (show) => {
    logger.trackEvent('toggle_summary_dialog', { show });
    set({ showSummaryDialog: show });
  },
  setSlotSummary: (summary) => {
    logger.trackEvent('set_slot_summary', { summary });
    set({ slotSummary: summary });
  },

  // Additional actions
  toggleViewMode: () => {
    set((state) => {
      const newMode = state.viewMode === "advanced" ? "simple" : "advanced";
      logger.trackEvent('toggle_view_mode', { newMode });
      return { viewMode: newMode };
    });
  },
  clearSelections: () => {
    logger.trackEvent('clear_selections');
    set({ 
      selectedDates: [],
      slotSummary: null 
    });
  },
}));
