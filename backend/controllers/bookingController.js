
const Booking = require('../models/booking');
const Slot = require('../models/slot');
const Service = require('../models/service');

const bookingController = {
  // Create a new booking
  createBooking: async (req, res) => {
    try {
      const {
        slot_id,
        customer_name,
        customer_email,
        customer_phone,
        meeting_purpose,
        timezone
      } = req.body;
      
      // Verify slot exists and is available
      const slot = await Slot.getById(slot_id);
      if (!slot) {
        return res.status(404).json({
          success: false,
          error: 'Slot not found'
        });
      }
      
      if (!slot.is_available) {
        return res.status(400).json({
          success: false,
          error: 'This slot is no longer available'
        });
      }
      
      // Set user_id if authenticated, otherwise null
      const userId = req.user ? req.user.id : null;
      
      const bookingData = {
        slot_id,
        service_id: slot.service_id,
        user_id: userId,
        customer_name,
        customer_email,
        customer_phone,
        meeting_purpose,
        status: 'confirmed', // Default status
        timezone
      };
      
      const booking = await Booking.create(bookingData);
      
      res.status(201).json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to create booking' 
      });
    }
  },
  
  // Get all bookings for authenticated user (as service provider)
  getProviderBookings: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const bookings = await Booking.getByProviderId(userId);
      
      res.status(200).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      console.error('Error fetching provider bookings:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch bookings' 
      });
    }
  },
  
  // Get bookings for a customer by email
  getCustomerBookings: async (req, res) => {
    try {
      // If authenticated, use user's email, otherwise use email from query
      const email = req.user ? req.user.email : req.query.email;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'Email is required'
        });
      }
      
      const bookings = await Booking.getByCustomerEmail(email);
      
      res.status(200).json({
        success: true,
        data: bookings
      });
    } catch (error) {
      console.error('Error fetching customer bookings:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch bookings' 
      });
    }
  },
  
  // Update booking status
  updateBookingStatus: async (req, res) => {
    try {
      const userId = req.user.id;
      const bookingId = req.params.id;
      const { status } = req.body;
      
      // Verify booking exists and belongs to user
      const booking = await Booking.getById(bookingId);
      if (!booking) {
        return res.status(404).json({
          success: false,
          error: 'Booking not found'
        });
      }
      
      // Get service to verify ownership
      const service = await Service.getById(booking.service_id);
      if (service.user_id !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to update this booking'
        });
      }
      
      const updatedBooking = await Booking.updateStatus(bookingId, status);
      
      res.status(200).json({
        success: true,
        data: updatedBooking
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to update booking' 
      });
    }
  },
  
  // Cancel a booking
  cancelBooking: async (req, res) => {
    try {
      const bookingId = req.params.id;
      
      // Verify booking exists
      const booking = await Booking.getById(bookingId);
      if (!booking) {
        return res.status(404).json({
          success: false,
          error: 'Booking not found'
        });
      }
      
      // Check authorization - either the service provider or the customer can cancel
      if (req.user) {
        // For authenticated users
        const userId = req.user.id;
        
        // Get service to verify ownership
        const service = await Service.getById(booking.service_id);
        
        // Only allow if user is service owner or booking customer
        const isServiceOwner = service.user_id === userId;
        const isCustomer = booking.customer_email === req.user.email;
        
        if (!isServiceOwner && !isCustomer) {
          return res.status(403).json({
            success: false,
            error: 'Not authorized to cancel this booking'
          });
        }
      } else {
        // For unauthenticated cancellations, require email verification
        const { email } = req.body;
        
        if (!email || email !== booking.customer_email) {
          return res.status(403).json({
            success: false,
            error: 'Email verification required to cancel booking'
          });
        }
      }
      
      const cancelledBooking = await Booking.cancelBooking(bookingId);
      
      res.status(200).json({
        success: true,
        data: cancelledBooking,
        message: 'Booking cancelled successfully'
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to cancel booking' 
      });
    }
  },
  
  // Get booking details by ID
  getBookingDetails: async (req, res) => {
    try {
      const bookingId = req.params.id;
      
      const booking = await Booking.getById(bookingId);
      if (!booking) {
        return res.status(404).json({
          success: false,
          error: 'Booking not found'
        });
      }
      
      // Check authorization
      if (req.user) {
        const userId = req.user.id;
        
        // Get service to verify ownership
        const service = await Service.getById(booking.service_id);
        
        // Only allow if user is service owner or booking customer
        const isServiceOwner = service.user_id === userId;
        const isCustomer = booking.customer_email === req.user.email;
        
        if (!isServiceOwner && !isCustomer) {
          return res.status(403).json({
            success: false,
            error: 'Not authorized to view this booking'
          });
        }
      } else {
        // For unauthenticated access, require email verification
        const { email } = req.query;
        
        if (!email || email !== booking.customer_email) {
          return res.status(403).json({
            success: false,
            error: 'Email verification required to view booking'
          });
        }
      }
      
      res.status(200).json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error('Error fetching booking details:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch booking' 
      });
    }
  }
};

module.exports = bookingController;
