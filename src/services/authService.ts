
import apiClient from './apiClient';
import { User } from '../types/user';

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
  };
}

const authService = {
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/users/register', {
      username,
      email,
      password
    }, { withCredentials: true });
    
    return response.data;
  },
  
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/users/login', {
      email,
      password
    }, { withCredentials: true });
    
    return response.data;
  },
  
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<{ success: boolean; data: User }>('/users/profile', 
      { withCredentials: true }
    );
    return response.data.data;
  },
  
  logout: async (): Promise<void> => {
    await apiClient.post('/users/logout', {}, { withCredentials: true });
  }
};

export default authService;
