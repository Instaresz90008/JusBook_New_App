
import apiClient from './apiClient';
import { Subscription, Transaction } from '../types/subscription';

const subscriptionService = {
  // Create a new subscription
  createSubscription: async (subscriptionData: Partial<Subscription>): Promise<Subscription> => {
    const response = await apiClient.post<{ success: boolean; data: Subscription }>('/subscriptions', subscriptionData);
    return response.data.data;
  },
  
  // Get active subscription
  getActiveSubscription: async (): Promise<Subscription> => {
    const response = await apiClient.get<{ success: boolean; data: Subscription }>('/subscriptions/active');
    return response.data.data;
  },
  
  // Get subscription history
  getSubscriptionHistory: async (): Promise<Subscription[]> => {
    const response = await apiClient.get<{ success: boolean; data: Subscription[] }>('/subscriptions/history');
    return response.data.data;
  },
  
  // Cancel subscription
  cancelSubscription: async (id: string): Promise<void> => {
    await apiClient.delete(`/subscriptions/${id}`);
  },
  
  // Record transaction
  recordTransaction: async (transactionData: Partial<Transaction>): Promise<Transaction> => {
    const response = await apiClient.post<{ success: boolean; data: Transaction }>('/subscriptions/transaction', transactionData);
    return response.data.data;
  },
  
  // Get transaction history
  getTransactionHistory: async (): Promise<Transaction[]> => {
    const response = await apiClient.get<{ success: boolean; data: Transaction[] }>('/subscriptions/transactions');
    return response.data.data;
  }
};

export default subscriptionService;
