
const db = require('../config/db');

const Service = {
  // Create a new service
  create: async (serviceData) => {
    const {
      user_id, name, description, service_type, duration_mins, meeting_type,
      meeting_link, meeting_platform, location_address, phone_number,
      access_code, cost_factor, is_public, requires_confirmation,
      collect_payment, max_attendees, max_seats_per_booking, allow_waitlist,
      buffer_time, advance_booking_days
    } = serviceData;
    
    try {
      const result = await db.query(
        `INSERT INTO services (
          user_id, name, description, service_type, duration_mins, meeting_type,
          meeting_link, meeting_platform, location_address, phone_number,
          access_code, cost_factor, is_public, requires_confirmation,
          collect_payment, max_attendees, max_seats_per_booking, allow_waitlist,
          buffer_time, advance_booking_days
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        RETURNING *`,
        [
          user_id, name, description, service_type, duration_mins, meeting_type,
          meeting_link, meeting_platform, location_address, phone_number,
          access_code, cost_factor, is_public, requires_confirmation,
          collect_payment, max_attendees, max_seats_per_booking, allow_waitlist,
          buffer_time, advance_booking_days
        ]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  },
  
  // Get all services for a user
  getByUserId: async (userId) => {
    try {
      const result = await db.query(
        'SELECT * FROM services WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching user services:', error);
      throw error;
    }
  },
  
  // Get a service by ID
  getById: async (id) => {
    try {
      const result = await db.query('SELECT * FROM services WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching service by ID:', error);
      throw error;
    }
  },
  
  // Update a service
  update: async (id, serviceData) => {
    const {
      name, description, service_type, duration_mins, meeting_type,
      meeting_link, meeting_platform, location_address, phone_number,
      access_code, cost_factor, is_public, requires_confirmation,
      collect_payment, max_attendees, max_seats_per_booking, allow_waitlist,
      buffer_time, advance_booking_days
    } = serviceData;
    
    try {
      const result = await db.query(
        `UPDATE services SET
          name = $1,
          description = $2,
          service_type = $3,
          duration_mins = $4,
          meeting_type = $5,
          meeting_link = $6,
          meeting_platform = $7,
          location_address = $8,
          phone_number = $9,
          access_code = $10,
          cost_factor = $11,
          is_public = $12,
          requires_confirmation = $13,
          collect_payment = $14,
          max_attendees = $15,
          max_seats_per_booking = $16,
          allow_waitlist = $17,
          buffer_time = $18,
          advance_booking_days = $19,
          updated_at = NOW()
        WHERE id = $20
        RETURNING *`,
        [
          name, description, service_type, duration_mins, meeting_type,
          meeting_link, meeting_platform, location_address, phone_number,
          access_code, cost_factor, is_public, requires_confirmation,
          collect_payment, max_attendees, max_seats_per_booking, allow_waitlist,
          buffer_time, advance_booking_days, id
        ]
      );
      
      return result.rows[0];
    } catch (error) {
      console.error('Error updating service:', error);
      throw error;
    }
  },
  
  // Delete a service
  delete: async (id) => {
    try {
      await db.query('DELETE FROM services WHERE id = $1', [id]);
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw error;
    }
  }
};

module.exports = Service;
