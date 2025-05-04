
import apiClient from './apiClient';
import { Booking } from '../types/booking';

const bookingService = {
  // Create a booking (can be authenticated or not)
  createBooking: async (bookingData: Partial<Booking>): Promise<Booking> => {
    const response = await apiClient.post<{ success: boolean; data: Booking }>('/bookings', bookingData);
    return response.data.data;
  },
  
  // Get all bookings for the provider (requires auth)
  getProviderBookings: async (): Promise<Booking[]> => {
    const response = await apiClient.get<{ success: boolean; data: Booking[] }>('/bookings/provider');
    return response.data.data;
  },
  
  // Get bookings for a customer (can be authenticated or not)
  getCustomerBookings: async (customerEmail?: string): Promise<Booking[]> => {
    let url = '/bookings/customer';
    if (customerEmail && !localStorage.getItem('auth_token')) {
      url += `?email=${customerEmail}`;
    }
    
    const response = await apiClient.get<{ success: boolean; data: Booking[] }>(url);
    return response.data.data;
  },
  
  // Update booking status (requires auth)
  updateBookingStatus: async (id: string, status: string): Promise<Booking> => {
    const response = await apiClient.put<{ success: boolean; data: Booking }>(`/bookings/${id}/status`, { status });
    return response.data.data;
  },
  
  // Cancel a booking (can be authenticated or not)
  cancelBooking: async (id: string, cancellationReason?: string): Promise<void> => {
    await apiClient.delete(`/bookings/${id}`, { data: { cancellationReason } });
  },
  
  // Get booking details (can be authenticated or not)
  getBookingDetails: async (id: string): Promise<Booking> => {
    const response = await apiClient.get<{ success: boolean; data: Booking }>(`/bookings/${id}`);
    return response.data.data;
  }
};

export default bookingService;
