const Service = require('../models/service');

const serviceController = {
  // Create a new service
  createService: async (req, res) => {
    try {
      const userId = req.user.userId;
      
      // Map frontend structure to database structure
      const {
        name,
        description,
        type,
        duration,
        meetingType,
        meetingDetails,
        costFactor,
        isPublic,
        settings
      } = req.body;
      
      // Create service data object
      const serviceData = {
        user_id: userId,
        name,
        description,
        service_type: type,
        duration_mins: duration,
        meeting_type: meetingType,
        // Meeting details
        meeting_link: meetingDetails?.link || null,
        meeting_platform: meetingDetails?.platform || null,
        location_address: meetingDetails?.locationAddress || null,
        phone_number: meetingDetails?.phoneNumber || null,
        access_code: meetingDetails?.accessCode || null,
        // Other fields
        cost_factor: costFactor || 1.0,
        is_public: isPublic !== undefined ? isPublic : true,
        // Settings
        requires_confirmation: settings?.requiresConfirmation || false,
        collect_payment: settings?.collectPayment || false,
        max_attendees: settings?.maxAttendees || null,
        max_seats_per_booking: settings?.maxSeatsPerBooking || null,
        allow_waitlist: settings?.allowWaitlist || false,
        buffer_time: settings?.bufferTime || 0,
        advance_booking_days: settings?.advanceBookingDays || 30
      };
      
      const service = await Service.create(serviceData);
      
      res.status(201).json({
        success: true,
        data: service
      });
    } catch (error) {
      console.error('Error creating service:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to create service' 
      });
    }
  },
  
  // Get all services for authenticated user
  getUserServices: async (req, res) => {
    try {
      const userId = req.user.userId;
      const services = await Service.getByUserId(userId);
      
      res.status(200).json({
        success: true,
        data: services
      });
    } catch (error) {
      console.error('Error fetching user services:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch services' 
      });
    }
  },
  
  getService: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const service = await Service.getById(serviceId);
      console.log(service);
      if (!service) {
        return res.status(404).json({
          success: false,
          error: 'Service not found'
        });
      }
      
      // Check if service belongs to authenticated user
      if (service.user_id !== req.user.userId) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to access this service'
        });
      }
      
      res.status(200).json({
        success: true,
        data: service
      });
    } catch (error) {
      console.error('Error fetching service:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch service' 
      });
    }
  },
  
  // Update a service
  updateService: async (req, res) => {
    try {
      const serviceId = req.params.id;
      
      // Check if service exists
      const existingService = await Service.getById(serviceId);
      
      if (!existingService) {
        return res.status(404).json({
          success: false,
          error: 'Service not found'
        });
      }
      
      // Check if service belongs to authenticated user
      if (existingService.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to update this service'
        });
      }
      
      // Map frontend structure to database structure
      const {
        name,
        description,
        type,
        duration,
        meetingType,
        meetingDetails,
        costFactor,
        isPublic,
        settings
      } = req.body;
      
      // Create service data object with only provided fields
      const serviceData = {};
      
      if (name !== undefined) serviceData.name = name;
      if (description !== undefined) serviceData.description = description;
      if (type !== undefined) serviceData.service_type = type;
      if (duration !== undefined) serviceData.duration_mins = duration;
      if (meetingType !== undefined) serviceData.meeting_type = meetingType;
      
      // Meeting details
      if (meetingDetails) {
        if (meetingDetails.link !== undefined) serviceData.meeting_link = meetingDetails.link;
        if (meetingDetails.platform !== undefined) serviceData.meeting_platform = meetingDetails.platform;
        if (meetingDetails.locationAddress !== undefined) serviceData.location_address = meetingDetails.locationAddress;
        if (meetingDetails.phoneNumber !== undefined) serviceData.phone_number = meetingDetails.phoneNumber;
        if (meetingDetails.accessCode !== undefined) serviceData.access_code = meetingDetails.accessCode;
      }
      
      // Other fields
      if (costFactor !== undefined) serviceData.cost_factor = costFactor;
      if (isPublic !== undefined) serviceData.is_public = isPublic;
      
      // Settings
      if (settings) {
        if (settings.requiresConfirmation !== undefined) serviceData.requires_confirmation = settings.requiresConfirmation;
        if (settings.collectPayment !== undefined) serviceData.collect_payment = settings.collectPayment;
        if (settings.maxAttendees !== undefined) serviceData.max_attendees = settings.maxAttendees;
        if (settings.maxSeatsPerBooking !== undefined) serviceData.max_seats_per_booking = settings.maxSeatsPerBooking;
        if (settings.allowWaitlist !== undefined) serviceData.allow_waitlist = settings.allowWaitlist;
        if (settings.bufferTime !== undefined) serviceData.buffer_time = settings.bufferTime;
        if (settings.advanceBookingDays !== undefined) serviceData.advance_booking_days = settings.advanceBookingDays;
      }
      
      const updatedService = await Service.update(serviceId, serviceData);
      
      res.status(200).json({
        success: true,
        data: updatedService
      });
    } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to update service' 
      });
    }
  },
  
  // Delete a service
  deleteService: async (req, res) => {
    try {
      const serviceId = req.params.id;
      
      // Check if service exists
      const existingService = await Service.getById(serviceId);
      
      if (!existingService) {
        return res.status(404).json({
          success: false,
          error: 'Service not found'
        });
      }
      
      // Check if service belongs to authenticated user
      if (existingService.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to delete this service'
        });
      }
      
      await Service.delete(serviceId);
      
      res.status(200).json({
        success: true,
        message: 'Service deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to delete service' 
      });
    }
  },
  
  // Get a publicly accessible service by ID (no auth required)
  getPublicService: async (req, res) => {
    try {
      const serviceId = req.params.id;
      const service = await Service.getById(serviceId);
      
      if (!service) {
        return res.status(404).json({
          success: false,
          error: 'Service not found'
        });
      }
      
      // Only return the service if it's public
      if (!service.is_public) {
        return res.status(403).json({
          success: false,
          error: 'This service is not publicly available'
        });
      }
      
      res.status(200).json({
        success: true,
        data: service
      });
    } catch (error) {
      console.error('Error fetching public service:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch service' 
      });
    }
  }
};

module.exports = serviceController;
