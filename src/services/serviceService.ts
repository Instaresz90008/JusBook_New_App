
import apiClient from './apiClient';
import { Service, ServiceFormData } from '../types/service';

const serviceService = {
  // Create a new service
  createService: async (serviceData: ServiceFormData): Promise<Service> => {
    const response = await apiClient.post<{ success: boolean; data: Service }>('/services', serviceData);
    return response.data.data;
  },
  
  // Get all services for authenticated user
  getUserServices: async (): Promise<Service[]> => {
    const response = await apiClient.get<{ success: boolean; data: Service[] }>('/services');
    return response.data.data;
  },
  
  // Get a public service by ID (no auth required)
  getPublicService: async (id: string): Promise<Service> => {
    const response = await apiClient.get<{ success: boolean; data: Service }>(`/services/public/${id}`);
    return response.data.data;
  },
  
  // Get a specific service by ID (requires auth)
  getService: async (id: string): Promise<Service> => {
    const response = await apiClient.get<{ success: boolean; data: Service }>(`/services/${id}`);
    return response.data.data;
  },
  
  // Update an existing service
  updateService: async (id: string, serviceData: Partial<ServiceFormData>): Promise<Service> => {
    const response = await apiClient.put<{ success: boolean; data: Service }>(`/services/${id}`, serviceData);
    return response.data.data;
  },
  
  // Delete a service
  deleteService: async (id: string): Promise<void> => {
    await apiClient.delete(`/services/${id}`);
  }
};

export default serviceService;
