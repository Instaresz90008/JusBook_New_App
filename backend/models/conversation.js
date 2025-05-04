
const db = require('../config/db');

// Model for conversations (user queries and responses)
const ConversationModel = {
  // Create a new conversation entry
  create: async (userId, userQuery, response) => {
    const query = `
      INSERT INTO conversations (user_id, user_query, response, created_at) 
      VALUES ($1, $2, $3, NOW()) 
      RETURNING *
    `;
    const values = [userId, userQuery, response];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },

  // Get conversations by user ID
  getByUserId: async (userId, limit = 10) => {
    const query = `
      SELECT * FROM conversations 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT $2
    `;
    const values = [userId, limit];
    
    try {
      const result = await db.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  // Get conversation by ID
  getById: async (id) => {
    const query = `SELECT * FROM conversations WHERE id = $1`;
    const values = [id];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching conversation by ID:', error);
      throw error;
    }
  }
};

module.exports = ConversationModel;
