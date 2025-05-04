
import apiClient from './apiClient';
import { Slot } from '../types/slot';

const slotService = {
  // Create slots
  createSlots: async (slotsData: { service_id: string; slots: any[] }): Promise<Slot[]> => {
    const response = await apiClient.post<{ success: boolean; data: Slot[] }>('/slots', slotsData);
    return response.data.data;
  },
  
  // Get slots for a specific service
  getServiceSlots: async (serviceId: string): Promise<Slot[]> => {
    const response = await apiClient.get<{ success: boolean; data: Slot[] }>(`/slots/service/${serviceId}`);
    return response.data.data;
  },
  
  // Get slots by date range
  getSlotsByDateRange: async (startDate: string, endDate: string): Promise<Slot[]> => {
    const response = await apiClient.get<{ success: boolean; data: Slot[] }>(
      `/slots/daterange?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data.data;
  },
  
  // Update slot availability
  updateSlotAvailability: async (id: string, isAvailable: boolean): Promise<Slot> => {
    const response = await apiClient.put<{ success: boolean; data: Slot }>(
      `/${id}/availability`,
      { is_available: isAvailable }
    );
    return response.data.data;
  },
  
  // Delete slots for a service
  deleteServiceSlots: async (serviceId: string): Promise<void> => {
    await apiClient.delete(`/slots/service/${serviceId}`);
  },
  
  // Get public service slots (no auth required)
  getPublicServiceSlots: async (serviceId: string): Promise<Slot[]> => {
    const response = await apiClient.get<{ success: boolean; data: Slot[] }>(
      `/slots/public/service/${serviceId}`
    );
    return response.data.data;
  },
  
  // Get slot by booking link (no auth required)
  getSlotByBookingLink: async (bookingLink: string): Promise<Slot> => {
    const response = await apiClient.get<{ success: boolean; data: Slot }>(
      `/slots/public/booking/${bookingLink}`
    );
    return response.data.data;
  }
};

export default slotService;
