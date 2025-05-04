
const db = require('../config/db');

// Model for user data
const UserModel = {
  // Create a new user
  create: async (username, email, password) => {
    const query = `
      INSERT INTO users (username, email, password_hash, created_at) 
      VALUES ($1, $2, $3, NOW()) 
      RETURNING id, username, email, created_at
    `;
    const values = [username, email, password]; // In production, use bcrypt to hash password
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Get user by ID
  getById: async (id) => {
    const query = `SELECT id, username, email, created_at FROM users WHERE id = $1`;
    const values = [id];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Get user by email
  getByEmail: async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    
    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  }
};

module.exports = UserModel;
