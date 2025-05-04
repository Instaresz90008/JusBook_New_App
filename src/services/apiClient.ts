
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create an axios instance with common configuration
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This is important for sending cookies
});

// Add a response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Type guard to ensure error.response exists and has data
    const errorMessage = error.response?.data && typeof error.response.data === 'object' && 'error' in error.response.data 
      ? String(error.response.data.error) 
      : error.message || 'Unknown error occurred';
    
    // Show toast notification for errors
    toast.error(errorMessage);
    
    return Promise.reject(error);
  }
);

export default apiClient;
