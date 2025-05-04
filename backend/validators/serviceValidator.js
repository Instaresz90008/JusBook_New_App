
/**
 * Service validation schemas
 */
const serviceValidator = {
  createService: (req) => {
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
    
    const errors = {};
    
    // Validate required fields
    if (!name || name.trim() === '') {
      errors.name = 'Service name is required';
    }
    
    if (!description || description.trim() === '') {
      errors.description = 'Service description is required';
    }
    
    // Map frontend type to backend service_type
    const service_type = type;
    if (!service_type || !['one-to-one', 'one-to-many', 'group'].includes(service_type)) {
      errors.type = 'Valid service type is required (one-to-one, one-to-many, or group)';
    }
    
    // Validate duration
    if (!duration || isNaN(Number(duration)) || Number(duration) <= 0) {
      errors.duration = 'Valid duration in minutes is required';
    }
    
    // Validate meeting type if provided
    if (meetingType && typeof meetingType !== 'string') {
      errors.meetingType = 'Meeting type must be a string';
    }
    
    // Validate cost factor if provided
    if (costFactor !== undefined) {
      if (isNaN(Number(costFactor)) || Number(costFactor) < 0) {
        errors.costFactor = 'Cost factor must be a non-negative number';
      }
    }
    
    // Validate isPublic if provided
    if (isPublic !== undefined && typeof isPublic !== 'boolean') {
      errors.isPublic = 'Is public field must be a boolean';
    }
    
    // Validate settings if provided
    if (settings) {
      if (typeof settings !== 'object') {
        errors.settings = 'Settings must be an object';
      } else {
        // Validate individual settings
        const { maxAttendees, maxSeatsPerBooking, bufferTime, advanceBookingDays } = settings;
        
        if (maxAttendees !== undefined && maxAttendees !== null && (isNaN(Number(maxAttendees)) || Number(maxAttendees) < 0)) {
          errors['settings.maxAttendees'] = 'Max attendees must be a non-negative number';
        }
        
        if (maxSeatsPerBooking !== undefined && maxSeatsPerBooking !== null && (isNaN(Number(maxSeatsPerBooking)) || Number(maxSeatsPerBooking) < 0)) {
          errors['settings.maxSeatsPerBooking'] = 'Max seats per booking must be a non-negative number';
        }
        
        if (bufferTime !== undefined && (isNaN(Number(bufferTime)) || Number(bufferTime) < 0)) {
          errors['settings.bufferTime'] = 'Buffer time must be a non-negative number';
        }
        
        if (advanceBookingDays !== undefined && (isNaN(Number(advanceBookingDays)) || Number(advanceBookingDays) < 0)) {
          errors['settings.advanceBookingDays'] = 'Advance booking days must be a non-negative number';
        }
      }
    }
    
    if (Object.keys(errors).length > 0) {
      return { error: { message: 'Invalid service data', details: errors } };
    }
    
    return { error: null };
  },
  
  updateService: (req) => {
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
    
    const errors = {};
    
    // Validate fields if provided (all are optional for updates)
    if (name !== undefined && (name === null || name.trim() === '')) {
      errors.name = 'Service name cannot be empty';
    }
    
    if (description !== undefined && description === null) {
      errors.description = 'Service description cannot be null';
    }
    
    if (type !== undefined && !['one-to-one', 'one-to-many', 'group'].includes(type)) {
      errors.type = 'Invalid service type';
    }
    
    if (duration !== undefined && (isNaN(Number(duration)) || Number(duration) <= 0)) {
      errors.duration = 'Duration must be a positive number';
    }
    
    if (meetingType !== undefined && typeof meetingType !== 'string' && meetingType !== null) {
      errors.meetingType = 'Meeting type must be a string or null';
    }
    
    if (costFactor !== undefined && (isNaN(Number(costFactor)) || Number(costFactor) < 0)) {
      errors.costFactor = 'Cost factor must be a non-negative number';
    }
    
    if (isPublic !== undefined && typeof isPublic !== 'boolean') {
      errors.isPublic = 'Is public field must be a boolean';
    }
    
    // Validate settings if provided
    if (settings) {
      if (typeof settings !== 'object') {
        errors.settings = 'Settings must be an object';
      } else {
        // Validate individual settings
        const { maxAttendees, maxSeatsPerBooking, bufferTime, advanceBookingDays } = settings;
        
        if (maxAttendees !== undefined && maxAttendees !== null && (isNaN(Number(maxAttendees)) || Number(maxAttendees) < 0)) {
          errors['settings.maxAttendees'] = 'Max attendees must be a non-negative number';
        }
        
        if (maxSeatsPerBooking !== undefined && maxSeatsPerBooking !== null && (isNaN(Number(maxSeatsPerBooking)) || Number(maxSeatsPerBooking) < 0)) {
          errors['settings.maxSeatsPerBooking'] = 'Max seats per booking must be a non-negative number';
        }
        
        if (bufferTime !== undefined && (isNaN(Number(bufferTime)) || Number(bufferTime) < 0)) {
          errors['settings.bufferTime'] = 'Buffer time must be a non-negative number';
        }
        
        if (advanceBookingDays !== undefined && (isNaN(Number(advanceBookingDays)) || Number(advanceBookingDays) < 0)) {
          errors['settings.advanceBookingDays'] = 'Advance booking days must be a non-negative number';
        }
      }
    }
    
    if (Object.keys(errors).length > 0) {
      return { error: { message: 'Invalid service data', details: errors } };
    }
    
    return { error: null };
  }
};

module.exports = serviceValidator;
