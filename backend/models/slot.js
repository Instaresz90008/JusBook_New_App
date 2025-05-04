const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const Slot = {
  // Create multiple slots
  async createBatch(slots) {
    try {
      // Begin transaction
      await db.query('BEGIN');
      
      const createdSlots = [];
      
      // Insert each slot
      for (const slot of slots) {
        const query = `
          INSERT INTO slots (
            user_id, 
            service_id, 
            slot_date,
            start_time, 
            end_time, 
            is_available, 
            booking_link
          ) VALUES ($1, $2, $3, $4, $5, $6,$7)
          RETURNING *
        `;
        
        const values = [
          slot.user_id,
          slot.service_id,
          slot.slot_date,
          slot.start_time,
          slot.end_time,
          slot.is_available,
          slot.booking_link
        ];
        
        const result = await db.query(query, values);
        createdSlots.push(result.rows[0]);
      }
      
      // Commit transaction
      await db.query('COMMIT');
      
      return createdSlots;
    } catch (error) {
      // Rollback transaction on error
      await db.query('ROLLBACK');
      throw error;
    }
  },
  
  // Get slots for a service
  async getByServiceId(serviceId) {
    try {
      const result = await db.query(
        'SELECT * FROM slots WHERE service_id = $1 ORDER BY slot_date, start_time',
        [serviceId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching service slots:', error);
      throw error;
    }
  },
  
  // Get slots by date range for a user
  async getByDateRange(userId, startDate, endDate) {
    try {
      const result = await db.query(
        `SELECT slots.*, services.name as service_name, services.duration_mins
         FROM slots 
         JOIN services ON slots.service_id = services.id
         WHERE slots.user_id = $1 
         AND slots.slot_date BETWEEN $2 AND $3
         ORDER BY slots.slot_date, slots.start_time`,
        [userId, startDate, endDate]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching slots by date range:', error);
      throw error;
    }
  },
  
  // Update a slot's availability
  async updateAvailability(id, isAvailable) {
    try {
      const result = await db.query(
        'UPDATE slots SET is_available = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [isAvailable, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating slot availability:', error);
      throw error;
    }
  },
  
  // Delete slots for a service
  async deleteByServiceId(serviceId) {
    try {
      await db.query('DELETE FROM slots WHERE service_id = $1', [serviceId]);
      return true;
    } catch (error) {
      console.error('Error deleting service slots:', error);
      throw error;
    }
  },
  
  // Get a single slot by ID
  async getById(id) {
    try {
      const result = await db.query(
        `SELECT slots.*, services.name as service_name, services.duration_mins
         FROM slots 
         JOIN services ON slots.service_id = services.id
         WHERE slots.id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching slot by ID:', error);
      throw error;
    }
  },
  
  // Get slot by booking link
  async getByBookingLink(bookingLink) {
    try {
      const result = await db.query(
        `SELECT slots.*, services.name as service_name, services.duration_mins,
                services.description, services.meeting_type
         FROM slots 
         JOIN services ON slots.service_id = services.id
         WHERE slots.booking_link = $1 AND slots.is_available = true`,
        [bookingLink]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching slot by booking link:', error);
      throw error;
    }
  }
};

module.exports = Slot;