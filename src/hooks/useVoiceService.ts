
import { useState, useCallback } from 'react';
import conversationService from '../services/conversationService';
import { Conversation } from '../types/conversation';
import { useAuth } from './useAuth';

export const useVoiceService = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversationHistory, setConversationHistory] = useState<Conversation[]>([]);
  const { user } = useAuth();

  const processQuery = useCallback(async (query: string) => {
    setIsProcessing(true);
    setCurrentQuery(query);
    
    try {
      const response = await conversationService.processQuery(query, user?.id?.toString());
      setCurrentResponse(response.response);
      setCurrentConversation(response);
      return response;
    } catch (error) {
      console.error('Error processing voice query:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  }, [user]);

  const processVoiceQuery = processQuery; // Alias for backward compatibility

  const fetchConversationHistory = useCallback(async (limit = 10) => {
    if (!user) return;
    
    try {
      const history = await conversationService.getConversationHistory(user.id.toString(), limit);
      setConversationHistory(history);
      return history;
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      throw error;
    }
  }, [user]);

  const getConversation = useCallback(async (id: number) => {
    try {
      return await conversationService.getConversation(id);
    } catch (error) {
      console.error(`Error fetching conversation #${id}:`, error);
      throw error;
    }
  }, []);

  return {
    processQuery,
    processVoiceQuery,
    fetchConversationHistory,
    getConversation,
    isProcessing,
    currentQuery,
    currentResponse,
    currentConversation,
    conversationHistory
  };
};
