
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Error handling helper
const handleApiError = (error: unknown) => {
  console.error('API Error:', error);
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  toast.error(errorMessage);
  return Promise.reject(error);
};

// Type definitions
export interface User {
  id: string | number;
  username: string;
  email: string;
}

export interface Conversation {
  id: number;
  user_id: string;
  user_query: string;
  response: string;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
}

// Auth API functions
export const authApi = {
  register: async (username: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');
      
      // Store token in localStorage
      if (data.data?.token) {
        localStorage.setItem('auth_token', data.data.token);
      }
      
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Login failed');
      
      // Store token in localStorage
      if (data.data?.token) {
        localStorage.setItem('auth_token', data.data.token);
      }
      
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  getProfile: async (): Promise<User> => {
    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch profile');
      
      return data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  logout: () => {
    localStorage.removeItem('auth_token');
  }
};

// Voice assistant API functions
export const voiceApi = {
  processQuery: async (query: string, userId?: string): Promise<Conversation> => {
    try {
      const token = localStorage.getItem('auth_token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const response = await fetch(`${API_URL}/conversations/query`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ 
          query, 
          userId: userId || 'anonymous' 
        }),
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to process query');
      
      return data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  getConversationHistory: async (userId: string, limit = 10): Promise<Conversation[]> => {
    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`${API_URL}/conversations/history/${userId}?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch conversation history');
      
      return data.data;
    } catch (error) {
      return handleApiError(error);
    }
  },
  
  getConversation: async (id: number): Promise<Conversation> => {
    try {
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`${API_URL}/conversations/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch conversation');
      
      return data.data;
    } catch (error) {
      return handleApiError(error);
    }
  }
};

// Export a default API object
const api = {
  auth: authApi,
  voice: voiceApi
};

export default api;
