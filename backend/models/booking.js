
const db = require('../config/db');

const Booking = {
  // Create a new booking
  create: async (bookingData) => {
    const {
      slot_id,
      service_id,
      user_id,
      customer_name,
      customer_email,
      customer_phone,
      meeting_purpose,
      status,
      timezone
    } = bookingData;
    
    try {
      // Start a transaction to ensure slot and booking are updated atomically
      await db.query('BEGIN');
      
      // Mark the slot as unavailable
      await db.query(
        'UPDATE slots SET is_available = false, updated_at = NOW() WHERE id = $1',
        [slot_id]
      );
      
      // Create the booking
      const result = await db.query(
        `INSERT INTO bookings (
          slot_id, service_id, user_id, customer_name, customer_email, 
          customer_phone, meeting_purpose, status, timezone
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`,
        [
          slot_id, service_id, user_id, customer_name, customer_email, 
          customer_phone, meeting_purpose, status, timezone
        ]
      );
      
      await db.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Error creating booking:', error);
      throw error;
    }
  },
  
  // Get bookings for a user (service provider)
  getByProviderId: async (userId) => {
    try {
      const result = await db.query(
        `SELECT bookings.*, slots.slot_date, slots.start_time, slots.end_time,
                services.name as service_name
         FROM bookings
         JOIN slots ON bookings.slot_id = slots.id
         JOIN services ON bookings.service_id = services.id
         WHERE services.user_id = $1
         ORDER BY slots.slot_date DESC, slots.start_time DESC`,
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching provider bookings:', error);
      throw error;
    }
  },
  
  // Get bookings for a customer by email
  getByCustomerEmail: async (email) => {
    try {
      const result = await db.query(
        `SELECT bookings.*, slots.slot_date, slots.start_time, slots.end_time,
                services.name as service_name
         FROM bookings
         JOIN slots ON bookings.slot_id = slots.id
         JOIN services ON bookings.service_id = services.id
         WHERE bookings.customer_email = $1
         ORDER BY slots.slot_date DESC, slots.start_time DESC`,
        [email]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching customer bookings:', error);
      throw error;
    }
  },
  
  // Update booking status
  updateStatus: async (id, status) => {
    try {
      const result = await db.query(
        'UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [status, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
  },
  
  // Cancel booking
  cancelBooking: async (id) => {
    try {
      // Start transaction
      await db.query('BEGIN');
      
      // Get the slot ID for this booking
      const bookingResult = await db.query('SELECT slot_id FROM bookings WHERE id = $1', [id]);
      const slotId = bookingResult.rows[0]?.slot_id;
      
      if (slotId) {
        // Mark the slot as available again
        await db.query(
          'UPDATE slots SET is_available = true, updated_at = NOW() WHERE id = $1',
          [slotId]
        );
      }
      
      // Update the booking status to cancelled
      const result = await db.query(
        'UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        ['cancelled', id]
      );
      
      await db.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await db.query('ROLLBACK');
      console.error('Error cancelling booking:', error);
      throw error;
    }
  },
  
  // Get booking by ID with details
  getById: async (id) => {
    try {
      const result = await db.query(
        `SELECT bookings.*, slots.slot_date, slots.start_time, slots.end_time,
                services.name as service_name, services.description, services.meeting_type,
                services.meeting_link, services.meeting_platform, services.location_address
         FROM bookings
         JOIN slots ON bookings.slot_id = slots.id
         JOIN services ON bookings.service_id = services.id
         WHERE bookings.id = $1`,
        [id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching booking details:', error);
      throw error;
    }
  }
};

module.exports = Booking;
