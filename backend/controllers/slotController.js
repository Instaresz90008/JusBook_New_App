const Slot = require('../models/slot');
const Service = require('../models/service');
const generateSlots = require('../utils/slotGenerator');
const dayjs = require('dayjs');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const { v4: uuidv4 } = require('uuid'); // For generating booking_link
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.extend(isSameOrBefore);

const slotController = {
  // createSlots: async (req, res) => {
  //   try {
  //     const userId = req.user.userId;
  //     const { service_id, slots } = req.body;
  
  //     console.log("slots", slots);
  
  //     const service = await Service.getById(service_id);
  //     if (!service) {
  //       return res.status(404).json({
  //         success: false,
  //         error: 'Service not found'
  //       });
  //     }
  
  //     if (service.user_id !== userId) {
  //       return res.status(403).json({
  //         success: false,
  //         error: 'Not authorized to create slots for this service'
  //       });
  //     }
  
  //     const allGeneratedSlots = [];
  
  //     for (const slotConfig of slots) {
  //       const { slot_date, start_time, end_time, durationMinutes, is_available = true } = slotConfig;
  
  //       if (!slot_date || !start_time || !end_time || !durationMinutes) {
  //         console.error('Missing required fields in slotConfig:', slotConfig);
  //         return res.status(400).json({
  //           success: false,
  //           error: 'Missing required fields: slot_date, start_time, end_time, durationMinutes'
  //         });
  //       }
  
  //       const formattedSlotDate = dayjs(slot_date).format('YYYY-MM-DD');
  //       if (!dayjs(slot_date).isValid()) {
  //         console.error('Invalid slot_date:', slot_date);
  //         return res.status(400).json({
  //           success: false,
  //           error: 'Invalid slot_date format'
  //         });
  //       }
  //       console.log(formattedSlotDate);
  //       const generatedSlots = generateSlots({
  //         startTime: start_time,
  //         endTime: end_time,
  //         chunkMinutes: durationMinutes,
  //         timezone: 'UTC'
  //       });
  
  //       // console.log("generatedSlots", generatedSlots);
  
  //       if (!generatedSlots.length) {
  //         console.warn('No slots generated for config:', slotConfig);
  //         continue;
  //       }
  
  //       const slotsToCreate = generatedSlots.map(slot => {
  //         const startParts = slot.start.split(' ');
  //         const endParts = slot.end.split(' ');
  
  //         const startDateTime = `${formattedSlotDate} ${startParts[0]} ${startParts[1]}`;
  //         const endDateTime = `${formattedSlotDate} ${endParts[0]} ${endParts[1]}`;
  
  //         return {
  //           user_id: userId,
  //           service_id,
  //           slot_date: formattedSlotDate,
  //           start_time: dayjs.tz(startDateTime, 'YYYY-MM-DD hh:mm A', 'UTC').toISOString(),
  //           end_time: dayjs.tz(endDateTime, 'YYYY-MM-DD hh:mm A', 'UTC').toISOString(),
  //           is_available: is_available,
  //           label: slot.label,
  //           booking_link: uuidv4()
  //         };
  //       });
  
  //       console.log("slotsToCreate", slotsToCreate);
  //       allGeneratedSlots.push(...slotsToCreate);
  //     }
  
  //     console.log("allGeneratedSlots", allGeneratedSlots);
  
  //     if (!allGeneratedSlots.length) {
  //       return res.status(400).json({
  //         success: false,
  //         error: 'No valid slots generated'
  //       });
  //     }
  
  //     console.log("Final slots before DB insertion:", JSON.stringify(allGeneratedSlots, null, 2));
  //     const createdSlots = await Slot.createBatch(allGeneratedSlots);
  
  //     res.status(201).json({
  //       success: true,
  //       data: createdSlots,
  //       message: `Successfully created ${createdSlots.length} slots`
  //     });
  //   } catch (error) {
  //     console.error('Error creating slots:', error);
  //     res.status(500).json({
  //       success: false,
  //       error: `Failed to create slots: ${error.message}`
  //     });
  //   }
  // },
  createSlots: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { service_id, slots } = req.body;
  
      // console.log('Request body slots:', JSON.stringify(slots, null, 2));
  
      const service = await Service.getById(service_id);
      if (!service) {
        return res.status(404).json({
          success: false,
          error: 'Service not found'
        });
      }
  
      if (service.user_id !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to create slots for this service'
        });
      }
  
      const allGeneratedSlots = [];
  
      for (const slotConfig of slots) {
        const { slot_date, start_time, end_time, durationMinutes, is_available = true } = slotConfig;
  
        if (!slot_date || !start_time || !end_time || !durationMinutes) {
          console.error('Missing required fields in slotConfig:', slotConfig);
          return res.status(400).json({
            success: false,
            error: 'Missing required fields: slot_date, start_time, end_time, durationMinutes'
          });
        }
  
        if (typeof slot_date !== 'string' || slot_date.trim() === '') {
          console.error('Invalid or empty slot_date:', slot_date);
          return res.status(400).json({
            success: false,
            error: 'slot_date must be a non-empty string'
          });
        }
  
        const formattedSlotDate = dayjs(slot_date).format('YYYY-MM-DD');
        // console.log('Input slot_date:', slot_date, 'Formatted slot_date:', formattedSlotDate);
  
        if (!dayjs(slot_date).isValid() || !formattedSlotDate || formattedSlotDate === 'Invalid Date') {
          console.error('Invalid slot_date:', slot_date);
          return res.status(400).json({
            success: false,
            error: 'Invalid slot_date format or value'
          });
        }
  
        const generatedSlots = generateSlots({
          startTime: start_time,
          endTime: end_time,
          chunkMinutes: durationMinutes,
          timezone: 'UTC'
        });
  
        // console.log('Generated slots:', JSON.stringify(generatedSlots, null, 2));
  
        if (!generatedSlots.length) {
          console.warn('No slots generated for config:', slotConfig);
          continue;
        }
  
        const slotsToCreate = generatedSlots.map(slot => {
          const startParts = slot.start.split(' ');
          const endParts = slot.end.split(' ');
  
          const startDateTime = `${formattedSlotDate} ${startParts[0]} ${startParts[1]}`;
          const endDateTime = `${formattedSlotDate} ${endParts[0]} ${endParts[1]}`;
          result={
            user_id: userId,
            service_id,
            slot_date: formattedSlotDate,
            start_time: dayjs.tz(startDateTime, 'YYYY-MM-DD hh:mm A', 'UTC').toISOString(),
            end_time: dayjs.tz(endDateTime, 'YYYY-MM-DD hh:mm A', 'UTC').toISOString(),
            is_available: is_available,
            label: slot.label,
            booking_link: uuidv4()
          }
          console.log("result",result);
  
          return {
            user_id: userId,
            service_id,
            slot_date: formattedSlotDate,
            start_time: dayjs.tz(startDateTime, 'YYYY-MM-DD hh:mm A', 'UTC').toISOString(),
            end_time: dayjs.tz(endDateTime, 'YYYY-MM-DD hh:mm A', 'UTC').toISOString(),
            is_available: is_available,
            label: slot.label,
            booking_link: uuidv4()
          };
        });
        allGeneratedSlots.push(...slotsToCreate);
      }
  
      console.log('All generated slots:', JSON.stringify(allGeneratedSlots, null, 2));
  
      if (!allGeneratedSlots.length) {
        return res.status(400).json({
          success: false,
          error: 'No valid slots generated'
        });
      }
  
      const createdSlots = await Slot.createBatch(allGeneratedSlots);
  
      res.status(201).json({
        success: true,
        data: createdSlots,
        message: `Successfully created ${createdSlots.length} slots`
      });
    } catch (error) {
      console.error('Error creating slots:', error);
      res.status(500).json({
        success: false,
        error: `Failed to create slots: ${error.message}`
      });
    }
  },
  // Get slots for a service
  getServiceSlots: async (req, res) => {
    try {
      const userId = req.user.userId;
      const serviceId = req.params.serviceId;
      console.log(serviceId);
      // Verify service belongs to user
      const service = await Service.getById(serviceId);
      if (!service) {
        return res.status(404).json({
          success: false,
          error: 'Service not found'
        });
      }
      
      if (service.user_id !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to view slots for this service'
        });
      }
      
      const slots = await Slot.getByServiceId(serviceId);
      
      res.status(200).json({
        success: true,
        data: slots
      });
    } catch (error) {
      console.error('Error fetching service slots:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch slots' 
      });
    }
  },
  
  // Get slots by date range
  getSlotsByDateRange: async (req, res) => {
    try {
      const userId = req.user.userId;
      const { startDate, endDate } = req.query;
      
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: 'Start date and end date are required'
        });
      }
      
      const slots = await Slot.getByDateRange(userId, startDate, endDate);
      
      res.status(200).json({
        success: true,
        data: slots
      });
    } catch (error) {
      console.error('Error fetching slots by date range:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch slots' 
      });
    }
  },
  
  // Update slot availability
  updateSlotAvailability: async (req, res) => {
    try {
      const userId = req.user.userId;
      const slotId = req.params.id;
      const { is_available } = req.body;
      
      // Get the slot to verify ownership
      const slot = await Slot.getById(slotId);
      if (!slot) {
        return res.status(404).json({
          success: false,
          error: 'Slot not found'
        });
      }
      
      if (slot.user_id !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to update this slot'
        });
      }
      
      const updatedSlot = await Slot.updateAvailability(slotId, is_available);
      
      res.status(200).json({
        success: true,
        data: updatedSlot
      });
    } catch (error) {
      console.error('Error updating slot availability:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to update slot' 
      });
    }
  },
  
  // Delete slots for a service
  deleteServiceSlots: async (req, res) => {
    try {
      const userId = req.user.userId;
      const serviceId = req.params.serviceId;
      
      // Verify service belongs to user
      const service = await Service.getById(serviceId);
      if (!service) {
        return res.status(404).json({
          success: false,
          error: 'Service not found'
        });
      }
      
      if (service.user_id !== userId) {
        return res.status(403).json({
          success: false,
          error: 'Not authorized to delete slots for this service'
        });
      }
      
      await Slot.deleteByServiceId(serviceId);
      
      res.status(200).json({
        success: true,
        message: 'Slots deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting service slots:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to delete slots' 
      });
    }
  },
  
  // Get publicly available slots for a service (no auth required)
  getPublicServiceSlots: async (req, res) => {
    try {
      const serviceId = req.params.serviceId;
      
      // Verify service is public
      const service = await Service.getById(serviceId);
      if (!service) {
        return res.status(404).json({
          success: false,
          error: 'Service not found'
        });
      }
      
      if (!service.is_public) {
        return res.status(403).json({
          success: false,
          error: 'This service is not publicly available'
        });
      }
      
      const slots = await Slot.getByServiceId(serviceId);
      
      // Filter to only include available slots
      const availableSlots = slots.filter(slot => slot.is_available);
      
      res.status(200).json({
        success: true,
        data: availableSlots
      });
    } catch (error) {
      console.error('Error fetching public service slots:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch slots' 
      });
    }
  },
  
  // Get slot by booking link (no auth required)
  getSlotByBookingLink: async (req, res) => {
    try {
      const bookingLink = req.params.bookingLink;
      
      const slot = await Slot.getByBookingLink(bookingLink);
      if (!slot) {
        return res.status(404).json({
          success: false,
          error: 'Slot not found or not available'
        });
      }
      
      res.status(200).json({
        success: true,
        data: slot
      });
    } catch (error) {
      console.error('Error fetching slot by booking link:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch slot' 
      });
    }
  }
};

module.exports = slotController;
