
import apiClient from './apiClient';
import { Conversation } from '../types/conversation';

const conversationService = {
  // Process a voice query - can be anonymous or authenticated
  processQuery: async (query: string, userId?: string): Promise<Conversation> => {
    const response = await apiClient.post<{ success: boolean; data: Conversation }>('/conversations/query', { 
      query, 
      userId: userId || 'anonymous' 
    });
    return response.data.data;
  },
  
  // Get conversation history for a user (requires auth)
  getConversationHistory: async (userId: string, limit = 10): Promise<Conversation[]> => {
    const response = await apiClient.get<{ success: boolean; data: Conversation[] }>(`/conversations/history/${userId}?limit=${limit}`);
    return response.data.data;
  },
  
  // Get specific conversation (requires auth)
  getConversation: async (id: number): Promise<Conversation> => {
    const response = await apiClient.get<{ success: boolean; data: Conversation }>(`/conversations/${id}`);
    return response.data.data;
  }
};

export default conversationService;
