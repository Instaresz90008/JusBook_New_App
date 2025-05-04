
const Subscription = require('../models/subscription');

const subscriptionController = {
  // Create a new subscription
  createSubscription: async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        plan_name,
        plan_price,
        billing_period,
        start_date,
        end_date,
        payment_method,
        card_last_four
      } = req.body;
      
      const subscriptionData = {
        user_id: userId,
        plan_name,
        plan_price,
        billing_period,
        start_date,
        end_date,
        status: 'active',
        payment_method,
        card_last_four
      };
      
      const subscription = await Subscription.create(subscriptionData);
      
      res.status(201).json({
        success: true,
        data: subscription
      });
    } catch (error) {
      console.error('Error creating subscription:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to create subscription' 
      });
    }
  },
  
  // Get active subscription for authenticated user
  getActiveSubscription: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const subscription = await Subscription.getActiveByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: subscription || null
      });
    } catch (error) {
      console.error('Error fetching active subscription:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch subscription' 
      });
    }
  },
  
  // Get subscription history for authenticated user
  getSubscriptionHistory: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const subscriptions = await Subscription.getHistoryByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: subscriptions
      });
    } catch (error) {
      console.error('Error fetching subscription history:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch subscription history' 
      });
    }
  },
  
  // Cancel subscription
  cancelSubscription: async (req, res) => {
    try {
      const userId = req.user.id;
      const subscriptionId = req.params.id;
      
      // Verify subscription exists and belongs to user
      const subscription = await Subscription.getActiveByUserId(userId);
      
      if (!subscription || subscription.id !== parseInt(subscriptionId)) {
        return res.status(404).json({
          success: false,
          error: 'Subscription not found or not active'
        });
      }
      
      const cancelledSubscription = await Subscription.cancelSubscription(subscriptionId, userId);
      
      res.status(200).json({
        success: true,
        data: cancelledSubscription,
        message: 'Subscription cancelled successfully'
      });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to cancel subscription' 
      });
    }
  },
  
  // Record billing transaction
  recordTransaction: async (req, res) => {
    try {
      const userId = req.user.id;
      const {
        subscription_id,
        amount,
        currency,
        status,
        payment_method,
        payment_date,
        invoice_url
      } = req.body;
      
      // Verify subscription exists and belongs to user
      const subscription = await Subscription.getActiveByUserId(userId);
      
      if (!subscription || subscription.id !== parseInt(subscription_id)) {
        return res.status(404).json({
          success: false,
          error: 'Subscription not found or not active'
        });
      }
      
      const transactionData = {
        user_id: userId,
        subscription_id,
        amount,
        currency,
        status,
        payment_method,
        payment_date,
        invoice_url
      };
      
      const transaction = await Subscription.recordTransaction(transactionData);
      
      res.status(201).json({
        success: true,
        data: transaction
      });
    } catch (error) {
      console.error('Error recording transaction:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to record transaction' 
      });
    }
  },
  
  // Get billing transactions for authenticated user
  getTransactionHistory: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const transactions = await Subscription.getTransactionsByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: transactions
      });
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch transactions' 
      });
    }
  }
};

module.exports = subscriptionController;
