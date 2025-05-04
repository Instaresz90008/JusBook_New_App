
const db = require('../config/db');

const Subscription = {
  // Create a new subscription
  create: async (subscriptionData) => {
    const {
      user_id,
      plan_name,
      plan_price,
      billing_period,
      start_date,
      end_date,
      status,
      payment_method,
      card_last_four
    } = subscriptionData;
    
    try {
      // Update user's subscription plan
      await db.query(
        'UPDATE users SET subscription_plan = $1, updated_at = NOW() WHERE id = $2',
        [plan_name, user_id]
      );
      
      // Create subscription record
      const result = await db.query(
        `INSERT INTO subscriptions (
          user_id, plan_name, plan_price, billing_period, start_date, 
          end_date, status, payment_method, card_last_four
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          user_id, plan_name, plan_price, billing_period, start_date, 
          end_date, status, payment_method, card_last_four
        ]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  },
  
  // Get active subscription for a user
  getActiveByUserId: async (userId) => {
    try {
      const result = await db.query(
        'SELECT * FROM subscriptions WHERE user_id = $1 AND status = $2 ORDER BY created_at DESC LIMIT 1',
        [userId, 'active']
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching active subscription:', error);
      throw error;
    }
  },
  
  // Get subscription history for a user
  getHistoryByUserId: async (userId) => {
    try {
      const result = await db.query(
        'SELECT * FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching subscription history:', error);
      throw error;
    }
  },
  
  // Update subscription status
  updateStatus: async (id, status) => {
    try {
      const result = await db.query(
        'UPDATE subscriptions SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [status, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating subscription status:', error);
      throw error;
    }
  },
  
  // Cancel a subscription
  cancelSubscription: async (id, userId) => {
    try {
      // Start transaction
      await db.query('BEGIN');
      
      // Update subscription status
      const result = await db.query(
        'UPDATE subscriptions SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        ['cancelled', id]
      );
      
      // Update user's plan to free
      await db.query(
        'UPDATE users SET subscription_plan = $1, updated_at = NOW() WHERE id = $2',
        ['free', userId]
      );
      
      await db.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  },
  
  // Record a billing transaction
  recordTransaction: async (transactionData) => {
    const {
      user_id,
      subscription_id,
      amount,
      currency,
      status,
      payment_method,
      payment_date,
      invoice_url
    } = transactionData;
    
    try {
      const result = await db.query(
        `INSERT INTO billing_transactions (
          user_id, subscription_id, amount, currency, status, 
          payment_method, payment_date, invoice_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [
          user_id, subscription_id, amount, currency, status, 
          payment_method, payment_date, invoice_url
        ]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Error recording billing transaction:', error);
      throw error;
    }
  },
  
  // Get billing transactions for a user
  getTransactionsByUserId: async (userId) => {
    try {
      const result = await db.query(
        'SELECT * FROM billing_transactions WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      throw error;
    }
  }
};

module.exports = Subscription;
